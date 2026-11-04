// Détails partagés du personnage : matériaux toon, contours, mèches, visage dessiné, textures, coiffures.
import * as THREE from 'three';
import { PALETTE } from './niveaux.js';

export const PEAU = '#f6cdb5';
export const CONTOUR = '#2b2333';
export const R_TETE = 0.107;

// ---------------------------------------------------------------- Matériaux toon + contours
const degrade = (() => {
  const t = new THREE.DataTexture(new Uint8Array([150, 215, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();
export const toon = (color, o = {}) => new THREE.MeshToonMaterial({ color, gradientMap: degrade, ...o });

export const matContour = new THREE.MeshBasicMaterial({ color: CONTOUR, side: THREE.BackSide });
matContour.onBeforeCompile = (s) => {
  s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * 0.0045;');
};

// Ajoute une coque inversée (contour façon dessin animé) à chaque maillage du groupe
export function contourner(objet) {
  const maillages = [];
  objet.traverse((o) => { if (o.isMesh && !o.isSkinnedMesh && !o.userData.sansContour) maillages.push(o); });
  for (const m of maillages) {
    const c = new THREE.Mesh(m.geometry, matContour);
    c.userData.sansContour = true;
    c.raycast = () => {};
    m.add(c);
    m.castShadow = true;
  }
}

export function piece(geo, mat, x = 0, y = 0, z = 0) {
  const p = new THREE.Mesh(geo, mat);
  p.position.set(x, y, z);
  return p;
}

// Point sur une sphère, même convention que THREE.SphereGeometry (phi = π/2 → avant, +z)
export const sph = (r, theta, phi) => new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));

// Mèche : balayage d'une section elliptique le long d'une courbe, qui s'affine vers la pointe
export function geoMeche(points, largeur, epaisseur, cote, { affiner = true } = {}) {
  const courbe = new THREE.CatmullRomCurve3(points);
  const N = 14, M = 8, pos = [], idx = [], uv = [];
  const W = new THREE.Vector3(), E = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const p = courbe.getPointAt(t), T = courbe.getTangentAt(t);
    W.copy(cote).addScaledVector(T, -cote.dot(T)).normalize();
    E.crossVectors(T, W).normalize();
    const k = affiner ? (1 - Math.pow(t, 1.5) * 0.9) * Math.min(1, 0.6 + t * 5) : 1;
    for (let j = 0; j < M; j++) {
      const a = (j / M) * Math.PI * 2;
      const cw = Math.cos(a) * largeur * k, se = Math.sin(a) * epaisseur * k;
      pos.push(p.x + W.x * cw + E.x * se, p.y + W.y * cw + E.y * se, p.z + W.z * cw + E.z * se);
      uv.push(j / M, 1 - t);
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const a = i * M + j, b = i * M + ((j + 1) % M), c = a + M, d = b + M;
      idx.push(a, b, c, b, d, c);
    }
  }
  // Bouchons aux deux extrémités
  const debut = courbe.getPointAt(0), fin = courbe.getPointAt(1).addScaledVector(courbe.getTangentAt(1), 0.004);
  const iD = pos.length / 3;
  pos.push(debut.x, debut.y, debut.z, fin.x, fin.y, fin.z);
  uv.push(0.5, 1, 0.5, 0);
  for (let j = 0; j < M; j++) {
    idx.push(iD, j, (j + 1) % M);
    idx.push(iD + 1, N * M + ((j + 1) % M), N * M + j);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// Menton en pointe douce (visage anime)
export function deformerTete(geo) {
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const ny = y / R_TETE;
    if (ny < 0) {
      const k = Math.pow(-ny, 1.4);
      x *= 1 - 0.4 * k;
      z *= 1 - 0.14 * k;
      y *= 1.12;
    }
    p.setXYZ(i, x * 0.92, y, z * 0.96);
  }
  geo.computeVertexNormals();
  return geo;
}

// ---------------------------------------------------------------- Textures dessinées
export function teinte(hex, f) {
  const c = new THREE.Color(hex);
  return '#' + (f > 0 ? c.lerp(new THREE.Color('#ffffff'), f) : c.lerp(new THREE.Color('#000000'), -f)).getHexString();
}

// Le masque du visage couvre ±0,6 rad en largeur et 1 rad en hauteur autour de l'avant de la tête :
// x 256 = axe du visage, y 300 ≈ hauteur des yeux, y 430 ≈ bouche.
export function textureVisage(a, ferme) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 512;
  const ctx = cv.getContext('2d');
  const femme = a.genre === 'femme';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Joues rosées avec hachures
  for (const s of [-1, 1]) {
    const x = 256 + s * 168;
    const g = ctx.createRadialGradient(x, 448, 0, x, 448, 40);
    g.addColorStop(0, 'rgba(248,140,150,0.55)');
    g.addColorStop(1, 'rgba(248,140,150,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 45, 400, 90, 90);
    ctx.strokeStyle = 'rgba(230,110,120,0.5)';
    ctx.lineWidth = 2.5;
    for (let k = -1; k <= 1; k++) {
      ctx.beginPath();
      ctx.moveTo(x + k * 12 - 4, 456);
      ctx.lineTo(x + k * 12 + 4, 440);
      ctx.stroke();
    }
  }

  for (const s of [-1, 1]) {
    ctx.save();
    ctx.translate(256 + s * 122, 330);
    ctx.scale(s * 1.95, 1.72); // +x local = coin extérieur de l'œil

    ctx.strokeStyle = teinte(a.cheveux, -0.35);
    ctx.lineWidth = a.genre === 'homme' ? 10 : 7;
    ctx.beginPath();
    ctx.moveTo(-34, -92);
    ctx.quadraticCurveTo(6, a.genre === 'homme' ? -104 : -110, 44, -90);
    ctx.stroke();

    ctx.strokeStyle = CONTOUR;
    if (ferme) {
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-36, 6);
      ctx.quadraticCurveTo(4, 30, 44, 2);
      ctx.stroke();
      if (femme) { ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(42, 4); ctx.lineTo(56, -4); ctx.stroke(); }
      ctx.restore();
      continue;
    }

    // Blanc de l'œil
    const forme = new Path2D();
    forme.moveTo(-36, -10);
    forme.bezierCurveTo(-20, -48, 28, -50, 44, -24);
    forme.bezierCurveTo(46, 10, 28, 46, 2, 46);
    forme.bezierCurveTo(-24, 46, -38, 20, -36, -10);
    ctx.fillStyle = '#ffffff';
    ctx.fill(forme);
    ctx.save();
    ctx.clip(forme);
    // Iris en dégradé, pupille, ombre de paupière, reflets
    const g = ctx.createLinearGradient(0, -36, 0, 44);
    g.addColorStop(0, teinte(a.yeux, -0.55));
    g.addColorStop(0.45, a.yeux);
    g.addColorStop(1, teinte(a.yeux, 0.55));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(4, 6, 27, 38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = teinte(a.yeux, -0.6);
    ctx.lineWidth = 3;
    ctx.stroke();
    // Stries claires de l'iris + halo inférieur
    ctx.strokeStyle = teinte(a.yeux, 0.45);
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.5;
    for (let k = 0; k < 14; k++) {
      const an = (k / 14) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(4 + Math.cos(an) * 12, 6 + Math.sin(an) * 17);
      ctx.lineTo(4 + Math.cos(an) * 24, 6 + Math.sin(an) * 34);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = teinte(a.yeux, -0.7);
    ctx.beginPath();
    ctx.ellipse(4, 2, 10, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(40,30,60,0.25)';
    ctx.fillRect(-50, -60, 110, 26);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse(-8, -12, 9, 11, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(16, 22, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(6, 30, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Cils supérieurs épais + pointe extérieure, pli de paupière, cils inférieurs
    ctx.strokeStyle = CONTOUR;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-38, -6);
    ctx.bezierCurveTo(-22, -50, 28, -52, 46, -24);
    ctx.stroke();
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(42, -28); ctx.lineTo(58, -36); ctx.stroke();
    if (femme) { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(34, -38); ctx.lineTo(46, -50); ctx.stroke(); }
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(-26, -50);
    ctx.quadraticCurveTo(10, -66, 40, -46);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(8, 46);
    ctx.quadraticCurveTo(30, 40, 38, 26);
    ctx.stroke();
    ctx.restore();
  }

  // Nez et bouche
  ctx.strokeStyle = 'rgba(180,110,100,0.6)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(258, 436); ctx.lineTo(253, 446); ctx.stroke();
  ctx.strokeStyle = '#8a3b46';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(243, 478);
  ctx.quadraticCurveTo(256, 487, 269, 476);
  ctx.stroke();

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

// Dégradé des cheveux (multiplié par la couleur) : racines sombres, reflet brillant, pointes claires
let texCheveux = null;
export function textureCheveux() {
  if (texCheveux) return texCheveux;
  const cv = document.createElement('canvas');
  cv.width = 64; cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#9a9a9a');
  g.addColorStop(0.18, '#d0d0d0');
  g.addColorStop(0.26, '#ffffff');
  g.addColorStop(0.3, '#d4d4d4');
  g.addColorStop(0.75, '#cfcfcf');
  g.addColorStop(1, '#f2f2f2');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 256);
  ctx.globalAlpha = 0.12;
  for (let x = 0; x < 64; x += 4) { ctx.fillStyle = x % 8 ? '#000' : '#fff'; ctx.fillRect(x, 0, 2, 256); }
  texCheveux = new THREE.CanvasTexture(cv);
  texCheveux.colorSpace = THREE.SRGBColorSpace;
  return texCheveux;
}

// Motif sakura + vagues seigaiha ; la couleur de fond vient du matériau (texture blanche teintée)
const cacheMotifs = new Map();
export function textureKimono(couleur) {
  if (cacheMotifs.has(couleur)) return cacheMotifs.get(couleur);
  const cv = document.createElement('canvas');
  cv.width = 512; cv.height = 256;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 256);
  const clair = couleur === PALETTE.creme;
  ctx.strokeStyle = clair ? 'rgba(255,105,106,0.35)' : 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 3;
  for (let y = 200; y < 290; y += 22) {
    for (let x = (y / 22) % 2 ? 0 : 22; x < 540; x += 44) {
      for (let r = 20; r > 4; r -= 7) { ctx.beginPath(); ctx.arc(x, y, r, Math.PI, 0); ctx.stroke(); }
    }
  }
  let graine = 7;
  const alea = () => ((graine = (graine * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 22; i++) {
    const x = alea() * 512, y = alea() * 180, r = 10 + alea() * 14;
    ctx.fillStyle = clair ? (i % 2 ? '#ff9a9b' : '#f8a0ab') : (i % 2 ? '#ffd9dd' : '#fff4f0');
    // La texture est multipliée par la couleur du kimono : on éclaircit fort pour que les fleurs ressortent
    ctx.globalCompositeOperation = 'source-over';
    for (let k = 0; k < 5; k++) {
      const an = (k / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(x + Math.cos(an) * r * 0.55, y + Math.sin(an) * r * 0.55, r * 0.5, r * 0.36, an, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = clair ? '#ffffff' : '#f6c66a';
    ctx.beginPath(); ctx.arc(x, y, r * 0.18, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  cacheMotifs.set(couleur, t);
  return t;
}


export function ajouterCoiffure(tete, a, mat) {
  const R = R_TETE;
  const mobiles = new THREE.Group(); // mèches qui suivent le mouvement
  tete.add(mobiles);

  // Calotte basculée vers l'arrière : dégage le front, couvre la nuque
  const calotte = piece(new THREE.SphereGeometry(R * 1.06, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.56), mat, 0, 0.004, -0.006);
  calotte.rotation.x = -0.42;
  tete.add(calotte);

  const meche = (pts, l, e, phi, parent = tete) => {
    parent.add(piece(geoMeche(pts, l, e, new THREE.Vector3(Math.sin(phi), 0, Math.cos(phi))), mat));
  };
  // Frange : du sommet jusqu'aux sourcils ; `decalage` balaie la frange sur le côté
  const frange = (n, ouverture, longueur = 1.36, decalage = 0) => {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const phi = Math.PI / 2 + (t - 0.5) * ouverture;
      const bout = longueur + Math.sin(i * 2.3) * 0.05 - Math.abs(t - 0.5) * 0.12;
      meche([sph(R * 1.04, 0.35, phi - decalage * 0.4), sph(R * 1.1, 0.85, phi), sph(R * 1.09, 1.15, phi + decalage * 0.3), sph(R * 1.055, bout, phi + decalage * 0.5)],
        0.022, 0.008, phi);
    }
  };
  // Mèches latérales qui encadrent le visage
  const encadrer = (bas) => {
    for (const s of [-1, 1]) {
      const phi = Math.PI / 2 + s * 1.05;
      meche([sph(R * 1.06, 0.6, phi), sph(R * 1.1, 1.3, phi), sph(R * 1.08, 1.9, phi + s * 0.08), sph(R * 1.05, bas, phi + s * 0.05)], 0.018, 0.007, phi, mobiles);
    }
  };
  // Couronne de mèches à l'arrière de la tête
  const arriere = (n, bas, evasement = 1.15, debut = 0.35) => {
    for (let i = 0; i < n; i++) {
      const phi = Math.PI / 2 + 1.25 + (i / (n - 1)) * (2 * Math.PI - 2.5);
      const b = bas + Math.sin(i * 1.7) * 0.06;
      meche([sph(R * 1.05, debut, phi), sph(R * 1.12, 1.2, phi), sph(R * evasement, b - 0.25, phi), sph(R * (evasement - 0.06), b, phi)], 0.03, 0.01, phi, mobiles);
    }
  };

  if (a.coiffure === 'chonmage') {
    calotte.scale.set(0.99, 0.95, 1);
    for (let i = 0; i < 7; i++) {
      const phi = Math.PI / 2 + (i / 6 - 0.5) * 1.5;
      meche([sph(R * 1.04, 0.4, phi), sph(R * 1.1, 0.9, phi), sph(R * 1.08, 1.22 + Math.sin(i * 3) * 0.05, phi + 0.08)], 0.02, 0.008, phi);
    }
    arriere(9, 1.85, 1.06);
    // Chignon sur le dessus : lien corail + touffe repliée vers l'avant
    const lien = piece(new THREE.CylinderGeometry(0.022, 0.026, 0.03, 12), toon(PALETTE.corail), 0, R * 1.02, -0.035);
    lien.rotation.x = -0.5;
    tete.add(lien);
    for (let i = 0; i < 4; i++) {
      const dx = (i - 1.5) * 0.008;
      meche([new THREE.Vector3(dx, R * 1.05, -0.04), new THREE.Vector3(dx, R * 1.25, -0.06), new THREE.Vector3(dx * 2, R * 1.32, 0), new THREE.Vector3(dx * 3, R * 1.18, 0.06)], 0.016, 0.01, 0, mobiles);
    }
  } else if (a.coiffure === 'tresses') {
    frange(9, 1.7);
    encadrer(2.05);
    arriere(10, 1.95);
    for (const s of [-1, 1]) {
      const tresse = new THREE.Group();
      tresse.position.set(s * R * 0.82, -0.04, -0.05);
      for (let i = 0; i < 8; i++) {
        const maillon = piece(new THREE.SphereGeometry(0.032 - i * 0.0016, 12, 10), mat, s * i * 0.003, -i * 0.045, i * 0.009);
        maillon.scale.set(1, 1.3, 0.9);
        maillon.rotation.z = (i % 2 ? 1 : -1) * 0.45;
        tresse.add(maillon);
      }
      const ruban = toon(PALETTE.corail);
      for (const c of [-1, 1]) {
        const b = piece(new THREE.TorusGeometry(0.016, 0.006, 6, 12), ruban, c * 0.02 + s * 0.024, -0.37, 0.075);
        b.scale.set(1.3, 0.8, 0.5);
        tresse.add(b);
      }
      tresse.add(piece(new THREE.SphereGeometry(0.01, 8, 6), ruban, s * 0.024, -0.37, 0.075));
      const pointe = piece(new THREE.ConeGeometry(0.02, 0.06, 10), mat, s * 0.024, -0.42, 0.075);
      pointe.rotation.x = Math.PI;
      tresse.add(pointe);
      tresse.rotation.x = 0.15;
      mobiles.add(tresse);
    }
  } else if (a.coiffure === 'chignon') {
    frange(7, 1.4, 1.3, 0.25);
    encadrer(2.3);
    arriere(8, 1.75, 1.08, 0.5);
    const chignon = new THREE.Group();
    chignon.position.set(0, R * 0.55, -R * 0.95);
    chignon.add(piece(new THREE.SphereGeometry(0.062, 18, 14), mat));
    for (let i = 0; i < 3; i++) {
      const spire = piece(new THREE.TorusGeometry(0.05 - i * 0.012, 0.014, 8, 20), mat, 0, 0, -0.025 - i * 0.012);
      spire.rotation.y = i * 0.6;
      chignon.add(spire);
    }
    // Kanzashi : baguette, fleur de sakura, perles pendantes
    const baguette = piece(new THREE.CylinderGeometry(0.005, 0.004, 0.24, 8), toon(a.kimono === PALETTE.marine ? PALETTE.corail : PALETTE.marine));
    baguette.rotation.z = 1.15;
    chignon.add(baguette);
    const fleur = new THREE.Group();
    fleur.position.set(0.1, 0.045, 0);
    for (let i = 0; i < 5; i++) {
      const p = piece(new THREE.SphereGeometry(0.016, 10, 8), toon(PALETTE.rose), Math.cos(i * 1.256) * 0.017, Math.sin(i * 1.256) * 0.017, 0);
      p.scale.z = 0.4;
      fleur.add(p);
    }
    fleur.add(piece(new THREE.SphereGeometry(0.007, 8, 6), toon('#f6c66a')));
    fleur.rotation.y = 0.8;
    chignon.add(fleur);
    for (let i = 0; i < 3; i++) chignon.add(piece(new THREE.SphereGeometry(0.006, 6, 6), toon(PALETTE.corail), 0.1, 0.02 - i * 0.018, 0.005));
    tete.add(chignon);
  } else {
    // Courte : carré au menton
    frange(11, 1.8, 1.4);
    encadrer(2.15);
    arriere(14, 2.0, 1.2, 0.3);
  }
  return mobiles;
}

// ---------------------------------------------------------------- Animation
