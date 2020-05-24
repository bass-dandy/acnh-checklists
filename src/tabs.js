const React = require('react');
const List = require('./list');
const data = require('./data');

function nameToId(name) {
	return name
		.toLowerCase()
		.replace(/ /g, '_')
		.replace(/-/g, '_')
		.replace(/é/g, 'e')
		.replace(/&/g, 'n')
		.replace(/\./g, '')
		.replace(/\(/g, '')
		.replace(/\)/g, '')
		.replace(/'/g, '');
};

function getListData(jsonData, ...additionalKeys) {
	const listData = {};

	jsonData.forEach((item) => {
		if (!item.name) {
			throw new Error('JSON data missing [name] field');
		}
		listData[nameToId(item.name)] = {
			name: item.name,
			...additionalKeys.reduce((acc, key) => {
				acc[key] = item[key];
				return acc;
			}, {})
		};
	});

	return listData;
}

function PriceTag({price}) {
	return (
		<div className="price-tag">
			{price.toLocaleString()}
		</div>
	);
}

exports.Fish = function Fish(props) {
	return (
		<List
			id="fish"
			items={getListData(data.fish, 'price')}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Bugs = function Bugs(props) {
	return (
		<List
			id="bugs"
			items={getListData(data.bugs, 'price')}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Fossils = function Fossils(props) {
	return (
		<List
			id="fossils"
			items={getListData(data.fossils, 'price')}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Art = function Art(props) {
	return (
		<List
			id="art"
			items={getListData(data.art)}
		/>
	);
};

exports.Songs = function Songs(props) {
	return (
		<List
			id="songs"
			items={getListData(data.songs, 'conditions')}
			renderDetails={(item) => item.conditions}
		/>
	);
};

exports.Flowers = function Flowers(props) {
	return (
		<List
			id="flowers"
			items={getListData(data.flowers, 'conditions')}
			renderDetails={(item) => item.conditions}
		/>
	);
};
