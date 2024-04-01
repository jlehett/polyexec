import Log from '../Log.js';

class InfoLog extends Log {
    static type = 'info';

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

export default InfoLog;