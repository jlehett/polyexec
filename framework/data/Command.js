import { spawn } from 'child_process';
import Loggable from './Loggable.js';

class Command extends Loggable {
    constructor(commandString) {
        super();
        this.commandString = commandString;
    }

    static create(commandString) {
        return new Command(commandString);
    }

    async runWithCwd(cwd, parentID) {
        try {
            await new Promise((resolve, reject) => {
                this.process = spawn(this.commandString, { cwd, shell: true });

                this.process.stdout.on('data', (data) => {
                    this.infoLog(parentID, data.toString());
                });

                this.process.on('close', (code) => {
                    return code === 0 ? resolve() : reject();
                });

                this.process.on('error', (err) => {
                    reject(err);
                });
            });
        } catch (err) {
            this.errorMessageLog(parentID, err);

            throw err;
        }
    }
}

export default Command;
