// Construction des îles / biomes. Chaque niveau suit la même disposition :
// arrivée (sud) → mini-jeu au milieu → arène du boss (nord) → portail (tout au nord).
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { PALETTE } from './niveaux.js';

export const RAYON_ILE = 22;
export const ARENE = { centre: new THREE.Vector3(0, 0, -10), cases: 9, taille: 1.2 };
export const POS = {
  depart: new THREE.Vector3(0, 0, 19.5),
  pnj: new THREE.Vector3(0, 0, 4),
  portail: new THREE.Vector3(0, 0, -19),
};

// Style « dessin » commun à tous les décors : ombrage doux en aplats + léger grain de papier,
// pour que la 3D se fonde dans les illustrations de fond.
const degradeDoux = (() => {
  const t = new THREE.DataTexture(new Uint8Array([175, 222, 255]), 3, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
})();
const grainPapier = (sh) => {
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vPosMonde;')
    .replace('#include <begin_vertex>', '#include <begin_vertex>\nvPosMonde = (modelMatrix * vec4(position, 1.0)).xyz;');
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', `#include <common>
      varying vec3 vPosMonde;
      float hashP(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      float bruitP(vec3 x) {
        vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hashP(i), hashP(i + vec3(1,0,0)), f.x), mix(hashP(i + vec3(0,1,0)), hashP(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hashP(i + vec3(0,0,1)), hashP(i + vec3(1,0,1)), f.x), mix(hashP(i + vec3(0,1,1)), hashP(i + vec3(1,1,1)), f.x), f.y), f.z);
      }`)
    .replace('#include <color_fragment>', `#include <color_fragment>
      diffuseColor.rgb *= 0.93 + 0.07 * bruitP(vPosMonde * 9.0) + 0.05 * bruitP(vPosMonde * 55.0);`);
};
const mat = (color, o = {}) => {
  const { roughness, metalness, ...reste } = o; // pas de reflets métalliques dans un dessin
  const m = new THREE.MeshToonMaterial({ color, gradientMap: degradeDoux, ...reste });
  m.onBeforeCompile = grainPapier;
  m.customProgramCacheKey = () => 'dessin';
  return m;
};

function ombre(obj) {
  obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return obj;
}

export function construireNiveau(scene, niveau, chargeurTexture) {
  const colliders = []; // { x, z, r }
  const animations = []; // (dt, t) => void
  const groupe = new THREE.Group();
  scene.add(groupe);

  scene.background = new THREE.Color(niveau.ciel);
  scene.fog = new THREE.Fog(niveau.brume, 45, 230);

  // Lumières
  const hemi = new THREE.HemisphereLight('#ffffff', niveau.sol, 1.4);
  const soleil = new THREE.DirectionalLight('#fff4e6', 2.4);
  soleil.position.set(18, 30, 12);
  soleil.castShadow = true;
  const mobile = matchMedia('(pointer: coarse)').matches;
  soleil.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048); // ombres plus légères sur téléphone
  Object.assign(soleil.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 90 });
  soleil.shadow.bias = -0.0005;
  groupe.add(hemi, soleil);

  // Sol de l'île
  const sol = new THREE.Mesh(new THREE.CylinderGeometry(RAYON_ILE + 2, RAYON_ILE + 1, 1.2, 64), mat(niveau.sol));
  sol.position.y = -0.6;
  sol.receiveShadow = true;
  groupe.add(sol);

  // Chemin de dalles du départ jusqu'au portail
  const dalle = new THREE.BoxGeometry(1.4, 0.08, 0.9);
  const matDalle = mat(niveau.chemin, { roughness: 0.95 });
  for (let z = 19; z > -22; z -= 1.3) {
    if (Math.abs(z - ARENE.centre.z) < 6) continue;
    const d = new THREE.Mesh(dalle, matDalle);
    d.position.set(Math.sin(z * 0.4) * 0.4, 0.02, z);
    d.rotation.y = Math.sin(z) * 0.15;
    d.receiveShadow = true;
    groupe.add(d);
  }

  // Arène du boss
  const arene = new THREE.Group();
  const cote = ARENE.cases * ARENE.taille;
  const plateau = new THREE.Mesh(new THREE.BoxGeometry(cote + 0.6, 0.16, cote + 0.6), mat(PALETTE.creme, { roughness: 0.9 }));
  plateau.position.y = 0.0;
  plateau.receiveShadow = true;
  const bord = new THREE.Mesh(new THREE.BoxGeometry(cote + 1, 0.12, cote + 1), mat(PALETTE.marine));
  bord.position.y = -0.03;
  arene.add(bord, plateau);
  arene.position.copy(ARENE.centre);
  groupe.add(arene);

  // Barrière (tant que le mini-jeu n'est pas réussi)
  const barriere = new THREE.Mesh(
    new THREE.CylinderGeometry(cote * 0.72, cote * 0.72, 3, 48, 1, true),
    new THREE.MeshBasicMaterial({ color: niveau.accent, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }),
  );
  barriere.position.copy(ARENE.centre).setY(1.5);
  groupe.add(barriere);
  const colliderBarriere = { x: ARENE.centre.x, z: ARENE.centre.z, r: cote * 0.72 + 0.4 };
  colliders.push(colliderBarriere);
  animations.push((dt, t) => { barriere.material.opacity = 0.16 + Math.sin(t * 2) * 0.06; });

  // Torii d'entrée
  const toriiEntree = torii(niveau.accent);
  toriiEntree.position.set(0, 0, 12);
  groupe.add(toriiEntree);
  colliders.push({ x: -2.1, z: 12, r: 0.45 }, { x: 2.1, z: 12, r: 0.45 });

  // Portail (caché jusqu'à l'obtention de l'objet de quête)
  const portail = creerPortail(niveau.accent);
  portail.position.copy(POS.portail);
  portail.visible = false;
  groupe.add(portail);
  animations.push((dt, t) => {
    if (!portail.visible) return;
    portail.userData.disque.rotation.z -= dt * 1.5;
    portail.userData.disque.material.opacity = 0.75 + Math.sin(t * 3) * 0.15;
  });

  // Décor propre au biome
  const decor = { bambou: decorBambou, ciel: decorCiel, tournesol: decorTournesols, automne: decorAutomne,
    glycine: decorGlycines, sakura: decorSakura, final: decorMatsue }[niveau.biome] ?? decorGenerique;
  // Décors hauts (bambous…) que la caméra masque quand ils passent entre elle et le joueur
  const masquables = [];
  // Toits de végétation (pergolas, grandes glycines) où la caméra ne doit pas entrer :
  // boîtes { x0, x1, z0, z1, y0, y1 } ou cylindres { x, z, r, y0, y1 }
  const plafonds = [];
  decor({ groupe, scene, niveau, colliders, animations, chargeurTexture, masquables, plafonds });

  return {
    groupe, colliders, animations, portail, masquables, plafonds,
    ouvrirArene() {
      barriere.visible = false;
      colliders.splice(colliders.indexOf(colliderBarriere), 1);
    },
    detruire() {
      scene.remove(groupe);
      groupe.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
    },
  };
}

export function torii(couleur = PALETTE.corail, echelle = 1) {
  const g = new THREE.Group();
  const rouge = mat(couleur, { roughness: 0.5 });
  const noir = mat(PALETTE.marine, { roughness: 0.6 });
  for (const s of [-1, 1]) {
    const pilier = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 4.6, 16), rouge);
    pilier.position.set(2.1 * s, 2.3, 0);
    const pied = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.4, 16), noir);
    pied.position.set(2.1 * s, 0.2, 0);
    g.add(pilier, pied);
  }
  const nuki = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.3, 0.3), rouge);
  nuki.position.y = 3.6;
  const kasagi = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.4, 0.6), rouge);
  kasagi.position.y = 4.55;
  const toit = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.22, 0.75), noir);
  toit.position.y = 4.85;
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.12), mat(PALETTE.creme));
  plaque.position.y = 4.05;
  g.add(nuki, kasagi, toit, plaque);
  g.scale.setScalar(echelle);
  return ombre(g);
}

function creerPortail(couleur) {
  const g = torii(couleur, 1.1);
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.35, PALETTE.rosePale);
  grad.addColorStop(0.7, couleur);
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 6;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(128, 128, 30 + i * 18, i, i + 2.4);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const disque = new THREE.Mesh(new THREE.CircleGeometry(1.9, 48),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  disque.position.y = 2.0;
  g.add(disque);
  g.userData.disque = disque;
  return g;
}

// Décor dessiné collé à l'intérieur d'un grand cylindre, répété en miroir pour ne pas voir de raccord.
// `bas` = hauteur du bas de l'image ; le centre de l'image tombe face à l'arrivée (-z).
function fondPanoramique(groupe, url, chargeurTexture, { rayon, repetitions, bas }) {
  const tex = chargeurTexture.load(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.MirroredRepeatWrapping;
  tex.repeat.x = repetitions;
  const H = ((2 * Math.PI * rayon) / repetitions) * 0.75; // images au format 4:3
  const fond = new THREE.Mesh(new THREE.CylinderGeometry(rayon, rayon, H, 96, 1, true),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false }));
  fond.position.y = bas + H / 2;
  if (repetitions % 2 === 0) fond.rotation.y = Math.PI / repetitions; // garde le centre de l'image face à l'arrivée
  groupe.add(fond);
  return fond;
}

// ---- Outils communs aux décors
// Colore une géométrie d'une seule teinte (pour fusionner plusieurs pièces en un seul maillage)
function colorer(geo, couleur) {
  const col = new THREE.Color(couleur), n = geo.attributes.position.count, a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) a.set([col.r, col.g, col.b], i * 3);
  geo.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return geo;
}
// Fusionne des morceaux colorés en un seul maillage (bien moins d'appels de dessin)
let matCouleurs = null;
function fusionner(morceaux) {
  matCouleurs ??= mat('#ffffff', { vertexColors: true });
  const geos = morceaux.map((g) => (g.index ? g.toNonIndexed() : g));
  const m = new THREE.Mesh(mergeGeometries(geos), matCouleurs);
  morceaux.forEach((g) => g.dispose());
  return ombre(m);
}
// Sol qui prolonge l'île jusqu'à l'horizon, en dégradé du centre vers le bord
function solExterieur(groupe, centre, bord, rayon = 140) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, centre); g.addColorStop(0.3, centre); g.addColorStop(1, bord);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sol = new THREE.Mesh(new THREE.CircleGeometry(rayon, 64), mat('#ffffff', { map: tex }));
  sol.rotation.x = -Math.PI / 2;
  sol.position.y = -0.05;
  sol.receiveShadow = true;
  groupe.add(sol);
}
// Position aléatoire hors du chemin, de l'arène et de l'arrivée
const horsChemin = (x, z) => Math.abs(x) > 4.5 && !(Math.abs(x) < 8 && z > -17 && z < -3);
const auHasard = (min, max) => min + Math.random() * (max - min);
// Couloir derrière l'arrivée, où se trouve la caméra au début : pas d'arbre dedans
const horsCouloirCamera = (x, z) => !(z > 12 && Math.abs(x) < 13);

function nuage(taille = 1, opacite = 0.95) {
  const g = new THREE.Group();
  const m = new THREE.MeshLambertMaterial({ color: '#ffffff', transparent: opacite < 1, opacity: opacite });
  const n = 5 + Math.floor(Math.random() * 4);
  for (let i = 0; i < n; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 10), m);
    const r = 0.8 + Math.random() * 0.9;
    s.scale.set(r * 1.3, r * 0.8, r);
    s.position.set((i - n / 2) * 1.1, Math.random() * 0.5, (Math.random() - 0.5) * 1.4);
    g.add(s);
  }
  g.scale.setScalar(taille);
  return g;
}

// Carpes koï dessinées (découpées des illustrations par outils/carpes.py).
// tete : direction de la tête dans l'image (x vers la droite, y vers le bas).
const CARPES = [
  ['39_1', 1, 0.1], ['39_2', -0.6, 1], ['39_3', -0.2, -1], ['40_1', -0.4, -1], ['40_2', 0.4, -1],
  ['41_1', -0.3, -1], ['41_2', 1, 0.3], ['41_3', -0.8, 0.8], ['42_1', 0.5, -1], ['42_2', -0.5, 1],
  ['43_1', 0.5, -1], ['43_2', -0.6, 1], ['44_1', 0, 1], ['44_2', 1, -0.1], ['44_3', -0.6, -1],
];
const texturesCarpes = new Map();
let numeroCarpe = 0;

// Volume d'une carpe : la silhouette du dessin est « gonflée » des deux côtés (dos et ventre).
// L'épaisseur suit la distance au contour : corps bien rond, nageoires et queue fines.
function volumeCarpe(image) {
  const asp = image.width / image.height;
  const max = 96;
  const W = Math.max(8, Math.round(asp >= 1 ? max : max * asp));
  const H = Math.max(8, Math.round(asp >= 1 ? max / asp : max));
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(image, 0, 0, W, H);
  const px = ctx.getImageData(0, 0, W, H).data;
  // Distance au contour (chanfrein 3-4, deux passes)
  const INF = 1e9;
  const d = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) d[i] = px[i * 4 + 3] > 110 ? INF : 0;
  const v = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : d[y * W + x]);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!d[i]) continue;
    d[i] = Math.min(d[i], v(x - 1, y) + 1, v(x, y - 1) + 1, v(x - 1, y - 1) + 1.4, v(x + 1, y - 1) + 1.4);
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; if (!d[i]) continue;
    d[i] = Math.min(d[i], v(x + 1, y) + 1, v(x, y + 1) + 1, v(x + 1, y + 1) + 1.4, v(x - 1, y + 1) + 1.4);
  }
  // Léger lissage pour éviter les arêtes du chanfrein
  const lisse = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!d[y * W + x]) continue;
    let s = 0;
    for (let j = -1; j <= 1; j++) for (let k = -1; k <= 1; k++) s += v(x + k, y + j);
    lisse[y * W + x] = s / 9;
  }
  let dmax = 1;
  for (let i = 0; i < W * H; i++) dmax = Math.max(dmax, lisse[i]);
  // Demi-épaisseur maximale (en hauteur d'image ; la largeur sera étirée par scale.x)
  const epaisseur = 0.075 * Math.max(asp, 1 / asp);
  const nv = W * H;
  const pos = new Float32Array(nv * 2 * 3);
  const uv = new Float32Array(nv * 2 * 2);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const u = x / (W - 1), w = 1 - y / (H - 1);
    const z = epaisseur * Math.sqrt(Math.max(lisse[i] - 0.5, 0) / dmax);
    for (const [face, sz] of [[0, 1], [1, -1]]) {
      const n = face * nv + i;
      pos.set([u - 0.5, w - 0.5, z * sz], n * 3);
      uv.set([u, w], n * 2);
    }
  }
  const index = [];
  for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) {
    const a = y * W + x, b = a + 1, c2 = a + W, e = c2 + 1;
    // On saute les carrés entièrement hors du poisson
    if (!d[a] && !d[b] && !d[c2] && !d[e]) continue;
    index.push(a, c2, b, b, c2, e); // dos (face vers +z)
    index.push(nv + a, nv + b, nv + c2, nv + b, nv + e, nv + c2); // ventre (face vers −z)
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

// Une carpe = le dessin en volume, posé à plat, la tête orientée vers +z ; la queue ondule dans le shader.
function koi(chargeurTexture, longueur = 1.3) {
  const [nom, tx, ty] = CARPES[numeroCarpe++ % CARPES.length];
  if (!texturesCarpes.has(nom)) {
    const t = chargeurTexture.load(`../carpes/koi_${nom}.png`, (tex) => {
      // Proportions réelles du dessin et volume, une fois chargé
      tex.userData.volume = volumeCarpe(tex.image);
      for (const m of tex.userData.maillages) {
        m.scale.x = tex.image.width / tex.image.height;
        m.geometry.dispose();
        m.geometry = tex.userData.volume;
      }
    });
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    t.userData.maillages = [];
    texturesCarpes.set(nom, t);
  }
  const tex = texturesCarpes.get(nom);
  const tete = new THREE.Vector2(tx, -ty).normalize(); // dans le plan du dessin (y vers le haut)
  const uniforms = { temps: { value: 0 }, phase: { value: Math.random() * 6.28 }, tete: { value: tete } };
  // Ombrage doux : le volume se lit (dos éclairé, flancs plus sombres) sans perdre les couleurs du dessin
  const m = new THREE.MeshLambertMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: 0.45 });
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float temps, phase; uniform vec2 tete;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        float le = dot(transformed.xy, tete);              // > 0 vers la tête, < 0 vers la queue
        float ampl = 0.03 + 0.22 * smoothstep(0.1, -0.5, le) * (-le + 0.1);
        transformed.xy += vec2(-tete.y, tete.x) * ampl * sin(temps * 6.0 + phase + le * 5.0);`);
  };
  m.customProgramCacheKey = () => 'carpe';
  const plan = new THREE.Mesh(tex.userData.volume ?? new THREE.PlaneGeometry(1, 1), m);
  tex.userData.maillages.push(plan);
  if (tex.image) plan.scale.x = tex.image.width / tex.image.height;
  const g = new THREE.Group();
  const corps = new THREE.Group(); // à plat, tête vers +z
  corps.rotation.y = Math.atan2(-tete.x, -tete.y); // amène la tête du dessin sur +z
  plan.rotation.x = -Math.PI / 2;
  corps.add(plan);
  corps.scale.setScalar(longueur);
  g.add(corps);
  g.userData.uniforms = uniforms;
  return g;
}

