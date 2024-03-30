export { default as Command } from './data/Command.js';
export { default as ConcurrentCommandGroup } from './data/ConcurrentCommandGroup.js';
export { default as SerialCommandGroup } from './data/SerialCommandGroup.js';
export { default as Config } from './data/Config.js';
export { default as Ask } from './services/Ask.js';
export { default as GUI } from './services/GUI.js';

// On process exit, kill all child processes
import ProcessManager from './services/ProcessManager.js';

process.on('exit', () => {
    ProcessManager.killAllProcesses();
    console.log('\x1b[31m%s\x1b[0m', `All child processes killed.\n`);
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('SIGTERM', () => {
    process.exit();
});