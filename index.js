const fs = require('fs');
const { ipcRenderer } = require('electron');

ipcRenderer.on('file', (event, content) => {
	document.getElementById('code').innerHTML = content;
	console.log(content);
});
