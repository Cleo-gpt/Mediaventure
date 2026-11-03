#!/bin/bash
# Double-clique sur ce fichier pour lancer Médiaventure dans le navigateur.
# (Le jeu ne peut pas s'ouvrir directement depuis le Finder : il a besoin d'un petit serveur local.)
cd "$(dirname "$0")"
PORT=8000
while lsof -i :$PORT >/dev/null 2>&1; do PORT=$((PORT + 1)); done
echo "Médiaventure : http://localhost:$PORT/jeu/"
echo "Laisse cette fenêtre ouverte pendant que tu joues. Ferme-la pour arrêter le jeu."
(sleep 1 && open "http://localhost:$PORT/jeu/") &
python3 -m http.server $PORT
