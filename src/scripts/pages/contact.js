"use strict";
import React from 'react';

let pkg = require("../../../package.json");
import Conf from '../../../tool/base.config';

import Head from '../components/Head';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

const Contact = () => {
	let pageTitle = `Contact Us`;
	return (
		<html className="no-js" lang="en">
		<Head title={pageTitle} description={pkg.description} styles={Conf.styles} scripts={Conf.scripts} rel="../"/>

		<body className='container-fluid'>
		<Header title={pageTitle} rel="../"/>
		<Main>
			<h1>React2Html</h1>
			<p>email the author: <a href="mailto:modestyz@hotmail.com?subject=About%20CoeProject%20Article">modestyz@hotmail.com</a></p>
		</Main>
		<Footer rel="../"/>
		</body>
		</html>
	);
};

export default Contact;