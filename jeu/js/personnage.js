// Avatars animaux chibi (style kawaii) : shiba ou panda.
// Grosse tête ronde « mochi » posée sur un petit corps rond, pattes courtes à coussinets roses,
// petits yeux, joues roses, bouche en ω. Pelage peint par sommet, corps animé par un squelette.
// Habits (kimono, obi, geta), touffe coiffée et accessoires (sac, sacoche, katana) en option.
// Origine aux pieds, regarde vers +z, hauteur ≈ 1,15 m oreilles comprises. Géométries mises en cache par espèce.
import * as THREE from 'three';
import { PALETTE } from './niveaux.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { smin, ellipsoide, cone, le_long, extraire, ponderer } from './sculpture.js';
import { toon, matContour, contourner, piece, geoMeche } from './personnage-details.js';

export const OPTIONS = {
  espece: [{ id: 'shiba', nom: 'Shiba' }, { id: 'panda', nom: 'Panda' }],
  genre: [
    { id: 'homme', nom: 'Homme' }, { id: 'femme', nom: 'Femme' }, { id: 'neutre', nom: 'Neutre' },
  ],
  // Coiffures des animaux : une touffe de poils coiffée sur la tête
  coiffure: [
    { id: 'aucune', nom: 'Au naturel' }, { id: 'tresses', nom: 'Franges et tresses' },
    { id: 'chignon', nom: 'Chignon et baguettes' }, { id: 'chonmage', nom: 'Chonmage moderne' },
    { id: 'frange', nom: 'Courte à frange' },
  ],
  kimono: [PALETTE.corail, PALETTE.rose, PALETTE.bleu, PALETTE.marine, PALETTE.creme, '#3f8f7a'],
  cheveux: ['#2a2a2e', '#5a3a2a', '#a8643a', '#e8d2a6', '#f8a0ab'],
  yeux: ['#3b6fd1', '#6b4a33', '#3f8f7a', '#c0506a', '#7a5bc4'],
  accessoire: [{ id: 'sac', nom: 'Sac à dos' }, { id: 'sacoche', nom: 'Sacoche' }, { id: 'aucun', nom: 'Aucun' }],
  geta: [PALETTE.corail, PALETTE.marine, PALETTE.creme],
};

export const APPARENCE_DEFAUT = {
  espece: 'shiba', genre: 'neutre', coiffure: 'aucune', kimono: null, cheveux: '#5a3a2a', yeux: '#3b6fd1',
  accessoire: 'aucun', katana: false, geta: null,
};

// Étape actuelle : avatars animaux. Le vestiaire ne propose que ce qui est déjà modélisé.
export const CATEGORIES_DISPONIBLES = ['espece', 'coiffure', 'cheveux', 'kimono', 'geta', 'accessoire', 'arme', 'prenom'];

const PAS = 0.006;
const PAS_TETE = 0.0045;

const PELAGE = {
  shiba: { base: '#eba04e', clair: '#fbf1e2', oreille: '#f6bfae', truffe: '#3a2a26' },
  panda: { base: '#fbfaf6', noir: '#1f1f24', truffe: '#1f1f24' },
  // Humain chibi (personnages non joueurs, comme Cléo) : peau, chaussettes tabi blanches
  humain: { base: '#f6d5bf', clair: '#fbf8f2', truffe: '#3a2a26' },
};
const ROSE = '#f7a8b2';

// Ombrage cel à quatre tons, plus doux que le toon standard
const degradeDoux = (() => {
  const t = new THREE.DataTexture(new Uint8Array([120, 178, 225, 255]), 4, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();

const BRUIT = `
float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float bruit(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { return 0.5 * bruit(p) + 0.3 * bruit(p * 2.07) + 0.2 * bruit(p * 4.13); }`;

// Matériau toon enrichi : `motif` est du GLSL qui modifie diffuseColor à partir de vPosObj (position au repos)
function materiau(couleur, { vertexColors = false, motif = '', liseré = 0.3, cle = '' } = {}) {
  const m = new THREE.MeshToonMaterial({ color: couleur, vertexColors, gradientMap: degradeDoux });
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosObj;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosObj = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosObj;' + BRUIT)
      .replace('#include <color_fragment>', '#include <color_fragment>\n' + motif)
      .replace('#include <opaque_fragment>', `
        float bord = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);
        // liseré teinté par la couleur du pelage : duveteux sur le clair, discret sur le noir
        outgoingLight += mix(diffuseColor.rgb, vec3(1.0, 0.97, 0.92), 0.35) * bord * ${liseré.toFixed(2)};
        #include <opaque_fragment>`);
  };
  m.customProgramCacheKey = () => 'mediaventure-' + cle;
  return m;
}
// Fourrure : fines mèches verticales (bruit étiré) + léger grain
const MOTIF_FOURRURE = `
  float meches = fbm(vPosObj * vec3(160.0, 38.0, 160.0));
  float grain = bruit(vPosObj * 420.0);
  diffuseColor.rgb *= 0.86 + 0.2 * meches + 0.06 * grain;`;
// Kimono : vagues seigaiha claires + trame du tissu
const MOTIF_SEIGAIHA = `
  vec2 q = vPosObj.xy * vec2(24.0, 24.0);
  q.x += mod(floor(q.y), 2.0) * 0.5;
  vec2 g = vec2(fract(q.x) - 0.5, fract(q.y));
  float r = length(g);
  float vagues = (1.0 - smoothstep(0.03, 0.09, abs(fract(r * 3.2) - 0.5))) * step(r, 0.95);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.25 + 0.06, vagues * 0.45);
  diffuseColor.rgb *= 0.95 + 0.07 * bruit(vPosObj * 500.0);`;

// ---------------------------------------------------------------- Squelette chibi (≈ 2 têtes)
const J = (() => {
  const s2 = (x, y, z) => [[-x, y, z], [x, y, z]];
  return {
    hanches: [0, 0.22, 0], colonne: [0, 0.3, 0], poitrine: [0, 0.4, 0], cou: [0, 0.48, 0], tete: [0, 0.52, 0],
    epaule: s2(0.155, 0.44, 0.0),
    coude: s2(0.2, 0.37, 0.03),
    poignet: s2(0.225, 0.3, 0.06),
    cuisse: s2(0.095, 0.2, 0.0),
    genou: s2(0.105, 0.13, 0.015),
    cheville: s2(0.11, 0.07, 0.025),
    orteil: s2(0.115, 0.03, 0.12),
  };
})();
const TETE = [0, 0.74, 0.0]; // centre de la tête (elle recouvre le haut du corps, sans cou)

// ---------------------------------------------------------------- Corps
const torse = (x, y, z) => smin(
  ellipsoide(x, y, z, [0, 0.3, 0.0], [0.19, 0.2, 0.17]),
  ellipsoide(x, y, z, [0, 0.42, -0.005], [0.15, 0.1, 0.13]), 0.08);
const bras = (x, y, z, i) => smin(
  cone(x, y, z, J.epaule[i], J.poignet[i], 0.07, 0.066),
  ellipsoide(x, y, z, [J.poignet[i][0], J.poignet[i][1] - 0.012, J.poignet[i][2] + 0.01], [0.072, 0.07, 0.07]), 0.03); // patte ronde
const jambe = (x, y, z, i) => smin(
  cone(x, y, z, J.cuisse[i], J.cheville[i], 0.085, 0.075),
  ellipsoide(x, y, z, [J.orteil[i][0], 0.05, 0.05], [0.08, 0.055, 0.1]), 0.04);
const corps = (x, y, z) => {
  let d = torse(x, y, z);
  if (Math.abs(x) > 0.06 && y > 0.18) d = smin(d, Math.min(bras(x, y, z, 0), bras(x, y, z, 1)), 0.05);
  if (y < 0.3) d = smin(d, x < 0 ? jambe(x, y, z, 0) : jambe(x, y, z, 1), 0.05);
  return Math.max(d, -y);
};
// Queue du shiba : panache épais qui monte du bas du dos, s'enroule par-dessus et pose sa pointe sur le côté.
// Coordonnées locales : origine à la base de la queue, sur le haut des fesses.
const QUEUE_BASE = [0, 0.25, -0.185];
const courbeQueue = new THREE.CatmullRomCurve3([
  // la boucle reste entièrement derrière le dos ; la pointe se pose contre le dos, sans y entrer
  [0, 0, 0.025], [0, 0.05, -0.07], [0, 0.13, -0.13], [0.01, 0.2, -0.13], [0.03, 0.228, -0.085], [0.05, 0.198, -0.05], [0.07, 0.15, -0.055],
].map((v) => new THREE.Vector3(...v)));
const POINTS_QUEUE = courbeQueue.getSpacedPoints(48).map((v, i, t) => ({ v, t: i / (t.length - 1) }));
const rayonQueue = (t) => (t < 0.35 ? 0.04 + (t / 0.35) * 0.014 : t < 0.7 ? 0.054 - ((t - 0.35) / 0.35) * 0.008 : 0.046 - ((t - 0.7) / 0.3) * 0.03);
const queueShiba = (x, y, z) => {
  let d = Infinity;
  for (let i = 1; i < POINTS_QUEUE.length; i++) {
    const a = POINTS_QUEUE[i - 1], b = POINTS_QUEUE[i];
    d = smin(d, cone(x, y, z, a.v.toArray(), b.v.toArray(), rayonQueue(a.t), rayonQueue(b.t)), 0.012);
  }
  return d;
};

// ---------------------------------------------------------------- Habits (couches autour du corps)
// Jupe du kimono : évasée de la taille jusqu'aux chevilles, légèrement plissée
const HAUT_JUPE = 0.3, BAS_JUPE = 0.06;
const rayonJupe = (x, y, z, plus = 0) => {
  const k = Math.min(1, Math.max(0, (HAUT_JUPE - y) / (HAUT_JUPE - BAS_JUPE)));
  const r = (0.195 + k * 0.045) * (1 + 0.025 * k * Math.abs(Math.sin(Math.atan2(z, x) * 9))) + plus;
  return Math.hypot(x, z / 0.92) - r;
};
const kimono = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.014, 0.2 - y);
  d = smin(d, Math.max(rayonJupe(x, y, z), BAS_JUPE - y, y - HAUT_JUPE), 0.04);
  for (let i = 0; i < 2; i++) {
    // manches larges coupées net au-dessus des pattes
    const a = J.epaule[i], b = a.map((v, k) => v + (J.poignet[i][k] - v) * 0.55);
    const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    d = smin(d, Math.max(cone(x, y, z, a, b, 0.078, 0.095), (le_long(x, y, z, a, b) - 1) * l), 0.02);
  }
  return Math.max(d, y - 0.53);
};
// Distance 2D d'un point au segment a → b (dans le plan de face)
const segment2D = (x, y, a, b) => {
  const bx = b[0] - a[0], by = b[1] - a[1];
  const t = Math.min(1, Math.max(0, ((x - a[0]) * bx + (y - a[1]) * by) / (bx * bx + by * by)));
  return Math.hypot(x - a[0] - t * bx, y - a[1] - t * by);
};
// Col croisé (gauche sur droite)
const col = (x, y, z) => Math.min(
  Math.max(torse(x, y, z) - 0.018, segment2D(x, y, [-0.09, 0.51], [0.065, 0.25]) - 0.018, 0.03 - z),
  Math.max(torse(x, y, z) - 0.0172, segment2D(x, y, [0.09, 0.51], [-0.015, 0.34]) - 0.018, 0.03 - z));
