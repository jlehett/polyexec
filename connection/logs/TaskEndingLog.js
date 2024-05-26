import Log from '../Log.js';

class TaskEndingLog extends Log {
    static type = 'task-ending';

    get isValid() {
        return ![null, undefined].includes(this.id) &&
            Boolean(this.taskName);
    }

    constructor({ id, taskName } = {}) {
        super();

        this.id = id;
        this.taskName = taskName;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
            taskName: this.taskName,
        };
    }
}

export default TaskEndingLog;