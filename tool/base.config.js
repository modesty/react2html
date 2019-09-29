import path from 'path';
const pkg = require("../package.json");

const APP_NAME = pkg.name;
const CUR_DIR = path.resolve(__dirname, "..");

const SRC_BASE = "src";
const TAR_BASE = "target";
const VEN_BASE = "vendor";

const CSS_BUNDLE_NAME = APP_NAME + "-bundle.min.css";
const JS_BUNDLE_NAME = APP_NAME + "-bundle.min.js";

const Config = {
	CUR_VER: pkg.version,
	CUR_DIR,
	TRACK_ID: "UA-xxx-1111",
	APP_NAME,
	src: {
		path: 		path.join(CUR_DIR, SRC_BASE),
		js_path: 	path.join(CUR_DIR, SRC_BASE, "scripts"),
		js_entry: 	path.join(CUR_DIR, SRC_BASE, "scripts", "client", "main.js"),
		sass_path: 	path.join(CUR_DIR, SRC_BASE, "styles"),
		img_path: 	path.join(CUR_DIR, SRC_BASE, "images"),
		vendor_css: path.join(CUR_DIR, VEN_BASE, "css"),
		vendor_js:  path.join(CUR_DIR, VEN_BASE, "js")
	},
	target: {
		path: 	  path.join(CUR_DIR, TAR_BASE),
		js_path:  path.join(CUR_DIR, TAR_BASE, "js"),
		css_path: path.join(CUR_DIR, TAR_BASE, "css"),
		img_path: path.join(CUR_DIR, TAR_BASE, "img"),
		js_bundle: JS_BUNDLE_NAME,
		css_bundle: `..${path.sep}css${path.sep}${CSS_BUNDLE_NAME}`
	},
	root_files: "*(*.png|*.xml|*.ico|*.txt|*.html|.htaccess|site.webmanifest)",
	image_files: ['**/*.jp*g', '**/*.png', '**/*.gif', '**/*.svg']
};

export default Config;