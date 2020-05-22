const React = require('react');
const ReactDOM = require('react-dom/server');

const Background = require('./background');
const TabPanel = require('./tab-panel');

const Fish = require('./fish');
const Bugs = require('./bugs');
const Fossils = require('./fossils');
const Art = require('./art');
const Songs = require('./songs');
const Flowers = require('./flowers');

const TABS = [{
	id: 'fish',
	content: <Fish/>
}, {
	id: 'bugs',
	content: <Bugs/>
}, {
	id: 'fossils',
	content: <Fossils/>
}, {
	id: 'art',
	content: <Art/>
}, {
	id: 'songs',
	content: <Songs/>
}, {
	id: 'flowers',
	content: <Flowers/>
}];

function App() {
	return (
		<>
			<div className="parallax-container">
				<Background/>
				<h1>New Horizons Checklists</h1>
				<TabPanel tabs={TABS}/>
			</div>
			<label id="night-mode-toggle">
				<input type="checkbox"/>
				Night Mode
			</label>
		</>
	);
}

module.exports = `
	<!doctype html>
	<html lang="en">
		<head>
			<meta charSet="utf-8">
			<title>ACNH Checklists</title>
			<meta name="description" content="">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="icon" type="image/png" href="favicon.png">
			<link rel="stylesheet" href="style.css">
			<script>
				// this script must run before <Background> loads to avoid FOUCs
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.documentElement.classList.add('night-mode');
				}
			</script>
			<script type="text/javascript" src="script.js" defer></script>
		</head>
		<body>
			${ReactDOM.renderToStaticMarkup(<App/>)}
		</body>
	</html>
`;
