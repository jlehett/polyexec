import Ask from '../services/Ask.js';
import GUI from '../services/GUI.js';
import StandardConfigVar from '../../connection/config-vars/StandardConfigVar.js';

class ConfigVar {
    constructor(config, { key, related, message, validate, transform }) {
        this.config = config;

        this.key = key;
        this.related = related;
        this.message = message;
        this.validation = validate;
        this.transform = transform;
    }

    async use() {
        let value = await this.get();

        if (value === undefined) {
            value = await Ask.forValue({
                message: this.message,
                validate: this.validate,
                transform: this.transform,
            });

            await this.set(value);
        }

        this.#sendStandardConfigVarUsage(value);

        return value;
    }

    async get() {
        const configJson = await this.config.get();

        if (this.related !== undefined) {
            return configJson[this.key]?.[this.related];
        } else {
            return configJson[this.key];
        }
    }

    async set(data) {
        const configJson = await this.config.get();

        if (this.related !== undefined) {
            if (configJson[this.key] === undefined) {
                configJson[this.key] = {};
            }

            configJson[this.key][this.related] = data;
        } else {
            configJson[this.key] = data;
        }

        await this.config.set(configJson);
    }

    #sendStandardConfigVarUsage(value) {
        this.#assertGUIInitialized();

        GUI.sendLog(new StandardConfigVar(this.key, value));
    }

    #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }
}

export default ConfigVar;
