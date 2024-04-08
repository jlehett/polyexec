import Json from '../services/Json.js';
import ConfigVar from './ConfigVar.js';
import { config as commandConfig } from './Command.js';

class Config {
    constructor(configPath, { shell } = {}) {
        this.configPath = configPath;

        commandConfig.shell = shell ?? true;
    }

    static create(configPath) {
        return new Config(configPath);
    }

    get() {
        return Json.get(this.configPath);
    }

    set(data) {
        return Json.set(this.configPath, data);
    }

    async useVar({ key, related, message, validate, transform }) {
        const configVar = new ConfigVar(this, { key, related, message, validate, transform });

        return await configVar.use();
    }

    getRelatedKeysFor(key) {
        const configJson = this.get();

        const configValueAtKey = configJson[key];
        
        switch (true) {
            case configValueAtKey instanceof Object:
                return Object.keys(configValueAtKey);
            default:
                return [];
        }
    }
}

export default Config;
