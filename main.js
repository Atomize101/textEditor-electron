const { app, BrowserWindow, Menu } = require('electron');
require('electron-reload')(__dirname);

const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Open File',
				click: () => {
					console.log('file opened');
				},
			},
		],
	},
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile('index.html');
	win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
