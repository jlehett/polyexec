
class Task {
    constructor({ name, onRun }) {
        this.name = name;
        this.run = onRun;
    }

    static create({ name, onRun }) {
        return new Task({ name, onRun });
    }

    onError(err) {
        console.log('\x1b[31m%s\x1b[0m', `Error while running Task: ${err}`);
    }
}

export default Task;
