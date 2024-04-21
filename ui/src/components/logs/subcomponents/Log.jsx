import InfoLog from '../../../../../connection/logs/InfoLog';
import WarningLog from '../../../../../connection/logs/WarningLog';
import ErrorMessageLog from '../../../../../connection/logs/ErrorMessageLog';
import SysCallErrorLog from '../../../../../connection/logs/SysCallErrorLog';
import localStyles from './Log.module.scss';

//#region Main Component

function Log({
    log,
}) {

    const logElement = (() => {
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
    })();

    return logElement && (
        <div className={localStyles.logWrapper}>
            {logElement}
        </div>
    );
}

export default Log;

//#endregion

//#region Helper Components

function InfoLogUI({
    log,
}) {
    const styleOverrides = (() => {
        let overrides = {};

        if (log.isSuccess) {
            overrides.color = '#79ff87';
        }

        if (log.isRunning) {
            overrides.color = '#63b8ff';
        }

        return overrides;
    })();

    return (
        <p className={localStyles.infoLog} style={styleOverrides}>
            {log.message.trim()}
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
                    {log.message.trim()}
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
                    {log.errorMessage.trim()}
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