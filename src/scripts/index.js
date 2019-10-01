import React from 'react';

import Main from './components/Main';

const Root = ({chrome, page}) => {
	return (
		<Main chrome={chrome} page={page} >
			<div>
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
	);
};

export default Root;

