import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { NIVEAUX, OBJETS, ORDRE, PALETTE } from './niveaux.js';
import { QUESTIONS, SEUIL } from './quiz.js';
import { construireNiveau, RAYON_ILE, ARENE, POS } from './monde.js';
import { creerPersonnage, animerPersonnage, APPARENCE_DEFAUT, ombrelleTranslucide } from './personnage.js';
import { Combat } from './combat.js';
import { epreuveVideo, epreuvePortfolios, epreuveEtapes, epreuveCodeGaia } from './minijeux.js';
import { creerVestiaire } from './vestiaire.js';
import { ECRAN_TACTILE, joystick, installerCommandes, majBoutonAction } from './tactile.js';
import { t, choisirLangue } from './i18n.js';

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
partie.langue ??= 'fr';
choisirLangue(partie.langue);


// ------------------------------------------------------------------ Rendu
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, ECRAN_TACTILE ? 1.25 : 1.5)); // au-delà, l'écran Retina coûte beaucoup pour un gain à peine visible
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap; // ombres filtrées, moins coûteuses que PCFSoft
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const camera = new THREE.PerspectiveCamera(55, 1, 0.25, 800); // plan proche à 25 cm : plus de précision de profondeur au loin (moins de scintillement)
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
  quiz: 'Gardien·ne du Réseau', video: 'Projectionniste', portfolios: 'Esprit des couleurs',
  'etapes-projet': 'Stratège de Nara', 'stand-gaia': 'Gardien·ne du stand', 'combat-final': 'Esprit du château',
};
const nomPnj = () => t(NOMS_PNJ[niveau.miniJeu] ?? 'Esprit du biome');
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
function majReprendre() {
  if (!sauvegarde || sauvegarde.niveau === 'sas') return;
  $('reprendre').hidden = false;
  $('reprendre').textContent = t('Reprendre : {ile}', { ile: t(NIVEAUX[sauvegarde.niveau].titre) });
}
majReprendre();
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
  // langue choisie dans l'onglet Identité
  surChoixPartie: (champ, valeur) => {
    if (champ === 'langue') { choisirLangue(valeur); majReprendre(); }
    sauver();
  },
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
  ombrelleTranslucide(joueur);
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
    texte: () => t('Parler à {nom}', { nom: pnj === boss ? niveau.boss.nom : nomPnj() }),
    verbe: () => t('Parler'),
    action: lancerMiniJeu,
  });
  interactions.push({
    objet: boss, rayon: 2.8,
    actif: () => etatNiveau.miniJeuReussi && !etatNiveau.bossVaincu,
    texte: () => t('Défier {nom}', { nom: niveau.boss.nom }),
    verbe: () => t('Défier'),
    // le boss lance son défi (avec son portrait) avant le combat, s'il a une réplique
    action: () => (niveau.boss.defi ? dialogue([{ nom: niveau.boss.nom, texte: t(niveau.boss.defi) }], lancerCombat) : lancerCombat()),
  });

  $('hud-titre').textContent = t(niveau.titre);
  $('hud-lieu').textContent = t(niveau.lieu);
  majInventaire();
  $('hud').hidden = false;
  mode = 'exploration';
  await fondu(false);
  const titre = t(niveau.titre);
  const lignes = [{ nom: titre, texte: t('{lieu}. Va au centre de l’île : le chemin commence là.', { lieu: t(niveau.lieu) }) }];
  const precedent = ORDRE[ORDRE.indexOf(id) - 1];
  if (precedent && NIVEAUX[precedent]?.pvJoueur && niveau.pvJoueur > NIVEAUX[precedent].pvJoueur) {
    lignes.push({ nom: titre, texte: t('Ton aventure t’a rendu·e plus fort·e : tu as maintenant {pv} PV en combat (+{plus}).', { pv: niveau.pvJoueur, plus: niveau.pvJoueur - NIVEAUX[precedent].pvJoueur }) });
  }
  if (ECRAN_TACTILE && id === 'sas') {
    lignes.push({ nom: titre, texte: t('Joystick en bas à gauche pour te déplacer (pousse-le à fond pour courir), glisse l’écran pour tourner la caméra, ⤒ pour sauter.') });
  }
  dialogue(lignes);
}

