import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import DataStream from './DataStream.js';

class GUI {
    #isInitialized = false;
    #dataStream;

    get isInitialized() {
        return this.#isInitialized;
    }

    async init(
        {
            port = 21734,
        } = {}
    ) {
        const portToUse = await DataStream.getFirstAvailablePort(port)
            .catch((err) => {
                console.log('\n\x1b[31m%s\x1b[0m', `No available port found.`);
                console.log('\x1b[31m%s\x1b[0m', 'Halting execution.');
                process.exit(1);
            });

        this.#dataStream = DataStream.init({ port: portToUse });

        this.#startElectronApp(portToUse);

        await this.#dataStream.waitForConnection();

        console.log('\x1b[32m%s\x1b[0m', 'GUI and script connection established.\n');

        this.#isInitialized = true;
    }

    async sendRequest(request) {
        return this.#dataStream.sendRequest(request);
    }

    sendLog(log) {
        this.#dataStream.sendLog(log);
    }

    sendConfigVarUsage(configVar) {
        this.#dataStream.sendConfigVarUsage(configVar);
    }

    #startElectronApp(port) {
        console.log('\x1b[37m\x1b[1m%s\x1b[0m', '\nStarting GUI...\n');

        const autoscriptMainDir = path.join(fileURLToPath(import.meta.url), '../../../');

        const electronApp = spawn('npm', ['start'], {
            cwd: autoscriptMainDir,
            env: { ...process.env, CONNECTION_PORT: port },
            shell: true
        });

        electronApp.stdout.on('data', (data) => {
            if (data.includes('ready in')) {
                console.log('\x1b[32m%s\x1b[0m', 'GUI window opened. Please wait for your script to finish before closing the GUI window.\n');
            }

            if (data.includes('electron exited')) {
                console.log('\x1b[31m%s\x1b[0m', 'GUI window closed; exiting process.');
                process.exit(1);
            }
        });
    }
}

export default new GUI();
