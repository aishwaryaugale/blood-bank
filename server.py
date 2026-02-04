#!/usr/bin/env python3
"""
Simple HTTP Server for LifeFlow Blood Bank Development
Allows mobile preview on same network
"""

import http.server
import socketserver
import socket
import webbrowser
import os
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = "."

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for mobile access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def get_local_ip():
    """Get the local IP address for network access"""
    try:
        # Connect to an external host to get local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "localhost"

def main():
    # Change to the script's directory
    os.chdir(Path(__file__).parent)
    
    # Get local IP
    local_ip = get_local_ip()
    
    # Create server
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"""
🩸 LifeFlow Blood Bank Development Server
==========================================

📱 Mobile Preview URLs:
   Local:   http://localhost:{PORT}
   Network: http://{local_ip}:{PORT}

🔗 Share this URL with friends:
   http://{local_ip}:{PORT}

📋 Instructions for friends:
   1. Make sure you're on the same WiFi network
   2. Open the network URL in phone browser
   3. Add to home screen for app-like experience

🛑 Press Ctrl+C to stop server
""")
        
        # Try to open browser automatically
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    main()
