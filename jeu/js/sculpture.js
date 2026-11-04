// Sculpture par champs de distance (SDF) : formes qui se fondent les unes dans les autres,
// puis extraction d'une surface lisse (« surface nets ») et pondération pour le squelette.
import * as THREE from 'three';

// ---------------------------------------------------------------- Primitives (distances signées)
export const smin = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
};

// Ellipsoïde (approximation d'Inigo Quilez)
export function ellipsoide(px, py, pz, c, r) {
  const x = (px - c[0]) / r[0], y = (py - c[1]) / r[1], z = (pz - c[2]) / r[2];
  const k0 = Math.hypot(x, y, z);
  const k1 = Math.hypot(x / r[0], y / r[1], z / r[2]);
  return k1 === 0 ? -Math.min(...r) : (k0 * (k0 - 1)) / k1;
}

// Cône arrondi entre deux sphères (a, r1) → (b, r2)
export function cone(px, py, pz, a, b, r1, r2) {
  const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
  const l2 = bax * bax + bay * bay + baz * baz;
  const rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
  const pax = px - a[0], pay = py - a[1], paz = pz - a[2];
  const y = pax * bax + pay * bay + paz * baz;
  const z = y - l2;
  const cx = pax * l2 - bax * y, cy = pay * l2 - bay * y, cz = paz * l2 - baz * y;
  const x2 = cx * cx + cy * cy + cz * cz, y2 = y * y * l2, z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}

// Position (0 → 1) d'un point le long du segment a → b
export function le_long(px, py, pz, a, b) {
  const bx = b[0] - a[0], by = b[1] - a[1], bz = b[2] - a[2];
  return ((px - a[0]) * bx + (py - a[1]) * by + (pz - a[2]) * bz) / (bx * bx + by * by + bz * bz);
}

