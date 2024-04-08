import Loggable from './extensions/Loggable.js';
import ProcessManager from '../services/ProcessManager.js';
import StdErrMessageHandler from './modules/StdErrMessageHandler.js';

//#region Config

export const config = {
    shell: true,
};

//#endregion

class Command extends Loggable {
    constructor(commandString) {
        super();

        this.commandString = commandString;
        
        this.#initRegexArray('success');
        this.#initRegexArray('error');
        this.#initRegexArray('warning');
    }

    static create(commandString) {
        return new Command(commandString);
    }

    async runWithCwd(cwd, parentID, onErrorEncountered) {
        const onInfo = (message, opts) => this.infoLog(parentID, message, opts);

        const onError = (message) => {
            this.errorMessageLog(parentID, message);
            onErrorEncountered?.();
        };

        const onWarning = (message) => this.warningMessageLog(parentID, message);

        const stdErrMessageHandler = new StdErrMessageHandler({
            onConsumeWarning: onWarning,
            onConsumeError: onError,
        });

        try {
            await new Promise((resolve, reject) => {
                //#region Helper Functions

                const checkBehaviorOverrides = (message) => {
                    function matchesRegex(regexPatterns) {
                        if (regexPatterns?.length > 0) {
                            return regexPatterns.some((regex) => {
                                return regex.test(message);
                            });
                        } else {
                            return false;
                        }
                    }
        
                    switch (true) {
                        case matchesRegex(this.successRegex):
                            onInfo(message, { isSuccess: true });
                            resolve();
                            return true;
                        case matchesRegex(this.errorRegex):
                            onError(message);
                            return true;
                        case matchesRegex(this.warningRegex):
                            onWarning(message);
                            return true;
                        default:
                            return false;
                    }
                };

                //#endregion

                this.process = ProcessManager.spawn(this.commandString, { cwd, shell: config.shell });

                onInfo(`>> ${this.commandString}`);

                this.process.stdout.on('data', (data) => {
                    if (!checkBehaviorOverrides(data.toString())) {
                        onInfo(data.toString());
                    }
                });

                this.process.stderr.on('data', (data) => {
                    if (!checkBehaviorOverrides(data.toString())) {
                        stdErrMessageHandler.handleStdErr(data.toString());
                    }
                });

                this.process.on('close', (code) => {
                    if (code === 0) {
                        resolve();
                    } else {
                        if (stdErrMessageHandler.hasPendingMessage) {
                            stdErrMessageHandler.consumeLastMessageAsError();
                        }

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

    #initRegexArray(name) {
        const propertyName = `${name}Regex`;
        this[propertyName] = [];

        this[`${name}On`] = (regex) => {
            this[propertyName].push(regex);
            return this;
        }
    }
}

export default Command;