// ------------------------------------------------------------------ Sas : forêt de bambous
function decorBambou({ groupe, scene, niveau, colliders, animations, chargeurTexture, masquables }) {
  // Fond dessiné de la forêt de bambous, tout autour de l'île
  if (niveau.fond) fondPanoramique(groupe, niveau.fond, chargeurTexture, { rayon: 75, repetitions: 4, bas: -9 });
  // Brume verte : les bambous lointains se fondent dans le dessin
  scene.fog = new THREE.Fog('#628d34', 30, 105);

  // Sol extérieur : terre beige qui fonce vers le bord, pour rejoindre le pied des bambous du dessin
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, '#bd8a4c'); g.addColorStop(0.45, '#b37f45'); g.addColorStop(0.85, '#8a5732'); g.addColorStop(1, '#6e4226');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const texSol = new THREE.CanvasTexture(c);
  texSol.colorSpace = THREE.SRGBColorSpace;
  const foret = new THREE.Mesh(new THREE.CircleGeometry(76, 64), mat('#ffffff', { map: texSol, fog: false }));
  foret.rotation.x = -Math.PI / 2;
  foret.position.y = -0.05;
  foret.receiveShadow = true;
  groupe.add(foret);

  // Bambous comme sur le dessin : tiges vert plat, nœuds foncés, petit reflet clair en arc sous chaque nœud.
  // Chaque bambou est fusionné en une seule géométrie colorée (beaucoup moins d'appels de dessin).
  const VERTS = ['#81b14d', '#709d40', '#628d34', '#7aaa45'];
  const matBambou = mat('#ffffff', { vertexColors: true });

  const bambou = (x, z) => {
    const h = 10 + Math.random() * 8, r = 0.1 + Math.random() * 0.13;
    const morceaux = [colorer(new THREE.CylinderGeometry(r, r * 1.06, h, 8).translate(0, h / 2, 0), VERTS[Math.floor(Math.random() * VERTS.length)])];
    const pas = 1.1 + r * 3;
    for (let y = 0.6 + Math.random() * pas; y < h; y += pas) {
      morceaux.push(colorer(new THREE.CylinderGeometry(r * 1.04, r * 1.04, 0.035, 8, 1, true).translate(0, y, 0), '#53782e'));
      morceaux.push(colorer(new THREE.TorusGeometry(r * 1.03, 0.012, 3, 6, Math.PI * 0.75).rotateX(Math.PI / 2).rotateY(Math.random() * 6.28).translate(0, y - 0.16, 0), '#c6ef8e'));
    }
    const b = new THREE.Mesh(mergeGeometries(morceaux), matBambou);
    morceaux.forEach((m) => m.dispose());
    b.position.set(x, 0, z);
    b.rotation.z = (Math.random() - 0.5) * 0.1;
    b.userData.phase = Math.random() * 6;
    groupe.add(ombre(b));
    return b;
  };

  // Mur de bambous autour de la clairière + bosquets intérieurs
  const balancent = [];
  // Cases à laisser libres : le chemin (x ≈ 0), l'arène du boss et l'arrivée
  const libre = (x, z) => Math.abs(x) > 4.5 && !(Math.abs(x) < 8 && z > -17 && z < -3);
  const planter = (x, z, solide) => {
    const b = bambou(x, z);
    balancent.push(b);
    if (solide) colliders.push({ x, z, r: 0.35 });
    return b;
  };
  // Forêt dense tout autour de la clairière
  for (let i = 0; i < 560; i++) {
    const a = Math.random() * Math.PI * 2, r = RAYON_ILE + 0.5 + Math.random() ** 0.8 * 30;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (horsCouloirCamera(x, z)) planter(x, z, false).castShadow = false; // rien derrière l'arrivée ; hors de l'île : pas d'ombre (coûteux, invisible)
  }
  // Lisière : bambous qui débordent dans la clairière
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2, r = 16.5 + Math.random() * 5;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (libre(x, z)) planter(x, z, true);
  }
  // Bosquets dans la clairière
  for (const [cx, cz] of [[-11, 6], [12, 4], [-13, -6], [13, -13], [-9, 16], [10, 15], [-8, -1], [9, -3], [-14, 11], [15, 9], [-10, -19], [11, -19]]) {
    for (let i = 0; i < 7; i++) {
      const x = cx + (Math.random() - 0.5) * 3.4, z = cz + (Math.random() - 0.5) * 3.4;
      if (libre(x, z)) planter(x, z, true);
    }
  }
  masquables.push(...balancent);
  animations.push((dt, t) => {
    for (const b of balancent) b.rotation.x = Math.sin(t * 0.8 + b.userData.phase) * 0.015;
  });

  // Lanternes de pierre le long du chemin
  const pierre = mat('#a7a49b', { roughness: 1 });
  for (const [x, z] of [[-2.6, 8], [2.6, 8], [-2.6, -2], [2.6, -2], [-2.6, -17], [2.6, -17]]) {
    const l = new THREE.Group();
    const socle = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.3, 8), pierre);
    socle.position.y = 0.15;
    const fut = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.9, 8), pierre);
    fut.position.y = 0.75;
    const feu = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), mat('#fff1c9', { emissive: '#ffc867', emissiveIntensity: 0.8 }));
    feu.position.y = 1.4;
    const toit = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.4, 4), pierre);
    toit.position.y = 1.8;
    toit.rotation.y = Math.PI / 4;
    l.add(socle, fut, feu, toit);
    l.position.set(x, 0, z);
    groupe.add(ombre(l));
    colliders.push({ x, z, r: 0.5 });
  }

  // Lucioles
  const n = 120, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 40, 0.5 + Math.random() * 4, (Math.random() - 0.5) * 40], i * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const lucioles = new THREE.Points(geo, new THREE.PointsMaterial({ color: '#fff3b0', size: 0.12, transparent: true, opacity: 0.9 }));
  groupe.add(lucioles);
  animations.push((dt, t) => { lucioles.position.y = Math.sin(t * 0.7) * 0.3; lucioles.rotation.y = t * 0.02; });
}

