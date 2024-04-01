import { useMemo } from 'react';
import InfoLog from '../../../../../connection/logs/InfoLog';
import WarningLog from '../../../../../connection/logs/WarningLog';
import ErrorMessageLog from '../../../../../connection/logs/ErrorMessageLog';
import SysCallErrorLog from '../../../../../connection/logs/SysCallErrorLog';
import localStyles from './Log.module.scss';

//#region Main Component

function Log({
    log,
}) {
    const logUiEle = useMemo(() => {
        switch (log.type) {
            case InfoLog.type:
                return <InfoLogUI log={log}/>;
            case WarningLog.type:
                return <WarningLogUI log={log}/>;
            case ErrorMessageLog.type:
                return <ErrorMessageLogUI log={log}/>;
            case SysCallErrorLog.type:
                return <SysCallErrorLogUI log={log}/>;
            default:
                return null;
        }
    }, [log]);

    if (!logUiEle) {
        return null;
    }

    return (
        <div className={localStyles.logWrapper}>
            {logUiEle}
        </div>
    );
}

export default Log;

//#endregion

//#region Helper Components

function InfoLogUI({
    log,
}) {
    if (!log.message) {
        return null;
    }

    return (
        <p className={localStyles.infoLog}>
            {log.message.trim()}
        </p>
    );
}

function WarningLogUI({
    log,
}) {
    if (!log.message) {
        return null;
    }

    return (
        <p className={localStyles.warningLog}>
            {log.message && (
                <span className={localStyles.warningMessage}>
                    {log.message.trim()}
                </span>
            )}
        </p>
    );
}

function ErrorMessageLogUI({
    log,
}) {
    if (!log.errorMessage) {
        return null;
    }

    return (
        <p className={localStyles.errorMessageLog}>
            {log.errorMessage && (
                <span className={localStyles.errorMessage}>
                    {log.errorMessage.trim()}
                </span>
            )}
        </p>
    );
}

function SysCallErrorLogUI({
    log,
}) {
    if (!log.error.code && !log.error.syscall) {
        return null;
    }

    return (
        <p className={localStyles.sysCallErrorLog}>
            {log.error.code && (
                <span className={localStyles.errorCode}>
                    [{log.error.code.trim()}]{' '}
                </span>
            )}
            {log.error.syscall && (
                <span className={localStyles.errorSyscall}>
                    {log.error.syscall.trim()}
                </span>
            )}
        </p>
    );
}

//#endregion