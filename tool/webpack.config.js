import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import Conf from './base.config';

const ENVs = {dev: 'development', prd: 'production'};

const getPlugins = function (env) {
	const devMode = env === ENVs.dev;
	const plugins = [
		new MiniCssExtractPlugin({
			filename: Conf.target.css_bundle,
      		chunkFilename: '[id].css',
      		ignoreOrder: false
		}),
	];

	return plugins;
};

function getConfig(env) {
	if (Object.values(ENVs).indexOf(env) < 0)
		return {};
	const devMode = env === ENVs.dev;

	return {
		mode: env,
		entry: Conf.src.js_entry,
		output: {
			path: Conf.target.js_path,
			publicPath: Conf.target.path,
			filename: Conf.target.js_bundle
		},
		devtool: 'source-map',
		target: 'web',
		plugins: getPlugins(env),
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{ loader: "babel-loader" }
					]
				},
				{                
					test: [/\.(css|scss)$/],                
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: devMode
							}
						},						                  
						{
							loader: 'css-loader',
							options: {
                                sourceMap: false
                        	}
						},
						{
							loader: 'sass-loader',
							options: {
                                sourceMap: false
                        	}
						}
					]            
				}
			]
		}
	};
}

export default getConfig;
