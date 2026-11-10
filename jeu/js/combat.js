// Combat au tour par tour sur grille : PA (points d'action) pour les sorts, PM (points de mouvement) pour se déplacer.
import * as THREE from 'three';
import { ARENE } from './monde.js';
import { SORTS_JOUEUR, PALETTE } from './niveaux.js';
import { animerPersonnage } from './personnage.js';

const PV_JOUEUR = 60, PA_JOUEUR = 6, PM_JOUEUR = 3;
const N = ARENE.cases, S = ARENE.taille;
const OBSTACLES = [[2, 3], [6, 3], [3, 5], [5, 5]];
const cle = (c) => `${c.i},${c.j}`;
const dist = (a, b) => Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
const attendre = (ms) => new Promise((r) => setTimeout(r, ms));
const alea = ([min, max]) => min + Math.floor(Math.random() * (max - min + 1));

export class Combat {
  constructor({ scene, camera, canvas, joueur, boss, def, tutoriel, onFin }) {
    Object.assign(this, { scene, camera, canvas, joueur, boss, def, tutoriel, onFin });
    this.ui = {
      racine: document.getElementById('combat'),
      pvJ: document.getElementById('pv-joueur'), pvB: document.getElementById('pv-boss'),
      nomB: document.getElementById('nom-boss'), pa: document.getElementById('pa'), pm: document.getElementById('pm'),
      sorts: document.getElementById('sorts'), finTour: document.getElementById('fin-tour'),
      journal: document.getElementById('journal'), tour: document.getElementById('tour'),
      bulles: document.getElementById('bulles'),
    };
    this.groupe = new THREE.Group();
    scene.add(this.groupe);
    this.raycaster = new THREE.Raycaster();
    this.souris = new THREE.Vector2();
    this.anims = [];
    this.obstacles = new Set(OBSTACLES.map(([i, j]) => `${i},${j}`));

    this.j = { c: { i: 4, j: 7 }, pv: PV_JOUEUR, max: PV_JOUEUR, pa: PA_JOUEUR, pm: PM_JOUEUR, mesh: joueur, vitesse: 0 };
    this.b = { c: { i: 4, j: 1 }, pv: def.pv, max: def.pv, pa: def.pa ?? 6, pm: def.pm ?? 3, mesh: boss, vitesse: 0 };
    this.placer(this.j); this.placer(this.b);
    this.orienter(this.j, this.b.c); this.orienter(this.b, this.j.c);

    this.construireGrille();
    this.construireUI();
    this.ecouter();
    this.cadrerCamera();
    this.ui.racine.hidden = false;
    this.log(`⚔️ Combat contre ${def.nom} !`);
    if (tutoriel) {
      this.log('Cases bleues : clique pour te déplacer (PM). Choisis un sort puis clique sur la cible (PA).');
      this.log('Touches 1, 2, 3 pour les sorts, Entrée pour finir le tour.');
      this.log('Abrite-toi derrière les pierres : elles arrêtent les shurikens et les sorts à distance.');
    }
    this.debutTourJoueur();
  }

  // ---------------------------------------------------------------- Grille
  monde(c, y = 0) {
    return new THREE.Vector3(ARENE.centre.x + (c.i - (N - 1) / 2) * S, y, ARENE.centre.z + (c.j - (N - 1) / 2) * S);
  }

  placer(u) { u.mesh.position.copy(this.monde(u.c, 0.08)); }

  orienter(u, versCase) {
    const d = this.monde(versCase).sub(this.monde(u.c));
    if (d.lengthSq() > 0) u.mesh.rotation.y = Math.atan2(d.x, d.z);
  }

