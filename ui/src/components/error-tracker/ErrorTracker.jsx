import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import ErrorMessageLog from '../../../../connection/logs/ErrorMessageLog';
import LogStore from '@services/log-store/LogStore';
import localStyles from './ErrorTracker.module.scss';

//#region Main Component

function ErrorTracker({
    maxHeight,
}) {
    const errorLogs = useErrorLogs();

    function renderErrorLogs() {
        if (errorLogs.length === 0) {
            return (
                <p>
                    No errors yet
                </p>
            );
        }

        return errorLogs.map((errorLog, errorLogIndex) => {
            const groupInfo = LogStore.getGroupInfo(errorLog);

            return (
                <p className={localStyles.errorLog} key={errorLogIndex}>
                    {
                        groupInfo?.name && (
                            <span className={localStyles.groupName}>
                                [{groupInfo.name}]{' '}
                            </span>
                        )
                    }
                    {
                        errorLog.error.code && (
                            <span>
                                [{errorLog.error.code}]{' '}
                            </span>
                        )
                    }
                    {
                        errorLog.error.syscall && (
                            <span>
                                {errorLog.error.syscall}
                            </span>
                        )
                    }
                </p>
            );
        });
    }

    return (
        <div className="card">
            <header>
                <h1>Errors</h1>
            </header>
            <div className="content" style={{ maxHeight }}>
                <div className={localStyles.errorLogsContainer}>
                    {renderErrorLogs()}
                </div>
            </div>
        </div>
    );
}

export default ErrorTracker;

//#endregion

//#region Helper Hooks

function useErrorLogs() {
    const [errorLogs, setErrorLogs] = useState([]);

    useOnEmit(LogStore.EVENTS.LOG_ADDED, (log) => {
        if (log.type === ErrorMessageLog.type) {
            setErrorLogs((errorLogs) => [...errorLogs, log]);
        }
    });

    return errorLogs;
}

//#endregion
