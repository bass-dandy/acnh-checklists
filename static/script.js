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

document.getElementById('night-mode-toggle')
	.addEventListener('change', (e) => {
		e.target.checked
			? document.body.classList.add('night-mode')
			: document.body.classList.remove('night-mode');
	});
