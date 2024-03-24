import Log from '../Log.js';

class StartingLog extends Log {
    static type = 'starting';

    constructor(name, id, parentID) {
        super();

        this.name = name;
        this.id = id;
        this.parentID = parentID;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            id: this.id,
            parentID: this.parentID,
        };
    }
}

export default StartingLog;
