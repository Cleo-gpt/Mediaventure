// Personnage style anime (ombrage toon + contours), construit à partir des options de la mindmap.
// Origine aux pieds, regarde vers +z, hauteur ≈ 1,62 m.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { PALETTE } from './niveaux.js';

export const OPTIONS = {
  genre: [
    { id: 'homme', nom: 'Homme' }, { id: 'femme', nom: 'Femme' }, { id: 'neutre', nom: 'Neutre' },
  ],
  coiffure: {
    homme: [{ id: 'chonmage', nom: 'Chonmage moderne' }],
    femme: [{ id: 'tresses', nom: 'Franges et tresses' }, { id: 'chignon', nom: 'Chignon et baguette' }],
    neutre: [{ id: 'courte', nom: 'Courte' }],
  },
  kimono: [PALETTE.corail, PALETTE.rose, PALETTE.bleu, PALETTE.marine, PALETTE.creme, '#3f8f7a'],
  cheveux: ['#2a2a2e', '#5a3a2a', '#a8643a', '#e8d2a6', '#f8a0ab'],
  yeux: ['#3b6fd1', '#6b4a33', '#3f8f7a', '#c0506a', '#7a5bc4'],
  accessoire: [{ id: 'sac', nom: 'Sac à dos' }, { id: 'sacoche', nom: 'Sacoche' }, { id: 'aucun', nom: 'Aucun' }],
  geta: [PALETTE.corail, PALETTE.marine, PALETTE.creme],
};

export const APPARENCE_DEFAUT = {
  genre: 'femme', coiffure: 'tresses', kimono: PALETTE.corail, cheveux: '#5a3a2a', yeux: '#3b6fd1',
  accessoire: 'sac', katana: true, geta: PALETTE.corail,
};

const PEAU = '#f6cdb5';
const CONTOUR = '#2b2333';
const R_TETE = 0.107;

