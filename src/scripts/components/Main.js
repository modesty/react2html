"use strict";

import React from 'react';

class Main extends React.Component {
	render() {
		return (
			<main className=''>
				{this.props.children}
			</main>
		);
	}
}

export default Main;

