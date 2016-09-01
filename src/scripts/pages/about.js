"use strict";
import React from 'react';

let pkg = require("../../../package.json");
import Conf from '../../../tool/base.config';

import Head from '../components/Head';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

const About = () => {
	let pageTitle = `About Us`;
	return (
		<html className="no-js" lang="en">
		<Head title={pageTitle} description={pkg.description} styles={Conf.styles} scripts={Conf.scripts} rel="../"/>

		<body className='page-about container-fluid top-container'>
		<Header title={pageTitle} rel="../"/>
		<Main>
			<h1>About React2Html</h1>
			<p>More details can be found at <a href="https://github.com/modesty/react2html"> GitHub </a></p>
		</Main>
		<Footer rel="../"/>
		</body>
		</html>
	);
};

export default About;
