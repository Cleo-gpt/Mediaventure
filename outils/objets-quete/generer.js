// Génère les objets de quête de Médiaventure en .glb (échelle réelle, en mètres, posés sur y = 0).
// Usage : npm install && npm run build  → fichiers écrits dans /objets-quete
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// GLTFExporter utilise FileReader, absent de Node.
globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => { this.result = buf; this.onloadend?.(); });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type};base64,${Buffer.from(buf).toString('base64')}`;
      this.onloadend?.();
    });
  }
};

const SORTIE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../objets-quete');

// Palette de la charte graphique PO 2026
const C = {
  corail: '#ff696a', rose: '#f8a0ab', rosePale: '#f5cacc',
  bleu: '#9bb3d6', creme: '#F1E6D0', marine: '#243447',
};

const mat = (name, color, o = {}) =>
  new THREE.MeshStandardMaterial({ name, color, roughness: 0.55, metalness: 0, ...o });

function mesh(name, geo, material, pos = [0, 0, 0], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, material);
  m.name = name;
  m.position.set(...pos);
  m.rotation.set(...rot);
  return m;
}

// Pose l'objet au sol et le centre en x/z, comme la bouteille Gaïa.
function poser(group) {
  const box = new THREE.Box3().setFromObject(group);
  const c = box.getCenter(new THREE.Vector3());
  const racine = new THREE.Group();
  racine.name = group.name;
  group.name += '_modele';
  group.position.set(-c.x, -box.min.y, -c.z);
  racine.add(group);
  return racine;
}

// ---------------------------------------------------------------- Sas : la clé
function cle() {
  const g = new THREE.Group(); g.name = 'Cle_Sas';
  const or = mat('Or', '#f0c46a', { metalness: 0.55, roughness: 0.3 });
  const rose = mat('Sakura', C.rose, { roughness: 0.4 });
  const coeur = mat('Coeur_fleur', C.corail, { roughness: 0.4 });
  const cordon = mat('Cordon', C.corail, { roughness: 0.8 });

  // Anneau + fleur de sakura au centre
  g.add(mesh('Anneau', new THREE.TorusGeometry(0.018, 0.0035, 16, 48), or, [0, 0.075, 0]));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.PI / 2;
    const p = mesh(`Petale_${i + 1}`, new THREE.SphereGeometry(0.0062, 16, 12), rose,
      [Math.cos(a) * 0.0075, 0.075 + Math.sin(a) * 0.0075, 0]);
    p.scale.set(1, 1, 0.35);
    g.add(p);
  }
  g.add(mesh('Coeur', new THREE.SphereGeometry(0.0035, 12, 10), coeur, [0, 0.075, 0.001]));

  // Tige et dents
  g.add(mesh('Tige', new THREE.CylinderGeometry(0.0028, 0.0028, 0.07, 20), or, [0, 0.022, 0]));
  g.add(mesh('Bague', new THREE.TorusGeometry(0.0038, 0.0012, 10, 24), or, [0, 0.054, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh('Dent_1', new THREE.BoxGeometry(0.012, 0.004, 0.0025), or, [0.007, -0.008, 0]));
  g.add(mesh('Dent_2', new THREE.BoxGeometry(0.008, 0.004, 0.0025), or, [0.005, 0.0, 0]));
  g.add(mesh('Dent_3', new THREE.BoxGeometry(0.004, 0.0035, 0.0025), or, [0.009, -0.004, 0]));

  // Pompon
  g.add(mesh('Cordon', new THREE.CylinderGeometry(0.0012, 0.0012, 0.02, 8), cordon, [0, 0.102, 0]));
  g.add(mesh('Pompon', new THREE.ConeGeometry(0.005, 0.022, 16, 1, true), cordon, [0, 0.12, 0], [Math.PI, 0, 0]));
  return g;
}

// -------------------------------------------- Multimédia : caméra + micro + haut-parleur
function camera() {
  const g = new THREE.Group(); g.name = 'Camera_Multimedia';
  const noir = mat('Boitier', '#1d1f24', { roughness: 0.7 });
  const noirMat = mat('Caoutchouc', '#121316', { roughness: 0.95 });
  const metal = mat('Metal', '#9aa0a8', { metalness: 0.5, roughness: 0.35 });
  const verre = new THREE.MeshPhysicalMaterial({
    name: 'Lentille', color: '#2b3e66', roughness: 0.05, metalness: 0.2, clearcoat: 1,
  });
  const mousse = mat('Mousse_micro', C.marine, { roughness: 1 });
  const accent = mat('Accent', C.corail, { roughness: 0.4 });
  const grille = mat('Grille_hp', '#3a3d44', { metalness: 0.6, roughness: 0.5 });

  // Boîtier (lentille dirigée vers +z)
  g.add(mesh('Boitier', new RoundedBoxGeometry(0.13, 0.085, 0.06, 4, 0.012), noir, [0, 0.0425, 0]));
  g.add(mesh('Prisme', new RoundedBoxGeometry(0.045, 0.03, 0.045, 3, 0.008), noir, [0, 0.092, 0.002]));
  g.add(mesh('Poignee', new RoundedBoxGeometry(0.03, 0.08, 0.03, 3, 0.012), noirMat, [0.055, 0.042, 0.03]));
  g.add(mesh('Declencheur', new THREE.CylinderGeometry(0.006, 0.006, 0.004, 20), metal, [0.055, 0.087, 0.03]));
  g.add(mesh('Molette', new THREE.CylinderGeometry(0.011, 0.011, 0.007, 24), noirMat, [-0.045, 0.089, 0]));

  // Objectif
  const rotZ = [Math.PI / 2, 0, 0];
  g.add(mesh('Monture', new THREE.CylinderGeometry(0.028, 0.028, 0.012, 40), metal, [0, 0.04, 0.036], rotZ));
  g.add(mesh('Objectif', new THREE.CylinderGeometry(0.03, 0.027, 0.06, 40), noir, [0, 0.04, 0.072], rotZ));
  g.add(mesh('Bague_zoom', new THREE.CylinderGeometry(0.0315, 0.0315, 0.02, 40), noirMat, [0, 0.04, 0.07], rotZ));
  g.add(mesh('Liseré', new THREE.TorusGeometry(0.0305, 0.0012, 8, 48), accent, [0, 0.04, 0.095]));
  g.add(mesh('Lentille', new THREE.CircleGeometry(0.024, 40), verre, [0, 0.04, 0.1021]));

  // Écran arrière
  g.add(mesh('Ecran', new THREE.BoxGeometry(0.075, 0.05, 0.002), verre, [-0.012, 0.045, -0.0305]));

  // Micro canon sur griffe
  g.add(mesh('Griffe', new THREE.BoxGeometry(0.02, 0.006, 0.02), metal, [0, 0.11, 0]));
  g.add(mesh('Support', new THREE.BoxGeometry(0.03, 0.022, 0.03), noir, [0, 0.124, 0]));
  for (const z of [-0.035, 0.035]) {
    g.add(mesh(`Suspension_${z < 0 ? 'arriere' : 'avant'}`, new THREE.TorusGeometry(0.022, 0.0025, 10, 32), noir,
      [0, 0.15, z]));
  }
  g.add(mesh('Micro', new THREE.CapsuleGeometry(0.019, 0.13, 8, 24), mousse, [0, 0.15, 0.015], rotZ));

  // Haut-parleur latéral (côté gauche, -x)
  g.add(mesh('Haut_parleur', new THREE.CylinderGeometry(0.022, 0.022, 0.008, 40), noir,
    [-0.069, 0.045, 0], [0, 0, Math.PI / 2]));
  g.add(mesh('Membrane', new THREE.CircleGeometry(0.018, 40), grille, [-0.0735, 0.045, 0], [0, -Math.PI / 2, 0]));
  g.add(mesh('Cache_hp', new THREE.TorusGeometry(0.019, 0.0018, 8, 40), accent,
    [-0.0735, 0.045, 0], [0, Math.PI / 2, 0]));
  for (let i = 0; i < 3; i++) {
    g.add(mesh(`Onde_${i + 1}`, new THREE.TorusGeometry(0.006 + i * 0.005, 0.0007, 6, 32), grille,
      [-0.0738, 0.045, 0], [0, Math.PI / 2, 0]));
  }
  return g;
}

// ------------------------------------- Design : règle aussi tranchante qu'un cutter
function regleCutter() {
  const g = new THREE.Group(); g.name = 'Regle_Cutter_Design';
  const bleu = mat('Plateau', '#2f63b0', { roughness: 0.45 });
  const trait = mat('Graduations', '#dfe8f6', { roughness: 0.5 });
  const gris = mat('Guides', '#c3c7cd', { roughness: 0.4 });
  const lame = mat('Lame', '#dfe3e8', { metalness: 0.5, roughness: 0.2 });
  const poignee = mat('Poignee', '#a9aeb5', { roughness: 0.6 });
  const bouton = mat('Bouton', C.corail, { roughness: 0.35 });

  const L = 0.42, W = 0.3, H = 0.012;
  g.add(mesh('Plateau', new RoundedBoxGeometry(W, H, L, 3, 0.004), bleu, [0, H / 2, 0]));

  // Grille de format A4/A5/A6
  const y = H + 0.0003;
  for (let i = 0; i <= 6; i++) {
    g.add(mesh(`Ligne_h_${i}`, new THREE.BoxGeometry(W * 0.86, 0.0006, 0.0012), trait, [0, y, -L / 2 + 0.04 + i * 0.058]));
  }
  for (let i = 0; i <= 4; i++) {
    g.add(mesh(`Ligne_v_${i}`, new THREE.BoxGeometry(0.0012, 0.0006, L * 0.86), trait, [-W / 2 + 0.03 + i * 0.06, y, 0]));
  }
  // Règle graduée le long du bord de coupe (x = +W/2)
  for (let i = 0; i < 40; i++) {
    const long = i % 5 === 0 ? 0.012 : 0.006;
    g.add(mesh(`Grad_${i}`, new THREE.BoxGeometry(long, 0.0006, 0.0008), trait,
      [W / 2 - 0.012 - long / 2, y, -L / 2 + 0.02 + i * 0.0097]));
  }
  g.add(mesh('Guide_gauche', new RoundedBoxGeometry(0.018, 0.008, L * 0.92, 2, 0.003), gris, [-W / 2 + 0.014, H + 0.004, 0]));
  g.add(mesh('Butee', new RoundedBoxGeometry(0.11, 0.012, 0.035, 2, 0.004), gris, [0.02, H + 0.006, L / 2 - 0.08]));
  g.add(mesh('Bouton_butee', new THREE.CylinderGeometry(0.007, 0.007, 0.004, 24), bouton, [0.05, H + 0.013, L / 2 - 0.08]));

  // Bras de coupe pivotant au coin arrière droit, légèrement levé
  const bras = new THREE.Group(); bras.name = 'Bras_coupe';
  bras.position.set(W / 2 + 0.006, H + 0.012, -L / 2 + 0.01);
  bras.rotation.set(0.22, 0, 0);
  bras.add(mesh('Pivot', new THREE.CylinderGeometry(0.012, 0.012, 0.022, 24), gris, [0, 0, 0], [0, 0, Math.PI / 2]));
  bras.add(mesh('Lame', new THREE.BoxGeometry(0.004, 0.035, L * 0.95), lame, [0, 0.005, L * 0.475]));
  bras.add(mesh('Dos_lame', new THREE.BoxGeometry(0.01, 0.01, L * 0.95), bleu, [0, 0.025, L * 0.475]));
  bras.add(mesh('Poignee', new THREE.CapsuleGeometry(0.012, 0.09, 6, 20), poignee, [0, 0.03, L * 0.95 + 0.04], [Math.PI / 2, 0, 0]));
  const garde = mesh('Protection', new THREE.TorusGeometry(0.12, 0.004, 8, 48, Math.PI), gris, [-0.01, 0.03, L * 0.5], [0, Math.PI / 2, 0]);
  garde.scale.set(1, 0.45, 1);
  bras.add(garde);
  g.add(bras);
  return g;
}

// --------------------------------------------- Informatique : boîtier Raspberry Pi
function raspberry() {
  const g = new THREE.Group(); g.name = 'Raspberry_Pi_Informatique';
  const blanc = mat('Couvercle', '#f7f7f5', { roughness: 0.35 });
  const rouge = mat('Socle', C.corail, { roughness: 0.4 });
  const port = mat('Port', '#b8bec6', { metalness: 0.4, roughness: 0.35 });
  const trou = mat('Interieur', '#1b1d22', { roughness: 0.9 });
  const usb3 = mat('USB3', '#3d6fd1', { roughness: 0.5 });

  const L = 0.095, W = 0.07;
  g.add(mesh('Socle', new RoundedBoxGeometry(L, 0.014, W, 4, 0.006), rouge, [0, 0.007, 0]));
  g.add(mesh('Couvercle', new RoundedBoxGeometry(L, 0.018, W, 5, 0.008), blanc, [0, 0.022, 0]));

  // Côté +x : Ethernet + 4 USB
  const x = L / 2 - 0.0012;
  g.add(mesh('Ethernet', new THREE.BoxGeometry(0.004, 0.014, 0.016), port, [x, 0.012, -0.022]));
  g.add(mesh('Ethernet_trou', new THREE.BoxGeometry(0.001, 0.009, 0.011), trou, [x + 0.002, 0.012, -0.022]));
  [[0.0, usb3], [0.022, port]].forEach(([z, tongue], i) => {
    for (const yy of [0.008, 0.02]) {
      g.add(mesh(`USB_${i}_${yy}`, new THREE.BoxGeometry(0.004, 0.008, 0.014), port, [x, yy, z]));
      g.add(mesh(`USB_lang_${i}_${yy}`, new THREE.BoxGeometry(0.001, 0.003, 0.011), i === 0 ? usb3 : trou, [x + 0.002, yy, z]));
    }
  });

  // Côté +z : alimentation USB-C + 2 micro HDMI dans une niche
  const z = W / 2 + 0.0005;
  g.add(mesh('Niche', new RoundedBoxGeometry(0.05, 0.011, 0.002, 2, 0.0009), trou, [-0.018, 0.009, z]));
  [-0.036, -0.019, -0.006].forEach((xx, i) => {
    g.add(mesh(['USB_C', 'HDMI_0', 'HDMI_1'][i], new RoundedBoxGeometry(0.008, 0.003, 0.002, 2, 0.001), port, [xx, 0.009, z + 0.001]));
  });

  // Aérations sur le couvercle
  for (let i = 0; i < 5; i++) {
    g.add(mesh(`Aeration_${i + 1}`, new RoundedBoxGeometry(0.03, 0.001, 0.003, 1, 0.0005), trou, [-0.015, 0.0312, -0.018 + i * 0.006]));
  }
  // LED d'activité
  g.add(mesh('LED', new THREE.SphereGeometry(0.0012, 10, 8),
    mat('LED', '#7dff9a', { emissive: '#3dff6a', emissiveIntensity: 2 }), [-0.04, 0.012, z]));
  return g;
}

// --------------------------------- Marketing : parchemin aux puissantes statistiques
function parchemin() {
  const g = new THREE.Group(); g.name = 'Parchemin_Marketing';
  const papier = mat('Papier', C.creme, { roughness: 0.85, side: THREE.DoubleSide });
  const marine = mat('Bande', C.marine, { roughness: 0.6 });
  const bois = mat('Bois', '#6b4a33', { roughness: 0.7 });
  const barres = [C.bleu, C.rose, C.corail, C.corail].map((c, i) => mat(`Barre_${i + 1}`, c, { roughness: 0.5 }));
  const fleche = mat('Fleche', C.marine, { roughness: 0.4 });
  const or = mat('Or', '#f0c46a', { metalness: 0.55, roughness: 0.3 });

  const largeur = 0.22, R = 0.022;
  // Rouleau principal (axe x) + feuille déroulée vers +z
  const rouleau = (nom, z) => {
    const r = new THREE.Group(); r.name = nom;
    r.add(mesh('Papier_roule', new THREE.CylinderGeometry(R, R, largeur, 40), papier, [0, 0, 0], [0, 0, Math.PI / 2]));
    for (const s of [-1, 1]) {
      r.add(mesh('Bande', new THREE.CylinderGeometry(R + 0.0008, R + 0.0008, 0.03, 40), marine, [s * 0.07, 0, 0], [0, 0, Math.PI / 2]));
      r.add(mesh('Embout', new THREE.CylinderGeometry(0.008, 0.008, 0.02, 20), bois, [s * (largeur / 2 + 0.01), 0, 0], [0, 0, Math.PI / 2]));
      r.add(mesh('Pommeau', new THREE.SphereGeometry(0.011, 20, 14), bois, [s * (largeur / 2 + 0.024), 0, 0]));
    }
    r.position.set(0, R, z);
    return r;
  };
  g.add(rouleau('Rouleau_haut', -0.12));
  g.add(mesh('Feuille', new THREE.PlaneGeometry(largeur * 0.96, 0.24), papier, [0, 0.0015, 0], [-Math.PI / 2, 0, 0]));
  const bas = rouleau('Rouleau_bas', 0.125);
  bas.scale.setScalar(0.7);
  bas.position.y = R * 0.7;
  g.add(bas);

  // Histogramme en relief : les statistiques grimpent
  const hauteurs = [0.012, 0.022, 0.034, 0.05];
  hauteurs.forEach((h, i) => {
    g.add(mesh(`Barre_${i + 1}`, new THREE.BoxGeometry(0.026, h, 0.03), barres[i], [-0.06 + i * 0.04, 0.0015 + h / 2, 0.03]));
  });
  // Courbe de croissance + pointe de flèche
  const pts = [[-0.075, 0.02, -0.02], [-0.035, 0.03, -0.03], [0.0, 0.045, -0.025], [0.04, 0.07, -0.035], [0.075, 0.09, -0.045]]
    .map((p) => new THREE.Vector3(...p));
  const courbe = new THREE.CatmullRomCurve3(pts);
  g.add(mesh('Courbe', new THREE.TubeGeometry(courbe, 48, 0.0025, 10), fleche));
  const fin = pts.at(-1), dir = courbe.getTangent(1);
  const pointe = mesh('Pointe', new THREE.ConeGeometry(0.008, 0.02, 20), fleche, fin.toArray());
  pointe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  g.add(pointe);
  // Sceau
  g.add(mesh('Sceau', new THREE.CylinderGeometry(0.014, 0.014, 0.004, 32), mat('Sceau', C.corail, { roughness: 0.5 }), [0.075, 0.0035, 0.085]));
  g.add(mesh('Etoile', new THREE.OctahedronGeometry(0.007), or, [0.075, 0.007, 0.085]));
  return g;
}

const exporter = new GLTFExporter();
const objets = {
  'sas_cle.glb': cle,
  'multimedia_camera.glb': camera,
  'design_regle-cutter.glb': regleCutter,
  'informatique_raspberry-pi.glb': raspberry,
  'marketing_parchemin.glb': parchemin,
};

for (const [fichier, fabrique] of Object.entries(objets)) {
  const scene = new THREE.Scene();
  scene.add(poser(fabrique()));
  const glb = await exporter.parseAsync(scene, { binary: true });
  writeFileSync(path.join(SORTIE, fichier), Buffer.from(glb));
  console.log(`✓ ${fichier} (${(glb.byteLength / 1024).toFixed(0)} Ko)`);
}
