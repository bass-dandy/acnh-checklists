const React = require('react');
const List = require('./list');
const util = require('./util');

const fossilNames = ['Acanthostega','Amber','Ammonite','Ankylo Skull','Ankylo Tail','Ankylo Torso','Anomalocaris','Archaeopteryx','Archelon Skull','Archelon Tail','Australopith','Brachio Chest','Brachio Pelvis','Brachio Tail','Branchio Skull','Coprolite','Deinony Tail','Deinony Torso','Dimetrodon Skull','Dimetrodon Torso','Dinosaur Track','Diplo Chest','Diplo Neck','Diplo Pelvis','Diplo Skull','Diplo Tail','Diplo Tail Tip','Dunkleosteus','Eusthenopteron','Iguanodon Skull','Iguanodon Tail','Iguanodon Torso','Juramaia','Left Ptera Wing','Left Quetzal Wing','Mammoth Skull','Mammoth Torso','Megacero Skull','Megacero Tail','Megacero Torso','Megalo Left Side','Megalo Right Side','Myllokunmingia','Ophthalmo Skull','Ophthalmo Torso','Pachy Skull','Pachy Tail','Parasaur Skull','Parasaur Tail','Parasaur Torso','Plesio Body','Plesio Neck','Plesio Skull','Ptera Body','Quetzal Torso','Right Ptera Wing','Right Quetzal Wing','Sabertooth Skull','Sabertooth Tail','Shark-tooth Pattern','Spino Skull','Spino Tail','Spino Torso','Stego Skull','Stego Tail','Stego Torso','T. Rex Skull','T. Rex Tail','T. Rex Torso','Tricera Skull','Tricera Tail','Tricera Torso','Trilobite'];

const fossils = fossilNames.map((name) => ({
	id: util.labelToId(name),
	label: name
}));

module.exports = function Fossils(props) {
	return (
		<List
			id="fossils"
			items={fossils}
			title="Fossils"
		/>
	);
};
