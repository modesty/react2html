"use strict";

import React from 'react';

import processRelPath from '../model/head';

const Head = ({title, description, styles, scripts, rel}) => {
	let { touchHref, styleLinks, scriptLinks } = processRelPath(rel, styles, scripts);
	return (
		<head>
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link rel="apple-touch-icon" href={touchHref} />

			{styleLinks.map( (s, i) => <link rel="stylesheet" href={s} key={i} /> )}
			{scriptLinks.map( (s, i) => <script async src={s} key={i} /> )}
		</head>
	);
};

export default Head;