function lancerMiniJeu() {
  const nomBoss = niveau.boss.nom;
  if (niveau.miniJeu === 'demo') {
    dialogue([
      { nom: nomBoss, texte: t('Bienvenue dans Médiaventure, {prenom} ! Je suis la gardienne du Sas.', { prenom: partie.prenom }) },
      { nom: nomBoss, texte: t('Chaque île suit le même parcours : une épreuve au milieu, un boss, un objet de quête, puis le portail.') },
      { nom: nomBoss, texte: t('Les six objets de quête sont obligatoires pour affronter le boss final. Garde-les précieusement !') },
      { nom: nomBoss, texte: t('Montre-moi ce que tu vaux : rejoins-moi dans l’arène pour un combat d’entraînement.') },
    ], () => {
      ouvrirArene();
      boss.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, -2));
    });
  } else if (niveau.miniJeu === 'quiz') {
    dialogue([
      { nom: t('Gardien·ne du Réseau'), texte: t('Pour atteindre {boss}, réponds à mon quiz : {n} questions, {seuil} bonnes réponses minimum.', { boss: nomBoss, n: QUESTIONS.length, seuil: SEUIL }) },
    ], lancerQuiz);
  } else if (niveau.miniJeu === 'combat-final') {
    const manquants = ORDRE.slice(0, -1).filter((id) => !partie.objets.includes(id));
    if (manquants.length) {
      dialogue([{ nom: nomPnj(), texte: t('Il te manque encore : {liste}.', { liste: manquants.map((id) => t(OBJETS[id].nom)).join(', ') }) }]);
    } else {
      dialogue([{ nom: nomPnj(), texte: t('Tu as réuni les six objets de quête. Le boss final t’attend !') }], ouvrirArene);
    }
  } else if (niveau.miniJeu === 'video') {
    epreuve(t('Bienvenue au cinéma des tournesols ! Choisis une vidéo dans la bibliothèque et regarde-la jusqu’au bout.'),
      () => epreuveVideo(niveau.videos.map((v) => ({ ...v, titre: t(v.titre) }))), t('Belle séance ! {boss} t’attend dans l’arène.', { boss: nomBoss }), t('Reviens quand tu veux finir ta vidéo.'));
  } else if (niveau.miniJeu === 'portfolios') {
    epreuve(t('Un bon designer s’inspire du travail des autres : choisis un e-portfolio et prends le temps de le visiter.'),
      () => epreuvePortfolios(niveau.portfolios, niveau.dureeVisite), t('Quel regard ! {boss} t’attend dans l’arène.', { boss: nomBoss }), t('Reviens me voir quand tu veux visiter un portfolio.'));
  } else if (niveau.miniJeu === 'etapes-projet') {
    epreuve(t('Un projet marketing se construit dans l’ordre. Remets ses étapes dans le bon ordre.'),
      () => epreuveEtapes(niveau.etapes.map((e) => t(e))), t('Stratégie validée ! {boss} t’attend dans l’arène.', { boss: nomBoss }), t('Reviens quand ton plan sera prêt.'));
  } else if (niveau.miniJeu === 'stand-gaia') {
    epreuve(t('Passe au stand Gaïa des portes ouvertes : la vendeuse te donnera un code. Entre-le ici pour ouvrir l’arène.'),
      () => epreuveCodeGaia(), t('Le code est bon ! {boss} t’attend dans l’arène.', { boss: nomBoss }), t('Reviens avec le code du stand Gaïa.'));
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
    $('quiz-compteur').textContent = t('Question {i} / {n} · Bonnes réponses : {score}', { i: i + 1, n: QUESTIONS.length, score });
    $('quiz-question').textContent = t(q.q);
    const rep = $('quiz-reponses');
    rep.innerHTML = '';
    q.r.forEach((texte, k) => {
      const b = document.createElement('button');
      b.textContent = t(texte);
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
      dialogue([{ nom: t('Gardien·ne du Réseau'), texte: t('{score} / {n} ! L’arène de {boss} est ouverte.', { score, n: QUESTIONS.length, boss: niveau.boss.nom }) }], ouvrirArene);
    } else {
      dialogue([{ nom: t('Gardien·ne du Réseau'), texte: t('{score} / {n}… Il en faut {seuil}. Reviens me parler pour réessayer.', { score, n: QUESTIONS.length, seuil: SEUIL }) }]);
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
    scene, camera, canvas, joueur, boss, def: niveau.boss, pvJoueur: niveau.pvJoueur, tutoriel: niveau.id === 'sas', murs: niveau.murs,
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
        if (niveau.id === 'final') victoireFinale(); // générique puis récompense (pas d'objet de quête à prendre)
        else {
          apparaitreObjet();
          dialogue([{ nom: niveau.boss.nom, texte: t('Bien joué… Prends cet objet de quête, tu l’as mérité.') }]);
        }
      } else {
        boss.rotation.set(0, 0, 0);
        boss.position.copy(ARENE.centre).add(new THREE.Vector3(0, 0, -2));
        dialogue([{ nom: niveau.boss.nom, texte: t('Pas encore… Reprends ton souffle et défie-moi à nouveau !') }]);
      }
    },
  });
}

