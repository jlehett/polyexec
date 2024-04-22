import Log from '../Log.js';

class RestartingLog extends Log {
    static type = 'restarting';

    get isValid() {
        return ![null, undefined].includes(this.parentID);
    }

    constructor({ parentID } = {}) {
        super();
        
        this.parentID = parentID;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
        };
    }
}

export default RestartingLog;
