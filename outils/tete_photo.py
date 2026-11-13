# Prépare la texture de la tête « photo » de M. Graber : recadrage autour de la tête,
# hors silhouette rempli en couleur cheveux (haut) ou peau (bas) pour des bords propres en 3D.
# usage : python3 outils/tete_photo.py
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, json

SRC = 'références/personnages/graber_photo.png'
DETOURAGE = 'références/personnages/graber_masque.png'  # masque du détourage (GrabCut) de la photo
DST = 'portraits/graber_tete.png'
CADRE = (95, 75, 415, 455)  # x0, y0, x1, y1 dans la photo
# silhouette de la tête (cheveux + visage, sans le cou), coordonnées de la photo
CONTOUR = [(193, 84), (250, 82), (293, 92), (358, 108), (390, 135), (400, 185), (398, 250), (390, 310), (372, 360),
           (335, 405), (295, 435), (258, 442), (215, 428), (170, 400), (132, 350), (110, 300), (105, 240), (113, 195),
           (150, 122), (172, 96)]

img = np.array(Image.open(SRC).convert('RGB')).astype(float)
masque = Image.new('L', (img.shape[1], img.shape[0]), 0)
ImageDraw.Draw(masque).polygon(CONTOUR, fill=255)
m = np.minimum(np.array(masque), np.array(Image.open(DETOURAGE).filter(ImageFilter.MinFilter(5))))
m = np.array(Image.fromarray(m).filter(ImageFilter.GaussianBlur(2.5))) / 255.0
cheveux = img[88:110, 200:300].reshape(-1, 3).mean(0)
peau = img[300:330, 150:200].reshape(-1, 3).mean(0)
fond = np.zeros_like(img)
ys = np.arange(img.shape[0])[:, None, None]
fond[:] = np.where(ys < 300, cheveux, peau)
# bruit de mèches pour que le remplissage ne soit pas tout plat
rng = np.random.default_rng(1)
bruit = np.array(Image.fromarray((rng.random((img.shape[0] // 8, img.shape[1])) * 255).astype(np.uint8)).resize((img.shape[1], img.shape[0]), Image.BILINEAR)) / 255.0
fond *= (0.88 + 0.2 * bruit)[..., None]
out = img * m[..., None] + fond * (1 - m[..., None])
x0, y0, x1, y1 = CADRE
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)[y0:y1, x0:x1]).save(DST)
print(json.dumps({'cadre': CADRE, 'contour': CONTOUR, 'cheveux': '#%02x%02x%02x' % tuple(int(v) for v in cheveux)}))
