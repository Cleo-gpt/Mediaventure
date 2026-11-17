// Coupes de cheveux du joueur, faites de mèches fines (références : références/personnages/Femmes et Hommes).
// Chaque coupe = une calotte fine qui couvre le crâne + des dizaines de mèches effilées posées par-dessus.
// Coordonnées locales de la tête : +z devant, y vers le haut, crâne ≈ ellipsoïde 0,295 × 0,24 × 0,255 centré en y 0,015.
// Les franges s'arrêtent au-dessus de y 0,075 pour ne jamais cacher les yeux.
import * as THREE from 'three';
import { geoMeche } from './personnage-details.js';
import { smin, ellipsoide, extraire } from './sculpture.js';

const RX = 0.295, RY = 0.24, RZ = 0.255, CY = 0.015;
const V = (x, y, z) => new THREE.Vector3(x, y, z);
// Point sur le crâne : az 0 = devant, +π/2 = côté +x, π = derrière ; el π/2 = sommet, 0 = tour de tête ; k = écart au crâne
const P = (az, el, k = 1.05) => V(RX * k * Math.cos(el) * Math.sin(az), CY + RY * k * Math.sin(el), RZ * k * Math.cos(el) * Math.cos(az));
const mix = (a, b, t) => a + (b - a) * t;
// Azimut équivalent à `cible` le plus proche de `az` (pour faire le tour de la tête par le bon côté)
const versAz = (az, cible) => cible + Math.PI * 2 * Math.round((az - cible) / (Math.PI * 2));
const hasard = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// Points d'accroche des ornements (baguettes, liens), utilisés aussi par personnage.js
export const ANCRES = {
  chignon: V(0, 0.25, -0.2),
  chignonBas: V(0.11, -0.07, -0.27),
  manbun: V(0, 0.29, -0.13),
  tresses: [-1, 1].map((s) => V(s * 0.3, -0.37, 0.1)),
};

const CRANE = (x, y, z) => ellipsoide(x, y, z, [0, CY, 0], [RX, RY, RZ]);

// Calotte : fine coque de cheveux sur le crâne, au-dessus de `ligne(x, z)` ; `extra` ajoute des volumes (chignon…)
function calotte(ligne, epaisseur = 0.012, extra = null) {
  const f = (x, y, z) => {
    let d = Math.max(CRANE(x, y, z) - epaisseur, ligne(x, z) - y);
    if (extra) d = smin(d, extra(x, y, z), 0.03);
    return d;
  };
  return extraire(f, [-0.36, -0.2, -0.38], [0.36, 0.33, 0.32], 0.0095);
}
// Ligne des cheveux classique : haute sur le front, basse sur la nuque, dégagée devant les oreilles
const ligneClassique = (front = -0.1, nuque = 0.26) => (x, z) => front + nuque * Math.max(0, z / RZ) ** 1.5;
// Cheveux relevés (chignons) : la calotte s'arrête plus haut sur la nuque, sous les racines des mèches
const ligneRelevee = (x, z) => -0.1 + 0.26 * Math.max(0, z / RZ) ** 1.5 + 0.11 * Math.max(0, -z / RZ);

