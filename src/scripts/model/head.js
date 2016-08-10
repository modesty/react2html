"use strict";

export default function processRelPath(rel, styles, scripts) {
	let relPath = rel ? rel : "";
	let touchHref = relPath + "apple-touch-icon.png";

	if (!rel) {
		return {touchHref, styleLinks: styles, scriptLinks: scripts};
	}

	let styleLinks = styles.map( s => {
		return (s.indexOf('styles/') === 0) ? relPath + s : s;
	});
	let scriptLinks = scripts.map( s => {
		return (s.indexOf('scripts/') === 0) ? relPath + s : s;
	});

	return {touchHref, styleLinks, scriptLinks};
}
