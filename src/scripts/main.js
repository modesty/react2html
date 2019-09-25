import '../styles/main.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

import {createGAScript} from './client/util/browser.util';

window.document.onload = function () {
	createGAScript();
};
