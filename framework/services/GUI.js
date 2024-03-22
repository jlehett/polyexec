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

    sendAskForValue({ message, validate, transform }) {
        return this.#dataStream.askClientForValue({ message, validate, transform });
    }

    sendLog({ logKey, message }) {
        this.#dataStream.sendLog({ logKey, message, type: 'log' });
    }

    sendError({ logKey, err }) {
        this.#dataStream.sendLog({ logKey, message: err, type: 'error' });
    }

    sendProcessComplete({ logKey }) {
        this.#dataStream.sendLog({ logKey, message: `${logKey} is complete!`, type: 'complete' });
    }

    sendProcessExitedWithError({ logKey }) {
        this.#dataStream.sendLog({ logKey, message: `${logKey} exited with error.`, type: 'exitWithError' });
    }
}

export default new GUI();
