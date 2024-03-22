import inquirer from 'inquirer';
import GUI from './GUI.js';

class Ask {

    static async forValue({ message, validate, transform }) {
        if (!GUI.isInitialized) {
            throw new Error('GUI has not been initialized');
        }

        const { value } = await GUI.sendAskForValue({ message, validate, transform });

        return transform ? transform(value) : value;
    }

}

export default Ask;
