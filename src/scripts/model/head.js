"use strict";

export default function processRelPath(rel = "", styles, scripts) {
	const touchHref = rel + "apple-touch-icon.png";
	const webMan = rel + "site.webmanifest";

	if (!rel) {
		return {touchHref, webMan, styleLinks: styles, scriptLinks: scripts};
	}

	const styleLinks = styles.map(s => `${rel}css/${s}` );
	const scriptLinks = scripts.map( s => `${rel}js/${s}`);

	return {touchHref, webMan, styleLinks, scriptLinks};
}
