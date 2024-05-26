import { extend, GetterSetterModule, InitModule } from '../../utils/class';
import Loggable from './extensions/Loggable';
import TaskVisibilityLog from '../../connection/logs/TaskVisibilityLog.js';

class Task extends Loggable {
    constructor({ name, onRun, shouldShow }) {
        super({ name, type: 'Task' });
        extend(this, GetterSetterModule, InitModule);
        
        this.initVars({
            name,
            run: onRun,
        });

        this.createGetterSetters({ shouldShow });
    }

    static create({ name, onRun }) {
        return new Task({ name, onRun });
    }

    //#region Overrides

    set shouldShow(value) {
        this.setter({ shouldShow: value });
        this.sendLog(TaskVisibilityLog, { shouldShow: value });
    }

    //#endregion

    //#region Public Functions

    onError(err) {
        console.log('\x1b[31m%s\x1b[0m', `Error while running Task: ${err}`);
    }

    //#endregion
}

export default Task;
