const electron = require("electron");
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let isWindowSmall = false;
let windowPosition = [20, 20];

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 335, height: 700});
  mainWindow.setMenu(null);

  resetPos(); // Move window into position

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "/public/index.html"),
    protocol: "file:",
    slashes: true,
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

const expandWindow = function () {
  isWindowSmall = false;
  mainWindow.setSize(335, 700);
  resetPos();
};

const shrinkWindow = function () {
  isWindowSmall = true;
  mainWindow.setSize(335, 350);
  resetPos();
};

ipcMain.on("resize", function (e) {
  isWindowSmall ? expandWindow() : shrinkWindow()
});

const resetPos = function () {
  screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  windowSize = mainWindow.getSize();
  mainWindow.setPosition(screenSize.width - windowSize[0], screenSize.height - windowSize[1]);
}
