import fs from 'fs-extra';

import Conf from './base.config';
import helper from './base.helper';

function copyMetaFiles() {
	const job = "build resources: copy meta files";
	console.log(`☯︎ start ${job} ...`);

	helper.copyWildCard(Conf.root_files, Conf.src.path, Conf.target.path, err => {
		console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job}`);
	});
}

function copyResources() {
	const job = "build resources: copy image files";
	console.log(`☯︎ start ${job} ...`);

	Conf.image_files.forEach( i => {
		helper.copyWildCard(i, Conf.src.img_path, Conf.target.img_path, err => {
			console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job}`);
		});
	});
}

function main() {
	// const apacheHta = '.htaccess';
	// fs.copy(`${Conf.src.path}/${apacheHta}`, `${Conf.target.path}/${apacheHta}`, err => {
	// 	if (err) {
	// 		console.log("✗ Error: copy .htaccess:".underline.maroon, err);
	// 	}
	// 	else {
	// 		console.log(`copied file: ${apacheHta}`);
	// 	}
	// });
	copyMetaFiles();
	copyResources();
}

main();