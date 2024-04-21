import path from 'path';
import { fileURLToPath } from 'url';
import DataStream from './DataStream.js';
import ProcessManager from './ProcessManager.js';
import PathParser from './PathParser.js';

class GUI {
    #isInitialized = false;
    #dataStream;

    get isInitialized() {
        return this.#isInitialized;
    }

    async init(
        {
            port = 21734,
            guiConfigPath,
            verbose,
        } = {}
    ) {
        const portToUse = await DataStream.getFirstAvailablePort(port)
            .catch((err) => {
                console.log('\n\x1b[31m%s\x1b[0m', `No available port found.`);
                console.log('\x1b[31m%s\x1b[0m', 'Halting execution.');
                process.exit(1);
            });

        this.#dataStream = DataStream.init({ port: portToUse });

        this.#startElectronApp({
            port: portToUse,
            guiConfigPath,
            verbose,
        });

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

    #startElectronApp({
        port,
        guiConfigPath,
        verbose,
    }) {
        console.log('\x1b[37m\x1b[1m%s\x1b[0m', '\nStarting GUI...\n');

        const polyexecMainDir = path.join(fileURLToPath(import.meta.url), '../../../');

        const electronApp = ProcessManager.spawn('npm start', {
            cwd: polyexecMainDir,
            env: { ...process.env, CONNECTION_PORT: port, GUI_CONFIG_PATH: PathParser.parse(guiConfigPath) },
            shell: true,
        });

        electronApp.stderr.on('data', (data) => {
            if (verbose) {
                console.error(data.toString());
            }
        });

        electronApp.stdout.on('data', (data) => {
            switch (true) {
                case data.includes('Electron process started'):
                    console.log('\x1b[32m%s\x1b[0m', 'GUI window opened. Please wait for your script to finish before closing the GUI window.\n');
                    break;
                case data.includes('electron process exited'):
                    console.log('\x1b[31m%s\x1b[0m', 'GUI window closed; exiting process.\n');
                    process.exit(1);
                case verbose:
                    console.log(data.toString());
                    break;
                default:
                    // Do nothing
            }
        });
    }
}

export default new GUI();