  construireGrille() {
    this.cases = [];
    const geo = new THREE.PlaneGeometry(S * 0.92, S * 0.92);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: PALETTE.marine, transparent: true, opacity: 0.12, depthWrite: false }));
        m.rotation.x = -Math.PI / 2;
        m.position.copy(this.monde({ i, j }, 0.1));
        m.userData.c = { i, j };
        this.groupe.add(m);
        this.cases.push(m);
      }
    }
    const pierre = new THREE.MeshStandardMaterial({ color: '#8b93a3', roughness: 1, flatShading: true });
    for (const [i, j] of OBSTACLES) {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(S * 0.42), pierre);
      r.position.copy(this.monde({ i, j }, S * 0.3));
      r.castShadow = true;
      this.groupe.add(r);
    }
  }

  // Ligne de vue : aucune pierre entre les deux cases (les cases de départ et d'arrivée ne comptent pas)
  vue(a, b) {
    const n = Math.max(Math.abs(b.i - a.i), Math.abs(b.j - a.j)) * 4;
    for (let k = 1; k < n; k++) {
      const c = { i: Math.round(a.i + ((b.i - a.i) * k) / n), j: Math.round(a.j + ((b.j - a.j) * k) / n) };
      if (cle(c) !== cle(a) && cle(c) !== cle(b) && this.obstacles.has(cle(c))) return false;
    }
    return true;
  }

  // Un sort peut-il atteindre cette case ? (portée + ligne de vue pour les sorts à distance)
  atteint(s, de, vers) {
    const d = dist(de, vers);
    return d >= s.portee[0] && d <= s.portee[1] && (s.portee[1] <= 1 || this.vue(de, vers));
  }

  colorer() {
    const actif = this.etat === 'joueur';
    const zone = new Map();
    if (actif && this.sort) {
      for (const m of this.cases) {
        const c = m.userData.c;
        if (!this.obstacles.has(cle(c)) && this.atteint(this.sort, this.j.c, c)) zone.set(cle(c), PALETTE.corail);
      }
    } else if (actif) {
      for (const k of this.accessibles().keys()) zone.set(k, PALETTE.bleu);
      if (this.survol) {
        const chemin = this.chemin(this.survol);
        chemin?.forEach((c) => zone.set(cle(c), '#ffffff'));
      }
    }
    for (const m of this.cases) {
      const k = cle(m.userData.c);
      m.material.color.set(zone.get(k) ?? PALETTE.marine);
      m.material.opacity = zone.has(k) ? 0.7 : 0.12;
    }
  }

  bloque(c, pourBoss = false) {
    if (c.i < 0 || c.j < 0 || c.i >= N || c.j >= N) return true;
    if (this.obstacles.has(cle(c))) return true;
    const autre = pourBoss ? this.j.c : this.b.c;
    return c.i === autre.i && c.j === autre.j;
  }

  // BFS depuis `depart` ; renvoie Map clé → { c, prev, d }
  parcours(depart, max, pourBoss = false) {
    const vus = new Map([[cle(depart), { c: depart, prev: null, d: 0 }]]);
    const file = [depart];
    while (file.length) {
      const c = file.shift();
      const d = vus.get(cle(c)).d;
      if (d >= max) continue;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const n = { i: c.i + di, j: c.j + dj };
        if (vus.has(cle(n)) || this.bloque(n, pourBoss)) continue;
        vus.set(cle(n), { c: n, prev: c, d: d + 1 });
        file.push(n);
      }
    }
    return vus;
  }

  accessibles() {
    const m = this.parcours(this.j.c, this.j.pm);
    m.delete(cle(this.j.c));
    return m;
  }

  remonter(carte, c) {
    const chemin = [];
    for (let n = carte.get(cle(c)); n && n.prev; n = carte.get(cle(n.prev))) chemin.unshift(n.c);
    return chemin;
  }

  chemin(c) {
    const carte = this.parcours(this.j.c, this.j.pm);
    return carte.has(cle(c)) ? this.remonter(carte, c) : null;
  }

  // ---------------------------------------------------------------- UI
  construireUI() {
    this.ui.nomB.textContent = `${this.def.nom} — ${this.def.titre}`;
    this.ui.sorts.innerHTML = '';
    this.boutons = SORTS_JOUEUR.map((s) => {
      const b = document.createElement('button');
      b.className = 'sort';
      b.innerHTML = `<kbd>${s.touche}</kbd><span>${s.nom}</span><small>${s.pa} PA · ${s.soin ? `soin ${s.soin.join('–')}` : `${s.degats.join('–')} dégâts · portée ${s.portee.join('–')}`}</small>`;
      b.onclick = () => this.choisirSort(s);
      this.ui.sorts.append(b);
      return { s, b };
    });
    this.ui.finTour.onclick = () => this.finTourJoueur();
  }

  majUI() {
    const barre = (el, u) => {
      el.style.setProperty('--pct', `${Math.max(0, (u.pv / u.max) * 100)}%`);
      el.dataset.texte = `${Math.max(0, u.pv)} / ${u.max} PV`;
    };
    barre(this.ui.pvJ, this.j);
    barre(this.ui.pvB, this.b);
    this.ui.pa.textContent = this.j.pa;
    this.ui.pm.textContent = this.j.pm;
    this.ui.tour.textContent = this.etat === 'joueur' ? 'À toi de jouer' : this.etat === 'boss' ? `Tour de ${this.def.nom}` : '';
    for (const { s, b } of this.boutons) {
      b.disabled = this.etat !== 'joueur' || s.pa > this.j.pa || (s.parTour && this.utilises[s.id] >= s.parTour);
      b.classList.toggle('actif', this.sort === s);
    }
    this.ui.finTour.disabled = this.etat !== 'joueur';
    this.colorer();
  }

  log(t) {
    const p = document.createElement('p');
    p.textContent = t;
    this.ui.journal.append(p);
    while (this.ui.journal.children.length > 6) this.ui.journal.firstChild.remove();
  }

  bulle(u, texte, classe) {
    const p = u.mesh.position.clone().setY(2.2).project(this.camera);
    const d = document.createElement('div');
    d.className = `bulle ${classe}`;
    d.textContent = texte;
    d.style.left = `${(p.x * 0.5 + 0.5) * innerWidth}px`;
    d.style.top = `${(-p.y * 0.5 + 0.5) * innerHeight}px`;
    this.ui.bulles.append(d);
    setTimeout(() => d.remove(), 1200);
  }

  // ---------------------------------------------------------------- Entrées
  ecouter() {
    this.surMouvement = (e) => {
      const c = this.caseSous(e);
      if (cle(c ?? {}) !== cle(this.survol ?? {})) { this.survol = c; this.colorer(); }
    };
    this.surClic = (e) => { if (e.button === 0) this.cliquer(this.caseSous(e)); };
    this.surTouche = (e) => {
      const s = SORTS_JOUEUR.find((x) => x.touche === e.key);
      if (s) this.choisirSort(s);
      if (e.key === 'Enter') this.finTourJoueur();
      if (e.key === 'Escape') { this.sort = null; this.majUI(); }
    };
    this.canvas.addEventListener('pointermove', this.surMouvement);
    this.canvas.addEventListener('pointerdown', this.surClic);
    addEventListener('keydown', this.surTouche);
  }

  caseSous(e) {
    const r = this.canvas.getBoundingClientRect();
    this.souris.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.souris, this.camera);
    return this.raycaster.intersectObjects(this.cases)[0]?.object.userData.c ?? null;
  }

  choisirSort(s) {
    if (this.etat !== 'joueur' || s.pa > this.j.pa) return;
    if (s.parTour && this.utilises[s.id] >= s.parTour) return;
    if (s.portee[1] === 0) { this.lancer(this.j, s, this.j); return; } // sort sur soi
    this.sort = this.sort === s ? null : s;
    this.majUI();
  }

  async cliquer(c) {
    if (this.etat !== 'joueur' || !c) return;
    if (this.sort) {
      const d = dist(c, this.j.c);
      if (d < this.sort.portee[0] || d > this.sort.portee[1]) return;
      if (!this.atteint(this.sort, this.j.c, c)) { this.log('🪨 Une pierre bloque la ligne de vue.'); return; }
      const cible = cle(c) === cle(this.b.c) ? this.b : null;
      const s = this.sort;
      this.sort = null;
      await this.lancer(this.j, s, cible, c);
      return;
    }
    const chemin = this.chemin(c);
    if (!chemin?.length) return;
    this.etat = 'anim';
    this.majUI();
    await this.deplacer(this.j, chemin);
    this.etat = 'joueur';
    this.majUI();
  }

  // ---------------------------------------------------------------- Actions
  async deplacer(u, chemin) {
    for (const c of chemin) {
      this.orienter(u, c);
      const de = u.mesh.position.clone(), vers = this.monde(c, 0.08);
      await this.tween(220, (k) => { u.mesh.position.lerpVectors(de, vers, k); u.vitesse = 5; });
      u.c = c;
      u.pm--;
    }
    u.vitesse = 0;
  }

  async lancer(lanceur, s, cible, caseVisee = cible?.c) {
    const avant = this.etat;
    this.etat = 'anim';
    lanceur.pa -= s.pa;
    if (s.parTour) this.utilises[s.id] = (this.utilises[s.id] ?? 0) + 1;
    this.majUI();
    const nomL = lanceur === this.j ? 'Tu' : this.def.nom;

    if (s.soin) {
      const v = Math.min(alea(s.soin), lanceur.max - lanceur.pv);
      lanceur.pv += v;
      this.bulle(lanceur, `+${v}`, 'soin');
      this.log(`🍵 ${nomL} ${lanceur === this.j ? 'bois' : 'boit'} un ${s.nom} : +${v} PV.`);
    } else {
      this.orienter(lanceur, caseVisee);
      if (s.portee[1] <= 1) await this.fente(lanceur);
      else await this.projectile(lanceur, caseVisee, lanceur === this.j ? PALETTE.creme : PALETTE.corail);
      if (cible) {
        const v = alea(s.degats);
        cible.pv -= v;
        this.bulle(cible, `-${v}`, 'degat');
        await this.tween(160, (k) => { cible.mesh.position.y = 0.08 + Math.sin(k * Math.PI) * 0.25; });
        this.log(`${lanceur === this.j ? '🗡️' : '💥'} ${nomL} ${lanceur === this.j ? 'lances' : 'lance'} ${s.nom} : ${v} dégâts.`);
      } else {
        this.log(`${nomL} ${lanceur === this.j ? 'lances' : 'lance'} ${s.nom}… dans le vide.`);
      }
    }
    if (this.verifierFin()) return;
    this.etat = avant;
    this.majUI();
  }

  async fente(u) {
    const de = u.mesh.position.clone();
    const avant = new THREE.Vector3(Math.sin(u.mesh.rotation.y), 0, Math.cos(u.mesh.rotation.y)).multiplyScalar(0.5);
    await this.tween(260, (k) => u.mesh.position.copy(de).addScaledVector(avant, Math.sin(k * Math.PI)));
  }

  async projectile(u, c, couleur) {
    const p = new THREE.Mesh(new THREE.OctahedronGeometry(0.18), new THREE.MeshBasicMaterial({ color: couleur }));
    this.groupe.add(p);
    const de = u.mesh.position.clone().setY(1.1), vers = this.monde(c, 1.0);
    await this.tween(320, (k) => { p.position.lerpVectors(de, vers, k); p.rotation.y += 0.4; p.rotation.x += 0.3; });
    this.groupe.remove(p);
    p.geometry.dispose();
  }

  tween(ms, f) {
    return new Promise((fin) => this.anims.push({ t: 0, ms, f, fin }));
  }

  verifierFin() {
    if (this.b.pv > 0 && this.j.pv > 0) return false;
    this.etat = 'fin';
    const victoire = this.b.pv <= 0;
    this.majUI();
    this.log(victoire ? `🏆 ${this.def.nom} est vaincu·e !` : '💫 Tu es K.O.…');
    if (victoire) this.boss.rotation.z = Math.PI / 2;
    setTimeout(() => this.terminer(victoire), 1400);
    return true;
  }

  terminer(victoire) {
    this.canvas.removeEventListener('pointermove', this.surMouvement);
    this.canvas.removeEventListener('pointerdown', this.surClic);
    removeEventListener('keydown', this.surTouche);
    this.ui.racine.hidden = true;
    this.ui.journal.innerHTML = '';
    this.scene.remove(this.groupe);
    this.groupe.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
    this.onFin(victoire);
  }

  // ---------------------------------------------------------------- Tours
  debutTourJoueur() {
    Object.assign(this.j, { pa: PA_JOUEUR, pm: PM_JOUEUR });
    this.utilises = {};
    this.sort = null;
    this.etat = 'joueur';
    this.majUI();
  }

  finTourJoueur() {
    if (this.etat !== 'joueur') return;
    this.etat = 'boss';
    this.sort = null;
    this.majUI();
    this.tourBoss();
  }

  async tourBoss() {
    const b = this.b;
    b.pa = this.def.pa ?? 6;
    b.pm = this.def.pm ?? 3;
    await attendre(500);
    const sorts = this.def.sorts ?? [];
    const lancable = () => sorts
      .filter((s) => s.pa <= b.pa && this.atteint(s, b.c, this.j.c))
      .sort((x, y) => y.degats[1] - x.degats[1])[0];

    for (let essais = 0; essais < 4 && this.etat === 'boss'; essais++) {
      const s = lancable();
      if (s) { await this.lancer(b, s, this.j); await attendre(250); continue; }
      if (b.pm <= 0) break;
      // Chercher la case la plus proche d'où un sort atteint le joueur
      const carte = this.parcours(b.c, 30, true);
      let meilleure = null;
      for (const n of carte.values()) {
        const d = dist(n.c, this.j.c);
        const utile = sorts.some((x) => x.pa <= b.pa && this.atteint(x, n.c, this.j.c));
        const score = utile ? n.d : 100 + d;
        if (!meilleure || score < meilleure.score) meilleure = { c: n.c, score };
      }
      const chemin = meilleure ? this.remonter(carte, meilleure.c).slice(0, b.pm) : [];
      if (!chemin.length) break;
      await this.deplacer(b, chemin);
      this.orienter(b, this.j.c);
    }
    if (this.etat !== 'fin') {
      await attendre(300);
      this.debutTourJoueur();
    }
  }

  // ---------------------------------------------------------------- Boucle
  cadrerCamera() {
    this.camera.position.copy(ARENE.centre).add(new THREE.Vector3(0, 10.5, 9.5));
    this.camera.lookAt(ARENE.centre.clone().add(new THREE.Vector3(0, 0, 0.6)));
  }

  update(dt) {
    for (const a of [...this.anims]) {
      a.t += dt * 1000;
      const k = Math.min(a.t / a.ms, 1);
      a.f(k);
      if (k >= 1) { this.anims.splice(this.anims.indexOf(a), 1); a.fin(); }
    }
    for (const u of [this.j, this.b]) {
      animerPersonnage(u.mesh, dt, u.vitesse);
      if (!this.anims.length) u.vitesse = 0;
    }
  }
}
