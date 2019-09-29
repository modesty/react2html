import React from 'react';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Main = props => {
	const { chrome, page, children } = props;
	const { rel, gaKey, title } = chrome;
	return (
		<html className="no-js" lang="en">
			<Head {...chrome} />
			<body data-track={gaKey} className='container'>
				<Header title={title} rel={rel}/>
				<main className='container'>
					{React.cloneElement(children, page)}
				</main>
				<Footer rel={rel}/>
			</body>
		</html>
	);
}

export default Main;

