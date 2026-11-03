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
- **Sas** : le jeu s'ouvre directement sur le vestiaire (inspiré de `références/personnage-tenue.jpg`) : onglets Tenue / Visage / Identité, cartes à étoiles, tri, annuler / rétablir / réinitialiser.
  Puis la forêt de bambous : dialogue avec Cléo Forclaz → combat d'entraînement → Clé → portail
- **Informatique** (le Ciel, fond mont Fuji) : quiz 10 questions (7 bonnes réponses obligatoires) → boss M. Kiner → Raspberry Pi → portail
- Les autres niveaux ont leur biome (couleurs), leur boss et leur objet, mais leur mini-jeu reste à construire.
- Le boss final vérifie que les six objets de quête ont été récupérés.

## Où modifier quoi
| Fichier | Contenu |
|---|---|
| `js/niveaux.js` | Données des niveaux (biome, boss, sorts, objet, niveau suivant) |
| `js/quiz.js` | Questions du quiz Informatique |
| `js/vestiaire.js` | Écran du Sas : catégories, cartes, rareté, historique |
| `js/personnage.js` | Options de personnage (genre, coiffures, kimono, accessoires) |
| `js/monde.js` | Construction des îles et décors par biome |
| `js/combat.js` | Combat tactique au tour par tour |
| `js/main.js` | Déroulé du jeu (états, dialogues, inventaire, portails) |

Les objets de quête `.glb` sont générés par `outils/objets-quete/generer.js` (`npm install && npm run build`).
`outils/apercu-objets.html` affiche tous les objets de quête côte à côte.
