// Main process
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		backgroundColor: '#000000',
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs')
		}
	});

	const isDev = process.env.VITE_DESKTOP === '1';
	if (isDev) {
		mainWindow.loadURL('http://localhost:5174/');
	} else {
		mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
	}

	mainWindow.on('closed', () => { mainWindow = null; });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (mainWindow === null) createWindow(); });

ipcMain.handle('ping', () => 'pong');


