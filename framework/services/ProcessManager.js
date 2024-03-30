import { spawn } from 'child_process';
import killSync from 'kill-sync';

class ProcessManager {

    constructor() {
        this.processesByPID = {};
    }

    spawn(commandString, opts) {
        const childProcess = spawn(commandString, opts);
        this.processesByPID[childProcess.pid] = childProcess;
        return childProcess;
    }

    killAllProcesses() {
        while (Object.values(this.processesByPID).length > 0) {
            try {
                const nextProcessToKill = Object.values(this.processesByPID)[0];
                killSync(nextProcessToKill.pid, 'SIGINT', true);
                delete this.processesByPID[nextProcessToKill.pid];
            } catch (err) {
                console.log('\x1b[31m%s\x1b[0m', `Error killing process ${nextProcessToKill.pid}: ${err}`);
            }
        }
    }
}

export default new ProcessManager();
