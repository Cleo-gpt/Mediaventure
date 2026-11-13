# Découpe chaque carpe koï des dessins de références/carpes/ en une image détourée (carpes/koi_*.png).
# Le contour noir des poissons sert de mur : tout ce que l'on atteint depuis le bord de la feuille
# sans traverser de trait noir est du fond (eau, page vide) ; le reste, ce sont les carpes.
#   python outils/carpes.py   (nécessite numpy, Pillow, opencv-python)
import glob, os
import numpy as np, cv2
from PIL import Image

racine = os.path.join(os.path.dirname(__file__), '..')
sortie = os.path.join(racine, 'carpes')
os.makedirs(sortie, exist_ok=True)
n = 0
for chemin in sorted(glob.glob(os.path.join(racine, 'références/carpes/*.png'))):
    im = np.array(Image.open(chemin).convert('RGBA'))
    rgb, alpha = im[..., :3].astype(int), im[..., 3]
    mur = ((alpha > 128) & (rgb.max(axis=2) < 75)).astype(np.uint8)
    mur = cv2.dilate(mur, np.ones((3, 3), np.uint8))  # referme les petits trous du trait
    libre = (1 - mur).astype(np.uint8)
    nb, etiq = cv2.connectedComponents(libre, connectivity=4)
    bord = set(np.unique(np.concatenate([etiq[0], etiq[-1], etiq[:, 0], etiq[:, -1]])))
    fond = np.isin(etiq, list(bord)) & (libre == 1)
    poisson = (~fond).astype(np.uint8)
    # Les traits fins isolés (reflets de l'eau) disparaissent à l'ouverture : on ne garde que ce qui borde une zone épaisse
    interieur = cv2.morphologyEx(poisson, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13)))
    garde = cv2.dilate(interieur, np.ones((15, 15), np.uint8))
    nb, etiq, stats, _ = cv2.connectedComponentsWithStats(poisson, connectivity=8)
    k = 0
    for i in range(1, nb):
        x, y, w, h, aire = stats[i]
        if aire < 40000: continue
        masque = ((etiq == i) & (garde == 1)).astype(np.uint8) * 255
        masque = cv2.GaussianBlur(masque, (3, 3), 0)
        m = 12
        x0, y0, x1, y1 = max(x - m, 0), max(y - m, 0), min(x + w + m, im.shape[1]), min(y + h + m, im.shape[0])
        out = im[y0:y1, x0:x1].copy()
        out[..., 3] = np.minimum(out[..., 3], masque[y0:y1, x0:x1])
        img = Image.fromarray(out)
        img.thumbnail((512, 512), Image.LANCZOS)
        n += 1; k += 1
        nom = f'koi_{os.path.splitext(os.path.basename(chemin))[0].split("_")[-1]}_{k}.png'
        img.save(os.path.join(sortie, nom), optimize=True)
        print(nom, img.size, aire)
print(n, 'carpes')
