import Websocket from 'ws';
import readline from 'node:readline';

const socket = new Websocket('ws://localhost:8080');

socket.on('open', () => {
    console.log('Connected to server.\n');
});

socket.on('message', async (data, isBinary) => {
    try {
        const { message, validate, askID } = JSON.parse(isBinary ? data.toString() : data);

        if (message && askID) {

            let isValid = false;
            let value;
            do {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                await new Promise((resolve) => {
                    rl.question(`${message}: `, (response) => {
                        isValid = (() => {
                            if (!validate) {
                                return true;
                            }

                            const validateFn = eval(`(${validate})`);

                            return validateFn(response);
                        })();

                        value = response;
                        rl.close();
                        resolve();
                    });
                });

                if (!isValid) {
                    console.log('Invalid input. Please try again.\n');
                }
            } while (!isValid);

            socket.send(JSON.stringify({ askID, value }));
        }
    } catch {}
});

socket.on('message', (data, isBinary) => {
    try {
        const { logKey, message, type } = JSON.parse(isBinary ? data.toString() : data);

        if (logKey && message && type) {
            console.log(`\n${type} [${logKey}]:\n${message}`);
        }
    } catch {}
})