// ------------------------------------------------------------------ Mini-carte des îles
// Consultation seulement (on ne peut pas y voyager) : une île par niveau avec sa photo, son nom et sa ville,
// reliées par le chemin de l'aventure. Les photos sont dans jeu/cartes/.
// couleurs de terre adoucies (pastels du Sas), une par décor
const TERRES = { bambou: '#a8d49a', tournesol: '#f5e08c', automne: '#f6bb8f', ciel: '#ffffff', glycine: '#c9b3f0', sakura: '#f9cfe0', final: '#f2d98a' };
function formeIle(cx, cy, r, graine) {
  const pts = [];
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2;
    const rr = r * (1 + 0.16 * Math.sin(a * 3 + graine) + 0.09 * Math.sin(a * 5 + graine * 2.3));
    pts.push([cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr * 0.85]);
  }
  const mil = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M${mil(pts[15], pts[0]).join(',')}`;
  for (let k = 0; k < 16; k++) d += ` Q${pts[k].join(',')} ${mil(pts[k], pts[(k + 1) % 16]).join(',')}`;
  return d + 'Z';
}
function dessinerCarte() {
  const plan = $('carte-plan');
  const haut = $('carte-mer').clientWidth < 560; // téléphone en portrait : les îles se suivent de haut en bas
  const W = 1000, H = haut ? 2100 : 560;
  plan.style.aspectRatio = `${W} / ${H}`;
  const pos = haut
    ? ORDRE.map((_, i) => [i % 2 ? 70 : 30, 10 + i * 13.4])
    : [[10, 64], [24, 30], [38, 68], [52, 30], [65, 68], [78, 30], [90, 66]];
  const P = pos.map(([x, y]) => [x * W / 100, y * H / 100]);
  const r = haut ? 105 : 62;
  let svg = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs>
    <radialGradient id="mer" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#dbe8fb"/><stop offset="1" stop-color="#a9c5ee"/></radialGradient>
    <pattern id="vagues" width="60" height="30" patternUnits="userSpaceOnUse"><path d="M0 15q15-10 30 0t30 0" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/></pattern></defs>
    <rect width="${W}" height="${H}" fill="url(#mer)"/><rect width="${W}" height="${H}" fill="url(#vagues)"/>`;
  // chemin de l'aventure, d'île en île
  let d = `M${P[0].join(',')}`;
  for (let i = 1; i < P.length; i++) {
    const [a, b] = [P[i - 1], P[i]];
    d += ` Q${(a[0] + b[0]) / 2 + (i % 2 ? 40 : -40)},${(a[1] + b[1]) / 2 + (haut ? 0 : (i % 2 ? -40 : 40))} ${b.join(',')}`;
  }
  svg += `<path d="${d}" fill="none" stroke="#b49fe2" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>`;
  ORDRE.forEach((id, i) => {
    const [x, y] = P[i], terre = TERRES[NIVEAUX[id].biome] ?? '#7fae4c';
    svg += `<path d="${formeIle(x, y + 10, r * 1.12, i * 1.7)}" fill="#93b4e3"/><path d="${formeIle(x, y + 6, r * 1.12, i * 1.7)}" fill="#fff"/><path d="${formeIle(x, y + 4, r * 0.95, i * 1.7)}" fill="${terre}"/>`;
  });
  // rose des vents
  svg += `<g transform="translate(${W - 60},${haut ? 60 : 56})" fill="#fff" stroke="#3b3360" stroke-width="2"><path d="M0-34L7-7 34 0 7 7 0 34-7 7-34 0-7-7Z"/><text y="-40" text-anchor="middle" font-size="18" font-weight="700" fill="#3b3360" stroke="none">N</text></g></svg>`;
  plan.innerHTML = svg;
  // la carte entière tient dans la hauteur disponible (téléphone en paysage, petite fenêtre)
  plan.style.width = '100%';
  plan.style.margin = '';
  const mer = $('carte-mer');
  if (!haut && mer.clientHeight && mer.clientHeight < mer.clientWidth * H / W) {
    plan.style.width = `${(mer.clientHeight * W) / H}px`;
    plan.style.margin = '0 auto';
  }
  const ici = ORDRE.indexOf(niveau?.id);
  ORDRE.forEach((id, i) => {
    const n = NIVEAUX[id], d = document.createElement('div');
    const fait = partie.objets.includes(id);
    d.className = `ile-carte${i === ici ? ' ici' : ''}${i > ici && !fait ? ' a-venir' : ''}`;
    d.style.left = pos[i][0] + '%';
    d.style.top = pos[i][1] + '%';
    const etat = i === ici ? t('Tu es ici') : fait ? `✓ ${t('obtenu')}` : id === 'final' ? t('boss final') : '';
    d.innerHTML = `<img src="cartes/${id}.jpg" alt=""><strong>${t(n.titre).split(' — ')[0]}</strong><span>${t(n.ville)}</span>${etat ? `<small>${etat}</small>` : ''}`;
    plan.append(d);
  });
}
// Le parchemin se déroule depuis le centre à l'ouverture et se réenroule à la fermeture
const DUREE_PARCHEMIN = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600;
const ROULE = 18; // hauteur du parchemin enroulé : les deux rouleaux se touchent
let animParchemin = 0;
function ouvrirCarte() {
  if (mode !== 'exploration') return;
  mode = 'carte';
  touches.clear();
  const p = $('parchemin-carte');
  clearTimeout(animParchemin);
  p.classList.remove('anime', 'roule', 'fermeture');
  p.style.height = '';
  $('carte').classList.add('fondu');
  $('carte').hidden = false;
  dessinerCarte(); // à pleine taille, pour mesurer
  const h = p.offsetHeight;
  p.classList.add('roule');
  p.style.height = ROULE + 'px';
  void p.offsetHeight; // part de l'état enroulé
  p.classList.add('anime');
  p.classList.remove('roule');
  p.style.height = h + 'px';
  $('carte').classList.remove('fondu');
  animParchemin = setTimeout(() => { p.classList.remove('anime'); p.style.height = ''; }, DUREE_PARCHEMIN);
}
function fermerCarte() {
  if (mode !== 'carte') return;
  mode = 'exploration';
  const p = $('parchemin-carte');
  clearTimeout(animParchemin);
  p.style.height = p.offsetHeight + 'px';
  void p.offsetHeight;
  p.classList.add('anime', 'roule', 'fermeture');
  p.style.height = ROULE + 'px';
  $('carte').classList.add('fondu');
  animParchemin = setTimeout(() => {
    $('carte').hidden = true;
    p.classList.remove('anime', 'roule', 'fermeture');
    p.style.height = '';
  }, DUREE_PARCHEMIN);
}
$('ouvrir-carte').onclick = ouvrirCarte;
$('fermer-carte').onclick = fermerCarte;
$('carte').addEventListener('click', (e) => { if (e.target === $('carte')) fermerCarte(); });
addEventListener('resize', () => { if (mode === 'carte' && !$('parchemin-carte').classList.contains('anime')) dessinerCarte(); });

