import WebSocket from 'ws';

class Log {
    static superType = 'log';
    static type;

    get isValid() {
        return false;
    }

    send(wss) {
        if (!this.constructor.isValid) {
            return;
        }

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(this.toJSON()));
            }
        });
    }

    toJSON() {
        return {
            type: this.constructor.type,
            superType: Log.superType,
        };
    }
}

export default Log;