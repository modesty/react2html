import Conf from './base.config';
import helper from './build.transform';

function main() {
	helper.transformOnePage('index.js', './props/index.js', Conf.src.js_path, Conf.target.path);
	helper.transformLinkedPages('pages', 'props', Conf.src.js_path, Conf.target.path);
}

main();