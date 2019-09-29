import React from 'react';

import Main from '../components/Main';

const Contact = ({chrome, page}) => {
	return (
		<Main chrome={chrome} page={page} >
			<>
			<h1>Contact Me</h1>
			<p>email the author: <a href="mailto:modestyz@hotmail.com?subject=About%20CoeProject%20Article">modestyz@hotmail.com</a></p>
			</>	
		</Main>
	);
};

export default Contact;