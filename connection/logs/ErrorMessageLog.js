import Log from '../Log.js';

class ErrorMessageLog extends Log {
    static type = 'error-message';

    constructor(parentID, error) {
        super();

        this.parentID = parentID;
        this.error = error;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
            error: this.error,
        };
    }
}

export default ErrorMessageLog;