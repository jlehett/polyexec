import ProcessManager from '../services/ProcessManager.js';
import Config from './Config.js';

export default class Process {
    constructor({
        process,
        commandString,
    }) {
        this.process = process;
        this.commandString = commandString;
    }

    //#region Static Functions

    static spawn({ commandString, cwd }) {
        const process = ProcessManager.spawn(commandString, { cwd, ...Config.commandConfig });
        
        return new Process({ process, commandString });
    }

    //#endregion

    //#region Public Functions

    onOutput(callback) {
        this.process.stdout.on('data', this.#withDataAsString(callback));
    }

    onErrorMessage(callback) {
        this.process.stderr.on('data', this.#withDataAsString(callback));
    }

    onClose({ default: defaultCallback, ...callbacksByCode }) {
        this.process.on('close', (code) => {
            switch (true) {
                case Boolean(callbacksByCode[code]):
                    callbacksByCode[code](code);
                    break;
                default:
                    defaultCallback?.(code);
            }
        });
    }

    onError(callback) {
        this.process.on('error', callback);
    }

    //#endregion

    //#region Private Functions

    #withDataAsString(callback) {
        return (data) => callback(data.toString());
    }

    //#endregion
}