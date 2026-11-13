// Musiques du jeu, composées et jouées par le navigateur (Web Audio) : aucun fichier son,
// donc elles marchent aussi hors ligne et par double-clic sur index.html.
// Chaque piste joue une boucle sur une gamme japonaise (gammes « in » et « yo »).

export const MUSIQUES = [
  { id: 'zen', nom: 'Jardin zen', icone: '🎋', info: 'Koto calme, gamme japonaise « in »' },
  { id: 'aventure', nom: 'En route !', icone: '⛩️', info: 'Rythme entraînant pour l’aventure' },
  { id: 'etoiles', nom: 'Nuit étoilée', icone: '🌙', info: 'Clochettes douces et rêveuses' },
  { id: 'aucune', nom: 'Sans son', icone: '🔇', info: 'Jouer en silence' },
];

const VOLUME = 0.22;
let ctx = null, maitre = null, echo = null;
let bus = null, piste = null, minuteur = null, prochaine = 0, pas = 0, voulue = 'aucune', muet = false;

const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
// degré dans une gamme pentatonique → note MIDI (5 degrés par octave, négatifs = octaves plus graves)
const note = (gamme, base, degre) => base + gamme[((degre % 5) + 5) % 5] + 12 * Math.floor(degre / 5);
const IN = [0, 1, 5, 7, 8];   // gamme « in » (miyako-bushi)
const YO = [0, 2, 5, 7, 9];   // gamme « yo »
const MAJ = [0, 2, 4, 7, 9];  // pentatonique majeure

function initialiser() {
  if (ctx) return;
  const Contexte = window.AudioContext || window.webkitAudioContext;
  if (!Contexte) return;
  ctx = new Contexte();
  maitre = ctx.createGain();
  maitre.gain.value = VOLUME;
  maitre.connect(ctx.destination);
  // petit écho pour donner de l'espace
  echo = ctx.createDelay(1);
  echo.delayTime.value = 0.32;
  const retour = ctx.createGain();
  retour.gain.value = 0.28;
  echo.connect(retour).connect(echo);
  echo.connect(maitre);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) ctx.suspend();
    else if (piste && !muet) { ctx.resume(); prochaine = Math.max(prochaine, ctx.currentTime + 0.05); }
  });
}

// ---------------------------------------------------------------- Instruments
function enveloppe(t, attaque, duree, niveau) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(niveau, t + attaque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duree);
  return g;
}
function osc(type, frequence, t, duree, sortie) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = frequence;
  o.connect(sortie);
  o.start(t);
  o.stop(t + duree + 0.05);
  return o;
}
// corde pincée façon koto
function koto(midi, t, niveau = 0.5, duree = 1.6) {
  const g = enveloppe(t, 0.005, duree, niveau);
  const filtre = ctx.createBiquadFilter();
  filtre.type = 'lowpass';
  filtre.frequency.setValueAtTime(4000, t);
  filtre.frequency.exponentialRampToValueAtTime(700, t + duree * 0.6);
  g.connect(filtre).connect(bus);
  filtre.connect(echo);
  osc('triangle', hz(midi), t, duree, g);
  const g2 = enveloppe(t, 0.003, duree * 0.4, niveau * 0.35);
  g2.connect(filtre);
  osc('sawtooth', hz(midi), t, duree * 0.4, g2);
}
// clochette (partiels inharmoniques)
function cloche(midi, t, niveau = 0.3, duree = 2.4) {
  for (const [rapport, part] of [[1, 1], [2.76, 0.35], [5.4, 0.12]]) {
    const g = enveloppe(t, 0.004, duree / rapport ** 0.4, niveau * part);
    g.connect(bus);
    g.connect(echo);
    osc('sine', hz(midi) * rapport, t, duree, g);
  }
}
// tenue douce (nappe)
function nappe(midis, t, duree, niveau = 0.08) {
  for (const m of midis) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(niveau, t + duree * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duree);
    g.connect(bus);
    osc('sine', hz(m), t, duree, g);
    osc('sine', hz(m) * 1.004, t, duree, g);
  }
}
function lead(midi, t, duree, niveau = 0.12) {
  const g = enveloppe(t, 0.01, duree, niveau);
  const filtre = ctx.createBiquadFilter();
  filtre.type = 'lowpass';
  filtre.frequency.value = 2600;
  g.connect(filtre).connect(bus);
  filtre.connect(echo);
  osc('square', hz(midi), t, duree, g);
}
function basse(midi, t, duree, niveau = 0.35) {
  const g = enveloppe(t, 0.01, duree, niveau);
  g.connect(bus);
  osc('triangle', hz(midi), t, duree, g);
}
let bruit = null;
function souffle(t, duree, niveau, type, frequence) {
  if (!bruit) {
    bruit = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const d = bruit.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = ctx.createBufferSource();
  s.buffer = bruit;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = frequence;
  const g = enveloppe(t, 0.002, duree, niveau);
  s.connect(f).connect(g).connect(bus);
  s.start(t);
  s.stop(t + duree + 0.05);
}
function grosseCaisse(t) {
  const o = ctx.createOscillator();
  const g = enveloppe(t, 0.002, 0.3, 0.6);
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.25);
  o.connect(g).connect(bus);
  o.start(t);
  o.stop(t + 0.35);
}

