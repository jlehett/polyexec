const {
    Config,
    pathValidation,
    pathTransform,
} = require('autoscript/config');
const {
    Ask,
    Command,
    ConcurrentCommandGroup,
    SerialCommandGroup,
} = require('autoscript/process');

//#region Init Config

const config = Config.create('config.json');

const repoName = config.useVar({
    key: 'repoName',
    message: 'Enter repository name',
});

const repoOwner = config.useVar({
    key: 'repoOwner',
    related: repoName,
    message: `Enter ${repoName}'s owner name`,
});

const repoPath = config.useVar({
    key: 'repoPath',
    related: repoName,
    message: `Enter path for ${repoName}`,
    validation: pathValidation,
    transform: pathTransform,
});

//#endregion

//#region Ask User Input

const commitMessage = Ask.forString('Enter commit message');

//#endregion

//#region Define Process Groups

ConcurrentCommandGroup.create(
    'initRepo',
    [
        Command.create(`mkdir ${repoPath}`),
        Command.create('git init'),
        Command.create('git add .'),
        Command.create(`git commit`)
    ]
)

//#endregion