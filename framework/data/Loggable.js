import crypto from 'crypto';
import GUI from '../services/GUI.js';
import StartingLog from '../../connection/logs/StartingLog.js';

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

    #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }
}

export default Loggable;
