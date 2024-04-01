import Log from '../Log.js';

class SysCallErrorLog extends Log {
    static type = 'syscall-error';

    get isValid() {
        return ![null, undefined].includes(this.parentID)
            && (
                Boolean(this.error?.code?.())
                || Boolean(this.error?.syscall?.trim?.())
            );
    }

    constructor(parentID, error) {
        super();

        this.parentID = parentID;
        this.error = error;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            parentID: this.parentID,
            error: this.error,
        };
    }
}

export default SysCallErrorLog;
