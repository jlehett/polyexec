import Command from './Command.js';
import ConcurrentCommandGroup from './ConcurrentCommandGroup.js';
import Loggable from './Loggable.js';
import PathParser from '../services/PathParser.js';

class SerialCommandGroup extends Loggable {
    constructor({ commands, cwd, name }) {
        super(name);

        this.cwd = PathParser.parse(cwd);
        this.commands = commands;
    }

    static create({ name, cwd, commands }) {
        return new SerialCommandGroup({ commands: commands, cwd, name });
    }

    async run() {
        if (!this.cwd) {
            throw new Error('cwd is required for SerialCommandGroup');
        }

        try {
            await this.runWithCwd(this.cwd);
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', `Error running SerialCommandGroup: ${err}`);
            console.log('\x1b[31m%s\x1b[0m', 'Halting execution.');
        }
    }

    async runWithCwd(cwd, parentID=undefined) {
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
            this.erroredLog();

            throw err;
        } finally {
            this.endLog();
        }
    }
}

export default SerialCommandGroup;
