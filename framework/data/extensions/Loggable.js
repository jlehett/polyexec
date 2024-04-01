import crypto from 'crypto';
import GUI from '../../services/GUI.js';
import StartingLog from '../../../connection/logs/StartingLog.js';
import EndingLog from '../../../connection/logs/EndingLog.js';
import InfoLog from '../../../connection/logs/InfoLog.js';
import ErrorMessageLog from '../../../connection/logs/ErrorMessageLog.js';
import WarningLog from '../../../connection/logs/WarningLog.js';
import ErroredLog from '../../../connection/logs/ErroredLog.js';
import AsyncErrorLog from '../../../connection/logs/AsyncErrorLog.js';
import SysCallErrorLog from '../../../connection/logs/SysCallErrorLog.js';

class Loggable {
    id;
    name;

    constructor(name=undefined) {
        this.name = name;
        this.id = crypto.randomUUID();
    }

    startLog(parentID) {
        this.#assertGUIInitialized();

        GUI.sendLog(new StartingLog(this.name, this.id, parentID));
    }

    endLog() {
        this.#assertGUIInitialized();

        GUI.sendLog(new EndingLog(this.id));
    }

    infoLog(parentID, message) {
        this.#assertGUIInitialized();

        GUI.sendLog(new InfoLog(parentID, message));
    }

    warningMessageLog(parentID, message) {
        this.#assertGUIInitialized();

        GUI.sendLog(new WarningLog(parentID, message));
    }

    errorMessageLog(parentID, errorMessage) {
        this.#assertGUIInitialized();

        GUI.sendLog(new ErrorMessageLog(parentID, errorMessage));
    }

    sysCallErrorLog(parentID, error) {
        this.#assertGUIInitialized();

        GUI.sendLog(new SysCallErrorLog(parentID, error));
    }

    erroredLog() {
        this.#assertGUIInitialized();

        GUI.sendLog(new ErroredLog(this.id));
    }

    asyncErrorLog() {
        this.#assertGUIInitialized();

        GUI.sendLog(new AsyncErrorLog(this.id));
    }

    #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }
}

export default Loggable;
