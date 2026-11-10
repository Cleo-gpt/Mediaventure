// Épreuves du milieu de chaque île (mindmap) : vidéo, 7 différences, étapes marketing, code du stand Gaïa.
// Chaque épreuve s'affiche dans la fenêtre #minijeu et renvoie une promesse : true si elle est réussie.
import { PALETTE } from './niveaux.js';

const $ = (id) => document.getElementById(id);

function ouvrir(titre, sousTitre) {
  $('minijeu').hidden = false;
  $('minijeu-titre').textContent = titre;
  $('minijeu-sous-titre').textContent = sousTitre;
  const zone = $('minijeu-contenu');
  zone.innerHTML = '';
  return zone;
}
function fermer() {
  $('minijeu').hidden = true;
  $('minijeu-contenu').innerHTML = '';
}
const bouton = (texte, classe = 'bouton') => Object.assign(document.createElement('button'), { className: classe, textContent: texte });

// ---------------------------------------------------------------- Multimédia : regarder une vidéo de la bibliothèque
export function epreuveVideo(videos) {
  return new Promise((fin) => {
    const zone = ouvrir('La bibliothèque', 'Choisis une vidéo et regarde-la jusqu’au bout.');
    const liste = document.createElement('div');
    liste.className = 'mj-videos';
    for (const v of videos) {
      const b = document.createElement('button');
      b.className = 'mj-video';
      b.innerHTML = `<span class="mj-video-icone">${v.icone}</span><span>${v.titre}</span><small>${v.duree} s</small>`;
      b.onclick = () => lire(v);
      liste.append(b);
    }
    zone.append(liste);

    function lire(v) {
      zone.innerHTML = '';
      const ecran = document.createElement('div');
      ecran.className = 'mj-ecran';
      const barre = document.createElement('div');
      barre.className = 'mj-progression';
      const remplissage = document.createElement('div');
      barre.append(remplissage);
      let duree = v.duree, ecoule = 0, video = null;
      if (v.src) {
        video = Object.assign(document.createElement('video'), { src: v.src, autoplay: true, playsInline: true });
        video.onloadedmetadata = () => { duree = video.duration; };
        ecran.append(video);
      } else {
        // Pas encore de fichier vidéo : lecteur animé en attendant les vraies vidéos
        ecran.innerHTML = `<div class="mj-lecture"><span>${v.icone}</span><strong>${v.titre}</strong><em>Lecture…</em></div>`;
      }
      zone.append(ecran, barre);
      const debut = performance.now();
      const tic = () => {
        if ($('minijeu').hidden) return;
        ecoule = video ? video.currentTime : (performance.now() - debut) / 1000;
        remplissage.style.width = `${Math.min(100, (ecoule / duree) * 100)}%`;
        if (ecoule >= duree - 0.05 || video?.ended) {
          const ok = bouton('J’ai tout vu !');
          ok.onclick = () => { fermer(); fin(true); };
          zone.append(ok);
          return;
        }
        requestAnimationFrame(tic);
      };
      requestAnimationFrame(tic);
    }
  });
}

// ---------------------------------------------------------------- Design : jeu des 7 différences
// Deux paysages japonais dessinés à l'identique, sauf 7 détails sur l'image de droite.
const DIFFERENCES = [
  { x: 80, y: 60, r: 26 },   // soleil : corail ↔ jaune
  { x: 300, y: 70, r: 26 },  // nuage absent
  { x: 160, y: 150, r: 24 }, // sommet du mont sans neige
  { x: 245, y: 205, r: 26 }, // torii : poutre du haut manquante
  { x: 60, y: 210, r: 24 },  // arbre : couleur du feuillage
  { x: 330, y: 228, r: 22 }, // lanterne absente
  { x: 205, y: 262, r: 22 }, // poisson koï absent
];

