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
                this.process = spawn(this.commandString, { cwd });

                this.process.stdout.on('data', (data) => {
                    this.infoLog(parentID, data.toString());
                });

                this.process.on('close', (code) => {
                    return code === 0 ? resolve() : reject();
                });

                this.process.on('error', (err) => {
                    reject();
                });
            });
        } catch (err) {

        }
    }
}

export default Command;
