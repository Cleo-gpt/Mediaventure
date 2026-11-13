import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { NIVEAUX, OBJETS, ORDRE, PALETTE } from './niveaux.js';
import { QUESTIONS, SEUIL } from './quiz.js';
import { construireNiveau, RAYON_ILE, ARENE, POS } from './monde.js';
import { creerPersonnage, animerPersonnage, APPARENCE_DEFAUT } from './personnage.js';
import { Combat } from './combat.js';
import { epreuveVideo, epreuveDifferences, epreuveEtapes, epreuveCodeGaia } from './minijeux.js';
import { creerVestiaire } from './vestiaire.js';
import { ECRAN_TACTILE, joystick, installerCommandes, majBoutonAction } from './tactile.js';

const $ = (id) => document.getElementById(id);
const DOSSIER_OBJETS = '../objets-quete/';

// ------------------------------------------------------------------ Sauvegarde
const CLE_SAUVEGARDE = 'mediaventure';
function charger() {
  try { return JSON.parse(localStorage.getItem(CLE_SAUVEGARDE)); } catch { return null; }
}
function sauver() {
  try { localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(partie)); } catch { /* navigation privée */ }
}
let partie = charger() ?? { prenom: '', apparence: { ...APPARENCE_DEFAUT }, objets: [], niveau: 'sas' };
partie.apparence = { ...APPARENCE_DEFAUT, ...partie.apparence };

// ------------------------------------------------------------------ Rendu
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, ECRAN_TACTILE ? 1.5 : 2)); // plus léger sur téléphone
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 800);
// Décors et objets 3D intégrés (jeu/ressources.js) : le jeu marche aussi ouvert par double-clic, sans serveur
THREE.DefaultLoadingManager.setURLModifier((url) => window.RESSOURCES?.[url] ?? url);
const chargeurTexture = new THREE.TextureLoader();
const chargeurGLB = new GLTFLoader();
const horloge = new THREE.Clock();

