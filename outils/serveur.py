# Petit serveur local du jeu, sans cache : le navigateur recharge toujours la dernière version des fichiers.
import http.server
import sys


class SansCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
http.server.ThreadingHTTPServer(('', port), SansCache).serve_forever()
