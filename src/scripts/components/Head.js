import React from 'react';

const Head = ({ title, description, links, styles, scripts }) => {
	return (
		<head>
			<meta charSet="utf-8" />		
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			{Object.entries(links).map((entry, i) => <link key={i} rel={entry[0]} href={entry[1]} />)}
			{styles.map( (s, i) => <link rel="stylesheet" href={s} key={i} /> )}
			{scripts.map((s, i) => <script src={s} key={i} />)}

			<meta name="theme-color" content="#fafafa" />
		</head>
	);
};

export default Head;