import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import Conf from './base.config';

const ENVs = {dev: 'development', prd: 'production', none: 'none'};

const getPlugins = function(env) {
	const GLOBALS = {
		'process.env.NODE_ENV': env,
		__DEV__: env === ENVs.dev
	};

	const plugins = [		
		new webpack.DefinePlugin(GLOBALS),
		new MiniCssExtractPlugin(Conf.target.css_bundle),
	];

	return plugins;
};

const getLoaders = function(env) {
	const loaders = [
		{test: /\.js$/, include: Conf.src.js_path, loaders: ['babel', 'eslint']},
		{test: /(\.css|\.scss)$/, loader: MiniCssExtractPlugin.loader}
	];

	return loaders;
};

function getConfig(env) {
	return {
		mode: env,
		entry: Conf.src.js_entry,
		output: {
			path: Conf.target.js_path,
			publicPath: '/',
			filename: Conf.target.js_bundle
		},
		devtool: env === ENVs.prd ? 'cheap-module-source-map' : 'eval', 
		target: 'web',
		plugins: getPlugins(env),
		module: {
			loader: getLoaders(env)
		}
	};
}

export default getConfig;