class Coupe {
  constructor() { this.geos = []; this.n = 0; }
  // Une mèche le long des points, largeur et épaisseur données (demi-mesures), effilée vers la pointe
  meche(points, larg = 0.02, ep = 0.007, cote = null, options) {
    const m = points[Math.floor(points.length / 2)];
    const c = cote ?? (Math.hypot(m.x, m.z) > 1e-3 ? V(m.z, 0, -m.x).normalize() : V(1, 0, 0));
    this.geos.push(geoMeche(points, larg, ep, c, options));
    this.n++;
  }
  // Boucle enroulée (chignon) autour d'un centre, dans le plan (u, w)
  boucle(centre, u, w, axe, r, debut, tours, larg, ep, montee = 0) {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10, a = debut + t * tours * Math.PI * 2, rr = r * (0.75 + 0.25 * Math.sin(t * Math.PI));
      pts.push(centre.clone().addScaledVector(u, Math.cos(a) * rr).addScaledVector(w, Math.sin(a) * rr).addScaledVector(axe, montee * Math.sin(t * Math.PI)));
    }
    this.meche(pts, larg, ep, axe);
  }
  // Tresse à trois brins qui s'entrecroisent le long d'un chemin
  tresse(chemin, rayon, epaisseur) {
    const courbe = new THREE.CatmullRomCurve3(chemin);
    for (let b = 0; b < 3; b++) {
      const pts = [];
      for (let i = 0; i <= 36; i++) {
        const t = i / 36, p = courbe.getPointAt(t), T = courbe.getTangentAt(t);
        const u = V(1, 0, 0).addScaledVector(T, -T.x).normalize(), w = V().crossVectors(T, u);
        const a = t * Math.PI * 2 * 4.5 + (b * Math.PI * 2) / 3, r = rayon * (1 - 0.35 * t);
        pts.push(p.addScaledVector(u, Math.sin(a) * r).addScaledVector(w, Math.sin(2 * a) * r * 0.35));
      }
      this.meche(pts, epaisseur * (1.25 - 0.3 * b / 2), epaisseur * 0.85, V(0, 0, 1), { affiner: false, segments: 72 });
    }
  }
  // Assemble calotte + mèches en une seule géométrie (positions, normales, coordonnée le long de la mèche)
  fusionner(base) {
    const tout = [base, ...this.geos];
    let nv = 0, ni = 0;
    for (const g of tout) { nv += g.attributes.position.count; ni += g.index.count; }
    const pos = new Float32Array(nv * 3), nor = new Float32Array(nv * 3), mec = new Float32Array(nv * 2), idx = new Uint32Array(ni);
    let ov = 0, oi = 0;
    for (const g of tout) {
      pos.set(g.attributes.position.array, ov * 3);
      nor.set(g.attributes.normal.array, ov * 3);
      // x : 1 au milieu de la mèche, 0 sur ses bords (sillon sombre entre les mèches) ; y : 1 à la racine, 0 à la pointe
      const uv = g.attributes.uv;
      if (uv) for (let i = 0; i < uv.count; i++) { mec[(ov + i) * 2] = Math.abs(Math.sin(uv.getX(i) * Math.PI * 2)); mec[(ov + i) * 2 + 1] = uv.getY(i); }
      const ix = g.index.array;
      for (let i = 0; i < ix.length; i++) idx[oi + i] = ix[i] + ov;
      ov += g.attributes.position.count;
      oi += ix.length;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('meche', new THREE.BufferAttribute(mec, 2));
    g.setIndex(new THREE.BufferAttribute(idx, 1));
    return g;
  }
}

// Frange effilée : mèches fines, plus ou moins longues, qui laissent voir un peu le front
function frange(c, { n = 13, largeur = 0.62, bout = 0.3, k = 1.1, larg = 0.017, raie = null, balayage = 0, graine = 0, rideau = 0, ecart = 0.12, varie = 0.07 }) {
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), az = (t - 0.5) * 2 * largeur, h = hasard(i + graine);
    const cote = raie === null ? 0 : Math.sign(az - raie) || 1;
    const azB = az + balayage + cote * ecart * Math.abs(az - (raie ?? 0));
    c.meche([P(az * 0.35 + (raie ?? 0) * 0.6, 1.08, 1.0), P(az * 0.75, 0.82, k + 0.02), P(mix(az, azB, 0.5), 0.55, k + 0.01),
      P(azB, bout + 0.03 + varie * h + 0.06 * Math.abs(t - 0.5) + rideau * Math.max(0, 1 - Math.abs(az - (raie ?? 0)) / largeur) ** 1.5, k)], larg * (0.85 + 0.3 * h), 0.006);
  }
}
// Mèches du dessus et de l'arrière : du sommet vers le bas, jusqu'à `basArriere` (el) derrière
function couronne(c, { n = 26, azMin = 0.75, elBout = (az) => -0.1, k = 1.08, larg = 0.03, evasement = 0.04, graine = 10, sommet = 1.25 }) {
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), az = azMin + t * (Math.PI * 2 - 2 * azMin), h = hasard(i + graine);
    const b = elBout(az, h);
    c.meche([P(az * 0.5 + Math.PI * 0.5 * (az > Math.PI ? 1 : -1) * 0, sommet, 0.98), P(az, 0.8, k + 0.02), P(az, mix(0.8, b, 0.6), k + 0.03),
      P(az, b, k + evasement)], larg * (0.85 + 0.3 * h), 0.008);
  }
}