// --------------------------------------------------- Informatique : le ciel, îles flottantes
function decorCiel({ groupe, scene, niveau, colliders, animations, chargeurTexture }) {
  scene.fog = new THREE.Fog('#a8b8cb', 70, 290); // couleur du ciel et des nuages du dessin
  // Fond : le mont Fuji, répété en miroir sur 360° pour ne pas avoir de raccord visible
  // Le mont Fuji : le haut des nuages de l'image arrive à hauteur d'horizon
  if (niveau.fond) fondPanoramique(groupe, niveau.fond, chargeurTexture, { rayon: 300, repetitions: 3, bas: (((2 * Math.PI * 300) / 3) * 0.75) * -0.38 - 4 });
  const merNuages = new THREE.Mesh(new THREE.CircleGeometry(300, 64), new THREE.MeshBasicMaterial({ color: '#e9eef5', fog: false }));
  merNuages.rotation.x = -Math.PI / 2;
  merNuages.position.y = -60;
  groupe.add(merNuages);

  // Dessous rocheux de l'île
  const roche = new THREE.Mesh(new THREE.ConeGeometry(RAYON_ILE + 1.5, 16, 32, 3), mat('#4f7295')); // bleu du Fuji
  roche.rotation.x = Math.PI;
  roche.position.y = -9.2;
  groupe.add(roche);

  // Nuages autour et en dessous
  const nuages = [];
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2, r = 30 + Math.random() * 110;
    const n = nuage(1.5 + Math.random() * 3, 0.9);
    n.position.set(Math.cos(a) * r, -6 - Math.random() * 18, Math.sin(a) * r);
    n.userData.v = 0.3 + Math.random() * 0.6;
    groupe.add(n);
    nuages.push(n);
  }
  animations.push((dt) => {
    for (const n of nuages) {
      n.position.x += n.userData.v * dt;
      if (n.position.x > 140) n.position.x = -140;
    }
  });

  // Petites îles flottantes
  const petites = [];
  for (const [x, y, z, r] of [[-34, 4, -18, 4], [32, 7, -26, 5], [-28, -2, 22, 3.5], [36, 1, 14, 3], [0, 12, -52, 7], [-48, 9, -40, 5]]) {
    const ile = new THREE.Group();
    const dessus = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.9, 0.8, 20), mat(niveau.sol));
    const dessous = new THREE.Mesh(new THREE.ConeGeometry(r * 0.9, r * 1.8, 10), mat('#4f7295'));
    dessous.rotation.x = Math.PI;
    dessous.position.y = -r * 0.9 - 0.4;
    ile.add(dessus, dessous);
    if (r > 4) {
      const t = torii(niveau.accent, r / 9);
      t.position.y = 0.4;
      ile.add(t);
    }
    ile.position.set(x, y, z);
    ile.userData = { y, phase: Math.random() * 6 };
    groupe.add(ombre(ile));
    petites.push(ile);
  }

  // Blocs d'eau flottants avec carpes koï
  const eau = new THREE.MeshPhysicalMaterial({ color: '#7fb3e6', transparent: true, opacity: 0.42, roughness: 0.05, clearcoat: 1, depthWrite: false });
  const kois = [];
  const blocs = [[13, 2.6, 2, 5], [-14, 3.4, -4, 4], [-22, 6, -30, 6], [24, 9, -40, 7], [-8, 14, -34, 3.5]];
  for (const [x, y, z, s] of blocs) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.8, s), eau);
    b.position.set(x, y, z);
    b.userData = { y, phase: Math.random() * 6 };
    groupe.add(b);
    petites.push(b);
    for (let i = 0; i < 2; i++) {
      const k = koi(chargeurTexture, s * 0.42);
      k.rotation.z = 0.75; // inclinée vers l'extérieur du bloc : on voit le dessin depuis le sol
      k.userData = { ...k.userData, bloc: b, rayon: s * 0.28, vitesse: 0.6 + Math.random() * 0.5, phase: i * Math.PI, dy: (i - 0.5) * s * 0.25 };
      groupe.add(k);
      kois.push(k);
    }
  }
  // Les blocs posés sur l'île bloquent le passage
  colliders.push({ x: 13, z: 2, r: 3.3 }, { x: -14, z: -4, r: 2.8 });

  // Carpes qui nagent dans le ciel autour de l'île
  for (let i = 0; i < 6; i++) {
    const k = koi(chargeurTexture, 4);
    k.rotation.z = 0.7; // inclinée dans le virage : on la voit d'en bas comme d'en haut
    k.userData = { ...k.userData, centre: new THREE.Vector3(0, 7 + i * 1.6, -6), rayon: 26 + i * 4, vitesse: 0.12 + i * 0.02, phase: i };
    groupe.add(k);
    kois.push(k);
  }

  animations.push((dt, t) => {
    for (const p of petites) p.position.y = p.userData.y + Math.sin(t * 0.6 + p.userData.phase) * 0.4;
    for (const k of kois) {
      const u = k.userData;
      const a = t * u.vitesse + u.phase;
      const c = u.bloc ? u.bloc.position : u.centre;
      k.position.set(c.x + Math.cos(a) * u.rayon, c.y + (u.dy ?? 0) + Math.sin(a * 2) * 0.1, c.z + Math.sin(a) * u.rayon);
      k.rotation.y = -a; // tangent au cercle
      u.uniforms.temps.value = t;
    }
  });

}