const obi = (x, y, z) => Math.max(torse(x, y, z) - 0.023, Math.abs(y - 0.27) - 0.03);
// Ourlet contrasté en bas du kimono
const ourlet = (x, y, z) => Math.max(rayonJupe(x, y, z, 0.004), BAS_JUPE - 0.002 - y, y - (BAS_JUPE + 0.028));
// Le bas de la jupe suit les cuisses quand le personnage marche
const poidsJupe = (x, y, z, liste) => {
  if (y > 0.24) return liste;
  const k = Math.min(1, (0.24 - y) / 0.18) * 0.65;
  const cote = Math.min(1, Math.max(0, 0.5 - x / 0.12));
  return [[O.hanches, 1 - k], [O.cuisseG, k * cote], [O.cuisseD, k * (1 - cote)]].filter((e) => e[1] > 0);
};

// Miko (prêtresse de sanctuaire) : manches longues et amples qui tombent sous les mains
const mancheLongue = (x, y, z, i, plus = 0) => {
  const s = i ? 1 : -1;
  const a = J.epaule[i], b = [J.poignet[i][0] + s * 0.025, 0.17, J.poignet[i][2] + 0.03];
  return { d: cone(x, y, z, a, b, 0.072 + plus, 0.125 + plus), t: le_long(x, y, z, a, b) };
};
const mikoHaut = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.015, 0.25 - y, y - 0.53);
  for (let i = 0; i < 2; i++) d = smin(d, mancheLongue(x, y, z, i).d, 0.02);
  return d;
};
const hakama = (x, y, z) => Math.max(rayonJupe(x, y, z, 0.008), BAS_JUPE - y, y - 0.31);
const bandesManches = (x, y, z) => {
  let d = Infinity;
  for (let i = 0; i < 2; i++) { const m = mancheLongue(x, y, z, i, 0.004); d = Math.min(d, Math.max(m.d, Math.abs(m.t - 0.86) - 0.025)); }
  return d;
};
// Les manches ne doivent suivre que les bras (jamais les jambes, pourtant proches)
const poidsManches = (x, y, z, liste) => {
  const jambes = [O.cuisseG, O.genouG, O.chevilleG, O.cuisseD, O.genouD, O.chevilleD];
  const l = liste.filter(([os]) => !jambes.includes(os));
  return l.length ? l : [[x < 0 ? O.poignetG : O.poignetD, 1]];
};
let miko = null;
function geometriesMiko() {
  miko ??= {
    haut: ponderer(extraire(mikoHaut, [-0.36, 0.1, -0.23], [0.36, 0.55, 0.27], PAS), SEGMENTS, { surcharge: poidsManches }),
    bandes: ponderer(extraire(bandesManches, [-0.38, 0.1, -0.2], [0.38, 0.35, 0.25], 0.004), SEGMENTS, { surcharge: poidsManches }),
    hakama: ponderer(extraire(hakama, [-0.33, 0.04, -0.27], [0.33, 0.33, 0.28], PAS), SEGMENTS, { surcharge: poidsJupe }),
  };
  return miko;
}

// Tenue de ville (M. Graber) : chemise rouge, veste en daim ouverte, pantalon sombre, chaussures
const chemise = (x, y, z) => Math.max(torse(x, y, z) - 0.01, 0.2 - y, y - 0.53);
const veste = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.024, 0.17 - y);
  for (let i = 0; i < 2; i++) {
    // manches longues jusqu'au-dessus de la main
    const a = J.epaule[i], b = a.map((v, k) => v + (J.poignet[i][k] - v) * 0.8);
    const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    d = smin(d, Math.max(cone(x, y, z, a, b, 0.082, 0.078), (le_long(x, y, z, a, b) - 1) * l), 0.02);
  }
  // ouverture en V sur le devant, qui laisse voir la chemise
  const demi = 0.012 + Math.max(0, y - 0.28) * 0.42;
  d = Math.max(d, -Math.max(Math.abs(x) - demi, 0.02 - z));
  return Math.max(d, y - 0.535);
};
// Revers du col, rabattus de part et d'autre de l'ouverture
const revers = (x, y, z) => {
  const demi = 0.012 + Math.max(0, y - 0.28) * 0.42;
  return Math.max(torse(x, y, z) - 0.03, Math.abs(Math.abs(x) - demi - 0.03) - 0.03, 0.4 - y, y - 0.53, 0.04 - z);
};
const pantalon = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.012, y - 0.26);
  for (let i = 0; i < 2; i++) d = smin(d, cone(x, y, z, J.cuisse[i], [J.cheville[i][0], 0.075, J.cheville[i][2]], 0.094, 0.084), 0.03);
  return Math.max(d, 0.075 - y);
};
const chaussures = (x, y, z) => {
  let d = Infinity;
  for (let i = 0; i < 2; i++) d = Math.min(d, ellipsoide(x, y, z, [J.orteil[i][0], 0.05, 0.04], [0.09, 0.066, 0.13]));
  return Math.max(d, -y);
};
// Le pantalon ne suit que les jambes et le bassin (jamais les mains, pourtant proches)
const poidsJambes = (x, y, z, liste) => {
  const garde = [O.hanches, O.colonne, O.cuisseG, O.genouG, O.chevilleG, O.cuisseD, O.genouD, O.chevilleD];
  const l = liste.filter(([os]) => garde.includes(os));
  return l.length ? l : [[O.hanches, 1]];
};
let ville = null;
function geometriesVille() {
  ville ??= {
    chemise: ponderer(extraire(chemise, [-0.22, 0.18, -0.2], [0.22, 0.55, 0.22], PAS), SEGMENTS),
    veste: ponderer(extraire(veste, [-0.33, 0.15, -0.23], [0.33, 0.56, 0.26], PAS), SEGMENTS, { surcharge: poidsManches }),
    revers: ponderer(extraire(revers, [-0.2, 0.38, 0.0], [0.2, 0.55, 0.24], 0.004), SEGMENTS),
    pantalon: ponderer(extraire(pantalon, [-0.24, 0.06, -0.2], [0.24, 0.28, 0.2], PAS), SEGMENTS, { surcharge: poidsJambes }),
    chaussures: ponderer(extraire(chaussures, [-0.22, -0.01, -0.11], [0.22, 0.13, 0.19], 0.006), SEGMENTS, { surcharge: poidsJambes }),
  };
  return ville;
}

let tissus = null; // habits : même géométrie pour les deux espèces
function geometriesTissus() {
  tissus ??= {
    kimono: ponderer(extraire(kimono, [-0.33, 0.04, -0.26], [0.33, 0.55, 0.27], PAS), SEGMENTS, { surcharge: poidsJupe }),
    ourlet: ponderer(extraire(ourlet, [-0.27, 0.04, -0.26], [0.27, 0.1, 0.27], 0.004), SEGMENTS, { surcharge: poidsJupe }),
    col: ponderer(extraire(col, [-0.13, 0.22, 0.0], [0.13, 0.54, 0.25], 0.004), SEGMENTS),
    obi: ponderer(extraire(obi, [-0.25, 0.22, -0.24], [0.25, 0.32, 0.24], 0.005), SEGMENTS),
  };
  return tissus;
}

