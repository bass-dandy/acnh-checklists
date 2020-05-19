const React = require('react');
const Sun = require('./svg/sun');

module.exports = function Background() {
	return (
		<div id="background">
			<div id="sky"/>
			<div id="sun-transitioner">
				<div id="sun">
					<Sun/>
				</div>
			</div>
			<div id="moon-transitioner">
				<div id="moon"/>
			</div>
			<img id="island" src="img/island.png" alt=""/>
			<div id="wave_bg"></div>
			<div id="wave_fg"></div>
		</div>
	);
};
