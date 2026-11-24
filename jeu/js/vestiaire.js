// Le Sas : vestiaire de création du personnage (onglets, catégories, cartes à étoiles, historique).
import { OPTIONS, CATEGORIES_DISPONIBLES, MOTIF_PAR_COULEUR, motifDe, accessoireDe, armeDe, ceintureDe } from './personnage.js';
import { PALETTE } from './niveaux.js';
import { t, LANGUES, langueActuelle } from './i18n.js';

const $ = (id) => document.getElementById(id);

const NOMS_COULEURS = {
  [PALETTE.corail]: 'Corail', [PALETTE.rose]: 'Rose sakura', [PALETTE.bleu]: 'Bleu ciel',
  [PALETTE.marine]: 'Marine', [PALETTE.creme]: 'Crème', [PALETTE.rosePale]: 'Rose pâle',
  '#1f1f24': 'Noir', '#3b3e45': 'Anthracite', '#d9c6a3': 'Beige', '#f7f4ee': 'Blanc',
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
  // aperçu d'un motif de kimono dans la couleur c (teintes d'accompagnement comme dans le jeu)
  motif: (c, id) => {
    const lum = (() => { const n = parseInt((c.length === 7 ? c : '#ff696a').slice(1), 16); return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255; })();
    const A = lum > 0.8 ? PALETTE.corail : lum > 0.45 ? '#fbf6ee' : PALETTE.rose;
    const L = lum > 0.45 ? 'rgba(36,52,71,.65)' : 'rgba(155,179,214,.8)';
    const fleur = (x, y, r, f) => [0, 1, 2, 3, 4].map((i) => `<circle cx="${(x + Math.cos(i * 1.2566 - 1.57) * r * 0.55).toFixed(1)}" cy="${(y + Math.sin(i * 1.2566 - 1.57) * r * 0.55).toFixed(1)}" r="${(r * 0.5).toFixed(1)}" fill="${f}"/>`).join('') + `<circle cx="${x}" cy="${y}" r="${r * 0.22}" fill="#e2b552"/>`;
    const contenu = {
      sakura: fleur(20, 20, 9, A) + fleur(44, 30, 7, PALETTE.creme) + fleur(26, 46, 8, A) + fleur(48, 52, 5, PALETTE.creme),
      asanoha: [0, 1, 2].map((i) => [0, 1, 2, 3, 4, 5].map((k) => `<path d="M${12 + i * 20} 32l${(Math.cos(k * 1.047) * 10).toFixed(1)} ${(Math.sin(k * 1.047) * 10).toFixed(1)}" stroke="${L}" stroke-width="1.6"/>`).join('')).join('') + `<path d="M2 22h60M2 42h60M7 12l20 40M27 12l20 40M47 12l12 24M17 52l20-40M37 52l20-40" stroke="${L}" stroke-width="1.2" opacity=".7"/>`,
      nuages: `<path d="M4 18q8-6 16 0t16 0 16 0 16 0M4 50q8-6 16 0t16 0 16 0" stroke="${L}" stroke-width="2" fill="none"/><g fill="${A}" stroke="#c9a24a" stroke-width="1.5"><path d="M10 38a6 6 0 0 1 8-6a8 8 0 0 1 14 2a5 5 0 0 1 2 8H12a4 4 0 0 1-2-4z"/><path d="M34 26a5 5 0 0 1 7-5a7 7 0 0 1 12 2a4 4 0 0 1 2 7H36a4 4 0 0 1-2-4z"/></g>`,
      vagues: `<path d="M2 16q8-6 15 0t15 0 15 0 15 0M2 28q8-6 15 0t15 0 15 0 15 0M2 40q8-6 15 0t15 0 15 0 15 0M2 52q8-6 15 0t15 0 15 0 15 0" stroke="${L}" stroke-width="1.8" fill="none"/>` + fleur(20, 24, 8, A) + fleur(44, 44, 7, PALETTE.creme),
      seigaiha: [[0, 52], [20, 52], [40, 52], [60, 52], [10, 40], [30, 40], [50, 40], [0, 28], [20, 28], [40, 28], [60, 28], [10, 16], [30, 16], [50, 16]].reverse()
        .map(([x, y], i) => [10, 7, 4].map((r, k) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${k ? 'none' : [c, A, PALETTE.bleu, c][i % 4]}" stroke="${L}" stroke-width="1.2"/>`).join('')).join(''),
      uni: '',
    }[id] ?? '';
    return svg(`<defs><clipPath id="cm-${id}"><path d="M20 8h24l14 14-8 8-6-6v34H20V24l-6 6-8-8z"/></clipPath></defs><g clip-path="url(#cm-${id})"><rect width="64" height="64" fill="${c}"/>${contenu}</g><path d="M20 8h24l14 14-8 8-6-6v34H20V24l-6 6-8-8z" fill="none" stroke="#243447" stroke-width="2"/>`);
  },
  geta: (c) => svg(`<rect x="12" y="30" width="40" height="8" rx="3" fill="#7a5236"/><rect x="16" y="38" width="6" height="10" fill="#5c3c26"/><rect x="42" y="38" width="6" height="10" fill="#5c3c26"/><path d="M22 30q10-16 20 0" fill="none" stroke="${c}" stroke-width="4"/>`),
  sac: svg(`<rect x="16" y="14" width="32" height="40" rx="8" fill="${PALETTE.marine}"/><rect x="20" y="32" width="24" height="12" rx="3" fill="${PALETTE.corail}"/><path d="M24 14q8-10 16 0" stroke="${PALETTE.marine}" stroke-width="4" fill="none"/>`),
  sacoche: svg(`<path d="M10 6l38 30" stroke="${PALETTE.marine}" stroke-width="4"/><rect x="30" y="32" width="26" height="20" rx="4" fill="${PALETTE.marine}"/><rect x="30" y="32" width="26" height="8" rx="3" fill="${PALETTE.corail}"/>`),
  // accessoires assortis : couleur du kimono c
  ombrelle: (c) => svg(`<path d="M6 30Q32 0 58 30Z" fill="${c}" stroke="#243447" stroke-width="2"/><path d="M32 8L14 30M32 8L24 30M32 8L40 30M32 8L50 30" stroke="#5a3a26" stroke-width="1.4" opacity=".6"/><path d="M32 30v26q0 4-4 4" fill="none" stroke="#7a5236" stroke-width="3"/><circle cx="32" cy="9" r="3" fill="#243447"/>`),
  eventail: (c) => svg(`<path d="M32 54L6 26A36 36 0 0 1 58 26Z" fill="${c}" stroke="#243447" stroke-width="2"/><path d="M32 54L12 20M32 54L22 13M32 54V11M32 54L42 13M32 54L52 20" stroke="#c9a46a" stroke-width="1.6" opacity=".8"/><circle cx="32" cy="54" r="3" fill="#3a2a24"/>`),
  // baguettes à cheveux
  baguetteBois: svg('<path d="M14 56L46 10" stroke="#c9a46a" stroke-width="4" stroke-linecap="round"/><path d="M50 56L18 10" stroke="#c9a46a" stroke-width="4" stroke-linecap="round"/><circle cx="44" cy="13" r="3" fill="#ff696a"/><circle cx="41" cy="18" r="3" fill="#ff696a"/><circle cx="20" cy="13" r="3" fill="#ff696a"/><circle cx="23" cy="18" r="3" fill="#ff696a"/>'),
  baguetteSakura: svg(`<path d="M12 58L40 18" stroke="#3a2620" stroke-width="4" stroke-linecap="round"/>${[[40, 16, 9, '#fbf3f2'], [50, 24, 6, '#f5cacc'], [32, 10, 5, '#f8a0ab']].map(([x, y, r, c]) => [0, 1, 2, 3, 4].map((i) => `<circle cx="${x + Math.cos(i * 1.2566) * r * 0.6}" cy="${y + Math.sin(i * 1.2566) * r * 0.6}" r="${r * 0.55}" fill="${c}" stroke="#d98a9a" stroke-width=".6"/>`).join('') + `<circle cx="${x}" cy="${y}" r="${r * 0.25}" fill="#e2b552"/>`).join('')}<path d="M44 24v18" stroke="#e2b552" stroke-width="1.2"/><circle cx="44" cy="44" r="2.5" fill="#fbf8f2"/><path d="M41 52l3-6 3 6z" fill="#f08aa0"/>`),
  baguetteMomiji: svg('<path d="M12 58L48 8" stroke="#e2b552" stroke-width="3.5" stroke-linecap="round"/><circle cx="46" cy="11" r="3.5" fill="#e2b552"/><path d="M42 16v34" stroke="#e2b552" stroke-width="1.2"/><path d="M42 20l3 4 4-1-2 4 3 3-4 1v4l-4-3-4 3v-4l-4-1 3-3-2-4 4 1z" fill="#d8452f"/><path d="M42 34l2.4 3 3-.7-1.5 3 2.3 2.3-3 .8v3l-3.2-2.3-3.2 2.3v-3l-3-.8 2.3-2.3-1.5-3 3 .7z" fill="#e98a2c"/><circle cx="42" cy="52" r="2.5" fill="#c0352b"/>'),
  ceinture: (c) => svg(`<path d="M8 22h48v20H8z" fill="${c}" stroke="#243447" stroke-width="2"/><path d="M8 28h48" stroke="#243447" stroke-width="1" opacity=".35"/><rect x="38" y="18" width="12" height="28" rx="3" fill="${c}" stroke="#243447" stroke-width="2"/>`),
  aucun: svg('<circle cx="32" cy="32" r="18" fill="none" stroke="#9bb3d6" stroke-width="4"/><path d="M19 45l26-26" stroke="#9bb3d6" stroke-width="4"/>'),
  katana: svg(`<path d="M10 54L46 18" stroke="#1d1f24" stroke-width="5" stroke-linecap="round"/><path d="M42 14l8 8" stroke="#c9a24a" stroke-width="4"/><path d="M48 16l8-8" stroke="${PALETTE.corail}" stroke-width="5" stroke-linecap="round"/>`),
  homme: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M18 56V38q0-10 14-10t14 10v18z" fill="currentColor"/>'),
  femme: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M32 28q-12 0-12 10l-4 18h32l-4-18q0-10-12-10z" fill="currentColor"/>'),
  neutre: svg('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M19 56l2-18q1-10 11-10t11 10l2 18z" fill="currentColor"/>'),
  // Tête de l'animal choisi (shiba ou panda) + coiffure dessinée dans la couleur c
  tete: (c, coiffure, espece = 'shiba') => {
    const base = espece === 'pandaRoux'
      ? '<path d="M12 28l5-17 13 9M52 28l-5-17-13 9" fill="#c45a26"/><path d="M15 25l3-10 7 6M49 25l-3-10-7 6" fill="#fbf5ec"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#c45a26"/><ellipse cx="32" cy="46" rx="12" ry="7.5" fill="#fbf5ec"/><ellipse cx="17" cy="44" rx="6" ry="5" fill="#fbf5ec"/><ellipse cx="47" cy="44" rx="6" ry="5" fill="#fbf5ec"/><circle cx="25" cy="30" r="3" fill="#fbf5ec"/><circle cx="39" cy="30" r="3" fill="#fbf5ec"/><circle cx="25" cy="37" r="2.4" fill="#2a1d1a"/><circle cx="39" cy="37" r="2.4" fill="#2a1d1a"/><ellipse cx="32" cy="43" rx="2.6" ry="1.8" fill="#2a1d1a"/>'
      : espece === 'capybara'
      ? '<circle cx="18" cy="20" r="5" fill="#6e4a32"/><circle cx="46" cy="20" r="5" fill="#6e4a32"/><ellipse cx="32" cy="34" rx="19" ry="16" fill="#9a6d4b"/><rect x="18" y="36" width="28" height="18" rx="9" fill="#8a5f40"/><circle cx="23" cy="31" r="2.2" fill="#3a2a22"/><circle cx="41" cy="31" r="2.2" fill="#3a2a22"/><rect x="25" y="42" width="14" height="6" rx="3" fill="#3a2a22"/>'
      : espece === 'panda'
      ? '<circle cx="15" cy="20" r="7" fill="#1f1f24"/><circle cx="49" cy="20" r="7" fill="#1f1f24"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#fbfaf6" stroke="#3b3360" stroke-width="2"/><ellipse cx="24.5" cy="38" rx="4.5" ry="6" transform="rotate(25 24.5 38)" fill="#1f1f24"/><ellipse cx="39.5" cy="38" rx="4.5" ry="6" transform="rotate(-25 39.5 38)" fill="#1f1f24"/><circle cx="25" cy="37" r="1.4" fill="#fff"/><circle cx="39" cy="37" r="1.4" fill="#fff"/><ellipse cx="32" cy="44" rx="2.6" ry="1.8" fill="#1f1f24"/>'
      : '<path d="M14 26l6-16 10 10M50 26l-6-16-10 10" fill="#eba04e"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#eba04e"/><ellipse cx="32" cy="45" rx="12" ry="8" fill="#fbf1e2"/><circle cx="25" cy="37" r="2.4" fill="#3a2a26"/><circle cx="39" cy="37" r="2.4" fill="#3a2a26"/><ellipse cx="32" cy="43" rx="2.6" ry="1.8" fill="#3a2a26"/>';
    const extra = {
      chonmage: `<path d="M12 40l2-14q4-12 18-12t18 12l2 14-5-6-1 8-4-9-3 7-3-9-3 7-3-9-4 9-1-8z" fill="${c}"/><path d="M40 16l12-6-4 8z" fill="${c}"/><path d="M26 14l2-8 3 7 3-8 2 9z" fill="${c}"/>`,
      chignon: `<path d="M13 32q2-18 19-18t19 18q-6-8-19-8t-19 8z" fill="${c}"/><circle cx="32" cy="58" r="7" fill="${c}"/><path d="M20 50l24 14M44 50L20 64" stroke="#c9a46a" stroke-width="2.4"/><circle cx="21" cy="51" r="2" fill="${PALETTE.corail}"/><circle cx="43" cy="51" r="2" fill="${PALETTE.corail}"/>`,
      frange: `<path d="M13 32q0-20 19-21t19 21q-2-5-5-8l-2 9-3-10-3 11-3-11-3 11-3-11-2 10-3-9q-3 3-5 8z" fill="${c}"/><path d="M26 10l3-5 3 5 3-5 2 6z" fill="${c}"/>`,
      tresses: `<path d="M13 34q2-20 19-20t19 20h-4q0-8-15-8t-15 8z" fill="${c}"/><path d="M18 30h28v5H18z" fill="${c}"/><circle cx="10" cy="42" r="4" fill="${c}"/><circle cx="11" cy="50" r="3.6" fill="${c}"/><circle cx="12" cy="57" r="3" fill="${c}"/><circle cx="54" cy="42" r="4" fill="${c}"/><circle cx="53" cy="50" r="3.6" fill="${c}"/><circle cx="52" cy="57" r="3" fill="${c}"/><circle cx="48" cy="20" r="4" fill="#fbf8f2"/>`,
    }[coiffure] ?? '';
    return svg(base + extra);
  },
  shiba: svg('<path d="M14 8l12 14M50 8L38 22" stroke="#e48a3c" stroke-width="10" stroke-linecap="round"/><circle cx="32" cy="34" r="22" fill="#e48a3c"/><path d="M14 40q18 22 36 0q-6 14-18 14t-18-14z" fill="#f7ead8"/><ellipse cx="32" cy="44" rx="10" ry="8" fill="#f7ead8"/><circle cx="24" cy="32" r="4" fill="#2b2224"/><circle cx="40" cy="32" r="4" fill="#2b2224"/><ellipse cx="32" cy="40" rx="4" ry="2.6" fill="#2b2224"/><circle cx="23" cy="31" r="1.4" fill="#fff"/><circle cx="39" cy="31" r="1.4" fill="#fff"/>'),
  pandaRoux: svg('<path d="M10 22l6-16 14 10M54 22l-6-16-14 10" fill="#c45a26"/><path d="M14 19l3-8 8 6M50 19l-3-8-8 6" fill="#fbf5ec"/><circle cx="32" cy="34" r="22" fill="#c45a26"/><ellipse cx="32" cy="44" rx="13" ry="9" fill="#fbf5ec"/><ellipse cx="14" cy="40" rx="7" ry="6" fill="#fbf5ec"/><ellipse cx="50" cy="40" rx="7" ry="6" fill="#fbf5ec"/><circle cx="23" cy="24" r="3.5" fill="#fbf5ec"/><circle cx="41" cy="24" r="3.5" fill="#fbf5ec"/><path d="M24 34l-3 8M40 34l3 8" stroke="#7a2e14" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="31" r="3.6" fill="#2a1d1a"/><circle cx="40" cy="31" r="3.6" fill="#2a1d1a"/><circle cx="23" cy="30" r="1.2" fill="#fff"/><circle cx="39" cy="30" r="1.2" fill="#fff"/><ellipse cx="32" cy="40" rx="4" ry="2.6" fill="#2a1d1a"/>'),
  capybara: svg('<circle cx="17" cy="15" r="6" fill="#6e4a32"/><circle cx="47" cy="15" r="6" fill="#6e4a32"/><ellipse cx="32" cy="30" rx="21" ry="19" fill="#9a6d4b"/><rect x="15" y="32" width="34" height="24" rx="12" fill="#8a5f40"/><circle cx="22" cy="26" r="2.8" fill="#3a2a22"/><circle cx="42" cy="26" r="2.8" fill="#3a2a22"/><circle cx="21" cy="25" r="1" fill="#fff"/><circle cx="41" cy="25" r="1" fill="#fff"/><rect x="23" y="40" width="18" height="7" rx="3.5" fill="#3a2a22"/><path d="M28 51q4 3 8 0" stroke="#3a2a22" stroke-width="2" fill="none" stroke-linecap="round"/>'),
  panda: svg('<circle cx="15" cy="14" r="8" fill="#2a2a30"/><circle cx="49" cy="14" r="8" fill="#2a2a30"/><circle cx="32" cy="34" r="22" fill="#f6f5f0" stroke="#3b3360" stroke-width="2"/><ellipse cx="23" cy="33" rx="6" ry="8" transform="rotate(25 23 33)" fill="#2a2a30"/><ellipse cx="41" cy="33" rx="6" ry="8" transform="rotate(-25 41 33)" fill="#2a2a30"/><circle cx="24" cy="32" r="3" fill="#fff"/><circle cx="40" cy="32" r="3" fill="#fff"/><circle cx="24" cy="32" r="2" fill="#1f1f24"/><circle cx="40" cy="32" r="2" fill="#1f1f24"/><ellipse cx="32" cy="42" rx="4" ry="2.6" fill="#1f1f24"/>'),
  langue: svg('<circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="4"/><path d="M12 32h40M32 12q-12 20 0 40M32 12q12 20 0 40" fill="none" stroke="currentColor" stroke-width="3"/>'),
  musique: svg('<path d="M24 46V14l26-6v32" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><ellipse cx="18" cy="46" rx="8" ry="6" fill="currentColor"/><ellipse cx="44" cy="40" rx="8" ry="6" fill="currentColor"/>'),
  codeLangue: (code) => svg(`<rect x="6" y="14" width="52" height="36" rx="10" fill="#ddd0f5"/><text x="32" y="40" text-anchor="middle" font-family="Space Mono, monospace" font-weight="700" font-size="20" fill="#3b3360">${code}</text>`),
  emoji: (e) => svg(`<text x="32" y="44" text-anchor="middle" font-size="34">${e}</text>`),
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
        id: 'motif', titre: 'Kimono – Motif', icone: ICONES.motif(a.kimono ?? PALETTE.rose, motifDe(a)), champ: 'motif', visible: !!a.kimono,
        info: 'Le motif du tissu. Chaque couleur a son motif, mais tu peux en choisir un autre.',
        cartes: OPTIONS.motif.map((m) => ({ valeur: m.id, nom: m.nom, etoiles: m.id === 'uni' ? 1 : 3, visuel: ICONES.motif(a.kimono ?? PALETTE.rose, m.id), choisie: motifDe(a) === m.id })),
      },
      {
        id: 'ceinture', titre: 'Kimono – Ceinture', icone: ICONES.ceinture('currentColor'), champ: 'ceinture', visible: !!a.kimono,
        info: 'La couleur de la ceinture (obi) du kimono.',
        cartes: OPTIONS.ceinture.map((c) => ({ valeur: c, nom: NOMS_COULEURS[c], etoiles: 2, visuel: ICONES.ceinture(c), choisie: ceintureDe(a) === c })),
      },
      {
        id: 'geta', titre: 'Chaussures – Geta', icone: ICONES.geta('currentColor'), champ: 'geta',
        info: 'Sandales japonaises en bois à deux dents. Choisis la couleur de la lanière.',
        cartes: [{ valeur: null, nom: 'Pieds nus', etoiles: 1, visuel: ICONES.aucun },
          ...OPTIONS.geta.map((c, i) => ({ valeur: c, nom: t('Lanière {couleur}', { couleur: langueActuelle() === 'de' ? t(NOMS_COULEURS[c]) : t(NOMS_COULEURS[c]).toLowerCase() }), etoiles: 2 - (i > 1), visuel: ICONES.geta(c) }))],
      },
      {
        id: 'accessoire', titre: 'Accessoire – Sac', icone: ICONES.sac, champ: 'accessoire',
        info: 'Sac à dos ou sacoche pour ranger tes objets de quête.',
        cartes: [...OPTIONS.accessoire, { id: 'aucun', nom: 'Aucun' }].map((o) => ({ valeur: o.id, nom: o.nom, etoiles: o.id === 'aucun' ? 1 : 2, visuel: ICONES[o.id], choisie: accessoireDe(a) === o.id })),
      },
      {
        id: 'arme', titre: 'À la main', icone: ICONES.katana, champ: 'arme',
        info: 'Un seul objet à la main : le katana, l’ombrelle ou l’éventail. L’ombrelle et l’éventail prennent la couleur de ton kimono.',
        cartes: [...OPTIONS.arme.map((o) => ({ valeur: o.id, nom: o.nom, etoiles: 3,
          visuel: typeof ICONES[o.id] === 'function' ? ICONES[o.id](a.kimono ?? PALETTE.corail) : ICONES[o.id], choisie: armeDe(a) === o.id })),
        { valeur: null, nom: 'Les mains libres', etoiles: 1, visuel: ICONES.aucun, choisie: armeDe(a) === null }],
      },
    ],
    visage: [
      {
        id: 'espece', titre: 'Silhouette – Espèce', icone: ICONES[a.espece] ?? ICONES.shiba, champ: 'espece',
        info: 'Shiba roux au ventre crème, panda noir et blanc, panda roux à la queue annelée ou capybara tout tranquille.',
        cartes: OPTIONS.espece.map((e) => ({ valeur: e.id, nom: e.nom, etoiles: 3, visuel: ICONES[e.id] })),
      },
      {
        id: 'genre', titre: 'Silhouette – Genre', icone: ICONES.neutre, champ: 'genre',
        info: 'Homme, femme ou neutre : change la silhouette et les coupes proposées.',
        cartes: OPTIONS.genre.map((g) => ({ valeur: g.id, nom: g.nom, etoiles: 2, visuel: ICONES[g.id] })),
      },
      {
        id: 'coiffure', titre: 'Coiffure – Coupe de cheveux', icone: ICONES.tete(a.cheveux, 'chignon', a.espece), champ: 'coiffure',
        info: 'Franges et tresses, chignon et baguettes, chonmage moderne ou coupe courte à frange.',
        cartes: (Array.isArray(OPTIONS.coiffure) ? OPTIONS.coiffure : OPTIONS.coiffure[a.genre]).map((c) => ({ valeur: c.id, nom: c.nom, etoiles: 3, visuel: ICONES.tete(a.cheveux, c.id, a.espece) })),
      },
      {
        id: 'baguettes', titre: 'Coiffure – Baguettes', icone: ICONES.baguetteSakura, champ: 'baguettes', visible: a.coiffure === 'chignon',
        info: 'Les baguettes plantées dans ton chignon.',
        cartes: OPTIONS.baguettes.map((b) => ({ valeur: b.id, nom: b.nom, etoiles: b.id === 'bois' ? 2 : 3, visuel: ICONES['baguette' + b.id[0].toUpperCase() + b.id.slice(1)] })),
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
      {
        id: 'langue', titre: 'Identité – Langue', icone: ICONES.langue, champ: 'langue', partie: true,
        info: 'La langue de tout le jeu : dialogues, épreuves et combats.',
        cartes: LANGUES.map((l) => ({ valeur: l.id, nom: l.nom, etoiles: 3, visuel: ICONES.codeLangue(l.code), brut: true })),
      },
      { id: 'prenom', titre: 'Identité – Prénom', icone: ICONES.identite, champ: null, info: 'Le prénom sous lequel les gardiens t’appelleront.' },
    ],
  };
}

