import Config from '../../framework/data/Config.js';
import ConcurrentCommandGroup from '../../framework/data/ConcurrentCommandGroup.js';
import SerialCommandGroup from '../../framework/data/SerialCommandGroup.js';
import Ask from '../../framework/services/Ask.js';
import GUI from '../../framework/services/GUI.js';
import Command from '../../framework/data/Command.js';

await GUI.init();

//#region User Input

const clientName = await Ask.forValue({
    message: 'Enter the name of the client you want to run',
    validation: (value) => value.length > 3,
});

//#endregion

//#region Config

const config = Config.create('config.json');

const clientProxyDirPath = await config.useVar({
    key: 'clientProxyDirPath',
    message: 'Enter the path to the client proxy directory',
    validation: (value) => value.length > 3,
    transform: (value) => `${value}-path`,
});

const clientDirPath = await config.useVar({
    key: 'clientDirPath',
    related: clientName,
    message: `Enter the path to the ${clientName} directory`,
    validation: (value) => value.length > 3,
    transform: (value) => `${value}-path`,
});

//#endregion

//#region Commands

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

//#endregion
