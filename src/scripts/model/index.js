const pkg = require('../../../package.json');
import Conf from '../../../tool/base.config';
import glob from 'glob';

export default {
    title: `Welcome to ${pkg.name} v${pkg.version}`,
    description: pkg.description,
    scripts: glob.sync('**/*.js', { cwd: Conf.target.js_path }),
    styles: glob.sync('**/*.css', { cwd: Conf.target.css_path }),
    rel: './'
}