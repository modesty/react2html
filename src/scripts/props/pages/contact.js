import path from 'path';
import indexProps from '../index';

const baseDir = path.resolve(__dirname, "..");
const rel = path.relative(__dirname, baseDir);

const links = Object.keys(indexProps.links).reduce((ret, key) => {
    ret[key] = path.join(rel, indexProps.links[key]);
    return ret;
}, {});

const scripts = indexProps.scripts.map(s => path.join(rel, s));
const styles = indexProps.styles.map(s => path.join(rel, s));

export default {
    ...indexProps, rel, links, styles, scripts,
    title: "Contact", description: "Contact Modesty Zhang"
};