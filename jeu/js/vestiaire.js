// Le Sas : vestiaire de création du personnage (onglets, catégories, cartes à étoiles, historique).
import { OPTIONS, APPARENCE_DEFAUT } from './personnage.js';
import { PALETTE } from './niveaux.js';

const $ = (id) => document.getElementById(id);

const NOMS_COULEURS = {
  [PALETTE.corail]: 'Corail', [PALETTE.rose]: 'Rose sakura', [PALETTE.bleu]: 'Bleu ciel',
  [PALETTE.marine]: 'Marine', [PALETTE.creme]: 'Crème', '#3f8f7a': 'Jade',
  '#3b6fd1': 'Saphir', '#6b4a33': 'Noisette', '#c0506a': 'Grenat', '#7a5bc4': 'Améthyste',
  '#2a2a2e': 'Encre', '#5a3a2a': 'Châtain', '#a8643a': 'Roux', '#e8d2a6': 'Blond', '#f8a0ab': 'Rose',
};

// ---------------------------------------------------------------- Icônes (SVG en ligne)
const svg = (contenu, vb = '0 0 64 64') => `<svg viewBox="${vb}" aria-hidden="true">${contenu}</svg>`;
const ICONES = {
  tenue: svg('<path d="M24 10h16l3 6-11 6-11-6z" fill="currentColor"/><path d="M21 16l11 6 11-6 3 2-4 8v28H22V26l-4-8z" fill="currentColor"/>'),
  visage: svg('<circle cx="32" cy="32" r="19" fill="none" stroke="currentColor" stroke-width="4"/><path d="M23 31q3 3 6 0M35 31q3 3 6 0M27 41q5 4 10 0" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>'),
  identite: svg('<circle cx="30" cy="20" r="9" fill="currentColor"/><path d="M14 52q2-18 16-18t16 18z" fill="currentColor"/><path d="M50 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor"/>'),
  kimono: (c) => svg(`<path d="M20 8h24l14 14-8 8-6-6v34H20V24l-6 6-8-8z" fill="${c}" stroke="#243447" stroke-width="2"/><path d="M26 8l6 16 6-16" fill="none" stroke="${c === PALETTE.creme ? PALETTE.marine : PALETTE.creme}" stroke-width="3"/><rect x="20" y="34" width="24" height="6" fill="${c === PALETTE.marine ? PALETTE.corail : PALETTE.marine}"/>`),
  geta: (c) => svg(`<rect x="12" y="30" width="40" height="8" rx="3" fill="#7a5236"/><rect x="16" y="38" width="6" height="10" fill="#5c3c26"/><rect x="42" y="38" width="6" height="10" fill="#5c3c26"/><path d="M22 30q10-16 20 0" fill="none" stroke="${c}" stroke-width="4"/>`),
  sac: svg(`<rect x="16" y="14" width="32" height="40" rx="8" fill="${PALETTE.marine}"/><rect x="20" y="32" width="24" height="12" rx="3" fill="${PALETTE.corail}"/><path d="M24 14q8-10 16 0" stroke="${PALETTE.marine}" stroke-width="4" fill="none"/>`),
  sacoche: svg(`<path d="M10 6l38 30" stroke="${PALETTE.marine}" stroke-width="4"/><rect x="30" y="32" width="26" height="20" rx="4" fill="${PALETTE.marine}"/><rect x="30" y="32" width="26" height="8" rx="3" fill="${PALETTE.corail}"/>`),
  aucun: svg('<circle cx="32" cy="32" r="18" fill="none" stroke="#9bb3d6" stroke-width="4"/><path d="M19 45l26-26" stroke="#9bb3d6" stroke-width="4"/>'),
  katana: svg(`<path d="M10 54L46 18" stroke="#1d1f24" stroke-width="5" stroke-linecap="round"/><path d="M42 14l8 8" stroke="#c9a24a" stroke-width="4"/><path d="M48 16l8-8" stroke="${PALETTE.corail}" stroke-width="5" stroke-linecap="round"/>`),
  homme: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M18 56V38q0-10 14-10t14 10v18z" fill="currentColor"/>'),
  femme: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M32 28q-12 0-12 10l-4 18h32l-4-18q0-10-12-10z" fill="currentColor"/>'),
  neutre: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M19 56l2-18q1-10 11-10t11 10l2 18z" fill="currentColor"/>'),
  tete: (c, coiffure) => {
    const base = `<circle cx="32" cy="36" r="16" fill="#f4d2b8"/><path d="M15 34q0-20 17-20t17 20q-8-8-17-8t-17 8z" fill="${c}"/>`;
    const extra = {
      chonmage: `<rect x="28" y="4" width="8" height="12" rx="4" fill="${c}"/>`,
      tresses: `<circle cx="15" cy="44" r="4" fill="${c}"/><circle cx="15" cy="52" r="3.5" fill="${c}"/><circle cx="49" cy="44" r="4" fill="${c}"/><circle cx="49" cy="52" r="3.5" fill="${c}"/>`,
      chignon: `<circle cx="32" cy="12" r="8" fill="${c}"/><path d="M18 8l28 10" stroke="${PALETTE.corail}" stroke-width="2.5"/>`,
      courte: `<path d="M15 34v12h6V34zM43 34v12h6V34z" fill="${c}"/>`,
    }[coiffure] ?? '';
    return svg(base + extra);
  },
  oeil: (c) => svg(`<path d="M8 34q24-26 48 0q-24 22-48 0z" fill="#fff" stroke="#2b2333" stroke-width="3"/><ellipse cx="32" cy="33" rx="10" ry="12" fill="${c}"/><ellipse cx="32" cy="32" rx="4" ry="6" fill="#1d1830"/><circle cx="28" cy="28" r="3" fill="#fff"/><path d="M6 30q26-30 52 0" fill="none" stroke="#2b2333" stroke-width="5" stroke-linecap="round"/>`),
};

