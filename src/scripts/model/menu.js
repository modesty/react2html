"use strict";

const MenuModel = [
	{name: 'Home', href: "."},
	{name: 'Portfolio', href: "#", children: [
		{name: "Products", href: "#"},
		{name: "Services", href: "#"}
	]},
	{name: 'Team', href: "#", children: [
		{name: "Creative Team", href: "#"},
		{name: "Technical Team", href: "#"},
		{name: "Subject Domain Expert", href: "#"}
	]},
	{name: 'Testimonial', href: "#", children: [
		{name: "Partners", href: "#"},
		{name: "Customers", href: "#"}
	]},
	{name: 'Support', href: "#", children: [
		{name: "Contact Us", href: "#"},
		{name: "Schedule a Visit", href: "#"}
	]},
	{name: 'About Us', href: "./about/"},
	{name: 'Contact Us', href: "./contact/"}
];

export default function processRelPath(rel) {
	let relPath = rel ? rel : "";

	function transformChildren(children) {
		if (!children || !Array.isArray(children)) {
			return undefined;
		}

		return children.map( m => {
			return {...m, href: relPath + m.href, children: transformChildren(m.children)};
		});
	}

	return MenuModel.map( m => {
		return {...m, href: relPath + m.href, children: transformChildren(m.children)};
	});
}