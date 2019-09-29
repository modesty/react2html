import React from 'react';

import Main from '../components/Main';

const About = ({chrome, page}) => {
	return (
		<Main chrome={chrome} page={page} >
			<>
			<h1>About React2Html</h1>
			<p>More details can be found at <a href="https://github.com/modesty/react2html"> GitHub </a></p>
			</>	
		</Main>
	);
};

export default About;