// ---------------------------------------------------------------- Pistes (un pas = une croche)
const _ = null;
const PISTES = {
  zen: {
    bpm: 76,
    jouer(p, t, d) {
      const mesure = Math.floor(p / 16) % 4, i = p % 16;
      const A = [4, _, 3, _, 2, _, _, 1, 0, _, _, _, 2, _, 1, _];
      const B = [5, _, 4, _, 3, _, 4, _, 2, _, _, 1, 0, _, _, _];
      const C = [2, _, 3, _, 4, _, 6, _, 5, _, _, 4, 3, _, _, _];
      const melodie = [A, B, C, B][mesure];
      if (melodie[i] !== _) koto(note(IN, 62, melodie[i]), t, 0.45);
      const arpege = [-5, _, -3, _, -2, _, -3, _];
      if (arpege[i % 8] !== _) koto(note(IN, 62, arpege[i % 8] + (mesure === 2 ? 1 : 0)), t, 0.22, 1.2);
      if (i === 0) nappe([note(IN, 50, 0), note(IN, 50, 3)], t, d * 16, 0.06);
    },
  },
  aventure: {
    bpm: 118,
    jouer(p, t, d) {
      const mesure = Math.floor(p / 16) % 4, i = p % 16;
      const A = [0, _, 2, 3, 4, _, 3, 2, 3, _, _, 2, 1, _, 0, _];
      const B = [5, 4, 3, _, 4, _, 2, _, 3, 2, 1, _, 0, _, _, _];
      const melodie = [A, B, A, [7, _, 6, 5, 4, _, 5, _, 6, _, 5, 4, 5, _, _, _]][mesure];
      if (melodie[i] !== _) lead(note(YO, 72, melodie[i]), t, d * 1.6);
      const racine = [0, 2, 3, 0][mesure];
      if (i % 2 === 0) basse(note(YO, 43, racine + (i % 8 === 6 ? 3 : 0)), t, d * 1.5);
      if (i % 4 === 0) grosseCaisse(t);
      if (i % 8 === 4) souffle(t, 0.18, 0.35, 'bandpass', 1800);
      if (i % 2 === 1) souffle(t, 0.05, 0.18, 'highpass', 7000);
    },
  },
  etoiles: {
    bpm: 66,
    jouer(p, t, d) {
      const mesure = Math.floor(p / 16) % 4, i = p % 16;
      const arpege = [0, 2, 4, 5, 7, 5, 4, 2, 1, 3, 5, 6, 8, 6, 5, 3];
      cloche(note(MAJ, 72, arpege[i] + [0, 1, -1, 0][mesure]), t, i % 4 === 0 ? 0.3 : 0.18);
      if (i === 0) nappe([note(MAJ, 53, [0, 3, 1, 0][mesure]), note(MAJ, 53, [2, 5, 3, 2][mesure])], t, d * 16, 0.07);
    },
  },
};

function planifier() {
  if (!piste) return;
  const d = 60 / piste.bpm / 2;
  while (prochaine < ctx.currentTime + 0.25) {
    piste.jouer(pas, prochaine, d);
    prochaine += d;
    pas++;
  }
}

function arreter() {
  clearInterval(minuteur);
  minuteur = null;
  piste = null;
  if (bus) {
    const ancien = bus;
    ancien.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
    setTimeout(() => ancien.disconnect(), 800);
    bus = null;
  }
}

function demarrer() {
  arreter();
  if (voulue === 'aucune' || muet || !PISTES[voulue]) return;
  initialiser();
  if (!ctx) return;
  ctx.resume();
  bus = ctx.createGain();
  bus.connect(maitre);
  piste = PISTES[voulue];
  pas = 0;
  prochaine = ctx.currentTime + 0.08;
  minuteur = setInterval(planifier, 50);
  planifier();
}

// À appeler après un clic ou une touche : le navigateur n'autorise le son qu'après une action du joueur
export function jouerMusique(id) {
  voulue = id ?? 'aucune';
  demarrer();
}
export function couperSon(oui) {
  muet = oui;
  demarrer();
}
export const sonCoupe = () => muet;
export const musiqueVoulue = () => voulue;
