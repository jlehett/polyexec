import os from 'os';

class PathParser {

    static parse(path) {
        if (!path) return path;

        let parsedPath = path;

        if (path.startsWith('~/')) {
            parsedPath = path.replace('~', os.homedir());
        }

        if (path.startsWith('./')) {
            parsedPath = path.replace('.', process.cwd());
        }

        return parsedPath;
    }
}

export default PathParser;
