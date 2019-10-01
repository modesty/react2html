import React from 'react';

import Menu from './Menu';

import processRelPath from '../model/header';

const Header = ({ title, page, rel = "" }) => {
	const { homeLink, bannerLink, socials } = processRelPath(rel);
	const { author, date } = page;
	return (
		<header className='header'>
			{/* <hgroup>
				<h1>{title}</h1>
				<h2>{author} <span>{date.toLocaleDateString()}</span></h2>
				<div className="logo">
					<a href={homeLink.href} title={homeLink.name}>
						<img src={homeLink.img} alt={title} />
					</a>
				</div>
			</hgroup> */}

			<div className="row">
				<div className="col-md-3 col-xs-12 hidden-xs">
					
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
							{socials.map( s => <a href={s.href} className={s.id} key={s.id}></a>)}
						</div>
					</div>
				</div>
			</div>
			<Menu rel={rel}></Menu>
		</header>
	);
};

export default Header;
