// Avatars animaux chibi (style kawaii) : shiba, panda, panda roux ou capybara.
// Grosse tête ronde « mochi » posée sur un petit corps rond, pattes courtes à coussinets roses,
// petits yeux, joues roses, bouche en ω. Pelage peint par sommet, corps animé par un squelette.
// Habits (kimono, obi, geta), touffe coiffée et accessoires (sac, sacoche, katana) en option.
// Origine aux pieds, regarde vers +z, hauteur ≈ 1,15 m oreilles comprises. Géométries mises en cache par espèce.
import * as THREE from 'three';
import { PALETTE } from './niveaux.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { smin, ellipsoide, cone, le_long, extraire, ponderer } from './sculpture.js';
import { toon, matContour, contourner, piece, geoMeche, teinte } from './personnage-details.js';
import { coupeMeches, COUPES_MECHES, ANCRES } from './cheveux.js';

export const OPTIONS = {
  espece: [{ id: 'shiba', nom: 'Shiba' }, { id: 'panda', nom: 'Panda' }, { id: 'pandaRoux', nom: 'Panda roux' }, { id: 'capybara', nom: 'Capybara' }],
  genre: [
    { id: 'homme', nom: 'Homme' }, { id: 'femme', nom: 'Femme' }, { id: 'neutre', nom: 'Neutre' },
  ],
  // Coiffures des animaux : une touffe de poils coiffée sur la tête
  // Coupes en mèches fines inspirées des photos de références/personnages (Femmes, Hommes)
  coiffure: [
    { id: 'aucune', nom: 'Au naturel' }, { id: 'tresses', nom: 'Frange et tresses' },
    { id: 'chignon', nom: 'Chignon haut' }, { id: 'chignonBas', nom: 'Chignon bas sur le côté' },
    { id: 'wolf', nom: 'Wolf cut' }, { id: 'manbun', nom: 'Chignon samouraï' }, { id: 'coreen', nom: 'Coupe coréenne' },
  ],
  // Couleurs d'office (références/personnages/Kimono/Couleurs d'office)
  kimono: [PALETTE.corail, PALETTE.rose, PALETTE.rosePale, PALETTE.bleu, PALETTE.creme, PALETTE.marine],
  // Motifs du tissu (références/personnages/Kimono/Texture)
  motif: [
    { id: 'sakura', nom: 'Fleurs de sakura' }, { id: 'asanoha', nom: 'Asanoha' }, { id: 'nuages', nom: 'Nuages' },
    { id: 'vagues', nom: 'Vagues et fleurs' }, { id: 'seigaiha', nom: 'Seigaiha' }, { id: 'uni', nom: 'Uni' },
  ],
  ceinture: ['#1f1f24', '#3b3e45', '#d9c6a3', '#f7f4ee'], // noir, anthracite, beige, blanc
  // Baguettes plantées dans les chignons (références/personnages/accessoirs/Baguettes)
  baguettes: [{ id: 'bois', nom: 'Bois et perles' }, { id: 'sakura', nom: 'Fleurs de sakura' }, { id: 'momiji', nom: 'Feuilles d’érable' }],
  cheveux: ['#2a2a2e', '#5a3a2a', '#a8643a', '#e8d2a6', '#f8a0ab'],
  yeux: ['#3b6fd1', '#6b4a33', '#3f8f7a', '#c0506a', '#7a5bc4'],
  // Plusieurs accessoires peuvent se porter ensemble ; ils prennent la couleur du kimono
  accessoire: [
    { id: 'ombrelle', nom: 'Ombrelle japonaise' }, { id: 'masque', nom: 'Masque de renard' }, { id: 'eventail', nom: 'Éventail' },
    { id: 'sac', nom: 'Sac à dos' }, { id: 'sacoche', nom: 'Sacoche' },
  ],
  geta: [PALETTE.corail, PALETTE.marine, PALETTE.creme],
};

export const APPARENCE_DEFAUT = {
  espece: 'shiba', genre: 'neutre', coiffure: 'aucune', kimono: null, cheveux: '#5a3a2a', yeux: '#3b6fd1',
  accessoire: 'aucun', katana: false, geta: null, ceinture: null, baguettes: 'bois',
};
// Motif proposé d'office pour chaque couleur de kimono (on peut ensuite en choisir un autre)
export const MOTIF_PAR_COULEUR = {
  [PALETTE.corail]: 'seigaiha', [PALETTE.rose]: 'asanoha', [PALETTE.rosePale]: 'sakura',
  [PALETTE.bleu]: 'nuages', [PALETTE.creme]: 'sakura', [PALETTE.marine]: 'vagues',
};
export const motifDe = (a) => a.motif ?? MOTIF_PAR_COULEUR[a.kimono] ?? 'seigaiha';
// Liste des accessoires portés (les anciennes parties n'en avaient qu'un : `accessoire`)
export const accessoiresDe = (a) => a.accessoires ?? (a.accessoire && a.accessoire !== 'aucun' ? [a.accessoire] : []);
// Anciennes coupes remplacées par les nouvelles
const COUPES_REMPLACEES = { frange: 'coreen', chonmage: 'wolf' };

// Étape actuelle : avatars animaux. Le vestiaire ne propose que ce qui est déjà modélisé.
export const CATEGORIES_DISPONIBLES = ['espece', 'coiffure', 'baguettes', 'cheveux', 'kimono', 'motif', 'ceinture', 'geta', 'accessoire', 'arme', 'prenom'];

// Pas des grandes surfaces (corps, tête, coiffures) : ~1 cm suffit à l'écran et divise les triangles par ~2,5.
// Les petites pièces (col, boutons, obi, queue…) gardent leur pas fin pour ne pas disparaître.
const PAS = 0.012;
const PAS_TETE = 0.0095;

const PELAGE = {
  shiba: { base: '#eba04e', clair: '#fbf1e2', oreille: '#f6bfae', truffe: '#3a2a26' },
  panda: { base: '#fbfaf6', noir: '#1f1f24', truffe: '#1f1f24' },
  // panda roux : roux vif, masque blanc, pattes et ventre brun-noir, queue annelée
  pandaRoux: { base: '#c45a26', clair: '#fbf5ec', sombre: '#2e1d18', anneau: '#e7a466', truffe: '#2a1d1a' },
  // capybara : brun doux, dessous un peu plus clair, museau et pattes plus foncés
  capybara: { base: '#9a6d4b', clair: '#b98f6a', sombre: '#6e4a32', truffe: '#3a2a22' },
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
float fbm(vec3 p) { return 0.5 * bruit(p) + 0.3 * bruit(p * 2.07) + 0.2 * bruit(p * 4.13); }
vec2 hash2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
// Fleur de sakura : cinq pétales échancrés au bout ; 1 dedans, 0 dehors
float sakura(vec2 p, float r, float rot) {
  float a = atan(p.y, p.x) + rot, d = length(p), pe = abs(cos(a * 2.5));
  float bord = r * (0.5 + 0.5 * pow(pe, 0.5)) - r * 0.18 * smoothstep(0.93, 1.0, pe);
  return 1.0 - smoothstep(bord - 0.0035, bord + 0.0035, d);
}`;

// Matériau toon enrichi : `motif` est du GLSL qui modifie diffuseColor à partir de vPosObj (position au repos)
// `projection` (motifs de tissu) : 'cyl' autour du corps, 'xz' ou 'xy' pour une pièce plate (ombrelle, éventail).
// `meche` : la géométrie porte l'attribut `meche` (coordonnées le long des mèches de cheveux).
const PROJECTIONS = {
  cyl: 'vec2 cm = vec2(atan(vPosObj.x, vPosObj.z) * 0.22, vPosObj.y);',
  xz: 'vec2 cm = vPosObj.xz;',
  xy: 'vec2 cm = vPosObj.xy;',
};
function materiau(couleur, { vertexColors = false, motif = '', liseré = 0.3, cle = '', projection = 'cyl', meche = false, side } = {}) {
  const m = new THREE.MeshToonMaterial({ color: couleur, vertexColors, gradientMap: degradeDoux });
  if (side !== undefined) m.side = side;
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosObj;' + (meche ? 'attribute vec2 meche; varying vec2 vMeche;' : ''))
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosObj = position;' + (meche ? 'vMeche = meche;' : ''));
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPosObj;' + (meche ? 'varying vec2 vMeche;' : '') + BRUIT)
      .replace('#include <color_fragment>', '#include <color_fragment>\n' + (motif.includes('cm') ? PROJECTIONS[projection] : '') + motif)
      .replace('#include <opaque_fragment>', `
        float bord = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);
        // liseré teinté par la couleur du pelage : duveteux sur le clair, discret sur le noir
        outgoingLight += mix(diffuseColor.rgb, vec3(1.0, 0.97, 0.92), 0.35) * bord * ${liseré.toFixed(2)};
        #include <opaque_fragment>`);
  };
  m.customProgramCacheKey = () => 'mediaventure-' + cle + (motif.includes('cm') ? '-' + projection : '');
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

