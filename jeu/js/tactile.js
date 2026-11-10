// Commandes tactiles (téléphones et tablettes) : joystick à gauche, boutons d'action à droite.
// Le reste de l'écran sert à tourner la caméra en glissant le doigt (géré dans main.js).

export const ECRAN_TACTILE = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

// Direction du joystick : x vers la droite, y vers l'avant (-1 → 1)
export const joystick = { x: 0, y: 0, actif: false };

export function installerCommandes({ surSauter, surAction }) {
  if (!ECRAN_TACTILE) return;
  document.body.classList.add('tactile');

  const zone = document.createElement('div');
  zone.id = 'joystick';
  zone.innerHTML = '<div id="joystick-bouton"></div>';
  const sauter = Object.assign(document.createElement('button'), { id: 'bouton-sauter', textContent: '⤒', title: 'Sauter' });
  const action = Object.assign(document.createElement('button'), { id: 'bouton-action', textContent: 'Parler', title: 'Interagir' });
  document.getElementById('hud').append(zone, sauter, action);

  const pouce = zone.firstElementChild;
  const RAYON = 48;
  let doigt = null, centre = null;
  const bouger = (e) => {
    const dx = e.clientX - centre.x, dy = e.clientY - centre.y;
    const l = Math.min(1, Math.hypot(dx, dy) / RAYON), a = Math.atan2(dy, dx);
    joystick.x = Math.cos(a) * l;
    joystick.y = -Math.sin(a) * l;
    pouce.style.transform = `translate(${joystick.x * RAYON}px, ${-joystick.y * RAYON}px)`;
  };
  zone.addEventListener('pointerdown', (e) => {
    doigt = e.pointerId;
    const r = zone.getBoundingClientRect();
    centre = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    zone.setPointerCapture(e.pointerId);
    joystick.actif = true;
    bouger(e);
    e.stopPropagation();
  });
  zone.addEventListener('pointermove', (e) => { if (e.pointerId === doigt) bouger(e); });
  const lacher = (e) => {
    if (e.pointerId !== doigt) return;
    doigt = null;
    joystick.x = joystick.y = 0;
    joystick.actif = false;
    pouce.style.transform = '';
  };
  zone.addEventListener('pointerup', lacher);
  zone.addEventListener('pointercancel', lacher);

  for (const [b, f] of [[sauter, surSauter], [action, surAction]]) {
    b.addEventListener('pointerdown', (e) => { e.stopPropagation(); e.preventDefault(); f(); });
  }
}

// Le bouton « Parler » n'apparaît que lorsqu'une interaction est possible
export function majBoutonAction(texte) {
  const b = document.getElementById('bouton-action');
  if (!b) return;
  b.hidden = !texte;
  if (texte) b.textContent = texte;
}
