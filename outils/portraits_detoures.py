# Fabrique les portraits détourés des profs (fond transparent) affichés à côté des dialogues.
# 1. outils/detourer.swift détoure la personne (détection de personnes de macOS, sans internet)
# 2. ici : on efface les restes à peine visibles, on ne garde que la personne (le plus grand morceau) et on recadre.
# usage : python3 outils/portraits_detoures.py            (tous)  ou  python3 outils/portraits_detoures.py droz
import subprocess, sys, tempfile, os
import numpy as np
from PIL import Image

PROFS = ['graber', 'droz', 'forestier', 'haenssler', 'perroset']


def plus_grand_morceau(opaque):
    """Masque du plus grand groupe de pixels opaques reliés entre eux (parcours en largeur)."""
    h, w = opaque.shape
    etiquette = np.zeros((h, w), np.int32)
    tailles, n = [0], 0
    for y0, x0 in zip(*np.nonzero(opaque)):
        if etiquette[y0, x0]:
            continue
        n += 1
        pile, taille = [(y0, x0)], 0
        etiquette[y0, x0] = n
        while pile:
            y, x = pile.pop()
            taille += 1
            for yy, xx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= yy < h and 0 <= xx < w and opaque[yy, xx] and not etiquette[yy, xx]:
                    etiquette[yy, xx] = n
                    pile.append((yy, xx))
        tailles.append(taille)
    return etiquette == int(np.argmax(tailles))


for nom in sys.argv[1:] or PROFS:
    src = f'références/personnages/{nom}_photo.png'
    dst = f'jeu/portraits/{nom}.png'
    with tempfile.TemporaryDirectory() as dossier:
        brut = os.path.join(dossier, 'brut.png')
        subprocess.run(['swift', 'outils/detourer.swift', src, brut], check=True, capture_output=True)
        img = np.array(Image.open(brut).convert('RGBA'))
    alpha = img[..., 3].astype(float)
    alpha[alpha < 70] = 0  # restes de fond à peine visibles
    garde = plus_grand_morceau(alpha > 0)
    # bord doux conservé autour de la personne
    garde = np.array(Image.fromarray((garde * 255).astype(np.uint8)).filter(__import__('PIL.ImageFilter', fromlist=['MaxFilter']).MaxFilter(5))) > 0
    alpha = np.where(garde, alpha, 0)
    img[..., 3] = alpha.astype(np.uint8)
    ys, xs = np.nonzero(alpha)
    img = img[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    Image.fromarray(img).save(dst)
    print(f'✓ {dst} ({img.shape[1]}×{img.shape[0]})')