// ---------------------------------------------------------------- Cléo, guide du Sas
// Une explication par catégorie, dans l'ordre où Cléo fait passer le joueur.
const ETAPES = [
  { onglet: 'identite', categorie: 'langue', texte: 'Bienvenue dans le Sas ! Je suis Cléo et je vais t’aider à préparer ton personnage. Choisis d’abord la langue du jeu.' },
  { onglet: 'visage', categorie: 'espece', texte: 'Choisis maintenant ton espèce parmi les cartes à gauche.' },
  { onglet: 'visage', categorie: 'coiffure', texte: 'Choisis maintenant ta coupe de cheveux. Astuce : fais glisser ton personnage pour le faire tourner, et zoome avec la molette pour voir son visage.' },
  { onglet: 'visage', categorie: 'baguettes', texte: 'Ton chignon a besoin de baguettes ! Choisis leur modèle.' },
  { onglet: 'visage', categorie: 'cheveux', texte: 'Et la couleur de tes cheveux ? Prends celle qui te ressemble… ou pas du tout !' },
  { onglet: 'tenue', categorie: 'kimono', texte: 'Passons à la tenue ! Choisis la couleur de ton kimono. La carte 🎨 te laisse prendre n’importe quelle couleur.' },
  { onglet: 'tenue', categorie: 'motif', texte: 'Chaque couleur de kimono a son motif. Garde-le ou choisis-en un autre.' },
  { onglet: 'tenue', categorie: 'ceinture', texte: 'Et la ceinture (obi) : noire, anthracite, beige ou blanche ?' },
  { onglet: 'tenue', categorie: 'geta', texte: 'Les geta sont des sandales japonaises en bois. Choisis les tiennes.' },
  { onglet: 'tenue', categorie: 'accessoire', texte: 'Un sac pour transporter tes objets de quête ? Choisis celui qui t’accompagnera.' },
  { onglet: 'tenue', categorie: 'arme', texte: 'Que tiens-tu à la main ? Un katana, une ombrelle ou un éventail : un seul au choix !' },
  { onglet: 'identite', categorie: 'prenom', texte: 'Dernière étape : écris ton prénom, les gardiens des îles t’appelleront ainsi. Quand tu es prêt·e, clique sur « Entrer dans le Sas » pour commencer l’aventure !' },
];

