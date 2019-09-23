import Conf from './base.config';
import helper from './build.transform';

function transformDefaultPage() {
	helper.transformOnePage('index.js', null, Conf.src.js_path, Conf.target.path);
}

function main() {
	transformDefaultPage();
	// helper.transformLinkedPages();
}

main();