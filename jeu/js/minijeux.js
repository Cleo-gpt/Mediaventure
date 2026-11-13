// Épreuves du milieu de chaque île (mindmap) : vidéo, 7 différences, étapes marketing, code du stand Gaïa.
// Chaque épreuve s'affiche dans la fenêtre #minijeu et renvoie une promesse : true si elle est réussie.
import { PALETTE } from './niveaux.js';
import { codeGaiaValide } from './code-gaia.js';

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
    const zone = ouvrir('Le projet marketing', 'Glisse chaque étape sur son numéro, de 1 (la première) à ' + etapes.length + ' (la dernière).');
    const melange = [...etapes].sort(() => Math.random() - 0.5);
    const cases = etapes.map(() => null); // étape posée sur chaque numéro
    let choisie = null; // étape sélectionnée d'un simple toucher (alternative au glisser)
    const liste = document.createElement('ol');
    liste.className = 'mj-cases';
    const reserve = document.createElement('div');
    reserve.className = 'mj-reserve';
    const message = document.createElement('p');
    message.className = 'mj-compteur';
    const actions = document.createElement('div');
    actions.className = 'mj-actions';
    const verifier = bouton('Vérifier');
    const recommencer = bouton('Recommencer', 'bouton secondaire');
    actions.append(recommencer, verifier);
    let corrige = false;

    // Pose l'étape e sur le numéro i (ou la remet dans la réserve si i === null) ; échange si la case est occupée
    const poser = (e, i) => {
      const depuis = cases.indexOf(e);
      if (depuis >= 0) cases[depuis] = null;
      if (i !== null) {
        if (cases[i] && depuis >= 0) cases[depuis] = cases[i];
        cases[i] = e;
      }
      choisie = null;
      corrige = false;
      message.textContent = '';
      rendre();
    };

    const carte = (e) => {
      const c = document.createElement('div');
      c.className = 'mj-etape' + (choisie === e ? ' choisie' : '');
      c.textContent = e;
      c.addEventListener('pointerdown', (ev) => glisser(ev, c, e));
      return c;
    };

    const rendre = () => {
      liste.innerHTML = '';
      cases.forEach((e, i) => {
        const li = document.createElement('li');
        li.className = 'mj-case' + (corrige && e ? (e === etapes[i] ? ' juste' : ' faux') : '');
        li.dataset.numero = i;
        const n = document.createElement('span');
        n.className = 'mj-numero';
        n.textContent = i + 1;
        li.append(n);
        if (e) {
          const c = carte(e);
          // après vérification, la bonne étape s'affiche sous chaque erreur
          if (corrige && e !== etapes[i]) {
            const bonne = document.createElement('small');
            bonne.className = 'mj-bonne';
            bonne.textContent = '✔ Bonne étape : ' + etapes[i];
            c.append(bonne);
          }
          li.append(c);
        } else li.append(Object.assign(document.createElement('span'), { className: 'mj-vide', textContent: 'Glisse une étape ici' }));
        li.onclick = (ev) => { if (choisie && !ev.target.closest('.mj-etape')) poser(choisie, i); };
        liste.append(li);
      });
      reserve.innerHTML = '';
      for (const e of melange.filter((x) => !cases.includes(x))) reserve.append(carte(e));
      reserve.hidden = !reserve.children.length;
      verifier.disabled = cases.includes(null);
    };

    // Glisser-déposer au doigt ou à la souris ; un toucher sans glisser sélectionne l'étape
    function glisser(ev, el, e) {
      ev.preventDefault();
      ev.stopPropagation();
      const r = el.getBoundingClientRect(), dx = ev.clientX - r.left, dy = ev.clientY - r.top;
      const x0 = ev.clientX, y0 = ev.clientY;
      let fantome = null, dernier = null, boucle = 0;
      // près du haut ou du bas de la fenêtre, elle défile toute seule (cases cachées sur téléphone)
      const fenetre = el.closest('.carte-large');
      const defiler = () => {
        if (dernier && fenetre) {
          const b = fenetre.getBoundingClientRect(), marge = 70;
          const v = dernier.y < b.top + marge ? -(b.top + marge - dernier.y) : dernier.y > b.bottom - marge ? dernier.y - (b.bottom - marge) : 0;
          if (v) fenetre.scrollTop += v * 0.25;
        }
        boucle = requestAnimationFrame(defiler);
      };
      const bouger = (m) => {
        if (m.pointerId !== ev.pointerId) return;
        if (!fantome && Math.hypot(m.clientX - x0, m.clientY - y0) < 6) return;
        if (!fantome) {
          fantome = el.cloneNode(true);
          fantome.classList.add('mj-glisse');
          fantome.style.width = r.width + 'px';
          document.body.append(fantome);
          el.style.opacity = 0.3;
          defiler();
        }
        dernier = { x: m.clientX, y: m.clientY };
        fantome.style.left = m.clientX - dx + 'px';
        fantome.style.top = m.clientY - dy + 'px';
        document.querySelectorAll('.mj-case.survol').forEach((c) => c.classList.remove('survol'));
        fantome.hidden = true;
        document.elementFromPoint(m.clientX, m.clientY)?.closest('.mj-case')?.classList.add('survol');
        fantome.hidden = false;
      };
      const lacher = (u) => {
        if (u.pointerId !== ev.pointerId) return;
        removeEventListener('pointermove', bouger);
        removeEventListener('pointerup', lacher);
        removeEventListener('pointercancel', lacher);
        cancelAnimationFrame(boucle);
        if (!fantome) { // simple toucher : sélectionner / désélectionner, ou échanger avec l'étape déjà choisie
          const ici = cases.indexOf(e);
          if (choisie && choisie !== e && ici >= 0) { poser(choisie, ici); return; }
          choisie = choisie === e ? null : e;
          rendre();
          return;
        }
        fantome.hidden = true;
        const sous = document.elementFromPoint(u.clientX, u.clientY);
        fantome.remove();
        const c = sous?.closest('.mj-case');
        if (c) poser(e, +c.dataset.numero);
        else if (sous?.closest('.mj-reserve') || !sous?.closest('.mj-cases')) poser(e, null);
        else rendre();
      };
      addEventListener('pointermove', bouger);
      addEventListener('pointerup', lacher);
      addEventListener('pointercancel', lacher);
    }

    verifier.onclick = () => {
      const justes = cases.filter((e, i) => e === etapes[i]).length;
      corrige = true;
      rendre();
      if (justes === etapes.length) {
        message.textContent = 'Parfait : ton projet est bien construit !';
        actions.innerHTML = '';
        const ok = bouton('Continuer');
        ok.onclick = () => { fermer(); fin(true); };
        actions.append(ok);
      } else {
        message.textContent = `${justes} étape${justes > 1 ? 's' : ''} sur ${etapes.length} au bon numéro. La bonne étape est indiquée sous chaque erreur : remets-les en place et vérifie à nouveau.`;
      }
    };
    recommencer.onclick = () => { cases.fill(null); choisie = null; corrige = false; message.textContent = ''; rendre(); };
    zone.append(liste, reserve, message, actions);
    rendre();
  });
}

// ---------------------------------------------------------------- Admin : le code du stand Gaïa
export function epreuveCodeGaia() {
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
      if (codeGaiaValide(champ.value)) { fermer(); fin(true); }
      else { message.textContent = 'Ce n’est pas le bon code (il change toutes les heures). Demande-le au stand Gaïa !'; champ.select(); }
    };
    valider.onclick = essayer;
    champ.onkeydown = (e) => { e.stopPropagation(); if (e.key === 'Enter') essayer(); };
    plusTard.onclick = () => { fermer(); fin(false); };
    zone.append(champ, message, actions);
    champ.focus();
  });
}
