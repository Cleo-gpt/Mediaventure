// ------------------------------------------------------------------ Statistiques des parties (anonymes)
// Chaque partie a une « fiche » : appareil, langue, tenue choisie au Sas, puis pour chaque île l'heure d'arrivée,
// le temps passé, l'épreuve (choix, essais, réponses, abandons « Plus tard »), les combats (tentatives, tours, sorts)
// et l'objet de quête. Aucun prénom n'est envoyé.
// La fiche est gardée dans le navigateur et envoyée au serveur à chaque étape (enregistrer.php la range avec les
// autres dans un seul fichier). Si le réseau manque, elle attend et repart au prochain envoi.
// Les tests automatisés (navigator.webdriver) n'envoient rien, pour ne pas fausser les chiffres.

import { accessoireDe, armeDe, ceintureDe, motifDe } from './personnage.js';

const lire = (cle) => { try { return JSON.parse(localStorage.getItem(cle)); } catch { return null; } };
// adresse de test possible : localStorage['mediaventure-stats-url'] = '"http://localhost:8080/stats/enregistrer.php"'
const URL_TEST = lire('mediaventure-stats-url');
export const URL_STATS = URL_TEST ?? 'https://cforclaz.eleves.mediamatique.ch/jeu/stats/enregistrer.php';
const CLE = 'mediaventure-stats';
const CLE_ATTENTE = 'mediaventure-stats-attente';
const MAX_ATTENTE = 40;
const ENVOI_ACTIF = !navigator.webdriver || !!URL_TEST;

const ecrire = (cle, v) => { try { localStorage.setItem(cle, JSON.stringify(v)); } catch { /* navigation privée */ } };
const maintenant = () => new Date().toISOString();
const secondes = (debut, fin = maintenant()) => Math.max(0, Math.round((Date.parse(fin) - Date.parse(debut)) / 1000));

function nouvelId() {
  if (crypto.randomUUID) { try { return crypto.randomUUID(); } catch { /* contexte non sécurisé */ } }
  return [...crypto.getRandomValues(new Uint8Array(16))].map((o) => o.toString(16).padStart(2, '0')).join('');
}

let fiche = lire(CLE);
let ileCourante = fiche?.ileCourante ?? null;

function appareil() {
  const tactile = matchMedia('(pointer: coarse)').matches;
  const petit = Math.min(screen.width, screen.height) < 600;
  return {
    type: tactile ? (petit ? 'téléphone' : 'tablette') : 'ordinateur',
    ecran: `${screen.width}×${screen.height}`,
    fenetre: `${innerWidth}×${innerHeight}`,
    navigateur: /Edg\//.test(navigator.userAgent) ? 'Edge' : /Firefox\//.test(navigator.userAgent) ? 'Firefox'
      : /Chrome\//.test(navigator.userAgent) ? 'Chrome' : /Safari\//.test(navigator.userAgent) ? 'Safari' : 'autre',
    hebergement: location.protocol === 'file:' ? 'double-clic' : 'serveur',
  };
}

// ---------------------------------------------------------------- Envoi
let minuteur = 0;
function changer() {
  if (!fiche) return;
  fiche.maj = maintenant();
  fiche.ileCourante = ileCourante;
  ecrire(CLE, fiche);
  clearTimeout(minuteur);
  minuteur = setTimeout(envoyer, 1500);
}
function mettreEnAttente(f) {
  const attente = lire(CLE_ATTENTE) ?? {};
  attente[f.id] = f;
  const ids = Object.keys(attente);
  if (ids.length > MAX_ATTENTE) for (const id of ids.slice(0, ids.length - MAX_ATTENTE)) delete attente[id];
  ecrire(CLE_ATTENTE, attente);
}
let envoiEnCours = false;
async function envoyer() {
  clearTimeout(minuteur);
  if (fiche) mettreEnAttente(fiche);
  if (!ENVOI_ACTIF || envoiEnCours || !navigator.onLine) return;
  envoiEnCours = true;
  try {
    const attente = lire(CLE_ATTENTE) ?? {};
    for (const [id, f] of Object.entries(attente)) {
      const r = await fetch(URL_STATS, { method: 'POST', body: JSON.stringify(f), keepalive: true });
      if (!r.ok) break;
      const reste = lire(CLE_ATTENTE) ?? {};
      if (reste[id]?.maj === f.maj) { delete reste[id]; ecrire(CLE_ATTENTE, reste); }
    }
  } catch { /* hors ligne ou serveur absent : on réessaiera */ }
  envoiEnCours = false;
}
// la page se ferme : dernier envoi sans attendre la réponse
addEventListener('pagehide', () => {
  if (!fiche || !ENVOI_ACTIF) return;
  changer();
  clearTimeout(minuteur);
  mettreEnAttente(fiche);
  navigator.sendBeacon?.(URL_STATS, new Blob([JSON.stringify(fiche)], { type: 'text/plain' }));
});
addEventListener('online', envoyer);
setTimeout(envoyer, 4000); // fiches restées en attente d'une visite précédente

