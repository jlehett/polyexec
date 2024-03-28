import WebSocket from 'ws';

class ConfigVar {
    static superType = 'configVar';
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
            superType: ConfigVar.superType,
        };
    }
}

export default ConfigVar;
