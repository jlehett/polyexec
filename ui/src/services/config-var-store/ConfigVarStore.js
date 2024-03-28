import { emit } from '@psionic/emit';

class ConfigVarStore {

    EVENTS = {
        CONFIG_VAR_USED: 'config-var-used',
    };

    constructor() {
        this.configVars = new Map();
    }

    add(configVar) {
        this.configVars.set(configVar);

        emit(this.EVENTS.CONFIG_VAR_USED, configVar);
    }
}

export default new ConfigVarStore();
