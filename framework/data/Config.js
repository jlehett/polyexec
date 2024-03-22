import Json from '../services/Json.js';

class Config {
    constructor(configPath) {
        this.configPath = configPath;
    }

    static create(configPath) {
        return new Config(configPath);
    }

    async get() {
        return await Json.get(this.configPath);
    }

    async set(data) {
        return await Json.set(this.configPath, data);
    }

    async useVar({ key, related, message, validate, transform }) {
        const configVar = new ConfigVar(this, { key, related, message, validate, transform });

        return await configVar.use();
    }
}

export default Config;
