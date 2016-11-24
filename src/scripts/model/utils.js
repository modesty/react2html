"use strict";
import path from 'path';
import React from 'react';
import Illustration from '../components/Illustration';

export function coverModel(issueNumber) {
	let {year, month} = yearMonth(issueNumber);

	let albumNum = year == 2016 ? "十六" : "十七";
	let totalIssueNum = year == 2016 ? 171 + month : 182 + month;

	return {
		title: "本期封面",
		src: `${issueNumber}/cover.jpg`,
		href: `./${issueNumber}/`,
		caption: `${year}年${month}月，第${albumNum}卷，總第${totalIssueNum}期`
	};
}

export function yearMonth(issueNumber) {
	let issueNumStr = String(issueNumber);
	let year = parseInt(issueNumStr.slice(0, 4), 10);
	let month = parseInt(issueNumStr.slice(4), 10);

	return {year, month};
}

export function pubTimeStr(issueNumber) {
	let {year, month} = yearMonth(issueNumber);
	return `${year}-${month}-01`;
}

export function parentDirName(currentDir) {
	let _dir_parts = path.normalize(currentDir).split("/");
	return _dir_parts[_dir_parts.length-1];
}

export function currentFileName(fileName) {
	return path.basename(fileName, '.js');
}

export function renderPostImg(postName, imgIdx) {
	return renderArticleImg("post", postName, imgIdx);
}

export function renderArticleImg(issueNum, articleName, imgIdx) {
	let idxStr = imgIdx < 10 ? "0" + imgIdx : String(imgIdx);
	idxStr += '.jpg';
	let position = imgIdx % 2 === 0 ? "right" : "left";
	return (
		<Illustration rel="../../" supplement={issueNum}
			issueNum={articleName} ImgName={idxStr} style={position} />
	);
}