// ---------------------------------------------------------------- Matériaux toon + contours
const degrade = (() => {
  const t = new THREE.DataTexture(new Uint8Array([150, 215, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();
const toon = (color, o = {}) => new THREE.MeshToonMaterial({ color, gradientMap: degrade, ...o });

const matContour = new THREE.MeshBasicMaterial({ color: CONTOUR, side: THREE.BackSide });
matContour.onBeforeCompile = (s) => {
  s.vertexShader = s.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * 0.0045;');
};

// Ajoute une coque inversée (contour façon dessin animé) à chaque maillage du groupe
function contourner(objet) {
  const maillages = [];
  objet.traverse((o) => { if (o.isMesh && !o.userData.sansContour) maillages.push(o); });
  for (const m of maillages) {
    const c = new THREE.Mesh(m.geometry, matContour);
    c.userData.sansContour = true;
    c.raycast = () => {};
    m.add(c);
    m.castShadow = true;
  }
}

function piece(geo, mat, x = 0, y = 0, z = 0) {
  const p = new THREE.Mesh(geo, mat);
  p.position.set(x, y, z);
  return p;
}

// Point sur une sphère, même convention que THREE.SphereGeometry (phi = π/2 → avant, +z)
const sph = (r, theta, phi) => new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));

// Mèche : balayage d'une section elliptique le long d'une courbe, qui s'affine vers la pointe
function geoMeche(points, largeur, epaisseur, cote, { affiner = true } = {}) {
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
function deformerTete(geo) {
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
function teinte(hex, f) {
  const c = new THREE.Color(hex);
  return '#' + (f > 0 ? c.lerp(new THREE.Color('#ffffff'), f) : c.lerp(new THREE.Color('#000000'), -f)).getHexString();
}

// Le masque du visage couvre ±0,6 rad en largeur et 1 rad en hauteur autour de l'avant de la tête :
// x 256 = axe du visage, y 300 ≈ hauteur des yeux, y 430 ≈ bouche.
function textureVisage(a, ferme) {
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
function textureCheveux() {
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
function textureKimono(couleur) {
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

// ---------------------------------------------------------------- Construction
export function creerPersonnage(apparence = APPARENCE_DEFAUT) {
  const a = { ...APPARENCE_DEFAUT, ...apparence };
  const racine = new THREE.Group();
  const corps = new THREE.Group();
  racine.add(corps);

  const homme = a.genre === 'homme', femme = a.genre === 'femme';
  const sx = homme ? 1.12 : femme ? 0.95 : 1.03; // largeur d'épaules
  const contraste = a.kimono === PALETTE.creme ? PALETTE.corail : PALETTE.creme;
  const couleurObi = a.kimono === PALETTE.marine ? PALETTE.corail : PALETTE.marine;
  const couleurBas = homme || a.kimono !== PALETTE.marine ? PALETTE.marine : PALETTE.creme;

  const peau = toon(PEAU);
  const tissu = toon(a.kimono, { map: textureKimono(a.kimono) });
  const tissuUni = toon(a.kimono);
  const bord = toon(contraste);
  const obi = toon(couleurObi);
  const blanc = toon('#fbf8f2');
  const bas = toon(couleurBas);
  const bois = toon('#8a5a3a');
  const cheveux = toon(teinte(a.cheveux, 0.18), { map: textureCheveux() });
  const corail = toon(PALETTE.corail);
  const or = toon('#e8bd5f');
  const laque = toon('#1f2433');
  const doublure = toon(a.kimono === PALETTE.marine ? PALETTE.rose : PALETTE.marine, { side: THREE.BackSide });
  const cordons = new THREE.Group(); // cordons et rubans qui flottent
  corps.add(cordons);
  // Liseré doré en anneau (horizontal), avec écrasement en z pour suivre le tissu
  const anneauOr = (r, y, ez = 0.85, e = 0.005, parent = corps, mat = or) => {
    const t = piece(new THREE.TorusGeometry(r, e, 6, 48), mat, 0, y, 0);
    t.rotation.x = Math.PI / 2;
    t.scale.y = ez;
    parent.add(t);
    return t;
  };
  // Pompon : cordon + tête dorée + franges
  const pompon = (parent, x, y, z, couleur = or, longueur = 0.07) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.add(piece(new THREE.SphereGeometry(0.011, 10, 8), or));
    g.add(piece(new THREE.CylinderGeometry(0.007, 0.016, longueur, 12), couleur, 0, -longueur / 2 - 0.008, 0));
    parent.add(g);
    return g;
  };

  // ---- Jambes (hanche → genou → pied)
  const jambes = [], genoux = [];
  for (const s of [-1, 1]) {
    const hanche = new THREE.Group();
    hanche.position.set(0.075 * s, 0.82, 0);
    hanche.add(piece(new THREE.CapsuleGeometry(0.066, 0.25, 6, 14), peau, 0, -0.18, 0));
    const genou = new THREE.Group();
    genou.position.y = -0.37;
    genou.add(piece(new THREE.CapsuleGeometry(0.05, 0.27, 6, 14), peau, 0, -0.17, 0));
    if (femme) {
      // Bas montants à mi-cuisse, bande dorée et petit nœud
      const matBas = toon(PALETTE.marine);
      hanche.add(piece(new THREE.CylinderGeometry(0.07, 0.06, 0.2, 18), matBas, 0, -0.27, 0));
      anneauOr(0.071, -0.17, 1, 0.006, hanche);
      genou.add(piece(new THREE.CylinderGeometry(0.06, 0.054, 0.34, 18), matBas, 0, -0.2, 0));
      genou.add(piece(new THREE.SphereGeometry(0.057, 14, 10), matBas, 0, -0.01, 0.002));
    } else {
      // Chaussettes tabi montantes avec liseré
      genou.add(piece(new THREE.CylinderGeometry(0.058, 0.054, 0.3, 16), blanc, 0, -0.22, 0));
      anneauOr(0.057, -0.07, 1, 0.007, genou, bord);
    }
    // Pied + geta (semelle, deux dents, lanière hanao)
    const pied = new THREE.Group();
    pied.position.y = -0.38;
    pied.add(piece(new RoundedBoxGeometry(0.085, 0.06, 0.19, 3, 0.025), blanc, 0, -0.012, 0.045));
    pied.add(piece(new RoundedBoxGeometry(0.1, 0.022, 0.23, 2, 0.008), bois, 0, -0.05, 0.045));
    pied.add(piece(new THREE.BoxGeometry(0.085, 0.035, 0.022), bois, 0, -0.078, 0.11));
    pied.add(piece(new THREE.BoxGeometry(0.085, 0.035, 0.022), bois, 0, -0.078, -0.02));
    const hanao = toon(a.geta);
    for (const c of [-1, 1]) {
      const lien = piece(new THREE.CylinderGeometry(0.008, 0.008, 0.08, 6), hanao, c * 0.026, 0.0, 0.095);
      lien.rotation.set(-0.5, 0, c * 1.1);
      pied.add(lien);
    }
    pied.add(piece(new THREE.SphereGeometry(0.011, 8, 6), hanao, 0, -0.02, 0.13));
    genou.add(pied);
    hanche.add(genou);
    corps.add(hanche);
    jambes.push(hanche);
    genoux.push(genou);
  }

  // ---- Bas : jupe plissée (femme), hakama long (homme) ou mi-long (neutre)
  {
    const longueur = homme ? 0.76 : femme ? 0.3 : 0.52;
    const rBas = (homme ? 0.27 : 0.25) * sx;
    const geo = new THREE.CylinderGeometry(0.15 * sx, rBas, longueur, 64, 6, true);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const k = 0.5 - y / longueur; // 0 en haut, 1 en bas
      const pli = 1 + 0.07 * k * Math.abs(Math.sin(Math.atan2(z, x) * 9));
      p.setXYZ(i, x * pli, y, z * pli * 0.85);
    }
    geo.computeVertexNormals();
    const jupe = piece(geo, bas, 0, 0.95 - longueur / 2, 0);
    // Intérieur plus sombre, sans contour (sinon la coque du contour se voit sous la jupe)
    const interieur = piece(geo, toon(teinte(couleurBas, -0.2), { side: THREE.BackSide }));
    interieur.userData.sansContour = true;
    jupe.add(interieur);
    corps.add(jupe);
    anneauOr(rBas * 1.04, 0.95 - longueur + 0.012, 0.85, 0.008, corps, bord);
    anneauOr(rBas * 1.0, 0.95 - longueur + 0.035, 0.85, 0.004);
    // Tablier (maekake) : panneau brodé qui tombe devant, bordé d'or
    const tablier = new THREE.Group();
    const hT = longueur * 0.8 + 0.04;
    const panneau = piece(new RoundedBoxGeometry(0.11 * sx, hT, 0.012, 2, 0.005), toon(contraste, { map: textureKimono(contraste) }), 0, -hT / 2, 0);
    tablier.add(panneau);
    for (const c of [-1, 1]) tablier.add(piece(new THREE.BoxGeometry(0.008, hT, 0.016), or, c * 0.055 * sx, -hT / 2, 0));
    tablier.add(piece(new THREE.BoxGeometry(0.11 * sx + 0.008, 0.008, 0.016), or, 0, -hT + 0.004, 0));
    tablier.position.set(0, 0.92, 0.15 * sx * 0.85 + 0.012);
    tablier.rotation.x = -(Math.atan(((rBas - 0.15 * sx) * 0.95) / longueur) + 0.05);
    corps.add(tablier);
    // Plaque de hanche (kusazuri) laquée, rivets dorés et laçage corail
    const plaque = new THREE.Group();
    for (let r = 0; r < 3; r++) {
      const lame = piece(new RoundedBoxGeometry(0.13, 0.05, 0.016, 2, 0.006), laque, 0, -r * 0.052, r * 0.004);
      plaque.add(lame);
      plaque.add(piece(new THREE.BoxGeometry(0.13, 0.005, 0.018), or, 0, -r * 0.052 - 0.024, r * 0.004));
      for (let k = -1; k <= 1; k++) plaque.add(piece(new THREE.SphereGeometry(0.006, 8, 6), or, k * 0.045, -r * 0.052 + 0.008, r * 0.004 + 0.009));
      for (let k = -2; k <= 2; k += 2) plaque.add(piece(new THREE.BoxGeometry(0.004, 0.03, 0.02), corail, k * 0.02, -r * 0.052 - 0.004, r * 0.004));
    }
    plaque.position.set(0.175 * sx, 0.9, 0.03);
    plaque.rotation.set(0, 1.25, -0.12);
    corps.add(plaque);
  }

  // ---- Haut du kimono (profil tourné)
  const profil = [[0.13, 0.86], [0.13, 0.93], [0.118, 1.0], [femme ? 0.152 : 0.145, 1.12], [0.156, 1.2], [0.14, 1.26], [0.09, 1.3], [0.05, 1.315]]
    .map(([r, y]) => new THREE.Vector2(r, y));
  const haut = piece(new THREE.LatheGeometry(profil, 40), tissu);
  haut.scale.set(sx, 1, 0.74);
  corps.add(haut);
  const rayonA = (y) => {
    for (let i = 1; i < profil.length; i++) {
      if (y <= profil[i].y) {
        const t = (y - profil[i - 1].y) / (profil[i].y - profil[i - 1].y);
        return THREE.MathUtils.lerp(profil[i - 1].x, profil[i].x, t);
      }
    }
    return profil.at(-1).x;
  };
  const surface = (x, y, decalage) => {
    const r = rayonA(y);
    return new THREE.Vector3(x, y, 0.74 * Math.sqrt(Math.max(r * r - (x / sx) ** 2, 0)) + decalage);
  };
  // Col croisé (gauche sur droite) + col blanc intérieur (juban)
  const col = (x0, x1, y1, mat, decal, larg) => {
    const pts = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      pts.push(surface(THREE.MathUtils.lerp(x0, x1, t), THREE.MathUtils.lerp(1.3, y1, t), decal));
    }
    return piece(geoMeche(pts, larg, 0.006, new THREE.Vector3(1, 0.35, 0), { affiner: false }), mat);
  };
  corps.add(col(0.05, -0.04, 1.03, blanc, 0.004, 0.012));
  corps.add(col(-0.05, 0.04, 1.03, blanc, 0.004, 0.012));
  corps.add(col(0.062, -0.07, 0.99, bord, 0.009, 0.02));
  corps.add(col(-0.062, 0.075, 0.97, bord, 0.013, 0.02));
  corps.add(col(-0.084, 0.06, 0.975, or, 0.016, 0.004));
  corps.add(col(-0.04, 0.09, 0.97, or, 0.016, 0.004));
  // Ras-de-cou et pendentif
  const rasDeCou = piece(new THREE.TorusGeometry(0.04, 0.006, 6, 24), laque, 0, 1.35, -0.002);
  rasDeCou.rotation.x = Math.PI / 2 - 0.15;
  corps.add(rasDeCou);
  corps.add(piece(new THREE.OctahedronGeometry(0.01), or, 0, 1.335, 0.04));

  // ---- Obi + obiage + obijime + nœud dans le dos
  {
    const bande = piece(new THREE.CylinderGeometry(0.142, 0.14, 0.12, 40), obi, 0, 0.965, 0);
    bande.scale.set(sx, 1, 0.76);
    const obiage = piece(new THREE.CylinderGeometry(0.146, 0.146, 0.016, 40), toon(PALETTE.rose), 0, 1.03, 0);
    obiage.scale.set(sx, 1, 0.76);
    const cordon = piece(new THREE.TorusGeometry(0.146, 0.006, 6, 48), corail, 0, 0.965, 0);
    cordon.rotation.x = Math.PI / 2;
    cordon.scale.set(sx, 0.76, 1);
    corps.add(bande, obiage, cordon);
    anneauOr(0.143 * sx, 1.024, 0.76 / sx);
    anneauOr(0.143 * sx, 0.906, 0.76 / sx);
    // Cordon tressé : perles alternées le long de l'obi
    for (let i = 0; i < 40; i++) {
      const an = (i / 40) * Math.PI * 2;
      corps.add(piece(new THREE.SphereGeometry(0.0075, 6, 5), i % 2 ? corail : or,
        Math.sin(an) * 0.149 * sx, 0.965 + (i % 2 ? 0.003 : -0.003), Math.cos(an) * 0.149 * 0.76));
    }
    // Médaillon doré avec sakura, côté gauche
    const med = new THREE.Group();
    med.position.set(-0.07 * sx, 0.965, 0.76 * 0.142 + 0.008);
    med.rotation.y = -0.45;
    const disque = piece(new THREE.CylinderGeometry(0.03, 0.03, 0.008, 28), or);
    disque.rotation.x = Math.PI / 2;
    const anneau = piece(new THREE.TorusGeometry(0.03, 0.005, 6, 28), or);
    med.add(disque, anneau);
    for (let i = 0; i < 5; i++) {
      const pe = piece(new THREE.SphereGeometry(0.009, 8, 6), toon(PALETTE.rose), Math.cos(i * 1.256 + 1.57) * 0.011, Math.sin(i * 1.256 + 1.57) * 0.011, 0.006);
      pe.scale.z = 0.4;
      med.add(pe);
    }
    med.add(piece(new THREE.SphereGeometry(0.005, 6, 6), corail, 0, 0, 0.009));
    corps.add(med);
    const p1 = pompon(cordons, -0.07 * sx, 0.93, 0.12, or, 0.08);
    const p2 = pompon(cordons, -0.05 * sx, 0.92, 0.125, corail, 0.06);
    p1.userData.balance = 1; p2.userData.balance = 1.3;
    // Longs cordons rouges noués sur la hanche droite
    for (const [dx, lg] of [[0, 0.34], [0.02, 0.28]]) {
      const pts = [new THREE.Vector3(0.13 * sx + dx, 0.95, 0.05), new THREE.Vector3(0.16 * sx + dx, 0.85, 0.02), new THREE.Vector3(0.17 * sx + dx, 0.95 - lg * 0.7, -0.02), new THREE.Vector3(0.165 * sx + dx, 0.95 - lg, -0.03)];
      const c = piece(geoMeche(pts, 0.006, 0.006, new THREE.Vector3(1, 0, 0), { affiner: false }), corail);
      c.userData.balance = 0.8;
      cordons.add(c);
      pompon(cordons, 0.165 * sx + dx, 0.95 - lg, -0.03, corail, 0.05);
    }
    const noeud = new THREE.Group();
    noeud.position.set(0, 0.99, -0.76 * 0.142 - 0.02);
    for (const s of [-1, 1]) {
      const boucle = piece(new THREE.TorusGeometry(0.05, 0.022, 8, 20), obi, s * 0.06, 0, 0);
      boucle.scale.set(1.2, 0.7, 0.6);
      boucle.rotation.z = s * 0.25;
      const pan = piece(new RoundedBoxGeometry(0.06, 0.16, 0.015, 2, 0.006), obi, s * 0.035, -0.1, -0.005);
      pan.rotation.z = s * 0.18;
      noeud.add(boucle, pan);
    }
    noeud.add(piece(new RoundedBoxGeometry(0.05, 0.06, 0.04, 2, 0.012), obi, 0, 0, 0.005));
    corps.add(noeud);
  }

  // ---- Bras (épaule → coude → main) dans de larges manches
  const bras = [], coudes = [];
  const tissuDouble = tissu.clone();
  tissuDouble.side = THREE.DoubleSide;
  for (const s of [-1, 1]) {
    const epaule = new THREE.Group();
    epaule.position.set(0.155 * sx * s, 1.245, 0);
    epaule.add(piece(new THREE.SphereGeometry(0.055, 14, 10), tissuUni));
    // Profil du bas vers le haut : les normales du tour pointent ainsi vers l'extérieur
    const profilManche = [[0.125, -0.41], [0.115, -0.34], [0.09, -0.2], [0.06, -0.06], [0.05, 0.02]].map(([r, y]) => new THREE.Vector2(r, y));
    const manche = piece(new THREE.LatheGeometry(profilManche, 32), tissu);
    const dedans = piece(new THREE.LatheGeometry(profilManche.map((v) => new THREE.Vector2(v.x - 0.004, v.y)), 32), doublure);
    dedans.userData.sansContour = true;
    manche.scale.z = dedans.scale.z = 0.8;
    epaule.add(manche, dedans);
    anneauOr(0.126, -0.405, 0.8, 0.011, epaule, bord);
    anneauOr(0.12, -0.385, 0.8, 0.0045, epaule);
    // Épaulière laquée (côté gauche) : trois lames bordées d'or, laçage corail
    if (s < 0) {
      const sode = new THREE.Group();
      const laqueDouble = laque.clone();
      laqueDouble.side = THREE.DoubleSide;
      for (let r = 0; r < 3; r++) {
        const rr = 0.085 + r * 0.008, y = -r * 0.042;
        sode.add(piece(new THREE.CylinderGeometry(rr, rr + 0.003, 0.045, 24, 1, true, -1.2, 2.4), laqueDouble, 0, y, 0));
        const bordure = new THREE.Group();
        bordure.position.y = y - 0.022;
        bordure.rotation.y = -0.37; // aligne l'arc doré sur la lame
        const arc = piece(new THREE.TorusGeometry(rr + 0.002, 0.003, 4, 24, 2.4), or);
        arc.rotation.x = Math.PI / 2;
        bordure.add(arc);
        sode.add(bordure);
      }
      for (const t of [-0.4, 0, 0.4]) {
        sode.add(piece(new THREE.BoxGeometry(0.006, 0.12, 0.006), corail, 0.102 * Math.sin(t), -0.042, 0.102 * Math.cos(t)));
      }
      sode.position.y = -0.01;
      sode.rotation.set(0, -Math.PI / 2, 0.12);
      epaule.add(sode);
    }
    const coude = new THREE.Group();
    coude.position.y = -0.25;
    coude.add(piece(new THREE.CapsuleGeometry(0.034, 0.15, 6, 12), peau, 0, -0.1, 0));
    // Main : paume, doigts serrés, pouce
    const main = new THREE.Group();
    main.position.y = -0.215;
    main.add(piece(new RoundedBoxGeometry(0.03, 0.067, 0.057, 2, 0.012), laque, 0, -0.02, 0)); // gant sans doigts
    main.add(piece(new THREE.CylinderGeometry(0.036, 0.036, 0.05, 14), laque, 0, 0.04, 0)); // protège-poignet
    anneauOr(0.037, 0.016, 1, 0.004, main);
    const doigts = piece(new THREE.CapsuleGeometry(0.012, 0.04, 4, 8), peau, 0, -0.072, 0.004);
    doigts.scale.set(1.1, 1, 2.1);
    doigts.rotation.x = 0.25;
    const pouce = piece(new THREE.CapsuleGeometry(0.009, 0.03, 4, 8), peau, 0, -0.03, 0.032);
    pouce.rotation.x = 0.7;
    main.add(doigts, pouce);
    coude.add(main);
    epaule.add(coude);
    corps.add(epaule);
    bras.push(epaule);
    coudes.push(coude);
  }

  // ---- Cou et tête
  corps.add(piece(new THREE.CylinderGeometry(0.036, 0.042, 0.1, 14), peau, 0, 1.33, -0.005));
  const tete = new THREE.Group();
  tete.position.set(0, 1.465, 0.005);
  tete.add(piece(deformerTete(new THREE.SphereGeometry(R_TETE, 40, 32)), peau));
  for (const s of [-1, 1]) {
    const oreille = piece(new THREE.SphereGeometry(0.022, 10, 8), peau, s * R_TETE * 0.93, -0.012, -0.012);
    oreille.scale.set(0.5, 1, 0.8);
    tete.add(oreille);
  }
  const visageOuvert = textureVisage(a, false), visageFerme = textureVisage(a, true);
  const masque = new THREE.Mesh(
    deformerTete(new THREE.SphereGeometry(R_TETE * 1.004, 40, 32, Math.PI / 2 - 0.6, 1.2, Math.PI / 2 - 0.5, 1.0)),
    new THREE.MeshBasicMaterial({ map: visageOuvert, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  masque.userData.sansContour = true;
  masque.renderOrder = 1;
  tete.add(masque);
  const cheveuxMobiles = ajouterCoiffure(tete, a, cheveux);
  corps.add(tete);

  // ---- Accessoires
  if (a.accessoire === 'sac') {
    const toile = toon(PALETTE.marine);
    const sac = new THREE.Group();
    sac.position.set(0, 1.08, -0.2);
    sac.add(piece(new RoundedBoxGeometry(0.25, 0.3, 0.12, 3, 0.04), toile));
    sac.add(piece(new RoundedBoxGeometry(0.255, 0.12, 0.125, 3, 0.03), corail, 0, 0.1, 0.004));
    sac.add(piece(new RoundedBoxGeometry(0.16, 0.1, 0.03, 2, 0.012), toile, 0, -0.06, -0.07));
    sac.add(piece(new THREE.BoxGeometry(0.03, 0.04, 0.01), or, 0, 0.04, -0.066));
    const fleur = new THREE.Group(); // porte-clé sakura
    fleur.position.set(0.1, -0.02, -0.07);
    for (let i = 0; i < 5; i++) {
      const pe = piece(new THREE.SphereGeometry(0.012, 8, 6), toon(PALETTE.rose), Math.cos(i * 1.256) * 0.012, Math.sin(i * 1.256) * 0.012, 0);
      pe.scale.z = 0.4;
      fleur.add(pe);
    }
    sac.add(fleur);
    corps.add(sac);
    for (const s of [-1, 1]) {
      const pts = [[0.07, 1.22, -0.15], [0.085, 1.31, -0.03], [0.095, 1.25, 0.11], [0.11, 1.08, 0.12], [0.13, 0.98, -0.02], [0.1, 0.96, -0.15]]
        .map(([x, y, z]) => new THREE.Vector3(x * s * sx, y, z));
      corps.add(piece(geoMeche(pts, 0.018, 0.005, new THREE.Vector3(1, 0, 0), { affiner: false }), toile));
    }
  } else if (a.accessoire === 'sacoche') {
    const toile = toon(PALETTE.marine);
    const pts = [[-0.1, 1.29, 0.02], [-0.02, 1.2, 0.125], [0.1, 1.02, 0.125], [0.17, 0.88, 0.06]].map(([x, y, z]) => new THREE.Vector3(x * sx, y, z));
    corps.add(piece(geoMeche(pts, 0.016, 0.005, new THREE.Vector3(0.6, 0.6, 0), { affiner: false }), toile));
    const sacoche = new THREE.Group();
    sacoche.position.set(0.19 * sx, 0.86, 0.03);
    sacoche.rotation.y = 1.2;
    sacoche.add(piece(new RoundedBoxGeometry(0.17, 0.13, 0.06, 3, 0.02), toile));
    sacoche.add(piece(new RoundedBoxGeometry(0.172, 0.07, 0.063, 3, 0.02), corail, 0, 0.035, 0));
    sacoche.add(piece(new THREE.SphereGeometry(0.01, 8, 6), or, 0, 0, 0.034));
    corps.add(sacoche);
  }
  if (a.katana) {
    const k = new THREE.Group();
    k.add(piece(new THREE.CapsuleGeometry(0.017, 0.56, 4, 10), toon('#1d1f2a'), 0, -0.3, 0)); // fourreau laqué
    k.add(piece(new THREE.CylinderGeometry(0.019, 0.019, 0.02, 10), or, 0, -0.6, 0));
    k.add(piece(new THREE.CylinderGeometry(0.042, 0.042, 0.01, 18), or, 0, 0.01, 0)); // tsuba
    k.add(piece(new THREE.CylinderGeometry(0.016, 0.017, 0.2, 10), corail, 0, 0.115, 0)); // poignée
    const tresse = toon(PALETTE.creme);
    for (let i = 0; i < 6; i++) {
      const t = piece(new THREE.TorusGeometry(0.017, 0.004, 4, 10), tresse, 0, 0.03 + i * 0.03, 0);
      t.rotation.x = Math.PI / 2;
      k.add(t);
    }
    k.add(piece(new THREE.SphereGeometry(0.019, 10, 8), or, 0, 0.22, 0));
    const sageo = piece(new THREE.TorusGeometry(0.03, 0.004, 4, 16, Math.PI * 1.4), toon(PALETTE.rose), 0.01, -0.05, 0);
    sageo.rotation.y = Math.PI / 2;
    k.add(sageo);
    k.position.set(-0.17 * sx, 0.93, 0.02);
    k.rotation.set(1.35, 0, -0.12); // poignée vers l'avant, fourreau vers l'arrière
    corps.add(k);
  }

  contourner(racine);

  racine.userData = {
    corps, jambes, genoux, bras, coudes, tete, cheveux: cheveuxMobiles, masque, cordons,
    visages: [visageOuvert, visageFerme], phase: Math.random() * 6, clignement: 1 + Math.random() * 3,
  };
  return racine;
}

// ---------------------------------------------------------------- Coiffures
function ajouterCoiffure(tete, a, mat) {
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
export function animerPersonnage(perso, dt, vitesse) {
  const u = perso.userData;
  const marche = Math.min(vitesse / 4, 1);
  u.phase += dt * (3 + vitesse * 2.2);
  const s = Math.sin(u.phase);
  for (let i = 0; i < 2; i++) {
    const sens = i ? -1 : 1;
    u.jambes[i].rotation.x = s * 0.55 * marche * sens;
    u.genoux[i].rotation.x = Math.max(0, -s * sens) * 0.9 * marche;
    u.bras[i].rotation.x = -s * 0.5 * marche * sens;
    u.bras[i].rotation.z = (i ? 1 : -1) * (0.1 + Math.sin(u.phase * 0.4) * 0.015 * (1 - marche));
    u.coudes[i].rotation.x = -0.25 - marche * 0.3;
  }
  u.corps.position.y = Math.abs(Math.cos(u.phase)) * 0.03 * marche;
  u.corps.scale.y = 1 + Math.sin(u.phase * 0.6) * 0.006 * (1 - marche); // respiration
  u.tete.rotation.y = -s * 0.06 * marche;
  u.cheveux.rotation.x = 0.04 * marche + Math.sin(u.phase * 0.5) * 0.015;
  u.cordons.rotation.x = -0.12 * marche + Math.sin(u.phase * 0.7) * 0.025;
  // Clignement des yeux
  u.clignement -= dt;
  u.masque.material.map = u.visages[u.clignement < 0 ? 1 : 0];
  if (u.clignement < -0.12) u.clignement = 2 + Math.random() * 3;
}
