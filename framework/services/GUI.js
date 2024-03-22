import DataStream from './DataStream.js';

class GUI {
    #isInitialized = false;
    #dataStream;

    get isInitialized() {
        return this.#isInitialized;
    }

    async init() {
        this.#dataStream = DataStream.init();

        await this.#dataStream.waitForConnection();

        this.#isInitialized = true;
    }

    sendRequest(request) {
        this.#dataStream.sendRequest(request);
    }

    sendLog(log) {
        this.#dataStream.sendLog(log);
    }
}

export default new GUI();