// ------------------------------------------------------------------ Fin du jeu
// Générique de fin, montré après la victoire contre le boss final et avant le message de récompense
const CREDITS = [
  ['Jeu et visuels', [['Cléo Ana Forclaz', 'SM-C3a']]],
  ['Vidéos', [['Rémy Martinez', 'SM-C3a'], ['Salomé Duperrex', 'SM-MI3a'], ['Cléo Ana Forclaz', 'SM-C3a']]],
  ['E-portfolios', [['Rémy Martinez', 'SM-C3a'], ['Salomé Duperrex', 'SM-MI3a'], ['Cléo Ana Forclaz', 'SM-C3a'], ['Samuel Porchet', 'SM-MI3a']]],
  ['Boss', [['Roderick Graber'], ['Jade Perroset'], ['Philippe Kiener'], ['Olivier Droz'], ['Baptiste Forestier'], ['Christophe Haenssler']]],
];
function afficherCredits(ensuite) {
  mode = 'credits';
  montrerPortrait(false);
  $('dialogue').hidden = true;
  const d = $('credits-defile');
  d.innerHTML = `<h2>MÉDIAVENTURE</h2><p class="sous">${t('Portes ouvertes 2026')}</p>` +
    CREDITS.map(([titre, noms]) => `<h3>${t(titre)}</h3>` + noms.map(([nom, classe]) => `<p>${nom}${classe ? `<small>${classe}</small>` : ''}</p>`).join('')).join('') +
    `<p class="merci">${t('Merci d’avoir joué !')}</p>`;
  d.style.animation = 'none';
  void d.offsetHeight; // relance le défilement depuis le bas
  d.style.animation = '';
  $('credits').hidden = false;
  let fini = false;
  const suite = () => { if (fini) return; fini = true; $('credits').hidden = true; ensuite(); };
  $('credits-ok').onclick = suite;
  d.onanimationend = () => setTimeout(suite, 1500); // à la fin du défilement, on passe à la récompense
}

