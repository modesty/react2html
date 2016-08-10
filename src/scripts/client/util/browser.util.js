'use strict';

function getQueryStringParamByName(name, url) {
	if (!url)
		url = window.location.href;
	let nName = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp("[?&]" + nName + "(=([^&#]*)|&|#|$)", "i");

	let	results = regex.exec(url);
	if (!results)
		return null;
	if (!results[2])
		return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


module.exports = {
	getQueryStringParamByName
};
