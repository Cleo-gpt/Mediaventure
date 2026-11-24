<?php
// Renvoie toutes les parties à la page des statistiques (code staff demandé).
require __DIR__ . '/_commun.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') repondre(405, ['ok' => false]);
$demande = json_decode(file_get_contents('php://input', false, null, 0, 1024) ?: '', true);
if (!is_array($demande) || !hash_equals(CODE_STAFF, (string)($demande['code'] ?? ''))) {
    usleep(600000); // ralentit les essais au hasard
    repondre(403, ['ok' => false, 'erreur' => 'code']);
}
[$f, $parties] = ouvrir_parties(false);
fermer_parties($f);
repondre(200, ['ok' => true, 'parties' => array_values($parties)]);
