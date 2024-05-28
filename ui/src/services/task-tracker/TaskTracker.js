import { emit } from '@psionic/emit';
import isUndefined from 'lodash/isUndefined';
import {
    validate,
} from '../../../../utils/functional';

class TaskTracker {

    EVENTS = {
        TASKS_UPDATED: 'tasks-updated',
        TASK_UPDATED: (name) => `task-updated-${name}`,
    };

    constructor() {
        this.tasks = new Set();
    }
    
    //#region Public Functions
    
    processTaskVisibilityLog = (log) => log.shouldShow ? this.addTask(log.name) : this.removeTask(log.name);

    addTask(taskName) {
        validate(this.#validations.taskNameIsDefined(taskName));
        this.tasks.add(taskName);
        this.#onUpdate(taskName);
    }

    removeTask(taskName) {
        validate(this.#validations.taskNameIsDefined(taskName));
        this.tasks.delete(taskName);
        this.#onUpdate(taskName);
    }

    getTasks = () => this.tasks.keys();

    //#endregion

    //#region Validations

    #validations = {
        taskNameIsDefined: (taskName) => ({
            cond: !isUndefined(taskName),
            notMetMsg: `Task name must be defined.`,
        }),
    }

    //#endregion
    
    //#region Private Functions

    #onUpdate(task) {
        if (task?.name) this.#emitTaskUpdated(task.name);
        this.#emitTasksUpdated();
    }
    #emitTaskUpdated = (taskName) => emit(this.EVENTS.TASK_UPDATED(taskName));
    #emitTasksUpdated = () => emit(this.EVENTS.TASKS_UPDATED);

    //#endregion

}

export default new TaskTracker();