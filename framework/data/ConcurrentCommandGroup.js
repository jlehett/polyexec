import Command from './Command.js';
import SerialCommandGroup from './SerialCommandGroup.js';
import Loggable from './extensions/Loggable.js';
import PathParser from '../services/PathParser.js';
import StartingLog from '../../connection/logs/StartingLog.js';
import EndingLog from '../../connection/logs/EndingLog.js';
import AsyncErrorLog from '../../connection/logs/AsyncErrorLog.js';

class ConcurrentCommandGroup extends Loggable {
    constructor({ commands, cwd, name }) {
        super({ name, type: 'CommandGroup' });

        this.cwd = PathParser.parse(cwd);
        this.commands = commands;
    }

    static create({ name, cwd, commands }) {
        return new ConcurrentCommandGroup({ commands: commands, cwd, name });
    }

    async run() {
        if (!this.cwd) {
            throw new Error('cwd is required for ConcurrentCommandGroup');
        }

        try {
            await this.runWithCwd(this.cwd);
        } catch (err) {
            console.log('\x1b[31m%s\x1b[0m', `Error while running ConcurrentCommandGroup: ${err}`);
        }
    }

    async runWithCwd(cwd, parentID=undefined, propagateError) {
        this.sendLog(StartingLog, { parentID });

        const onErrorEncountered = () => {
            this.sendLog(AsyncErrorLog);
            propagateError?.();
        };

        try {
            await Promise.all(this.commands.map(task => {
                switch (task.constructor) {
                    case Command:
                        return task.runWithCwd(cwd, this.id, onErrorEncountered);
                    case SerialCommandGroup:
                    case ConcurrentCommandGroup:
                        return task.runWithCwd(task.cwd || cwd, this.id, onErrorEncountered);
                }
            }));
        } catch (err) {
            this.sendLog(AsyncErrorLog);

            throw err;
        } finally {
            this.sendLog(EndingLog);
        }
    }
}

export default ConcurrentCommandGroup;