// ---------------------------------------- Biomes à venir : île simple aux couleurs du niveau
function decorGenerique({ groupe, niveau, colliders }) {
  const tronc = mat('#6b4a33');
  const feuillage = mat(niveau.accent, { flatShading: true });
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + 0.2, r = 15 + (i % 3) * 2;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (Math.abs(x) < 4) continue;
    const arbre = new THREE.Group();
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 2.4, 8), tronc);
    t.position.y = 1.2;
    const f = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), feuillage);
    f.position.y = 3.2;
    arbre.add(t, f);
    arbre.position.set(x, 0, z);
    groupe.add(ombre(arbre));
    colliders.push({ x, z, r: 0.6 });
  }
  const dessous = new THREE.Mesh(new THREE.ConeGeometry(RAYON_ILE + 1.5, 14, 20, 2), mat('#8a7f76', { flatShading: true }));
  dessous.rotation.x = Math.PI;
  dessous.position.y = -8.2;
  groupe.add(dessous);
}

// ------------------------------------------------------------------ Multimédia : Sayo, champs de tournesols
function decorTournesols({ groupe, scene, niveau, colliders, animations, chargeurTexture }) {
  // Fond dessiné de Sayo tout autour ; brume et sol aux couleurs de son herbe
  // 8 répétitions : les grands tournesols du dessin restent sur l'horizon et le ciel reste visible
  if (niveau.fond) fondPanoramique(groupe, niveau.fond, chargeurTexture, { rayon: 90, repetitions: 8, bas: -11 });
  scene.fog = new THREE.Fog('#7aa852', 30, 115);
  solExterieur(groupe, '#77ab52', '#5f9244', 91);
  const tournesol = (x, z) => {
    const h = auHasard(1.4, 2.6), m = [];
    m.push(colorer(new THREE.CylinderGeometry(0.05, 0.07, h, 6).translate(0, h / 2, 0), '#5f9244'));
    for (const s of [-1, 1]) {
      m.push(colorer(new THREE.SphereGeometry(0.22, 8, 6).scale(1, 0.25, 0.55).rotateZ(s * 0.6).translate(s * 0.2, h * 0.45, 0), '#679b4c'));
    }
    const tete = [colorer(new THREE.CylinderGeometry(0.2, 0.22, 0.08, 16).rotateX(Math.PI / 2), '#733b0d')];
    for (let k = 0; k < 14; k++) {
      const an = (k / 14) * Math.PI * 2;
      tete.push(colorer(new THREE.SphereGeometry(0.11, 6, 4).scale(1, 2.2, 0.35).translate(0, 0.3, 0).rotateZ(an), k % 2 ? '#fed76b' : '#ffdd80'));
    }
    const g = mergeGeometries(tete.map((t) => t.toNonIndexed()));
    g.rotateY(Math.atan2(-x, -z)).translate(0, h + 0.05, 0); // regardent le centre de l'île
    m.push(g);
    const f = fusionner(m);
    f.position.set(x, 0, z);
    f.userData.phase = Math.random() * 6;
    groupe.add(f);
    return f;
  };
  // Placement espacé (pas de paquets) : on refuse un tournesol trop près d'un autre
  const fleurs = [], places = [];
  const libre = (x, z, ecart) => places.every(([px, pz]) => (px - x) ** 2 + (pz - z) ** 2 > ecart * ecart);
  for (let essai = 0; essai < 4000 && fleurs.length < 330; essai++) {
    const a = Math.random() * Math.PI * 2, r = RAYON_ILE + 1 + Math.random() ** 0.7 * 26;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!horsCouloirCamera(x, z) || !libre(x, z, 1.15)) continue;
    places.push([x, z]);
    fleurs.push(tournesol(x, z));
  }
  // Quelques tournesols isolés dans la clairière, bien séparés
  for (let essai = 0; essai < 600 && places.length < fleurs.length + 26; essai++) {
    const a = Math.random() * Math.PI * 2, r = auHasard(9, 19);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!horsChemin(x, z) || !libre(x, z, 2.2)) continue;
    places.push([x, z]);
    fleurs.push(tournesol(x, z));
    colliders.push({ x, z, r: 0.25 });
  }
  animations.push((dt, t) => { for (const f of fleurs) f.rotation.z = Math.sin(t * 1.2 + f.userData.phase) * 0.03; });
}

// ------------------------------------------------------------------ Design : Hakone en automne
function decorAutomne({ groupe, scene, niveau, colliders, animations, chargeurTexture }) {
  // Fond dessiné (ciel bleu, arbres d'automne, herbe et feuilles mortes) tout autour de l'île ;
  // brume et sol aux couleurs de son herbe pour que le décor 3D s'y fonde
  if (niveau.fond) fondPanoramique(groupe, niveau.fond, chargeurTexture, { rayon: 90, repetitions: 6, bas: -12 });
  scene.fog = new THREE.Fog('#7fae4c', 32, 118);
  solExterieur(groupe, '#86b24f', '#6f9d42', 91);
  const TEINTES = ['#e8672c', '#d9482b', '#f2a33a', '#c9542f', '#f0b54a'];
  const erable = (x, z, echelle = 1) => {
    const h = auHasard(2.2, 3.4) * echelle, m = [colorer(new THREE.CylinderGeometry(0.15 * echelle, 0.25 * echelle, h, 7).translate(0, h / 2, 0), '#6b4a33')];
    const t = TEINTES[Math.floor(Math.random() * TEINTES.length)];
    for (let k = 0; k < 6; k++) {
      const r = auHasard(0.9, 1.4) * echelle;
      m.push(colorer(new THREE.IcosahedronGeometry(r, 2).translate(auHasard(-1, 1) * echelle, h + auHasard(-0.3, 0.9) * echelle, auHasard(-1, 1) * echelle), k % 3 ? t : TEINTES[(k + 2) % TEINTES.length]));
    }
    const a = fusionner(m);
    a.position.set(x, 0, z);
    groupe.add(a);
    return a;
  };
  for (let i = 0; i < 150; i++) {
    const a = Math.random() * Math.PI * 2, r = RAYON_ILE + 2 + Math.random() * 40;
    if (horsCouloirCamera(Math.cos(a) * r, Math.sin(a) * r)) erable(Math.cos(a) * r, Math.sin(a) * r, auHasard(1, 1.6));
  }
  for (const [cx, cz] of [[-12, 6], [12, 3], [-13, -7], [13, -13], [-15, 13], [15, 12]]) {
    if (!horsChemin(cx, cz)) continue;
    erable(cx, cz, 1.1);
    colliders.push({ x: cx, z: cz, r: 0.6 });
  }
  // Feuilles tombées sur le sol et feuilles qui virevoltent
  const sol = [];
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * 30;
    sol.push(colorer(new THREE.CircleGeometry(0.12, 5).rotateX(-Math.PI / 2).rotateY(Math.random() * 6).translate(Math.cos(a) * r, 0.02, Math.sin(a) * r), TEINTES[i % TEINTES.length]));
  }
  groupe.add(fusionner(sol));
  feuillesQuiTombent(groupe, animations, ['#e8672c', '#f2a33a', '#d9482b'], 140);
}

