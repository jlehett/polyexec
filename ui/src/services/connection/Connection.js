import { emit } from '@psionic/emit';
import MessageRouter from '../message-router/MessageRouter';

class Connection {
    socket;

    EVENTS = {
        CONNECTED: 'connected',
    };

    async connect() {
        this.socket = new WebSocket(`ws://localhost:${window?.ports?.connection || 21734}`);

        this.socket.onopen = () => {
            emit(this.EVENTS.CONNECTED);
        };

        this.socket.onmessage = (message) => MessageRouter.receive(message);
    }

    send(message) {
        this.socket.send(JSON.stringify(message));
    }
}

export default new Connection();