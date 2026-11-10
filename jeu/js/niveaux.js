// Données des niveaux, d'après la mindmap Médiaventure.
// `jouable: false` = le biome et le boss sont définis, mais le mini-jeu reste à construire.

export const PALETTE = {
  corail: '#ff696a', rose: '#f8a0ab', rosePale: '#f5cacc',
  bleu: '#9bb3d6', creme: '#F1E6D0', marine: '#243447',
};

export const OBJETS = {
  sas: { nom: 'Clé du Sas', fichier: 'sas_cle.glb', icone: '🔑' },
  multimedia: { nom: 'Caméra à micro et haut-parleur', fichier: 'multimedia_camera.glb', icone: '📷' },
  design: { nom: 'Règle tranchante comme un cutter', fichier: 'design_regle-cutter.glb', icone: '📐' },
  informatique: { nom: 'Raspberry Pi', fichier: 'informatique_raspberry-pi.glb', icone: '💻' },
  marketing: { nom: 'Parchemin aux puissantes statistiques', fichier: 'marketing_parchemin.glb', icone: '📜' },
  admin: { nom: 'Bouteille Gaïa', fichier: 'admin_bouteille-gaia.glb', icone: '🧃' },
};

export const NIVEAUX = {
  sas: {
    titre: 'Le Sas', lieu: 'Forêt de bambous — Kyoto', biome: 'bambou', jouable: true,
    ciel: '#628d34', brume: '#628d34', sol: '#bd8a4c', chemin: PALETTE.creme, accent: PALETTE.corail,
    fond: '../fonds/sas_bambous.jpg', miniJeu: 'demo', suivant: 'informatique',
    boss: {
      nom: 'Cléo Forclaz', titre: 'Gardienne du Sas (démo)', pv: 45, pa: 6, pm: 3,
      // Miko au masque de renard
      apparence: { espece: 'humain', coiffure: 'carre', cheveux: '#4a3226', tenue: 'miko', masque: 'kitsune' },
      portrait: '../portraits/cleo_miko.png', // illustration détourée, affichée à côté de ses dialogues
      sorts: [
        { nom: 'Pichenette', pa: 3, portee: [1, 1], degats: [5, 8] },
        { nom: 'Feuille de bambou', pa: 4, portee: [2, 4], degats: [4, 7] },
      ],
    },
  },
  multimedia: {
    titre: 'Multimédia', lieu: 'Sayo — champs de tournesols', biome: 'tournesol', jouable: false,
    ciel: '#fbe7a1', brume: '#fbe7a1', sol: '#d8b44a', chemin: PALETTE.creme, accent: '#f2b632',
    miniJeu: 'video', suivant: 'design',
    boss: { nom: 'M. Graber', titre: 'Boss Multimédia', pv: 80 },
  },
  design: {
    titre: 'Design', lieu: 'Parc national de Daisetsuzan', biome: 'automne', jouable: false,
    ciel: '#f7c9a0', brume: '#f7c9a0', sol: '#d9824b', chemin: PALETTE.creme, accent: '#e8672c',
    miniJeu: '7-differences', suivant: 'informatique',
    boss: { nom: 'Mme Nicolier', titre: 'Boss Design', pv: 80 },
  },
  informatique: {
    titre: 'Informatique', lieu: 'Le Ciel — îles flottantes', biome: 'ciel', jouable: true,
    ciel: '#92a3b7', brume: '#a8b8cb', sol: '#bccad8', chemin: PALETTE.creme, accent: PALETTE.corail,
    fond: '../fonds/informatique_fuji.jpg', miniJeu: 'quiz', suivant: 'marketing',
    boss: {
      nom: 'M. Kiner', titre: 'Boss Informatique', pv: 90, pa: 6, pm: 3,
      apparence: { espece: 'panda', genre: 'homme', coiffure: 'chonmage', cheveux: '#2a2a2e', kimono: PALETTE.marine },
      sorts: [
        { nom: 'Erreur 404', pa: 3, portee: [1, 2], degats: [9, 13] },
        { nom: 'Écran bleu', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
  },
  marketing: {
    titre: 'Marketing', lieu: 'Nara — glycines', biome: 'glycine', jouable: false,
    ciel: '#e3b6d8', brume: '#e3b6d8', sol: '#b16ea3', chemin: PALETTE.creme, accent: '#a44c94',
    miniJeu: 'etapes-projet', suivant: 'admin',
    boss: { nom: 'M. Droz', titre: 'Boss Marketing', pv: 80 },
  },
  admin: {
    titre: 'Admin & gestion', lieu: 'Tokyo — sakura', biome: 'sakura', jouable: false,
    ciel: '#d9c2ea', brume: '#d9c2ea', sol: '#a98bc4', chemin: PALETTE.creme, accent: '#8a5fb4',
    miniJeu: 'stand-gaia', suivant: 'final',
    boss: { nom: 'M. Forestier', titre: 'Boss Admin', pv: 80 },
  },
  final: {
    titre: 'Boss final — Média global', lieu: 'Matsue — bleu clair', biome: 'final', jouable: false,
    ciel: '#cfe6f5', brume: '#cfe6f5', sol: '#9bc7e3', chemin: PALETTE.creme, accent: PALETTE.corail,
    miniJeu: 'combat-final', suivant: null,
    boss: { nom: 'M. Denervaud ou M. Haensler', titre: 'Boss final', pv: 150 },
  },
};

export const ORDRE = ['sas', 'multimedia', 'design', 'informatique', 'marketing', 'admin', 'final'];

// Sorts du joueur (combat au tour par tour façon tactique : PA = points d'action, PM = points de mouvement)
export const SORTS_JOUEUR = [
  { id: 'katana', nom: 'Coup de katana', pa: 3, portee: [1, 1], degats: [14, 19], touche: '1' },
  { id: 'shuriken', nom: 'Shuriken', pa: 4, portee: [2, 5], degats: [9, 13], touche: '2' },
  { id: 'matcha', nom: 'Thé matcha', pa: 3, portee: [0, 0], soin: [12, 16], parTour: 1, touche: '3' },
];
