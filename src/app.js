const React = require('react');
const ReactDOM = require('react-dom/server');
const Background = require('./background');
const Songs = require('./songs');

function App() {
	return (
		<>
			<div className="parallax-container">
				<Background/>
				<h1>ACNH Songs Checklist</h1>
				<Songs/>
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
			<script type="text/javascript" src="script.js" defer></script>
		</head>
		<body>
			<script>
				// this script must run at a very specific time: after <body> loads to
				// avoid crashing, before <Background> loads to avoid FOUCs
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					document.body.classList.add('night-mode');
				}
			</script>
			${ReactDOM.renderToStaticMarkup(<App/>)}
		</body>
	</html>
`;
