import path from 'path';

const pkg = require("../package.json");
const APP_NAME = pkg.name;
const CUR_DIR = path.normalize(__dirname + "/..");

const SRC_BASE = "/src";
const TAR_BASE = "/target";
const VENDOR_BASE = "/vendor";

const CSS_BUNDLE_NAME = APP_NAME + "-bundle.css";
const JS_BUNDLE_NAME = APP_NAME + "-bundle.js";

const Config = {
	CUR_VER: pkg.version,
	CUR_DIR,
	TRACK_ID: "UA-xxxxxxxx-1",
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
		css_bundle: "../css/" + CSS_BUNDLE_NAME,
		js_path: CUR_DIR + TAR_BASE + "/js",
		css_path: CUR_DIR + TAR_BASE + "/css",
		img_path: CUR_DIR + TAR_BASE + "/img"
	},
	root_files: "*(*.png|*.xml|*.ico|*.txt|*.html|.htaccess|site.webmanifest)",
	image_files: ['**/*.jp*g', '**/*.png', '**/*.gif', '**/*.svg'],
	vendor_css: CUR_DIR + VENDOR_BASE + "/css",
	vendor_js: CUR_DIR + VENDOR_BASE + "/js"
};

export default Config;