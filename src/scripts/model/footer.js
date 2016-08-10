"use strict";

const FooterModel = {
	siteLinks: [
		{name: "About", href: "./about"},
		{name: "Legal", href: "#"},
		{name: "Privacy", href: "#"},
		{name: "Contact", href: "#"}
	],
	socials:[
		{id: "icon-facebook", href: "http://facebook.com"},
		{id: "icon-twitter", href: "http://twitter.com"},
		{id: "icon-youtube", href: "http://youtube.com"},
		{id: "icon-linkedin", href: "http://linkedin.com"},
		{id: "icon-dribbble", href: "http://dribbble.com"},
		{id: "icon-rss", href: "http://rss.com"}
	],
	copyRight: "Modesty Zhang © 2015 - 2016",
	addressLine1: "7330 Clairemont Mesa Blvd,",
	addressLine2: "San Diego, CA 92111",
	phone: "+1-111-222-3333",
	email: "modestyz@hotmail.com"
};

export default function processRelPath(rel) {
	let relPath = rel ? rel : "";

	let siteLinks = FooterModel.siteLinks.map( l => {
		return {...l, href: relPath + l.href};
	});

	return {...FooterModel, siteLinks: siteLinks};
}