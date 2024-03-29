import Config from '../../framework/data/Config.js';
import ConcurrentCommandGroup from '../../framework/data/ConcurrentCommandGroup.js';
import SerialCommandGroup from '../../framework/data/SerialCommandGroup.js';
import Ask from '../../framework/services/Ask.js';
import GUI from '../../framework/services/GUI.js';
import Command from '../../framework/data/Command.js';

await GUI.init();

//#region User Input

//#endregion

//#region Config

//#endregion

//#region Commands

SerialCommandGroup.create({
    name: 'Run Desktop Client',
    cwd: 'C:\\Users\\johnt',
    commands: [
        Command.create(`dir`),
        Command.create(`dir`),
    ]
}).run();

SerialCommandGroup.create({
    name: 'Run Mobile Client',
    cwd: 'C:\\Users\\johnt',
    commands: [
        Command.create(`dir`),
        Command.create(`dir`),
    ]
}).run();

//#endregion
