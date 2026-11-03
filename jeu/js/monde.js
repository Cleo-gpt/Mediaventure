// Construction des îles / biomes. Chaque niveau suit la même disposition :
// arrivée (sud) → mini-jeu au milieu → arène du boss (nord) → portail (tout au nord).
import * as THREE from 'three';
import { PALETTE } from './niveaux.js';

export const RAYON_ILE = 22;
export const ARENE = { centre: new THREE.Vector3(0, 0, -10), cases: 9, taille: 1.2 };
export const POS = {
  depart: new THREE.Vector3(0, 0, 19.5),
  pnj: new THREE.Vector3(0, 0, 4),
  portail: new THREE.Vector3(0, 0, -19),
};

const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...o });

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
  soleil.shadow.mapSize.set(2048, 2048);
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
  const decor = { bambou: decorBambou, ciel: decorCiel }[niveau.biome] ?? decorGenerique;
  decor({ groupe, scene, niveau, colliders, animations, chargeurTexture });

  return {
    groupe, colliders, animations, portail,
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

function koi() {
  const g = new THREE.Group();
  const blanc = mat('#fbf7f0', { roughness: 0.4 });
  const orange = mat(PALETTE.corail, { roughness: 0.4 });
  const corps = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), blanc);
  corps.scale.set(0.55, 0.5, 1.4);
  const tache = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), orange);
  tache.scale.set(0.5, 0.42, 0.7);
  tache.position.set(0, 0.05, 0.12);
  const queue = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.35, 4), orange);
  queue.rotation.x = -Math.PI / 2;
  queue.scale.x = 0.25;
  queue.position.z = -0.5;
  g.add(corps, tache, queue);
  g.userData.queue = queue;
  return g;
}

// ------------------------------------------------------------------ Sas : forêt de bambous
function decorBambou({ groupe, colliders, animations }) {
  // Sol extérieur (la forêt continue au-delà de l'île)
  const foret = new THREE.Mesh(new THREE.CircleGeometry(160, 48), mat('#6e9c5c'));
  foret.rotation.x = -Math.PI / 2;
  foret.position.y = -0.05;
  foret.receiveShadow = true;
  groupe.add(foret);

  const vert = [mat('#7fb069'), mat('#94c27a'), mat('#6a9a58')];
  const noeud = mat('#5d8a4c');
  const tige = new THREE.CylinderGeometry(0.12, 0.14, 1, 8);
  const anneau = new THREE.CylinderGeometry(0.15, 0.15, 0.06, 8);
  const feuilles = mat('#8cc06e', { side: THREE.DoubleSide });
  const feuille = new THREE.ConeGeometry(0.5, 1.6, 4);

  const bambou = (x, z) => {
    const h = 9 + Math.random() * 7;
    const b = new THREE.Group();
    const t = new THREE.Mesh(tige, vert[Math.floor(Math.random() * 3)]);
    t.scale.y = h;
    t.position.y = h / 2;
    b.add(t);
    for (let y = 1.2; y < h; y += 1.4) {
      const a = new THREE.Mesh(anneau, noeud);
      a.position.y = y;
      b.add(a);
    }
    for (let i = 0; i < 4; i++) {
      const f = new THREE.Mesh(feuille, feuilles);
      f.position.set(0, h - i * 1.2, 0);
      f.rotation.set(1.2, Math.random() * 6.28, 0);
      f.translateY(0.7);
      b.add(f);
    }
    b.position.set(x, 0, z);
    b.rotation.z = (Math.random() - 0.5) * 0.08;
    b.userData.phase = Math.random() * 6;
    groupe.add(ombre(b));
    return b;
  };

  // Mur de bambous autour de la clairière + bosquets intérieurs
  const balancent = [];
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = RAYON_ILE + 1 + Math.random() * 26;
    balancent.push(bambou(Math.cos(a) * r, Math.sin(a) * r));
  }
  for (const [cx, cz] of [[-11, 6], [12, 4], [-13, -6], [13, -13], [-9, 16], [10, 15]]) {
    for (let i = 0; i < 5; i++) {
      const x = cx + (Math.random() - 0.5) * 3, z = cz + (Math.random() - 0.5) * 3;
      balancent.push(bambou(x, z));
      colliders.push({ x, z, r: 0.35 });
    }
  }
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
function decorCiel({ groupe, niveau, colliders, animations, chargeurTexture }) {
  // Fond : le mont Fuji, répété en miroir sur 360° pour ne pas avoir de raccord visible
  if (niveau.fond) {
    const tex = chargeurTexture.load(niveau.fond);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.MirroredRepeatWrapping;
    tex.repeat.x = 3;
    const R = 300, H = ((2 * Math.PI * R) / 3) * 0.75;
    const ciel = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 96, 1, true),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false }));
    ciel.position.y = H * 0.12 - 4;
    // u = 0,5 (centre de l'image) tombe à θ = 180°, soit -z : le Fuji fait face à l'arrivée
    groupe.add(ciel);
  }
  const merNuages = new THREE.Mesh(new THREE.CircleGeometry(300, 64), new THREE.MeshBasicMaterial({ color: '#e9eef5', fog: false }));
  merNuages.rotation.x = -Math.PI / 2;
  merNuages.position.y = -60;
  groupe.add(merNuages);

  // Dessous rocheux de l'île
  const roche = new THREE.Mesh(new THREE.ConeGeometry(RAYON_ILE + 1.5, 16, 24, 3), mat('#6f7f98', { flatShading: true }));
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
    const dessous = new THREE.Mesh(new THREE.ConeGeometry(r * 0.9, r * 1.8, 10), mat('#6f7f98', { flatShading: true }));
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
      const k = koi();
      k.userData = { ...k.userData, bloc: b, rayon: s * 0.28, vitesse: 0.6 + Math.random() * 0.5, phase: i * Math.PI, dy: (i - 0.5) * s * 0.25 };
      groupe.add(k);
      kois.push(k);
    }
  }
  // Les blocs posés sur l'île bloquent le passage
  colliders.push({ x: 13, z: 2, r: 3.3 }, { x: -14, z: -4, r: 2.8 });

  // Carpes qui nagent dans le ciel autour de l'île
  for (let i = 0; i < 6; i++) {
    const k = koi();
    k.scale.setScalar(2.2);
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
      u.queue.rotation.y = Math.sin(t * 8 + u.phase) * 0.5;
    }
  });

  // Lanternes flottantes
  const lanterne = mat(PALETTE.rosePale, { emissive: PALETTE.rose, emissiveIntensity: 0.7 });
  for (let i = 0; i < 14; i++) {
    const l = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 10), lanterne);
    const a = (i / 14) * Math.PI * 2;
    l.position.set(Math.cos(a) * 19, 3 + (i % 3), Math.sin(a) * 19);
    l.userData = { y: l.position.y, phase: i };
    groupe.add(l);
    petites.push(l);
  }
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
