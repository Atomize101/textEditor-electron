const fs = require('fs');
const { ipcRenderer } = require('electron');

ipcRenderer.on('fileOpened', (event, { contents, filePath }) => {
	document.getElementById('code').value = contents;
	document.getElementById('file-path').value = filePath;
	console.log(contents);
});
