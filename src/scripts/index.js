"use strict";

import React from 'react';

let pkg = require("../../package.json");
import Conf from '../../tool/base.config';

import Head from './components/Head';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const Root = () => {
	let pageTitle = `Welcome to ${pkg.name} v${pkg.version}`;
	return (
		<html className="no-js" lang="en">
			<Head title={pageTitle} description={pkg.description} styles={Conf.styles} scripts={Conf.scripts}/>

			<body className='page-index container-fluid top-container'>
			<Header title={pageTitle} />
			<Main>
				<div className="row">
					<aside className="col-md-2 hidden-sm hidden-xs">
						<p>left side content</p>
					</aside>
					<section className="col-md-8">
						<p>Main content</p>
					</section>
					<aside className="col-md-2 hidden-sm hidden-xs">
						<p>right side content</p>
					</aside>
				</div>
			</Main>
			<Footer />
			</body>
		</html>
	);
};

export default Root;

