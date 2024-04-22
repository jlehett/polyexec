import Command from './Command.js';
import ConcurrentCommandGroup from './ConcurrentCommandGroup.js';
import Loggable from './extensions/Loggable.js';
import PathParser from '../services/PathParser.js';
import StartingLog from '../../connection/logs/StartingLog.js';
import EndingLog from '../../connection/logs/EndingLog.js';
import ErroredLog from '../../connection/logs/ErroredLog.js';

class SerialCommandGroup extends Loggable {
    constructor({ commands, cwd, name }) {
        super({ name, type: 'CommandGroup' });

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
            console.log('\x1b[31m%s\x1b[0m', `Error while running SerialCommandGroup: ${err}`);
        }
    }

    async runWithCwd(cwd, parentID=undefined, propagateError) {
        this.sendLog(StartingLog, { parentID });

        const onErrorEncountered = () => {
            this.sendLog(ErroredLog);
            propagateError?.();
        };

        try {
            for (const task of this.commands) {
                switch (task.constructor) {
                    case Command:
                        await task.runWithCwd(cwd, this.id, onErrorEncountered);
                        break;
                    case SerialCommandGroup:
                    case ConcurrentCommandGroup:
                        await task.runWithCwd(task.cwd || cwd, this.id, onErrorEncountered);
                }
            }
        } catch (err) {
            this.sendLog(ErroredLog);

            throw err;
        } finally {
            this.sendLog(EndingLog);
        }
    }
}

export default SerialCommandGroup;