// ---------------------------------------------------------------- Catalogue
const COULEURS_KIMONO = [3, 2, 2, 3, 1, 3]; // rareté (étoiles) par couleur

function catalogue(a) {
  return {
    tenue: [
      {
        id: 'kimono', titre: 'Haut – Kimono', icone: ICONES.kimono('currentColor'), champ: 'kimono',
        info: 'Kimono traditionnel. Sa couleur peut changer à tout moment dans le Sas.',
        cartes: OPTIONS.kimono.map((c, i) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: COULEURS_KIMONO[i], visuel: ICONES.kimono(c) })),
      },
      {
        id: 'geta', titre: 'Chaussures – Geta', icone: ICONES.geta('currentColor'), champ: 'geta',
        info: 'Sandales japonaises en bois à deux dents. Choisis la couleur de la lanière.',
        cartes: OPTIONS.geta.map((c, i) => ({ valeur: c, nom: `Lanière ${NOMS_COULEURS[c].toLowerCase()}`, etoiles: 2 - (i > 1), visuel: ICONES.geta(c) })),
      },
      {
        id: 'accessoire', titre: 'Accessoire – Sac', icone: ICONES.sac, champ: 'accessoire',
        info: 'Sac à dos ou sacoche pour ranger tes objets de quête.',
        cartes: OPTIONS.accessoire.map((o) => ({ valeur: o.id, nom: o.nom, etoiles: o.id === 'aucun' ? 1 : 2, visuel: ICONES[o.id] })),
      },
      {
        id: 'arme', titre: 'Arme – Katana', icone: ICONES.katana, champ: 'katana',
        info: 'Le katana sert pendant les combats contre les boss de niveau.',
        cartes: [
          { valeur: true, nom: 'Katana', etoiles: 3, visuel: ICONES.katana },
          { valeur: false, nom: 'Sans arme', etoiles: 1, visuel: ICONES.aucun },
        ],
      },
    ],
    visage: [
      {
        id: 'genre', titre: 'Silhouette – Genre', icone: ICONES.neutre, champ: 'genre',
        info: 'Homme, femme ou neutre : change la silhouette et les coupes proposées.',
        cartes: OPTIONS.genre.map((g) => ({ valeur: g.id, nom: g.nom, etoiles: 2, visuel: ICONES[g.id] })),
      },
      {
        id: 'coiffure', titre: 'Coiffure – Coupe de cheveux', icone: ICONES.tete('currentColor', 'chignon'), champ: 'coiffure',
        info: 'Les coupes dépendent du genre choisi.',
        cartes: OPTIONS.coiffure[a.genre].map((c) => ({ valeur: c.id, nom: c.nom, etoiles: 3, visuel: ICONES.tete(a.cheveux, c.id) })),
      },
      {
        id: 'cheveux', titre: 'Coiffure – Couleur', icone: ICONES.tete('currentColor', 'courte'), champ: 'cheveux',
        info: 'Couleur des cheveux.',
        cartes: OPTIONS.cheveux.map((c, i) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: i < 2 ? 1 : i < 4 ? 2 : 3, visuel: ICONES.tete(c, a.coiffure) })),
      },
      {
        id: 'yeux', titre: 'Visage – Yeux', icone: ICONES.oeil('currentColor'), champ: 'yeux',
        info: 'Couleur des yeux.',
        cartes: OPTIONS.yeux.map((c, i) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: [2, 1, 2, 3, 3][i], visuel: ICONES.oeil(c) })),
      },
    ],
    identite: [
      { id: 'prenom', titre: 'Identité – Prénom', icone: ICONES.identite, champ: null, info: 'Le prénom sous lequel les gardiens t’appelleront.' },
    ],
  };
}

