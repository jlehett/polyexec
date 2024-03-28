import InfoLog from '../../../../../connection/logs/InfoLog';
import ErrorMessageLog from '../../../../../connection/logs/ErrorMessageLog';
import localStyles from './Log.module.scss';

//#region Main Component

function Log({
    log,
}) {

    function renderLog() {
        switch (log.type) {
            case InfoLog.type:
                return <InfoLogUI log={log}/>;
            case ErrorMessageLog.type:
                return <ErrorMessageLogUI log={log}/>;
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

function ErrorMessageLogUI({
    log,
}) {
    return (
        <p className={localStyles.errorMessageLog}>
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