import path from 'path';
import glob from 'glob';

const pkg = require('../../../package.json');
import Conf from '../../../tool/base.config';

const chrome = {
    title: `Welcome to ${pkg.name} v${pkg.version}`,
    description: pkg.description,
    links: {
        "site.webmanifest": "site.webmanifest",
        "apple-touch-icon": "apple-touch-icon.png"
    },
    scripts: glob.sync('**/*.js', { cwd: Conf.target.js_path }).map(s => path.join("js", s)),
    styles: glob.sync('**/*.css', { cwd: Conf.target.css_path }).map( s => path.join("css", s)),
    rel: '',
    gaKey: Conf.TRACK_ID
}

const page = {
    author: "Modesty",
    date: new Date(2019, 8, 1, 0, 0, 0)
};

export default { chrome, page };