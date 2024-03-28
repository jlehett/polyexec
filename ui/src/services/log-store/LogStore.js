import StartingLog from '../../../../connection/logs/StartingLog';
import { emit } from '@psionic/emit';

class LogStore {

    EVENTS = {
        LOG_ADDED: 'log-added',
    };

    constructor() {
        this.allLogs = [];
        this.groupsInfo = new Map();
    }

    add(log) {
        this.allLogs.push(log);

        if (log.type === StartingLog.type) {
            const { name } = log;
            this.#updateGroupInfo(log.id, { name });
        }

        emit(this.EVENTS.LOG_ADDED, log);
    }

    getGroupInfo({ id, parentID }) {
        return this.groupsInfo.has(id) ? this.groupsInfo.get(id) : this.groupsInfo.get(parentID);
    }

    #updateGroupInfo(id, info) {
        if (!this.groupsInfo.has(id)) {
            this.groupsInfo.set(id, { ...info });
        } else {
            this.groupsInfo.set(id, { ...this.groupsInfo.get(id), ...info });
        }
    }
}

export default new LogStore();
