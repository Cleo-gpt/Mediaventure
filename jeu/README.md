# Médiaventure — prototype jouable

## Lancer le jeu
Double-cliquer sur **`jeu/index.html`** : le jeu s'ouvre directement dans le navigateur, sans serveur.

### Après une modification du code
Le navigateur lit `jeu/jeu.js` et `jeu/ressources.js`, deux fichiers **générés** à partir de `jeu/js/`, `fonds/`, `objets-quete/`, `portraits/` et `carpes/`.
Après avoir modifié l'un de ces dossiers, relancer depuis la racine du dépôt :

```
npm install        # une seule fois (installe esbuild)
node outils/construire.mjs
```

Les carpes koï du niveau Informatique sont découpées des dessins de `références/carpes/` :
`python outils/carpes.py` (numpy, Pillow, opencv) régénère `carpes/`, puis relancer `construire.mjs`.

On peut aussi passer par un serveur local (« Lancer le jeu.command »), par exemple pour tester un niveau précis.
Accès direct à un niveau pour tester : `http://localhost:8000/jeu/?niveau=informatique`
(identifiants : `sas`, `multimedia`, `design`, `informatique`, `marketing`, `admin`, `final`).

## Contrôles
- Exploration : ZQSD / WASD / flèches, Espace saut, Maj course, E interagir, glisser la souris = caméra, molette = zoom
- Combat (tour par tour) : clic sur une case bleue = déplacement (PM), 1/2/3 ou clic = sort (PA), Entrée = fin du tour

## Ce qui est jouable
Les sept îles de la mindmap, dans l'ordre des portails :

| Île | Décor | Épreuve du milieu | Boss | Objet |
|---|---|---|---|---|
| Sas | Forêt de bambous (fond dessiné) | Présentation par Cléo + combat d'entraînement | Cléo Forclaz | Clé |
| Multimédia | Champs de tournesols de Sayo | Regarder une vidéo de la bibliothèque | Roderick Graber | Caméra |
| Design | Daisetsuzan en automne | Jeu des 7 différences | Ariane Nicollier | Règle-cutter |
| Informatique | Îles flottantes, fond mont Fuji | Quiz (7 bonnes réponses sur 10) | Philippe Kiener | Raspberry Pi |
| Marketing | Nara : glycines, cerfs, pagode | Remettre les étapes d'un projet dans l'ordre | Olivier Droz | Parchemin |
| Admin | Tokyo : sakura, stand Gaïa | Code donné au vrai stand Gaïa | Baptiste Forestier | Bouteille Gaïa |
| Boss final | Matsue : château au bord du lac | Les 6 objets sont obligatoires | Christophe Haenssler | Gain au stand |

À régler avant les portes ouvertes, dans `js/niveaux.js` :
- code du stand Gaïa (île Admin) : il change toutes les heures. La vendeuse imprime la liste du jour avec **`jeu/codes-gaia.html`** (double-clic, choisir la date, imprimer). Le jeu accepte le code de l'heure en cours et celui de l'heure précédente. Avant les portes ouvertes, changer `SECRET_GAIA` dans `js/code-gaia.js` (puis relancer `construire.mjs`) : tous les codes changent ;
- `videos` (île Multimédia) : ajouter `src: '../videos/fichier.mp4'` pour lire de vraies vidéos ;
- `gain` (boss final) : le texte du gain.

## Où modifier quoi
| Fichier | Contenu |
|---|---|
| `js/niveaux.js` | Données des niveaux (biome, boss, sorts, objet, niveau suivant) |
| `js/quiz.js` | Questions du quiz Informatique |
| `js/minijeux.js` | Épreuves : vidéo, 7 différences, étapes marketing, code Gaïa |
| `js/vestiaire.js` | Écran du Sas : catégories, cartes, rareté, historique |
| `js/personnage.js` | Options de personnage (genre, coiffures, kimono, accessoires) |
| `js/monde.js` | Construction des îles et décors par biome |
| `js/combat.js` | Combat tactique au tour par tour |
| `js/main.js` | Déroulé du jeu (états, dialogues, inventaire, portails) |

Les objets de quête `.glb` sont générés par `outils/objets-quete/generer.js` (`npm install && npm run build`).
`outils/apercu-objets.html` affiche tous les objets de quête côte à côte.
