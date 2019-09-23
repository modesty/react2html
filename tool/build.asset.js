import fs from 'fs-extra';

import Conf from './base.config';
import helper from './base.copier';

function copyOneFile(fileName) {
	const job = `build resources: copy ${fileName}`;
	console.log(`☯︎ start ${job} ...`);
	fs.copy(`${Conf.src.path}/${fileName}`, `${Conf.target.path}/${fileName}`, err => {
		console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job}`);
	});
}

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

function copyVendorAsset() {
	const job = "build resources: copy vendor files";
	console.log(`☯︎ start ${job} ...`);

	helper.copyWildCard('**/*.css', Conf.src.vendor_css, Conf.target.css_path, err => {
		console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job}`);
	});

	helper.copyWildCard('**/*.js', Conf.src.vendor_js, Conf.target.js_path, err => {
		console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job}`);
	});
}

function main() {
	copyOneFile('.htaccess');
	copyMetaFiles();
	copyResources();
	copyVendorAsset();
}

main();