// ------------------------------------------------------------------ Marketing : Nara, glycines et cerfs
function decorGlycines({ groupe, scene, colliders, animations, plafonds }) {
  scene.fog = new THREE.Fog('#dcbde3', 35, 150);
  solExterieur(groupe, '#8fa860', '#7c9a56');
  const bois = '#5c4030';

  // Grappes de glycine : une vraie grappe = des dizaines de petites fleurs en spirale autour d'une tige
  // qui pend, larges et lavande en haut, étroites et violet foncé (boutons) en bas.
  // Quelques modèles de grappes, posés des centaines de fois en instances (un seul appel de dessin par modèle).
  // 4 grappes mauves + 2 blanches (glycine blanche, comme sur la photo de référence)
  const COULEURS = [['#d9bdf2', '#6e2c9e'], ['#c9a6ec', '#5f2491'], ['#e6cff7', '#8a45b8'], ['#bf96e6', '#57217f'], ['#fbfaf4', '#d9dcc0'], ['#ffffff', '#e4e8cc']];
  const MAUVES = [0, 1, 2, 3], BLANCHES = [4, 5];
  const modeles = COULEURS.map(([haut, bas], v) => {
    const morceaux = [], N = 24, longueur = 1;
    const ch = new THREE.Color(haut), cb = new THREE.Color(bas);
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1), a = i * 2.39996 + v;
      const r = 0.16 * (1 - t * 0.75);
      const fleur = new THREE.OctahedronGeometry(0.08 * (1 - t * 0.4)).scale(1.2, 0.75, 1)
        .rotateY(a).translate(Math.cos(a) * r, -t * longueur, Math.sin(a) * r);
      morceaux.push(colorer(fleur, '#' + ch.clone().lerp(cb, t ** 1.3).getHexString()));
    }
    morceaux.push(colorer(new THREE.CylinderGeometry(0.008, 0.008, longueur, 4).translate(0, -longueur / 2, 0), '#6a7a3a'));
    return mergeGeometries(morceaux.map((g) => (g.index ? g.toNonIndexed() : g)));
  });
  const matGrappes = mat('#ffffff', { vertexColors: true });
  const grappes = modeles.map(() => []); // [x, y, z, longueur, rotation] par modèle
  const suspendre = (x, y, z, palette = MAUVES, longueur = auHasard(0.8, 1.6)) =>
    grappes[palette[Math.floor(Math.random() * palette.length)]].push([x, y, z, longueur, Math.random() * 6.28]);
  const feuilles = []; // petites touffes de feuilles vertes entre les grappes
  const feuillage = (x, y, z, taille = 1) => feuilles.push(colorer(new THREE.IcosahedronGeometry(auHasard(0.22, 0.36) * taille, 1).scale(1.5, 0.45, 1.2).translate(x, y, z), Math.random() < 0.5 ? '#6f8f45' : '#82a352'));

  // Tunnel de pergolas le long du chemin, couvert de grappes comme dans les jardins japonais
  const pergola = [];
  const debut = 9, fin = -3, pas = 3; // après le torii d'entrée (z = 12), jusqu'à l'épreuve
  for (let z = debut; z >= fin; z -= pas) {
    for (const s of [-1, 1]) pergola.push(colorer(new THREE.BoxGeometry(0.22, 3.1, 0.22).translate(s * 2.5, 1.55, z), bois));
    for (const s of [-1, 1]) colliders.push({ x: s * 2.5, z, r: 0.25 });
    pergola.push(colorer(new THREE.BoxGeometry(5.6, 0.2, 0.26).translate(0, 3.15, z), bois)); // poutre transversale
  }
  for (const x of [-2.5, -1.25, 0, 1.25, 2.5]) pergola.push(colorer(new THREE.BoxGeometry(0.14, 0.14, debut - fin + 1).translate(x, 3.3, (debut + fin) / 2), bois));
  groupe.add(fusionner(pergola));
  plafonds.push({ x0: -3.4, x1: 3.4, z0: fin - 0.8, z1: debut + 0.8, y0: 1.6, y1: 4.2 }); // grappes et toit du tunnel
  for (let i = 0; i < 420; i++) {
    const x = auHasard(-2.9, 2.9), z = auHasard(fin - 0.5, debut + 0.5);
    suspendre(x, 3.25, z);
    if (i % 3 === 0) feuillage(x, 3.45, z);
  }

  // Glycines en arbres tout autour : tronc noueux, couronne de feuilles en parasol, rideau de grappes
  const troncs = [];
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2, r = RAYON_ILE + 2 + Math.random() * 30;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (!horsCouloirCamera(x, z)) continue;
    const h = auHasard(3, 4);
    troncs.push(colorer(new THREE.CylinderGeometry(0.14, 0.26, h, 6).translate(x, h / 2, z), bois));
    for (let k = 0; k < 10; k++) feuillage(x + auHasard(-1.6, 1.6), h + auHasard(0, 0.5), z + auHasard(-1.6, 1.6), 1.8);
    for (let k = 0; k < 12; k++) suspendre(x + auHasard(-1.7, 1.7), h + 0.05, z + auHasard(-1.7, 1.7));
  }
  // Grandes glycines centenaires (photo de référence) : tronc noueux et court, grosses branches à l'horizontale,
  // toit de treillis porté par des poteaux, feuillage vert clair dessus et rideau de grappes jusqu'au sol
  for (const [x0, z0, R, palette] of [[-15.5, -8, 4.6, MAUVES], [15.5, -8.5, 4.4, MAUVES], [-16, 7.5, 4.2, BLANCHES], [16, 5, 4.8, MAUVES]]) {
    const H = 2.7; // hauteur du treillis
    plafonds.push({ x: x0, z: z0, r: R + 0.4, y0: 0.6, y1: H + 1.2 }); // rideau de grappes et feuillage
    // tronc tordu : plusieurs segments qui se décalent
    let px = x0, pz = z0, py = 0;
    for (let k = 0; k < 4; k++) {
      const nx = x0 + auHasard(-0.35, 0.35), nz = z0 + auHasard(-0.35, 0.35), ny = py + 0.55;
      const d = new THREE.Vector3(nx - px, ny - py, nz - pz), l = d.length();
      troncs.push(colorer(new THREE.CylinderGeometry(0.3 - k * 0.04, 0.36 - k * 0.04, l + 0.1, 9)
        .applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()))
        .translate((px + nx) / 2, (py + ny) / 2, (pz + nz) / 2), bois));
      px = nx; pz = nz; py = ny;
    }
    colliders.push({ x: x0, z: z0, r: 0.6 });
    // grosses branches qui partent à l'horizontale jusqu'au bord du treillis
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2 + auHasard(-0.2, 0.2), l = R * auHasard(0.7, 0.95);
      const A = new THREE.Vector3(px, py, pz), B = new THREE.Vector3(x0 + Math.cos(a) * l, H - 0.15, z0 + Math.sin(a) * l);
      const d = B.clone().sub(A);
      troncs.push(colorer(new THREE.CylinderGeometry(0.06, 0.14, d.length(), 6)
        .applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()))
        .translate((A.x + B.x) / 2, (A.y + B.y) / 2, (A.z + B.z) / 2), bois));
    }
    // poteaux gris clair qui soutiennent le treillis
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2 + 0.3, r = R * 0.82;
      const x = x0 + Math.cos(a) * r, z = z0 + Math.sin(a) * r;
      troncs.push(colorer(new THREE.CylinderGeometry(0.07, 0.08, H, 6).translate(x, H / 2, z), '#b9ab98'));
      colliders.push({ x, z, r: 0.15 });
    }
    // feuillage vert tendre sur le dessus, en couches
    for (let k = 0; k < 55; k++) {
      const a = Math.random() * Math.PI * 2, r = R * Math.sqrt(Math.random());
      feuillage(x0 + Math.cos(a) * r, H + 0.15 + auHasard(0, 0.45) * (1 - r / R), z0 + Math.sin(a) * r, 1.5);
    }
    // rideau de grappes : plus longues et serrées sur le pourtour, jusqu'à près du sol
    for (let k = 0; k < 190; k++) {
      const a = Math.random() * Math.PI * 2, r = R * Math.sqrt(auHasard(0.15, 1));
      suspendre(x0 + Math.cos(a) * r, H + 0.05, z0 + Math.sin(a) * r, palette, auHasard(1.0, 1.8) * (0.7 + 0.5 * r / R));
    }
  }
  groupe.add(fusionner(troncs));
  groupe.add(fusionner(feuilles));
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
  grappes.forEach((liste, k) => {
    const inst = new THREE.InstancedMesh(modeles[k], matGrappes, liste.length);
    liste.forEach(([x, y, z, l, rot], i) => inst.setMatrixAt(i, m4.compose(v.set(x, y, z), q.setFromEuler(e.set(0, rot, 0)), sc.set(1, l, 1))));
    groupe.add(inst);
  });

  // Pagode à cinq toits au loin
  const pagode = [];
  for (let k = 0; k < 5; k++) {
    const l = 7 - k * 0.9, y = k * 3.2;
    pagode.push(colorer(new THREE.BoxGeometry(l * 0.6, 2.4, l * 0.6).translate(0, y + 1.2, 0), '#c9583a'));
    pagode.push(colorer(new THREE.ConeGeometry(l * 0.8, 1.2, 4).rotateY(Math.PI / 4).translate(0, y + 2.9, 0), '#3a3a44'));
  }
  pagode.push(colorer(new THREE.CylinderGeometry(0.15, 0.15, 4, 6).translate(0, 18, 0), '#e2b552'));
  const p = fusionner(pagode);
  p.position.set(-35, 0, -70);
  groupe.add(p);

  // Cerfs sika de Nara : corps fauve tacheté de blanc, longues pattes fines, cou dressé, grandes oreilles,
  // petit miroir blanc sous la queue ; les mâles portent des bois. La tête et le cou pivotent pour brouter.
  const cerfs = [];
  for (const [x, z, r, male] of [[-10, 3, 0.8, true], [11, -2, -2.2, false], [-12, 13, 2.4, false], [13, 11, -0.6, true]]) {
    const pelage = '#a8703f', ventre = '#e8d3b5', sabot = '#3a2a22', blanc = '#fbf3e4';
    // corps : ellipsoïde lisse (centre y 0,98, demi-axes 0,61 × 0,34 × 0,33) + épaules et hanches pour attacher les pattes
    const RC = [0.61, 0.34, 0.31], YC = 0.98;
    const corps = [colorer(new THREE.SphereGeometry(1, 28, 18).scale(...RC).translate(0, YC, 0), pelage)];
    corps.push(colorer(new THREE.SphereGeometry(1, 20, 12).scale(0.46, 0.2, 0.24).translate(0, 0.84, 0), ventre)); // ventre clair
    for (const dx of [-0.38, 0.36]) corps.push(colorer(new THREE.SphereGeometry(1, 16, 12).scale(0.2, 0.26, 0.27).translate(dx, 0.88, 0), pelage));
    for (const [dx, dz] of [[-0.4, -0.15], [-0.4, 0.15], [0.38, -0.15], [0.38, 0.15]]) {
      corps.push(colorer(new THREE.CylinderGeometry(0.06, 0.035, 0.8, 10).translate(dx, 0.44, dz), pelage));
      corps.push(colorer(new THREE.CylinderGeometry(0.038, 0.045, 0.07, 10).translate(dx, 0.035, dz), sabot));
    }
    // taches blanches posées exactement sur le pelage (deux rangées le long du dos)
    for (let k = 0; k < 16; k++) {
      const u = -0.75 + (k % 8) * 0.2 + auHasard(-0.04, 0.04), cote = k < 8 ? 1 : -1, th = cote * auHasard(0.45, 0.8);
      const cx = Math.cos(Math.asin(Math.max(-1, Math.min(1, u)))); // largeur de la section à cet endroit
      const n = new THREE.Vector3(u * RC[0], Math.cos(th) * cx * RC[1], Math.sin(th) * cx * RC[2]);
      n.multiplyScalar(0.97); // à moitié enfoncée : une tache, pas une bille
      const tache = new THREE.SphereGeometry(0.03, 8, 6).scale(1.3, 1, 1.3).translate(n.x, n.y + YC, n.z);
      corps.push(colorer(tache, blanc));
    }
    corps.push(colorer(new THREE.SphereGeometry(1, 12, 10).scale(0.07, 0.13, 0.15).translate(-0.6, 1.0, 0), blanc)); // miroir blanc
    corps.push(colorer(new THREE.ConeGeometry(0.05, 0.14, 8).rotateZ(Math.PI / 2 + 0.6).translate(-0.63, 1.08, 0), pelage)); // petite queue
    // Cou + tête : groupe qui pivote à la base du cou (enfoncée dans le poitrail, sans jour)
    const tete = [colorer(new THREE.CylinderGeometry(0.1, 0.16, 0.66, 14).translate(0, 0.33, 0).rotateZ(-0.5).translate(-0.1, -0.12, 0), pelage)];
    tete.push(colorer(new THREE.SphereGeometry(1, 18, 14).scale(0.19, 0.16, 0.15).translate(0.22, 0.42, 0), pelage));
    tete.push(colorer(new THREE.CylinderGeometry(0.07, 0.11, 0.24, 14).rotateZ(Math.PI / 2 + 0.25).translate(0.42, 0.37, 0), pelage)); // museau
    tete.push(colorer(new THREE.SphereGeometry(0.05, 10, 8).translate(0.55, 0.34, 0), '#2a1f1c')); // truffe
    tete.push(colorer(new THREE.SphereGeometry(1, 10, 8).scale(0.08, 0.035, 0.06).translate(0.44, 0.31, 0), ventre)); // menton clair
    for (const s of [-1, 1]) {
      tete.push(colorer(new THREE.SphereGeometry(0.03, 10, 8).translate(0.32, 0.47, s * 0.11), '#1d1614')); // yeux
      // grandes oreilles tournées sur les côtés, intérieur clair
      tete.push(colorer(new THREE.SphereGeometry(1, 12, 8).scale(0.04, 0.06, 0.12).rotateX(-s * 0.5).translate(0.15, 0.55, s * 0.2), pelage));
      tete.push(colorer(new THREE.SphereGeometry(1, 10, 6).scale(0.02, 0.045, 0.09).rotateX(-s * 0.5).translate(0.175, 0.555, s * 0.2), '#f1dcc4'));
      if (male) { // bois : une perche et deux andouillers
        tete.push(colorer(new THREE.CylinderGeometry(0.016, 0.024, 0.34, 8).rotateX(s * 0.35).rotateZ(-0.3).translate(0.18, 0.72, s * 0.08), '#e9dcc0'));
        tete.push(colorer(new THREE.CylinderGeometry(0.012, 0.017, 0.15, 8).rotateX(s * 0.2).rotateZ(-1.0).translate(0.26, 0.74, s * 0.1), '#e9dcc0'));
        tete.push(colorer(new THREE.CylinderGeometry(0.011, 0.015, 0.13, 8).rotateX(s * 0.6).rotateZ(-0.1).translate(0.24, 0.87, s * 0.13), '#e9dcc0'));
      }
    }
    const cou = fusionner(tete);
    cou.position.set(0.5, 1.08, 0);
    const cerf = new THREE.Group();
    cerf.add(fusionner(corps), cou);
    // pas d'ombre portée sur lui-même : évite les taches sombres sur le pelage
    cerf.traverse((o) => { if (o.isMesh) o.receiveShadow = false; });
    cerf.position.set(x, 0, z);
    cerf.rotation.y = r;
    cerf.userData = { tete: cou, phase: Math.random() * 6 };
    groupe.add(cerf);
    cerfs.push(cerf);
    colliders.push({ x, z, r: 0.8 });
  }
  animations.push((dt, t) => {
    for (const c of cerfs) c.userData.tete.rotation.z = -Math.max(0, Math.sin(t * 0.5 + c.userData.phase)) * 1.45; // baisse la tête jusqu'à l'herbe pour brouter
  });
  feuillesQuiTombent(groupe, animations, ['#c99ad8', '#b56bc4', '#e6d3f2'], 90);
}

