import React from 'react';

import Head from '../components/Head';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

const About = ({title,description,links, scripts,styles,rel, gaKey}) => {
	return (
		<html className="no-js" lang="en">
			<Head title={title} description={description} links={links} scripts={scripts} styles={styles} rel={rel} />
			<body data-track={gaKey} className='container'>
				<Header title={title} rel={rel} />
				<Main>
					<h1>About React2Html</h1>
					<p>More details can be found at <a href="https://github.com/modesty/react2html"> GitHub </a></p>
				</Main>
				<Footer rel={rel} />
			</body>
		</html>
	);
};

export default About;
