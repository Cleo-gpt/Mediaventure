# Prépare la texture de la tête « photo » d'un boss : recadrage autour de la tête,
# hors silhouette rempli en couleur cheveux (haut) ou peau (bas) pour des bords propres en 3D.
# usage : python3 outils/tete_photo.py graber   (ou droz ; sans argument : tous)
# Les valeurs affichées (cadre, contour, cheveux, peau) se recopient dans `tetePhoto` du boss (jeu/js/niveaux.js).
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, json, sys

PERSONNES = {
    'graber': {
        'src': 'références/personnages/graber_photo.png',
        'detourage': 'références/personnages/graber_masque.png',  # masque du détourage (GrabCut) de la photo
        'dst': 'portraits/graber_tete.png',
        'cadre': (95, 75, 415, 455),  # x0, y0, x1, y1 dans la photo
        # silhouette de la tête (cheveux + visage, sans le cou), coordonnées de la photo
        'contour': [(193, 84), (250, 82), (293, 92), (358, 108), (390, 135), (400, 185), (398, 250), (390, 310), (372, 360),
                    (335, 405), (295, 435), (258, 442), (215, 428), (170, 400), (132, 350), (110, 300), (105, 240), (113, 195),
                    (150, 122), (172, 96)],
        'zone_cheveux': (88, 110, 200, 300),  # y0, y1, x0, x1 où mesurer la couleur des cheveux
        'zone_peau': (300, 330, 150, 200),
        'limite': 300,  # au-dessus : remplissage couleur cheveux, en dessous : couleur peau
    },
    'droz': {
        'src': 'références/personnages/droz_photo.png',
        'detourage': None,  # pas de masque : la silhouette dessinée suffit (fond uni derrière la tête)
        'dst': 'portraits/droz_tete.png',
        'cadre': (120, 80, 510, 620),
        # cheveux gris + visage + barbe, sans le cou
        'contour': [(215, 130), (270, 98), (330, 92), (395, 105), (445, 140), (478, 190), (488, 260), (492, 340), (482, 410),
                    (462, 470), (430, 530), (385, 580), (330, 603), (275, 595), (232, 565), (205, 520), (180, 460), (150, 420),
                    (138, 350), (140, 270), (155, 205), (180, 160)],
        'zone_cheveux': (100, 125, 290, 370),
        'zone_peau': (200, 228, 275, 345),
        'limite': 250,
    },
}


def preparer(nom, p):
    img = np.array(Image.open(p['src']).convert('RGB')).astype(float)
    masque = Image.new('L', (img.shape[1], img.shape[0]), 0)
    ImageDraw.Draw(masque).polygon(p['contour'], fill=255)
    m = np.array(masque)
    if p['detourage']:
        m = np.minimum(m, np.array(Image.open(p['detourage']).filter(ImageFilter.MinFilter(5))))
    m = np.array(Image.fromarray(m).filter(ImageFilter.GaussianBlur(2.5))) / 255.0
    y0, y1, x0, x1 = p['zone_cheveux']
    cheveux = img[y0:y1, x0:x1].reshape(-1, 3).mean(0)
    y0, y1, x0, x1 = p['zone_peau']
    peau = img[y0:y1, x0:x1].reshape(-1, 3).mean(0)
    fond = np.zeros_like(img)
    ys = np.arange(img.shape[0])[:, None, None]
    fond[:] = np.where(ys < p['limite'], cheveux, peau)
    # bruit de mèches pour que le remplissage ne soit pas tout plat
    rng = np.random.default_rng(1)
    bruit = np.array(Image.fromarray((rng.random((img.shape[0] // 8, img.shape[1])) * 255).astype(np.uint8)).resize((img.shape[1], img.shape[0]), Image.BILINEAR)) / 255.0
    fond *= (0.88 + 0.2 * bruit)[..., None]
    out = img * m[..., None] + fond * (1 - m[..., None])
    x0, y0, x1, y1 = p['cadre']
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)[y0:y1, x0:x1]).save(p['dst'])
    hexa = lambda c: '#%02x%02x%02x' % tuple(int(v) for v in c)
    print(nom, json.dumps({'cadre': p['cadre'], 'contour': p['contour'], 'cheveux': hexa(cheveux), 'peau': hexa(peau)}))


for nom in (sys.argv[1:] or PERSONNES):
    preparer(nom, PERSONNES[nom])
