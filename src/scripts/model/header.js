"use strict";

const HeaderModel = {
	homeLink: {name: "Home", href: "./", img: "img/logo.png"},
	bannerLink: {name: "Banner Ad", href: "", img: "http://placehold.it/420x60"},
	socials:[
		{id: "icon-facebook", href: "http://facebook.com"},
		{id: "icon-twitter", href: "http://twitter.com"},
		{id: "icon-youtube", href: "http://youtube.com"},
		{id: "icon-linkedin", href: "http://linkedin.com"},
		{id: "icon-dribbble", href: "http://dribbble.com"},
		{id: "icon-rss", href: "http://rss.com"}
	]
};

export default function processRelPath(rel) {
	let relPath = rel ? rel : "";

	let homeLink = HeaderModel.homeLink, bannerLink = HeaderModel.bannerLink;

	homeLink = {...homeLink, href: relPath + homeLink.href, img: relPath + homeLink.img};

	return {...HeaderModel, homeLink: homeLink};
}