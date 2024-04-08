import readline from 'readline';
import WebSocket from 'ws';
import ValueRequest from '../../connection/requests/ValueRequest.js';
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

rl.on('line', (line) => {
    const command = line.trim().split(' ');

    switch (command[0]) {
        case 'exit':
            rl.close();
            break;
        case 'request':
            dataStream.sendRequest(new ValueRequest({ message: 'Enter thing', recommendedOptions: ['risks', 'audits', 'processes'] }));
            break;
        default:
            console.log('Unknown command.');
            break;
    }

    rl.prompt();
});
