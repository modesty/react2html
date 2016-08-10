"use strict";

import React from 'react';
import processRelPath from "../model/footer";

const Footer = ({rel}) => {
  let model = processRelPath(rel);

  return (
      <footer className='footer-distributed'>
        <div className="footer-left">
          <h3>React<span> 2 HTML</span></h3>
          <p className="footer-links">
            {model.siteLinks.map( l => (<span><a href={l.href}>{l.name}</a> · </span>))}
          </p>
          <p className="footer-company-name">{model.copyRight}</p>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p><span>{model.addressLine1}</span> {model.addressLine2}</p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p><a href={`tel:${model.phone}`}>{model.phone}</a></p>
          </div>

          <div>
            <i className="fa fa-envelope"></i>
            <p><a href={`mailto:${model.email}`}>{model.email}</a></p>
          </div>

        </div>

        <div className="footer-right">

          <div className="icons-social">
            {model.socials.map( s => <a href={s.href} className={s.id} key={s.id}></a>)}
          </div>

        </div>
      </footer>
  );
};

export default Footer;
