import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';

class DataStream {
    constructor(port) {
        this.wss = new WebSocketServer({ port });
    }

    static init(
        {
            port = 8080,
        } = {}
    ) {
        return new DataStream(port);
    }

    async waitForConnection() {
        return new Promise((resolve) => {
            this.wss.on('connection', () => {
                resolve();
            });
        });
    }

    sendLog({ logKey, message, type }) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ logKey, message, type }));
            }
        })
    }

    askClientForValue({ message, validate }) {
        const askID = crypto.randomUUID();

        return new Promise((resolve) => {
            this.wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ message, validate: validate.toString(), askID }));
                }

                client.on('message', (data) => {
                    try {
                        const { askID: responseID, value } = JSON.parse(data);

                        if (responseID === askID) {
                            resolve(value);
                        }
                    } catch {}
                });
            })
        });
    }
}

export default DataStream;
