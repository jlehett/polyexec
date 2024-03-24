import Log from '../Log.js';

class AsyncErrorLog extends Log {
    static type = 'async-error';

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

export default AsyncErrorLog;