import Log from '../Log.js';

class ErrorMessageLog extends Log {
    static type = 'error-message';

    get isValid() {
        return ![null, undefined].includes(this.parentID)
            && Boolean(this.errorMessage?.trim?.());
    }

    constructor({ parentID, errorMessage } = {}) {
        super();

        this.parentID = parentID;
        this.errorMessage = errorMessage;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
            errorMessage: this.errorMessage,
        };
    }
}

export default ErrorMessageLog;
