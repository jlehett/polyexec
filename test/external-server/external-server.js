import Websocket from 'ws';
import readline from 'node:readline';
import ValueRequest from '../../connection/requests/ValueRequest.js';
import StartingLog from '../../connection/logs/StartingLog.js';
import EndingLog from '../../connection/logs/EndingLog.js';
import InfoLog from '../../connection/logs/InfoLog.js';

const socket = new Websocket('ws://localhost:8080');

socket.on('open', () => {
    console.log('Connected to server.\n');
});

const groupsInfo = new Map();

socket.on('message', async (incomingMessage, isBinary) => {
    try {
        const { type, id, ...rest } = JSON.parse(isBinary ? incomingMessage.toString() : incomingMessage);

        switch (type) {
            case ValueRequest.type:
                {
                    const { message, validation } = rest;

                    let isValid, value;
                    do {
                        const rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });

                        await new Promise((resolve) => {
                            rl.question(`${message}: `, (response) => {
                                isValid = validation ? ValueRequest.validateValue(validation, response) : true;
                                value = response;
                                rl.close();
                                resolve();
                            });
                        });

                        if (!isValid) {
                            console.log('Invalid input. Please try again.\n');
                        }
                    } while (!isValid);

                    ValueRequest.sendResponse(socket, { type, id, ...rest }, { value });

                    break;
                }
            case StartingLog.type:
                {
                    const { name } = rest;
                    groupsInfo.set(id, { name });
                    console.log(`Starting ${name}...`);
                    break;
                }
            case EndingLog.type:
                {
                    const groupInfo = groupsInfo.get(id);
                    console.log(`${groupInfo?.name} ended!`);
                    break;
                }
            case InfoLog.type:
                {
                    const { message, parentID } = rest;
                    const parentGroupInfo = groupsInfo.get(parentID);
                    console.log(`\n[INFO] [${parentGroupInfo?.name}]:\n${message}\n`);
                    break;
                }
            default:
                break;
        }
    } catch {}
});
