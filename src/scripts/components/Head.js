import React from 'react';

import processRelPath from '../model/head';

const Head = ({title, description, styles, scripts, rel}) => {
	const { touchHref, webMan, styleLinks, scriptLinks } = processRelPath(rel, styles, scripts);
	return (
		<head>
			<meta charSet="utf-8" />		
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link rel="manifest" href={webMan} />
			<link rel="apple-touch-icon" href={touchHref} />

			{styleLinks.map( (s, i) => <link rel="stylesheet" href={s} key={i} /> )}
			{scriptLinks.map((s, i) => <script src={s} key={i} />)}
			<meta name="theme-color" content="#fafafa" />
		</head>
	);
};

export default Head;