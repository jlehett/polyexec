import net from 'net';
import readline from 'readline';
import { WebSocketServer } from 'ws';

class DataStream {
    constructor(port) {
        this.wss = new WebSocketServer({ port });
    }

    static init({ port }) {
        console.log('\x1b[37m\x1b[1m%s\x1b[0m', `\nStarting connection on port ${port}...`);

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

    static async getFirstAvailablePort(initialPort) {
        function askUserAboutPort(port) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            return new Promise((resolve) => {
                rl.question(`\x1b[33m\x1b[1mWould you like to try port ${port}? (y/n)\x1b[0m `, (answer) => {
                    rl.close();
                    resolve(answer.toLowerCase() === 'y');
                });
            });
        }

        let port = initialPort;
        do {
            if (await this.#isPortAvailable(port)) {
                return port;
            }

            console.log('\x1b[33m\x1b[1m%s\x1b[0m', `\nPort ${port} is in use.`);
            const isContinuing = await askUserAboutPort(++port);

            if (!isContinuing) {
                throw new Error('No available port found.');
            }
        } while (true);
    }

    static async #isPortAvailable(port) {
        return new Promise((resolve, reject) => {
            const tester = net.createServer()
                .once('error', err => (err.code === 'EADDRINUSE' ? resolve(false) : reject(err)))
                .once('listening', () => tester.once('close', () => resolve(true)).close())
                .listen(port);
        });
    }
}

export default DataStream;
