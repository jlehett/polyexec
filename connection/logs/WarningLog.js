import Log from '../Log.js';

class WarningLog extends Log {
    static type = 'warning';

    get isValid() {
        return ![null, undefined].includes(this.parentID)
            && Boolean(this.message?.trim?.());
    }

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
