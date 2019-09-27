import fs from 'fs';
import path from 'path';

import watch from 'watch';

import Conf from './base.config';
import helper from './base.copier';
import Runner from './webpack.runner';

const copyFileExt = /\.(gif|jpg|jpeg|svg|png|ico|xml|txt)$/i;
const pageFileExt = /\.(js)$/i;
const build_all_triggers = ['components/', 'issues/', 'model/'];

// 0: ignore; 1: asset file; 2: index page file; 3: linked page file; 4: component file
function _getFileType(f) {
	let retVal = 0;
	let extName = path.extname( path.basename(f) );
	if (!extName || extName.length < 2) {
		console.info(`☯︎ ignore:`, path.basename(f));
	}
	else if (copyFileExt.test(extName)) {
		retVal = 1;
	}
	else if (pageFileExt.test(extName)) {
		if (f.indexOf('index.js') > 0) {
			retVal = 2;
		}
		else if (f.indexOf('pages/') > 0) {
			retVal = 3;
		}
		else if (build_all_triggers.filter( t => f.indexOf(t) > 0).length > 0) {
			retVal = 4;
		}
	}

	return retVal;
}

function _getRelativePath(f) {
	return path.relative(Conf.src.path, f);
}

function _copyOneFile(f) {
	let relPath = _getRelativePath(f);
	helper.streamCopy([relPath], Conf.src.path, Conf.target.path, (err, files) => {
	});
}

function _handleChangedFile(f) {
	let fileType = _getFileType(f);
	console.log("fileType", fileType, f);
	switch (fileType) {
		case 1:	_copyOneFile(f); break;
		case 2: helper.transformDefaultPage(); break;
		case 3: helper.transformLinkedPage(path.basename(f)); break;
		case 4: {
			helper.transformDefaultPage();
			helper.transformLinkedPages();
		} break;
	}
}

function _handleRemovedFile(f) {
	let fileType = _getFileType(f);
	if (fileType === 0) {
		let relPath = _getRelativePath(f);
		fs.unlink(path.join(Conf.target.path, relPath), (err) => {
			if (err) {
				console.error(`✗ Error: when deleting ${relPath}`, err);
			}
			else {
				console.info(`☯︎ File deleted: ${relPath}`);
			}
		});
	}
	else if (fileType === 1) {
		console.error('✗ Error: index page should never be deleted.')
	}
	else if (fileType === 2) {
		let targetFile = path.basename(f, ".js") + ".html";
		fs.unlink(path.join(Conf.target.path, targetFile), (err) => {
			if (err) {
				console.error(`✗ Error: when deleting ${targetFile}`, err);
			}
			else {
				console.info(`☯︎ File deleted: ${targetFile}`);
			}
		});
	}
}

watch.watchTree(Conf.src.path, {
	ignoreDotFiles: true,
	ignoreUnreadableDir: true,
	ignoreNotPermitted: true,
	ignoreDirectoryPattern: /\/client\//i,
	interval: 500
}, (f, curr, prev) => {
	if (typeof f == "object" && prev === null && curr === null) {
		console.log("☯︎ watcher: finished walking the source tree");
	} else if (prev === null) {
		console.log("☯︎ watcher: new file:", path.basename(f));
		_handleChangedFile(f);
	} else if (curr.nlink === 0) {
		console.log("☯︎ watcher: file removed:", path.basename(f));
		_handleRemovedFile(f);
	} else {
		console.log("☯︎ watcher: file changed:", path.basename(f));
		_handleChangedFile(f);
	}
});
