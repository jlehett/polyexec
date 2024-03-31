//#region Config

const DELIBERATION_TIMER = 1000;

//#endregion

class StdErrMessageHandler {
    lastMessage;
    lastMessageConsumptionTimeout;

    constructor({
        onConsumeError,
        onConsumeWarning,
    }) {
        this.#resetLastMessageTracker();

        this.onConsumeWarning = onConsumeWarning;
        this.onConsumeError = onConsumeError;
    }

    get hasPendingMessage() {
        return Boolean(this.lastMessage);
    }

    handleStdErr(message) {
        if (this.lastMessage) {
            this.#consumeLastMessageAsWarning();
        }

        if (this.#seemsToBeWarning(message)) {
            this.onConsumeWarning(message);
        } else if (this.#seemsToBeError(message)) {
            this.onConsumeError(message);
        } else {
            this.#deliberateOnMessage(message);
        }
    }

    consumeLastMessageAsError() {
        if (this.lastMessage) {
            this.onConsumeError(this.lastMessage);
            this.#resetLastMessageTracker();
        }
    }

    #consumeLastMessageAsWarning() {
        if (this.lastMessage) {
            this.onConsumeWarning(this.lastMessage);
            this.#resetLastMessageTracker();
        }
    }

    #seemsToBeWarning(message) {
        return message.toLowerCase().includes('warning');
    }

    #seemsToBeError(message) {
        return message.toLowerCase().includes('error');
    }

    #deliberateOnMessage(message) {
        this.lastMessage = message;

        this.lastMessageConsumptionTimeout = setTimeout(() => {
            this.#consumeLastMessageAsWarning();
        }, DELIBERATION_TIMER);
    }

    #resetLastMessageTracker() {
        this.lastMessage = null;

        if (this.lastMessageConsumptionTimeout) {
            clearTimeout(this.lastMessageConsumptionTimeout);
            this.lastMessageConsumptionTimeout = null;
        }
    }
}

export default StdErrMessageHandler;
