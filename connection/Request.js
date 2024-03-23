import WebSocket from 'ws';
import crypto from 'crypto';

class Request {
    static type = 'request';

    constructor(json) {
        this.json = json;
        this.id = crypto.randomUUID();
    }

    static createResponse() {
        // TODO
    }

    async send(wss) {
        return new Promise((resolve) => {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ ...this.json, id: this.id, type: this.constructor.type }));
                }

                client.on('message', (data) => {
                    try {
                        const { id, type, ...restOfResponse } = JSON.parse(data);

                        if (id === this.id && type === this.constructor.type) {
                            resolve(restOfResponse);
                        }
                    } catch {}
                });
            });
        });
    }

    static async sendResponse(socket, request, json) {
        socket.send(JSON.stringify({ ...json, id: request.id, type: request.type }));
    }
}

export default Request;
