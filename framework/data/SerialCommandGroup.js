import Command from './Command.js';
import ConcurrentCommandGroup from './ConcurrentCommandGroup.js';

class SerialCommandGroup {
    constructor({ commands, cwd, name }) {
        this.name = name;
        this.cwd = cwd;
        this.commands = commands;
    }

    static create({ name, cwd, commands }) {
        return new SerialCommandGroup({ commands: commands, cwd, name });
    }

    async run() {
        if (!this.cwd) {
            throw new Error('cwd is required for SerialCommandGroup');
        }

        await this.#runWithCwd(this.cwd);
    }

    async #runWithCwd(cwd) {
        for (const task of this.commands) {
            switch (task.constructor) {
                case Command:
                    task.setLogKey(this.name);
                    task.run(cwd);
                    break;
                case SerialCommandGroup:
                case ConcurrentCommandGroup:
                    task.runWithCwd(task.cwd || cwd);
            }
        }
    }
}

export default SerialCommandGroup;
