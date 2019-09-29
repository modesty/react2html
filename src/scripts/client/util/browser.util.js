/*global ga*/
/*eslint no-undef: "error"*/

function createScriptTag(src = null, scriptBody = "") {
	if (!src && !scriptBody)
		return;
	
	const s = document.createElement('script');
	s.async = true;
	
	if (!!src)
		s.src = src;
	else if (!!scriptBody)
		s.innerHTML = scriptBody;
    document.body.appendChild(s);
}

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

function createGAScript() {
	const gaKey = document.body.dataset.track;
	if (gaKey) {
		createScriptTag('https://www.google-analytics.com/analytics.js');
		createScriptTag(null, `window.ga = function () { ga.q.push(arguments) }; ga.q = []; ga.l = +new Date;
			ga('create', '${gaKey}', 'auto'); ga('set','transport','beacon'); ga('send', 'pageview');`);
	}
}

module.exports = {
	getQueryStringParamByName,
	trackEvent,
	createGAScript
};
//