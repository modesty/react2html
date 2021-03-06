import path from 'path';
import indexProps from '../index';

const baseDir = path.resolve(__dirname, "..");
const rel = path.relative(__dirname, baseDir);

const { chrome, page } = indexProps;
const { links: preLinks, scripts, styles} = chrome;

const links = Object.keys(preLinks).reduce((ret, key) => {
    ret[key] = path.join(rel, preLinks[key]);
    return ret;
}, {});

export default {
    chrome: {
        ...chrome, rel, links,
        styles: styles.map(s => path.join(rel, s)),
        scripts: scripts.map(s => path.join(rel, s)),
        title: "About", description: "About Modesty Zhang"
    },
    page: {
        ...page,
        date: new Date(2019, 8, 2, 0, 0, 0)
    }
}