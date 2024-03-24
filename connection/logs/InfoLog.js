import Log from '../Log.js';

class InfoLog extends Log {
    static type = 'info';

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