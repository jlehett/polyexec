import Log from '../Log.js';

class WarningLog extends Log {
    static type = 'warning';

    constructor(parentID, message) {
        super();

        this.parentID = parentID;
        this.message = message;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
            message: this.message,
        };
    }
}

export default WarningLog;