function dessinerPaysage(ctx, modifie) {
  const W = 380, H = 290;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#9bb3d6'); g.addColorStop(1, '#f5cacc');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // soleil
  ctx.fillStyle = modifie ? '#f6c66a' : PALETTE.corail;
  ctx.beginPath(); ctx.arc(80, 60, 24, 0, Math.PI * 2); ctx.fill();
  // nuages
  ctx.fillStyle = '#fbf8f2';
  const nuage = (x, y) => { for (const [dx, r] of [[-18, 12], [0, 16], [18, 12]]) { ctx.beginPath(); ctx.arc(x + dx, y, r, 0, Math.PI * 2); ctx.fill(); } };
  nuage(200, 50);
  if (!modifie) nuage(300, 70);
  // mont Fuji
  ctx.fillStyle = '#4f7295';
  ctx.beginPath(); ctx.moveTo(40, 230); ctx.lineTo(160, 120); ctx.lineTo(280, 230); ctx.fill();
  if (!modifie) {
    ctx.fillStyle = '#fbf8f2';
    ctx.beginPath(); ctx.moveTo(135, 143); ctx.lineTo(160, 120); ctx.lineTo(185, 143); ctx.lineTo(172, 152); ctx.lineTo(160, 142); ctx.lineTo(148, 152); ctx.fill();
  }
  // eau
  ctx.fillStyle = '#7fb3e6'; ctx.fillRect(0, 232, W, 58);
  ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2;
  for (let x = 10; x < W; x += 40) { ctx.beginPath(); ctx.arc(x, 250, 10, Math.PI, 0); ctx.stroke(); }
  // torii
  ctx.fillStyle = PALETTE.corail;
  ctx.fillRect(222, 185, 8, 50); ctx.fillRect(262, 185, 8, 50);
  ctx.fillRect(214, 196, 64, 6);
  if (!modifie) { ctx.fillStyle = PALETTE.marine; ctx.fillRect(208, 182, 76, 7); }
  // arbre
  ctx.fillStyle = '#6b4a33'; ctx.fillRect(56, 205, 8, 30);
  ctx.fillStyle = modifie ? '#e8672c' : '#7aaa45';
  ctx.beginPath(); ctx.arc(60, 200, 22, 0, Math.PI * 2); ctx.fill();
  // lanterne
  if (!modifie) {
    ctx.fillStyle = '#a7a49b'; ctx.fillRect(326, 215, 8, 20); ctx.fillRect(318, 210, 24, 6);
    ctx.fillStyle = '#fff1c9'; ctx.fillRect(321, 200, 18, 10);
    ctx.fillStyle = '#a7a49b'; ctx.beginPath(); ctx.moveTo(314, 200); ctx.lineTo(330, 190); ctx.lineTo(346, 200); ctx.fill();
  }
  // poisson koï
  if (!modifie) {
    ctx.fillStyle = PALETTE.corail;
    ctx.beginPath(); ctx.ellipse(205, 262, 14, 6, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(219, 262); ctx.lineTo(229, 255); ctx.lineTo(229, 269); ctx.fill();
  }
}

export function epreuveDifferences() {
  return new Promise((fin) => {
    const zone = ouvrir('Les 7 différences', 'Clique sur les différences, sur l’une ou l’autre image.');
    const compteur = document.createElement('p');
    compteur.className = 'mj-compteur';
    const images = document.createElement('div');
    images.className = 'mj-images';
    const trouvees = new Set();
    const toiles = [false, true].map((modifie) => {
      const c = document.createElement('canvas');
      c.width = 380; c.height = 290;
      dessinerPaysage(c.getContext('2d'), modifie);
      images.append(c);
      return c;
    });
    const maj = () => {
      compteur.textContent = `${trouvees.size} / ${DIFFERENCES.length} différences trouvées`;
      for (const c of toiles) {
        const ctx = c.getContext('2d');
        dessinerPaysage(ctx, c === toiles[1]);
        ctx.strokeStyle = '#2fbf5a'; ctx.lineWidth = 4;
        for (const i of trouvees) { const d = DIFFERENCES[i]; ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.stroke(); }
      }
      if (trouvees.size === DIFFERENCES.length) {
        const ok = bouton('Bravo, toutes trouvées !');
        ok.onclick = () => { fermer(); fin(true); };
        zone.append(ok);
      }
    };
    for (const c of toiles) {
      c.onclick = (e) => {
        const r = c.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * c.width, y = ((e.clientY - r.top) / r.height) * c.height;
        DIFFERENCES.forEach((d, i) => { if (Math.hypot(x - d.x, y - d.y) < d.r + 6) trouvees.add(i); });
        maj();
      };
    }
    zone.append(compteur, images);
    maj();
  });
}

// ---------------------------------------------------------------- Marketing : remettre les étapes d'un projet dans l'ordre
export function epreuveEtapes(etapes) {
  return new Promise((fin) => {
    const zone = ouvrir('Le projet marketing', 'Clique sur les étapes dans le bon ordre, de la première à la dernière.');
    const melange = [...etapes].sort(() => Math.random() - 0.5);
    const choisies = [];
    const ordre = document.createElement('ol');
    ordre.className = 'mj-ordre';
    const reserve = document.createElement('div');
    reserve.className = 'mj-reserve';
    const message = document.createElement('p');
    message.className = 'mj-compteur';
    const actions = document.createElement('div');
    actions.className = 'mj-actions';
    const verifier = bouton('Vérifier');
    const recommencer = bouton('Recommencer', 'bouton secondaire');
    actions.append(recommencer, verifier);

    const rendre = () => {
      ordre.innerHTML = '';
      choisies.forEach((e, i) => {
        const li = document.createElement('li');
        li.textContent = e;
        li.title = 'Retirer cette étape';
        li.onclick = () => { choisies.splice(i, 1); rendre(); };
        ordre.append(li);
      });
      reserve.innerHTML = '';
      for (const e of melange.filter((x) => !choisies.includes(x))) {
        const b = bouton(e, 'mj-etape');
        b.onclick = () => { choisies.push(e); rendre(); };
        reserve.append(b);
      }
      verifier.disabled = choisies.length !== etapes.length;
    };
    verifier.onclick = () => {
      const justes = choisies.filter((e, i) => e === etapes[i]).length;
      if (justes === etapes.length) {
        message.textContent = 'Parfait : ton projet est bien construit !';
        actions.innerHTML = '';
        const ok = bouton('Continuer');
        ok.onclick = () => { fermer(); fin(true); };
        actions.append(ok);
      } else {
        message.textContent = `${justes} étape${justes > 1 ? 's' : ''} sur ${etapes.length} à la bonne place. Retire les autres et réessaie.`;
      }
    };
    recommencer.onclick = () => { choisies.length = 0; message.textContent = ''; rendre(); };
    zone.append(ordre, reserve, message, actions);
    rendre();
  });
}

// ---------------------------------------------------------------- Admin : le code du stand Gaïa
export function epreuveCodeGaia(code) {
  return new Promise((fin) => {
    const zone = ouvrir('Le stand Gaïa', 'Va au stand Gaïa des portes ouvertes : la vendeuse te donnera un code.');
    const champ = Object.assign(document.createElement('input'), { className: 'mj-code', placeholder: 'Code du stand', maxLength: 16, autocomplete: 'off' });
    const message = document.createElement('p');
    message.className = 'mj-compteur';
    const valider = bouton('Valider');
    const plusTard = bouton('Plus tard', 'bouton secondaire');
    const actions = document.createElement('div');
    actions.className = 'mj-actions';
    actions.append(plusTard, valider);
    const essayer = () => {
      if (champ.value.trim().toUpperCase() === code.toUpperCase()) { fermer(); fin(true); }
      else { message.textContent = 'Ce n’est pas le bon code. Demande-le au stand Gaïa !'; champ.select(); }
    };
    valider.onclick = essayer;
    champ.onkeydown = (e) => { e.stopPropagation(); if (e.key === 'Enter') essayer(); };
    plusTard.onclick = () => { fermer(); fin(false); };
    zone.append(champ, message, actions);
    champ.focus();
  });
}
