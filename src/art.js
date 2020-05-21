const React = require('react');
const List = require('./list');
const util = require('./util');

const artNames = ['Academic Painting','Amazing Painting','Ancient Statue','Basic Painting','Beautiful Statue','Calm Painting','Common Painting','Detailed Painting','Dynamic Painting','Familiar Statue','Famous Painting','Flowery Painting','Gallant Statue','Glowing Painting','Graceful Painting','Great Statue','Informative Statue','Jolly Painting','Moody Painting','Motherly Statue','Moving Painting','Mysterious Painting','Mystic Statue','Nice Painting','Perfect Painting','Proper Painting','Quaint Painting','Robust Statue','Rock-head Statue','Scary Painting','Scenic Painting','Serene Painting','Sinking Painting','Solemn Painting','Tremendous Statue','Twinkling Painting','Valiant Statue','Warm Painting','Warrior Statue','Wild Painting Left Half','Wild Painting Right Half','Wistful Painting','Worthy Painting'];

const art = artNames.map((name) => ({
	id: util.labelToId(name),
	label: name
}));

module.exports = function Fossils(props) {
	return (
		<List
			id="art"
			items={art}
			title="Art"
		/>
	);
};
