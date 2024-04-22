
class Task extends Loggable {
    constructor({ name, onRun }) {
        super({ name, type: 'Task' });

        this.name = name;
        this.onRun = onRun;
    }

    static create({ name, onRun }) {
        return new Task({ name, onRun });
    }

    async run(...args) {
        try {
            await this.onRun(args);
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', `Error while running Task: ${err}`);
        }
    }
}

export default Task;
