import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import ErrorMessageLog from '../../../../connection/logs/ErrorMessageLog';
import LogStore from '@services/log-store/LogStore';
import localStyles from './ErrorTracker.module.scss';
import SysCallErrorLog from '../../../../connection/logs/SysCallErrorLog';

//#region Main Component

function ErrorTracker() {
    const errorLogs = useErrorLogs();

    function renderErrorLogs() {
        if (errorLogs.length === 0) {
            return (
                <p>
                    No errors yet
                </p>
            );
        }

        let lastHeader;

        return errorLogs.map((errorLog, errorLogIndex) => {
            const groupInfo = LogStore.getGroupInfo(errorLog);

            const Wrapper = lastHeader !== groupInfo?.name
                ? ({ children }) => {
                    return (
                        <>
                            <span className={localStyles.groupName}>[{groupInfo?.name}]</span>
                            <div className={localStyles.errorWrapper}>
                                {children}
                            </div>
                        </>
                    );
                }
                : ({ children }) => <div className={localStyles.errorWrapper}>{children}</div>;

            lastHeader = groupInfo?.name;

            switch (errorLog.type) {
                case ErrorMessageLog.type:
                    return (
                        <Wrapper key={errorLogIndex}>
                            <ErrorMessageLogUI log={errorLog}/>
                        </Wrapper>
                    );
                case SysCallErrorLog.type:
                    return (
                        <Wrapper key={errorLogIndex}>
                            <SysCallErrorLogUI log={errorLog}/>
                        </Wrapper>
                    );
                default:
                    return null;
            }
        });
    }

    return (
        <div className="card">
            <header>
                <h1>Errors</h1>
            </header>
            <div className={`content ${localStyles.errorTrackerContent}`}>
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
        if ([ErrorMessageLog.type, SysCallErrorLog.type].includes(log.type)) {
            setErrorLogs((errorLogs) => [...errorLogs, log]);
        }
    });

    return errorLogs;
}

//#endregion

//#region Helper Components

function ErrorMessageLogUI({
    log,
}) {
    return (
        <p className={localStyles.errorLog}>
            {
                log.errorMessage && (
                    <span className={localStyles.errorMessage}>
                        {log.errorMessage}
                    </span>
                )
            }
        </p>
    );
}

function SysCallErrorLogUI({
    log,
}) {
    return (
        <p className={localStyles.errorLog}>
            {
                log.error.code && (
                    <span>
                        [{log.error.code}]{' '}
                    </span>
                )
            }
            {
                log.error.syscall && (
                    <span>
                        {log.error.syscall}
                    </span>
                )
            }
        </p>
    );
}

//#endregion