// ---------------------------------------------------------------- Surface nets
// f(x, y, z) < 0 à l'intérieur. Renvoie une BufferGeometry indexée, normales issues du gradient.
export function extraire(f, min, max, h) {
  const nx = Math.ceil((max[0] - min[0]) / h) + 1, ny = Math.ceil((max[1] - min[1]) / h) + 1, nz = Math.ceil((max[2] - min[2]) / h) + 1;
  const v = new Float32Array(nx * ny * nz);
  const I = (i, j, k) => i + nx * (j + ny * k);
  for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    v[I(i, j, k)] = f(min[0] + i * h, min[1] + j * h, min[2] + k * h);
  }
  const cx = nx - 1, cy = ny - 1, cz = nz - 1;
  const C = (i, j, k) => i + cx * (j + cy * k);
  const cellule = new Int32Array(cx * cy * cz).fill(-1);
  const pos = [];
  const coins = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
  const aretes = [];
  for (let a = 0; a < 8; a++) for (const bit of [1, 2, 4]) if (!(a & bit)) aretes.push([a, a | bit]);
  const val = new Float32Array(8);
  for (let k = 0; k < cz; k++) for (let j = 0; j < cy; j++) for (let i = 0; i < cx; i++) {
    let masque = 0;
    for (let c = 0; c < 8; c++) {
      val[c] = v[I(i + coins[c][0], j + coins[c][1], k + coins[c][2])];
      if (val[c] < 0) masque |= 1 << c;
    }
    if (masque === 0 || masque === 255) continue;
    let sx = 0, sy = 0, sz = 0, n = 0;
    for (const [a, b] of aretes) {
      if ((val[a] < 0) === (val[b] < 0)) continue;
      const t = val[a] / (val[a] - val[b]);
      sx += coins[a][0] + t * (coins[b][0] - coins[a][0]);
      sy += coins[a][1] + t * (coins[b][1] - coins[a][1]);
      sz += coins[a][2] + t * (coins[b][2] - coins[a][2]);
      n++;
    }
    cellule[C(i, j, k)] = pos.length / 3;
    pos.push(min[0] + (i + sx / n) * h, min[1] + (j + sy / n) * h, min[2] + (k + sz / n) * h);
  }
  // Normales par le gradient du champ
  const nor = new Float32Array(pos.length);
  const e = h * 0.5;
  for (let p = 0; p < pos.length; p += 3) {
    const x = pos[p], y = pos[p + 1], z = pos[p + 2];
    const gx = f(x + e, y, z) - f(x - e, y, z), gy = f(x, y + e, z) - f(x, y - e, z), gz = f(x, y, z + e) - f(x, y, z - e);
    const l = Math.hypot(gx, gy, gz) || 1;
    nor[p] = gx / l; nor[p + 1] = gy / l; nor[p + 2] = gz / l;
  }
  // Un quad par arête de grille qui traverse la surface
  const idx = [];
  const quad = (a, b, c, d) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    // Orientation : la normale du quad doit suivre le gradient
    const ux = pos[b * 3] - pos[a * 3], uy = pos[b * 3 + 1] - pos[a * 3 + 1], uz = pos[b * 3 + 2] - pos[a * 3 + 2];
    const wx = pos[c * 3] - pos[a * 3], wy = pos[c * 3 + 1] - pos[a * 3 + 1], wz = pos[c * 3 + 2] - pos[a * 3 + 2];
    const fx = uy * wz - uz * wy, fy = uz * wx - ux * wz, fz = ux * wy - uy * wx;
    const ok = fx * (nor[a * 3] + nor[c * 3]) + fy * (nor[a * 3 + 1] + nor[c * 3 + 1]) + fz * (nor[a * 3 + 2] + nor[c * 3 + 2]) > 0;
    if (ok) idx.push(a, b, c, a, c, d); else idx.push(a, c, b, a, d, c);
  };
  for (let k = 1; k < cz; k++) for (let j = 1; j < cy; j++) for (let i = 0; i < cx; i++) {
    if ((v[I(i, j, k)] < 0) !== (v[I(i + 1, j, k)] < 0)) quad(cellule[C(i, j - 1, k - 1)], cellule[C(i, j, k - 1)], cellule[C(i, j, k)], cellule[C(i, j - 1, k)]);
  }
  for (let k = 1; k < cz; k++) for (let j = 0; j < cy; j++) for (let i = 1; i < cx; i++) {
    if ((v[I(i, j, k)] < 0) !== (v[I(i, j + 1, k)] < 0)) quad(cellule[C(i - 1, j, k - 1)], cellule[C(i, j, k - 1)], cellule[C(i, j, k)], cellule[C(i - 1, j, k)]);
  }
  for (let k = 0; k < cz; k++) for (let j = 1; j < cy; j++) for (let i = 1; i < cx; i++) {
    if ((v[I(i, j, k)] < 0) !== (v[I(i, j, k + 1)] < 0)) quad(cellule[C(i - 1, j - 1, k)], cellule[C(i, j - 1, k)], cellule[C(i, j, k)], cellule[C(i - 1, j, k)]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}

// ---------------------------------------------------------------- Pondération des os
// segments : [{ os, a, b, r }]. Chaque sommet suit les os les plus proches (mélange doux aux articulations).
export function ponderer(geo, segments, { douceur = 0.014, surcharge } = {}) {
  const p = geo.attributes.position;
  const n = p.count;
  const indices = new Uint16Array(n * 4), poids = new Float32Array(n * 4);
  const d = new Float32Array(segments.length);
  for (let v = 0; v < n; v++) {
    const x = p.getX(v), y = p.getY(v), z = p.getZ(v);
    let dmin = Infinity;
    segments.forEach((s, i) => {
      const t = Math.min(1, Math.max(0, le_long(x, y, z, s.a, s.b)));
      const qx = s.a[0] + t * (s.b[0] - s.a[0]), qy = s.a[1] + t * (s.b[1] - s.a[1]), qz = s.a[2] + t * (s.b[2] - s.a[2]);
      d[i] = Math.hypot(x - qx, y - qy, z - qz) - s.r;
      dmin = Math.min(dmin, d[i]);
    });
    const parOs = new Map();
    segments.forEach((s, i) => {
      const w = Math.exp(-(d[i] - dmin) / douceur);
      if (w > 1e-3) parOs.set(s.os, (parOs.get(s.os) ?? 0) + w);
    });
    let liste = [...parOs.entries()];
    if (surcharge) liste = surcharge(x, y, z, liste);
    liste.sort((a, b) => b[1] - a[1]);
    liste = liste.slice(0, 4);
    const total = liste.reduce((s, e) => s + e[1], 0);
    liste.forEach(([os, w], k) => { indices[v * 4 + k] = os; poids[v * 4 + k] = w / total; });
  }
  geo.setAttribute('skinIndex', new THREE.BufferAttribute(indices, 4));
  geo.setAttribute('skinWeight', new THREE.BufferAttribute(poids, 4));
  return geo;
}

// UV cylindriques autour de l'axe vertical (pour les motifs de tissu)
export function uvCylindriques(geo, echelleV = 1.6) {
  const p = geo.attributes.position;
  const uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    uv[i * 2] = Math.atan2(p.getX(i), p.getZ(i)) / (Math.PI * 2) + 0.5;
    uv[i * 2 + 1] = p.getY(i) * echelleV;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geo;
}
