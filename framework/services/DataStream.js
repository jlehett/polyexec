import { WebSocketServer } from 'ws';

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

    sendLog(log) {
        log.send(this.wss);
    }

    async sendRequest(request) {
        return request.send(this.wss);
    }

    sendConfigVarUsage(configVar) {
        configVar.send(this.wss);
    }
}

export default DataStream;
