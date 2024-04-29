import mapValues from 'lodash/mapValues.js';
import InfoLog from '../../../connection/logs/InfoLog.js';
import WarningLog from '../../../connection/logs/WarningLog.js';
import ErrorMessageLog from '../../../connection/logs/ErrorMessageLog.js';
import RestartingLog from '../../../connection/logs/RestartingLog.js';

export default class CommandLogger {
    constructor(command) {
        this.sendLog = (...args) => command.sendLog(...args);
        
        this.parentID = null;
        this.logOverrides = [];
        this.regexHandlers = [];

        this.callbacksByLogType = this.#generateEmptyCallbacksByLogType();
    }

    //#region Static Functions

    static create(...args) {
        return new CommandLogger(...args);
    }

    static LOG_TYPES = {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        RUNNING: 'RUNNING',
        INFO: 'INFO',
    };

    //#endregion

    //#region Public Functions

    addLogOverride({ regex, type }) {
        this.logOverrides.push({ regex, type });
    }

    addOnRegexMatch({ regex, callback }) {
        this.regexHandlers.push({ regex, callback });
    }

    onLog(type, callback) {
        this.callbacksByLogType[type] = callback;
    }

    setParentID(parentID) {
        this.parentID = parentID;
    }

    startForProcess(process) {
        this.sendLog(
            InfoLog,
            {
                parentID: this.parentID,
                message: `>> ${process.commandString}`,
            }
        );

        const createHandlerForType = (type) => (message) => this.#handleMessage({
            defaultType: type,
            message,
        });

        process.onOutput(createHandlerForType(CommandLogger.LOG_TYPES.INFO));
        process.onErrorMessage(createHandlerForType(CommandLogger.LOG_TYPES.ERROR));
    }

    //#endregion

    //#region Private Functions

    #handleMessage({
        defaultType,
        message,
    }) {
        if (!this.#checkLogOverrides(message)) {
            this.#logHandler(defaultType, message);
        }

        const matchingRegexHandlers = this.#getMatchingRegexFrom(this.regexHandlers)(message);
        matchingRegexHandlers.forEach(({ callback }) => callback(message));
    }

    #logHandler(type, message) {
        switch (type) {
            case CommandLogger.LOG_TYPES.INFO:
                this.sendLog(InfoLog, { parentID: this.parentID, message });
                break;
            case CommandLogger.LOG_TYPES.SUCCESS:
                this.sendLog(InfoLog, { parentID: this.parentID, message, isSuccess: true });
                break;
            case CommandLogger.LOG_TYPES.ERROR:
                this.sendLog(ErrorMessageLog, { parentID: this.parentID, errorMessage: message });
                break;
            case CommandLogger.LOG_TYPES.WARNING:
                this.sendLog(WarningLog, { parentID: this.parentID, message });
                break;
            case CommandLogger.LOG_TYPES.RUNNING:
                this.sendLog(InfoLog, { parentID: this.parentID, message, isRunning: true });
                this.sendLog(RestartingLog, { parentID: this.parentID });
                break;
            default:
                throw new Error(`Unknown log type: ${type}`);
        }

        this.callbacksByLogType[type]?.(message);
    }
    
    #checkLogOverrides(message) {
        const matchingLogOverrides = this.#getMatchingRegexFrom(this.logOverrides)(message);

        matchingLogOverrides.forEach(({ type }) => this.#logHandler(type, message));

        return matchingLogOverrides.length > 0;
    }

    #getMatchingRegexFrom(regexArray) {
        return (textToTest) => regexArray.filter(({ regex }) => regex.test(textToTest));
    }

    #generateEmptyCallbacksByLogType() {
        return mapValues(CommandLogger.LOG_TYPES, () => () => {});
    }

    //#endregion
}

