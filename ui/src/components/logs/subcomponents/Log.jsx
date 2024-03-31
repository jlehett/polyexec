import InfoLog from '../../../../../connection/logs/InfoLog';
import WarningLog from '../../../../../connection/logs/WarningLog';
import ErrorMessageLog from '../../../../../connection/logs/ErrorMessageLog';
import SysCallErrorLog from '../../../../../connection/logs/SysCallErrorLog';
import localStyles from './Log.module.scss';

//#region Main Component

function Log({
    log,
}) {

    function renderLog() {
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
    }

    return (
        <div className={localStyles.logWrapper}>
            {renderLog()}
        </div>
    );
}

export default Log;

//#endregion

//#region Helper Components

function InfoLogUI({
    log,
}) {
    return (
        <p className={localStyles.infoLog}>
            {log.message}
        </p>
    );
}

function WarningLogUI({
    log,
}) {
    return (
        <p className={localStyles.warningLog}>
            {log.message && (
                <span className={localStyles.warningMessage}>
                    {log.message}
                </span>
            )}
        </p>
    );
}

function ErrorMessageLogUI({
    log,
}) {
    return (
        <p className={localStyles.errorMessageLog}>
            {log.errorMessage && (
                <span className={localStyles.errorMessage}>
                    {log.errorMessage}
                </span>
            )}
        </p>
    );
}

function SysCallErrorLogUI({
    log,
}) {
    return (
        <p className={localStyles.sysCallErrorLog}>
            {log.error.code && (
                <span className={localStyles.errorCode}>
                    [{log.error.code}]{' '}
                </span>
            )}
            {log.error.syscall && (
                <span className={localStyles.errorSyscall}>
                    {log.error.syscall}
                </span>
            )}
        </p>
    );
}

//#endregion