// ---------------------------------------------------------------- Têtes (coordonnées locales, centre en 0)
const tetes = {
  humain: (x, y, z) => smin(ellipsoide(x, y, z, [0, 0.02, 0], [0.27, 0.25, 0.25]), ellipsoide(x, y, z, [0, -0.1, 0.06], [0.17, 0.13, 0.17]), 0.08),
  shiba: (x, y, z) => {
    let d = ellipsoide(x, y, z, [0, 0.02, 0], [0.29, 0.24, 0.25]);                         // tête mochi
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.15, -0.08, 0.08], [0.14, 0.11, 0.13]), 0.06); // bajoues
    d = smin(d, ellipsoide(x, y, z, [0, -0.07, 0.2], [0.085, 0.06, 0.07]), 0.05);          // petit museau
    for (const s of [-1, 1]) d = smin(d, cone(x, y, z * 2.4, [s * 0.15, 0.17, -0.02], [s * 0.2, 0.33, -0.05], 0.095, 0.014) / 2.4, 0.04); // oreilles
    for (const s of [-1, 1]) {
      // touffes de poils sur les bajoues
      d = smin(d, cone(x, y, z, [s * 0.24, -0.07, 0.03], [s * 0.315, -0.115, 0.02], 0.035, 0.005), 0.02);
      d = smin(d, cone(x, y, z, [s * 0.22, -0.13, 0.05], [s * 0.28, -0.195, 0.045], 0.03, 0.005), 0.02);
      d = smin(d, cone(x, y, z, [s * 0.255, -0.01, 0.0], [s * 0.315, -0.035, -0.01], 0.03, 0.005), 0.02);
    }
    return d;
  },
  panda: (x, y, z) => {
    let d = ellipsoide(x, y, z, [0, 0.01, 0], [0.3, 0.24, 0.26]);
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.15, -0.08, 0.08], [0.15, 0.11, 0.13]), 0.06);
    d = smin(d, ellipsoide(x, y, z, [0, -0.075, 0.2], [0.07, 0.05, 0.06]), 0.05);
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.2, 0.19, -0.03], [0.085, 0.08, 0.06]), 0.04); // oreilles rondes
    // trois petits épis sur le crâne
    for (const [dx, dz, h] of [[-0.03, 0.06, 0.05], [0.0, 0.08, 0.06], [0.03, 0.05, 0.045]]) {
      d = smin(d, cone(x, y, z, [dx, 0.22, dz], [dx * 1.6, 0.22 + h, dz + 0.02], 0.016, 0.003), 0.012);
    }
    return d;
  },
};

// ---------------------------------------------------------------- Tête photo (réaliste)
// La photo (recadrée par outils/tete_photo.py) est projetée de face sur une tête qui reprend exactement
// sa silhouette, ligne par ligne ; l'arrière et les côtés passent progressivement à la couleur des cheveux.
// def : { texture, cadre: [x0, y0, x1, y1], contour: [[x, y]…], nez: x du nez, cheveux, hauteur, decalage }
const cacheTetesPhoto = new Map();
function geometrieTetePhoto(def) {
  const [x0, y0, x1, y1] = def.cadre, c = def.contour;
  const yHaut = Math.min(...c.map((p) => p[1])), yBas = Math.max(...c.map((p) => p[1]));
  const xMilieu = (Math.min(...c.map((p) => p[0])) + Math.max(...c.map((p) => p[0]))) / 2;
  const s = def.hauteur / (yBas - yHaut), yMilieu = (yHaut + yBas) / 2;
  // bords gauche et droit de la silhouette à la hauteur y
  const bords = (y) => {
    const xs = [];
    for (let i = 0; i < c.length; i++) {
      const [ax, ay] = c[i], [bx, by] = c[(i + 1) % c.length];
      if ((ay <= y && by > y) || (by <= y && ay > y)) xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
    }
    return xs.length ? [Math.min(...xs), Math.max(...xs)] : null;
  };
  const LIGNES = 56, COLONNES = 72, pos = [], uv = [], avant = [], index = [];
  for (let r = 0; r <= LIGNES; r++) {
    const t = r / LIGNES, y = yHaut + (yBas - yHaut) * (1 - Math.cos(Math.PI * t)) / 2;
    let b = r === 0 || r === LIGNES ? null : bords(y);
    const xn = b ? Math.min(Math.max(def.nez, b[0] + 1), b[1] - 1) : def.nez;
    const gauche = b ? xn - b[0] : 0, droite = b ? b[1] - xn : 0;
    const prof = ((gauche + droite) / 2) * 1.08; // une tête est un peu plus profonde que large
    for (let k = 0; k <= COLONNES; k++) {
      const th = -Math.PI + (2 * Math.PI * k) / COLONNES, sn = Math.sin(th);
      const xp = xn + (sn < 0 ? gauche : droite) * sn;
      pos.push((xp - xMilieu) * s, (yMilieu - y) * s, (Math.cos(th) * prof - prof * 0.12) * s);
      uv.push((xp - x0) / (x1 - x0), 1 - (y - y0) / (y1 - y0));
      avant.push(Math.cos(th));
    }
  }
  for (let r = 0; r < LIGNES; r++) for (let k = 0; k < COLONNES; k++) {
    const a = r * (COLONNES + 1) + k, b = a + COLONNES + 1;
    index.push(a, b, a + 1, a + 1, b, b + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setAttribute('avant', new THREE.Float32BufferAttribute(avant, 1));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}
function tetePhoto(def) {
  if (!cacheTetesPhoto.has(def.texture)) {
    const tex = new THREE.TextureLoader().load(def.texture);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const mat = new THREE.MeshBasicMaterial({ map: tex });
    const cheveux = new THREE.Color(def.cheveux), peau = new THREE.Color(def.peau ?? '#d9a88f');
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.couleurCheveux = { value: cheveux };
      sh.uniforms.couleurPeau = { value: peau };
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float avant;\nvarying float vAvant;\nvarying vec3 vPosObj;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvAvant = avant;\nvPosObj = position;');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nuniform vec3 couleurCheveux;\nuniform vec3 couleurPeau;\nvarying float vAvant;\nvarying vec3 vPosObj;' + BRUIT)
        .replace('#include <map_fragment>', `#include <map_fragment>
          // mèches sur l'arrière du crâne, un peu plus sombres vers la nuque
          float meches = fbm(vPosObj * vec3(150.0, 30.0, 150.0));
          vec3 dos = couleurCheveux * (0.8 + 0.3 * meches) * (0.85 + 0.25 * smoothstep(-0.25, 0.25, vPosObj.y));
          // sur les côtés, sous la ligne des cheveux : la peau (joues, oreilles), puis les cheveux vers l'arrière
          float cote = (1.0 - smoothstep(-0.11, -0.03, vPosObj.y)) * smoothstep(-0.5, 0.0, vAvant);
          vec3 tour = mix(dos, couleurPeau * (0.93 + 0.07 * fbm(vPosObj * 60.0)), cote);
          diffuseColor.rgb = mix(tour, diffuseColor.rgb, smoothstep(0.3, 0.62, vAvant));`);
    };
    mat.customProgramCacheKey = () => 'tete-photo';
    cacheTetesPhoto.set(def.texture, { geo: geometrieTetePhoto(def), mat });
  }
  const { geo, mat } = cacheTetesPhoto.get(def.texture);
  const m = new THREE.Mesh(geo, mat);
  m.position.y = def.decalage ?? 0;
  return m;
}

// ---------------------------------------------------------------- Coiffures (coordonnées locales de la tête)
// Le crâne commun aux deux espèces ; la calotte suit la ligne des cheveux (haute devant, basse derrière).
const CRANE = (x, y, z) => ellipsoide(x, y, z, [0, 0.015, 0], [0.295, 0.24, 0.255]);
const ligneCheveux = (z) => -0.1 + 0.26 * Math.max(0, z / 0.255) ** 1.5;
const calotte = (x, y, z, epaisseur = 0.022) => Math.max(CRANE(x, y, z) - epaisseur, ligneCheveux(z) - y);