// ------------------------------------------------------------------ Admin : Tokyo, sakura et stand Gaïa
function decorSakura({ groupe, scene, colliders, animations, masquables }) {
  scene.fog = new THREE.Fog('#efd9ea', 40, 170);
  solExterieur(groupe, '#b9c98f', '#a4b67e'); // herbe de printemps, comme un parc au moment du hanami
  const ROSES = ['#f9c6d6', '#f6b3c8', '#fbd9e4', '#f29bb8', '#fde8ee'];
  const ecorce = '#4b302b';
  // Cerisier : tronc penché, branches qui s'ouvrent en parasol, nuages de fleurs à leurs bouts
  const cerisier = (x, z, echelle = 1) => {
    const m = [], h = auHasard(1.8, 2.4) * echelle, penche = auHasard(-0.12, 0.12);
    m.push(colorer(new THREE.CylinderGeometry(0.16 * echelle, 0.3 * echelle, h, 8).rotateZ(penche).translate(-penche * h / 2, h / 2, 0), ecorce));
    const n = 5;
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + Math.random(), l = auHasard(1.3, 1.9) * echelle, monte = auHasard(0.5, 0.9);
      const dir = new THREE.Vector3(Math.cos(a) * Math.cos(monte), Math.sin(monte), Math.sin(a) * Math.cos(monte));
      const base = new THREE.Vector3(-penche * h, h * 0.92, 0);
      const bout = base.clone().addScaledVector(dir, l);
      const branche = new THREE.CylinderGeometry(0.05 * echelle, 0.11 * echelle, l, 6);
      branche.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)).translate(...base.clone().lerp(bout, 0.5).toArray());
      m.push(colorer(branche, ecorce));
      // grappe de fleurs : plusieurs boules roses autour du bout de la branche, un peu de blanc pour la lumière
      for (let f = 0; f < 4; f++) {
        const r = auHasard(0.55, 0.85) * echelle;
        m.push(colorer(new THREE.IcosahedronGeometry(r, 1).translate(bout.x + auHasard(-0.5, 0.5) * echelle, bout.y + auHasard(-0.15, 0.4) * echelle, bout.z + auHasard(-0.5, 0.5) * echelle), ROSES[(k + f) % ROSES.length]));
      }
    }
    const arbre = fusionner(m);
    arbre.position.set(x, 0, z);
    arbre.userData.rayonMasque = 2.2 * echelle; // large couronne : devient translucide si elle cache le joueur
    masquables.push(arbre);
    groupe.add(arbre);
    // tapis de pétales sous l'arbre
    const tapis = new THREE.Mesh(new THREE.CircleGeometry(2.2 * echelle, 20), new THREE.MeshBasicMaterial({ color: '#f6c2d2', transparent: true, opacity: 0.7, depthWrite: false }));
    tapis.rotation.x = -Math.PI / 2;
    tapis.position.set(x, 0.015, z);
    groupe.add(tapis);
  };
  // Parc tout autour de l'île
  for (let i = 0; i < 110; i++) {
    const a = Math.random() * Math.PI * 2, r = RAYON_ILE + 2 + Math.random() * 36;
    if (horsCouloirCamera(Math.cos(a) * r, Math.sin(a) * r)) cerisier(Math.cos(a) * r, Math.sin(a) * r, auHasard(1.1, 1.6));
  }
  // Allée de cerisiers de part et d'autre du chemin, et quelques-uns dans la clairière
  for (const z of [17, 11, 5, -1]) for (const s of [-1, 1]) { cerisier(s * 7, z, 1); colliders.push({ x: s * 7, z, r: 0.45 }); }
  for (const [cx, cz] of [[-13, -7], [13, -13], [-15, 12], [15, 2]]) { cerisier(cx, cz, 1.2); colliders.push({ x: cx, z: cz, r: 0.5 }); }

  // Hanami : nappes de pique-nique bleues avec des bentos sous les cerisiers
  for (const [x, z, r] of [[-8, 9, 0.3], [9.5, 14, -0.4], [-11, -1, 1.1]]) {
    const nappe = fusionner([
      colorer(new THREE.BoxGeometry(2.2, 0.03, 1.6), '#3f7fd6'),
      colorer(new THREE.BoxGeometry(0.4, 0.14, 0.3).translate(-0.4, 0.08, 0.2), '#c0392b'),
      colorer(new THREE.BoxGeometry(0.4, 0.14, 0.3).translate(0.3, 0.08, -0.25), '#2b2b33'),
      colorer(new THREE.CylinderGeometry(0.06, 0.06, 0.22, 8).translate(0.6, 0.12, 0.3), '#7fb26a'),
    ]);
    nappe.position.set(x, 0.02, z);
    nappe.rotation.y = r;
    groupe.add(nappe);
  }
  // Lanternes de pierre le long de l'allée
  const pierre = '#a7a49b';
  for (const z of [14, 8, 2]) for (const s of [-1, 1]) {
    const l = fusionner([
      colorer(new THREE.CylinderGeometry(0.22, 0.28, 0.2, 6).translate(0, 0.1, 0), pierre),
      colorer(new THREE.CylinderGeometry(0.09, 0.11, 0.7, 6).translate(0, 0.55, 0), pierre),
      colorer(new THREE.BoxGeometry(0.42, 0.34, 0.42).translate(0, 1.05, 0), '#f3e3b0'),
      colorer(new THREE.ConeGeometry(0.42, 0.3, 4).rotateY(Math.PI / 4).translate(0, 1.37, 0), pierre),
    ]);
    l.position.set(s * 3.6, 0, z);
    groupe.add(l);
    colliders.push({ x: s * 3.6, z, r: 0.3 });
  }

  // Silhouette de Tokyo au loin + tour rouge et blanche
  const ville = [];
  for (let i = 0; i < 60; i++) {
    const a = auHasard(-2.6, -0.5), r = auHasard(95, 120), h = auHasard(8, 30), l = auHasard(4, 9);
    ville.push(colorer(new THREE.BoxGeometry(l, h, l).translate(Math.cos(a) * r, h / 2, Math.sin(a) * r), i % 3 ? '#b7a9c9' : '#c9bcd9'));
  }
  for (let k = 0; k < 6; k++) {
    const y = k * 7, rb = 6 - k * 0.95;
    ville.push(colorer(new THREE.CylinderGeometry(rb - 0.9, rb, 7, 4).rotateY(Math.PI / 4).translate(-20, y + 3.5, -100), k % 2 ? '#ffffff' : '#ff6a3d'));
  }
  groupe.add(fusionner(ville));
  // Stand Gaïa : petite échoppe à l'auvent rayé, bouteilles sur le comptoir
  const stand = fusionner([
    colorer(new THREE.BoxGeometry(3, 1.1, 1.2).translate(0, 0.55, 0), '#c98a4b'),
    colorer(new THREE.BoxGeometry(3.2, 0.12, 1.4).translate(0, 1.15, 0), '#8a5a32'),
    ...[-1.45, 1.45].map((x) => colorer(new THREE.BoxGeometry(0.12, 2.6, 0.12).translate(x, 1.3, -0.5), '#8a5a32')),
    ...Array.from({ length: 6 }, (_, i) => colorer(new THREE.BoxGeometry(0.55, 0.08, 1.7).rotateX(0.35).translate(-1.375 + i * 0.55, 2.6, 0), i % 2 ? '#fbf8f2' : '#f28a2e')),
    ...Array.from({ length: 5 }, (_, i) => colorer(new THREE.CylinderGeometry(0.09, 0.1, 0.32, 10).translate(-0.9 + i * 0.4, 1.38, 0.1), i % 2 ? '#f28a2e' : '#f7c948')),
  ]);
  stand.position.set(9, 0, 7);
  stand.rotation.y = -0.6;
  groupe.add(stand);
  colliders.push({ x: 9, z: 7, r: 1.7 });
  feuillesQuiTombent(groupe, animations, ROSES, 220);
}