// Chemise à carreaux (M. Haenssler) : bandes de couleur qui se croisent sur fond blanc, plus un fin filet sombre
const MOTIF_CARREAUX = `
  vec2 q = vec2(vPosObj.x + vPosObj.z * 0.6, vPosObj.y) * 15.0;
  float bx = 1.0 - smoothstep(0.4, 0.44, fract(q.x)), by = 1.0 - smoothstep(0.4, 0.44, fract(q.y));
  float filet = max(1.0 - smoothstep(0.02, 0.05, abs(fract(q.x) - 0.66)), 1.0 - smoothstep(0.02, 0.05, abs(fract(q.y) - 0.66)));
  vec3 rouge = diffuseColor.rgb;
  diffuseColor.rgb = mix(vec3(0.97, 0.95, 0.93), rouge, clamp(0.6 * (bx + by), 0.0, 1.0));
  diffuseColor.rgb = mix(diffuseColor.rgb, rouge * 0.55, filet * 0.6);`;

// Cheveux en mèches : fines stries le long de chaque mèche, racine un peu plus sombre, reflet brillant en anneau
const MOTIF_CHEVEUX = `
  float stries = 0.5 + 0.5 * sin(vMeche.x * 18.85 + bruit(vPosObj * 90.0) * 2.5);
  float fil = bruit(vec3(vMeche.x * 40.0, vMeche.y * 3.0, 0.0));
  diffuseColor.rgb *= 0.84 + 0.12 * stries + 0.08 * fil;
  diffuseColor.rgb *= mix(1.0, 0.82, smoothstep(0.75, 1.0, vMeche.y)); // racines
  diffuseColor.rgb *= 0.62 + 0.38 * pow(vMeche.x, 0.6); // sillon sombre au bord de chaque mèche
  float reflet = smoothstep(0.42, 0.52, vMeche.y) * (1.0 - smoothstep(0.58, 0.7, vMeche.y)) * step(0.001, vMeche.y);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.3 + 0.07, reflet * (0.35 + 0.35 * stries));`;

// Kimono : teintes d'accompagnement tirées de la couleur du tissu (clair, moyen ou foncé), communes à tous les motifs
const TEINTES_KIMONO = `
  vec3 base = diffuseColor.rgb;
  float lum = dot(base, vec3(0.2126, 0.7152, 0.0722));
  const vec3 CREME = vec3(0.88, 0.79, 0.64), CORAIL = vec3(1.0, 0.14, 0.145), ROSE = vec3(0.94, 0.35, 0.41);
  const vec3 MARINE = vec3(0.018, 0.034, 0.063), BLEU = vec3(0.33, 0.45, 0.67), OR = vec3(0.72, 0.48, 0.12);
  vec3 A = lum > 0.55 ? CORAIL : lum > 0.15 ? vec3(0.98, 0.95, 0.9) : ROSE;
  vec3 B = lum > 0.55 ? ROSE : lum > 0.15 ? CREME : CREME;
  vec3 L = lum > 0.15 ? mix(base, MARINE, 0.7) : mix(base, BLEU, 0.75);
  vec3 col = base;`;
const TRAME = 'diffuseColor.rgb = col * (0.95 + 0.07 * bruit(vPosObj * 500.0));';
// Fleurs de sakura éparpillées, avec cœur doré et pétales qui volent
const FLEURS = (taille, densite) => `
  {
    vec2 g = cm / ${taille}; vec2 id = floor(g), h = hash2(id);
    vec2 p = (fract(g) - 0.5 - (h - 0.5) * 0.3) * ${taille};
    float r = ${taille} * (0.24 + 0.14 * h.x);
    float fl = sakura(p, r, h.y * 6.28) * step(${densite}, h.y);
    col = mix(col, h.x > 0.5 ? A : B, fl);
    col = mix(col, OR, fl * (1.0 - smoothstep(r * 0.16, r * 0.26, length(p))));
    vec2 g2 = cm / (${taille} * 0.5) + 0.37; vec2 h2 = hash2(floor(g2) + 7.0);
    vec2 q = (fract(g2) - 0.5) * ${taille} * 0.5; float an = h2.x * 6.28;
    q = mat2(cos(an), -sin(an), sin(an), cos(an)) * q;
    float pet = 1.0 - smoothstep(0.8, 1.0, length(q / vec2(0.008, 0.0045)));
    col = mix(col, B, pet * step(0.72, h2.y) * (1.0 - fl));
  }`;
const MOTIFS_KIMONO = {
  sakura: TEINTES_KIMONO + FLEURS('0.085', '0.18') + TRAME,
  // étoiles de feuilles de chanvre : grille de triangles + rayons du centre vers les sommets
  asanoha: TEINTES_KIMONO + `
    vec2 q = cm / 0.06; q = vec2(q.x - q.y * 0.57735, q.y * 1.1547);
    vec2 f = fract(q);
    vec3 b = (f.x + f.y < 1.0) ? vec3(1.0 - f.x - f.y, f.x, f.y) : vec3(f.x + f.y - 1.0, 1.0 - f.y, 1.0 - f.x);
    float arete = min(b.x, min(b.y, b.z));
    float rayon = b.x >= max(b.y, b.z) ? abs(b.y - b.z) : (b.y >= b.z ? abs(b.x - b.z) : abs(b.x - b.y));
    col = mix(col, L, (1.0 - smoothstep(0.03, 0.065, min(arete, rayon * 0.577))) * 0.9);` + TRAME,
  // nuages ronds crème cernés d'or sur des stries ondulées (ruban bleu des références)
  nuages: TEINTES_KIMONO + `
    float st = sin(cm.y * 75.0 + sin(cm.x * 22.0) * 2.0);
    col = mix(col, L, smoothstep(0.85, 0.97, st) * 0.6);
    vec2 t = vec2(0.15, 0.11); vec2 g = cm / t; vec2 id = floor(g), h = hash2(id);
    g.x += mod(id.y, 2.0) * 0.5;
    vec2 p = (fract(g) - 0.5) * t - (h - 0.5) * 0.02;
    float d = min(min(length(p - vec2(-0.026, 0.0)) - 0.019, length(p - vec2(0.0, 0.012)) - 0.025),
                  min(length(p - vec2(0.029, -0.001)) - 0.018, max(abs(p.y + 0.012) - 0.009, abs(p.x) - 0.046)));
    float on = step(0.3, h.x);
    col = mix(col, OR, (1.0 - smoothstep(-0.0005, 0.0025, d)) * on);
    col = mix(col, A, (1.0 - smoothstep(-0.006, -0.0035, d)) * on);
    float spirale = abs(fract(length(p - vec2(0.0, 0.012)) * 120.0) - 0.5);
    col = mix(col, OR, (1.0 - smoothstep(0.1, 0.22, spirale)) * (1.0 - smoothstep(-0.012, -0.008, length(p - vec2(0.0, 0.012)) - 0.025)) * on * 0.6);` + TRAME,
  // vagues en lignes fines et fleurs de sakura par-dessus (tissu marine des références)
  vagues: TEINTES_KIMONO + `
    float y = cm.y + 0.02 * sin(cm.x * 28.0) + 0.008 * sin(cm.x * 67.0 + cm.y * 20.0);
    float bande = fract(y / 0.028);
    col = mix(col, mix(base, L, 0.85), (1.0 - smoothstep(0.05, 0.12, abs(bande - 0.5))) * step(0.5, fract(y / 0.112)));
    col = mix(col, OR * 0.9, (1.0 - smoothstep(0.03, 0.08, abs(bande - 0.5))) * (1.0 - step(0.5, fract(y / 0.112))) * 0.7);` +
    FLEURS('0.1', '0.45') + TRAME,
  // seigaiha : écailles de vagues en éventail, de plusieurs couleurs, cerclées de lignes fines
  seigaiha: TEINTES_KIMONO + `
    // écailles de rayon 1, espacées de 2, rangées tous les 0,5 ; la rangée la plus basse passe devant
    vec2 q = cm / 0.026;
    vec2 cc = vec2(0.0); float rr = 2.0;
    float r0 = floor(q.y / 0.5);
    for (int k = 2; k >= 0; k--) {
      float rang = r0 - float(k), dec = mod(rang, 2.0);
      vec2 c = vec2(floor((q.x - dec) / 2.0 + 0.5) * 2.0 + dec, rang * 0.5);
      float r = length(q - c);
      if (rr > 1.5 && r < 1.0 && q.y >= c.y) { cc = c; rr = r; }
    }
    float hh = hash2(cc).x;
    vec3 ev = hh < 0.3 ? base : hh < 0.55 ? B : hh < 0.8 ? mix(base, A, 0.55) : mix(base, L, 0.45);
    float anneaux = 1.0 - smoothstep(0.06, 0.16, abs(fract(rr * 4.0) - 0.5));
    col = mix(ev, mix(ev, L, 0.75), anneaux * step(rr, 1.0));` + TRAME,
  uni: TEINTES_KIMONO + TRAME,
};
// Matériau du tissu du kimono (et des accessoires assortis) selon la couleur et le motif choisis
const tissuKimono = (couleur, motif, projection = 'cyl', side) =>
  materiau(couleur, { motif: MOTIFS_KIMONO[motif] ?? MOTIFS_KIMONO.sakura, liseré: 0.12, cle: 'kimono-' + motif, projection, side });

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

