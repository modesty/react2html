"use strict";

import fs from 'fs-extra';
import colors from 'colors';

import Conf from './base.config';

function emptyTarget() {
	console.log("pre-build: empty target directory ...".underline.magenta);

	//Ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.
	fs.emptyDir(Conf.target.path,  err => {
		if (err) {
			console.log("✗ Error: emptyTarget:".underline.maroon, err);
		}
		else {
			console.log('✓ Success: ' + Conf.target.path + " is cleaned up.")
		}
	});
}

function main() {
	emptyTarget();
}

main();