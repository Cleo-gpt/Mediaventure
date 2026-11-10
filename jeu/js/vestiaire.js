// Le Sas : vestiaire de création du personnage (onglets, catégories, cartes à étoiles, historique).
import { OPTIONS, CATEGORIES_DISPONIBLES } from './personnage.js';
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
  // Tête de l'animal choisi (shiba ou panda) + coiffure dessinée dans la couleur c
  tete: (c, coiffure, espece = 'shiba') => {
    const base = espece === 'panda'
      ? '<circle cx="15" cy="20" r="7" fill="#1f1f24"/><circle cx="49" cy="20" r="7" fill="#1f1f24"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#fbfaf6"/><ellipse cx="24.5" cy="38" rx="4.5" ry="6" transform="rotate(25 24.5 38)" fill="#1f1f24"/><ellipse cx="39.5" cy="38" rx="4.5" ry="6" transform="rotate(-25 39.5 38)" fill="#1f1f24"/><circle cx="25" cy="37" r="1.4" fill="#fff"/><circle cx="39" cy="37" r="1.4" fill="#fff"/><ellipse cx="32" cy="44" rx="2.6" ry="1.8" fill="#1f1f24"/>'
      : '<path d="M14 26l6-16 10 10M50 26l-6-16-10 10" fill="#eba04e"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#eba04e"/><ellipse cx="32" cy="45" rx="12" ry="8" fill="#fbf1e2"/><circle cx="25" cy="37" r="2.4" fill="#3a2a26"/><circle cx="39" cy="37" r="2.4" fill="#3a2a26"/><ellipse cx="32" cy="43" rx="2.6" ry="1.8" fill="#3a2a26"/>';
    const extra = {
      chonmage: `<path d="M12 40l2-14q4-12 18-12t18 12l2 14-5-6-1 8-4-9-3 7-3-9-3 7-3-9-4 9-1-8z" fill="${c}"/><path d="M40 16l12-6-4 8z" fill="${c}"/><path d="M26 14l2-8 3 7 3-8 2 9z" fill="${c}"/>`,
      chignon: `<path d="M13 32q2-18 19-18t19 18q-6-8-19-8t-19 8z" fill="${c}"/><circle cx="32" cy="58" r="7" fill="${c}"/><path d="M20 50l24 14M44 50L20 64" stroke="#c9a46a" stroke-width="2.4"/><circle cx="21" cy="51" r="2" fill="${PALETTE.corail}"/><circle cx="43" cy="51" r="2" fill="${PALETTE.corail}"/>`,
      tresses: `<path d="M13 34q2-20 19-20t19 20h-4q0-8-15-8t-15 8z" fill="${c}"/><path d="M18 30h28v5H18z" fill="${c}"/><circle cx="10" cy="42" r="4" fill="${c}"/><circle cx="11" cy="50" r="3.6" fill="${c}"/><circle cx="12" cy="57" r="3" fill="${c}"/><circle cx="54" cy="42" r="4" fill="${c}"/><circle cx="53" cy="50" r="3.6" fill="${c}"/><circle cx="52" cy="57" r="3" fill="${c}"/><circle cx="48" cy="20" r="4" fill="#fbf8f2"/>`,
    }[coiffure] ?? '';
    return svg(base + extra);
  },
  shiba: svg('<path d="M14 8l12 14M50 8L38 22" stroke="#e48a3c" stroke-width="10" stroke-linecap="round"/><circle cx="32" cy="34" r="22" fill="#e48a3c"/><path d="M14 40q18 22 36 0q-6 14-18 14t-18-14z" fill="#f7ead8"/><ellipse cx="32" cy="44" rx="10" ry="8" fill="#f7ead8"/><circle cx="24" cy="32" r="4" fill="#2b2224"/><circle cx="40" cy="32" r="4" fill="#2b2224"/><ellipse cx="32" cy="40" rx="4" ry="2.6" fill="#2b2224"/><circle cx="23" cy="31" r="1.4" fill="#fff"/><circle cx="39" cy="31" r="1.4" fill="#fff"/>'),
  panda: svg('<circle cx="15" cy="14" r="8" fill="#2a2a30"/><circle cx="49" cy="14" r="8" fill="#2a2a30"/><circle cx="32" cy="34" r="22" fill="#f6f5f0"/><ellipse cx="23" cy="33" rx="6" ry="8" transform="rotate(25 23 33)" fill="#2a2a30"/><ellipse cx="41" cy="33" rx="6" ry="8" transform="rotate(-25 41 33)" fill="#2a2a30"/><circle cx="24" cy="32" r="3" fill="#fff"/><circle cx="40" cy="32" r="3" fill="#fff"/><circle cx="24" cy="32" r="2" fill="#1f1f24"/><circle cx="40" cy="32" r="2" fill="#1f1f24"/><ellipse cx="32" cy="42" rx="4" ry="2.6" fill="#1f1f24"/>'),
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
        cartes: [{ valeur: null, nom: 'Sans kimono', etoiles: 1, visuel: ICONES.aucun },
          ...OPTIONS.kimono.map((c, i) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: COULEURS_KIMONO[i], visuel: ICONES.kimono(c) }))],
      },
      {
        id: 'geta', titre: 'Chaussures – Geta', icone: ICONES.geta('currentColor'), champ: 'geta',
        info: 'Sandales japonaises en bois à deux dents. Choisis la couleur de la lanière.',
        cartes: [{ valeur: null, nom: 'Pieds nus', etoiles: 1, visuel: ICONES.aucun },
          ...OPTIONS.geta.map((c, i) => ({ valeur: c, nom: `Lanière ${NOMS_COULEURS[c].toLowerCase()}`, etoiles: 2 - (i > 1), visuel: ICONES.geta(c) }))],
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
        id: 'espece', titre: 'Silhouette – Espèce', icone: ICONES[a.espece] ?? ICONES.shiba, champ: 'espece',
        info: 'Shiba roux au ventre crème, ou panda noir et blanc.',
        cartes: OPTIONS.espece.map((e) => ({ valeur: e.id, nom: e.nom, etoiles: 3, visuel: ICONES[e.id] })),
      },
      {
        id: 'genre', titre: 'Silhouette – Genre', icone: ICONES.neutre, champ: 'genre',
        info: 'Homme, femme ou neutre : change la silhouette et les coupes proposées.',
        cartes: OPTIONS.genre.map((g) => ({ valeur: g.id, nom: g.nom, etoiles: 2, visuel: ICONES[g.id] })),
      },
      {
        id: 'coiffure', titre: 'Coiffure – Coupe de cheveux', icone: ICONES.tete(a.cheveux, 'chignon', a.espece), champ: 'coiffure',
        info: 'Franges et tresses, chignon et baguettes, ou chonmage moderne (coupe dégradée).',
        cartes: (Array.isArray(OPTIONS.coiffure) ? OPTIONS.coiffure : OPTIONS.coiffure[a.genre]).map((c) => ({ valeur: c.id, nom: c.nom, etoiles: 3, visuel: ICONES.tete(a.cheveux, c.id, a.espece) })),
      },
      {
        id: 'cheveux', titre: 'Coiffure – Couleur', icone: ICONES.tete(a.cheveux, 'tresses', a.espece), champ: 'cheveux',
        info: 'Couleur de la touffe coiffée.',
        cartes: OPTIONS.cheveux.map((c, i) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: i < 2 ? 1 : i < 4 ? 2 : 3, visuel: ICONES.tete(c, a.coiffure === 'aucune' ? 'tresses' : a.coiffure, a.espece) })),
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
  let onglet = CATEGORIES_DISPONIBLES ? 'visage' : 'tenue';
  let categorie = CATEGORIES_DISPONIBLES ? CATEGORIES_DISPONIBLES[0] : 'kimono';

  const a = () => partie.apparence;

  function appliquer(champ, valeur) {
    if (a()[champ] === valeur) return;
    a()[champ] = valeur;
    surChangement();
    rendre();
  }

  function rendre() {
    const cat = catalogue(a());
    if (CATEGORIES_DISPONIBLES) {
      // On ne propose que ce qui est déjà modélisé ; le reste reviendra au fil des étapes
      for (const k of Object.keys(cat)) cat[k] = cat[k].filter((c) => CATEGORIES_DISPONIBLES.includes(c.id));
    }
    // Onglets
    for (const b of document.querySelectorAll('#onglets button')) {
      if (b.dataset.onglet === 'visage') b.innerHTML = ICONES[a().espece] ?? ICONES.visage;
      b.classList.toggle('actif', b.dataset.onglet === onglet);
      b.hidden = !cat[b.dataset.onglet].length;
    }
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
    if (c.cartes) {
      for (const carte of c.cartes) {
        const b = document.createElement('button');
        const choisie = a()[c.champ] === carte.valeur;
        b.className = `carte-objet etoiles-${carte.etoiles}${choisie ? ' choisie' : ''}`;
        b.title = carte.nom;
        b.innerHTML = `${carte.visuel}<span class="nom">${carte.nom}</span><span class="etoiles">${'★'.repeat(carte.etoiles)}</span>`;
        b.onclick = () => appliquer(c.champ, carte.valeur);
        grille.append(b);
      }
      if (c.id === 'kimono') {
        // Couleur libre : n'importe quelle teinte en plus de celles de la charte
        const libre = !!a().kimono && !OPTIONS.kimono.includes(a().kimono);
        const carte = document.createElement('label');
        carte.className = `carte-objet etoiles-3 carte-libre${libre ? ' choisie' : ''}`;
        carte.title = 'Couleur libre';
        const valeur = a().kimono ?? PALETTE.corail;
        carte.innerHTML = `${ICONES.kimono(valeur)}<span class="nom">Couleur libre</span><span class="etoiles">🎨</span>`;
        const champ = document.createElement('input');
        champ.type = 'color';
        champ.value = valeur.length === 7 ? valeur.toLowerCase() : '#ff696a';
        champ.oninput = (e) => appliquer('kimono', e.target.value);
        carte.append(champ);
        grille.append(carte);
      }
    }
  }

  for (const b of document.querySelectorAll('#onglets button')) {
    b.innerHTML = ICONES[b.dataset.onglet];
    b.onclick = () => { onglet = b.dataset.onglet; $('info-texte').hidden = true; rendre(); };
  }
  $('info').onclick = () => { $('info-texte').hidden = !$('info-texte').hidden; };
  $('prenom').value = partie.prenom;
  $('prenom').oninput = (e) => { partie.prenom = e.target.value.trim(); $('badge-identite').hidden = !!partie.prenom; };
  $('commencer').onclick = surEntrer;
  $('reprendre').onclick = surReprendre;

  rendre();
  return { rendre };
}
