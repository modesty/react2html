// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.

import webpack from 'webpack';
import Conf from './base.config';
import webpackConfigBuilder from './webpack.config';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

const statsOptions = {
	hash: true,
	version: true,
	timings: true,
	assets: true,
	chunks: false,
	chunkModules: false,
	modules: false,
	children: false,
	cached: false,
	reasons: false,
	source: false,
	errorDetails: true,
	chunkOrigins: false
};

let _post_compile_func = null;

function compilerCallback(err, stats) {
	if (err) { // so a fatal error occurred. Stop here.
		console.log(`\n--- Webpack - ${Conf.TAR_BASE} - error: ${err}`);
		return 1;
	}

	const jsonStats = stats.toJson(statsOptions);

	if (jsonStats.errors.length > 0) {
		console.log(`✗ Error: Webpack - v${jsonStats.version} :`);
		jsonStats.errors.map(error => console.log(error));
		return 2;
	}

	if (jsonStats.warnings.length > 0) {
		console.log(`⚕︎ Warning: Webpack - v${jsonStats.version} :`);
		jsonStats.warnings.map(warning => console.log(warning));
	}

	console.log(`\nWebpack v${jsonStats.version} - ${jsonStats.hash} - ${jsonStats.time}ms\n`);
	jsonStats.assets.map( a => console.log(`${a.name}\t\tsize:${a.size}\tstatus:${a.emitted ? 'ok': 'error'}`));

	// if we got this far, the build succeeded.
	console.log(`\nSuccess: Webpack v${jsonStats.version} - ${Conf.TAR_BASE} - success`);
	console.log("process.env.NODE_ENV", process.env.NODE_ENV);

	if ( typeof(_post_compile_func) === 'function' ) {
		_post_compile_func();
		_post_compile_func = null; //only run once
	}
	return 0;
}

function compileOnce() {
	console.log('\n=== Generating minified bundle ...\n');
	const webpackConfig = webpackConfigBuilder('production');
	webpack(webpackConfig).run(compilerCallback);
}

function watchCompile(callback) {
	console.log('\n=== Watching and generating minified bundle ...');
	_post_compile_func = callback;
	const webpackConfigWatch = webpackConfigBuilder('development');
	webpack(webpackConfigWatch).watch({aggregateTimeout: 300, poll: true}, compilerCallback);
}

export default {
	compileOnce: compileOnce,
	watchCompile: watchCompile
};
