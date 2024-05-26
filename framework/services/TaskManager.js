import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import TaskStartingLog from '../../connection/logs/TaskStartingLog.js';
import TaskEndingLog from '../../connection/logs/TaskEndingLog.js';
import TaskErroredLog from '../../connection/logs/TaskErroredLog.js';
import {
    throwIf,
    not,
    modifyFn,
    setWhileRunning,
    onCatch,
    onTry,
    onFinally,
    callback,
} from '../../utils/functional';

class TaskManager extends Loggable {
    
    constructor() {
        super({ type: 'TaskManager' });

        this.tasksByName = new Map();
        this.runningTask = null;
    }
    
    addTask(task) {
        throwIf(not(isUndefined))
            (`Task with name ${task.name} already exists.`)
            (this.getTaskByName(task.name));

        this.tasksByName.set(task.name, task);
    }

    getTasks() {
        return this.tasksByName.values();
    }

    getTaskByName(name) {
        return this.tasksByName.get(name);
    }
    
    async runTask(name) {
        const task = throwIf(isUndefined)
            (`Task with name ${name} not found.`)
            (this.getTaskByName(name));

        throwIf(not(isNull))
            (`Task ${this.runningTask.name} is already running.`)
            (this.runningTask);

        {
            const sendTaskLog = this.#sendLogForTask(task);

            modifyFn(
                task.run,
                setWhileRunning(this, 'runningTask', task),
                onTry(sendTaskLog(TaskStartingLog)),
                onCatch(sendTaskLog(TaskErroredLog)),
                onFinally(sendTaskLog(TaskEndingLog))
            )();
        }
    }

    //#region Private Functions
    
    #sendLogForTask(task) {
        return (LogClass) => this.sendLog(LogClass, { taskName: task.name });
    }

    //#endregion
}

export default new TaskManager();