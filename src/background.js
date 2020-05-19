const React = require('react');
const Sun = require('./svg/sun');

module.exports = function Background() {
	return (
		<div id="background">
			<div id="sun">
				<Sun/>
			</div>
			<div id="island"></div>
			<div id="wave_bg"></div>
			<div id="wave_fg"></div>
		</div>
	);
};