const coiffures = {
  // Longs cheveux ondulés jusqu'aux épaules, visage dégagé devant (sous le masque)
  longs: (x, y, z) => {
    const onde = 0.012 * Math.sin(y * 28 + Math.atan2(x, -z) * 3);
    let d = Math.max(CRANE(x, y, z) - 0.026, -0.12 - y);
    d = smin(d, Math.max(ellipsoide(x, y, z, [0, -0.13, -0.05], [0.31, 0.3, 0.25]) - onde, -0.44 - y, z - 0.12), 0.05);
    for (const s of [-1, 1]) d = smin(d, cone(x, y, z, [s * 0.25, -0.02, 0.06], [s * 0.3, -0.4, 0.07], 0.055, 0.035) - onde, 0.03);
    const visage = Math.max(0.1 - z, y - 0.12, (Math.hypot(x / 0.21, Math.max(0, y) / 0.14) - 1) * 0.15);
    return Math.max(d, -visage);
  },
  // Carré au menton, frange droite ; le visage est dégagé devant
  carre: (x, y, z) => {
    let d = Math.max(CRANE(x, y, z) - 0.024, -0.15 - y);
    // ouverture du visage aux coins arrondis : la frange dessine un arc au-dessus du masque
    const visage = Math.max(0.1 - z, y - 0.1, (Math.hypot(x / 0.2, Math.max(0, y) / 0.125) - 1) * 0.15);
    d = Math.max(d, -visage);
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.255, -0.11, 0.04], [0.045, 0.06, 0.06]), 0.03); // mèches avant plus longues
    return d;
  },
  // Frange droite, mèches le long du visage, deux longues tresses lâches devant les épaules
  tresses: (x, y, z) => {
    let d = calotte(x, y, z);
    const basFrange = 0.075 + 0.01 * Math.abs(Math.sin(x * 55));
    // frange : bord bas droit, côtés arrondis qui rejoignent les mèches du visage
    const largeur = 0.2 - Math.max(0, 0.13 - y) * 0.5;
    d = smin(d, Math.max(CRANE(x, y, z) - 0.028, basFrange - y, (Math.abs(x) - largeur) * 0.7, 0.06 - z), 0.03);
    for (const s of [-1, 1]) d = smin(d, cone(x, y, z, [s * 0.2, 0.1, 0.13], [s * 0.235, -0.1, 0.12], 0.03, 0.012), 0.02);
    if (Math.abs(x) > 0.17 && y < 0.06) {
      const s = Math.sign(x);
      for (let i = 0; i <= 7; i++) {
        const t = i / 7, r = 0.036 - 0.012 * t;
        const c = [s * (0.245 + 0.03 * t + (i % 2 ? 0.012 : -0.012)), -0.02 - 0.36 * t, -0.02 + 0.11 * t];
        d = smin(d, ellipsoide(x, y, z, c, [r, r * 1.3, r]), 0.008);
      }
    }
    return d;
  },
  // Cheveux tirés vers un chignon bas torsadé
  chignon: (x, y, z) => {
    let d = calotte(x, y, z);
    d = smin(d, ellipsoide(x, y, z, [0, -0.05, -0.27], [0.12, 0.095, 0.085]), 0.04);           // chignon bas
    d = smin(d, ellipsoide(x, y, z, [0.04, -0.02, -0.325], [0.065, 0.055, 0.045]), 0.02);      // torsade
    d = smin(d, ellipsoide(x, y, z, [-0.045, -0.085, -0.322], [0.065, 0.05, 0.045]), 0.02);
    return d;
  },
  // Coupe masculine courte et texturée : volume sur le dessus, côtés courts,
  // frange en mèches pointues qui retombe sur le front en s'écartant de chaque côté de la raie
  frange: (x, y, z) => {
    let d = Math.max(CRANE(x, y, z) - 0.024, -0.08 + 0.2 * Math.max(0, z / 0.255) ** 1.5 - y);
    d = smin(d, ellipsoide(x, y, z, [0, 0.17, -0.03], [0.26, 0.11, 0.24]), 0.05); // un peu de volume sur le dessus
    for (let k = 0; k < 7; k++) {
      // mèches souples sur le sommet, couchées vers l'arrière
      const a = -0.4 + (k / 6) * 3.9, b = [Math.cos(a) * 0.11, 0.25, Math.sin(a) * 0.08 - 0.05];
      d = smin(d, cone(x, y, z, b, [b[0] * 1.4, 0.275, b[2] - 0.08], 0.045, 0.008), 0.025);
    }
    // arrière : deux rangées de mèches pointues étagées, la seconde effile la nuque
    for (const [y0, long, n] of [[0.13, 0.12, 11], [0.02, 0.12, 10]]) {
      for (let k = 0; k < n; k++) {
        const th = 1.75 + (k / (n - 1)) * 2.8 + (y0 < 0.1 ? 0.12 : 0); // de l'oreille gauche à l'oreille droite, par l'arrière
        const sx = Math.sin(th), cz = Math.cos(th);
        const pointe = [sx * 0.29, y0 - long - (k % 2) * 0.02, cz * 0.27];
        d = smin(d, cone(x, y, z, [sx * 0.265, y0, cz * 0.245], pointe, 0.046, 0.006), 0.01);
      }
    }
    // épi en spirale au sommet de l'arrière du crâne
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2;
      d = smin(d, cone(x, y, z, [0, 0.245, -0.11], [Math.cos(a) * 0.1, 0.235 - Math.abs(Math.sin(a)) * 0.02, -0.11 + Math.sin(a) * 0.08 - 0.02], 0.03, 0.006), 0.015);
    }
    // côtés : quelques mèches qui descendent devant les oreilles
    for (const s of [-1, 1]) {
      for (const dz of [0.0, 0.06]) d = smin(d, cone(x, y, z, [s * 0.27, 0.08, dz], [s * 0.285, -0.03 - dz * 0.3, dz + 0.02], 0.035, 0.005), 0.01);
    }
    // frange longue jusqu'au ras des yeux, mèches bien séparées qui s'écartent de la raie
    const raie = 0.035;
    for (let i = 0; i < 9; i++) {
      const x0 = -0.15 + i * 0.0375, cote = x0 < raie ? -1 : 1, ecart = Math.abs(x0 - raie);
      const haut = [x0, 0.23, 0.12];
      const milieu = [x0 + cote * 0.015, 0.15, 0.228];
      const pointe = [x0 + cote * (0.03 + ecart * 0.25), 0.04 + ecart * 0.15 + (i % 2) * 0.02, 0.262];
      d = smin(d, cone(x, y, z, haut, milieu, 0.04, 0.032), 0.012);
      d = smin(d, cone(x, y, z, milieu, pointe, 0.032, 0.004), 0.006);
    }
    return d;
  },
  // Cheveux mi-courts rejetés en arrière, front dégagé, volume ébouriffé (M. Graber)
  rejetes: (x, y, z) => {
    // ligne du front dégagée (plus basse aux tempes) et calotte qui s'amincit vers le bord : pas d'effet bonnet
    const lim = -0.1 + 0.3 * Math.max(0, z / 0.255) ** 1.5 - 0.07 * Math.min(1, (x / 0.25) ** 2);
    const ep = 0.004 + 0.02 * Math.min(1, Math.max(0, (y - lim) / 0.1));
    let d = Math.max(CRANE(x, y, z) - ep, lim - y);
    d = smin(d, ellipsoide(x, y, z, [0, 0.17, -0.09], [0.22, 0.09, 0.18]), 0.05); // un peu de volume sur le dessus
    for (let i = 0; i < 7; i++) {
      // mèches peignées vers l'arrière : pointe fine au bord du front, puis épaisses et soulevées sur le crâne
      const x0 = -0.15 + i * 0.05, h = (i % 3) * 0.012;
      const front = [x0, 0.15 - h, 0.205 - Math.abs(x0) * 0.3];
      const sommet = [x0 * 1.1, 0.262 + h - x0 * x0 * 2.4, 0.02];
      d = smin(d, cone(x, y, z, front, sommet, 0.008, 0.038), 0.008);
      d = smin(d, cone(x, y, z, sommet, [x0 * 1.3, 0.16, -0.27], 0.04, 0.008), 0.012);
    }
    // côtés : mèches couchées vers l'arrière au-dessus des oreilles
    for (const s of [-1, 1]) {
      for (const [y0, dz] of [[0.12, 0.08], [0.04, 0.02], [0.07, -0.08]]) {
        d = smin(d, cone(x, y, z, [s * (0.265 - Math.max(0, y0 - 0.05) * 0.9), y0 + 0.04, dz + 0.05], [s * 0.29, y0 - 0.09, dz - 0.08], 0.026, 0.005), 0.01);
      }
    }
    // nuque : mèches étagées qui effleurent le col
    for (let k = 0; k < 9; k++) {
      const th = 2.0 + (k / 8) * 2.3, sx = Math.sin(th), cz = Math.cos(th);
      d = smin(d, cone(x, y, z, [sx * 0.26, 0.05, cz * 0.24], [sx * 0.29, -0.12 - (k % 2) * 0.03, cz * 0.27], 0.04, 0.007), 0.01);
    }
    // deux mèches rebelles qui retombent sur le côté du front
    d = smin(d, cone(x, y, z, [0.15, 0.22, 0.15], [0.2, 0.09, 0.225], 0.022, 0.004), 0.01);
    d = smin(d, cone(x, y, z, [-0.18, 0.21, 0.13], [-0.235, 0.1, 0.18], 0.02, 0.004), 0.01);
    return d;
  },
  // Coupe dégradée : couches effilées, nuque longue, épis, petite queue, frange irrégulière
  chonmage: (x, y, z) => {
    let d = calotte(x, y, z, 0.026);
    for (let k = 0; k < 14; k++) {
      const th = -2.6 + (k / 13) * 5.2;
      if (Math.abs(th) < 0.75) continue;
      const sx = Math.sin(th), cz = Math.cos(th), dos = Math.max(0, -cz);
      d = smin(d, cone(x, y, z, [sx * 0.265, 0.1, cz * 0.23], [sx * 0.345, -0.03 - dos * 0.08, cz * 0.3], 0.05, 0.006), 0.015);
      if (Math.abs(th) > 1.6) {
        // couche intermédiaire sur l'arrière : plus d'épaisseur et d'étagement
        d = smin(d, cone(x, y, z, [sx * 0.255, 0.19, cz * 0.225], [sx * 0.31, 0.06 - (k % 2) * 0.02, cz * 0.285], 0.048, 0.007), 0.012);
      }
      if (Math.abs(th) > 1.9) {
        d = smin(d, cone(x, y, z, [sx * 0.24, -0.02, cz * 0.22], [sx * 0.29, -0.22 + (k % 2) * 0.03, cz * 0.275], 0.045, 0.008), 0.015);
      }
    }
    for (const dx of [-0.05, 0, 0.05]) d = smin(d, cone(x, y, z, [dx, 0.24, -0.04], [dx * 1.5, 0.33, -0.12], 0.035, 0.005), 0.012);
    d = smin(d, cone(x, y, z, [0, 0.19, -0.2], [0, 0.23, -0.34], 0.042, 0.01), 0.015);
    for (let i = 0; i < 6; i++) {
      const fx = -0.125 + i * 0.05;
      d = smin(d, cone(x, y, z, [fx, 0.22, 0.14], [fx * 1.05, 0.06 + (i % 3) * 0.018, 0.245], 0.03, 0.005), 0.01);
    }
    return d;
  },
};
const cacheCoiffures = new Map();
function geometrieCoiffure(id) {
  if (!coiffures[id]) return null;
  if (!cacheCoiffures.has(id)) {
    const geo = extraire(coiffures[id], [-0.4, id === 'longs' ? -0.5 : -0.42, -0.4], [0.4, 0.36, 0.33], 0.0055);
    // Dégradé des longs cheveux : châtain foncé en haut, caramel aux pointes
    if (id === 'longs') {
      const p = geo.attributes.position, col = new Float32Array(p.count * 3);
      const haut = new THREE.Color('#5a2f14'), bas = new THREE.Color('#c48a52'), c = new THREE.Color();
      for (let i = 0; i < p.count; i++) {
        c.copy(haut).lerp(bas, Math.min(1, Math.max(0, (0.1 - p.getY(i)) / 0.5)));
        col.set([c.r, c.g, c.b], i * 3);
      }
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    }
    cacheCoiffures.set(id, geo);
  }
  return cacheCoiffures.get(id);
}

