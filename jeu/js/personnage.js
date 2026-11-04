// Avatar neutre de style anime : corps lisse animé par un squelette, tête anime au visage dessiné,
// coupe courte et tenue de base (haut ajusté, legging, chaussures).
// Origine aux pieds, regarde vers +z, hauteur ≈ 1,6 m. Géométries calculées une fois, puis mises en cache.
import * as THREE from 'three';
import { PALETTE } from './niveaux.js';
import { smin, ellipsoide, cone, le_long, extraire, ponderer } from './sculpture.js';
import {
  PEAU, R_TETE, toon, matContour, contourner, piece, deformerTete, teinte,
  textureVisage, textureCheveux, ajouterCoiffure,
} from './personnage-details.js';

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
  genre: 'neutre', coiffure: 'courte', kimono: PALETTE.corail, cheveux: '#5a3a2a', yeux: '#3b6fd1',
  accessoire: 'aucun', katana: false, geta: PALETTE.corail,
};

// Étape actuelle : avatar neutre. Le vestiaire ne propose que ce qui est déjà modélisé.
export const CATEGORIES_DISPONIBLES = ['cheveux', 'yeux', 'prenom'];

const PAS = 0.0085;
const PAS_MAINS = 0.003;
const TENUE = { haut: PALETTE.creme, bas: PALETTE.marine, chaussures: PALETTE.corail, semelle: '#fbf8f2' };

// ---------------------------------------------------------------- Morphologie neutre (≈ 6,5 têtes, style anime)
const J = (() => {
  const s2 = (x, y, z) => [[-x, y, z], [x, y, z]];
  const E = 0.158;
  return {
    E,
    hanches: [0, 0.9, 0], colonne: [0, 1.02, 0], poitrine: [0, 1.16, -0.005], cou: [0, 1.3, -0.015], tete: [0, 1.4, -0.006],
    epaule: s2(E, 1.268, -0.015),
    coude: s2(E + 0.046, 1.04, -0.028),
    poignet: s2(E + 0.084, 0.835, -0.01),
    doigts: s2(E + 0.098, 0.7, 0),
    cuisse: s2(0.078, 0.86, -0.005),
    genou: s2(0.066, 0.48, 0.005),
    cheville: s2(0.055, 0.095, -0.012),
    orteil: s2(0.058, 0.02, 0.125),
  };
})();
const TETE = [0, 1.47, 0.004]; // centre de la tête anime (rigide, sur l'os de la tête)

