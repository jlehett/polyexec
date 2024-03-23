import Command from './Command.js';
import ConcurrentCommandGroup from './ConcurrentCommandGroup.js';
import Loggable from './Loggable.js';

class SerialCommandGroup extends Loggable {
    constructor({ commands, cwd, name }) {
        super(name);

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

    async #runWithCwd(cwd, parentID=undefined) {
        this.startLog(parentID);

        try {
            for (const task of this.commands) {
                switch (task.constructor) {
                    case Command:
                        await task.runWithCwd(cwd, this.id);
                        break;
                    case SerialCommandGroup:
                    case ConcurrentCommandGroup:
                        await task.runWithCwd(task.cwd || cwd, this.id);
                }
            }
        } catch (err) {

        } finally {
            this.endLog();
        }
    }
}

export default SerialCommandGroup;