// ------------------------------------------------------------------ Boss final : Kinkaku-ji, le pavillon d'or sur son étang
function decorMatsue({ groupe, scene, colliders, animations }) {
  scene.fog = new THREE.Fog('#c9d3d6', 80, 260);
  // Étang vert sombre tout autour de l'île, un peu transparent pour laisser voir les reflets
  const eau = new THREE.MeshLambertMaterial({ color: '#5f7d6a', transparent: true, opacity: 0.86 });
  const etang = new THREE.Mesh(new THREE.CircleGeometry(200, 64), eau);
  etang.rotation.x = -Math.PI / 2;
  etang.position.y = -0.4;
  etang.renderOrder = 1;
  groupe.add(etang);
  const reflets = [];
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2, r = auHasard(26, 90);
    reflets.push(colorer(new THREE.PlaneGeometry(auHasard(1, 3), 0.1).rotateX(-Math.PI / 2).translate(Math.cos(a) * r, -0.37, Math.sin(a) * r), '#a9c2b4'));
  }
  const vagues = fusionner(reflets);
  vagues.castShadow = vagues.receiveShadow = false;
  groupe.add(vagues);
  animations.push((dt, t) => { vagues.position.x = Math.sin(t * 0.3) * 0.6; });

  // Le pavillon d'or : rez-de-chaussée en bois naturel et panneaux blancs, deux étages couverts d'or,
  // toits sombres aux bords relevés, phénix doré au sommet.
  const OR = '#d9a92e', OR_CLAIR = '#efc552', TOIT = '#3b2e27', BOIS = '#8a6a48', BLANC = '#efe9dc';
  const toit = (largeur, profondeur, y, h) => [
    colorer(new THREE.BoxGeometry(largeur, 0.35, profondeur).translate(0, y, 0), TOIT),
    colorer(new THREE.CylinderGeometry(0.01, 1, h, 4, 1).rotateY(Math.PI / 4).scale(largeur * 0.62, 1, profondeur * 0.62).translate(0, y + 0.17 + h / 2, 0), TOIT),
    colorer(new THREE.BoxGeometry(largeur + 0.6, 0.12, profondeur + 0.6).translate(0, y - 0.12, 0), '#2a201b'),
  ];
  const morceaux = [];
  // socle de pierre au ras de l'eau
  morceaux.push(colorer(new THREE.BoxGeometry(20, 0.8, 15).translate(0, 0.2, 0), '#8c8a80'));
  // rez-de-chaussée : poteaux de bois, panneaux blancs et ouvertures sombres
  morceaux.push(colorer(new THREE.BoxGeometry(16, 4, 11).translate(0, 2.6, 0), BLANC));
  for (let i = -3; i <= 3; i++) {
    morceaux.push(colorer(new THREE.BoxGeometry(0.35, 4.1, 0.35).translate(i * 2.6, 2.6, 5.6), BOIS));
    if (i < 3) morceaux.push(colorer(new THREE.BoxGeometry(1.6, 2.6, 0.1).translate(i * 2.6 + 1.3, 2.4, 5.52), i % 2 ? '#2b2420' : BLANC));
  }
  morceaux.push(colorer(new THREE.BoxGeometry(17, 0.3, 12.2).translate(0, 4.7, 0), BOIS)); // galerie
  morceaux.push(...toit(18, 13, 5.1, 1.2));
  // 1er étage doré, avec sa balustrade
  morceaux.push(colorer(new THREE.BoxGeometry(13, 3.4, 9).translate(0, 7.6, 0), OR));
  morceaux.push(colorer(new THREE.BoxGeometry(14, 0.5, 10).translate(0, 6.2, 0), OR_CLAIR));
  for (let i = -6; i <= 6; i += 2) morceaux.push(colorer(new THREE.BoxGeometry(0.2, 3.4, 0.2).translate(i, 7.6, 4.55), OR_CLAIR));
  morceaux.push(...toit(15.5, 11.5, 9.6, 1.3));
  // 2e étage doré, plus petit
  morceaux.push(colorer(new THREE.BoxGeometry(8, 3, 8).translate(0, 11.8, 0), OR));
  for (const s of [-1, 1]) morceaux.push(colorer(new THREE.BoxGeometry(1.4, 1.6, 0.1).translate(s * 2, 12, 4.02), '#b88a20')); // fenêtres en cloche
  morceaux.push(...toit(10.5, 10.5, 13.6, 2.6));
  // phénix doré au sommet
  morceaux.push(colorer(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 6).translate(0, 16.9, 0), OR_CLAIR));
  morceaux.push(colorer(new THREE.ConeGeometry(0.5, 1, 5).rotateZ(Math.PI / 2).scale(1, 0.5, 1.6).translate(0, 17.7, 0), OR_CLAIR));
  const pavillon = fusionner(morceaux);
  pavillon.position.set(0, -0.4, -50);
  pavillon.scale.setScalar(1.35);
  groupe.add(pavillon);
  // Son reflet dans l'étang : copie retournée sous l'eau, vue à travers l'eau
  const reflet = new THREE.Mesh(pavillon.geometry, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55, color: '#c9c3a8' }));
  reflet.scale.set(1.35, -1.35, 1.35);
  reflet.position.set(0, -0.8, -50);
  groupe.add(reflet);

  // Pins japonais taillés en plateaux, sur l'île et sur les rives
  const pin = (x, z, echelle = 1) => {
    const m = [colorer(new THREE.CylinderGeometry(0.15 * echelle, 0.28 * echelle, 2.6 * echelle, 7).rotateZ(auHasard(-0.2, 0.2)).translate(0, 1.3 * echelle, 0), '#5b4434')];
    for (let k = 0; k < 4; k++) {
      m.push(colorer(new THREE.SphereGeometry((1.4 - k * 0.25) * echelle, 10, 6).scale(1, 0.32, 0.85).translate(auHasard(-0.6, 0.6) * echelle, (1.8 + k * 0.75) * echelle, auHasard(-0.4, 0.4) * echelle), k % 2 ? '#2f5440' : '#3d6a50'));
    }
    const p = fusionner(m);
    p.position.set(x, 0, z);
    groupe.add(p);
  };
  for (const [x, z] of [[-13, 6], [13, 4], [-14, -8], [14, -12], [-11, 16], [11, 16], [-17, -2], [17, 9]]) {
    pin(x, z, 1.2);
    colliders.push({ x, z, r: 0.5 });
  }
  // Rives boisées autour de l'étang, comme le jardin du pavillon
  for (let i = 0; i < 70; i++) {
    const a = Math.random() * Math.PI * 2, r = auHasard(48, 95);
    if (Math.abs(a + Math.PI / 2) < 0.25 && r < 70) continue; // dégagé devant le pavillon
    pin(Math.cos(a) * r, Math.sin(a) * r, auHasard(1.6, 2.6));
  }
  // Collines boisées sombres à l'horizon
  const collines = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2, h = auHasard(18, 34);
    collines.push(colorer(new THREE.SphereGeometry(h * 1.6, 12, 8).scale(1, 0.55, 1).translate(Math.cos(a) * 150, -2, Math.sin(a) * 150), i % 2 ? '#3f5a45' : '#4d6a52'));
  }
  const fond = fusionner(collines);
  fond.castShadow = fond.receiveShadow = false;
  groupe.add(fond);
  // Rochers au bord de l'étang
  const rochers = [];
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2, r = auHasard(RAYON_ILE + 1.5, RAYON_ILE + 4);
    rochers.push(colorer(new THREE.DodecahedronGeometry(auHasard(0.4, 0.9)).scale(1, 0.6, 1).translate(Math.cos(a) * r, -0.3, Math.sin(a) * r), i % 2 ? '#7d7a72' : '#94918a'));
  }
  groupe.add(fusionner(rochers));
  // Dessous de l'île, sous la surface de l'eau (pas au même niveau : sinon les deux surfaces se disputent l'affichage)
  const rive = new THREE.Mesh(new THREE.CylinderGeometry(RAYON_ILE + 2.5, RAYON_ILE + 4, 1, 48), mat('#7d7a72'));
  rive.position.y = -1.0;
  groupe.add(rive);
  for (let i = 0; i < 20; i++) groupe.add(nuage(auHasard(3, 6), 0.9).translateX(auHasard(-150, 150)).translateY(auHasard(35, 60)).translateZ(auHasard(-150, -60)));
}

