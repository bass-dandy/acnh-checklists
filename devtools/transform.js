const fs = require('fs');
const data = require('../src/data');
const util = require('./util');

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function titleCase(str) {
	return str
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function formatDisplayMonths(displayMonths) {
	 return displayMonths.toLowerCase() === 'year-round' ? ['all year'] : displayMonths
		.split(',')
		.map((range) => {
			return range.trim().split('-').map((month) => month.substring(0, 3)).join(' - ');
		});
}

function getActiveMonths(displayMonths) {
	if (displayMonths[0] === 'all year') {
		return null;
	}
	const activeMonths = [];
	displayMonths.forEach((range) => {
		const [start, end] = range.split(' - ');

		let idx = months.indexOf(start);
		while (months[idx] !== end) {
			activeMonths.push(months[idx]);
			idx = (idx + 1) % months.length;
		}
		activeMonths.push(end);
	});
	return activeMonths;
}

const creatureNames = Object.keys(data.seaCreatures).sort();
const jsonData = {};

creatureNames.forEach((name) => {
	const src = data.seaCreatures[name];
	const id = util.nameToId(name);

	jsonData[id] = {
		name: titleCase(name),
		price: parseInt(src.price.replace(',', '')),
		time: src.time.toLowerCase() === 'all day' ? ['All day'] : src.time
			.replace(/ /g, '')
			.replace(/a.m./g, ' AM')
			.replace(/p.m./g, ' PM')
			.replace(/-/g, ' - ')
			.split(',')
	};

	const seasons = src.month.split('/').map((season) => season.toLowerCase().trim());

	seasons.forEach((season) => {
		if (season.includes('(northern)')) {
			jsonData[id].nSeasonality = {
				displayMonths: season.replace('(northern)', '').trim()
			};
		} else if (season.includes('(southern)')) {
			jsonData[id].sSeasonality = {
				displayMonths: season.replace('(southern)', '').trim()
			};
		} else if (season.includes('(northern and southern)')) {
			jsonData[id].nSeasonality = {
				displayMonths: season.replace('(northern and southern)', '').trim()
			};
			jsonData[id].sSeasonality = {
				displayMonths: season.replace('(northern and southern)', '').trim()
			};
		}
	});

	jsonData[id].nSeasonality.displayMonths = formatDisplayMonths(jsonData[id].nSeasonality.displayMonths);
	jsonData[id].sSeasonality.displayMonths = formatDisplayMonths(jsonData[id].sSeasonality.displayMonths);

	jsonData[id].nSeasonality.activeMonths = getActiveMonths(jsonData[id].nSeasonality.displayMonths);
	jsonData[id].sSeasonality.activeMonths = getActiveMonths(jsonData[id].sSeasonality.displayMonths);
});

fs.writeFile('./sea-creatures.json', JSON.stringify(jsonData, null, '\t'), console.log);
