import ConfigVar from '../ConfigVar.js';

class StandardConfigVar extends ConfigVar {
    static type = 'standard';

    constructor(key, value) {
        super();

        this.key = key;
        this.value = value;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            key: this.key,
            value: this.value,
        };
    }
}

export default StandardConfigVar;
