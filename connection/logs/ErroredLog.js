import Log from '../Log.js';

class ErroredLog extends Log {
    static type = 'errored';

    get isValid() {
        return ![null, undefined].includes(this.id);
    }

    constructor(id) {
        super();

        this.id = id;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
        };
    }
}

export default ErroredLog;