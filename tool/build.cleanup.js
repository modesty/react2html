import fs from 'fs-extra';

import Conf from './base.config';

function emptyTarget() {
	const job = "empty target directory";
	console.log(`☯︎ start: ${job} ...`);

	fs.emptyDir(Conf.target.path,  err => console.log(err ? `✗ Error: ${job} \n ${err}` : `✓ Success: ${job} \n\n`));
}

function main() {
	emptyTarget();
}

main();