function victoireFinale() {
  partie.termine = true; // la partie reste terminée même si la page est rechargée, jusqu'au code staff
  sauver();
  afficherCredits(montrerRecompense);
}
function montrerRecompense() {
  $('obtenu-icone').textContent = '🏆';
  $('obtenu-nom').textContent = t('Médiaventure terminée !');
  $('obtenu-texte').textContent = t(niveau.gain);
  $('obtenu').hidden = false;
  montrerPortrait(null);
  mode = 'dialogue';
  $('obtenu-ok').onclick = () => {
    $('obtenu').hidden = true;
    $('obtenu-texte').textContent = t('Il rejoint ton inventaire, en haut à droite.');
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
  $('fin-texte').textContent = t('Bravo cher·e {prenom} ! Vous avez fini le jeu Médiaventure. Pour obtenir votre récompense, faites appel à un membre du Staff des PO.',
    { prenom: partie.prenom || t('voyageur·se') });
  $('fin-jeu').hidden = false;
}

// ------------------------------------------------------------------ Nouvelle partie (staff)
// Code fixe connu du staff de la salle informatique : efface la sauvegarde et relance le jeu au Sas.
const CODE_STAFF = '582047';
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
    $('staff-erreur').textContent = t('Code incorrect.');
    $('code-staff').select();
    return;
  }
  try { localStorage.removeItem(CLE_SAUVEGARDE); } catch { /* navigation privée */ }
  location.replace(location.pathname); // recharge la page : on repart du Sas
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
// Le vrai modèle 3D de l'objet (pas un émoji) : il tourne dans la fenêtre « objet obtenu »
// et sert à fabriquer les vignettes de l'inventaire. Un petit moteur de rendu séparé, fond transparent.
const apercuObjet = (() => {
  let rendu = null, scene3d = null, cam = null, modele = null, anime = 0;
  const modeles = new Map(), vignettes = new Map();
  function preparer() {
    if (rendu) return;
    rendu = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    rendu.setPixelRatio(Math.min(devicePixelRatio, 2));
    rendu.setSize(200, 200);
    rendu.toneMapping = THREE.ACESFilmicToneMapping;
    rendu.domElement.className = 'objet-3d';
    scene3d = new THREE.Scene();
    scene3d.add(new THREE.HemisphereLight('#ffffff', '#b9a98c', 2.2));
    const soleil = new THREE.DirectionalLight('#ffffff', 2.4);
    soleil.position.set(2, 3, 4);
    scene3d.add(soleil);
    cam = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    cam.position.set(0, 0.45, 2.3);
    cam.lookAt(0, 0, 0);
  }
  async function charger(id) {
    if (!modeles.has(id)) {
      modeles.set(id, chargeurGLB.loadAsync(DOSSIER_OBJETS + OBJETS[id].fichier).then((g) => {
        const m = g.scene;
        const taille = new THREE.Box3().setFromObject(m).getSize(new THREE.Vector3());
        m.scale.setScalar(1 / Math.max(taille.x, taille.y, taille.z));
        m.position.sub(new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3()));
        const pivot = new THREE.Group();
        pivot.add(m);
        return pivot;
      }));
    }
    return modeles.get(id);
  }
  function montrer(m, angle) {
    if (modele) scene3d.remove(modele);
    modele = m;
    modele.rotation.y = angle;
    scene3d.add(modele);
    rendu.render(scene3d, cam);
  }
  return {
    // fait tourner l'objet dans `conteneur` jusqu'à `arreter()`
    async tourner(id, conteneur) {
      preparer();
      cancelAnimationFrame(anime);
      const m = await charger(id);
      conteneur.replaceChildren(rendu.domElement);
      const t0 = performance.now();
      const boucle = () => { montrer(m, -0.6 + (performance.now() - t0) / 1400); anime = requestAnimationFrame(boucle); };
      boucle();
    },
    arreter() { cancelAnimationFrame(anime); },
    // image fixe de l'objet (data URL), pour l'inventaire
    async vignette(id) {
      if (!vignettes.has(id)) {
        vignettes.set(id, charger(id).then((m) => { preparer(); cancelAnimationFrame(anime); montrer(m, -0.6); return rendu.domElement.toDataURL('image/png'); }));
      }
      return vignettes.get(id);
    },
  };
})();

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
    texte: () => t('Ramasser : {objet}', { objet: t(def?.nom ?? 'objet') }),
    verbe: () => t('Ramasser'),
    action: () => ramasser(def),
  });
}

