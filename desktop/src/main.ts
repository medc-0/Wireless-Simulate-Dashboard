import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
		width: 1280,
		height: 800,
		backgroundColor: "#000000",
		webPreferences: {
			preload: path.join(__dirname, "preload.cjs")
		}
	});

	const isDev = process.env.VITE_DESKTOP === "1";
    // Always run offline against built files when packaged or in dev:desktop
    const indexPath = path.join(__dirname, "..", "..", "dist", "index.html");
    mainWindow.once('ready-to-show', () => {
        mainWindow?.show();
    });
    mainWindow.loadFile(indexPath);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (mainWindow === null) createWindow(); });

ipcMain.handle("ping", async () => "pong");


