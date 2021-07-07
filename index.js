const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // win.webContents.userAgent = win.webContents.userAgent.replace(/Electron\/(\d)+\.(\d)+\.(\d)+ /, '');
  // console.log('user agent: ', win.webContents.userAgent);

  win.loadURL('http://localhost:6006/?path=/story/app--default')

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('login', function(event, webContents, request, authInfo, callback) {
  console.log('login event', request.url);
  event.preventDefault();
  callback('indigo', 'indigo123');
});


app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready', function () {
  createWindow()
});
