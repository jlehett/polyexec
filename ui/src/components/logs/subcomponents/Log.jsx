import localStyles from './Log.module.scss';

//#region Main Component

function Log({
    log,
}) {

    function renderLog() {
        switch (log.type) {
            case 'info':
                return <InfoLog log={log}/>;
            case 'error-message':
                return <ErrorMessageLog log={log}/>;
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

function InfoLog({
    log,
}) {
    return (
        <p className={localStyles.infoLog}>
            {log.message}
        </p>
    );
}

function ErrorMessageLog({
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