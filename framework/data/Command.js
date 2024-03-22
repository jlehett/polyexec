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

    async run(cwd, parentID) {
        this.startLog(parentID);

        try {
            await new Promise((resolve, reject) => {
                this.process = spawn(this.commandString, { cwd });

                this.process.on('close', (code) => {
                    return code === 0 ? resolve() : reject();
                });

                this.process.on('error', (err) => {
                    reject();
                });
            });
        } catch (err) {

        } finally {
            this.endLog();
        }
    }
}

export default Command;
