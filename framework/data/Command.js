import Loggable from './Loggable.js';
import ProcessManager from '../services/ProcessManager.js';

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
                this.process = ProcessManager.spawn(this.commandString, { cwd, shell: true });

                this.infoLog(parentID, `>> ${this.commandString}`);

                this.process.stdout.on('data', (data) => {
                    this.infoLog(parentID, data.toString());
                });

                this.process.stderr.on('data', (data) => {
                    this.errorMessageLog(parentID, data.toString());
                });

                this.process.on('close', (code) => {
                    code === 0 ? resolve() : reject(new Error(`Command exited with code ${code}`));
                });

                this.process.on('error', (err) => {
                    console.log('Error:', err, this.commandString);
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