// ---------------------------------------------------------------- Pelage (couleur par sommet)
const C = (h) => new THREE.Color(h);
// Transition douce de 0 à 1 entre a et b (b peut être < a)
const lisse = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const melange = (c1, c2, t) => C(c1).lerp(C(c2), t);
function couleursCorps(espece) {
  const p = PELAGE[espece];
  if (espece === 'humain') return (x, y) => melange(p.base, p.clair, lisse(0.13, 0.1, y));
  if (espece === 'shiba') {
    return (x, y, z) => {
      const pieds = lisse(0.125, 0.095, y);
      const pattes = lisse(0.35, 0.32, y) * lisse(0.17, 0.2, Math.abs(x));
      const e = (x / 0.12) ** 2 + ((y - 0.3) / 0.2) ** 2;
      const ventre = lisse(1.12, 0.88, e) * lisse(0.02, 0.07, z);
      return melange(p.base, p.clair, Math.max(pieds, pattes, ventre));
    };
  }
  return (x, y, z) => {
    const jambes = lisse(0.225, 0.195, y) * lisse(0.02, 0.04, Math.abs(x));
    const bras = lisse(0.135, 0.16, Math.abs(x)) * lisse(0.17, 0.2, y);
    const bande = lisse(0.34, 0.38, y) * Math.max(lisse(0.06, 0.02, z), lisse(0.09, 0.12, Math.abs(x)));
    return melange(p.base, p.noir, Math.max(jambes, bras, bande));
  };
}
function couleursTete(espece) {
  const p = PELAGE[espece];
  if (espece === 'humain') return () => C(p.base);
  if (espece === 'shiba') {
    return (x, y, z) => {
      const visage = lisse(0.005, -0.025, y - Math.abs(x) * 0.05) * lisse(0.03, 0.08, z);
      const joues = lisse(0.16, 0.2, Math.abs(x)) * lisse(-0.005, -0.04, y) * lisse(-0.07, -0.03, z);
      let maro = 0;
      for (const s of [-1, 1]) maro = Math.max(maro, lisse(0.028, 0.02, Math.hypot(x - s * 0.1, y - 0.085)) * lisse(0.1, 0.13, z));
      let c = melange(p.base, p.clair, Math.max(visage, joues, maro));
      const oreille = lisse(0.15, 0.18, y) * lisse(-0.04, -0.025, z)
        * lisse(0.06 - (y - 0.16) * 0.3, 0.045 - (y - 0.16) * 0.3, Math.abs(Math.abs(x) - (0.16 + (y - 0.16) * 0.28)));
      return c.lerp(C(p.oreille), oreille);
    };
  }
  return (x, y, z) => {
    let noir = lisse(0.12, 0.14, y) * lisse(0.11, 0.14, Math.abs(x));
    for (const s of [-1, 1]) {
      // taches en larme, inclinées vers l'extérieur et le bas
      const dx = x - s * 0.105, dy = y + 0.01, a = s * 0.6;
      const u = dx * Math.cos(a) + dy * Math.sin(a), v = -dx * Math.sin(a) + dy * Math.cos(a);
      noir = Math.max(noir, lisse(1.15, 0.9, (u / 0.052) ** 2 + (v / 0.072) ** 2) * lisse(0.08, 0.12, z));
    }
    return melange(p.base, p.noir, noir);
  };
}
function couleursQueue() {
  const p = PELAGE.shiba;
  const centre = new THREE.Vector3(0.02, 0.15, -0.085); // centre de la boucle
  const v = new THREE.Vector3(), dehors = new THREE.Vector3(), versCentre = new THREE.Vector3();
  return (x, y, z) => {
    v.set(x, y, z);
    let proche = POINTS_QUEUE[0];
    for (const q of POINTS_QUEUE) if (q.v.distanceToSquared(v) < proche.v.distanceToSquared(v)) proche = q;
    dehors.copy(v).sub(proche.v).normalize();
    versCentre.copy(centre).sub(proche.v).normalize();
    const dessous = lisse(-0.15, 0.35, dehors.dot(versCentre)) * lisse(0.08, 0.2, proche.t);
    const pointe = lisse(0.8, 0.94, proche.t);
    return melange(p.base, p.clair, Math.max(dessous, pointe));
  };
}
function peindre(geo, f) {
  const pos = geo.attributes.position, col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const c = f(pos.getX(i), pos.getY(i), pos.getZ(i));
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

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
    { os: O.hanches, a: [0, 0.12, 0], b: [0, 0.26, 0], r: 0.17 },
    { os: O.colonne, a: [0, 0.26, 0], b: [0, 0.36, 0], r: 0.17 },
    { os: O.poitrine, a: [0, 0.36, 0], b: [0, 0.5, 0], r: 0.14 },
  ];
  ['G', 'D'].forEach((c, i) => {
    s.push({ os: O['epaule' + c], a: J.epaule[i], b: J.coude[i], r: 0.065 });
    s.push({ os: O['coude' + c], a: J.coude[i], b: J.poignet[i], r: 0.065 });
    s.push({ os: O['poignet' + c], a: J.poignet[i], b: [J.poignet[i][0] + 0.01, J.poignet[i][1] - 0.04, J.poignet[i][2] + 0.03], r: 0.068 });
    s.push({ os: O['cuisse' + c], a: J.cuisse[i], b: J.genou[i], r: 0.08 });
    s.push({ os: O['genou' + c], a: J.genou[i], b: J.cheville[i], r: 0.078 });
    s.push({ os: O['cheville' + c], a: J.cheville[i], b: J.orteil[i], r: 0.06 });
  });
  return s;
})();

const cache = new Map();
function geometries(espece) {
  if (cache.has(espece)) return cache.get(espece);
  const geos = {
    corps: peindre(ponderer(extraire(corps, [-0.32, -0.005, -0.2], [0.32, 0.56, 0.24], PAS), SEGMENTS), couleursCorps(espece)),
    tete: peindre(extraire(tetes[espece], [-0.34, -0.24, -0.29], [0.34, 0.38, 0.31], PAS_TETE), couleursTete(espece)),
  };
  if (espece === 'shiba') geos.queue = peindre(extraire(queueShiba, [-0.07, -0.06, -0.21], [0.14, 0.3, 0.09], 0.004), couleursQueue());
  cache.set(espece, geos);
  return geos;
}

