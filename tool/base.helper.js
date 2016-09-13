"use strict";

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';

import Conf from './base.config';

const gaCode = `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${Conf.TRACK_ID}', 'auto');ga('send', 'pageview');</script>`;
const pageEnds = "</body></html>";

let browserSync = require('browser-sync');

function appendGATrackCode(content) {
	return content.slice(0, content.lastIndexOf(pageEnds)) + gaCode + pageEnds;
}

function startLiveServer() {
	let svcDir = "." + Conf.TAR_BASE;
	let watchFiles = [`${svcDir}/**/index.html`, `${svcDir}/**/*.css`, `${svcDir}/**/*.js`];
	let params = {
		port: 8181, // Set the server port. Defaults to 8080.
		localOnly: true, // Support environments where dynamic hostnames are not required (ie: electron)
		server: {
			baseDir: svcDir
		},
		files: watchFiles, // Browsersync can watch your files as you work. Changes you make will either be injected into the page (CSS & images) or will cause all browsers to do a full-page refresh.
		reloadDelay: 1000 //Wait for 1 second before any browsers should try to inject/reload a file.
	};

	let bs = browserSync.create(Conf.APP_NAME);
	bs.init(params);
}

function outputOnePage(content, destFolder) {
	mkdirp(destFolder, err => {
		if (err) {
			console.log('✗ Error: outputOnePage'.underline.maroon, err);
		}
		else {
			let outPath = path.join(destFolder, "index.html");
			let outStream = fs.createWriteStream(outPath);
			outStream.once('open', () => {
				outStream.write('<!doctype html>\r\n');
				outStream.write(appendGATrackCode(content));
				outStream.end();
			});
		}
	});
}

function parseAndPrepareDirs(pageFile, propFile, srcFolder, destFolder) {
	let pathParts = pageFile.split(path.sep);
	let relPath = "";
	for (let i = 0; i < pathParts.length - 1; i++) {
		relPath = relPath + path.sep + pathParts[i];
		mkdirp(path.join(destFolder, relPath));
	}

	return {
		pageFile: path.basename(pageFile),
		propFile: propFile ? relPath + path.sep + propFile: null,
		srcFolder: srcFolder + relPath,
		destFolder: path.normalize( destFolder + relPath + path.sep + path.basename(pageFile, '.js') )
	};
}

function transformOnePage(pageFile, propFile, srcFolder, destFolder) {

	const file = path.join(srcFolder, pageFile);
	let Component = require(file);
	delete require.cache[require.resolve(file)]; //force to invalidate the cache for changed file

	if (!Component) {
		console.log('✗ Error: No component found at'.underline.maroon, file);
		return;
	}

	if (Component.default) {
		Component = Component.default;
	}

	let props = propFile ? require(path.join(srcFolder, propFile)) : {};

	let html = ReactDOMServer.renderToStaticMarkup(
		React.createElement(Component, props)
	);

	outputOnePage(html, destFolder);
	console.log('transform page =>', path.relative(Conf.src.path, destFolder) + "/");
}

function transformDefaultPage() {
	transformOnePage('index.js', null, Conf.src.js_path, Conf.target.path);
}

function transformLinkedPage(filename) {
	const {pageFile, propFile, srcFolder, destFolder} = parseAndPrepareDirs(filename,
		null, Conf.src.js_path + "/pages", Conf.target.path);

	transformOnePage(pageFile, propFile, srcFolder, destFolder);
}

function transformLinkedPages() {
	glob("**/*.js", {cwd: Conf.src.js_path + "/pages"}, function(err, files) {
		if (err) {
			console.log("✗ Error: transformLinkedPages".underline.maroon, err);
		}
		else {
			files.forEach( filename => {
				transformLinkedPage(filename);
			});
		}
	});
}

function streamCopy(files, srcFolder, destFolder, cb) {
	files.forEach( filename => {
		let inPath = path.join(srcFolder, filename);
		let outPath = path.join(destFolder, filename);
		let isDirectory = fs.statSync(inPath).isDirectory();

		let outDir = isDirectory ? outPath : path.dirname(outPath);
		if (!fs.existsSync(outDir)) {
			mkdirp(outDir, err => {
				if (err) {
					cb(err, files);
				}
				else {
					fs.createReadStream(inPath).pipe(fs.createWriteStream(outPath));
					console.log("copied file: " + filename);
				}
			});
		}
		else {
			fs.createReadStream(inPath).pipe(fs.createWriteStream(outPath));
			console.log("copied file: " + filename);
		}
	});

	cb(null, files);
}

function copyWildCard(pattern, srcFolder, destFolder, cb) {
	glob(pattern, {cwd: srcFolder}, function(err, files) {
		if (err) {
			cb(err, files);
		}
		else {
			streamCopy(files, srcFolder, destFolder, cb);
		}
	});
}

export default {
	streamCopy,
	copyWildCard,
	transformDefaultPage,
	transformLinkedPage,
	transformLinkedPages,
	startLiveServer
};