// ---------------------------------------------------------------- Coupes
const COUPES = {
  // Frange légère, mèches le long du visage et deux tresses à trois brins devant les épaules (réf. Femmes)
  tresses() {
    const c = new Coupe();
    const base = calotte(ligneClassique(-0.12, 0.27));
    frange(c, { n: 15, largeur: 0.6, bout: 0.29, larg: 0.016 });
    for (const s of [-1, 1]) {
      // mèches fines qui encadrent le visage jusqu'aux joues
      for (const [d, l] of [[0, 0.012], [0.08, 0.01]]) {
        c.meche([P(s * (0.62 + d), 0.9, 1.0), P(s * (0.78 + d), 0.5, 1.1), P(s * (0.92 + d), 0.1, 1.1), V(s * (0.275 + d * 0.1), -0.13 - d, 0.135 - d)], l, 0.005);
      }
      // cheveux du côté et de l'arrière tirés vers la naissance de la tresse, derrière l'oreille
      const B = V(s * 0.255, -0.08, -0.07);
      for (let i = 0; i < 9; i++) {
        const az = s * (1.0 + (i / 8) * (Math.PI - 1.0)), h = hasard(i * 3 + (s > 0 ? 7 : 0));
        c.meche([P(az * 0.4, 1.3, 0.98), P(az, 0.75, 1.1), P(mix(az, s * 1.75, 0.5), 0.1, 1.12 + h * 0.02), B], 0.034, 0.009);
      }
      c.tresse([B, V(s * 0.29, -0.16, 0.0), V(s * 0.3, -0.27, 0.07), ANCRES.tresses[s > 0 ? 1 : 0]], 0.018, 0.017);
      // petite houppe sous le lien
      const A = ANCRES.tresses[s > 0 ? 1 : 0];
      for (let j = 0; j < 4; j++) c.meche([A, A.clone().add(V(s * (j - 1.5) * 0.008, -0.03, 0.004 * j)), A.clone().add(V(s * (j - 1.5) * 0.016, -0.07, 0.01))], 0.01, 0.005);
    }
    return c.fusionner(base);
  },

  // Chignon haut un peu flou, cheveux tirés vers le haut de l'arrière du crâne, deux mèches libres aux tempes (réf. Femmes)
  chignon() {
    const c = new Coupe(), K = ANCRES.chignon;
    const base = calotte(ligneRelevee, 0.012, (x, y, z) => ellipsoide(x, y, z, [K.x, K.y, K.z], [0.075, 0.065, 0.07]));
    for (let i = 0; i < 34; i++) {
      const t = i / 33, az = -Math.PI + t * Math.PI * 2, h = hasard(i);
      const devant = Math.abs(az) < 0.95;
      const racine = devant ? P(az, 0.56 - 0.14 * Math.abs(az), 0.97) : P(az, -0.12 - 0.04 * Math.cos(az), 0.97);
      const milieu = devant ? P(az * 0.85, 0.85, 1.09) : P(az, 0.4, 1.1);
      const vers = K.clone().add(V(Math.sin(az) * 0.05, 0.0, Math.cos(az) * 0.05));
      c.meche([racine, milieu, P(az * 0.6, mix(1.0, 1.15, h), 1.09), vers], 0.03, 0.008);
    }
    // le chignon : boucles enroulées
    const axe = V(0, 0.55, -0.83).normalize(), u = V(1, 0, 0), w = V().crossVectors(axe, u);
    for (let j = 0; j < 6; j++) c.boucle(K.clone().addScaledVector(axe, 0.01 + 0.008 * j), u, w, axe, 0.07 - j * 0.006, j * 1.1, 0.9, 0.028, 0.017, 0.02);
    // quelques mèches qui s'échappent du chignon
    for (let j = 0; j < 3; j++) c.meche([K.clone().addScaledVector(axe, 0.03), K.clone().add(V((j - 1) * 0.06, 0.06, -0.06)), K.clone().add(V((j - 1) * 0.11, 0.02, -0.1))], 0.008, 0.004);
    for (const s of [-1, 1]) {
      c.meche([P(s * 0.75, 0.6, 1.0), P(s * 0.92, 0.3, 1.1), V(s * 0.285, -0.02, 0.13), V(s * 0.27, -0.16, 0.15)], 0.011, 0.005);
    }
    return c.fusionner(base);
  },

  // Chignon bas sur le côté, cheveux qui ondulent vers la nuque, mèches souples sur le front (réf. Femmes)
  chignonBas() {
    const c = new Coupe(), K = ANCRES.chignonBas, azK = Math.atan2(K.x, K.z);
    const base = calotte(ligneRelevee, 0.012, (x, y, z) => ellipsoide(x, y, z, [K.x, K.y, K.z], [0.08, 0.07, 0.065]));
    for (let i = 0; i < 34; i++) {
      const t = i / 33, az = -Math.PI + t * Math.PI * 2, h = hasard(i + 40);
      const cible = versAz(az, azK), vers = K.clone().add(V(Math.sin(az) * 0.04, Math.cos(az) * 0.025, 0.035));
      if (Math.abs(az) < 1.0) {
        // devant : les cheveux remontent sur le crâne puis redescendent vers le chignon par l'arrière
        c.meche([P(az * 0.9, 0.56 - 0.14 * Math.abs(az), 0.97), P(az * 0.95, 0.9, 1.09), P(mix(az, cible, 0.5), 0.75 - 0.1 * h, 1.1),
          P(mix(az, cible, 0.85), 0.2, 1.1), vers], 0.032, 0.008);
      } else {
        c.meche([P(az, -0.12 - 0.04 * Math.cos(az), 0.97), P(mix(az, cible, 0.35), 0.15 + 0.1 * h, 1.1), P(mix(az, cible, 0.75), 0.02, 1.1), vers], 0.032, 0.008);
      }
    }
    // sommet et arrière du crâne : mèches qui descendent du haut de la tête jusqu'au chignon
    for (let i = 0; i < 12; i++) {
      const az = Math.PI * 0.55 + (i / 11) * Math.PI * 0.9 * 1.0 + (i % 2) * 0.05, cible = versAz(az, azK);
      c.meche([P(az * 0.3, 1.35, 0.97), P(az, 0.95, 1.1), P(mix(az, cible, 0.5), 0.45, 1.11), K.clone().add(V(0, 0.04, 0.03))], 0.034, 0.008);
    }
    const axe = V(0.25, -0.1, -1).normalize(), u = V(0, 1, 0).addScaledVector(axe, -axe.y).normalize(), w = V().crossVectors(axe, u);
    for (let j = 0; j < 6; j++) c.boucle(K.clone().addScaledVector(axe, 0.008 * j), u, w, axe, 0.075 - j * 0.007, j * 1.2, 0.95, 0.03, 0.018, 0.018);
    // mèches souples et ondulées qui encadrent le visage
    for (const s of [-1, 1]) for (const d of [0, 0.1]) {
      c.meche([P(s * (0.5 + d), 0.62, 0.97), P(s * (0.72 + d), 0.4, 1.12), V(s * 0.29, 0.02, 0.12 - d * 0.4), V(s * 0.3, -0.1, 0.13 - d * 0.4), V(s * 0.275, -0.2, 0.15 - d * 0.4)], 0.01, 0.004);
    }
    return c.fusionner(base);
  },

  // Wolf cut : couches effilées en pointes, frange longue et irrégulière, nuque longue qui rebique (réf. Hommes)
  wolf() {
    const c = new Coupe();
    const base = calotte(ligneClassique(-0.1, 0.24), 0.014);
    frange(c, { n: 12, largeur: 0.7, bout: 0.24, larg: 0.024, raie: 0.25, graine: 21, ecart: 0.3, varie: 0.28, balayage: -0.05 });
    // grandes mèches en couches tout autour : courtes devant les oreilles, longues sur la nuque
    for (const [n, elH, kk, graine] of [[22, 0.9, 1.1, 30], [18, 0.5, 1.15, 60]]) {
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1), az = 0.78 + t * (Math.PI * 2 - 1.56), h = hasard(i + graine);
        const dos = Math.max(0, -Math.cos(az));
        const bout = dos > 0.5 ? -0.85 - 0.25 * h : -0.15 - 0.6 * dos - 0.1 * h;
        const pointe = P(az + (h - 0.5) * 0.25, bout, kk + 0.1 + 0.08 * h);
        if (bout < -0.6) pointe.y = -0.2 - 0.12 * h; // la nuque tombe tout droit puis rebique
        c.meche([P(az, elH + 0.25, 1.0), P(az, elH * 0.6, kk + 0.02), P(az, mix(elH * 0.6, Math.max(bout, -0.5), 0.6), kk + 0.06), pointe], 0.03 * (0.8 + 0.4 * h), 0.008);
      }
    }
    // épis au sommet
    for (let j = 0; j < 7; j++) {
      const a = (j / 7) * Math.PI * 2;
      c.meche([P(0, 1.45, 1.0), P(-2.6 + Math.sin(a) * 0.5, 1.2 + Math.cos(a) * 0.1, 1.14), P(-2.6 + Math.sin(a) * 0.9, 0.95, 1.18)], 0.026, 0.008);
    }
    return c.fusionner(base);
  },

  // Chignon samouraï moderne : côtés dégagés, cheveux tirés en arrière vers un petit chignon haut (réf. Hommes)
  manbun() {
    const c = new Coupe(), K = ANCRES.manbun;
    // la calotte ne couvre que le dessus : les côtés restent courts (le pelage se voit)
    const base = calotte((x, z) => 0.1 + 0.08 * Math.max(0, z / RZ) - 0.06 * Math.max(0, -z / RZ), 0.01,
      (x, y, z) => ellipsoide(x, y, z, [K.x, K.y, K.z], [0.05, 0.045, 0.05]));
    for (let i = 0; i < 26; i++) {
      const t = i / 25, az = -Math.PI + t * Math.PI * 2, h = hasard(i + 80);
      const devant = Math.abs(az) < 1.0;
      const racine = devant ? P(az * 0.95, 0.55, 1.0) : P(az, 0.45 - 0.12 * Math.max(0, -Math.cos(az)), 1.01);
      c.meche([racine, P(az * 0.8, devant ? 0.95 : 0.75, 1.08 + 0.02 * h), K.clone().add(V(Math.sin(az) * 0.03, -0.01, Math.cos(az) * 0.03))], 0.028, 0.008);
    }
    const axe = V(0, 1, -0.3).normalize(), u = V(1, 0, 0), w = V().crossVectors(axe, u);
    for (let j = 0; j < 5; j++) c.boucle(K.clone().addScaledVector(axe, 0.02 + 0.008 * j), u, w, axe, 0.05 - j * 0.005, j * 1.3, 0.9, 0.022, 0.015, 0.015);
    // petite queue qui dépasse du chignon
    for (let j = 0; j < 3; j++) c.meche([K.clone().addScaledVector(axe, 0.05), K.clone().add(V((j - 1) * 0.02, 0.06, -0.08)), K.clone().add(V((j - 1) * 0.04, 0.0, -0.13))], 0.014, 0.006);
    return c.fusionner(base);
  },

  // Coupe coréenne : volume souple, frange rideau séparée au milieu, nuque courte (réf. Hommes)
  coreen() {
    const c = new Coupe();
    const base = calotte(ligneClassique(-0.1, 0.25), 0.016);
    frange(c, { n: 16, largeur: 0.74, bout: 0.25, k: 1.13, larg: 0.024, raie: 0.0, graine: 90, rideau: 0.75, ecart: 0.5 });
    couronne(c, {
      n: 28, azMin: 0.72, k: 1.12, larg: 0.034, evasement: 0.06, graine: 100,
      elBout: (az) => { const dos = Math.max(0, -Math.cos(az)); return -0.05 - 0.4 * dos; },
    });
    // mèches qui couvrent le haut des oreilles
    for (const s of [-1, 1]) for (let j = 0; j < 3; j++) {
      const az = s * (0.85 + j * 0.22);
      c.meche([P(az, 0.85, 1.0), P(az, 0.4, 1.14), P(az + s * 0.08, 0.0, 1.13), P(az + s * 0.1, -0.15, 1.1)], 0.026, 0.008);
    }
    return c.fusionner(base);
  },
};

export const COUPES_MECHES = Object.keys(COUPES);
export const coupeMeches = (id) => COUPES[id]?.();
