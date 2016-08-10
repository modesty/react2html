"use strict";

import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import Conf from './base.config';

const ENVs = {dev: 'development', prd: 'production', test: 'test'};

const getPlugins = function(env) {
	const GLOBALS = {
		'process.env.NODE_ENV': env,
		__DEV__: env === ENVs.dev
	};

	const plugins = [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin(GLOBALS), //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
		new ExtractTextPlugin(Conf.target.css_bundle),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	];

	return plugins;
};

const getLoaders = function(env) {
	const loaders = [
		{test: /\.js$/, include: Conf.src.js_path, loaders: ['babel', 'eslint']},
		{test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap")}
	];

	return loaders;
};

function getConfig(env) {
	return {
		debug: false,
		cache: true,
		devtool: env === ENVs.prd ? 'source-map' : 'eval', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
		noInfo: true, // set to false to see a list of every file being bundled.
		entry: Conf.src.js_entry,
		target: env === ENVs.test ? 'node' : 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
		output: {
			path: Conf.target.js_path, // Note: Physical files are only output by the production build task `npm run build`.
			publicPath: '/',
			filename: Conf.target.js_bundle
		},
		plugins: getPlugins(env),
		module: {
			loaders: getLoaders(env)
		}
	};
}

export default getConfig;
