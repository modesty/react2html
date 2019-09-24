import React from 'react';

import Head from './components/Head';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import indexModel from './model/index';

const Root = () => {
	return (
		<html className="no-js" lang="en">
			<Head {...indexModel} />

			<body className='container'>
			<Header title={indexModel.title} />
			<Main>
				<div className="row">
					<aside>
						<p>left side</p>
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

