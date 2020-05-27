const fs = require('fs');
const data = require('../src/data');

function transformTime(time) {
	return time.split(', ');
}

['fish', 'bugs'].forEach((key) => {
	const listData = {...data[key]};

	Object.keys(data[key]).forEach((prop) => {
		const item = data[key][prop];

		if (!item.name) {
			throw new Error('JSON data missing [name] field');
		}
		listData[prop].location = item.location.toLowerCase();
	});

	fs.writeFile(`./${key}.json`, JSON.stringify(listData, null, '\t'), console.log);
});
