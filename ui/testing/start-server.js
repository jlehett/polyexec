import readline from 'readline';
import ValueRequest from '../../connection/requests/ValueRequest.js';
import InfoLog from '../../connection/logs/InfoLog.js';
import StartingLog from '../../connection/logs/StartingLog.js';
import ErrorMessageLog from '../../connection/logs/ErrorMessageLog.js';
import DataStream from '../../framework/services/DataStream.js';

const dataStream = new DataStream({ port: 21734 });

console.log('Starting server...');

await dataStream.waitForConnection();

console.log('Connection established.');

// Begin a user input 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('> ');
rl.prompt();

let numRootLogs = 0;

rl.on('line', (line) => {
    const command = line.trim().split(' ');

    switch (command[0]) {
        case 'exit':
            rl.close();
            break;
        case 'request':
            dataStream.sendRequest(new ValueRequest({ message: 'Enter thing', recommendedOptions: ['risks', 'audits', 'processes'] }));
            break;
        case 'rootLog':
            dataStream.sendLog(new StartingLog({ name: 'New Root', id: String(++numRootLogs) }));
            break;
        case 'log':
            if (command[1] <= numRootLogs && command[1] > 0) {
                dataStream.sendLog(new InfoLog({
                    parentID: command[1],
                    message: command.slice(2).join(' '),
                }));
            } else {
                console.log('Invalid root log ID.');
            }
            break;
        case 'error':
            if (command[1] <= numRootLogs && command[1] > 0) {
                dataStream.sendLog(new ErrorMessageLog({
                    parentID: command[1],
                    errorMessage: command.slice(2).join(' '),
                }));
            } else {
                console.log('Invalid root log ID.');
            }
        default:
            console.log('Unknown command.');
            break;
    }

    rl.prompt();
});