// Visage : ombre très douce (une ombre franche en diagonale abîme le dessin des yeux)
const degradeVisage = (() => {
  const t = new THREE.DataTexture(new Uint8Array([215, 245, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();

// ---------------------------------------------------------------- Champs de distance
const torse = (x, y, z) => {
  let d = ellipsoide(x, y, z, [0, 1.16, -0.005], [0.12, 0.13, 0.085]);
  d = smin(d, ellipsoide(x, y, z, [0, 1.03, 0], [0.102, 0.09, 0.072]), 0.06);
  d = smin(d, ellipsoide(x, y, z, [0, 0.96, 0.01], [0.11, 0.08, 0.074]), 0.05);
  d = smin(d, ellipsoide(x, y, z, [0, 0.88, -0.006], [0.135, 0.085, 0.088]), 0.05);
  for (const s of [-1, 1]) {
    d = smin(d, ellipsoide(x, y, z, [s * 0.058, 0.86, -0.048], [0.07, 0.072, 0.052]), 0.035);
    d = smin(d, ellipsoide(x, y, z, [s * (J.E - 0.012), 1.252, -0.013], [0.042, 0.05, 0.041]), 0.045);
  }
  return smin(d, cone(x, y, z, [-J.E * 0.8, 1.275, -0.015], [J.E * 0.8, 1.275, -0.015], 0.043, 0.043), 0.05);
};
const cou = (x, y, z) => cone(x, y, z, [0, 1.29, -0.018], [0, 1.42, -0.008], 0.047, 0.04);
const bras = (x, y, z, i) => {
  let d = cone(x, y, z, J.epaule[i], J.coude[i], 0.042, 0.031);
  d = smin(d, cone(x, y, z, J.coude[i], J.poignet[i], 0.032, 0.022), 0.015);
  const s = i ? 1 : -1;
  return smin(d, ellipsoide(x, y, z, [J.coude[i][0] + s * 0.006, J.coude[i][1] - 0.05, J.coude[i][2] + 0.005], [0.034, 0.06, 0.035]), 0.03);
};
const jambe = (x, y, z, i) => {
  const s = i ? 1 : -1;
  let d = cone(x, y, z, J.cuisse[i], J.genou[i], 0.078, 0.048);
  d = smin(d, ellipsoide(x, y, z, [J.genou[i][0], J.genou[i][1], J.genou[i][2] + 0.026], [0.03, 0.034, 0.02]), 0.015);
  const mollet = [J.genou[i][0] - s * 0.003, 0.35, -0.016];
  d = smin(d, cone(x, y, z, J.genou[i], mollet, 0.048, 0.051), 0.03);
  d = smin(d, cone(x, y, z, mollet, J.cheville[i], 0.051, 0.025), 0.04);
  d = smin(d, ellipsoide(x, y, z, [J.cheville[i][0], 0.035, -0.035], [0.031, 0.035, 0.037]), 0.025);
  d = smin(d, ellipsoide(x, y, z, [J.orteil[i][0], 0.032, 0.05], [0.037, 0.03, 0.075]), 0.03);
  d = smin(d, ellipsoide(x, y, z, [J.orteil[i][0] - s * 0.004, 0.018, 0.115], [0.037, 0.018, 0.035]), 0.02);
  return Math.max(d, -y);
};
const lesJambes = (x, y, z) => (x < 0 ? jambe(x, y, z, 0) : jambe(x, y, z, 1));
const lesBras = (x, y, z) => Math.min(bras(x, y, z, 0), bras(x, y, z, 1));
// Corps entier (sans la tête) : on n'évalue que les parties proches du point
const corps = (x, y, z) => {
  let d = 1;
  if (y > 0.72 && y < 1.36) d = torse(x, y, z);
  if (y > 1.22) d = smin(d, cou(x, y, z), 0.03);
  if (y > 0.76 && y < 1.33 && Math.abs(x) > 0.06) d = smin(d, lesBras(x, y, z), 0.035);
  if (y < 0.98) d = smin(d, lesJambes(x, y, z), y > 0.8 ? 0.04 : 0.012);
  return d;
};
const main = (x, y, z, i) => {
  const s = i ? 1 : -1, p = J.poignet[i];
  let d = cone(x, y, z, [p[0], p[1] + 0.03, p[2]], p, 0.025, 0.021);
  d = smin(d, ellipsoide(x, y, z, [p[0] + s * 0.007, p[1] - 0.04, p[2] + 0.004], [0.013, 0.042, 0.033]), 0.015);
  const base = p[1] - 0.075;
  [[-0.021, 0.055], [-0.007, 0.067], [0.008, 0.063], [0.022, 0.05]].forEach(([dz, lg]) => {
    d = smin(d, cone(x, y, z, [p[0] + s * 0.008, base, p[2] + dz], [p[0] + s * 0.002, base - lg, p[2] + dz * 1.15 + 0.004], 0.0078, 0.0058), 0.006);
  });
  return smin(d, cone(x, y, z, [p[0] + s * 0.002, p[1] - 0.025, p[2] + 0.026], [p[0] - s * 0.006, p[1] - 0.07, p[2] + 0.038], 0.0095, 0.0068), 0.01);
};

// Tenue de base : couches légèrement gonflées autour du corps
const haut = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.008, 0.88 - y);                  // s'arrête aux hanches
  d = smin(d, cou(x, y, z) - 0.006, 0.01);
  d = Math.max(d, y - 1.335);                                           // encolure ronde
  d = Math.max(d, -(Math.hypot(x, (y - 1.33) * 1.6, z - 0.04) - 0.055)); // petit col dégagé devant
  for (let i = 0; i < 2; i++) {
    // manches courtes jusqu'à mi-bras
    const t = le_long(x, y, z, J.epaule[i], J.coude[i]);
    const manche = Math.max(cone(x, y, z, J.epaule[i], J.coude[i], 0.05, 0.042), (t - 0.5) * 0.25);
    d = smin(d, manche, 0.02);
  }
  return d;
};
const bas = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.006, y - 0.95);
  if (y < 0.98) d = smin(d, lesJambes(x, y, z) - 0.005, 0.02);
  return Math.max(d, 0.115 - y); // s'arrête au-dessus des chevilles
};
const chaussures = (x, y, z) => Math.max(lesJambes(x, y, z) - 0.009, y - 0.11, -y);
const semelles = (x, y, z) => Math.max(lesJambes(x, y, z) - 0.012, y - 0.018, -y - 0.002);
const ourlets = (x, y, z) => {
  // Bandes corail : bas du haut, bout des manches, cheville du legging
  let d = Math.max(torse(x, y, z) - 0.011, Math.abs(y - 0.892) - 0.009);
  for (let i = 0; i < 2; i++) {
    const t = le_long(x, y, z, J.epaule[i], J.coude[i]);
    d = Math.min(d, Math.max(cone(x, y, z, J.epaule[i], J.coude[i], 0.053, 0.045), Math.abs(t - 0.47) * 0.25 - 0.008));
  }
  if (y < 0.2) d = Math.min(d, Math.max(lesJambes(x, y, z) - 0.008, Math.abs(y - 0.123) - 0.008));
  return d;
};

// ---------------------------------------------------------------- Squelette et pondération
const OS = ['hanches', 'colonne', 'poitrine', 'cou', 'tete',
  'epauleG', 'coudeG', 'poignetG', 'epauleD', 'coudeD', 'poignetD',
  'cuisseG', 'genouG', 'chevilleG', 'cuisseD', 'genouD', 'chevilleD'];
const O = Object.fromEntries(OS.map((n, i) => [n, i]));
const PARENTS = { hanches: null, colonne: 'hanches', poitrine: 'colonne', cou: 'poitrine', tete: 'cou',
  epauleG: 'poitrine', coudeG: 'epauleG', poignetG: 'coudeG', epauleD: 'poitrine', coudeD: 'epauleD', poignetD: 'coudeD',
  cuisseG: 'hanches', genouG: 'cuisseG', chevilleG: 'genouG', cuisseD: 'hanches', genouD: 'cuisseD', chevilleD: 'genouD' };
const ABSOLU = { hanches: J.hanches, colonne: J.colonne, poitrine: J.poitrine, cou: J.cou, tete: J.tete,
  epauleG: J.epaule[0], coudeG: J.coude[0], poignetG: J.poignet[0], epauleD: J.epaule[1], coudeD: J.coude[1], poignetD: J.poignet[1],
  cuisseG: J.cuisse[0], genouG: J.genou[0], chevilleG: J.cheville[0], cuisseD: J.cuisse[1], genouD: J.genou[1], chevilleD: J.cheville[1] };

const SEGMENTS = (() => {
  const s = [
    { os: O.hanches, a: [0, 0.83, -0.01], b: [0, 0.96, 0], r: 0.12 },
    { os: O.colonne, a: [0, 0.96, 0], b: [0, 1.09, 0], r: 0.09 },
    { os: O.poitrine, a: [0, 1.09, 0], b: [0, 1.28, -0.01], r: 0.11 },
    { os: O.cou, a: J.cou, b: [0, 1.42, -0.008], r: 0.045 },
  ];
  ['G', 'D'].forEach((c, i) => {
    s.push({ os: O['epaule' + c], a: J.epaule[i], b: J.coude[i], r: 0.038 });
    s.push({ os: O['coude' + c], a: J.coude[i], b: J.poignet[i], r: 0.028 });
    s.push({ os: O['poignet' + c], a: J.poignet[i], b: J.doigts[i], r: 0.02 });
    s.push({ os: O['cuisse' + c], a: J.cuisse[i], b: J.genou[i], r: 0.065 });
    s.push({ os: O['genou' + c], a: J.genou[i], b: J.cheville[i], r: 0.042 });
    s.push({ os: O['cheville' + c], a: J.cheville[i], b: J.orteil[i], r: 0.03 });
  });
  return s;
})();

let geos = null;
function geometries() {
  if (geos) return geos;
  const X = J.E + 0.16;
  const tout = [[-X, -0.005, -0.16], [X, 1.43, 0.19]];
  const sculpter = (f, boite, pas = PAS) => ponderer(extraire(f, boite[0], boite[1], pas), SEGMENTS);
  geos = {
    peau: sculpter(corps, tout),
    mains: [0, 1].map((i) => {
      const p = J.poignet[i];
      return sculpter((x, y, z) => main(x, y, z, i), [[p[0] - 0.04, p[1] - 0.16, p[2] - 0.05], [p[0] + 0.04, p[1] + 0.045, p[2] + 0.06]], PAS_MAINS);
    }),
    haut: sculpter(haut, [[-X, 0.84, -0.16], [X, 1.36, 0.19]]),
    bas: sculpter(bas, [[-0.2, 0.08, -0.16], [0.2, 0.98, 0.16]]),
    chaussures: sculpter(chaussures, [[-0.13, -0.01, -0.1], [0.13, 0.13, 0.18]]),
    semelles: sculpter(semelles, [[-0.13, -0.01, -0.1], [0.13, 0.03, 0.18]]),
    ourlets: sculpter(ourlets, tout),
  };
  return geos;
}

// ---------------------------------------------------------------- Construction
export function creerPersonnage(apparence = APPARENCE_DEFAUT) {
  const a = { ...APPARENCE_DEFAUT, ...apparence, genre: 'neutre', coiffure: 'courte' };
  const g = geometries();
  const racine = new THREE.Group();

  const os = {};
  for (const n of OS) {
    const b = new THREE.Bone();
    b.name = n;
    const p = ABSOLU[n], q = PARENTS[n] ? ABSOLU[PARENTS[n]] : [0, 0, 0];
    b.position.set(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
    (PARENTS[n] ? os[PARENTS[n]] : racine).add(b);
    os[n] = b;
  }
  racine.updateMatrixWorld(true);
  const squelette = new THREE.Skeleton(OS.map((n) => os[n]));

  const peau = toon(PEAU);
  const couches = [
    [g.peau, peau, true], [g.mains[0], peau, false], [g.mains[1], peau, false],
    [g.bas, toon(TENUE.bas), true], [g.haut, toon(TENUE.haut), true],
    [g.chaussures, toon(TENUE.chaussures), true], [g.semelles, toon(TENUE.semelle), true],
    [g.ourlets, toon(PALETTE.corail), false],
  ];
  for (const [geo, mat, avecContour] of couches) {
    const mesh = new THREE.SkinnedMesh(geo, mat);
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    racine.add(mesh);
    mesh.bind(squelette);
    if (avecContour) {
      // Contour façon dessin animé : coque inversée qui suit le même squelette
      const c = new THREE.SkinnedMesh(geo, matContour);
      c.frustumCulled = false;
      racine.add(c);
      c.bind(squelette, mesh.bindMatrix);
    }
  }

  // Tête anime (rigide) : crâne au menton fin, oreilles, visage dessiné, coupe courte
  const tete = new THREE.Group();
  tete.position.set(TETE[0] - J.tete[0], TETE[1] - J.tete[1], TETE[2] - J.tete[2]);
  os.tete.add(tete);
  const peauVisage = new THREE.MeshToonMaterial({ color: PEAU, gradientMap: degradeVisage });
  tete.add(piece(deformerTete(new THREE.SphereGeometry(R_TETE, 40, 32)), peauVisage));
  for (const s of [-1, 1]) {
    const oreille = piece(new THREE.SphereGeometry(0.02, 10, 8), peau, s * R_TETE * 0.92, -0.012, -0.012);
    oreille.scale.set(0.5, 1, 0.8);
    tete.add(oreille);
  }
  const visages = [textureVisage(a, false), textureVisage(a, true)];
  const masque = new THREE.Mesh(
    deformerTete(new THREE.SphereGeometry(R_TETE * 1.004, 40, 32, Math.PI / 2 - 0.6, 1.2, Math.PI / 2 - 0.5, 1.0)),
    new THREE.MeshBasicMaterial({ map: visages[0], transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  masque.userData.sansContour = true;
  masque.renderOrder = 1;
  tete.add(masque);
  const cheveux = ajouterCoiffure(tete, a, toon(teinte(a.cheveux, 0.18), { map: textureCheveux() }));
  contourner(tete);

  racine.userData = { os, cheveux, masque, visages, yHanches: J.hanches[1], phase: Math.random() * 6, clignement: 1 + Math.random() * 3 };
  return racine;
}

// ---------------------------------------------------------------- Animation
export function animerPersonnage(perso, dt, vitesse) {
  const u = perso.userData, o = u.os;
  const marche = Math.min(vitesse / 4, 1), repos = 1 - marche;
  u.phase += dt * (3 + vitesse * 2.2);
  const s = Math.sin(u.phase);
  [['G', 1], ['D', -1]].forEach(([c, sens]) => {
    o['cuisse' + c].rotation.x = -s * 0.5 * marche * sens;
    o['genou' + c].rotation.x = Math.max(0, s * sens) * 0.85 * marche;
    o['cheville' + c].rotation.x = -Math.max(0, s * sens) * 0.3 * marche;
    o['epaule' + c].rotation.x = s * 0.42 * marche * sens;
    o['epaule' + c].rotation.z = (sens > 0 ? -1 : 1) * Math.sin(u.phase * 0.4) * 0.02 * repos;
    o['coude' + c].rotation.x = -(0.1 + marche * 0.35);
  });
  o.hanches.position.y = u.yHanches + Math.abs(Math.cos(u.phase)) * 0.025 * marche - 0.012 * marche;
  o.hanches.rotation.y = s * 0.06 * marche;
  o.colonne.rotation.y = -s * 0.08 * marche;
  o.colonne.rotation.x = Math.sin(u.phase * 0.6) * 0.012 * repos + 0.04 * marche; // respiration / inclinaison en marchant
  o.tete.rotation.y = s * 0.04 * marche;
  u.cheveux.rotation.x = 0.04 * marche + Math.sin(u.phase * 0.5) * 0.015;
  u.clignement -= dt;
  u.masque.material.map = u.visages[u.clignement < 0 ? 1 : 0];
  if (u.clignement < -0.12) u.clignement = 2 + Math.random() * 3;
}
