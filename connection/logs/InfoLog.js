import Log from '../Log.js';

class InfoLog extends Log {
    static type = 'info';

    get isValid() {
        return ![null, undefined].includes(this.parentID)
            && Boolean(this.message?.trim?.());
    }

    constructor(parentID, message, { isSuccess = false } = {}) {
        super();

        this.parentID = parentID;
        this.message = message;

        this.isSuccess = isSuccess;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
            message: this.message,
            isSuccess: this.isSuccess,
        };
    }
}

export default InfoLog;