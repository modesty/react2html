import fs from 'fs';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';

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
					// console.log("copied file: " + filename);
				}
			});
		}
		else {
			fs.createReadStream(inPath).pipe(fs.createWriteStream(outPath));
			// console.log("copied file: " + filename);
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
	copyWildCard
};
