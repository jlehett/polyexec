import WebSocket from 'ws';
import crypto from 'crypto';

class Request {
    static type;

    static create(json) {
        const request = new Request();
        request.json = json;
        request.id = crypto.randomUUID();

        return request;
    }

    static createResponse() {
        // TODO
    }

    async send(wss) {
        return new Promise((resolve) => {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ ...this.json, id: this.id, type: Request.type }));
                }

                client.on('message', (data) => {
                    try {
                        const { id, type, ...restOfResponse } = JSON.parse(data);

                        if (id === this.id && type === Request.type) {
                            resolve(restOfResponse);
                        }
                    } catch {}
                });
            });
        });
    }
}

export default Request;
