// Page codes-gaia.html : liste imprimable des codes du stand Gaïa pour une journée.
import { codeGaia } from './code-gaia.js';

const champDate = document.getElementById('date');
const debut = document.getElementById('debut');
const fin = document.getElementById('fin');
const corps = document.getElementById('codes');
const titre = document.getElementById('titre-date');

const deux = (n) => String(n).padStart(2, '0');
const aujourdhui = new Date();
champDate.value = `${aujourdhui.getFullYear()}-${deux(aujourdhui.getMonth() + 1)}-${deux(aujourdhui.getDate())}`;

function afficher() {
  const [a, m, j] = champDate.value.split('-').map(Number);
  if (!a) return;
  const jour = new Date(a, m - 1, j);
  const texte = jour.toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  titre.textContent = texte[0].toUpperCase() + texte.slice(1);
  const maintenant = new Date();
  const memeJour = jour.toDateString() === maintenant.toDateString();
  corps.innerHTML = '';
  for (let h = +debut.value; h <= +fin.value; h++) {
    const ligne = document.createElement('tr');
    if (memeJour && h === maintenant.getHours()) ligne.className = 'actuel';
    ligne.innerHTML = `<td>${deux(h)} h 00 – ${deux(h)} h 59</td><td class="code">${codeGaia(jour, h).replace(/^(...)(...)$/, "$1 $2")}</td>`;
    corps.append(ligne);
  }
}
for (const c of [champDate, debut, fin]) c.addEventListener('input', afficher);
document.getElementById('imprimer').onclick = () => print();
afficher();
setInterval(afficher, 60e3); // l'heure en cours reste surlignée
