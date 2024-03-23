import WebSocket from 'ws';

class Log {
    static type;

    send(wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(this.toJSON()));
            }
        });
    }

    toJSON() {
        return {
            type: this.constructor.type,
        }
    }
}

export default Log;