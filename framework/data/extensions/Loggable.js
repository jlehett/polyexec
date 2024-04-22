import crypto from 'crypto';
import GUI from '../../services/GUI.js';

class Loggable {
    id;
    name;
    type;

    constructor({ name, type } = {}) {
        this.name = name;
        this.type = type;
        this.id = crypto.randomUUID();
    }

    sendLog(LogClass, args) {
        this.#assertGUIInitialized();

        GUI.sendLog(new LogClass({
            name: this.name,
            type: this.type,
            id: this.id,
            ...args,
        }));
    }

    #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }
}

export default Loggable;
