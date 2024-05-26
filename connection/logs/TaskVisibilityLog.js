import Log from '../Log.js';

class TaskVisibilityLog extends Log {
    static type = 'task-visibility';

    get isValid() {
        return ![null, undefined].includes(this.id) &&
            Boolean(this.name)
    }

    constructor({ id, name } = {}) {
        super();

        this.id = id;
        this.name = name;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
            name: this.name,
        };
    }
}

export default TaskVisibilityLog;