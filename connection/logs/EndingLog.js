import Log from '../Log.js';

class EndingLog extends Log {
    static type = 'ending-log';

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

export default EndingLog;
