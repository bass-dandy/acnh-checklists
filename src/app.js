const React = require('react');
const Background = require('./background');
const Songs = require('./songs');

module.exports = function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8"/>
				<title></title>
				<meta name="description" content=""/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="stylesheet" href="style.css"/>
				<script type="text/javascript" src="script.js" defer/>
			</head>
			<body>
				<Background/>
				<h1>ACNH Songs Checklist</h1>
				<div id="songs">
					<Songs/>
				</div>
			</body>
		</html>
	);
};
