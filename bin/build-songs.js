#!/usr/bin/env node
const fs = require('fs');
const argv = require('yargs').argv;

if (!argv['out-dir']) {
	throw new Error('usage: build-songs --out-dir <dirname>');
}

const titles = ["Agent K.K.", "Aloha K.K.", "Animal City", "Bubblegum K.K.", "Café K.K.", "Comrade K.K.", "DJ K.K.", "Drivin'", "Farewell", "Forest Life", "Go K.K. Rider", "Hypno K.K.", "I Love You", "Imperial K.K.", "K.K. Adventure", "K.K. Aria", "K.K. Ballad", "K.K. Bazaar", "K.K. Birthday", "K.K. Blues", "K.K. Bossa", "K.K. Calypso", "K.K. Casbah", "K.K. Chorale", "K.K. Condor", "K.K. Country", "K.K. Cruisin'", "K.K. D&B", "K.K. Dirge", "K.K. Disco", "K.K. Dixie", "K.K. Étude", "K.K. Faire", "K.K. Flamenco", "K.K. Folk", "K.K. Fusion", "K.K. Groove", "K.K. Gumbo", "K.K. House", "K.K. Island", "K.K. Jazz", "K.K. Jongara", "K.K. Lament", "K.K. Love Song", "K.K. Lullaby", "K.K. Mambo", "K.K. Marathon", "K.K. March", "K.K. Mariachi", "K.K. Metal", "K.K. Milonga", "K.K. Moody", "K.K. Oasis", "K.K. Parade", "K.K. Ragtime", "K.K. Rally", "K.K. Reggae", "K.K. Rock", "K.K. Rockabilly", "K.K. Safari", "K.K. Salsa", "K.K. Samba", "K.K. Ska", "K.K. Sonata", "K.K. Song", "K.K. Soul", "K.K. Steppe", "K.K. Stroll", "K.K. Swing", "K.K. Synth", "K.K. Tango", "K.K. Technopop", "K.K. Waltz", "K.K. Western", "King K.K.", "Lucky K.K.", "Marine Song 2001", "Mountain Song", "Mr. K.K.", "My Place", "Neapolitan", "Only Me", "Pondering", "Rockin' K.K.", "Soulful K.K.", "Space K.K.", "Spring Blossoms", "Stale Cupcakes", "Steep Hill", "Surfin' K.K.", "The K. Funk", "To the Edge", "Two Days Ago", "Wandering", "Welcome Horizons"];

function titleToId(title) {
	return title
		.toLowerCase()
		.replace(/ /g, '_')
		.replace(/é/g, 'e')
		.replace(/&/g, 'n')
		.replace(/\./g, '')
		.replace(/'/g, '');
}

const songs = titles.map((title) => ({
	title,
	id: titleToId(title),
	icon: 'img/song.png'
}));

let songsHtml = songs.reduce((acc, {title, id, icon}) => {
	acc += `
		<li id="${id}">
			<label>
				<input type="checkbox"/>
				${title}
			</label>
			<img src="${icon}" alt=""/>
		</li>
	`;
	return acc;
}, '<ol>\n');

songsHtml += '</ol>';

const html = fs
	.readFileSync('./template.html', 'utf8')
	.replace('{% songs %}', songsHtml);

const outputPath = `${process.cwd()}/${argv['out-dir']}/index.html`;

fs.writeFile(outputPath, html, (err) => console.log(err));
