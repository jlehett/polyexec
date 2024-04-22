import Loggable from './extensions/Loggable.js';
import ProcessManager from '../services/ProcessManager.js';
import StdErrMessageHandler from './modules/StdErrMessageHandler.js';
import InfoLog from '../../connection/logs/InfoLog.js';
import WarningLog from '../../connection/logs/WarningLog.js';
import ErrorMessageLog from '../../connection/logs/ErrorMessageLog.js';
import SysCallErrorLog from '../../connection/logs/SysCallErrorLog.js';
import RestartingLog from '../../connection/logs/RestartingLog.js';

//#region Config

export const config = {
    shell: true,
};

//#endregion

class Command extends Loggable {
    constructor(commandString) {
        super({ type: 'Command' });

        this.commandString = commandString;
        
        this.regexHandlers = [];
        this.logOverrides = [];
    }

    static create(commandString) {
        return new Command(commandString);
    }

    async runWithCwd(cwd, parentID, onErrorEncountered) {
        //#region Helper Closures

        const onInfo = (message, opts) => this.sendLog(InfoLog, { parentID, message, ...opts });

        const onError = (message) => {
            this.sendLog(ErrorMessageLog, { parentID, message });
            onErrorEncountered?.();
        };

        const onWarning = (message) => this.sendLog(WarningLog, { parentID, message });

        //#endregion

        const stdErrMessageHandler = new StdErrMessageHandler({
            onConsumeWarning: onWarning,
            onConsumeError: onError,
        });

        try {
            await new Promise((resolve, reject) => {
                //#region Helper Functions

                const checkLogOverrides = (message) => {
                    const matchingLogOverrides = this.#getMatchingLogOverrides(message);

                    matchingLogOverrides.forEach(({ type }) => {
                        switch (type) {
                            case LOG_OVERRIDES.SUCCESS:
                                onInfo(message, { isSuccess: true });
                                return resolve();
                            case LOG_OVERRIDES.ERROR:
                                return onError(message);
                            case LOG_OVERRIDES.WARNING:
                                return onWarning(message);
                            case LOG_OVERRIDES.RUNNING:
                                onInfo(message, { isRunning: true });
                                return this.sendLog(RestartingLog, { parentID });
                        }
                    })

                    return matchingLogOverrides.length > 0;
                };

                const dataHandlerFactory = ({ defaultLogFn }) => (data) => {
                    if (!checkLogOverrides(data.toString())) {
                        defaultLogFn(data.toString());
                    }

                    const matchingRegexHandlers = this.#getMatchingRegexHandlers(data.toString());
                    matchingRegexHandlers.forEach(({ action }) => action(data.toString()));
                };

                //#endregion

                this.process = ProcessManager.spawn(this.commandString, { cwd, shell: config.shell });

                onInfo(`>> ${this.commandString}`);

                this.process.stdout.on('data', dataHandlerFactory({ defaultLogFn: onInfo }));

                this.process.stderr.on('data', dataHandlerFactory({ defaultLogFn: (message) => stdErrMessageHandler.handleStdErr(message) }));

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
        } catch (error) {
            this.sendLog(SysCallErrorLog, { parentID, error });

            throw error;
        }
    }

    on(regex, action) {
        if (LOG_OVERRIDES[action]) {
            this.logOverrides.push({
                regex,
                type: action,
            });
        } else {
            this.regexHandlers.push({
                regex,
                action,
            });
        }

        return this;
    }

    //#region Private Functions

    #getMatchingRegexHandlers(textToTest) {
        return this.regexHandlers.filter(({ regex }) => {
            return regex.test(textToTest);
        });
    }

    #getMatchingLogOverrides(textToTest) {
        return this.logOverrides.filter(({ regex }) => {
            return regex.test(textToTest);
        });
    }

    #getLogOverride

    //#endregion
}

export default Command;

//#region Built-In Regex Handlers

export const LOG_OVERRIDES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    RUNNING: 'RUNNING',
};

//#endregion
