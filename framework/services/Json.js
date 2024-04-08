import fs from 'fs';

class Json {

    static get(path) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, '{}');
        }

        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }

    static set(path, data) {
        return fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }

}

export default Json;
