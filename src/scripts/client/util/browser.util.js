'use strict';

/*global ga*/
/*eslint no-undef: "error"*/

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

function trackEvent(evtCategory, evtAction, evtLabel, evtValue) {
	if (typeof(ga) === "function") {
		ga('send', {
			hitType: 'event',
			eventCategory: evtCategory || 'unknown',
			eventAction: evtAction || 'click',
			eventLabel: evtLabel,
			eventValue: evtValue
		});
	}
}

module.exports = {
	getQueryStringParamByName,
	trackEvent
};
