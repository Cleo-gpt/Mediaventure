// Assemble le jeu pour qu'il s'ouvre par simple double-clic sur jeu/index.html (sans serveur) :
//  - jeu/jeu.js         : tout le code (js/ + three.js) en un seul script classique
//  - jeu/ressources.js  : décors et objets 3D intégrés en data: URL (le navigateur refuse de les lire en file://)
// À relancer après chaque modification de jeu/js/ ou des dossiers fonds/ et objets-quete/ :
//   node outils/construire.mjs
import { build } from 'esbuild';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const jeu = join(racine, 'jeu');

const addonsThree = {
  name: 'addons-three',
  setup(b) {
    b.onResolve({ filter: /^three\/addons\// }, (a) => ({ path: join(jeu, 'vendor/addons', a.path.slice('three/addons/'.length)) }));
  },
};

// Worker qui sculpte les formes des personnages en arrière-plan : son code est glissé dans jeu.js
// (un fichier séparé ne pourrait pas être chargé en double-cliquant sur index.html)
const worker = await build({
  entryPoints: [join(jeu, 'js/worker-formes.js')],
  bundle: true, format: 'iife', minify: true, target: 'es2020', write: false,
  alias: { three: join(jeu, 'vendor/three.module.min.js') },
  plugins: [addonsThree],
  logLevel: 'warning',
});
const codeWorker = worker.outputFiles[0].text;
console.log(`worker des formes : ${(codeWorker.length / 1024).toFixed(0)} ko`);

await build({
  entryPoints: [join(jeu, 'js/main.js')],
  define: { __CODE_WORKER__: JSON.stringify(codeWorker) },
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2020',
  outfile: join(jeu, 'jeu.js'),
  alias: { three: join(jeu, 'vendor/three.module.min.js') },
  plugins: [addonsThree],
  banner: { js: '// Fichier généré par outils/construire.mjs — ne pas modifier à la main (modifier jeu/js/ puis relancer).' },
  logLevel: 'info',
});

// Page imprimable des codes horaires du stand Gaïa (même calcul que dans le jeu)
await build({
  entryPoints: [join(jeu, 'js/page-codes-gaia.js')],
  bundle: true, format: 'iife', minify: true, target: 'es2020',
  outfile: join(jeu, 'codes-gaia.js'),
  banner: { js: '// Fichier généré par outils/construire.mjs — ne pas modifier à la main.' },
  logLevel: 'info',
});

const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.glb': 'model/gltf-binary' };
const ressources = {};
for (const dossier of ['fonds', 'objets-quete', 'portraits', 'carpes']) {
  for (const f of readdirSync(join(racine, dossier))) {
    const type = TYPES[extname(f).toLowerCase()];
    if (!type) continue;
    ressources[`../${dossier}/${f}`] = `data:${type};base64,` + readFileSync(join(racine, dossier, f)).toString('base64');
  }
}
writeFileSync(join(jeu, 'ressources.js'),
  '// Fichier généré par outils/construire.mjs — décors et objets 3D intégrés pour fonctionner sans serveur.\n' +
  'window.RESSOURCES = ' + JSON.stringify(ressources) + ';\n');
console.log(`ressources.js : ${Object.keys(ressources).length} fichiers intégrés`);
