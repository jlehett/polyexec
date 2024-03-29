// vite-plugin-port-listener.js

import fs from 'fs';
import path from 'path';

export default function portListener() {
  return {
    name: 'vite-plugin-port-listener',
    configureServer(server) {
      server.httpServer?.on('listening', () => {
        const address = server.httpServer.address();
        const port = typeof address === 'string' ? address : address?.port;
        // Write the port to a temporary file that Electron can read
        fs.writeFileSync(path.resolve(__dirname, 'vite-port.txt'), port.toString());
      });
    },
  };
}
