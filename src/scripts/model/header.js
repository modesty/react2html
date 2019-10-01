import path from 'path';

const HeaderModel = {
	homeLink: {name: "Home", href: "./", img: "img/logo_wide.jpg"},
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

export default function processRelPath(rel = "") {
	const { homeLink:preHomeLink } = HeaderModel;
	return {...HeaderModel, homeLink: {...preHomeLink, href: path.join(rel, preHomeLink.href), img: path.join(rel, preHomeLink.img)}};
}