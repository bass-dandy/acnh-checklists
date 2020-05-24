#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const argv = require('yargs').argv;
const html = require('./src/app');
const data = require('./src/data');

if (!argv['out-dir']) {
	throw new Error('usage: build-songs --out-dir <dirname>');
}

let dataFile = '';
Object.keys(data).forEach((key) => {
	const json = JSON.stringify(data[key]).replace(/'/g, "\\'");
	dataFile += `export const ${key} = '${json}';\n`;
});

const path = `${process.cwd()}/${argv['out-dir']}`;

fs.writeFile(`${path}/index.html`, html, console.log);
fs.writeFile(`${path}/data.js`, dataFile, console.log);
