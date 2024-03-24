import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import StartingLog from '../../../../connection/logs/StartingLog';
import LogStore from '@services/log-store/LogStore';
import LogGroup from './subcomponents/LogGroup';
import localStyles from './Logs.module.scss';

//#region Main Component

function Logs() {
    const rootLogs = useRootLogs();

    function renderRootLogs() {
        if (rootLogs.length === 0) {
            return (
                <p>No logs available yet</p>
            );
        }

        return rootLogs.map((log) => {
            return (
                <LogGroup key={log.id} groupID={log.id} depth={0}/>
            );
        });
    }

    return (
        <div className={localStyles.logsCard}>
            <header>
                <h1>Logs</h1>
            </header>
            <div className={localStyles.content}>
                <div className={localStyles.rootLogsContainer}>
                    {renderRootLogs()}
                </div>
            </div>
        </div>
    );
}

export default Logs;

//#endregion

//#region Helper Hooks

function useRootLogs() {
    const [rootLogsByID, setRootLogsByID] = useState(new Map());

    useOnEmit(LogStore.EVENTS.LOG_ADDED, (log) => {
        if (log.parentID) {
            return;
        }

        if (log.type !== StartingLog.type) {
            return;
        }

        if (rootLogsByID.has(log.id)) {
            return;
        }

        setRootLogsByID(new Map(rootLogsByID).set(log.id, log));
    });

    return Array.from(rootLogsByID.values());
}

//#endregion
