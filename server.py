import http.server
import socketserver
import os
import urllib.parse

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Handle clean URLs by appending .html
        if not path.endswith('.html') and not '.' in path and path != '/':
            # Check if the file exists with .html extension
            if os.path.exists(path.lstrip('/') + '.html'):
                self.path = path + '.html'
        
        # Handle root path
        if path == '/':
            self.path = '/index.html'
            
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Set the port
PORT = 8000

# Create the server
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}")
    httpd.serve_forever() 