"use strict";

import React from 'react';

function processRelPath(rel, issueNum, ImgName, supplement) {
	let relPath = rel ? rel : "";
	let supplPath = supplement ? supplement : '.';
	let issuePath = issueNum ? issueNum : ".";

	return `${relPath}images/${supplPath}/${issuePath}/${ImgName}`;
}

const Illustration = ({rel, issueNum, ImgName, style, caption, supplement}) => {
	let src = processRelPath(rel, issueNum, ImgName, supplement);
	let classNames = '';
	let imgClassNames = 'img-responsive';
	switch (style) {
		case 'center':
			imgClassNames += ' center-block img-center';
			break;
		case 'left':
			classNames += ' illustration-left';
			break;
		case 'right':
			classNames += ' illustration-right';
			break;
		default: break;
	}

	return (
		<span className={classNames}>
			<img src={src} className={imgClassNames} alt={caption} />
			<span className="illustration-caption">{caption}</span>
		</span>
	);
};

export default Illustration;