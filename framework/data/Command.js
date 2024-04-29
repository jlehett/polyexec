import Loggable from './extensions/Loggable.js';
import SysCallErrorLog from '../../connection/logs/SysCallErrorLog.js';
import CommandLogger from './modules/CommandLogger.js';
import Process from './Process.js';

class Command extends Loggable {
    constructor(commandString) {
        super({ type: 'Command' });

        this.commandString = commandString;

        this.commandLogger = CommandLogger.create(this);
    }

    static create(commandString) {
        return new Command(commandString);
    }

    async runWithCwd(cwd, parentID, onErrorEncountered) {
        try {
            await new Promise((resolve, reject) => {
                this.commandLogger.setParentID(parentID);
                
                this.commandLogger.onLog(CommandLogger.LOG_TYPES.ERROR, onErrorEncountered);
                this.commandLogger.onLog(CommandLogger.LOG_TYPES.SUCCESS, resolve);

                const process = Process.spawn({ commandString: this.commandString, cwd });

                this.commandLogger.startForProcess(process);

                process.onClose({
                    0: resolve,
                    default: (code) => reject(new Error(`Command exited with code ${code}`)),
                });
                process.onError(reject);
            });
        } catch (error) {
            this.sendLog(SysCallErrorLog, { parentID, error });

            throw error;
        }
    }

    on(regex, action) {
        if (LOG_OVERRIDES[action]) {
            this.commandLogger.addLogOverride({ regex, type: action });
        } else {
            this.commandLogger.addOnRegexMatch({ regex, callback: action });
        }

        return this;
    }
}

export default Command;

//#region Built-In Regex Handlers

export const LOG_OVERRIDES = CommandLogger.LOG_TYPES;

//#endregion
