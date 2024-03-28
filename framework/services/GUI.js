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

    async init() {
        this.#dataStream = DataStream.init();

        this.#startElectronApp();

        await this.#dataStream.waitForConnection();

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

    #startElectronApp() {
        console.log('\x1b[37m\x1b[1m%s\x1b[0m', '\nStarting GUI...\n');

        const autoscriptMainDir = path.join(fileURLToPath(import.meta.url), '../../../');

        const electronApp = spawn('npm', ['start'], {
            cwd: autoscriptMainDir,
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
