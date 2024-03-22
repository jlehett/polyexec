import { spawn } from 'child_process';
import GUI from '../services/GUI.js';

class Command {
    constructor(commandString) {
        this.commandString = commandString;
        this.logKey = null;
    }

    static create(commandString) {
        return new Command(commandString);
    }

    setLogKey(logKey) {
        this.logKey = logKey;
    }

    async run(cwd) {
        return new Promise((resolve, reject) => {
            this.process = spawn(this.commandString, { cwd });

            this.process.stdout.on('data', (data) => {
                if (GUI.isInitialized) {
                    GUI.sendLog({ logKey: this.logKey, message: data.toString() })
                }
            });

            this.process.stderr.on('data', (data) => {
                if (GUI.isInitialized) {
                    GUI.sendError({ logKey: this.logKey, err: data.toString() });
                }
            });

            this.process.on('close', (code) => {
                if (code === 0) {
                    if (GUI.isInitialized) {
                        GUI.sendProcessComplete({ logKey: this.logKey });
                    }
                    resolve();
                } else {
                    if (GUI.isInitialized) {
                        GUI.sendProcessExitedWithError({ logKey: this.logKey, err: `Process exited with code ${code}` });
                    }
                    reject();
                }
            });

            this.process.on('error', (err) => {
                if (GUI.isInitialized) {
                    GUI.sendProcessExitedWithError({ logKey: this.logKey, err: err.message });
                }
                reject();
            });
        });
    }
}

export default Command;
