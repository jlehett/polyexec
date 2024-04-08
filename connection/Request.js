import WebSocket from 'ws';
import crypto from 'crypto';

class Request {
    static superType = 'request';
    static type;

    constructor(json) {
        this.json = json;
        this.id = crypto.randomUUID();
    }

    async send(wss) {
        return new Promise((resolve) => {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ ...this.json, id: this.id, type: this.constructor.type, superType: Request.superType }));
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

    static constructResponse(request, response) {
        return { ...response, id: request.id, type: request.type };
    }
}

export default Request;