// ---------------------------------------------------------------- Vestiaire
export function creerVestiaire({ partie, surChangement, surEntrer, surChoixPartie }) {
  // on commence par la langue (onglet Identité), pour que tout le reste soit dans la bonne langue
  let onglet = 'identite';
  let categorie = 'langue';

  const a = () => partie.apparence;

  function appliquer(champ, valeur, surPartie = false) {
    if (surPartie) {
      // langue : réglage de la partie, pas de l'apparence
      partie[champ] = valeur;
      surChoixPartie?.(champ, valeur);
      rendre();
      return;
    }
    delete a().accessoires; // ancienne liste de test, remplacée par `accessoire` et `arme`
    if (champ === 'arme') a().katana = valeur === 'katana';
    if (a()[champ] === valeur) return;
    a()[champ] = valeur;
    // une nouvelle couleur de kimono reprend le motif qui lui va (on peut le changer ensuite)
    if (champ === 'kimono') a().motif = MOTIF_PAR_COULEUR[valeur] ?? a().motif;
    surChangement();
    rendre();
  }

  function rendre() {
    const cat = catalogue(a());
    if (CATEGORIES_DISPONIBLES) {
      // On ne propose que ce qui est déjà modélisé ; le reste reviendra au fil des étapes
      for (const k of Object.keys(cat)) cat[k] = cat[k].filter((c) => CATEGORIES_DISPONIBLES.includes(c.id) || c.partie);
    }
    // toutes les catégories (même cachées) : le guide compte un total d'étapes fixe
    const toutes = Object.fromEntries(Object.entries(cat).map(([k, v]) => [k, [...v]]));
    // catégories qui n'ont de sens qu'avec un kimono ou un chignon
    for (const k of Object.keys(cat)) cat[k] = cat[k].filter((c) => c.visible !== false);
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
    majGuide(cat, toutes);
    const colonne = $('categories');
    colonne.innerHTML = '';
    for (const c of liste) {
      const b = document.createElement('button');
      b.className = `categorie${c.id === categorie ? ' actif' : ''}`;
      b.title = t(c.titre);
      b.innerHTML = c.icone;
      b.onclick = () => { categorie = c.id; $('info-texte').hidden = true; rendre(); };
      colonne.append(b);
    }
    // Contenu
    const c = liste.find((x) => x.id === categorie);
    $('cat-titre').textContent = t(c.titre);
    $('info-texte').textContent = t(c.info);
    const grille = $('cartes');
    grille.innerHTML = '';
    grille.classList.toggle('cartes-langue', c.id === 'langue');
    $('champ-prenom').hidden = c.id !== 'prenom';
    if (c.cartes) {
      for (const carte of c.cartes) {
        const b = document.createElement('button');
        const choisie = carte.choisie ?? (c.partie ? partie[c.champ] : a()[c.champ]) === carte.valeur;
        const nom = carte.brut ? carte.nom : t(carte.nom); // les noms de langues restent dans leur propre langue
        b.className = `carte-objet etoiles-${carte.etoiles}${choisie ? ' choisie' : ''}`;
        b.title = nom;
        b.innerHTML = `${carte.visuel}<span class="nom">${nom}</span><span class="etoiles">${'★'.repeat(carte.etoiles)}</span>`;
        b.onclick = () => appliquer(c.champ, carte.valeur, c.partie);
        grille.append(b);
      }
      if (c.id === 'kimono') {
        // Couleur libre : n'importe quelle teinte en plus de celles de la charte
        const libre = !!a().kimono && !OPTIONS.kimono.includes(a().kimono);
        const carte = document.createElement('label');
        carte.className = `carte-objet etoiles-3 carte-libre${libre ? ' choisie' : ''}`;
        carte.title = t('Couleur libre');
        const valeur = a().kimono ?? PALETTE.corail;
        carte.innerHTML = `${ICONES.kimono(valeur)}<span class="nom">${t('Couleur libre')}</span><span class="etoiles">🎨</span>`;
        const champ = document.createElement('input');
        champ.type = 'color';
        champ.value = valeur.length === 7 ? valeur.toLowerCase() : '#ff696a';
        champ.oninput = (e) => appliquer('kimono', e.target.value);
        carte.append(champ);
        grille.append(carte);
      }
    }
  }

  // Cléo explique la catégorie affichée et propose de passer à la suivante
  // Le total ne change pas quand une catégorie apparaît (motif et ceinture avec un kimono, baguettes avec un chignon) :
  // les étapes cachées sont comptées, et « Étape suivante » saute simplement celles qui ne sont pas disponibles.
  function majGuide(cat, toutes = cat) {
    const etapes = ETAPES.filter((e) => toutes[e.onglet]?.some((c) => c.id === e.categorie));
    const dispo = (e) => cat[e.onglet]?.some((c) => c.id === e.categorie);
    const i = etapes.findIndex((e) => e.categorie === categorie);
    const etape = etapes[i];
    $('guide-texte').textContent = t(etape?.texte ?? 'Choisis ce qui te plaît dans les cartes à gauche.');
    $('guide-etape').textContent = i >= 0 ? t('Étape {n} / {total}', { n: i + 1, total: etapes.length }) : '';
    const suivante = etapes.slice(i + 1).find(dispo);
    $('guide-suivant').hidden = !suivante;
    $('guide-suivant').onclick = () => {
      onglet = suivante.onglet;
      categorie = suivante.categorie;
      $('info-texte').hidden = true;
      rendre();
    };
  }
  const reduireGuide = (reduit) => {
    $('guide-sas').classList.toggle('reduit', reduit);
    $('guide-bulle').hidden = reduit;
    $('guide-avatar').title = reduit ? t('Afficher les explications de Cléo') : t('Cléo, ta guide');
  };
  $('guide-reduire').onclick = () => reduireGuide(true);
  $('guide-avatar').onclick = () => reduireGuide(!$('guide-bulle').hidden);

  for (const b of document.querySelectorAll('#onglets button')) {
    b.innerHTML = ICONES[b.dataset.onglet];
    b.onclick = () => { onglet = b.dataset.onglet; $('info-texte').hidden = true; rendre(); };
  }
  $('info').onclick = () => { $('info-texte').hidden = !$('info-texte').hidden; };
  $('prenom').value = partie.prenom;
  $('prenom').oninput = (e) => { partie.prenom = e.target.value.trim(); $('badge-identite').hidden = !!partie.prenom; };
  $('commencer').onclick = surEntrer;

  rendre();
  return { rendre };
}
