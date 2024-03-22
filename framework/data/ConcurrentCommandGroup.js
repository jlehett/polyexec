import Command from './Command.js';
import SerialCommandGroup from './SerialCommandGroup.js';

class ConcurrentCommandGroup {
    constructor({ commands, cwd, name }) {
        this.name = name;
        this.cwd = cwd;
        this.commands = commands;
    }

    static create({ name, cwd, commands }) {
        return new ConcurrentCommandGroup({ commands: commands, cwd, name });
    }

    async run() {
        if (!this.cwd) {
            throw new Error('cwd is required for ConcurrentCommandGroup');
        }

        await this.#runWithCwd(this.cwd);
    }

    async #runWithCwd(cwd) {
        await Promise.all(this.commands.map(task => {
            switch (task.constructor) {
                case Command:
                    task.setLogKey(this.name);
                    return task.run(cwd);
                case SerialCommandGroup:
                case ConcurrentCommandGroup:
                    return task.runWithCwd(task.cwd || cwd);
            }
        }));
    }
}

export default ConcurrentCommandGroup;