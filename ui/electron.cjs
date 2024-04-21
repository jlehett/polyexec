const { app, BrowserWindow } = require("electron");
const fs = require('fs');
const path = require('path');
const guiConfig = require('./gui-config.cjs');

const createWindow = () => {
    const config = guiConfig.get();

    const win = new BrowserWindow({
        width: config?.width || 800,
        height: config?.height || 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./electron/preload.cjs"),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: true,
        },
    });

    // Load the Vite app using the port
    win.loadURL(`http://localhost:${process.env.VITE_PORT}`);
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    app.quit();
});
