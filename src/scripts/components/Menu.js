"use strict";

import React from 'react';

import processRelPath from '../model/menu';

function renderMenuItems(model) {
	return model.map( (m, idx) => {
		let itemStyle = m.children ? "dropdown" : "";
		let anchorStyle = m.children ? "dropdown-toggle" : "";
		let toggleTarget = m.children ? "dropdown" : null;
		let caretEle = m.children ? (<b className="caret"></b>) : null;
		return (
			<li key={m.name + idx} className={itemStyle} >
				<a href={m.href} className={anchorStyle} data-toggle={toggleTarget}>{m.name} {caretEle}</a>
				{renderSubMenuItem(m)}
			</li>
		);
	});
}

function renderSubMenuItem(model) {
	let subItem = null;
	if (model.children) {
		subItem = (
			<ul className="dropdown-menu">
				{renderMenuItems(model.children)}
			</ul>
		);
	}
	return subItem;
}

const Menu = ({rel}) => {
	let dataModel = processRelPath(rel);
	let menuItems = renderMenuItems(dataModel);
	return (
		<div className="navbar navbar-default" role="navigation">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			</div>
			<div className="navbar-collapse collapse">
				<ul className="nav navbar-nav">
					{menuItems}
				</ul>
			</div>
		</div>
	);
};

export default Menu;