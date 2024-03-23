import crypto from 'crypto';
import GUI from '../services/GUI.js';
import StartingLog from '../../connection/logs/StartingLog.js';
import EndingLog from '../../connection/logs/EndingLog.js';
import InfoLog from '../../connection/logs/InfoLog.js';

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

    #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }
}

export default Loggable;
