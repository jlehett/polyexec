import inquirer from 'inquirer';
import GUI from './GUI.js';
import ValueRequest from '../../connection/requests/ValueRequest.js';

class Ask {

    static async forValue({ message, validation, transform }) {
        Ask.#assertGUIInitialized();

        const { value } = await GUI.sendRequest(new ValueRequest({ message, validation }));

        return transform ? transform(value) : value;
    }

    static #assertGUIInitialized() {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }
    }

}

export default Ask;