// Queue du panda roux : longue et touffue, elle descend derrière puis remonte, avec des anneaux clairs
const courbeQueueRoux = new THREE.CatmullRomCurve3([
  [0, 0, 0.02], [0, -0.05, -0.07], [0.0, -0.08, -0.17], [0.02, -0.05, -0.27], [0.05, 0.03, -0.33], [0.07, 0.12, -0.34],
].map((v) => new THREE.Vector3(...v)));
const POINTS_QUEUE_ROUX = courbeQueueRoux.getSpacedPoints(40).map((v, i, t) => ({ v, t: i / (t.length - 1) }));
const rayonQueueRoux = (t) => (t < 0.15 ? 0.038 + t * 0.12 : t < 0.8 ? 0.056 : 0.056 - ((t - 0.8) / 0.2) * 0.03);
const queuePandaRoux = (x, y, z) => {
  let d = Infinity;
  for (let i = 1; i < POINTS_QUEUE_ROUX.length; i++) {
    const a = POINTS_QUEUE_ROUX[i - 1], b = POINTS_QUEUE_ROUX[i];
    d = smin(d, cone(x, y, z, a.v.toArray(), b.v.toArray(), rayonQueueRoux(a.t), rayonQueueRoux(b.t)), 0.012);
  }
  return d;
};

// ---------------------------------------------------------------- Formes calculées en arrière-plan
// Sculpter une coiffure, un corps ou un habit prend jusqu'à 1-2 s. Dès l'ouverture du jeu, un worker
// (second fil d'exécution) les calcule toutes et les renvoie ici : le vestiaire n'a plus rien à calculer
// quand on clique. Si une forme est demandée avant d'être arrivée, on la calcule sur place.
const memoire = new Map();
const recues = new Map();
const estGeo = (v) => v && v.isBufferGeometry;
const versBrut = (g) => ({
  a: Object.fromEntries(Object.entries(g.attributes).map(([n, at]) => [n, [at.array, at.itemSize, at.normalized]])),
  i: g.index ? g.index.array : null,
});
const depuisBrut = (d) => {
  const g = new THREE.BufferGeometry();
  for (const [n, [tab, taille, norm]] of Object.entries(d.a)) g.setAttribute(n, new THREE.BufferAttribute(tab, taille, norm));
  if (d.i) g.setIndex(new THREE.BufferAttribute(d.i, 1));
  return g;
};
function memo(cle, construire) {
  if (!memoire.has(cle)) {
    const d = recues.get(cle);
    memoire.set(cle, !d ? construire() : d.a ? depuisBrut(d) : Object.fromEntries(Object.entries(d).map(([k, v]) => [k, depuisBrut(v)])));
  }
  return memoire.get(cle);
}
// Toutes les formes, dans l'ordre où le worker les calcule (celles du vestiaire d'abord)
function formes() {
  return [
    ...[...COUPES_MECHES, ...Object.keys(coiffures)].map((id) => ['coiffure.' + id, () => geometrieCoiffure(id)]),
    ['espece.humain', () => geometries('humain')], ['espece.panda', () => geometries('panda')],
    ['tissus', geometriesTissus], ['miko', geometriesMiko], ['samourai', geometriesSamourai], ['ville', geometriesVille],
    ['espece.shiba', () => geometries('shiba')],
    ['espece.pandaRoux', () => geometries('pandaRoux')], ['espece.capybara', () => geometries('capybara')],
  ];
}
// Côté worker : calcule chaque forme et l'envoie (les tableaux sont transférés, pas copiés)
export function travaillerEnArrierePlan(envoyer) {
  for (const [cle, f] of formes()) {
    const v = f();
    const brut = estGeo(v) ? versBrut(v) : Object.fromEntries(Object.entries(v).map(([k, g]) => [k, versBrut(g)]));
    const transfert = [];
    const noter = (b) => { for (const [t] of Object.values(b.a)) transfert.push(t.buffer); if (b.i) transfert.push(b.i.buffer); };
    if (brut.a) noter(brut); else Object.values(brut).forEach(noter);
    envoyer({ cle, brut }, transfert);
  }
  envoyer({ fini: true }, []);
}
// Côté page : démarre le worker (son code est intégré à jeu.js par outils/construire.mjs)
if (typeof window !== 'undefined' && typeof __CODE_WORKER__ === 'string' && __CODE_WORKER__) {
  try {
    const url = URL.createObjectURL(new Blob([__CODE_WORKER__], { type: 'text/javascript' }));
    const w = new Worker(url);
    w.onmessage = (e) => {
      if (e.data.fini) { w.terminate(); URL.revokeObjectURL(url); return; }
      if (!memoire.has(e.data.cle)) recues.set(e.data.cle, e.data.brut);
    };
    w.onerror = () => w.terminate(); // pas de worker : tout se calcule sur place, comme avant
  } catch { /* navigateur sans worker : calcul sur place */ }
}

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
  miko ??= memo('miko', () => ({
    haut: ponderer(extraire(mikoHaut, [-0.36, 0.1, -0.23], [0.36, 0.55, 0.27], PAS), SEGMENTS, { surcharge: poidsManches }),
    bandes: ponderer(extraire(bandesManches, [-0.38, 0.1, -0.2], [0.38, 0.35, 0.25], 0.004), SEGMENTS, { surcharge: poidsManches }),
    hakama: ponderer(extraire(hakama, [-0.33, 0.04, -0.27], [0.33, 0.33, 0.28], PAS), SEGMENTS, { surcharge: poidsJupe }),
  }));
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
  ville ??= memo('ville', () => ({
    chemise: ponderer(extraire(chemise, [-0.22, 0.18, -0.2], [0.22, 0.55, 0.22], PAS), SEGMENTS),
    veste: ponderer(extraire(veste, [-0.33, 0.15, -0.23], [0.33, 0.56, 0.26], PAS), SEGMENTS, { surcharge: poidsManches }),
    revers: ponderer(extraire(revers, [-0.2, 0.38, 0.0], [0.2, 0.55, 0.24], 0.004), SEGMENTS),
    pantalon: ponderer(extraire(pantalon, [-0.24, 0.06, -0.2], [0.24, 0.28, 0.2], PAS), SEGMENTS, { surcharge: poidsJambes }),
    chaussures: ponderer(extraire(chaussures, [-0.22, -0.01, -0.11], [0.22, 0.13, 0.19], 0.006), SEGMENTS, { surcharge: poidsJambes }),
  }));
  return ville;
}

