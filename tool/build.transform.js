import React from 'react';
import ReactDOMServer from 'react-dom/server';

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';

import Conf from './base.config';

const gaCode = `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', '${Conf.TRACK_ID}', 'auto');ga('send', 'pageview');</script>`;
const pageEnds = "</body></html>";

function appendGATrackCode(content) {
	return content.slice(0, content.lastIndexOf(pageEnds)) + gaCode + pageEnds;
}

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
    console.log(`☯︎ start transform ${pageFile} ...`);

    const file = path.join(srcFolder, pageFile);
	let Component = require(file);
	//delete require.cache[require.resolve(file)]; //force to invalidate the cache for changed file
	purgeCache(file);

	if (!Component) {
		console.log(`✗ Error: No component found at ${file}`);
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
    console.log(`✓ Success: transform page => ${path.relative(Conf.src.path, destFolder)}`);	
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