// Feuilles ou pétales qui tombent en tournoyant au-dessus de l'île
function feuillesQuiTombent(groupe, animations, teintes, n) {
  const geo = new THREE.PlaneGeometry(0.16, 0.1);
  // Une feuille trop près de la caméra n'est pas dessinée (sinon elle masque tout l'écran)
  const loinDeLaCamera = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vDistance;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvDistance = -mvPosition.z;');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vDistance;')
      .replace('void main() {', 'void main() {\n  if (vDistance < 2.5) discard;');
  };
  const mats = teintes.map((c) => {
    const m = new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide });
    m.onBeforeCompile = loinDeLaCamera;
    m.customProgramCacheKey = () => 'feuille';
    return m;
  });
  const feuilles = [];
  for (let i = 0; i < n; i++) {
    const f = new THREE.Mesh(geo, mats[i % mats.length]);
    f.position.set(auHasard(-24, 24), auHasard(0, 10), auHasard(-24, 24));
    f.userData = { v: auHasard(0.4, 0.9), phase: Math.random() * 6 };
    groupe.add(f);
    feuilles.push(f);
  }
  animations.push((dt, t) => {
    for (const f of feuilles) {
      const u = f.userData;
      f.position.y -= u.v * dt;
      f.position.x += Math.sin(t + u.phase) * dt * 0.4;
      f.rotation.set(t * 1.3 + u.phase, t * 0.8, u.phase);
      if (f.position.y < 0) f.position.y = 10;
    }
  });
}
