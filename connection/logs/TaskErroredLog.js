import Log from '../Log.js';

class TaskErroredLog extends Log {
    static type = 'task-errored';

    get isValid() {
        return ![null, undefined].includes(this.id) &&
            Boolean(this.taskName) &&
            Boolean(this.message);
    }

    constructor({ id, taskName, message } = {}) {
        super();

        this.id = id;
        this.taskName = taskName;
        this.message = message;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            id: this.id,
            taskName: this.taskName,
            message: this.message,
        };
    }
}

export default TaskErroredLog;