import { emit } from '@psionic/emit';
import MessageRouter from '../message-router/MessageRouter';

class Connection {
    socket;

    EVENTS = {
        CONNECTED: 'connected',
    };

    async connect(port=8080) {
        this.socket = new WebSocket(`ws://localhost:${port}`);

        this.socket.onopen = () => {
            emit(this.EVENTS.CONNECTED);
        };

        this.socket.onmessage = (message) => MessageRouter.receive(message);
    }

    send(message) {
        console.log('Sending message:', message);
        this.socket.send(JSON.stringify(message));
    }
}

export default new Connection();