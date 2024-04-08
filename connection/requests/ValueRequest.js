import Request from '../Request.js';

class ValueRequest extends Request {
    static type = 'value-request';

    constructor({ message, validate, recommendedOptions }) {
        super({ message, validate: validate?.toString?.(), recommendedOptions });
    }

    async send(wss) {
        const response = await super.send(wss);

        return response.value;
    }

    static constructResponse(request, { value }) {
        return super.constructResponse(request, { value });
    }

    static validateValue(validateFnString, value) {
        if (!validateFnString) {
            return true;
        }

        const validateFn = eval(`(${validateFnString})`);

        return validateFn(value);
    }
}

export default ValueRequest;