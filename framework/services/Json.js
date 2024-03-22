import fs from 'fs';

class Json {

    static async get(path) {
        const data = await import(path, { assert: { type: 'json' } });
        return data.default;
    }

    static set(path, data) {
        return fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

}

export default Json;
