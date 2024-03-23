import Request from '../Request.js';

class ValueRequest extends Request {
    static type = 'value-request';

    constructor({ message, validation }) {
        super({ message, validation: validation.toString() });
    }

    async send(wss) {
        const response = await super.send(wss);

        return response.value;
    }

    static async sendResponse(socket, request, { value }) {
        super.sendResponse(socket, request, { value });
    }

    static validateValue(validationFnString, value) {
        const validationFn = eval(`(${validationFnString})`);

        return validationFn(value);
    }
}

export default ValueRequest;