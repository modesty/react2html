import React from 'react';

import Head from './Head';
import Header from './Header';
import Footer from './Footer';

const Main = props => {
	const { chrome, page, children } = props;
	const { rel, gaKey, title } = chrome;
	return (
		<html>
			<Head {...chrome} />
			<body data-track={gaKey}>
				<article className='container'>
					<Header title={title} page={page} rel={rel}/>
					<main className='container'>
						{React.cloneElement(children, page)}
					</main>
				</article>
				<Footer rel={rel}/>
			</body>
		</html>
	);
}

export default Main;

