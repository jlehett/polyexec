import Request from '../Request.js';

class ValueRequest extends Request {
    static type = 'value-request';

    static create({ message, validation }) {
        return super.create({
            message,
            validation: validation.toString(),
        });
    }

    async send(wss) {
        const response = await super.send(wss);

        return response.value;
    }
}

export default ValueRequest;