import { emit } from '@psionic/emit';
import Queue from '../../data/Queue';
import Request from '../../../../connection/Request';
import Log from '../../../../connection/Log';
import RequestHandler from '../request-handler/RequestHandler';
import LogStore from '../log-store/LogStore';

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

        console.log('Message received:', data);

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
            }, 500);
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
            default:
                break;
        }
    }
}

export default new MessageRouter();