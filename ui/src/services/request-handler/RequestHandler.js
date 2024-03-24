import { emit } from '@psionic/emit';
import Connection from '../connection/Connection';
import ValueRequest from '../../../../connection/requests/ValueRequest';

class RequestHandler {

    EVENTS = {
        VALUE_REQUEST_RECEIVED: 'value-request-received',
    };

    constructor() {
        this.currentRequest = null;
    }

    receive(request) {
        this.currentRequest = request;

        switch (request.type) {
            case ValueRequest.type:
                emit(this.EVENTS.VALUE_REQUEST_RECEIVED, request);
                break;
            default:
                throw new Error(`Unknown request type: ${request.type}`);
        }
    }

    sendResponse(data) {
        const response = this.constructResponseFor[this.currentRequest.type](data);
        Connection.send(response);

        this.currentRequest = null;
    }

    get constructResponseFor() {
        return {
            [ValueRequest.type]: ({ value }) => ValueRequest.constructResponse(this.currentRequest, { value }),
        };
    }
}

export default new RequestHandler();
