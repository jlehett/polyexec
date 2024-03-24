import { useOnEmit } from '@psionic/emit-react';
import LogStore from '@services/log-store/LogStore';

function Logs() {
    useOnEmit(LogStore.EVENTS.LOG_ADDED, (log) => {

    });

    return (
        <div>
            Logs
        </div>
    );
}

export default Logs;
