import React from 'react';

import Head from '../components/Head';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

const Contact = ({title,description,scripts,styles,rel, gaKey}) => {
	return (
		<html className="no-js" lang="en">
			<Head title={title} description={description} scripts={scripts} styles={styles} rel={rel} />
			<body data-track={gaKey} className='container'>
				<Header title={title} />
				<Main>
					<h1>React2Html</h1>
					<p>email the author: <a href="mailto:modestyz@hotmail.com?subject=About%20CoeProject%20Article">modestyz@hotmail.com</a></p>
				</Main>
				<Footer rel={rel} />
			</body>
		</html>
	);
};

export default Contact;