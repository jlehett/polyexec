import { spawn } from 'child_process';

const controller = new AbortController();
const { signal } = controller;

// Spawn 'vite preview' as a child process
const vitePreview = spawn('vite', ['preview'], { signal });

vitePreview.stdout.on('data', (data) => {
    // Convert the Buffer to a string
    const output = data.toString();

    // Check if the output contains the localhost URL
    if (output.includes('http://')) {
        // Extract the URL using a regular expression
        const urlMatch = output.match(/http:\/\/.*:(\d+)/);

        if (urlMatch) {
            // urlMatch[1] contains the port number
            const port = urlMatch[1];

            // Spawn the electron process and log anything it outputs
            const electronProcess = spawn('electron', ['.'], {
                env: {
                    ...process.env,
                    VITE_PORT: port,
                },
                signal,
            });

            console.log('Electron process started.');

            // Log the output of the electron process
            electronProcess.stdout.on('data', (data) => {
                console.log(data.toString());
            });

            electronProcess.stderr.on('data', (data) => {
                console.error(data.toString());
            });

            electronProcess.on('close', (code) => {
                process.exit();
            });
        }
    }
});

vitePreview.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

vitePreview.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

process.on('exit', () => {
    controller.abort();
    console.log('electron process exited');
});

process.on('SIGINT', () => {
    controller.abort();
    process.exit();
});

process.on('SIGTERM', () => {
    controller.abort();
    process.exit();
});