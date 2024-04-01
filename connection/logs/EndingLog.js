import Log from '../Log.js';

class EndingLog extends Log {
    static type = 'ending';

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

export default EndingLog;
