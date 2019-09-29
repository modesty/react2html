import React from 'react';

import Head from './components/Head';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const Root = ({title,description,links,scripts,styles,rel, gaKey}) => {
	return (
		<html className="no-js" lang="en">
			<Head title={title} description={description} links={links} scripts={scripts} styles={styles} rel={rel} />
			<body data-track={gaKey} className='container'>
				<Header title={title} />
				<Main>
					<div className="row">
						<aside>
							<p>Left Side</p>
						</aside>
						<section>
							<p>Main content</p>
						</section>
						<aside>
							<p>right side</p>
						</aside>
					</div>
				</Main>
				<Footer />
			</body>
		</html>
	);
};

export default Root;

