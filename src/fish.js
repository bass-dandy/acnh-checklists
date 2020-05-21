const React = require('react');
const List = require('./list');
const util = require('./util');

const fishNames = ['Anchovy','Angelfish','Arapaima','Arowana','Barred knifejaw','Barreleye','Betta','Bitterling','Black bass','Blowfish','Blue marlin','Bluegill','Butterfly fish','Carp','Catfish','Char','Cherry salmon','Clown fish','Coelacanth','Crawfish','Crucian carp','Dab','Dace','Dorado','Football fish','Freshwater goby','Frog','Gar','Giant snakehead','Giant trevally','Golden trout','Goldfish','Great white shark','Guppy','Hammerhead shark','Horse mackerel','Killifish','King salmon','Koi','Loach','Mahi-mahi','Mitten crab','Moray eel','Napoleonfish','Neon tetra','Nibble fish','Oarfish','Ocean sunfish','Olive flounder','Pale chub','Pike','Piranha','Pond smelt','Pop-eyed goldfish','Puffer fish','Rainbowfish','Ranchu goldfish','Ray','Red snapper','Ribbon eel','Saddled bichir','Salmon','Saw shark','Sea bass','Sea butterfly','Sea horse','Snapping Turtle','Soft-shelled turtle','Squid','Stringfish','Sturgeon','Suckerfish','Surgeonfish','Sweetfish','Tadpole','Tilapia','Tuna','Whale shark','Yellow perch','Zebra turkeyfish'];

const fish = fishNames.map((name) => ({
	id: util.labelToId(name),
	label: name
}));

module.exports = function Fish(props) {
	return (
		<List
			id="fish"
			items={fish}
			title="Fish"
		/>
	);
};
