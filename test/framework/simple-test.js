import SerialCommandGroup from '../../framework/data/SerialCommandGroup.js';
import Ask from '../../framework/services/Ask.js';
import GUI from '../../framework/services/GUI.js';
import Command from '../../framework/data/Command.js';

await GUI.init();

const clientName = await Ask.forValue({
    message: 'Enter the name of the client you want to run',
    validation: (value) => value.length > 3,
});

SerialCommandGroup.create({
    name: 'Run Client',
    cwd: 'C:\\Users\\johnt',
    commands: [
        Command.create(`dir`),
        Command.create(`dir`),
        Command.create(`dir`),
    ],
}).run();