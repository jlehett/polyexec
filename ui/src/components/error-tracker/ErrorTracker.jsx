import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import ErrorMessageLog from '../../../../connection/logs/ErrorMessageLog';
import LogStore from '@services/log-store/LogStore';
import localStyles from './ErrorTracker.module.scss';
import SysCallErrorLog from '../../../../connection/logs/SysCallErrorLog';

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

        let lastHeader;

        return errorLogs.map((errorLog, errorLogIndex) => {
            const errorLogUI = (() => {
                switch (errorLog.type) {
                    case ErrorMessageLog.type:
                        return (
                            <ErrorMessageLogUI log={errorLog}/>
                        );
                    case SysCallErrorLog.type:
                        return (
                            <SysCallErrorLogUI log={errorLog}/>
                        );
                    default:
                        return null;
                }
            })();

            if (!errorLogUI) {
                return null;
            }

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

            return (
                <Wrapper key={errorLogIndex}>
                    {errorLogUI}
                </Wrapper>
            );
        }).filter((ele) => Boolean(ele));
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
    if (!log.errorMessage) {
        return null;
    }

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
    if (!log?.error?.code && !log?.error?.syscall) {
        return null;
    }

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