// Tenue de ville (M. Droz) : polo orange à manches courtes, col rabattu, patte boutonnée ; pantalon et chaussures de la tenue de ville
const polo = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.018, 0.17 - y);
  for (let i = 0; i < 2; i++) {
    // manches courtes : elles s'arrêtent au-dessus du coude
    const a = J.epaule[i], b = a.map((v, k) => v + (J.coude[i][k] - v) * 0.75);
    const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    d = smin(d, Math.max(cone(x, y, z, a, b, 0.074, 0.068), (le_long(x, y, z, a, b) - 1) * l), 0.02);
  }
  return Math.max(d, y - 0.535);
};
// Col rabattu tout autour du cou, ouvert devant
const colPolo = (x, y, z) => {
  const t = torse(x, y, z);
  const d = Math.max(t - 0.034, 0.012 - t, 0.475 - y, y - 0.54);
  return Math.max(d, -Math.max(Math.abs(x) - 0.03, 0.05 - z));
};
// Patte de boutonnage sur le devant
const pattePolo = (x, y, z) => Math.max(torse(x, y, z) - 0.024, Math.abs(x) - 0.017, Math.abs(y - 0.45) - 0.055, 0.05 - z);
let tenuePolo = null;
function geometriesPolo() {
  tenuePolo ??= memo('polo', () => ({
    polo: ponderer(extraire(polo, [-0.3, 0.15, -0.22], [0.3, 0.56, 0.25], PAS), SEGMENTS, { surcharge: poidsManches }),
    col: ponderer(extraire(colPolo, [-0.2, 0.46, -0.2], [0.2, 0.56, 0.24], 0.004), SEGMENTS),
    patte: ponderer(extraire(pattePolo, [-0.04, 0.38, 0.0], [0.04, 0.52, 0.24], 0.003), SEGMENTS),
  }));
  return tenuePolo;
}

// Samouraï (kamishimo) : kosode à manches courtes, hakama-pantalon large et plissé,
// kataginu (gilet aux épaules en ailes, ajoutées en pièces rigides) et obi
const kosode = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.014, 0.2 - y);
  for (let i = 0; i < 2; i++) {
    const a = J.epaule[i], b = a.map((v, k) => v + (J.poignet[i][k] - v) * 0.6);
    const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    d = smin(d, Math.max(cone(x, y, z, a, b, 0.078, 0.088), (le_long(x, y, z, a, b) - 1) * l), 0.02);
  }
  return Math.max(d, y - 0.53);
};
const plis = (x, z, k) => 0.006 * k * Math.abs(Math.sin(Math.atan2(z, x) * 7));
const hakamaSamourai = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.02, y - 0.3);
  for (let i = 0; i < 2; i++) {
    // jambes larges qui s'évasent jusqu'aux chevilles
    const bas = [J.cheville[i][0] * 1.25, 0.06, J.cheville[i][2]];
    const t = Math.min(1, Math.max(0, (0.24 - y) / 0.18));
    d = smin(d, cone(x, y, z, [J.cuisse[i][0], 0.25, 0], bas, 0.11, 0.135) - plis(x - J.cuisse[i][0], z, t), 0.05);
  }
  return Math.max(d, 0.06 - y);
};
const kataginu = (x, y, z) => {
  let d = Math.max(torse(x, y, z) - 0.026, 0.27 - y, y - 0.535);
  // ouverture en V sur le devant : le kosode apparaît dessous
  const demi = 0.01 + Math.max(0, y - 0.27) * 0.5;
  return Math.max(d, -Math.max(Math.abs(x) - demi, 0.02 - z));
};
const obiSamourai = (x, y, z) => Math.max(torse(x, y, z) - 0.03, Math.abs(y - 0.285) - 0.028);
let samourai = null;
function geometriesSamourai() {
  samourai ??= memo('samourai', () => ({
    kosode: ponderer(extraire(kosode, [-0.33, 0.18, -0.23], [0.33, 0.55, 0.26], PAS), SEGMENTS, { surcharge: poidsManches }),
    hakama: ponderer(extraire(hakamaSamourai, [-0.3, 0.04, -0.24], [0.3, 0.33, 0.26], PAS), SEGMENTS, { surcharge: poidsJambes }),
    kataginu: ponderer(extraire(kataginu, [-0.24, 0.25, -0.22], [0.24, 0.56, 0.24], PAS), SEGMENTS, { surcharge: (x, y, z) => [[O.poitrine, 1]] }),
    obi: ponderer(extraire(obiSamourai, [-0.25, 0.24, -0.24], [0.25, 0.33, 0.24], 0.005), SEGMENTS),
  }));
  return samourai;
}

