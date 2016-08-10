"use strict";

import React from 'react';

import Menu from './Menu';

import processRelPath from '../model/header';

const Header = ({ title, rel }) => {
	let dataModel = processRelPath(rel);
	let {homeLink, bannerLink} = dataModel;

	return (
		<header className='header'>
			<div className="row">
				<div className="col-md-3 col-xs-12 hidden-xs">
					<div className="logo">
						<a href={homeLink.href} title={homeLink.name}>
							<img src={homeLink.img} alt={title} />
						</a>
					</div>
				</div>
				<div className="col-md-6 col-xs-12">
					<div className="banner-area">
						<a href={bannerLink.href}>
							<img src={bannerLink.img} alt={bannerLink.name} className="img-responsive" />
						</a>
					</div>
				</div>
				<div className="col-md-3 hidden-sm hidden-xs">
					<div className="soc-area">
						<div className="icons-social">
							{dataModel.socials.map( s => <a href={s.href} className={s.id} key={s.id}></a>)}
						</div>
					</div>
				</div>
			</div>
			<Menu rel={rel}></Menu>
		</header>
	);
};

export default Header;
