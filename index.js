const fs = require('fs');
const wallpaper = require('wallpaper'); //https://github.com/sindresorhus/wallpaper
const request = require('request');
const provider = require('./provider');

// https://stackoverflow.com/questions/12740659/downloading-images-with-node-js?answertab=active#tab-top
const download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

(async () => {
	const urlProvider = await provider.getUrlPhoto();
	const name = new Date().getTime() + '.png';
	download(urlProvider.url, name, async () => {
		await wallpaper.set(name);
		console.log( JSON.stringify(urlProvider, null , 4) );
	});
})()

