"use strict";

import React from 'react';

let pkg = require("../../../package.json");
import Conf from '../../../tool/base.config';

import Head from '../components/Head';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

class About extends React.Component {
	render() {
		let pageTitle = `About Us`;
		return (
			<html className="no-js" lang="en">
			<Head title={pageTitle} description={pkg.description} styles={Conf.styles} scripts={Conf.scripts} rel="../"/>

			<body className='page-about container-fluid top-container'>
			<Header title={pageTitle} rel="../"/>
			<Main>
				<p>This is About us Page</p>
			</Main>
			<Footer rel="../"/>
			</body>
			</html>
		)
	}
}

export default About;

