const nightModeToggle = document.querySelector('#night-mode-toggle input');

// true if system dark mode preference was detected by detect-night-mode.js
nightModeToggle.checked = document.body.classList.contains('night-mode');

nightModeToggle.addEventListener('change', (e) => {
	e.target.checked
		? document.body.classList.add('night-mode')
		: document.body.classList.remove('night-mode');
});

const songs = document.querySelectorAll('#songs > li');

songs.forEach((song) => {
	const defaultChecked = localStorage.getItem(song.id) === 'true';
	song.setAttribute('data-checked', defaultChecked);

	const checkbox = song.querySelector('input');
	checkbox.checked = defaultChecked;

	checkbox.addEventListener('change', (e) => {
		song.setAttribute('data-checked', e.target.checked);
		localStorage.setItem(song.id, e.target.checked);
	});
});
