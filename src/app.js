const React = require('react');
const ReactDOM = require('react-dom/server');

const Background = require('./background');
const TabPanel = require('./tab-panel');
const NightModeToggle = require('./night-mode-toggle');
const {Fish, Bugs, Fossils, Art, Songs, Flowers} = require('./tabs');

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
			<NightModeToggle/>
			<script
				dangerouslySetInnerHTML={{
					// this script must run after <NightModeToggle> loads to avoid
					// crashing and before <Background> loads to avoid FOUCs
					__html: `
						if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
							document.documentElement.classList.add('night-mode');
							document.getElementById('night-mode-toggle').setAttribute('aria-checked', 'true');
						}
					`
				}}
			/>
			<div className="parallax-container">
				<Background/>
				<h1>New Horizons Checklists</h1>
				<TabPanel tabs={TABS}/>
			</div>
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
			<script type="module" src="data.js"></script>
			<script type="module" src="script.js" defer></script>
		</head>
		<body>
			${ReactDOM.renderToStaticMarkup(<App/>)}
		</body>
	</html>
`;
