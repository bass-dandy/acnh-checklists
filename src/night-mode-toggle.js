const React = require('react');
const Cloud = require('./svg/cloud');

module.exports = function NightModeToggle() {
	return (
		<div
			id="night-mode-toggle"
			role="switch"
			aria-checked="false"
			aria-label="toggle dark mode"
			tabIndex={0}
		>
			<div id="night-mode-toggle-off-bg"/>
			<div id="night-mode-toggle-switch"/>
			<Cloud/>
		</div>
	);
}
