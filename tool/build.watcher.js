import fs from 'fs';
import path from 'path';

import watch from 'node-watch';

import Conf from './base.config';
import copier from './base.copier';
import helper from './build.transform';
import Runner from './webpack.runner';

const copyFileExt = /\.(gif|jpg|jpeg|svg|png|ico|xml|txt)$/i;
const pageFileExt = /\.(js)$/i;
const build_all_triggers = ['components/', 'issues/', 'model/', 'props/'];

const fileTypes = ['ignore', 'asset file', 'index page file', 'linked page file', 'component file'];
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
	const relPath = _getRelativePath(f);
	copier.streamCopy([relPath], Conf.src.path, Conf.target.path, (err, files) => {
	});
}

function _handleChangedFile(f) {
	const fileType = _getFileType(f);
	
	const fileName = path.basename(f);
	const relPath = path.relative(Conf.src.js_path, f);
	const dir = path.dirname(relPath);
	console.log(`☯︎ ${f} => fileType=${fileType}  fileName=${fileName}  relPath=${relPath}  dir=${dir}`);

	switch (fileType) {
		case 1:	_copyOneFile(f); break; //new file
		case 2: helper.transformOnePage(fileName, `./props/${fileName}`, Conf.src.js_path, Conf.target.path); break;
		case 3: helper.transformOnePage(fileName, `../props/${dir}/${fileName}`, `${Conf.src.js_path}/${dir}`, `${Conf.target.path}/${path.basename(fileName, '.js')}`); break;
		case 4: helper.transformAllPages(); break;
		default: console.error('✗ Error: unrecognized file type', fileType); break;
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

function startWatchNonBundle() {
	console.log(`☯︎ start to watch ...`);
	watch(Conf.src.path, {
		recursive: true,
		filter: f => !/([/\\\\]client[/\\\\]|[/\\\\]styles[/\\\\])/gi.test(f),
		delay: 500
	}, (evt, f) => {
			console.log(`☯︎ watcher evt=${evt} name=${f}`);
			if (evt === 'update') {
				_handleChangedFile(f);
			}
			else if (evt === 'remove') {
				_handleRemovedFile(f);
			}
			else {
				console.error(`✗ Error: unrecognized event`, evt);	
			}
	});
}

Runner.watchCompile(startWatchNonBundle);
