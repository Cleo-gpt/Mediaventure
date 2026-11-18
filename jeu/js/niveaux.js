// Données des niveaux, d'après la mindmap Médiaventure.
// Parcours : Sas → Multimédia → Design → Informatique → Marketing → Admin → boss final.

export const PALETTE = {
  corail: '#ff696a', rose: '#f8a0ab', rosePale: '#f5cacc',
  bleu: '#9bb3d6', creme: '#F1E6D0', marine: '#243447',
};

export const OBJETS = {
  sas: { nom: 'Clé du Sas', fichier: 'sas_cle.glb', icone: '🔑' },
  multimedia: { nom: 'Caméra à micro et haut-parleur', fichier: 'multimedia_camera.glb', icone: '📷' },
  design: { nom: 'Massicot', fichier: 'design_massicot.glb', icone: '✂️' },
  informatique: { nom: 'Raspberry Pi', fichier: 'informatique_raspberry-pi.glb', icone: '💻' },
  marketing: { nom: 'Parchemin aux puissantes statistiques', fichier: 'marketing_parchemin.glb', icone: '📜' },
  admin: { nom: 'Bouteille Gaïa', fichier: 'admin_bouteille-gaia.glb', icone: '🧃' },
};

export const NIVEAUX = {
  sas: {
    murs: [[3, 2], [5, 2], [1, 4], [4, 4], [7, 4], [2, 6], [6, 6]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 60, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Le Sas', ville: 'Kyoto', lieu: 'Forêt de bambous — Kyoto', biome: 'bambou', jouable: true,
    ciel: '#628d34', brume: '#628d34', sol: '#bd8a4c', chemin: PALETTE.creme, accent: PALETTE.corail,
    fond: '../fonds/sas_bambous.jpg', miniJeu: 'demo', suivant: 'multimedia',
    boss: {
      nom: 'Cléo Forclaz', titre: 'Gardienne du Sas (démo)', pv: 45, pa: 6, pm: 3,
      // Miko au masque de renard
      apparence: { espece: 'humain', coiffure: 'longs', cheveux: '#7a4a25', tenue: 'miko', masque: 'kitsune' },
      portrait: 'portraits/cleo_miko.png', // illustration détourée, affichée à côté de ses dialogues
      sorts: [
        { nom: 'Pichenette', pa: 3, portee: [1, 1], degats: [5, 8] },
        { nom: 'Feuille de bambou', pa: 4, portee: [2, 4], degats: [4, 7] },
      ],
    },
  },
  multimedia: {
    murs: [[2, 2], [6, 2], [4, 3], [0, 4], [2, 4], [6, 4], [8, 4], [4, 5], [3, 6], [5, 6]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 70, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Multimédia', ville: 'Sayo', lieu: 'Sayo — champs de tournesols', biome: 'tournesol', jouable: true,
    ciel: '#82ccfa', brume: '#7aa852', sol: '#77ab52', chemin: PALETTE.creme, accent: '#f2b632',
    fond: '../fonds/multimedia_tournesols.jpg', miniJeu: 'video', suivant: 'design',
    // Bibliothèque de vidéos : `youtube` = identifiant de la vidéo YouTube (il faut internet),
    // ou `src: 'videos/fichier.mp4'` pour une vidéo en local ; sans les deux, un lecteur animé la remplace.
    videos: [
      { titre: 'Projet vidéo', credit: 'Rémy Martinez', src: 'videos/projet-video.mp4', youtube: 'Ne7nYNzBqcg', duree: 114, icone: '🎬' },
      { titre: 'La vidéo en bref', credit: 'Cléo Ana Forclaz', src: 'videos/la-video-en-bref.mp4', youtube: 'at5eeLY0Xyw', duree: 136, icone: '🎞️' },
      { titre: 'Au-delà du sang', credit: 'Salomé Duperrex', src: 'videos/au-dela-du-sang.mp4', youtube: 'K6EnqKqhGyk', duree: 135, icone: '🎥' },
    ],
    boss: {
      nom: 'Roderick Graber', titre: 'Boss Multimédia', pv: 85, pa: 6, pm: 3,
      apparence: {
        espece: 'humain', tenue: 'veste', lunettes: true,
        // vraie tête tirée de la photo (texture préparée par outils/tete_photo.py)
        tetePhoto: {
          texture: 'portraits/graber_tete.png', cadre: [95, 75, 415, 455], nez: 285, cheveux: '#b39a7c', peau: '#d3a58e', hauteur: 0.6, decalage: 0.07,
          contour: [[193, 84], [250, 82], [293, 92], [358, 108], [390, 135], [400, 185], [398, 250], [390, 310], [372, 360], [335, 405],
            [295, 435], [258, 442], [215, 428], [170, 400], [132, 350], [110, 300], [105, 240], [113, 195], [150, 122], [172, 96]],
        },
      },
      portrait: 'portraits/graber.png',
      defi: 'Ah, te voilà ! Silence sur le plateau… moteur… action ! Voyons si tu tiens la lumière.',
      sorts: [
        { nom: 'Coupe franche', pa: 3, portee: [1, 1], degats: [9, 13] },
        { nom: 'Flash aveuglant', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
  },
  design: {
    murs: [[1, 2], [4, 2], [7, 2], [2, 4], [4, 4], [6, 4], [0, 5], [8, 5], [1, 6], [3, 6], [5, 6], [7, 6]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 80, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Design', ville: 'Hakone', lieu: 'Hakone — forêt d’automne', biome: 'automne', jouable: true,
    ciel: '#8cc4e8', brume: '#7fae4c', sol: '#86b24f', chemin: PALETTE.creme, accent: '#e8672c',
    fond: '../fonds/design_automne.jpg', miniJeu: 'portfolios', suivant: 'informatique',
    // E-portfolios à visiter : sans `url`, la case affiche « Bientôt »
    dureeVisite: 30, // secondes de visite avant de pouvoir valider l'épreuve
    portfolios: [
      { nom: 'Rémy Martinez', url: 'https://remymartinez.ch', icone: '🎨' },
      { nom: 'Samuel Porchet', url: 'https://samuelporchet.ch', icone: '✏️' },
      { nom: 'Salomé Duperrex', url: 'https://sduperrex.eleves.mediamatique.ch/portfolio/', icone: '🖌️' },
    ],
    boss: {
      nom: 'Jade Perroset', titre: 'Boss Design', pv: 85, pa: 6, pm: 3,
      apparence: {
        // comme M. Graber : la tenue de sa photo (haut noir) et sa vraie tête
        espece: 'humain', genre: 'femme', tenue: 'polo', polo: '#2a2a30', pantalon: '#232326', micro: false, cheveux: '#524441',
        // texture préparée par outils/tete_photo.py perroset
        tetePhoto: {
          texture: 'portraits/perroset_tete.png', cadre: [25, 10, 135, 150], nez: 80, cheveux: '#524441', peau: '#e2bcaa', hauteur: 0.6, decalage: 0.07,
          contour: [[60, 24], [80, 20], [100, 24], [115, 34], [123, 50], [126, 70], [124, 90], [120, 108], [113, 122], [103, 133],
            [90, 139], [78, 140], [66, 138], [55, 131], [46, 120], [40, 105], [36, 88], [36, 68], [40, 48], [48, 33]],
        },
      },
      portrait: 'portraits/perroset.png', // photo affichée à côté de ses dialogues
      defi: 'Bienvenue chez les designers ! Ici, chaque détail compte… Voyons si ton sens du style tient face au mien.',
      sorts: [
        { nom: 'Trait de cutter', pa: 3, portee: [1, 1], degats: [9, 13] },
        { nom: 'Palette de couleurs', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
  },
  informatique: {
    murs: [[1, 3], [3, 3], [5, 3], [7, 3], [0, 5], [2, 5], [4, 5], [6, 5], [8, 5], [3, 7], [5, 7]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 90, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Informatique', ville: 'Mont Fuji', lieu: 'Le Ciel — îles flottantes', biome: 'ciel', jouable: true,
    ciel: '#92a3b7', brume: '#a8b8cb', sol: '#bccad8', chemin: PALETTE.creme, accent: PALETTE.corail,
    fond: '../fonds/informatique_fuji.jpg', miniJeu: 'quiz', suivant: 'marketing',
    boss: {
      nom: 'Philippe Kiener', titre: 'Boss Informatique', pv: 90, pa: 6, pm: 3,
      apparence: { espece: 'humain', genre: 'homme', tenue: 'samourai', coiffure: 'samourai', cheveux: '#3a2c24', kimono: PALETTE.bleu, hakama: PALETTE.marine, hachimaki: '#f4efe4', katana: true, geta: PALETTE.bleu },
      sorts: [
        { nom: 'Erreur 404', pa: 3, portee: [1, 2], degats: [9, 13] },
        { nom: 'Écran bleu', pa: 4, portee: [2, 5], degats: [7, 11] },
      ],
    },
  },
  marketing: {
    murs: [[2, 2], [6, 2], [0, 3], [4, 3], [8, 3], [2, 4], [6, 4], [1, 5], [4, 5], [7, 5], [3, 6], [5, 6]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 100, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Marketing', ville: 'Nara', lieu: 'Nara — glycines', biome: 'glycine', jouable: true,
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
      nom: 'Olivier Droz', titre: 'Boss Marketing', pv: 95, pa: 6, pm: 3,
      apparence: {
        // comme M. Graber : la tenue de sa photo (polo orange) plutôt qu'un costume de samouraï
        espece: 'humain', genre: 'homme', tenue: 'polo', polo: '#f2a25a', cheveux: '#8a8682',
        // vraie tête tirée de la photo (texture préparée par outils/tete_photo.py droz)
        tetePhoto: {
          texture: 'portraits/droz_tete.png', cadre: [120, 80, 510, 620], nez: 305, cheveux: '#8a8682', peau: '#c99a86', hauteur: 0.6, decalage: 0.07,
          contour: [[215, 130], [270, 98], [330, 92], [395, 105], [445, 140], [478, 190], [488, 260], [492, 340], [482, 410],
            [462, 470], [430, 530], [385, 580], [330, 603], [275, 595], [232, 565], [205, 520], [180, 460], [150, 420],
            [138, 350], [140, 270], [155, 205], [180, 160]],
        },
      },
      portrait: 'portraits/droz.png', // photo affichée à côté de ses dialogues
      defi: 'Ah, te voilà ! En marketing, tout est une question de stratégie… Voyons si la tienne résiste à mes arguments.',
      sorts: [
        { nom: 'Argument choc', pa: 3, portee: [1, 1], degats: [10, 14] },
        { nom: 'Campagne virale', pa: 4, portee: [2, 5], degats: [8, 12] },
      ],
    },
  },
  admin: {
    murs: [[1, 2], [7, 2], [3, 3], [5, 3], [4, 4], [0, 5], [2, 5], [6, 5], [8, 5], [3, 6], [5, 6]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 110, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Admin & gestion', ville: 'Tokyo', lieu: 'Tokyo — sakura', biome: 'sakura', jouable: true,
    ciel: '#f2d9e8', brume: '#efd9ea', sol: '#b9cc8f', chemin: PALETTE.creme, accent: '#8a5fb4', // herbe de printemps sous les cerisiers
    miniJeu: 'stand-gaia', suivant: 'final',
    // Le code donné par la vendeuse du stand Gaïa change toutes les heures : voir js/code-gaia.js et codes-gaia.html
    boss: {
      nom: 'Baptiste Forestier', titre: 'Boss Admin', pv: 105, pa: 6, pm: 3,
      apparence: {
        // comme M. Graber et M. Droz : la tenue de sa photo (polo bleu-vert) et sa vraie tête
        espece: 'humain', genre: 'homme', tenue: 'polo', polo: '#2f5557', cheveux: '#3a2a22',
        // texture préparée par outils/tete_photo.py forestier
        tetePhoto: {
          texture: 'portraits/forestier_tete.png', cadre: [190, 55, 425, 410], nez: 305, cheveux: '#3a2a22', peau: '#3f2c24', hauteur: 0.6, decalage: 0.07, // peau = couleur de la barbe sur les côtés
          contour: [[240, 95], [290, 70], [345, 72], [385, 100], [402, 140], [408, 190], [410, 240], [400, 290], [392, 330],
            [375, 365], [345, 390], [310, 395], [275, 385], [248, 360], [230, 320], [222, 280], [210, 240], [202, 190],
            [205, 140], [220, 110]],
        },
      },
      portrait: 'portraits/forestier.png', // photo affichée à côté de ses dialogues
      defi: 'Ah, te voilà ! Ici, tout doit être en ordre : dossiers classés, factures réglées… Voyons si tu sais gérer la pression !',
      sorts: [
        { nom: 'Facture surprise', pa: 3, portee: [1, 1], degats: [10, 14] },
        { nom: 'Pile de dossiers', pa: 4, portee: [2, 5], degats: [8, 12] },
      ],
    },
  },
  final: {
    murs: [[2, 2], [4, 2], [6, 2], [1, 4], [3, 4], [5, 4], [7, 4], [2, 6], [4, 6], [6, 6], [0, 7], [8, 7]], // murs de bois de l'arène de combat (case [colonne, rangée])
    pvJoueur: 130, // PV du joueur sur cette île (ils augmentent au fil de l'aventure)
    titre: 'Boss final — Média global', ville: 'Kyoto', lieu: 'Kyoto — le pavillon d’or (Kinkaku-ji)', biome: 'final', jouable: true,
    ciel: '#c3cdd2', brume: '#c9d3d6', sol: '#8fa477', chemin: PALETTE.creme, accent: PALETTE.corail, // ciel gris et mousse du jardin du pavillon d'or
    miniJeu: 'combat-final', suivant: null,
    gain: 'Passe au stand Médiaventure : ton gain t’attend (goodies, print spécial PO ou rabais sur une Gaïa) !',
    boss: {
      nom: 'Christophe Haenssler', titre: 'Boss final', pv: 160, pa: 7, pm: 3,
      apparence: {
        // comme les autres boss photo : la tenue de sa photo (chemise à carreaux rouges) et sa vraie tête
        espece: 'humain', genre: 'homme', tenue: 'polo', carreaux: true, polo: '#c8383d', micro: false, cheveux: '#7a6458',
        // texture préparée par outils/tete_photo.py haenssler
        tetePhoto: {
          texture: 'portraits/haenssler_tete.png', cadre: [125, 25, 365, 320], nez: 248, cheveux: '#7a6458', peau: '#d39c86', hauteur: 0.6, decalage: 0.07,
          contour: [[195, 45], [245, 33], [295, 40], [330, 70], [345, 115], [355, 165], [352, 215], [338, 255], [315, 285],
            [280, 305], [245, 310], [210, 300], [180, 275], [160, 240], [142, 200], [135, 160], [140, 110], [160, 70]],
        },
      },
      portrait: 'portraits/haenssler.png', // photo affichée à côté de ses dialogues
      defi: 'Te voilà enfin ! Tu as réuni les six objets de quête… Mais pour terminer Médiaventure, il faudra d’abord passer par moi !',
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
