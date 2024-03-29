import { spawn } from 'child_process';

// Spawn 'vite preview' as a child process
const vitePreview = spawn('vite', ['preview']);

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
      console.log(`Vite preview is running on port: ${port}`);

      // You can now use the port variable programmatically here
      // For example, trigger another function or write to a file
      spawn('electron', ['.'], {
        env: {
            ...process.env,
            VITE_PORT: port,
        }
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