function ramasser(def) {
  scene.remove(objetQuete);
  objetQuete = null;
  if (!partie.objets.includes(niveau.id)) partie.objets.push(niveau.id);
  sauver();
  majInventaire();
  $('obtenu-icone').textContent = '';
  if (def) apercuObjet.tourner(niveau.id, $('obtenu-icone')).catch(() => { $('obtenu-icone').textContent = def.icone; });
  $('obtenu-nom').textContent = t(def?.nom ?? '');
  $('obtenu').hidden = false;
  montrerPortrait(null);
  mode = 'dialogue';
  $('obtenu-ok').onclick = () => {
    apercuObjet.arreter();
    $('obtenu').hidden = true;
    montrerPortrait(false);
    mode = 'exploration';
    if (niveau.suivant) {
      monde.portail.visible = true;
      dialogue([{ nom: t(niveau.titre), texte: t('Le portail vers « {ile} » s’est ouvert au nord.', { ile: t(NIVEAUX[niveau.suivant].titre) }) }]);
    } else {
      dialogue([{ nom: 'Médiaventure', texte: t('Bravo, tu as terminé Médiaventure ! Passe au stand récupérer ton gain.') }]);
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
    d.textContent = '';
    if (a) apercuObjet.vignette(id).then((url) => { d.innerHTML = `<img src="${url}" alt="">`; }).catch(() => { d.textContent = OBJETS[id].icone; });
    d.title = a ? t(OBJETS[id].nom) : t('{ile} — pas encore obtenu', { ile: t(NIVEAUX[id].titre) });
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
const PORTRAIT_GUIDE = 'portraits/cleo_miko.png';
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
  if (e.code === 'KeyM') { if (mode === 'carte') fermerCarte(); else ouvrirCarte(); }
  if (mode === 'carte' && e.code === 'Escape') fermerCarte();
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
if (ECRAN_TACTILE) {
  const aide = document.querySelector('#dialogue small');
  aide.dataset.fr = 'Touche la bulle pour continuer'; // texte de base pour la traduction
  aide.textContent = t(aide.dataset.fr);
}

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
  majBoutonAction(interactionProche && mode === 'exploration' ? interactionProche.verbe() : null);

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
  eviterPlafonds(cible, voulu);
  if (cameraInstantanee) { camera.position.copy(voulu); cameraInstantanee = false; }
  else camera.position.lerp(voulu, 1 - Math.exp(-dt * 10));
  camera.lookAt(cible);
  masquerEntreCameraEtJoueur(cible, dt);
}

// La caméra n'entre pas dans un toit de végétation (pergola de glycines, grande glycine) : elle descend
// d'abord sous le toit en gardant sa distance, puis, si ça ne suffit pas, se rapproche du joueur.
function dansPlafond(p) {
  return (monde.plafonds ?? []).some((b) => p.y > b.y0 && p.y < b.y1
    && (b.r ? Math.hypot(p.x - b.x, p.z - b.z) < b.r : p.x > b.x0 && p.x < b.x1 && p.z > b.z0 && p.z < b.z1));
}
function eviterPlafonds(cible, voulu) {
  if (!dansPlafond(voulu)) return;
  const d = voulu.clone().sub(cible);
  for (let y = d.y; y > -0.3; y -= 0.1) { // plus bas, même distance au sol
    const p = cible.clone().add(new THREE.Vector3(d.x, Math.max(y, 0.5 - cible.y), d.z));
    if (!dansPlafond(p)) { voulu.copy(p); return; }
  }
  for (let t = 0.95; t > 0.2; t -= 0.05) { // plus près
    const p = cible.clone().addScaledVector(d, t);
    if (!dansPlafond(p)) { voulu.copy(p); return; }
  }
}

// Un bambou (ou autre décor haut) proche de la caméra qui cache le joueur devient translucide en douceur,
// puis redevient opaque quand il ne gêne plus. Seuils différents pour entrer et sortir : pas de clignotement.
const OPACITE_ESTOMPE = 0.2, PORTEE_ESTOMPE = 7; // mètres devant la caméra
function masquerEntreCameraEtJoueur(cible, dt) {
  const ax = camera.position.x, az = camera.position.z, dx = cible.x - ax, dz = cible.z - az;
  const longueur = Math.hypot(dx, dz) || 1, l2 = longueur * longueur;
  for (const o of monde.masquables) {
    const u = o.userData;
    const t = ((o.position.x - ax) * dx + (o.position.z - az) * dz) / l2; // position le long du segment caméra → joueur
    const tc = Math.min(1, Math.max(0, t));
    const px = ax + dx * tc - o.position.x, pz = az + dz * tc - o.position.z;
    const base = u.rayonMasque ?? 0.6; // bambou fin ; les arbres à large couronne donnent leur propre rayon
    const rayon = u.estompe ? base * 1.6 : base; // il faut s'écarter franchement pour qu'il revienne
    u.estompe = t > -0.05 && t < 0.95 && t * longueur < PORTEE_ESTOMPE && px * px + pz * pz < rayon * rayon;
    const voulu = u.estompe ? OPACITE_ESTOMPE : 1;
    u.opacite ??= 1;
    if (u.opacite === voulu) continue;
    u.opacite += (voulu - u.opacite) * Math.min(1, dt * 10);
    if (Math.abs(u.opacite - voulu) < 0.02) u.opacite = voulu;
    if (u.opacite < 1) {
      // matériau propre à ce bambou le temps de l'estomper (les autres gardent le matériau partagé)
      if (!u.matOpaque) {
        u.matOpaque = o.material;
        o.material = o.material.clone();
        o.material.onBeforeCompile = u.matOpaque.onBeforeCompile; // garde le grain de papier du dessin
        o.material.customProgramCacheKey = u.matOpaque.customProgramCacheKey;
        o.material.transparent = true;
      }
      o.material.opacity = u.opacite;
      o.material.depthWrite = u.opacite > 0.9;
    } else if (u.matOpaque) {
      o.material.dispose();
      o.material = u.matOpaque;
      u.matOpaque = null;
    }
  }
}

// ------------------------------------------------------------------ Boucle
// Cadrage du personnage du Sas. Sur grand écran : à droite du panneau, recul fixe.
// Sur téléphone : on mesure la zone libre (sous le titre ; au-dessus de Cléo en portrait, à droite du panneau en paysage)
// et on centre le personnage dedans, avec le recul qui le fait tenir en entier.
function cadrageSas() {
  const W = innerWidth, H = innerHeight;
  if (W > 760 && H > 500) return { x: -W * 0.24, y: 0, recul: 2.3 };
  const r = (id) => $(id).getBoundingClientRect();
  const titre = r('titre-sas'), panneau = r('panneau'), actions = r('actions-sas'), guide = r('guide-sas');
  let x0 = 0, x1 = W, y0 = titre.bottom + 6, y1;
  if (panneau.top > H * 0.3) { // panneau en bas (portrait) : Cléo est au-dessus du panneau
    y1 = Math.min(panneau.top, guide.height ? guide.top : panneau.top) - 6;
  } else { // panneau à gauche (paysage)
    x0 = panneau.right + 8;
    y0 = 8; // le titre est en haut à droite : le personnage peut passer dessous sans gêne
    y1 = actions.top - 6;
  }
  const zl = Math.max(80, x1 - x0), zh = Math.max(80, y1 - y0);
  const tanDemi = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  // hauteur visible voulue : personnage (≈ 1,25 m) sur 90 % de la zone ; largeur : ≈ 0,9 m sur 85 %
  const reculH = (1.25 * H / (0.9 * zh)) / (2 * tanDemi);
  const reculL = (0.9 * W / (0.85 * zl)) / (2 * tanDemi * (W / H));
  return { x: W / 2 - (x0 + x1) / 2, y: H / 2 - (y0 + y1) / 2, recul: Math.max(reculH, reculL, 1.6) };
}

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
    // Personnage cadré sur la droite de l'écran, comme dans le vestiaire de référence ;
    // sur téléphone, cadré dans l'espace laissé libre par le titre, Cléo, le panneau et les boutons
    zoomApercu += (zoomVoulu - zoomApercu) * Math.min(1, dt * 8);
    const z = zoomApercu;
    const cadre = cadrageSas();
    camera.setViewOffset(innerWidth, innerHeight, cadre.x, cadre.y, innerWidth, innerHeight);
    camera.position.set(0, THREE.MathUtils.lerp(0.75, 0.82, z), THREE.MathUtils.lerp(cadre.recul, 1.05, z));
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

// Une partie terminée reste sur l'écran de fin (seul le code staff relance une partie)
if (partie.termine) afficherFin();

// Pour le débogage depuis la console
window.jeu = { partie, renderer, get monde() { return monde; }, lancerMiniJeu, tourner: (r) => { rotationApercu = r; rotationAuto = false; }, essayer: (ap) => { Object.assign(partie.apparence, ap); majApercu(); }, zoom: (v) => { zoomVoulu = zoomApercu = v; }, get mode() { return mode; }, get combat() { return combat; }, etatNiveau, lancerNiveau, ouvrirArene, lancerCombat, joueur: () => joueur, camera, cam };
