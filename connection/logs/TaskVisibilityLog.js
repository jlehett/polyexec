import Log from '../Log.js';

class TaskVisibilityLog extends Log {
    static type = 'task-visibility';

    get isValid() {
        return ![null, undefined].includes(this.id) &&
            Boolean(this.name) &&
            ![null, undefined].includes(this.shouldShow);
    }

    constructor({ id, name, shouldShow } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.shouldShow = shouldShow;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
            name: this.name,
            shouldShow: this.shouldShow,
        };
    }
}

export default TaskVisibilityLog;