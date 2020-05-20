#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const argv = require('yargs').argv;
const html = require('./src/app');

if (!argv['out-dir']) {
	throw new Error('usage: build-songs --out-dir <dirname>');
}

const outputPath = `${process.cwd()}/${argv['out-dir']}/index.html`;

fs.writeFile(outputPath, html, (err) => console.log(err));
