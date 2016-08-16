"use strict";

import colors from 'colors';
import fs from 'fs-extra';

import Conf from './base.config';
import helper from './base.helper';

function copyResources() {
	console.log("build resources: copy meta files ...".underline.magenta);

	helper.copyWildCard(Conf.root_files, Conf.src.path, Conf.target.path, err => {
		if (err) {
			console.log("✗ Error: build resources:".underline.maroon, err);
		}
	});

	Conf.image_files.forEach( i => {
		helper.copyWildCard(i, Conf.src.img_path, Conf.target.img_path, err => {
			if (err) {
				console.log("✗ Error: build resources:".underline.maroon, err);
			}
		});
	});
}

function main() {
	const apacheHta = '.htaccess';
	fs.copy(`${Conf.src.path}/${apacheHta}`, `${Conf.target.path}/${apacheHta}`, err => {
		if (err) {
			console.log("✗ Error: copy .htaccess:".underline.maroon, err);
		}
		else {
			console.log(`copied file: ${apacheHta}`);
		}
	});
	copyResources();
}

main();