const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "./electron/preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  // Read the port from the file
  const port = fs.readFileSync(path.resolve(__dirname, 'vite-port.txt'), 'utf8');

  // Load the Vite app using the port
  win.loadURL(`http://localhost:${port}`);

//   win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
