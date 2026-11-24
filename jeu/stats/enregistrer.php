<?php
// Reçoit la fiche (anonyme) d'une partie de Médiaventure et la range avec les autres.
// Le jeu envoie la fiche complète à chaque étape : on garde la plus récente pour chaque identifiant.
// Appelé depuis le jeu en ligne et depuis le jeu ouvert par double-clic (origine « null ») : CORS ouvert.
require __DIR__ . '/_commun.php';

header('Access-Control-Allow-Origin: *');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') repondre(405, ['ok' => false]);

$brut = file_get_contents('php://input', false, null, 0, TAILLE_MAX + 1);
if ($brut === false || strlen($brut) > TAILLE_MAX) repondre(413, ['ok' => false]);
$fiche = json_decode($brut, true);
$id = is_array($fiche) ? ($fiche['id'] ?? '') : '';
if (!is_string($id) || !preg_match('/^[a-f0-9-]{16,40}$/i', $id)) repondre(400, ['ok' => false]);
unset($fiche['prenom']); // les parties restent anonymes
$fiche['recu'] = gmdate('c');

[$f, $parties] = ouvrir_parties(true);
$ancienne = $parties[$id] ?? null;
if ($ancienne === null && count($parties) >= PARTIES_MAX) { fermer_parties($f); repondre(507, ['ok' => false]); }
// une fiche plus ancienne (envoi en retard) ne remplace pas une plus récente
if ($ancienne === null || strcmp((string)($fiche['maj'] ?? ''), (string)($ancienne['maj'] ?? '')) >= 0) {
    $parties[$id] = $fiche;
    ecrire_parties($f, $parties);
}
fermer_parties($f);

// copie de secours une fois par jour
$copie = DOSSIER_DONNEES . '/copie-' . gmdate('Y-m-d') . '.json';
if (!is_file($copie)) @copy(FICHIER_PARTIES, $copie);

repondre(200, ['ok' => true]);