// ---------------------------------------------------------------- Partie
// Appelée quand le joueur quitte le Sas-vestiaire : la tenue est connue
export function demarrerPartie(apparence, langue) {
  // « Entrer » repart de zéro (objets remis à vide) : une partie commencée mais pas finie est close comme abandonnée
  if (fiche && !fiche.termine && !fiche.abandon && Object.keys(fiche.iles).length) {
    sortirIle();
    Object.assign(fiche, { abandon: true, fin: maintenant(), duree: secondes(fiche.debut), maj: maintenant() });
    mettreEnAttente(fiche);
  }
  fiche = {
    version: 1, id: nouvelId(), debut: maintenant(), maj: maintenant(), langue, appareil: appareil(),
    tenue: tenueDe(apparence), tempsVestiaire: Math.round(performance.now() / 1000),
    parcours: [], iles: {}, termine: false, abandon: false,
  };
  ileCourante = null;
  changer();
}
function tenueDe(a) {
  return {
    espece: a.espece, coiffure: a.coiffure, cheveux: a.cheveux, yeux: a.yeux, kimono: a.kimono ?? 'défaut',
    motif: a.kimono ? motifDe(a) : null, ceinture: ceintureDe(a), baguettes: a.coiffure === 'chignon' ? a.baguettes : null,
    accessoire: accessoireDe(a) ?? 'aucun', arme: armeDe(a) ?? 'aucune', geta: a.geta,
  };
}
export function changerLangue(langue) {
  if (!fiche) return;
  fiche.langue = langue;
  changer();
}

// Partie reprise après un rechargement de page sans fiche (ancienne sauvegarde) : on en ouvre une
function assurerFiche() {
  if (!fiche || fiche.termine || fiche.abandon) {
    fiche = { version: 1, id: nouvelId(), debut: maintenant(), maj: maintenant(), langue: null, appareil: appareil(),
      tenue: null, parcours: [], iles: {}, termine: false, abandon: false, reprise: true };
  }
  return fiche;
}
function ile(id = ileCourante) {
  if (!id) return null;
  const f = assurerFiche();
  return (f.iles[id] ??= {
    arrivee: maintenant(), visites: 0, temps: 0,
    epreuve: { ouvertures: 0, choix: [], essais: [], plusTard: 0, reussie: false, duree: null },
    combat: { tentatives: 0, victoire: false, combats: [] },
    objet: null,
  });
}

// ---------------------------------------------------------------- Îles
export function entrerIle(id, apparence, langue) {
  sortirIle();
  ileCourante = id;
  const i = ile(id);
  fiche.tenue ??= apparence ? tenueDe(apparence) : null;
  fiche.langue ??= langue ?? null;
  i.visites++;
  i.entree = maintenant();
  fiche.parcours.push({ ile: id, a: i.entree });
  changer();
}
function sortirIle() {
  const i = ile();
  if (i?.entree) { i.temps += secondes(i.entree); i.entree = null; }
}

// ---------------------------------------------------------------- Épreuve (vidéo, e-portfolio, quiz, étapes, Gaïa)
export function epreuveOuverte() {
  const e = ile()?.epreuve;
  if (!e) return;
  e.ouvertures++;
  e.debut ??= maintenant();
  changer();
}
// un choix fait dans l'épreuve : la vidéo regardée, le portfolio visité…
export function epreuveChoix(nom) {
  ile()?.epreuve.choix.push({ nom, a: maintenant() });
  changer();
}
// un essai : une vérification des étapes, un code Gaïa, un quiz complet (avec ses réponses)
export function epreuveEssai(detail) {
  ile()?.epreuve.essais.push({ ...detail, a: maintenant() });
  changer();
}
export function epreuveFin(reussie) {
  const e = ile()?.epreuve;
  if (!e) return;
  if (reussie) {
    e.reussie = true;
    e.duree ??= secondes(e.debut ?? maintenant());
  } else e.plusTard++;
  changer();
}

// ---------------------------------------------------------------- Combat
let combatEnCours = null;
export function combatDebut(boss) {
  combatEnCours = { boss, debut: maintenant(), tours: 0, sorts: {} };
}
export function combatTour() { if (combatEnCours) combatEnCours.tours++; }
export function combatSort(nom) {
  if (combatEnCours) combatEnCours.sorts[nom] = (combatEnCours.sorts[nom] ?? 0) + 1;
}
export function combatFin(victoire, pvJoueur, pvBoss) {
  const c = ile()?.combat;
  if (!c || !combatEnCours) return;
  const { boss, debut, tours, sorts } = combatEnCours;
  combatEnCours = null;
  c.tentatives++;
  if (victoire) c.victoire = true;
  c.combats.push({ boss, victoire, tours, duree: secondes(debut), pvJoueur: Math.max(0, pvJoueur), pvBoss: Math.max(0, pvBoss), sorts });
  changer();
}

// ---------------------------------------------------------------- Objet, fin, nouvelle partie
export function objetRamasse(id) {
  const i = ile();
  if (!i) return;
  i.objet = { id, a: maintenant(), apresArrivee: secondes(i.arrivee) };
  changer();
}
export function finPartie() {
  const f = assurerFiche();
  sortirIle();
  f.termine = true;
  f.fin = maintenant();
  f.duree = secondes(f.debut, f.fin);
  changer();
  envoyer();
}
// Le staff efface la sauvegarde : la partie en cours (pas finie) est notée comme abandonnée et envoyée
export function nouvellePartie() {
  if (fiche && !fiche.termine) {
    sortirIle();
    fiche.abandon = true;
    fiche.fin = maintenant();
    fiche.duree = secondes(fiche.debut, fiche.fin);
    fiche.maj = maintenant();
    mettreEnAttente(fiche);
    if (ENVOI_ACTIF) navigator.sendBeacon?.(URL_STATS, new Blob([JSON.stringify(fiche)], { type: 'text/plain' }));
  }
  fiche = null;
  try { localStorage.removeItem(CLE); } catch { /* navigation privée */ }
}