function redimensionner() {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', redimensionner);
redimensionner();

let mode = 'creation'; // creation | exploration | dialogue | quiz | epreuve | combat | transition

// Gardien·ne du milieu de chaque île, selon son épreuve
const NOMS_PNJ = {
  quiz: 'Gardien·ne du Réseau', video: 'Projectionniste', '7-differences': 'Esprit des couleurs',
  'etapes-projet': 'Stratège de Nara', 'stand-gaia': 'Gardien·ne du stand', 'combat-final': 'Esprit du château',
};
const nomPnj = () => NOMS_PNJ[niveau.miniJeu] ?? 'Esprit du biome';
let scene = new THREE.Scene();

// ------------------------------------------------------------------ Le Sas : vestiaire sous un ciel étoilé
const sceneCreation = new THREE.Scene();
sceneCreation.background = new THREE.Color('#1b2763');
const etoilesFilantes = [];
{
  // Ciel étoilé avec voie lactée et horizon lumineux (comme le vestiaire de référence)
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 768;
  const ctx = c.getContext('2d');
  const fond = ctx.createLinearGradient(0, 0, 0, 768);
  fond.addColorStop(0, '#141d55'); fond.addColorStop(0.45, '#26399a');
  fond.addColorStop(0.62, '#4a6fd6'); fond.addColorStop(0.7, '#3352b8'); fond.addColorStop(1, '#1d2c7a');
  ctx.fillStyle = fond;
  ctx.fillRect(0, 0, 1024, 768);
  for (let i = 0; i < 12; i++) {
    const x = 60 + i * 85, y = 520 - i * 32;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 150);
    g.addColorStop(0, 'rgba(170,195,255,0.28)'); g.addColorStop(1, 'rgba(170,195,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1024, 768);
  }
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(255,250,230,${Math.random() * 0.85})`;
    const t = Math.random() < 0.1 ? 2.5 : 1.4;
    ctx.fillRect(Math.random() * 1024, Math.random() * 768, t, t);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const voile = new THREE.Mesh(new THREE.PlaneGeometry(64, 48), new THREE.MeshBasicMaterial({ map: tex }));
  voile.position.set(0, 4, -16);
  voile.rotation.x = -0.12;
  sceneCreation.add(voile);

  // Flaque de lumière sous les pieds + cercles d'eau
  const cl = document.createElement('canvas');
  cl.width = cl.height = 256;
  const cx = cl.getContext('2d');
  const halo = cx.createRadialGradient(128, 128, 0, 128, 128, 128);
  halo.addColorStop(0, 'rgba(140,200,255,0.75)'); halo.addColorStop(0.35, 'rgba(90,150,255,0.35)'); halo.addColorStop(1, 'rgba(60,100,220,0)');
  cx.fillStyle = halo;
  cx.fillRect(0, 0, 256, 256);
  const texHalo = new THREE.CanvasTexture(cl);
  const flaque = new THREE.Mesh(new THREE.CircleGeometry(3.2, 64), new THREE.MeshBasicMaterial({ map: texHalo, transparent: true, depthWrite: false }));
  flaque.rotation.x = -Math.PI / 2;
  sceneCreation.add(flaque);
  for (const [r, o] of [[0.75, 0.6], [1.1, 0.3], [1.5, 0.15]]) {
    const anneau = new THREE.Mesh(new THREE.RingGeometry(r - 0.04, r, 64),
      new THREE.MeshBasicMaterial({ color: '#bfe0ff', transparent: true, opacity: o, side: THREE.DoubleSide, depthWrite: false }));
    anneau.rotation.x = -Math.PI / 2;
    anneau.position.y = 0.01;
    sceneCreation.add(anneau);
  }

  // Petites étoiles dorées qui flottent
  const etoile = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.04 : 0.1, a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    i ? etoile.lineTo(Math.cos(a) * r, Math.sin(a) * r) : etoile.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const geoEtoile = new THREE.ShapeGeometry(etoile);
  const matEtoile = new THREE.MeshBasicMaterial({ color: '#ffd77a', side: THREE.DoubleSide });
  for (let i = 0; i < 14; i++) {
    const e = new THREE.Mesh(geoEtoile, matEtoile);
    e.position.set(-4 + Math.random() * 8, 0.3 + Math.random() * 3, -3 + Math.random() * 3);
    e.scale.setScalar(0.6 + Math.random());
    e.userData = { y: e.position.y, phase: Math.random() * 6 };
    sceneCreation.add(e);
    etoilesFilantes.push(e);
  }

  sceneCreation.add(new THREE.HemisphereLight('#dfe8ff', '#243447', 1.1));
  const d = new THREE.DirectionalLight('#fff4ea', 1.9);
  d.position.set(1.5, 4, 6);
  sceneCreation.add(d);
}
let apercu = null;
let rotationApercu = -0.35;
let chargementTermine = false; // l'écran de chargement disparaît après la première image
let rotationAuto = true; // le personnage du Sas tourne tout seul, sauf quand on le fait tourner à la main
let apercuTenu = false;
let zoomApercu = 0, zoomVoulu = 0; // 0 = en pied, 1 = gros plan sur le visage
canvas.addEventListener('wheel', (e) => {
  if (mode === 'creation') zoomVoulu = THREE.MathUtils.clamp(zoomVoulu - e.deltaY * 0.0015, 0, 1);
}, { passive: true });

function majApercu() {
  if (apercu) sceneCreation.remove(apercu);
  apercu = creerPersonnage(partie.apparence);
  apercu.rotation.y = rotationApercu;
  sceneCreation.add(apercu);
}

{
  let glisse = null;
  canvas.addEventListener('pointerdown', (e) => { if (mode === 'creation') { glisse = e.clientX; apercuTenu = true; } });
  addEventListener('pointerup', () => { glisse = null; apercuTenu = false; });
  addEventListener('pointermove', (e) => {
    if (mode !== 'creation' || glisse === null) return;
    rotationApercu += (e.clientX - glisse) * 0.01;
    glisse = e.clientX;
  });
}

const sauvegarde = charger();
if (sauvegarde && sauvegarde.niveau !== 'sas') {
  $('reprendre').hidden = false;
  $('reprendre').textContent = `Reprendre : ${NIVEAUX[sauvegarde.niveau].titre}`;
}
creerVestiaire({
  partie,
  surChangement: () => { majApercu(); sauver(); },
  surEntrer: () => {
    partie.prenom ||= 'Voyageur·se';
    partie.niveau = 'sas';
    partie.objets = [];
    sauver();
    quitterVestiaire();
    lancerNiveau('sas');
  },
  surReprendre: () => { quitterVestiaire(); lancerNiveau(partie.niveau); },
});

function quitterVestiaire() {
  $('creation').hidden = true;
  camera.clearViewOffset();
}

// ------------------------------------------------------------------ Niveau
let niveau = null;      // données
let monde = null;       // construireNiveau()
let joueur = null;
let pnj = null;
let boss = null;
let objetQuete = null;
let interactions = [];
let combat = null;
const etatNiveau = { miniJeuReussi: false, bossVaincu: false };

function etiquette(texte, couleur = PALETTE.marine) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = 'bold 44px "Zen Maru Gothic", sans-serif';
  c.width = Math.ceil(ctx.measureText(texte).width) + 48;
  c.height = 72;
  ctx.font = 'bold 44px "Zen Maru Gothic", sans-serif';
  ctx.fillStyle = 'rgba(241,230,208,0.92)';
  ctx.beginPath();
  ctx.roundRect(0, 0, c.width, c.height, 36);
  ctx.fill();
  ctx.fillStyle = couleur;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(texte, c.width / 2, c.height / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false }));
  s.scale.set(c.width / 160, c.height / 160, 1);
  s.position.y = 1.4; // au-dessus des oreilles des personnages chibi
  s.renderOrder = 10;
  return s;
}

function completerBoss(def) {
  return {
    pa: 6, pm: 3,
    apparence: { genre: 'neutre', coiffure: 'courte', cheveux: '#2a2a2e', kimono: NIVEAUX[partie.niveau].accent },
    sorts: [{ nom: 'Coup de maître', pa: 3, portee: [1, 1], degats: [8, 12] }, { nom: 'Onde', pa: 4, portee: [2, 5], degats: [6, 10] }],
    ...def,
  };
}

async function lancerNiveau(id) {
  mode = 'transition';
  await fondu(true);
  monde?.detruire();
  scene = new THREE.Scene();
  partie.niveau = id;
  sauver();
  niveau = NIVEAUX[id];
  niveau.id = id;
  niveau.boss = completerBoss(niveau.boss);
  Object.assign(etatNiveau, { miniJeuReussi: false, bossVaincu: false });
  monde = construireNiveau(scene, niveau, chargeurTexture);

  joueur = creerPersonnage(partie.apparence);
  joueur.position.copy(POS.depart);
  joueur.rotation.y = Math.PI;
  joueur.userData.vy = 0;
  scene.add(joueur);
  cam.yaw = 0; cam.pitch = 0.38; cam.dist = 8;
  cameraInstantanee = true;

  boss = creerPersonnage(niveau.boss.apparence);
  boss.scale.setScalar(1.12);
  boss.add(etiquette(niveau.boss.nom, PALETTE.corail));
  scene.add(boss);
  objetQuete = null;
  interactions = [];

  // Le PNJ du milieu de l'île (au Sas, c'est la gardienne elle-même)
  if (niveau.miniJeu === 'demo') {
    pnj = boss;
    boss.position.copy(POS.pnj);
  } else {
    pnj = creerPersonnage({ genre: 'neutre', coiffure: 'courte', kimono: PALETTE.bleu, cheveux: '#e8d2a6', accessoire: 'sacoche', katana: false });
    pnj.add(etiquette(nomPnj()));
    pnj.position.copy(POS.pnj);
    scene.add(pnj);
    boss.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, -2));
  }
  pnj.rotation.y = 0;
  boss.rotation.y = 0;
  monde.colliders.push({ objet: pnj, r: 0.6 });
  if (pnj !== boss) monde.colliders.push({ objet: boss, r: 0.6 });

  interactions.push({
    objet: pnj, rayon: 2.6,
    actif: () => !etatNiveau.miniJeuReussi,
    texte: () => `Parler à ${pnj === boss ? niveau.boss.nom : nomPnj()}`,
    action: lancerMiniJeu,
  });
  interactions.push({
    objet: boss, rayon: 2.8,
    actif: () => etatNiveau.miniJeuReussi && !etatNiveau.bossVaincu,
    texte: () => `Défier ${niveau.boss.nom}`,
    // le boss lance son défi (avec son portrait) avant le combat, s'il a une réplique
    action: () => (niveau.boss.defi ? dialogue([{ nom: niveau.boss.nom, texte: niveau.boss.defi }], lancerCombat) : lancerCombat()),
  });

  $('hud-titre').textContent = niveau.titre;
  $('hud-lieu').textContent = niveau.lieu;
  majInventaire();
  $('hud').hidden = false;
  mode = 'exploration';
  await fondu(false);
  const lignes = [{ nom: niveau.titre, texte: `${niveau.lieu}. Va au centre de l’île : le chemin commence là.` }];
  const precedent = ORDRE[ORDRE.indexOf(id) - 1];
  if (precedent && NIVEAUX[precedent]?.pvJoueur && niveau.pvJoueur > NIVEAUX[precedent].pvJoueur) {
    lignes.push({ nom: niveau.titre, texte: `Ton aventure t’a rendu·e plus fort·e : tu as maintenant ${niveau.pvJoueur} PV en combat (+${niveau.pvJoueur - NIVEAUX[precedent].pvJoueur}).` });
  }
  if (ECRAN_TACTILE && id === 'sas') {
    lignes.push({ nom: niveau.titre, texte: 'Joystick en bas à gauche pour te déplacer (pousse-le à fond pour courir), glisse l’écran pour tourner la caméra, ⤒ pour sauter.' });
  }
  dialogue(lignes);
}

function lancerMiniJeu() {
  const nomBoss = niveau.boss.nom;
  if (niveau.miniJeu === 'demo') {
    dialogue([
      { nom: nomBoss, texte: `Bienvenue dans Médiaventure, ${partie.prenom} ! Je suis la gardienne du Sas.` },
      { nom: nomBoss, texte: 'Chaque île suit le même parcours : une épreuve au milieu, un boss, un objet de quête, puis le portail.' },
      { nom: nomBoss, texte: 'Les six objets de quête sont obligatoires pour affronter le boss final. Garde-les précieusement !' },
      { nom: nomBoss, texte: 'Montre-moi ce que tu vaux : rejoins-moi dans l’arène pour un combat d’entraînement.' },
    ], () => {
      ouvrirArene();
      boss.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, -2));
    });
  } else if (niveau.miniJeu === 'quiz') {
    dialogue([
      { nom: 'Gardien·ne du Réseau', texte: `Pour atteindre ${nomBoss}, réponds à mon quiz : ${QUESTIONS.length} questions, ${SEUIL} bonnes réponses minimum.` },
    ], lancerQuiz);
  } else if (niveau.miniJeu === 'combat-final') {
    const manquants = ORDRE.slice(0, -1).filter((id) => !partie.objets.includes(id));
    if (manquants.length) {
      dialogue([{ nom: nomPnj(), texte: `Il te manque encore : ${manquants.map((id) => OBJETS[id].nom).join(', ')}.` }]);
    } else {
      dialogue([{ nom: nomPnj(), texte: 'Tu as réuni les six objets de quête. Le boss final t’attend !' }], ouvrirArene);
    }
  } else if (niveau.miniJeu === 'video') {
    epreuve('Bienvenue au cinéma des tournesols ! Choisis une vidéo dans la bibliothèque et regarde-la jusqu’au bout.',
      () => epreuveVideo(niveau.videos), `Belle séance ! ${nomBoss} t’attend dans l’arène.`, 'Reviens quand tu veux finir ta vidéo.');
  } else if (niveau.miniJeu === '7-differences') {
    epreuve('Un bon designer a l’œil : trouve les 7 différences entre ces deux paysages.',
      epreuveDifferences, `Quel regard ! ${nomBoss} t’attend dans l’arène.`, 'Reviens me voir pour réessayer.');
  } else if (niveau.miniJeu === 'etapes-projet') {
    epreuve('Un projet marketing se construit dans l’ordre. Remets ses étapes dans le bon ordre.',
      () => epreuveEtapes(niveau.etapes), `Stratégie validée ! ${nomBoss} t’attend dans l’arène.`, 'Reviens quand ton plan sera prêt.');
  } else if (niveau.miniJeu === 'stand-gaia') {
    epreuve('Passe au stand Gaïa des portes ouvertes : la vendeuse te donnera un code. Entre-le ici pour ouvrir l’arène.',
      () => epreuveCodeGaia(), `Le code est bon ! ${nomBoss} t’attend dans l’arène.`, 'Reviens avec le code du stand Gaïa.');
  }
}

// Déroulé commun : explication du gardien → épreuve → arène ouverte (ou retour plus tard)
function epreuve(intro, lancer, succes, echec) {
  dialogue([{ nom: nomPnj(), texte: intro }], async () => {
    mode = 'epreuve';
    montrerPortrait(null);
    const reussie = await lancer();
    montrerPortrait(false);
    mode = 'exploration';
    if (reussie) dialogue([{ nom: nomPnj(), texte: succes }], ouvrirArene);
    else dialogue([{ nom: nomPnj(), texte: echec }]);
  });
}

function ouvrirArene() {
  etatNiveau.miniJeuReussi = true;
  monde.ouvrirArene();
}

// ------------------------------------------------------------------ Quiz
function lancerQuiz() {
  mode = 'quiz';
  let i = 0, score = 0;
  const el = $('quiz');
  el.hidden = false;
  montrerPortrait(null);
  const afficher = () => {
    const q = QUESTIONS[i];
    $('quiz-compteur').textContent = `Question ${i + 1} / ${QUESTIONS.length} · ${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''}`;
    $('quiz-question').textContent = q.q;
    const rep = $('quiz-reponses');
    rep.innerHTML = '';
    q.r.forEach((texte, k) => {
      const b = document.createElement('button');
      b.textContent = texte;
      b.onclick = () => {
        if (rep.dataset.verrou) return;
        rep.dataset.verrou = '1';
        if (k === q.ok) score++;
        b.classList.add(k === q.ok ? 'juste' : 'faux');
        rep.children[q.ok].classList.add('juste');
        setTimeout(() => {
          delete rep.dataset.verrou;
          if (++i < QUESTIONS.length) afficher();
          else terminer();
        }, 900);
      };
      rep.append(b);
    });
  };
  const terminer = () => {
    el.hidden = true;
    montrerPortrait(false);
    mode = 'exploration';
    if (score >= SEUIL) {
      dialogue([{ nom: 'Gardien·ne du Réseau', texte: `${score} / ${QUESTIONS.length} ! L’arène de ${niveau.boss.nom} est ouverte.` }], ouvrirArene);
    } else {
      dialogue([{ nom: 'Gardien·ne du Réseau', texte: `${score} / ${QUESTIONS.length}… Il en faut ${SEUIL}. Reviens me parler pour réessayer.` }]);
    }
  };
  afficher();
}

// ------------------------------------------------------------------ Combat
function lancerCombat() {
  mode = 'combat';
  document.body.classList.add('en-combat');
  $('invite').hidden = true;
  $('aide').hidden = true;
  combat = new Combat({
    scene, camera, canvas, joueur, boss, def: niveau.boss, pvJoueur: niveau.pvJoueur, tutoriel: niveau.id === 'sas',
    onFin: (victoire) => {
      combat = null;
      document.body.classList.remove('en-combat');
      mode = 'exploration';
      $('aide').hidden = false;
      joueur.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, ARENE.cases * ARENE.taille * 0.5 + 1));
      joueur.rotation.y = Math.PI;
      cam.yaw = 0;
      if (victoire) {
        etatNiveau.bossVaincu = true;
        boss.visible = false;
        monde.colliders.splice(monde.colliders.findIndex((c) => c.objet === boss), 1);
        if (niveau.id === 'final') victoireFinale();
        else apparaitreObjet();
        dialogue([{ nom: niveau.boss.nom, texte: 'Bien joué… Prends cet objet de quête, tu l’as mérité.' }]);
      } else {
        boss.rotation.set(0, 0, 0);
        boss.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, -2));
        dialogue([{ nom: niveau.boss.nom, texte: 'Pas encore… Reprends ton souffle et défie-moi à nouveau !' }]);
      }
    },
  });
}

// ------------------------------------------------------------------ Carte des îles
// Permet d'aller directement sur n'importe quelle île (pratique aux portes ouvertes et pour tester)
function ouvrirCarte() {
  if (mode !== 'exploration') return;
  mode = 'carte';
  const liste = $('liste-iles');
  liste.innerHTML = '';
  for (const id of ORDRE) {
    const n = NIVEAUX[id];
    const b = document.createElement('button');
    b.className = `ile${id === niveau.id ? ' actuelle' : ''}`;
    const objet = OBJETS[id];
    const etat = objet ? (partie.objets.includes(id) ? `${objet.icone} obtenu` : 'objet à gagner') : 'boss final';
    b.innerHTML = `<strong>${n.titre}</strong><span>${n.lieu}</span><small>${etat}</small>`;
    b.onclick = () => { $('carte-iles').hidden = true; mode = 'exploration'; if (id !== niveau.id) lancerNiveau(id); };
    liste.append(b);
  }
  $('carte-iles').hidden = false;
}
$('ouvrir-carte').onclick = ouvrirCarte;
$('fermer-carte').onclick = () => { $('carte-iles').hidden = true; mode = 'exploration'; };

// ------------------------------------------------------------------ Fin du jeu
function victoireFinale() {
  partie.termine = true; // la partie reste terminée même si la page est rechargée, jusqu'au code staff
  sauver();
  $('obtenu-icone').textContent = '🏆';
  $('obtenu-nom').textContent = 'Médiaventure terminée !';
  $('obtenu-texte').textContent = niveau.gain;
  $('obtenu').hidden = false;
  montrerPortrait(null);
  mode = 'dialogue';
  $('obtenu-ok').onclick = () => {
    $('obtenu').hidden = true;
    $('obtenu-texte').textContent = 'Il rejoint ton inventaire, en haut à droite.';
    afficherFin();
  };
}

// Cléo félicite le joueur et l'envoie chercher sa récompense auprès du staff
function afficherFin() {
  mode = 'fin';
  montrerPortrait(false);
  $('dialogue').hidden = true;
  $('hud').hidden = true;
  $('creation').hidden = true;
  $('fin-texte').textContent = `Bravo cher·e ${partie.prenom || 'voyageur·se'} ! Vous avez fini le jeu Médiaventure. `
    + 'Pour obtenir votre récompense, faites appel à un membre du Staff des PO.';
  $('fin-jeu').hidden = false;
}

// ------------------------------------------------------------------ Nouvelle partie (staff)
// Code fixe connu du staff de la salle informatique : efface la sauvegarde et relance le jeu au Sas.
const CODE_STAFF = '7319';
let modeAvantStaff = null;
function ouvrirStaff() {
  modeAvantStaff = mode;
  mode = 'staff';
  touches.clear();
  $('code-staff').value = '';
  $('staff-erreur').textContent = '';
  $('staff').hidden = false;
  $('code-staff').focus();
}
function fermerStaff() {
  $('staff').hidden = true;
  mode = modeAvantStaff;
}
function validerStaff() {
  if ($('code-staff').value.trim() !== CODE_STAFF) {
    $('staff-erreur').textContent = 'Code incorrect.';
    $('code-staff').select();
    return;
  }
  try { localStorage.removeItem(CLE_SAUVEGARDE); } catch { /* navigation privée */ }
  location.replace(location.pathname); // sans ?niveau=…, pour repartir du Sas
}
for (const b of document.querySelectorAll('.ouvrir-staff')) b.onclick = ouvrirStaff;
$('staff-annuler').onclick = fermerStaff;
$('staff-valider').onclick = validerStaff;
$('code-staff').addEventListener('keydown', (e) => {
  e.stopPropagation(); // les touches tapées ne doivent pas piloter le jeu
  if (e.key === 'Enter') validerStaff();
  if (e.key === 'Escape') fermerStaff();
});
$('staff').addEventListener('click', (e) => { if (e.target === $('staff')) fermerStaff(); });

// ------------------------------------------------------------------ Objet de quête
async function apparaitreObjet() {
  const def = OBJETS[niveau.id];
  const support = new THREE.Group();
  support.position.copy(ARENE.centre).setY(1.1);
  const anneau = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.04, 8, 48),
    new THREE.MeshBasicMaterial({ color: niveau.accent }));
  anneau.rotation.x = Math.PI / 2;
  anneau.position.y = -0.9;
  support.add(anneau);
  scene.add(support);
  objetQuete = support;
  if (def) {
    const gltf = await chargeurGLB.loadAsync(DOSSIER_OBJETS + def.fichier);
    const m = gltf.scene;
    const taille = new THREE.Box3().setFromObject(m).getSize(new THREE.Vector3());
    m.scale.setScalar(0.9 / Math.max(taille.x, taille.y, taille.z));
    const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3());
    m.position.sub(c);
    m.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    support.add(m);
  }
  interactions.push({
    objet: support, rayon: 2.4,
    actif: () => objetQuete === support,
    texte: () => `Ramasser : ${def?.nom ?? 'objet'}`,
    action: () => ramasser(def),
  });
}

function ramasser(def) {
  scene.remove(objetQuete);
  objetQuete = null;
  if (!partie.objets.includes(niveau.id)) partie.objets.push(niveau.id);
  sauver();
  majInventaire();
  $('obtenu-icone').textContent = def?.icone ?? '✨';
  $('obtenu-nom').textContent = def?.nom ?? '';
  $('obtenu').hidden = false;
  montrerPortrait(null);
  mode = 'dialogue';
  $('obtenu-ok').onclick = () => {
    $('obtenu').hidden = true;
    montrerPortrait(false);
    mode = 'exploration';
    if (niveau.suivant) {
      monde.portail.visible = true;
      dialogue([{ nom: niveau.titre, texte: `Le portail vers « ${NIVEAUX[niveau.suivant].titre} » s’est ouvert au nord.` }]);
    } else {
      dialogue([{ nom: 'Médiaventure', texte: 'Bravo, tu as terminé Médiaventure ! Passe au stand récupérer ton gain.' }]);
    }
  };
}

function majInventaire() {
  const inv = $('inventaire');
  inv.innerHTML = '';
  for (const id of ORDRE.slice(0, -1)) {
    const d = document.createElement('div');
    const a = partie.objets.includes(id);
    d.className = `case-inv${a ? ' acquis' : ''}`;
    d.textContent = a ? OBJETS[id].icone : '';
    d.title = a ? OBJETS[id].nom : `${NIVEAUX[id].titre} — pas encore obtenu`;
    inv.append(d);
  }
}

// ------------------------------------------------------------------ Dialogues
let fileDialogue = [], suiteDialogue = null, modeAvantDialogue = 'exploration';
function dialogue(lignes, ensuite = null) {
  if (mode !== 'dialogue') modeAvantDialogue = mode === 'transition' ? 'exploration' : mode;
  fileDialogue = [...lignes];
  suiteDialogue = ensuite;
  mode = 'dialogue';
  $('dialogue').hidden = false;
  avancerDialogue();
}
function avancerDialogue() {
  const l = fileDialogue.shift();
  if (!l) {
    $('dialogue').hidden = true;
    montrerPortrait(false);
    mode = modeAvantDialogue;
    const s = suiteDialogue;
    suiteDialogue = null;
    s?.();
    return;
  }
  $('dialogue-nom').textContent = l.nom;
  $('dialogue-texte').textContent = l.texte;
  montrerPortrait(l.nom === niveau?.boss?.nom ? niveau.boss.portrait : null);
}

// Portrait illustré à côté de chaque bloc de texte : celui du personnage qui parle s'il en a un,
// sinon celui de Cléo, la guide. `null` → portrait de la guide ; `false` → aucun portrait.
const PORTRAIT_GUIDE = '../portraits/cleo_miko.png';
function montrerPortrait(portrait) {
  const img = $('dialogue-portrait');
  if (portrait === false) {
    img.hidden = true;
    document.body.classList.remove('avec-portrait');
    return;
  }
  const src = portrait ?? PORTRAIT_GUIDE;
  if (!img.src.endsWith(src.replace('../', ''))) img.src = src;
  img.hidden = false;
  document.body.classList.add('avec-portrait');
}
$('dialogue').addEventListener('click', avancerDialogue);

// ------------------------------------------------------------------ Fondu
function fondu(noir) {
  $('chargement').classList.toggle('visible', noir);
  return new Promise((r) => setTimeout(r, 450));
}

// ------------------------------------------------------------------ Contrôles d'exploration
const touches = new Set();
const cam = { yaw: 0, pitch: 0.38, dist: 8 };
let cameraInstantanee = true;
addEventListener('keydown', (e) => {
  touches.add(e.code);
  if (mode === 'dialogue' && ['Space', 'Enter', 'KeyE'].includes(e.code) && !$('dialogue').hidden) { e.preventDefault(); avancerDialogue(); return; }
  if (mode === 'exploration' && e.code === 'KeyE') interagir();
  if (e.key === 'm' || e.key === 'M') { if (mode === 'carte') $('fermer-carte').click(); else ouvrirCarte(); }
  if (mode === 'exploration' && e.code === 'Space') { e.preventDefault(); sauter(); }
});
addEventListener('keyup', (e) => touches.delete(e.code));
addEventListener('blur', () => touches.clear());
{
  let glisse = null;
  canvas.addEventListener('pointerdown', (e) => { if (mode === 'exploration') glisse = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
  addEventListener('pointerup', (e) => { if (e.pointerId === glisse?.id) glisse = null; });
  addEventListener('pointermove', (e) => {
    if (!glisse || mode !== 'exploration' || e.pointerId !== glisse.id) return;
    cam.yaw -= (e.clientX - glisse.x) * 0.006;
    // un peu sous l'horizontale pour lever les yeux vers le décor
    cam.pitch = THREE.MathUtils.clamp(cam.pitch + (e.clientY - glisse.y) * 0.004, -0.3, 1.2);
    glisse.x = e.clientX; glisse.y = e.clientY; // garder l'identifiant du doigt / de la souris, sinon la rotation s'arrête net

  });
  canvas.addEventListener('wheel', (e) => {
    if (mode === 'exploration') cam.dist = THREE.MathUtils.clamp(cam.dist + e.deltaY * 0.01, 3.5, 14);
  }, { passive: true });
}

installerCommandes({
  surSauter: () => { if (mode === 'exploration') sauter(); },
  surAction: () => { if (mode === 'exploration') interagir(); },
});
if (ECRAN_TACTILE) document.querySelector('#dialogue small').textContent = 'Touche la bulle pour continuer';

function sauter() {
  if (joueur.position.y <= 0.001) joueur.userData.vy = 6.2;
}

let interactionProche = null;
function interagir() { interactionProche?.action(); }

const tmp = new THREE.Vector3();
function majExploration(dt) {
  // Déplacement relatif à la caméra (ZQSD / WASD / flèches)
  // + joystick tactile (on court quand on le pousse jusqu'au bord)
  const av = (touches.has('KeyW') || touches.has('ArrowUp') ? 1 : 0) - (touches.has('KeyS') || touches.has('ArrowDown') ? 1 : 0) + joystick.y;
  const dr = (touches.has('KeyD') || touches.has('ArrowRight') ? 1 : 0) - (touches.has('KeyA') || touches.has('ArrowLeft') ? 1 : 0) + joystick.x;
  const pousse = Math.hypot(joystick.x, joystick.y);
  const dir = new THREE.Vector3(-Math.sin(cam.yaw) * av + Math.cos(cam.yaw) * dr, 0, -Math.cos(cam.yaw) * av - Math.sin(cam.yaw) * dr);
  let vitesse = 0;
  if (dir.lengthSq() > 0 && mode === 'exploration') {
    dir.normalize();
    vitesse = touches.has('ShiftLeft') || touches.has('ShiftRight') || pousse > 0.95 ? 8 : 4.5 * (joystick.actif ? Math.max(0.35, pousse) : 1);
    joueur.position.addScaledVector(dir, vitesse * dt);
    const cible = Math.atan2(dir.x, dir.z);
    let d = cible - joueur.rotation.y;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    joueur.rotation.y += d * Math.min(1, dt * 12);
  }
  // Gravité / saut
  joueur.userData.vy -= 18 * dt;
  joueur.position.y = Math.max(0, joueur.position.y + joueur.userData.vy * dt);
  if (joueur.position.y === 0) joueur.userData.vy = 0;

  // Collisions
  for (const c of monde.colliders) {
    const cx = c.objet ? c.objet.position.x : c.x, cz = c.objet ? c.objet.position.z : c.z;
    tmp.set(joueur.position.x - cx, 0, joueur.position.z - cz);
    const d = tmp.length(), min = c.r + 0.35;
    if (d < min && d > 1e-4) joueur.position.addScaledVector(tmp.normalize(), min - d);
  }
  tmp.set(joueur.position.x, 0, joueur.position.z);
  if (tmp.length() > RAYON_ILE - 0.8) {
    tmp.setLength(RAYON_ILE - 0.8);
    joueur.position.x = tmp.x;
    joueur.position.z = tmp.z;
  }
  animerPersonnage(joueur, dt, joueur.position.y > 0 ? 0 : vitesse);

  // Portail
  if (monde.portail.visible && joueur.position.distanceTo(monde.portail.position) < 1.8 && mode === 'exploration') {
    lancerNiveau(niveau.suivant);
    return;
  }

  // Interactions
  interactionProche = null;
  let meilleure = Infinity;
  for (const it of interactions) {
    if (!it.actif() || !it.objet.visible) continue;
    const d = Math.hypot(it.objet.position.x - joueur.position.x, it.objet.position.z - joueur.position.z);
    if (d < it.rayon && d < meilleure) { meilleure = d; interactionProche = it; }
  }
  const invite = $('invite');
  invite.hidden = !interactionProche || mode !== 'exploration';
  if (interactionProche) invite.innerHTML = `<kbd>E</kbd> ${interactionProche.texte()}`;
  majBoutonAction(interactionProche && mode === 'exploration' ? interactionProche.texte().split(' ')[0] : null);

  // Les PNJ regardent le joueur quand il approche
  for (const p of [pnj, boss]) {
    if (!p?.visible) continue;
    if (p.position.distanceTo(joueur.position) < 6) {
      const cible = Math.atan2(joueur.position.x - p.position.x, joueur.position.z - p.position.z);
      let d = Math.atan2(Math.sin(cible - p.rotation.y), Math.cos(cible - p.rotation.y));
      p.rotation.y += d * Math.min(1, dt * 4);
    }
    animerPersonnage(p, dt, 0);
  }
  if (objetQuete) {
    objetQuete.rotation.y += dt * 1.2;
    objetQuete.position.y = 1.1 + Math.sin(horloge.elapsedTime * 2) * 0.12;
  }

  // Caméra 3e personne
  const cible = joueur.position.clone().add(new THREE.Vector3(0, 0.85, 0));
  const voulu = cible.clone().add(new THREE.Vector3(
    Math.sin(cam.yaw) * Math.cos(cam.pitch) * cam.dist,
    Math.sin(cam.pitch) * cam.dist,
    Math.cos(cam.yaw) * Math.cos(cam.pitch) * cam.dist,
  ));
  voulu.y = Math.max(voulu.y, 0.5);
  if (cameraInstantanee) { camera.position.copy(voulu); cameraInstantanee = false; }
  else camera.position.lerp(voulu, 1 - Math.exp(-dt * 10));
  camera.lookAt(cible);
}

// ------------------------------------------------------------------ Boucle
function boucle() {
  requestAnimationFrame(boucle);
  const dt = Math.min(horloge.getDelta(), 0.05);
  const t = horloge.elapsedTime;
  if (mode === 'creation') {
    if (!apercu) majApercu();
    if (rotationAuto && !apercuTenu) rotationApercu += dt * 0.6;
    apercu.rotation.y = rotationApercu;
    animerPersonnage(apercu, dt, 0);
    for (const e of etoilesFilantes) {
      e.position.y = e.userData.y + Math.sin(t + e.userData.phase) * 0.15;
      e.rotation.z = t * 0.5 + e.userData.phase;
    }
    // Personnage cadré sur la droite de l'écran, comme dans le vestiaire de référence
    const large = innerWidth > 760;
    camera.setViewOffset(innerWidth, innerHeight, large ? -innerWidth * 0.24 : 0, large ? 0 : innerHeight * 0.25, innerWidth, innerHeight);
    zoomApercu += (zoomVoulu - zoomApercu) * Math.min(1, dt * 8);
    const z = zoomApercu;
    camera.position.set(0, THREE.MathUtils.lerp(0.75, 0.82, z), THREE.MathUtils.lerp(large ? 2.3 : 3.6, 1.05, z));
    camera.lookAt(0, THREE.MathUtils.lerp(0.55, 0.74, z), 0);
    renderer.render(sceneCreation, camera);
    if (!chargementTermine && mode === 'creation') { chargementTermine = true; fondu(false); }
    return;
  }
  if (mode === 'fin' || (mode === 'staff' && modeAvantStaff === 'fin')) {
    if (!chargementTermine) { chargementTermine = true; fondu(false); }
    return;
  }
  if (mode === 'staff' && modeAvantStaff === 'creation') { renderer.render(sceneCreation, camera); return; }
  if (!monde) return;
  for (const a of monde.animations) a(dt, t);
  if (mode === 'combat') combat?.update(dt);
  else if (mode !== 'staff') majExploration(dt);
  renderer.render(scene, camera);
}
boucle();

// Accès direct à un niveau pour tester : index.html?niveau=informatique
const params = new URLSearchParams(location.search);
if (params.has('niveau') && NIVEAUX[params.get('niveau')]) {
  quitterVestiaire();
  partie.prenom ||= 'Testeur·se';
  lancerNiveau(params.get('niveau'));
}

// Une partie terminée reste sur l'écran de fin (seul le code staff relance une partie)
if (partie.termine && !params.has('niveau')) afficherFin();

// Pour le débogage depuis la console
window.jeu = { partie, lancerMiniJeu, tourner: (r) => { rotationApercu = r; rotationAuto = false; }, essayer: (ap) => { Object.assign(partie.apparence, ap); majApercu(); }, zoom: (v) => { zoomVoulu = zoomApercu = v; }, get mode() { return mode; }, get combat() { return combat; }, etatNiveau, lancerNiveau, ouvrirArene, lancerCombat, joueur: () => joueur, camera, cam };
