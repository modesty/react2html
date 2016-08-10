"use strict";

import colors from 'colors';

import Conf from './base.config';
import helper from './base.helper';

function copyResources() {
	console.log("build resources: copy meta files ...".underline.magenta);

	helper.copyWildCard(Conf.root_files, Conf.src.path, Conf.target.path, err => {
		if (err) {
			console.log("Error: build resources:".underline.maroon, err);
		}
	});

	Conf.image_files.forEach( i => {
		helper.copyWildCard(i, Conf.src.img_path, Conf.target.img_path, err => {
			if (err) {
				console.log("build resources: error:".underline.maroon);
				console.log(err);
			}
		});
	});
}

function main() {
	copyResources();
}

main();