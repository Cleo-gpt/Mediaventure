// Données des niveaux, d'après la mindmap Médiaventure.
// Parcours : Sas → Multimédia → Design → Informatique → Marketing → Admin → boss final.

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
    fond: '../fonds/sas_bambous.jpg', miniJeu: 'demo', suivant: 'multimedia',
    boss: {
      nom: 'Cléo Forclaz', titre: 'Gardienne du Sas (démo)', pv: 45, pa: 6, pm: 3,
      // Miko au masque de renard
      apparence: { espece: 'humain', coiffure: 'longs', cheveux: '#7a4a25', tenue: 'miko', masque: 'kitsune' },
      portrait: '../portraits/cleo_miko.png', // illustration détourée, affichée à côté de ses dialogues
      sorts: [
        { nom: 'Pichenette', pa: 3, portee: [1, 1], degats: [5, 8] },
        { nom: 'Feuille de bambou', pa: 4, portee: [2, 4], degats: [4, 7] },
      ],
    },
  },
  multimedia: {
    titre: 'Multimédia', lieu: 'Sayo — champs de tournesols', biome: 'tournesol', jouable: true,
    ciel: '#82ccfa', brume: '#7aa852', sol: '#77ab52', chemin: PALETTE.creme, accent: '#f2b632',
    fond: '../fonds/multimedia_tournesols.jpg', miniJeu: 'video', suivant: 'design',
    // Bibliothèque de vidéos : ajoute `src: '../videos/fichier.mp4'` pour lire une vraie vidéo
    videos: [
      { titre: 'Making-of d’un clip', duree: 12, icone: '🎬' },
      { titre: 'Le montage en 3 minutes', duree: 12, icone: '✂️' },
      { titre: 'Prise de son en extérieur', duree: 12, icone: '🎙️' },
      { titre: 'Lumière : la règle des 3 points', duree: 12, icone: '💡' },
    ],
    boss: {
      nom: 'M. Graber', titre: 'Boss Multimédia', pv: 85, pa: 6, pm: 3,
      apparence: {
        espece: 'humain', tenue: 'veste', lunettes: true,
        // vraie tête tirée de la photo (texture préparée par outils/tete_photo.py)
        tetePhoto: {
          texture: '../portraits/graber_tete.png', cadre: [95, 75, 415, 455], nez: 285, cheveux: '#b39a7c', peau: '#d3a58e', hauteur: 0.6, decalage: 0.07,
          contour: [[193, 84], [250, 82], [293, 92], [358, 108], [390, 135], [400, 185], [398, 250], [390, 310], [372, 360], [335, 405],
            [295, 435], [258, 442], [215, 428], [170, 400], [132, 350], [110, 300], [105, 240], [113, 195], [150, 122], [172, 96]],
        },
      },
      portrait: '../portraits/graber.png',
      defi: 'Ah, te voilà ! Silence sur le plateau… moteur… action ! Voyons si tu tiens la lumière.',
      sorts: [
        { nom: 'Coupe franche', pa: 3, portee: [1, 1], degats: [9, 13] },
        { nom: 'Flash aveuglant', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
  },
  design: {
    titre: 'Design', lieu: 'Parc national de Daisetsuzan', biome: 'automne', jouable: true,
    ciel: '#f4b98a', brume: '#f2c29a', sol: '#c9884e', chemin: PALETTE.creme, accent: '#e8672c',
    miniJeu: '7-differences', suivant: 'informatique',
    boss: {
      nom: 'Mme Nicolier', titre: 'Boss Design', pv: 85, pa: 6, pm: 3,
      apparence: { espece: 'panda', coiffure: 'chignon', cheveux: '#a8643a', kimono: '#e8672c', geta: PALETTE.creme },
      sorts: [
        { nom: 'Trait de cutter', pa: 3, portee: [1, 1], degats: [9, 13] },
        { nom: 'Palette de couleurs', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
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
    titre: 'Marketing', lieu: 'Nara — glycines', biome: 'glycine', jouable: true,
    ciel: '#d9b3e0', brume: '#dcbde3', sol: '#9db56a', chemin: PALETTE.creme, accent: '#a44c94',
    miniJeu: 'etapes-projet', suivant: 'admin',
    // Étapes d'un projet marketing, dans le bon ordre (elles sont mélangées dans l'épreuve)
    etapes: [
      'Analyser le marché et la concurrence',
      'Définir la cible (persona)',
      'Fixer des objectifs mesurables',
      'Choisir la stratégie et le positionnement',
      'Construire le plan d’action et le budget',
      'Lancer la campagne',
      'Mesurer les résultats et ajuster',
    ],
    boss: {
      nom: 'M. Droz', titre: 'Boss Marketing', pv: 90, pa: 6, pm: 3,
      apparence: { espece: 'shiba', coiffure: 'tresses', cheveux: '#5a3a2a', kimono: '#a44c94', geta: PALETTE.corail },
      sorts: [
        { nom: 'Argument choc', pa: 3, portee: [1, 1], degats: [10, 14] },
        { nom: 'Campagne virale', pa: 4, portee: [2, 5], degats: [8, 12] },
      ],
    },
  },
  admin: {
    titre: 'Admin & gestion', lieu: 'Tokyo — sakura', biome: 'sakura', jouable: true,
    ciel: '#e2c9ec', brume: '#e6d0ef', sol: '#b49ac8', chemin: PALETTE.creme, accent: '#8a5fb4',
    miniJeu: 'stand-gaia', suivant: 'final',
    // Code donné par la vendeuse du vrai stand Gaïa aux portes ouvertes (à changer le jour J)
    codeGaia: 'GAIA',
    boss: {
      nom: 'M. Forestier', titre: 'Boss Admin', pv: 95, pa: 6, pm: 3,
      apparence: { espece: 'panda', coiffure: 'chonmage', cheveux: '#2a2a2e', kimono: '#8a5fb4', geta: PALETTE.marine },
      sorts: [
        { nom: 'Facture surprise', pa: 3, portee: [1, 1], degats: [10, 14] },
        { nom: 'Pile de dossiers', pa: 4, portee: [2, 5], degats: [8, 12] },
      ],
    },
  },
  final: {
    titre: 'Boss final — Média global', lieu: 'Matsue — château au bord du lac', biome: 'final', jouable: true,
    ciel: '#bfdcf0', brume: '#cfe6f5', sol: '#9fc4dc', chemin: PALETTE.creme, accent: PALETTE.corail,
    miniJeu: 'combat-final', suivant: null,
    gain: 'Passe au stand Médiaventure : ton gain t’attend (goodies, print spécial PO ou rabais sur une Gaïa) !',
    boss: {
      nom: 'M. Denervaud ou M. Haensler', titre: 'Boss final', pv: 150, pa: 7, pm: 3,
      apparence: { espece: 'shiba', coiffure: 'chonmage', cheveux: '#e8d2a6', kimono: PALETTE.marine, katana: true, geta: PALETTE.corail },
      sorts: [
        { nom: 'Coup de maître', pa: 3, portee: [1, 1], degats: [12, 16] },
        { nom: 'Onde médiatique', pa: 4, portee: [2, 5], degats: [9, 13] },
      ],
    },
  },
};

export const ORDRE = ['sas', 'multimedia', 'design', 'informatique', 'marketing', 'admin', 'final'];

// Sorts du joueur (combat au tour par tour façon tactique : PA = points d'action, PM = points de mouvement)
export const SORTS_JOUEUR = [
  { id: 'katana', nom: 'Coup de katana', pa: 3, portee: [1, 1], degats: [14, 19], touche: '1' },
  { id: 'shuriken', nom: 'Shuriken', pa: 4, portee: [2, 5], degats: [9, 13], touche: '2' },
  { id: 'matcha', nom: 'Thé matcha', pa: 3, portee: [0, 0], soin: [12, 16], parTour: 1, touche: '3' },
];
