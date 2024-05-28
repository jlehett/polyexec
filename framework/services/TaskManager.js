import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import TaskStartingLog from '../../connection/logs/TaskStartingLog.js';
import TaskEndingLog from '../../connection/logs/TaskEndingLog.js';
import TaskErroredLog from '../../connection/logs/TaskErroredLog.js';
import { extend, InitModule } from '../../utils/class';
import {
    not,
    modifyFn,
    setWhileRunning,
    onCatch,
    onTry,
    onFinally,
    callback,
    validate,
    callInSeries,
} from '../../utils/functional';

class TaskManager extends Loggable {
    
    constructor() {
        super({ type: 'TaskManager' });
        extend(this, InitModule);

        this.initVars({
            tasksByName: new Map(),
            runningTask: null,
        });
    }

    //#region Public Functions

    getTasks = () => this.tasksByName.values();

    getTaskByName = (name) => this.tasksByName.get(name);

    addTask = (task) => callInSeries(
        callback(validate, this.#validations.taskDoesNotExist(task?.name)),
        callback(this.tasksByName.set, task.name, task)
    );

    runTask = (task) => callInSeries(
        callback(
            validate,
            this.#validations.taskExists(task?.name),
            this.#validations.noTaskRunning,
        ),
        modifyFn(
            task.run,
            setWhileRunning(this, 'runningTask', task),
            onTry(this.#sendLogForTask(task)(TaskStartingLog)),
            onCatch(this.#sendLogForTask(task)(TaskErroredLog)),
            onFinally(this.#sendLogForTask(task)(TaskEndingLog))
        )
    );

    //#endregion

    //#region Validations

    #validations = {
        taskExists: (name) => ({
            cond: () => not(isUndefined)(name) && not(isUndefined)(this.getTaskByName(name)),
            notMetMsg: `Task with name ${name} not found.`,
        }),
        taskDoesNotExist: (name) => ({
            cond: () => not(isUndefined)(name) && isUndefined(this.getTaskByName(name)),
            notMetMsg: `Task with name ${name} already exists.`,
        }),
        noTaskRunning: () => ({
            cond: () => isNull(this.runningTask),
            notMetMsg: `Task ${this.runningTask.name} is already running.`,
        }),
    };

    //#endregion

    //#region Private Functions
    
    #sendLogForTask(task) {
        return (LogClass) => this.sendLog(LogClass, { taskName: task.name });
    }

    //#endregion
}

export default new TaskManager();