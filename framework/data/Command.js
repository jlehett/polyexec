import Loggable from './extensions/Loggable.js';
import ProcessManager from '../services/ProcessManager.js';
import StdErrMessageHandler from './modules/StdErrMessageHandler.js';

class Command extends Loggable {
    constructor(commandString) {
        super();

        this.commandString = commandString;
    }

    static create(commandString) {
        return new Command(commandString);
    }

    async runWithCwd(cwd, parentID) {
        const stdErrMessageHandler = new StdErrMessageHandler({
            onConsumeWarning: (message) => this.warningMessageLog(parentID, message),
            onConsumeError: (message) => this.errorMessageLog(parentID, message),
        });

        try {
            await new Promise((resolve, reject) => {
                this.process = ProcessManager.spawn(this.commandString, { cwd, shell: true });

                this.infoLog(parentID, `>> ${this.commandString}`);

                this.process.stdout.on('data', (data) => {
                    this.infoLog(parentID, data.toString());
                });

                this.process.stderr.on('data', (data) => {
                    stdErrMessageHandler.handleStdErr(data.toString());
                });

                this.process.on('close', (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`Command exited with code ${code}`));
                    }
                });

                this.process.on('error', (err) => {
                    reject(err);
                });

            });
        } catch (err) {
            this.sysCallErrorLog(parentID, err);

            throw err;
        }
    }
}

export default Command;
