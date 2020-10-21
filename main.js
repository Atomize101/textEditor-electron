const { app, BrowserWindow, Menu } = require('electron');
const fs = require('fs');
require('electron-reload')(__dirname);
const { dialog } = require('electron');

let win;
const template = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Save File',
				click: async () => {},
			},
			{
				label: 'Open File',
				click: async () => {
					const { filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] });
					const file = filePaths[0];
					const contents = fs.readFileSync(file, 'utf-8');
					win.webContents.send('fileOpened', {
						contents,
						filePath: file,
					});
					console.log(contents);
				},
			},
		],
	},
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
	win = new BrowserWindow({
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

app.whenReady().then(createWindow);
