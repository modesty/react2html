import React from 'react';
import ReactDOMServer from 'react-dom/server';

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';

import Conf from './base.config';

//invalidate cached files to enable auto-recompile then reload
//http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
/**
 * Removes a module from the cache
 */
function purgeCache(moduleName) {
	// Traverse the cache looking for the files
	// loaded by the specified module name
	searchCache(moduleName, function (mod) {
		delete require.cache[mod.id];
	});

	// Remove cached paths to the module.
	// Thanks to @bentael for pointing this out.
	Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
		if (cacheKey.indexOf(moduleName)>0) {
			delete module.constructor._pathCache[cacheKey];
		}
	});
}

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName, callback) {
	// Resolve the module identified by the specified name
	var mod = require.resolve(moduleName);

	// Check if the module has been resolved and found within
	// the cache
	if (mod && ((mod = require.cache[mod]) !== undefined)) {
		// Recursively go over the results
		(function traverse(mod) {
			// Go over each of the module's children and
			// traverse them
			mod.children.forEach(function (child) {
				traverse(child);
			});

			// Call the specified callback providing the
			// found cached module
			callback(mod);
		}(mod));
	}
}
//end of invalidate cached files

function outputOnePage(htmlStream, destFolder) {
	mkdirp(destFolder, err => {
		if (err) {
			console.log('✗ Error: outputOnePage');
		}
		else {
			const outPath = path.join(destFolder, "index.html");
			const outStream = fs.createWriteStream(outPath);
			outStream.once('open', () => {
				outStream.write('<!doctype html>');
				htmlStream.pipe(outStream, {end: false});
			});

			htmlStream.on('end', () => {
				outStream.end();
				console.log(`✓ Success: transform page => ${path.relative(Conf.src.path, destFolder)}`);
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
    console.log(`☯︎ start transform ${pageFile} ...`);

    const file = path.join(srcFolder, pageFile);
	let Component = require(file);
	//purgeCache(file);

	if (!Component) {
		console.log(`✗ Error: No component found at ${file}`);
		return;
	}

	Component = Component.default ? Component.default : Component;

	let props = propFile ? require(path.join(srcFolder, propFile)) : {};
	props = props.default ? props.default : props;

	const htmlStream = ReactDOMServer.renderToStaticNodeStream(
		React.createElement(Component, props)
	);

    outputOnePage(htmlStream, destFolder);
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

export default {
    transformOnePage,
	transformLinkedPage,
	transformLinkedPages
};
