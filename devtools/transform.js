const fs = require('fs');
const {nameToId} = require('./util');
const data = require('../src/data');

Object.keys(data).forEach((key) => {
	const listData = {};

	data[key].forEach((item) => {
		if (!item.name) {
			throw new Error('JSON data missing [name] field');
		}
		listData[nameToId(item.name)] = item;
	});

	fs.writeFile(`./${key}.json`, JSON.stringify(listData, null, '\t'), console.log);
});
