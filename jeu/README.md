# Médiaventure — prototype jouable

## Lancer le jeu
Le plus simple : double-cliquer sur **« Lancer le jeu.command »** à la racine du dépôt.
(Ouvrir `index.html` directement depuis le Finder ne marche pas : le navigateur bloque le code du jeu.)

Ou à la main, Depuis la racine du dépôt (le jeu charge `../objets-quete` et `../fonds`) :

```
python3 -m http.server 8000
```
puis ouvrir http://localhost:8000/jeu/

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
| Multimédia | Champs de tournesols de Sayo | Regarder une vidéo de la bibliothèque | M. Graber | Caméra |
| Design | Daisetsuzan en automne | Jeu des 7 différences | Mme Nicolier | Règle-cutter |
| Informatique | Îles flottantes, fond mont Fuji | Quiz (7 bonnes réponses sur 10) | M. Kiner | Raspberry Pi |
| Marketing | Nara : glycines, cerfs, pagode | Remettre les étapes d'un projet dans l'ordre | M. Droz | Parchemin |
| Admin | Tokyo : sakura, stand Gaïa | Code donné au vrai stand Gaïa | M. Forestier | Bouteille Gaïa |
| Boss final | Matsue : château au bord du lac | Les 6 objets sont obligatoires | M. Denervaud ou M. Haensler | Gain au stand |

À régler avant les portes ouvertes, dans `js/niveaux.js` :
- `codeGaia` (île Admin) : le code que donnera la vendeuse du stand Gaïa ;
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
