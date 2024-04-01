import { emit } from '@psionic/emit';
import Queue from '../../data/Queue';
import Request from '../../../../connection/Request';
import Log from '../../../../connection/Log';
import ConfigVar from '../../../../connection/ConfigVar';
import RequestHandler from '../request-handler/RequestHandler';
import LogStore from '../log-store/LogStore';
import ConfigVarStore from '../config-var-store/ConfigVarStore';

//#region Config

const MESSAGE_CHECK_TIME = 50;

//#endregion

class MessageRouter {

    #runningInterval;

    EVENTS = {
        MESSAGE_RECEIVED: 'message-received',
        MESSAGE_PROCESSING: 'message-processing',
    };

    constructor() {
        this.messageQueue = new Queue();
    }

    receive(message) {
        const data = JSON.parse(message.data);

        this.messageQueue.enqueue(data);

        emit(this.EVENTS.MESSAGE_RECEIVED, data);
    }

    get processing() {
        return Boolean(this.#runningInterval);
    }

    set processing (value) {
        if (value) {
            this.#runningInterval = setInterval(() => {
                this.#processQueue();
            }, MESSAGE_CHECK_TIME);
        }

        if (!value) {
            clearInterval(this.#runningInterval);
        }
    }

    #processQueue() {
        if (this.messageQueue.isEmpty) {
            return;
        }

        const message = this.messageQueue.dequeue();

        switch (message.superType) {
            case Log.superType:
                LogStore.add(message);
                break;
            case Request.superType:
                RequestHandler.receive(message);
                break;
            case ConfigVar.superType:
                ConfigVarStore.add(message);
                break;
            default:
                console.log('Unknown message type', message);
                break;
        }
    }
}

export default new MessageRouter();