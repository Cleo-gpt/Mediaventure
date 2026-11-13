// Code du stand Gaïa : il change toutes les heures.
// Il est calculé à partir d'un secret, de la date et de l'heure : le jeu et la liste imprimée
// pour la vendeuse (jeu/codes-gaia.html) donnent toujours le même code, sans internet.
export const SECRET_GAIA = 'vxzxXmo2ur8O9iZi'; // ne plus changer : le PDF des codes du 27-28.11.2026 a été fait avec (sinon le refaire)
export const LETTRES = '0123456789'; // code à 6 chiffres
const LONGUEUR = 6;

const deux = (n) => String(n).padStart(2, '0');
const jourDe = (d) => `${d.getFullYear()}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}`;

// Hachage FNV-1a 32 bits, mélangé une seconde fois pour bien répartir les lettres
function hacher(texte) {
  let h = 0x811c9dc5;
  for (let i = 0; i < texte.length; i++) h = Math.imul(h ^ texte.charCodeAt(i), 0x01000193);
  h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12; h = Math.imul(h, 0x297a2d39); h ^= h >>> 15;
  return h >>> 0;
}

export function codeGaia(date = new Date(), heure = date.getHours(), secret = SECRET_GAIA) {
  let h = hacher(`${secret}|${jourDe(date)}|${heure}`), code = '';
  for (let i = 0; i < LONGUEUR; i++) { code += LETTRES[h % LETTRES.length]; h = Math.floor(h / LETTRES.length); }
  return code;
}

// Accepte le code de l'heure en cours et celui de l'heure précédente
// (l'élève qui reçoit son code à 10 h 58 a encore le temps de l'entrer)
export function codeGaiaValide(saisie, maintenant = new Date(), secret = SECRET_GAIA) {
  const s = saisie.trim().toUpperCase().replace(/\s+/g, '');
  const avant = new Date(maintenant.getTime() - 3600e3);
  return s === codeGaia(maintenant, maintenant.getHours(), secret) || s === codeGaia(avant, avant.getHours(), secret);
}
