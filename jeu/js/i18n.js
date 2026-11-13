// Traduction du jeu. Le texte français sert de clé : t('Bonjour {prenom} !', { prenom }) cherche la phrase
// dans le dictionnaire de la langue choisie (js/traductions.js) et retombe sur le français si elle n'y est pas.
// Pour ajouter une phrase : l'écrire en français dans le code avec t(…), puis ajouter sa traduction dans traductions.js.
import { TRADUCTIONS } from './traductions.js';

export const LANGUES = [
  { id: 'fr', nom: 'Français', code: 'FR' },
  { id: 'en', nom: 'English', code: 'EN' },
  { id: 'de', nom: 'Deutsch', code: 'DE' },
  { id: 'it', nom: 'Italiano', code: 'IT' },
];

let langue = 'fr';
export const langueActuelle = () => langue;

export function t(francais, valeurs = {}) {
  if (francais == null) return francais;
  const texte = langue === 'fr' ? francais : (TRADUCTIONS[langue]?.[francais] ?? francais);
  return texte.replace(/\{(\w+)\}/g, (m, cle) => (cle in valeurs ? valeurs[cle] : m));
}

// Change la langue et retraduit les textes fixes de la page (éléments marqués data-i18n dans index.html)
export function choisirLangue(id) {
  langue = LANGUES.some((l) => l.id === id) ? id : 'fr';
  document.documentElement.lang = langue;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    el.dataset.fr ??= el.innerHTML.trim();
    el.innerHTML = t(el.dataset.fr);
  }
  for (const el of document.querySelectorAll('[data-i18n-attr]')) {
    for (const attr of el.dataset.i18nAttr.split(',')) {
      const cle = `fr${attr[0].toUpperCase()}${attr.slice(1)}`;
      el.dataset[cle] ??= el.getAttribute(attr) ?? '';
      el.setAttribute(attr, t(el.dataset[cle]));
    }
  }
}