let tissus = null; // habits : même géométrie pour les deux espèces
function geometriesTissus() {
  tissus ??= memo('tissus', () => ({
    kimono: ponderer(extraire(kimono, [-0.33, 0.04, -0.26], [0.33, 0.55, 0.27], PAS), SEGMENTS, { surcharge: poidsJupe }),
    ourlet: ponderer(extraire(ourlet, [-0.27, 0.04, -0.26], [0.27, 0.1, 0.27], 0.004), SEGMENTS, { surcharge: poidsJupe }),
    col: ponderer(extraire(col, [-0.13, 0.22, 0.0], [0.13, 0.54, 0.25], 0.004), SEGMENTS),
    obi: ponderer(extraire(obi, [-0.25, 0.22, -0.24], [0.25, 0.32, 0.24], 0.005), SEGMENTS),
  }));
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
  pandaRoux: (x, y, z) => {
    let d = ellipsoide(x, y, z, [0, 0.02, 0], [0.29, 0.235, 0.25]);
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.16, -0.075, 0.07], [0.15, 0.11, 0.12]), 0.06); // joues rondes
    d = smin(d, ellipsoide(x, y, z, [0, -0.065, 0.2], [0.08, 0.055, 0.07]), 0.05);                                // museau
    // oreilles larges et arrondies (moins pointues que celles du shiba)
    for (const s of [-1, 1]) d = smin(d, cone(x, y, z * 2.2, [s * 0.16, 0.15, -0.02], [s * 0.22, 0.3, -0.05], 0.09, 0.035) / 2.2, 0.04);
    // touffes blanches sur les joues
    for (const s of [-1, 1]) {
      d = smin(d, cone(x, y, z, [s * 0.25, -0.08, 0.03], [s * 0.325, -0.13, 0.02], 0.035, 0.006), 0.02);
      d = smin(d, cone(x, y, z, [s * 0.23, -0.14, 0.05], [s * 0.29, -0.2, 0.045], 0.03, 0.005), 0.02);
    }
    return d;
  },
  capybara: (x, y, z) => {
    let d = ellipsoide(x, y, z, [0, 0.04, -0.02], [0.26, 0.22, 0.24]);
    d = smin(d, ellipsoide(x, y, z, [0, -0.04, 0.16], [0.17, 0.15, 0.17]), 0.09);                 // long museau carré
    d = smin(d, ellipsoide(x, y, z, [0, -0.04, 0.27], [0.135, 0.11, 0.08]), 0.05);                // bout du museau, plat
    for (const s of [-1, 1]) d = smin(d, ellipsoide(x, y, z, [s * 0.165, 0.215, -0.07], [0.055, 0.05, 0.035]), 0.025); // petites oreilles rondes
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
  // Samouraï : cheveux courts plaqués, front dégagé, favoris, chignon (mage) replié vers l'avant sur le sommet
  samourai: (x, y, z) => {
    const lim = -0.12 + 0.32 * Math.max(0, z / 0.255) ** 1.5 - 0.05 * Math.min(1, (x / 0.25) ** 2);
    let d = Math.max(CRANE(x, y, z) - 0.016, lim - y);
    for (const s of [-1, 1]) d = smin(d, cone(x, y, z, [s * 0.272, 0.06, 0.085], [s * 0.278, -0.07, 0.11], 0.026, 0.016), 0.01); // favoris
    d = smin(d, ellipsoide(x, y, z, [0, 0.22, -0.14], [0.07, 0.06, 0.07]), 0.03); // attache du chignon
    d = smin(d, cone(x, y, z, [0, 0.27, -0.15], [0, 0.31, 0.06], 0.045, 0.036), 0.015); // mage couché vers l'avant
    d = smin(d, ellipsoide(x, y, z, [0, 0.305, 0.07], [0.042, 0.038, 0.036]), 0.01);
    return d;
  },
};
const cacheCoiffures = new Map();
function geometrieCoiffure(id) {
  if (COUPES_MECHES.includes(id)) {
    if (!cacheCoiffures.has(id)) cacheCoiffures.set(id, memo('coiffure.' + id, () => coupeMeches(id)));
    return cacheCoiffures.get(id);
  }
  if (!coiffures[id]) return null;
  if (!cacheCoiffures.has(id)) cacheCoiffures.set(id, memo('coiffure.' + id, () => {
    const geo = extraire(coiffures[id], [-0.4, id === 'longs' ? -0.5 : -0.42, -0.4], [0.4, 0.36, 0.33], 0.0095);
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
    return geo;
  }));
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
  if (espece === 'pandaRoux') {
    return (x, y, z) => {
      const jambes = lisse(0.23, 0.19, y);
      const bras = lisse(0.16, 0.2, Math.abs(x)) * lisse(0.44, 0.38, y); // seulement les bras, pas les flancs
      const e = (x / 0.095) ** 2 + ((y - 0.27) / 0.13) ** 2;
      const ventre = lisse(1.15, 0.8, e) * lisse(0.05, 0.1, z) * 0.85;
      return melange(p.base, p.sombre, Math.max(jambes, bras, ventre));
    };
  }
  if (espece === 'capybara') {
    return (x, y, z) => {
      const pieds = lisse(0.1, 0.07, y);
      const e = (x / 0.13) ** 2 + ((y - 0.28) / 0.18) ** 2;
      const ventre = lisse(1.1, 0.8, e) * lisse(0.03, 0.08, z);
      return melange(p.base, p.clair, ventre).lerp(C(p.sombre), pieds);
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
  if (espece === 'pandaRoux') {
    return (x, y, z) => {
      // masque blanc : museau, bas des joues, taches au-dessus des yeux, intérieur et bord des oreilles
      const museau = lisse(1.25, 0.85, (x / 0.12) ** 2 + ((y + 0.075) / 0.085) ** 2) * lisse(0.12, 0.18, z);
      const joues = lisse(0.13, 0.18, Math.abs(x)) * lisse(-0.01, -0.05, y) * lisse(-0.03, 0.03, z);
      let sourcils = 0;
      for (const s of [-1, 1]) sourcils = Math.max(sourcils, lisse(0.04, 0.028, Math.hypot(x - s * 0.095, y - 0.095)) * lisse(0.12, 0.16, z));
      const oreille = lisse(0.15, 0.18, y) * lisse(-0.045, -0.025, z)
        * lisse(0.065 - (y - 0.16) * 0.25, 0.05 - (y - 0.16) * 0.25, Math.abs(Math.abs(x) - (0.165 + (y - 0.16) * 0.38)));
      // « larmes » roux foncé qui descendent des yeux vers les joues
      let larmes = 0;
      for (const s of [-1, 1]) larmes = Math.max(larmes, lisse(0.026, 0.012, Math.abs((x - s * 0.11) - s * (0.02 - y) * 0.35)) * lisse(0.02, -0.005, y) * lisse(-0.11, -0.08, y) * lisse(0.12, 0.17, z));
      const c = melange(p.base, p.clair, Math.max(museau, joues, sourcils, oreille));
      return c.lerp(C('#7a2e14'), larmes * 0.8);
    };
  }
  if (espece === 'capybara') {
    return (x, y, z) => {
      const museau = lisse(0.22, 0.32, z) * 0.45; // bout du museau un peu plus sombre
      const oreille = lisse(0.18, 0.2, y) * lisse(0.13, 0.15, Math.abs(x)) * lisse(-0.04, -0.03, z);
      return melange(p.base, p.sombre, Math.max(museau, oreille));
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
function couleursQueueRoux() {
  const p = PELAGE.pandaRoux;
  const v = new THREE.Vector3();
  return (x, y, z) => {
    v.set(x, y, z);
    let proche = POINTS_QUEUE_ROUX[0];
    for (const q of POINTS_QUEUE_ROUX) if (q.v.distanceToSquared(v) < proche.v.distanceToSquared(v)) proche = q;
    const anneau = lisse(0.42, 0.5, Math.abs(((proche.t * 5.5 + 0.3) % 1) - 0.5) * 2) * lisse(0.12, 0.2, proche.t);
    const pointe = lisse(0.9, 0.98, proche.t);
    return melange(p.base, p.anneau, anneau).lerp(C(p.sombre), pointe * 0.7);
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
  const geos = memo('espece.' + espece, () => {
  const geos = {
    corps: peindre(ponderer(extraire(corps, [-0.32, -0.005, -0.2], [0.32, 0.56, 0.24], PAS), SEGMENTS), couleursCorps(espece)),
    tete: peindre(extraire(tetes[espece], [-0.34, -0.24, -0.29], [0.34, 0.38, espece === 'capybara' ? 0.37 : 0.31], PAS_TETE), couleursTete(espece)), // le capybara a un long museau
  };
  if (espece === 'shiba') geos.queue = peindre(extraire(queueShiba, [-0.07, -0.06, -0.21], [0.14, 0.3, 0.09], 0.004), couleursQueue());
  if (espece === 'pandaRoux') geos.queue = peindre(extraire(queuePandaRoux, [-0.08, -0.16, -0.42], [0.15, 0.2, 0.09], 0.006), couleursQueueRoux());
  return geos;
  });
  cache.set(espece, geos);
  return geos;
}

// ---------------------------------------------------------------- Masque de renard (kitsune)
function textureKitsune(rouge = '#d9474b') {
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
  ctx.strokeStyle = rouge;
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
    ctx.strokeStyle = rouge; ctx.lineWidth = 12;
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
const texKitsune = new Map();
// Le masque couvre tout le visage, du front au menton, et passe devant les cheveux
function masqueKitsune(uni, rouge = '#d9474b') {
  const m = new THREE.Group();
  if (!texKitsune.has(rouge)) texKitsune.set(rouge, textureKitsune(rouge));
  const blanc = toon('#ffffff', { map: texKitsune.get(rouge), side: THREE.DoubleSide, alphaTest: 0.5 });
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
    const int = piece(new THREE.ConeGeometry(0.042, 0.115, 16), uni(rouge === '#d9474b' ? '#c8383d' : rouge), 0, -0.012, 0.017);
    int.scale.z = 0.3;
    oreille.add(ext, int);
    oreille.position.set(s * 0.15, 0.26, 0.18);
    oreille.rotation.set(-0.35, 0, -s * 0.35);
    m.add(oreille);
  }
  return m;
}

// Petite fleur de sakura à cinq pétales (ornements de coiffure)
function fleurSakura(uni, couleur, coeur) {
  const f = new THREE.Group(), mat = uni(couleur);
  for (let i = 0; i < 5; i++) {
    const an = (i / 5) * Math.PI * 2;
    const p = piece(new THREE.SphereGeometry(0.02, 10, 8), mat, Math.cos(an) * 0.022, Math.sin(an) * 0.022, 0);
    p.scale.set(1.3, 0.95, 0.4);
    p.rotation.z = an;
    f.add(p);
  }
  f.add(piece(new THREE.SphereGeometry(0.011, 10, 8), uni(coeur), 0, 0, 0.006));
  return f;
}
// Feuille d'érable (momiji) plate à cinq pointes
let geoMomiji = null;
function feuilleMomiji(mat) {
  if (!geoMomiji) {
    const f = new THREE.Shape();
    for (let i = 0; i <= 10; i++) {
      const an = Math.PI / 2 + (i / 10) * Math.PI * 2, r = i % 2 ? 0.01 : (i === 0 || i === 10 ? 0.03 : i === 4 || i === 6 ? 0.022 : 0.027);
      const x = Math.cos(an) * r, y = Math.sin(an) * r;
      if (i === 0) f.moveTo(x, y); else f.lineTo(x, y);
    }
    geoMomiji = new THREE.ExtrudeGeometry(f, { depth: 0.003, bevelEnabled: false });
  }
  return new THREE.Mesh(geoMomiji, mat);
}
// Baguette à cheveux (kanzashi) : `bois` (bois clair et perles), `sakura` (bois sombre, fleurs et pampille),
// `momiji` (dorée, feuilles d'érable qui pendent). L'axe de la baguette est y, l'ornement en haut.
function baguette(modele, uni, ornement = true) {
  const b = new THREE.Group();
  if (modele === 'sakura') {
    b.add(piece(new THREE.CylinderGeometry(0.0055, 0.003, 0.3, 8), uni('#3a2620'), 0, -0.02, 0));
    if (ornement) {
      for (const [x, y, z, sc, c] of [[0, 0.14, 0.01, 1, '#fbf3f2'], [0.035, 0.125, 0, 0.8, '#f5cacc'], [-0.03, 0.155, -0.01, 0.75, '#fbf3f2'], [0.012, 0.17, 0.02, 0.6, '#f8a0ab']]) {
        const f = fleurSakura(uni, c, '#e2b552');
        f.position.set(x, y, z);
        f.scale.setScalar(sc);
        b.add(f);
      }
      // pampille : chaînette, perles et clochette rose
      b.add(piece(new THREE.CylinderGeometry(0.0015, 0.0015, 0.1, 4), uni('#e2b552'), 0.03, 0.07, 0.01));
      b.add(piece(new THREE.SphereGeometry(0.008, 8, 6), uni('#fbf8f2'), 0.03, 0.04, 0.01));
      b.add(piece(new THREE.ConeGeometry(0.012, 0.025, 10), uni('#f08aa0'), 0.03, 0.012, 0.01));
    }
  } else if (modele === 'momiji') {
    const or = uni('#e2b552');
    b.add(piece(new THREE.CylinderGeometry(0.005, 0.003, 0.3, 8), or, 0, -0.02, 0));
    b.add(piece(new THREE.SphereGeometry(0.01, 10, 8), or, 0, 0.13, 0));
    if (ornement) {
      // trois feuilles d'érable rouges et orangées qui pendent à une chaînette
      b.add(piece(new THREE.CylinderGeometry(0.0015, 0.0015, 0.13, 4), or, 0.0, 0.065, 0.012));
      [['#d8452f', 0.1], ['#e98a2c', 0.055], ['#c0352b', 0.01]].forEach(([c, y], i) => {
        const f = feuilleMomiji(uni(c));
        f.position.set(i % 2 ? 0.006 : -0.006, y, 0.012);
        f.rotation.z = (i - 1) * 0.4;
        b.add(f);
      });
      b.add(piece(new THREE.SphereGeometry(0.007, 8, 6), uni('#c0352b'), 0, -0.012, 0.012));
    }
  } else {
    // bois clair, trois perles rouges en haut
    b.add(piece(new THREE.CylinderGeometry(0.0065, 0.005, 0.32, 8), uni('#c9a46a')));
    for (let i = 0; i < 3; i++) b.add(piece(new THREE.SphereGeometry(0.009, 8, 6), uni(PALETTE.corail), 0, 0.1 + i * 0.022, 0));
  }
  return b;
}

// ---------------------------------------------------------------- Construction
export function creerPersonnage(apparence = APPARENCE_DEFAUT) {
  const a = { ...APPARENCE_DEFAUT, ...apparence };
  a.coiffure = COUPES_REMPLACEES[a.coiffure] ?? a.coiffure;
  const accessoires = accessoiresDe(a);
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
  const couleurObi = a.ceinture ?? (clarte < 0.3 ? '#d9c6a3' : '#1f1f24'); // noir, anthracite, beige ou blanc
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
  } else if (a.tenue === 'polo') {
    const v = geometriesVille(), q = geometriesPolo();
    // `carreaux` : chemise à carreaux dont `polo` est la couleur des bandes (M. Haenssler)
    const tissu = a.carreaux ? materiau(a.polo ?? '#c8383d', { motif: MOTIF_CARREAUX, liseré: 0.12, cle: 'carreaux' }) : materiau(a.polo ?? '#f2a25a', { liseré: 0.12, cle: 'uni' });
    couches.push([q.polo, tissu], [q.col, tissu], [q.patte, tissu],
      [v.pantalon, materiau(a.pantalon ?? '#2e3346', { liseré: 0.12, cle: 'uni' })], [v.chaussures, materiau('#3a2c24', { liseré: 0.2, cle: 'uni' })]);
  } else if (a.tenue === 'samourai') {
    const s = geometriesSamourai(), sombre = a.hakama ?? '#2e3346';
    const motif = materiau(sombre, { motif: MOTIF_SEIGAIHA, liseré: 0.12, cle: 'kimono' });
    couches.push([s.kosode, materiau(a.kimono ?? PALETTE.creme, { liseré: 0.12, cle: 'uni' })], [s.hakama, motif], [s.kataginu, motif],
      [geometriesTissus().col, materiau(PALETTE.creme, { liseré: 0.1, cle: 'uni' })], [s.obi, materiau(a.obi ?? PALETTE.corail, { liseré: 0.1, cle: 'uni' })]);
  } else if (a.kimono) {
    const t = geometriesTissus();
    couches.push([t.kimono, tissuKimono(a.kimono, motifDe(a))],
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
  if ((a.kimono || a.tenue === 'miko') && a.tenue !== 'samourai') {
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

  // Samouraï : épaules du kataginu en ailes rigides et mon (blason) blanc sur la poitrine
  if (a.tenue === 'samourai') {
    const tissu = uni(a.hakama ?? '#2e3346');
    for (const s of [-1, 1]) {
      const aile = piece(new RoundedBoxGeometry(0.2, 0.026, 0.22, 2, 0.01), tissu);
      aile.rotation.z = s * 0.18;
      fixer('poitrine', aile, s * 0.215, 0.53, -0.005);
      const mon = new THREE.Group();
      mon.add(piece(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 20), uni(PALETTE.creme)));
      mon.add(piece(new THREE.CylinderGeometry(0.011, 0.011, 0.008, 5), uni(a.hakama ?? '#2e3346')));
      mon.rotation.x = Math.PI / 2 - 0.35;
      mon.rotation.z = -s * 0.25;
      fixer('poitrine', mon, s * 0.095, 0.455, 0.175);
    }
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

  // Polo : deux boutons sur la patte et, sauf `micro: false`, le petit micro-cravate accroché au col (photos de M. Droz et M. Forestier)
  if (a.tenue === 'polo') {
    const bouton = uni('#f6efe4');
    for (const y of [0.47, 0.425]) fixer('poitrine', sans(piece(new THREE.SphereGeometry(0.009, 10, 8), bouton)), 0, y, 0.19);
    const micro = new THREE.Group();
    const bonnette = piece(new THREE.SphereGeometry(0.024, 14, 10), materiau('#5c6270', { motif: MOTIF_FOURRURE, liseré: 0.2, cle: 'fourrure-uni' }));
    micro.add(bonnette, piece(new RoundedBoxGeometry(0.02, 0.014, 0.012, 2, 0.003), uni('#2a2d34'), 0.026, -0.004, 0));
    if (a.micro !== false) fixer('poitrine', micro, -0.05, 0.47, 0.17);
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
  // Les accessoires s'accordent au kimono : sa couleur, son motif, et la ceinture pour les rabats
  const kim = a.kimono ?? PALETTE.corail, motifAcc = a.kimono ? motifDe(a) : 'sakura';
  const tient = {}; // bras qui tiennent un objet : ils ne se balancent plus en marchant
  if (accessoires.includes('sac')) {
    const toile = uni(a.kimono ?? PALETTE.marine), corail = uni(a.kimono ? couleurObi : PALETTE.corail);
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
  }
  if (accessoires.includes('sacoche')) {
    const toile = uni(a.kimono ?? PALETTE.marine), corail = uni(a.kimono ? couleurObi : PALETTE.corail);
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
  // Ombrelle japonaise (wagasa) tenue dans la main droite, posée sur l'épaule
  if (accessoires.includes('ombrelle')) {
    const o = new THREE.Group(), bambou = uni('#b88a55'), sombre = uni('#5a3a26');
    const profil = [[0.025, 0.2], [0.14, 0.178], [0.28, 0.13], [0.39, 0.072], [0.46, 0.02], [0.47, 0.0]].map(([r, y]) => new THREE.Vector2(r, y));
    const toile = new THREE.Mesh(new THREE.LatheGeometry(profil, 28), tissuKimono(kim, motifAcc, 'xz', THREE.DoubleSide));
    toile.position.y = 0.98;
    o.add(toile);
    // rayons en bambou sous la toile, du coulant jusqu'au milieu des baleines
    const rayons = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.004, 0.004, 1, 5), sombre, 28);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), A = new THREE.Vector3(), B = new THREE.Vector3(), D = new THREE.Vector3();
    for (let i = 0; i < 28; i++) {
      const an = (i / 28) * Math.PI * 2;
      A.set(0, 0.86, 0); B.set(Math.cos(an) * 0.27, 0.98 + 0.125, Math.sin(an) * 0.27);
      D.subVectors(B, A);
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), D.clone().normalize());
      m4.compose(A.clone().add(B).multiplyScalar(0.5), q, new THREE.Vector3(1, D.length(), 1));
      rayons.setMatrixAt(i, m4);
    }
    o.add(sans(rayons));
    o.add(piece(new THREE.CylinderGeometry(0.009, 0.009, 1.28, 8), bambou, 0, 0.52, 0)); // manche
    o.add(piece(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 10), sombre, 0, -0.03, 0)); // poignée gainée
    o.add(piece(new THREE.CylinderGeometry(0.02, 0.014, 0.05, 10), sombre, 0, 0.84, 0)); // coulant
    o.add(piece(new THREE.CylinderGeometry(0.03, 0.03, 0.035, 14), uni(couleurObi), 0, 1.19, 0)); // chapeau du sommet
    o.rotation.set(-0.32, 0, 0.2);
    fixer('poignetD', o, J.poignet[1][0] + 0.01, J.poignet[1][1] - 0.01, J.poignet[1][2] + 0.03);
    tient.D = 0;
  }
  // Éventail ouvert tenu devant la poitrine, main gauche
  if (accessoires.includes('eventail')) {
    const e = new THREE.Group(), bambou = uni('#c9a46a');
    const ouverture = 2.3, debut = Math.PI / 2 - ouverture / 2;
    const papier = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.2, 24, 1, debut, ouverture), tissuKimono(kim, motifAcc, 'xy', THREE.DoubleSide));
    e.add(papier);
    for (let i = 0; i <= 10; i++) {
      const an = debut + (i / 10) * ouverture;
      const lame = piece(new THREE.BoxGeometry(0.006, i % 10 ? 0.15 : 0.205, 0.004), bambou, Math.cos(an) * (i % 10 ? 0.075 : 0.1), Math.sin(an) * (i % 10 ? 0.075 : 0.1), -0.003);
      lame.rotation.z = an - Math.PI / 2;
      e.add(sans(lame));
    }
    e.add(piece(new THREE.CylinderGeometry(0.008, 0.008, 0.012, 10), uni('#3a2a24'), 0, 0, 0).rotateX(Math.PI / 2));
    tient.G = -1.05; // bras levé devant la poitrine
    e.rotation.set(1.05 - 0.15, 0.3, 0.35); // reste droit malgré le bras levé, légèrement tourné vers l'extérieur
    fixer('poignetG', e, J.poignet[0][0] + 0.01, J.poignet[0][1] + 0.0, J.poignet[0][2] + 0.04);
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
    const samourai = a.tenue === 'samourai';
    fixer('hanches', k, samourai ? -0.24 : a.kimono ? -0.225 : -0.17, 0.28, samourai ? 0.09 : a.kimono ? 0.1 : 0.07); // passé par-dessus le kimono s'il y en a un
    if (samourai) {
      // wakizashi : le sabre court, glissé dans l'obi à côté du katana
      const w = k.clone();
      w.scale.set(1, 0.7, 1);
      w.rotation.set(1.15, 0.15, -0.5);
      fixer('hanches', w, -0.225, 0.3, 0.13);
    }
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
  const homme = espece === 'humain' && a.genre === 'homme'; // traits plus marqués, sans joues roses
  const photo = !!a.tetePhoto; // tête réaliste tirée d'une photo (M. Graber) : pas de traits dessinés
  tete.add(photo ? tetePhoto(a.tetePhoto) : new THREE.Mesh(g.tete, fourrure));
  const yeux = [];
  if (a.masque === 'kitsune') tete.add(masqueKitsune(uni));
  else if (!photo) for (const s of [-1, 1]) {
    const oeil = new THREE.Group();
    oeil.rotation.y = s * 0.42;
    if (espece === 'capybara') {
      // petits yeux placés haut et sur les côtés, l'air tranquille
      oeil.position.set(s * 0.115, 0.09, 0.2);
      oeil.rotation.y = s * 0.5;
      const globe = piece(new THREE.SphereGeometry(0.027, 16, 12), noir);
      globe.scale.set(1, 1.05, 0.4);
      oeil.add(sans(globe), sans(piece(new THREE.SphereGeometry(0.009, 10, 8), blanc, -s * 0.007, 0.01, 0.01)));
    } else if (espece === 'shiba' || espece === 'pandaRoux') {
      // petits yeux noirs ovales avec un reflet
      oeil.position.set(s * 0.1, 0.02, 0.232);
      const globe = piece(new THREE.SphereGeometry(0.022, 16, 12), noir);
      globe.scale.set(0.9, 1.15, 0.4);
      oeil.add(sans(globe), sans(piece(new THREE.SphereGeometry(0.0075, 10, 8), blanc, -s * 0.006, 0.01, 0.009)));
    } else if (espece === 'humain') {
      // œil d'anime rieur : blanc, iris bleu-gris, pupille, reflet, paupière marquée et sourcil
      oeil.position.set(s * 0.095, 0.0, 0.238);
      const globe = piece(new THREE.SphereGeometry(0.03, 18, 14), blanc);
      globe.scale.set(1, homme ? 0.62 : 0.72, 0.3);
      const iris = piece(new THREE.SphereGeometry(0.021, 16, 12), new THREE.MeshBasicMaterial({ color: '#5d7896' }), 0, -0.002, 0.005);
      iris.scale.set(0.95, 0.95, 0.3);
      const pupille = piece(new THREE.SphereGeometry(0.011, 12, 10), new THREE.MeshBasicMaterial({ color: '#1b2230' }), 0, -0.002, 0.008);
      pupille.scale.z = 0.3;
      const paupiere = piece(new THREE.TorusGeometry(0.031, 0.0045, 6, 18, Math.PI), new THREE.MeshBasicMaterial({ color: '#4a3226' }), 0, -0.002, 0.006);
      paupiere.scale.set(1.05, 0.75, 1);
      // sourcils d'homme : épais, de la couleur des cheveux, froncés vers le nez (air décidé de samouraï)
      const sourcil = homme
        ? piece(new THREE.CapsuleGeometry(0.011, 0.045, 4, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(a.cheveux).multiplyScalar(0.8) }), s * 0.002, 0.045, 0.004)
        : piece(new THREE.CapsuleGeometry(0.006, 0.04, 4, 8), new THREE.MeshBasicMaterial({ color: '#8a6a45' }), s * 0.004, 0.05, 0.004);
      sourcil.rotation.z = Math.PI / 2 + s * (homme ? 0.3 : -0.18);
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
    // Joues roses avec trois petits traits (pas pour les hommes)
    if (homme) continue;
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
    const sourire = homme
      ? piece(new THREE.TorusGeometry(0.03, 0.0045, 6, 16, Math.PI * 0.55), new THREE.MeshBasicMaterial({ color: '#7a3a32' }), 0.006, -0.08, 0.248)
      : piece(new THREE.TorusGeometry(0.04, 0.0045, 6, 20, Math.PI * 0.8), new THREE.MeshBasicMaterial({ color: '#7a3a32' }), 0.006, -0.075, 0.248);
    sourire.rotation.z = homme ? Math.PI + Math.PI * 0.225 - 0.1 : Math.PI + Math.PI * 0.1 - 0.12; // en coin, un peu narquois
    sourire.scale.set(1, homme ? 0.45 : 0.6, 1);
    sourire.rotation.x = -0.25;
    tete.add(sans(sourire));
  }
  // Truffe et bouche en ω
  if (!a.masque && espece !== 'humain') {
  const capy = espece === 'capybara'; // grosse truffe large au bout du museau plat
  const zMuseau = capy ? 0.345 : 0.282;
  const truffe = piece(new THREE.SphereGeometry(0.02, 16, 12), noir, 0, capy ? -0.012 : -0.045, zMuseau);
  truffe.scale.set(capy ? 1.9 : 1.25, capy ? 0.75 : 0.8, 0.6);
  tete.add(sans(truffe));
  const refletTruffe = piece(new THREE.SphereGeometry(0.006, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 }), -0.008, -0.038, zMuseau + 0.01);
  refletTruffe.scale.set(1.4, 0.7, 0.5);
  tete.add(sans(refletTruffe));
  for (const s of [-1, 1]) {
    const arc = piece(new THREE.TorusGeometry(0.014, 0.003, 6, 14, Math.PI), noir, s * 0.014, capy ? -0.07 : -0.07, zMuseau - (capy ? 0.016 : 0.012));
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
  } else if (espece === 'pandaRoux') {
    queue.add(new THREE.Mesh(g.queue, fourrure));
    queue.position.set(QUEUE_BASE[0] - J.hanches[0], QUEUE_BASE[1] - J.hanches[1], QUEUE_BASE[2] - J.hanches[2]);
    queue.scale.setScalar(1.2);
  } else if (espece === 'panda') {
    queue.add(piece(new THREE.SphereGeometry(0.045, 16, 12), materiau(p.base, { motif: MOTIF_FOURRURE, cle: 'fourrure-uni' })));
    queue.position.set(0, 0.2 - J.hanches[1], -0.17);
  }
  os.hanches.add(queue);
  const cheveux = materiau(a.cheveux, { motif: MOTIF_FOURRURE, liseré: 0.25, cle: 'cheveux' });
  const touffe = new THREE.Group();
  const geoCoiffure = geometrieCoiffure(a.coiffure);
  if (geoCoiffure) touffe.add(new THREE.Mesh(geoCoiffure, geoCoiffure.attributes.meche
    ? materiau(a.cheveux, { motif: MOTIF_CHEVEUX, liseré: 0.22, cle: 'cheveux-meches', meche: true })
    : geoCoiffure.attributes.color
      ? materiau('#ffffff', { vertexColors: true, motif: MOTIF_FOURRURE, liseré: 0.25, cle: 'cheveux-degrade' }) : cheveux));
  const lien = uni(a.kimono ?? PALETTE.corail);
  if (a.coiffure === 'tresses') {
    // liens assortis au kimono au bout des tresses + petite fleur blanche sur le côté de la frange
    for (const A of ANCRES.tresses) {
      const l = piece(new THREE.TorusGeometry(0.02, 0.01, 8, 16), lien, A.x, A.y + 0.005, A.z);
      l.rotation.x = Math.PI / 2 - 0.3;
      touffe.add(l);
    }
    const fleur = fleurSakura(uni, '#fbf8f2', '#f3cf6a');
    fleur.position.set(0.22, 0.17, 0.15);
    fleur.rotation.set(-0.5, 0.85, 0);
    fleur.scale.setScalar(1.1);
    touffe.add(fleur);
  } else if (a.coiffure === 'chignon' || a.coiffure === 'chignonBas') {
    // baguettes plantées dans le chignon, au modèle choisi
    const K = a.coiffure === 'chignon' ? ANCRES.chignon : ANCRES.chignonBas;
    const poses = a.coiffure === 'chignon'
      ? [[-0.05, 0.0, -0.06, 0.25, 0.1, 0.85], [0.05, -0.01, -0.06, 0.4, -0.1, -0.75]]
      : [[0.0, 0.0, -0.06, 0.3, 0.2, -1.05]];
    poses.forEach(([dx, dy, dz, rx, ry, rz], i) => {
      const b = baguette(a.baguettes, uni, i === 0);
      b.position.set(K.x + dx, K.y + dy, K.z + dz);
      b.rotation.set(rx, ry, rz);
      touffe.add(b);
    });
  } else if (a.coiffure === 'manbun') {
    const K = ANCRES.manbun;
    const l = piece(new THREE.TorusGeometry(0.03, 0.009, 8, 16), lien, K.x, K.y + 0.0, K.z - 0.005);
    l.rotation.x = Math.PI / 2 + 0.3;
    touffe.add(l);
  } else if (a.coiffure === 'carre' || a.coiffure === 'longs') {
    for (const s of [-1, 1]) {
      // attaches sombres sur les mèches de côté (plus bas et plus larges sur les cheveux longs)
      const longs = a.coiffure === 'longs';
      const attache = piece(new THREE.CylinderGeometry(longs ? 0.06 : 0.03, longs ? 0.058 : 0.03, 0.04, 16), uni('#3a2a24'),
        s * (longs ? 0.268 : 0.255), longs ? -0.13 : -0.09, longs ? 0.064 : 0.04);
      attache.rotation.z = longs ? s * 0.12 : 0;
      touffe.add(attache);
    }
  } else if (a.coiffure === 'samourai') {
    const lien = piece(new THREE.TorusGeometry(0.046, 0.011, 8, 16), uni('#f4efe4'), 0, 0.285, -0.07);
    lien.rotation.x = -0.2;
    lien.scale.set(1, 1, 0.8);
    touffe.add(lien);
  }
  // Masque de renard porté sur le côté de la tête, marques de la couleur du kimono
  if (accessoires.includes('masque')) {
    const clair = new THREE.Color(kim).getHSL({}).l > 0.78;
    const m = masqueKitsune(uni, clair ? teinte(kim, -0.45) : kim);
    m.scale.setScalar(0.5);
    const d = new THREE.Vector3(0.78, 0.5, 0.38).normalize();
    m.position.copy(d).multiplyScalar(0.2);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
    m.rotateZ(-0.35);
    touffe.add(m);
  }
  // Hachimaki : bandeau noué autour du front, deux pans flottent derrière
  if (a.hachimaki) {
    const tissu = uni(a.hachimaki);
    const bande = piece(new THREE.CylinderGeometry(1, 1, 0.05, 40, 1, true), tissu, 0, 0.115, -0.005);
    bande.scale.set(0.31, 1, 0.276);
    bande.rotation.x = -0.26; // plus haut sur le front que sur la nuque
    bande.material = bande.material.clone();
    bande.material.side = THREE.DoubleSide;
    touffe.add(bande);
    const noeud = piece(new THREE.SphereGeometry(0.03, 12, 10), tissu, 0, 0.0, -0.275);
    noeud.scale.set(1.1, 0.9, 0.7);
    touffe.add(noeud);
    for (const s of [-1, 1]) {
      const pan = piece(new RoundedBoxGeometry(0.035, 0.15, 0.008, 2, 0.003), tissu, s * 0.03, -0.07, -0.29);
      pan.rotation.set(-0.35, 0, s * 0.35);
      touffe.add(pan);
    }
  }
  // Le capybara a les yeux plus haut que les autres animaux : sa coiffure remonte pour ne pas les cacher
  if (espece === 'capybara') { touffe.position.set(0, 0.095, -0.025); touffe.scale.setScalar(1.05); }
  tete.add(touffe);
  contourner(tete);
  contourner(queue);

  // Les geta surélèvent tout le personnage (après la liaison au squelette)
  socle.position.y = a.geta ? 0.05 : 0;

  racine.userData = { os, yeux, queue, tient, yHanches: J.hanches[1], phase: Math.random() * 6, clignement: 1 + Math.random() * 3 };
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
    // un bras qui tient l'ombrelle ou l'éventail garde sa pose
    o['epaule' + c].rotation.x = u.tient?.[c] ?? s * 0.6 * marche * sens;
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
