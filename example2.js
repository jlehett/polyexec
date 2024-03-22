import {
    Config,
    Ask,
    Command,
    ConcurrentCommandGroup,
    SerialCommandGroup,
    GUI,
    pathValidation,
    pathTransform,
    PATHS,
} from 'autoscript';

await GUI.init();

//#region User Input

const clientToRun = await Ask.forValue({
    message: 'Enter the name of the client you want to run',
});

//#endregion

//#region Config

const config = Config.create('config.json');

const clientProxyDirPath = await config.useVar({
    key: 'clientProxyDirPath',
    message: 'Enter the path to the client proxy directory',
    validation: pathValidation,
    transform: pathTransform,
});

const clientDirPath = await config.useVar({
    key: 'clientDirPath',
    related: clientToRun,
    message: `Enter the path to the ${clientToRun} directory`,
    validation: pathValidation,
    transform: pathTransform,
});

const clientInjectionName = await config.useVar({
    key: 'clientInjectionName',
    related: clientToRun,
    message: `Enter the name of the client injection for ${clientToRun}`,
});

const clientPort = await config.useVar({
    key: 'clientPort',
    related: clientToRun,
    message: `Enter the port for ${clientToRun}`,
});

const clientDataHubDirPath = await config.useVar({
    key: 'clientDataHubDirPath',
    message: 'Enter the path to the client data hub directory',
    validation: pathValidation,
    transform: pathTransform,
});

const clientHubDirPath = await config.useVar({
    key: 'clientHubDirPath',
    message: 'Enter the path to the client hub directory',
    validation: pathValidation,
    transform: pathTransform,
});

//#endregion

//#region Commands

ConcurrentCommandGroup.create({
    name: 'Run Client in Injected Mode',
    cwd: PATHS.HOME,
    tasks: [
        SerialCommandGroup.create({
            name: 'Run Client Proxy',
            cwd: clientProxyDirPath,
            tasks: [
                Command.create('npm i'),
                Command.create('npm run start'),
            ]
        }),
        SerialCommandGroup.create({
            name: 'Run Client',
            cwd: clientDirPath,
            tasks: [
                Command.create('npm i'),
                Command.create('npm run start'),
            ]
        }),
        SerialCommandGroup.create({
            name: 'Run Client Data Hub',
            cwd: clientDataHubDirPath,
            tasks: [
                Command.create('npm i'),
                Command.create('npm run start'),
            ]
        }),
        SerialCommandGroup.create({
            name: 'Run Client Hub',
            cwd: clientHubDirPath,
            tasks: [
                Command.create('npm i'),
                Command.create(`REACT_APP_${clientInjectionName}_CLIENT_URL=http://localhost:${clientPort} npm run start`),
            ]
        }),
    ],
}).run();

//#endregion