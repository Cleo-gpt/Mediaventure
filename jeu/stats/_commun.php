<?php
// Outils partagés des statistiques de Médiaventure.
// Toutes les parties sont regroupées dans data/parties.json (un objet : identifiant anonyme → fiche de la partie).
// Le dossier data/ est fermé au public par son .htaccess.

const DOSSIER_DONNEES = __DIR__ . '/data';
const FICHIER_PARTIES = DOSSIER_DONNEES . '/parties.json';
const CODE_STAFF = '582047';
const TAILLE_MAX = 65536;      // une fiche fait quelques Ko
const PARTIES_MAX = 20000;

function repondre(int $statut, array $donnees): void {
    http_response_code($statut);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($donnees, JSON_UNESCAPED_UNICODE);
    exit;
}

// Ouvre le fichier des parties verrouillé (lecture seule partagée ou écriture exclusive) et le décode.
// Renvoie [poignée, tableau des parties] ; la poignée doit être refermée par fermer_parties().
function ouvrir_parties(bool $ecriture): array {
    if (!is_dir(DOSSIER_DONNEES) && !mkdir(DOSSIER_DONNEES, 0750, true)) repondre(500, ['ok' => false, 'erreur' => 'dossier']);
    $f = fopen(FICHIER_PARTIES, $ecriture ? 'c+' : (is_file(FICHIER_PARTIES) ? 'r' : 'c+'));
    if (!$f) repondre(500, ['ok' => false, 'erreur' => 'fichier']);
    flock($f, $ecriture ? LOCK_EX : LOCK_SH);
    $contenu = stream_get_contents($f);
    $parties = $contenu === '' ? [] : json_decode($contenu, true);
    if (!is_array($parties)) {
        // fichier abîmé : on n'écrase rien
        flock($f, LOCK_UN);
        fclose($f);
        repondre(500, ['ok' => false, 'erreur' => 'fichier illisible']);
    }
    return [$f, $parties];
}

function ecrire_parties($f, array $parties): void {
    ftruncate($f, 0);
    rewind($f);
    fwrite($f, json_encode($parties, JSON_UNESCAPED_UNICODE));
    fflush($f);
}

function fermer_parties($f): void {
    flock($f, LOCK_UN);
    fclose($f);
}
