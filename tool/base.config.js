import path from 'path';
import moment from 'moment';

const pkg = require("../package.json");
const APP_NAME = pkg.name;
const CUR_DIR = path.normalize(__dirname + "/..");

const SRC_BASE = "/src";
const TAR_BASE = "/target";

const TIME_STAMP = moment().utc().format('YYYYMMDDHHmmss');
const CSS_BUNDLE_NAME = APP_NAME + "-bundle.css";
const JS_BUNDLE_NAME = APP_NAME + "-bundle.js";

const Config = {
	CUR_DIR,
	APP_NAME,
	SRC_BASE,
	TAR_BASE,
	src: {
		path: CUR_DIR + SRC_BASE,
		js_path: CUR_DIR + SRC_BASE + "/scripts",
		js_entry: CUR_DIR + SRC_BASE + "/scripts/main.js",
		sass_path: CUR_DIR + SRC_BASE + "/styles",
		img_path: CUR_DIR + SRC_BASE + "/images"
	},
	target: {
		path: CUR_DIR + TAR_BASE,
		js_bundle: JS_BUNDLE_NAME,
		css_bundle: "../styles/" + CSS_BUNDLE_NAME,
		js_path: CUR_DIR + TAR_BASE + "/scripts",
		css_path: CUR_DIR + TAR_BASE + "/styles",
		img_path: CUR_DIR + TAR_BASE + "/images"
	},
	CUR_VER: pkg.version,
	NXT_VER: `${pkg.version}-${TIME_STAMP}`,
	root_files: "*(*.png|*.xml|*.ico|*.txt)",
	//image_files: "*(*.jp*g|*.png|*.gif|*.svg)",
	image_files: ['**/*.jp*g', '**/*.png', '**/*.gif', '**/*.svg'],
	scripts: [
		'//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js',
		'//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
		'scripts/' + JS_BUNDLE_NAME + "?ver=" + pkg.version
	],
	styles: [
		'//cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css',
		'//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
		'//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
		'//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css',
		'styles/' + CSS_BUNDLE_NAME + "?ver=" + pkg.version
	]
};

export default Config;