// ---------------------------------------------------------------- Masque de renard (kitsune)
function textureKitsune() {
  // Plaque : φ couvre ±0,85 rad (gauche → droite), θ va du haut du front jusque sous le menton.
  // Repères sur 512 px : front ≈ 110, yeux ≈ 230, museau ≈ 300, bouche ≈ 380.
  const cv = document.createElement('canvas');
  cv.width = cv.height = 512;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#fbf8f2';
  ctx.beginPath(); // ovale de masque, un peu plus étroit vers le menton (le reste est transparent)
  ctx.moveTo(256, 18);
  ctx.bezierCurveTo(430, 18, 488, 150, 486, 270);
  ctx.bezierCurveTo(482, 400, 380, 500, 256, 502);
  ctx.bezierCurveTo(132, 500, 30, 400, 26, 270);
  ctx.bezierCurveTo(24, 150, 82, 18, 256, 18);
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.lineCap = 'round';
  // volutes rouges sur le front (comme sur le dessin de Cléo)
  ctx.strokeStyle = '#d9474b';
  ctx.lineWidth = 14;
  for (const [dx, h, c] of [[-36, 70, -26], [0, 96, 0], [36, 70, 26]]) {
    ctx.beginPath(); ctx.moveTo(256 + dx * 0.5, 185); ctx.bezierCurveTo(256 + dx - c, 185 - h * 0.4, 256 + dx + c, 185 - h * 0.7, 256 + dx * 0.8, 185 - h); ctx.stroke();
  }
  for (const s of [-1, 1]) {
    const x = 256 + s * 100, y = 238;
    // grands yeux anime ouverts : iris noir, deux reflets, trait de cils
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse(x, y, 30, 34, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1f1a24';
    ctx.beginPath(); ctx.ellipse(x + s * 2, y + 4, 24, 30, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(x - s * 6, y - 6, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + s * 9, y + 14, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1f1a24'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(x - s * 36, y - 14); ctx.quadraticCurveTo(x, y - 46, x + s * 40, y - 24); ctx.lineTo(x + s * 52, y - 34); ctx.stroke();
    // marques rouges sous l'œil et sur la joue
    ctx.strokeStyle = '#d9474b'; ctx.lineWidth = 12;
    for (let k = 0; k < 2; k++) {
      ctx.beginPath(); ctx.moveTo(x + s * (18 + k * 10), y + 50 + k * 26); ctx.quadraticCurveTo(x + s * (52 + k * 8), y + 40 + k * 26, x + s * (82 + k * 4), y + 54 + k * 26); ctx.stroke();
    }
  }
  // sourire sous le museau
  ctx.strokeStyle = '#2b2333'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(196, 372); ctx.quadraticCurveTo(226, 414, 256, 384); ctx.quadraticCurveTo(286, 414, 316, 372); ctx.stroke();
  ctx.restore();
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let texKitsune = null;
// Le masque couvre tout le visage, du front au menton, et passe devant les cheveux
function masqueKitsune(uni) {
  const m = new THREE.Group();
  texKitsune ??= textureKitsune();
  const blanc = toon('#ffffff', { map: texKitsune, side: THREE.DoubleSide, alphaTest: 0.5 });
  const R = 0.305;
  const plaque = piece(new THREE.SphereGeometry(R, 44, 34, Math.PI / 2 - 0.85, 1.7, Math.PI / 2 - 0.78, 1.6), blanc, 0, 0.0, 0.0);
  plaque.scale.set(1, 1.02, 1);
  const museau = piece(new THREE.SphereGeometry(0.062, 20, 14), uni('#fbf8f2'), 0, -0.05, 0.3);
  museau.scale.set(1, 0.72, 0.85);
  const truffe = piece(new THREE.SphereGeometry(0.017, 12, 8), uni('#ec7b86'), 0, -0.03, 0.352); // petite truffe rose
  truffe.scale.set(1.3, 0.8, 0.7);
  m.add(plaque, museau, truffe);
  for (const s of [-1, 1]) {
    const oreille = new THREE.Group();
    const ext = piece(new THREE.ConeGeometry(0.068, 0.17, 16), uni('#fbf8f2'));
    ext.scale.z = 0.45;
    const int = piece(new THREE.ConeGeometry(0.042, 0.115, 16), uni('#c8383d'), 0, -0.012, 0.017);
    int.scale.z = 0.3;
    oreille.add(ext, int);
    oreille.position.set(s * 0.15, 0.26, 0.18);
    oreille.rotation.set(-0.35, 0, -s * 0.35);
    m.add(oreille);
  }
  return m;
}

// ---------------------------------------------------------------- Construction
export function creerPersonnage(apparence = APPARENCE_DEFAUT) {
  const a = { ...APPARENCE_DEFAUT, ...apparence };
  const espece = PELAGE[a.espece] ? a.espece : 'shiba';
  const p = PELAGE[espece];
  const g = geometries(espece);
  const racine = new THREE.Group();
  const socle = new THREE.Group(); // surélevé après coup si le personnage porte des geta
  racine.add(socle);

  const os = {};
  for (const n of OS) {
    const b = new THREE.Bone();
    b.name = n;
    const q = PARENTS[n] ? ABSOLU[PARENTS[n]] : [0, 0, 0], o = ABSOLU[n];
    b.position.set(o[0] - q[0], o[1] - q[1], o[2] - q[2]);
    (PARENTS[n] ? os[PARENTS[n]] : socle).add(b);
    os[n] = b;
  }
  racine.updateMatrixWorld(true);
  const squelette = new THREE.Skeleton(OS.map((n) => os[n]));

  const fourrure = espece === 'humain'
    ? materiau('#ffffff', { vertexColors: true, motif: 'diffuseColor.rgb *= 0.97 + 0.04 * bruit(vPosObj * 300.0);', liseré: 0.2, cle: 'peau' })
    : materiau('#ffffff', { vertexColors: true, motif: MOTIF_FOURRURE, liseré: 0.32, cle: 'fourrure' });
  const couches = [[g.corps, fourrure]];
  // Col, ourlet et obi s'accordent à la couleur du kimono (y compris une couleur libre)
  const clarte = a.kimono ? new THREE.Color(a.kimono).getHSL({}).l : 0;
  const contraste = clarte > 0.75 ? PALETTE.marine : PALETTE.creme;
  const couleurObi = clarte < 0.3 ? PALETTE.corail : PALETTE.marine;
  const ROUGE_MIKO = '#c8383d';
  if (a.tenue === 'miko') {
    const t = geometriesTissus(), m = geometriesMiko();
    couches.push([m.haut, materiau('#fbf8f2', { liseré: 0.12, cle: 'uni' })], [m.hakama, materiau(ROUGE_MIKO, { liseré: 0.12, cle: 'uni' })],
      [m.bandes, materiau(ROUGE_MIKO, { liseré: 0.1, cle: 'uni' })], [t.col, materiau(ROUGE_MIKO, { liseré: 0.1, cle: 'uni' })],
      [t.obi, materiau(ROUGE_MIKO, { liseré: 0.1, cle: 'uni' })]);
  } else if (a.tenue === 'veste') {
    const v = geometriesVille(), daim = materiau('#9a7048', { motif: MOTIF_FOURRURE, liseré: 0.15, cle: 'daim' });
    couches.push([v.chemise, materiau('#b8323a', { liseré: 0.12, cle: 'uni' })], [v.veste, daim], [v.revers, daim],
      [v.pantalon, materiau('#2e3346', { liseré: 0.12, cle: 'uni' })], [v.chaussures, materiau('#4a3226', { liseré: 0.2, cle: 'uni' })]);
  } else if (a.kimono) {
    const t = geometriesTissus();
    couches.push([t.kimono, materiau(a.kimono, { motif: MOTIF_SEIGAIHA, liseré: 0.12, cle: 'kimono' })],
      [t.col, materiau(contraste, { liseré: 0.1, cle: 'uni' })], [t.ourlet, materiau(contraste, { liseré: 0.1, cle: 'uni' })],
      [t.obi, materiau(couleurObi, { liseré: 0.1, cle: 'uni' })]);
  }
  for (const [geo, mat] of couches) {
    const mesh = new THREE.SkinnedMesh(geo, mat);
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    racine.add(mesh);
    mesh.bind(squelette);
    const c = new THREE.SkinnedMesh(geo, matContour); // contour façon dessin animé
    c.frustumCulled = false;
    racine.add(c);
    c.bind(squelette, mesh.bindMatrix);
  }

  const noir = new THREE.MeshBasicMaterial({ color: p.truffe });
  const blanc = new THREE.MeshBasicMaterial({ color: '#ffffff' });
  const rose = toon(ROSE);
  const sans = (m) => { m.userData.sansContour = true; return m; };
  const fixer = (nom, obj, x, y, z) => {
    obj.position.set(x - ABSOLU[nom][0], y - ABSOLU[nom][1], z - ABSOLU[nom][2]);
    os[nom].add(obj);
    contourner(obj);
    return obj;
  };
  const uni = (c) => materiau(c, { liseré: 0.15, cle: 'uni' });
  const corail = uni(PALETTE.corail), or = uni('#e2b552');

  // Nœud de l'obi (ou du hakama de la miko), sur le devant
  if (a.kimono || a.tenue === 'miko') {
    const noeud = new THREE.Group();
    const matObi = uni(a.tenue === 'miko' ? ROUGE_MIKO : couleurObi);
    noeud.add(piece(new RoundedBoxGeometry(0.045, 0.045, 0.03, 2, 0.01), matObi));
    for (const [dx, rz] of [[-0.012, 0.25], [0.014, -0.2]]) {
      const pan = piece(new RoundedBoxGeometry(0.026, 0.09, 0.012, 2, 0.005), matObi, dx, -0.055, -0.004);
      pan.rotation.z = rz;
      noeud.add(pan);
    }
    if (a.tenue === 'miko') {
      noeud.scale.setScalar(1.4);
      fixer('colonne', noeud, 0, 0.27, 0.21);
    } else fixer('colonne', noeud, 0.07, 0.27, 0.205);
  }

  // Geta : semelle de bois, deux dents, lanière (le personnage est surélevé d'autant)
  if (a.geta) {
    const bois = uni('#9a6a44'), hanao = uni(a.geta);
    ['G', 'D'].forEach((c, i) => {
      const geta = new THREE.Group();
      geta.add(piece(new RoundedBoxGeometry(0.15, 0.022, 0.24, 2, 0.007), bois));
      for (const dz of [0.065, -0.065]) geta.add(piece(new THREE.BoxGeometry(0.13, 0.028, 0.026), bois, 0, -0.024, dz));
      const lanière = piece(new THREE.TorusGeometry(0.084, 0.009, 8, 20, Math.PI), hanao, 0, 0.011, 0.02);
      lanière.scale.y = 1.2;
      geta.add(lanière, piece(new THREE.SphereGeometry(0.012, 10, 8), hanao, 0, 0.03, 0.1));
      fixer('cheville' + c, geta, J.orteil[i][0], -0.012, 0.05);
    });
  }

  // Lunettes de soleil accrochées à l'ouverture de la chemise
  if (a.lunettes) {
    const l = new THREE.Group(), verre = new THREE.MeshBasicMaterial({ color: '#1e2128' });
    for (const s of [-1, 1]) {
      const v = piece(new THREE.SphereGeometry(0.024, 14, 10), verre, s * 0.027, 0, 0);
      v.scale.set(1, 1.05, 0.25);
      l.add(sans(v), piece(new THREE.TorusGeometry(0.024, 0.003, 6, 18), or, s * 0.027, 0, 0.002));
    }
    l.add(piece(new THREE.CylinderGeometry(0.0025, 0.0025, 0.012, 6), or, 0, 0.012, 0.002));
    l.rotation.set(-0.3, 0, 0.05);
    fixer('poitrine', l, 0.0, 0.37, 0.19);
  }

  // Accessoires
  if (a.accessoire === 'sac') {
    const toile = uni(PALETTE.marine);
    const sac = new THREE.Group();
    sac.add(piece(new RoundedBoxGeometry(0.2, 0.19, 0.085, 3, 0.03), toile));
    sac.add(piece(new RoundedBoxGeometry(0.205, 0.08, 0.09, 3, 0.025), corail, 0, 0.065, 0.002));
    sac.add(piece(new THREE.BoxGeometry(0.03, 0.035, 0.01), or, 0, 0.03, -0.047));
    fixer('poitrine', sac, 0, 0.375, -0.205);
    for (const s of [-1, 1]) {
      const pts = [[0.07, 0.45, -0.17], [0.1, 0.515, -0.05], [0.11, 0.48, 0.1], [0.12, 0.37, 0.176], [0.145, 0.28, 0.1], [0.09, 0.3, -0.17]]
        .map(([x, y, z]) => new THREE.Vector3(s * x - J.poitrine[0], y - J.poitrine[1], z - J.poitrine[2]));
      const sangle = piece(geoMeche(pts, 0.016, 0.005, new THREE.Vector3(1, 0, 0), { affiner: false }), toile);
      os.poitrine.add(sangle);
      contourner(sangle);
    }
  } else if (a.accessoire === 'sacoche') {
    const toile = uni(PALETTE.marine);
    const pts = [[0.11, 0.5, 0.0], [0.05, 0.445, 0.16], [-0.05, 0.33, 0.185], [-0.14, 0.24, 0.155], [-0.19, 0.19, 0.07]]
      .map(([x, y, z]) => new THREE.Vector3(x - J.poitrine[0], y - J.poitrine[1], z - J.poitrine[2]));
    const sangle = piece(geoMeche(pts, 0.014, 0.005, new THREE.Vector3(0.6, 0.6, 0), { affiner: false }), toile);
    os.poitrine.add(sangle);
    contourner(sangle);
    const sacoche = new THREE.Group();
    sacoche.add(piece(new RoundedBoxGeometry(0.11, 0.085, 0.045, 3, 0.015), toile));
    sacoche.add(piece(new RoundedBoxGeometry(0.112, 0.045, 0.048, 3, 0.015), corail, 0, 0.022, 0));
    sacoche.add(piece(new THREE.SphereGeometry(0.008, 8, 6), or, 0, 0.002, 0.025));
    sacoche.rotation.y = -1.0;
    fixer('hanches', sacoche, -0.21, 0.15, 0.07);
  }
  if (a.katana) {
    const k = new THREE.Group();
    k.add(piece(new THREE.CapsuleGeometry(0.013, 0.3, 4, 10), uni('#1d1f2a'), 0, -0.17, 0));
    k.add(piece(new THREE.CylinderGeometry(0.015, 0.015, 0.015, 10), or, 0, -0.33, 0));
    k.add(piece(new THREE.CylinderGeometry(0.03, 0.03, 0.008, 18), or, 0, 0.005, 0));
    k.add(piece(new THREE.CylinderGeometry(0.012, 0.013, 0.12, 10), corail, 0, 0.07, 0));
    for (let i = 0; i < 4; i++) {
      const tresse = piece(new THREE.TorusGeometry(0.013, 0.0035, 4, 10), uni(PALETTE.creme), 0, 0.025 + i * 0.026, 0);
      tresse.rotation.x = Math.PI / 2;
      k.add(tresse);
    }
    k.add(piece(new THREE.SphereGeometry(0.015, 10, 8), or, 0, 0.135, 0));
    k.rotation.set(1.3, 0, -0.3);
    fixer('hanches', k, a.kimono ? -0.225 : -0.17, 0.27, a.kimono ? 0.1 : 0.07); // passé par-dessus le kimono s'il y en a un
  }

  // Coussinets roses sur l'intérieur des pattes avant (animaux seulement)
  if (espece !== 'humain') ['G', 'D'].forEach((c, i) => {
    const s = i ? 1 : -1;
    const cous = new THREE.Group();
    cous.position.set(-s * 0.03, -0.02, 0.07);
    cous.rotation.y = -s * 0.5;
    const paume = piece(new THREE.SphereGeometry(0.022, 12, 10), rose);
    paume.scale.set(1.2, 1, 0.45);
    cous.add(sans(paume));
    for (const [dx, dy] of [[-0.022, 0.028], [0, 0.036], [0.022, 0.028]]) {
      const doigt = piece(new THREE.SphereGeometry(0.009, 10, 8), rose, dx, dy, 0.002);
      doigt.scale.z = 0.5;
      cous.add(sans(doigt));
    }
    os['poignet' + c].add(cous);
  });

  // Tête (rigide, sur l'os de la tête)
  const tete = new THREE.Group();
  tete.position.set(TETE[0] - J.tete[0], TETE[1] - J.tete[1], TETE[2] - J.tete[2]);
  os.tete.add(tete);
  const photo = !!a.tetePhoto; // tête réaliste tirée d'une photo (M. Graber) : pas de traits dessinés
  tete.add(photo ? tetePhoto(a.tetePhoto) : new THREE.Mesh(g.tete, fourrure));
  const yeux = [];
  if (a.masque === 'kitsune') tete.add(masqueKitsune(uni));
  else if (!photo) for (const s of [-1, 1]) {
    const oeil = new THREE.Group();
    oeil.rotation.y = s * 0.42;
    if (espece === 'shiba') {
      // petits yeux noirs ovales avec un reflet
      oeil.position.set(s * 0.1, 0.02, 0.232);
      const globe = piece(new THREE.SphereGeometry(0.022, 16, 12), noir);
      globe.scale.set(0.9, 1.15, 0.4);
      oeil.add(sans(globe), sans(piece(new THREE.SphereGeometry(0.0075, 10, 8), blanc, -s * 0.006, 0.01, 0.009)));
    } else if (espece === 'humain') {
      // œil d'anime rieur : blanc, iris bleu-gris, pupille, reflet, paupière marquée et sourcil
      oeil.position.set(s * 0.095, 0.0, 0.238);
      const globe = piece(new THREE.SphereGeometry(0.03, 18, 14), blanc);
      globe.scale.set(1, 0.72, 0.3);
      const iris = piece(new THREE.SphereGeometry(0.021, 16, 12), new THREE.MeshBasicMaterial({ color: '#5d7896' }), 0, -0.002, 0.005);
      iris.scale.set(0.95, 0.95, 0.3);
      const pupille = piece(new THREE.SphereGeometry(0.011, 12, 10), new THREE.MeshBasicMaterial({ color: '#1b2230' }), 0, -0.002, 0.008);
      pupille.scale.z = 0.3;
      const paupiere = piece(new THREE.TorusGeometry(0.031, 0.0045, 6, 18, Math.PI), new THREE.MeshBasicMaterial({ color: '#4a3226' }), 0, -0.002, 0.006);
      paupiere.scale.set(1.05, 0.75, 1);
      const sourcil = piece(new THREE.CapsuleGeometry(0.006, 0.04, 4, 8), new THREE.MeshBasicMaterial({ color: '#8a6a45' }), s * 0.004, 0.05, 0.004);
      sourcil.rotation.z = Math.PI / 2 - s * 0.18;
      oeil.add(sans(globe), sans(iris), sans(pupille), sans(paupiere), sans(sourcil),
        sans(piece(new THREE.SphereGeometry(0.0065, 10, 8), blanc, -s * 0.006, 0.006, 0.011)));
    } else {
      // dans la tache noire : un œil brillant et deux reflets
      oeil.position.set(s * 0.1, 0.0, 0.236);
      const globe = piece(new THREE.SphereGeometry(0.02, 16, 12), new THREE.MeshBasicMaterial({ color: '#000000' }));
      globe.scale.set(1, 1.15, 0.4);
      oeil.add(sans(globe), sans(piece(new THREE.SphereGeometry(0.0085, 10, 8), blanc, -s * 0.004, 0.009, 0.009)),
        sans(piece(new THREE.SphereGeometry(0.004, 8, 6), blanc, s * 0.006, -0.008, 0.009)));
    }
    tete.add(oeil);
    yeux.push(oeil);
    // Joues roses avec trois petits traits
    const joue = new THREE.Group();
    joue.position.set(s * 0.19, -0.07, 0.19);
    joue.rotation.y = s * 0.75;
    const tache = piece(new THREE.SphereGeometry(0.035, 14, 10), new THREE.MeshBasicMaterial({ color: ROSE, transparent: true, opacity: 0.75 }));
    tache.scale.set(1.3, 0.75, 0.2);
    joue.add(sans(tache));
    if (espece !== 'humain') for (const k of [-1, 0, 1]) {
      const trait = piece(new THREE.BoxGeometry(0.003, 0.016, 0.003), new THREE.MeshBasicMaterial({ color: '#e7788a' }), k * 0.015, 0, 0.008);
      trait.rotation.z = 0.5;
      joue.add(sans(trait));
    }
    tete.add(joue);
  }
  // Visage humain : petit nez et grand sourire
  if (!a.masque && espece === 'humain' && !photo) {
    const nez = piece(new THREE.SphereGeometry(0.012, 10, 8), toon('#e9b89c'), 0, -0.05, 0.262);
    nez.scale.set(1, 0.8, 0.6);
    tete.add(sans(nez));
    const sourire = piece(new THREE.TorusGeometry(0.04, 0.0045, 6, 20, Math.PI * 0.8), new THREE.MeshBasicMaterial({ color: '#7a3a32' }), 0.006, -0.075, 0.248);
    sourire.rotation.z = Math.PI + Math.PI * 0.1 - 0.12; // en coin, un peu narquois comme sur la photo
    sourire.scale.set(1, 0.6, 1);
    sourire.rotation.x = -0.25;
    tete.add(sans(sourire));
  }
  // Truffe et bouche en ω
  if (!a.masque && espece !== 'humain') {
  const zMuseau = 0.282;
  const truffe = piece(new THREE.SphereGeometry(0.02, 16, 12), noir, 0, -0.045, zMuseau);
  truffe.scale.set(1.25, 0.8, 0.6);
  tete.add(sans(truffe));
  const refletTruffe = piece(new THREE.SphereGeometry(0.006, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 }), -0.008, -0.038, zMuseau + 0.01);
  refletTruffe.scale.set(1.4, 0.7, 0.5);
  tete.add(sans(refletTruffe));
  for (const s of [-1, 1]) {
    const arc = piece(new THREE.TorusGeometry(0.014, 0.003, 6, 14, Math.PI), noir, s * 0.014, -0.07, zMuseau - 0.012);
    arc.rotation.z = Math.PI;
    tete.add(sans(arc));
  }
  }

  // Queue (rigide, sur le bassin)
  const queue = new THREE.Group();
  if (espece === 'shiba') {
    queue.add(new THREE.Mesh(g.queue, fourrure));
    queue.position.set(QUEUE_BASE[0] - J.hanches[0], QUEUE_BASE[1] - J.hanches[1], QUEUE_BASE[2] - J.hanches[2]);
    queue.scale.setScalar(1.35); // panache bien visible derrière la grosse tête
  } else if (espece === 'panda') {
    queue.add(piece(new THREE.SphereGeometry(0.045, 16, 12), materiau(p.base, { motif: MOTIF_FOURRURE, cle: 'fourrure-uni' })));
    queue.position.set(0, 0.2 - J.hanches[1], -0.17);
  }
  os.hanches.add(queue);
  const cheveux = materiau(a.cheveux, { motif: MOTIF_FOURRURE, liseré: 0.25, cle: 'cheveux' });
  const touffe = new THREE.Group();
  const geoCoiffure = geometrieCoiffure(a.coiffure);
  if (geoCoiffure) touffe.add(new THREE.Mesh(geoCoiffure, geoCoiffure.attributes.color
    ? materiau('#ffffff', { vertexColors: true, motif: MOTIF_FOURRURE, liseré: 0.25, cle: 'cheveux-degrade' }) : cheveux));
  if (a.coiffure === 'tresses') {
    // liens corail au bout des tresses + fleur blanche sur le côté
    for (const s of [-1, 1]) touffe.add(piece(new THREE.SphereGeometry(0.02, 12, 10), corail, s * 0.28, -0.35, 0.075));
    // fleur blanche posée sur la coiffure, tournée vers l'extérieur, avec deux feuilles
    const fleur = new THREE.Group();
    const blancFleur = uni('#ffffff');
    for (const [dx, dy, rz] of [[-0.035, -0.03, 0.9], [0.035, -0.035, -0.9]]) {
      const feuille = piece(new THREE.SphereGeometry(0.03, 10, 8), uni('#6aa845'), dx, dy, -0.01);
      feuille.scale.set(1.6, 0.6, 0.3);
      feuille.rotation.z = rz;
      fleur.add(feuille);
    }
    for (let i = 0; i < 16; i++) {
      const an = (i / 16) * Math.PI * 2, r = i % 2 ? 0.042 : 0.03;
      const petale = piece(new THREE.SphereGeometry(0.02, 10, 8), blancFleur, Math.cos(an) * r, Math.sin(an) * r, (i % 2) * -0.008);
      petale.scale.set(1.25, 0.8, 0.5);
      petale.rotation.z = an;
      fleur.add(petale);
    }
    fleur.add(piece(new THREE.SphereGeometry(0.02, 12, 10), uni('#f3cf6a'), 0, 0, 0.01));
    fleur.position.set(0.18, 0.195, 0.165); // sur le dessus de la frange, côté droit, bien visible de face
    fleur.rotation.set(-0.6, 0.75, 0);
    fleur.scale.setScalar(1.3);
    touffe.add(fleur);
  } else if (a.coiffure === 'chignon') {
    // deux baguettes en bois croisées dans le chignon, perles rouges au bout
    const bois = uni('#c9a46a');
    for (const s of [-1, 1]) {
      const baguette = new THREE.Group();
      baguette.add(piece(new THREE.CylinderGeometry(0.0065, 0.005, 0.32, 8), bois));
      for (let i = 0; i < 3; i++) baguette.add(piece(new THREE.SphereGeometry(0.008, 8, 6), corail, 0, 0.1 + i * 0.02, 0));
      baguette.position.set(0, -0.05, -0.335);
      baguette.rotation.set(0.25, 0, s * 0.75);
      touffe.add(baguette);
    }
  } else if (a.coiffure === 'carre' || a.coiffure === 'longs') {
    for (const s of [-1, 1]) {
      // attaches sombres sur les mèches de côté (plus bas et plus larges sur les cheveux longs)
      const longs = a.coiffure === 'longs';
      const attache = piece(new THREE.CylinderGeometry(longs ? 0.06 : 0.03, longs ? 0.058 : 0.03, 0.04, 16), uni('#3a2a24'),
        s * (longs ? 0.268 : 0.255), longs ? -0.13 : -0.09, longs ? 0.064 : 0.04);
      attache.rotation.z = longs ? s * 0.12 : 0;
      touffe.add(attache);
    }
  } else if (a.coiffure === 'chonmage') {
    const lien = piece(new THREE.TorusGeometry(0.03, 0.009, 8, 16), corail, 0, 0.2, -0.22);
    lien.rotation.y = Math.PI / 2;
    lien.rotation.z = 0.3;
    touffe.add(lien);
  }
  tete.add(touffe);
  contourner(tete);
  contourner(queue);

  // Les geta surélèvent tout le personnage (après la liaison au squelette)
  socle.position.y = a.geta ? 0.05 : 0;

  racine.userData = { os, yeux, queue, yHanches: J.hanches[1], phase: Math.random() * 6, clignement: 1 + Math.random() * 3 };
  return racine;
}

// ---------------------------------------------------------------- Animation (dandinement chibi)
export function animerPersonnage(perso, dt, vitesse) {
  const u = perso.userData, o = u.os;
  const marche = Math.min(vitesse / 4, 1), repos = 1 - marche;
  u.phase += dt * (3 + vitesse * 2.6);
  const s = Math.sin(u.phase);
  [['G', 1], ['D', -1]].forEach(([c, sens]) => {
    o['cuisse' + c].rotation.x = -s * 0.55 * marche * sens;
    o['genou' + c].rotation.x = 0;
    o['epaule' + c].rotation.x = s * 0.6 * marche * sens;
    o['epaule' + c].rotation.z = (sens > 0 ? -1 : 1) * (0.05 + Math.sin(u.phase * 0.4) * 0.04 * repos);
  });
  o.hanches.position.y = u.yHanches + Math.abs(Math.cos(u.phase)) * 0.035 * marche;
  o.hanches.rotation.z = s * 0.08 * marche; // dandinement
  o.colonne.rotation.x = Math.sin(u.phase * 0.6) * 0.02 * repos;
  o.tete.rotation.z = Math.sin(u.phase * 0.5) * 0.05 * repos - s * 0.05 * marche;
  u.queue.rotation.y = Math.sin(u.phase * (marche ? 1 : 2.5)) * 0.4; // la queue remue (groupe vide chez l'humain)
  u.clignement -= dt;
  const ferme = u.clignement < 0;
  for (const oeil of u.yeux) oeil.scale.y = ferme ? 0.12 : 1;
  if (u.clignement < -0.12) u.clignement = 2 + Math.random() * 3;
}