// ---------------------------------------------------------------- Vestiaire
export function creerVestiaire({ partie, surChangement, surEntrer, surReprendre }) {
  let onglet = 'tenue';
  let categorie = 'kimono';
  let tri = 'rarete';
  const passe = [], futur = [];

  const a = () => partie.apparence;

  function appliquer(champ, valeur) {
    if (a()[champ] === valeur) return;
    passe.push(JSON.stringify(a()));
    futur.length = 0;
    a()[champ] = valeur;
    if (champ === 'genre') a().coiffure = OPTIONS.coiffure[valeur][0].id;
    surChangement();
    rendre();
  }

  function restaurer(depuis, vers) {
    if (!depuis.length) return;
    vers.push(JSON.stringify(a()));
    partie.apparence = JSON.parse(depuis.pop());
    surChangement();
    rendre();
  }

  function rendre() {
    const cat = catalogue(a());
    // Onglets
    for (const b of document.querySelectorAll('#onglets button')) b.classList.toggle('actif', b.dataset.onglet === onglet);
    $('badge-identite').hidden = !!partie.prenom;
    // Catégories
    const liste = cat[onglet];
    if (!liste.some((c) => c.id === categorie)) categorie = liste[0].id;
    const colonne = $('categories');
    colonne.innerHTML = '';
    for (const c of liste) {
      const b = document.createElement('button');
      b.className = `categorie${c.id === categorie ? ' actif' : ''}`;
      b.title = c.titre;
      b.innerHTML = c.icone;
      b.onclick = () => { categorie = c.id; $('info-texte').hidden = true; rendre(); };
      colonne.append(b);
    }
    // Contenu
    const c = liste.find((x) => x.id === categorie);
    $('cat-titre').textContent = c.titre;
    $('info-texte').textContent = c.info;
    const grille = $('cartes');
    grille.innerHTML = '';
    $('champ-prenom').hidden = c.id !== 'prenom';
    $('pied-tri').hidden = c.id === 'prenom';
    if (c.cartes) {
      const cartes = [...c.cartes];
      if (tri === 'rarete') cartes.sort((x, y) => y.etoiles - x.etoiles);
      else cartes.sort((x, y) => x.nom.localeCompare(y.nom, 'fr'));
      for (const carte of cartes) {
        const b = document.createElement('button');
        const choisie = a()[c.champ] === carte.valeur;
        b.className = `carte-objet etoiles-${carte.etoiles}${choisie ? ' choisie' : ''}`;
        b.title = carte.nom;
        b.innerHTML = `${carte.visuel}<span class="nom">${carte.nom}</span><span class="etoiles">${'★'.repeat(carte.etoiles)}</span>`;
        b.onclick = () => appliquer(c.champ, carte.valeur);
        grille.append(b);
      }
    }
    $('annuler').disabled = !passe.length;
    $('retablir').disabled = !futur.length;
  }

  for (const b of document.querySelectorAll('#onglets button')) {
    b.innerHTML = ICONES[b.dataset.onglet];
    b.onclick = () => { onglet = b.dataset.onglet; $('info-texte').hidden = true; rendre(); };
  }
  $('info').onclick = () => { $('info-texte').hidden = !$('info-texte').hidden; };
  $('tri').onchange = (e) => { tri = e.target.value; rendre(); };
  $('annuler').onclick = () => restaurer(passe, futur);
  $('retablir').onclick = () => restaurer(futur, passe);
  $('reinitialiser').onclick = () => {
    passe.push(JSON.stringify(a()));
    futur.length = 0;
    partie.apparence = { ...APPARENCE_DEFAUT };
    surChangement();
    rendre();
  };
  $('prenom').value = partie.prenom;
  $('prenom').oninput = (e) => { partie.prenom = e.target.value.trim(); $('badge-identite').hidden = !!partie.prenom; };
  $('commencer').onclick = surEntrer;
  $('reprendre').onclick = surReprendre;

  rendre();
  return { rendre };
}
