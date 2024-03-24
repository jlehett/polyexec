import ConcurrentCommandGroup from '../../framework/data/ConcurrentCommandGroup.js';
import SerialCommandGroup from '../../framework/data/SerialCommandGroup.js';
import Ask from '../../framework/services/Ask.js';
import GUI from '../../framework/services/GUI.js';
import Command from '../../framework/data/Command.js';

await GUI.init();

const clientName = await Ask.forValue({
    message: 'Enter the name of the client you want to run',
    validation: (value) => value.length > 3,
});

ConcurrentCommandGroup.create({
    name: 'Run All Clients',
    cwd: 'C:\\Users\\johnt',
    commands: [
        SerialCommandGroup.create({
            name: 'Run Web Client',
            commands: [
                Command.create(`dir`),
                Command.create(`dir`),
            ]
        }),
        SerialCommandGroup.create({
            name: 'Run Mobile Client',
            commands: [
                Command.create(`dir`),
                Command.create(`dir`),
                SerialCommandGroup.create({
                    name: 'Run Android Client',
                    commands: [
                        Command.create(`echo ${clientName}`),
                        Command.create(`dir`),
                    ]
                })
            ]
        }),
        SerialCommandGroup.create({
            name: 'Run Desktop Client',
            commands: [
                Command.create(`dir`),
                Command.create(`dir`),
            ]
        }),
    ]
}).run();