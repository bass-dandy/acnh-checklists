#!/usr/bin/env node
require('@babel/register');
const fs = require('fs');
const argv = require('yargs').argv;
const ReactDOM = require('react-dom/server');
const React = require('react');
const App = require('./src/app');

if (!argv['out-dir']) {
	throw new Error('usage: build-songs --out-dir <dirname>');
}

const outputPath = `${process.cwd()}/${argv['out-dir']}/index.html`;

const html = '<!doctype html>' + ReactDOM.renderToStaticMarkup(
	React.createElement(App)
);

fs.writeFile(outputPath, html, (err) => console.log(err));
