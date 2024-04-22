import Log from '../Log.js';

class AsyncErrorLog extends Log {
    static type = 'async-error';

    get isValid() {
        return ![null, undefined].includes(this.id);
    }

    constructor({ id } = {}) {
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

export default AsyncErrorLog;