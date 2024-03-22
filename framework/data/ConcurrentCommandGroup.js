import Command from './Command.js';
import SerialCommandGroup from './SerialCommandGroup.js';
import Loggable from './Loggable.js';

class ConcurrentCommandGroup extends Loggable {
    constructor({ commands, cwd, name }) {
        super(name);

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

    async #runWithCwd(cwd, parentID=undefined) {
        this.startLog(parentID);

        try {
            await Promise.all(this.commands.map(task => {
                switch (task.constructor) {
                    case Command:
                        return task.run(cwd, this.id);
                    case SerialCommandGroup:
                    case ConcurrentCommandGroup:
                        return task.runWithCwd(task.cwd || cwd, this.id);
                }
            }));
        } catch (err) {

        } finally {
            this.endLog();
        }
    }
}

export default ConcurrentCommandGroup;