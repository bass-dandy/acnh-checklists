const React = require('react');
const Sun = require('./svg/sun');

module.exports = function Background() {
	return (
		<>
			<div id="sky">
				<div id="night"/>
				<div id="sunset"/>
				<div id="day"/>
				<div id="sun-transitioner">
					<div id="sun"><Sun/></div>
				</div>
				<div id="moon-transitioner">
					<div id="moon"/>
				</div>
			</div>
			<div id="foreground">
				<img id="island" src="img/island.png" alt=""/>
				<div id="wave-bg">
					<div/>
				</div>
				<div id="wave-fg">
					<div/>
				</div>
				<div id="underwater">
					<div id="fishy">
						<img src="img/fishy.png" alt=""/>
					</div>
				</div>
			</div>
		</>
	);
};
