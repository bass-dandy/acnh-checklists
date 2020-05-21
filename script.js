const nightModeToggle = document.querySelector('#night-mode-toggle input');

// true if system dark mode preference was detected in earlier script
nightModeToggle.checked = document.body.classList.contains('night-mode');

nightModeToggle.addEventListener('change', (e) => {
	e.target.checked
		? document.body.classList.add('night-mode')
		: document.body.classList.remove('night-mode');
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Tab') {
		document.body.classList.add('keyboard-accessible');
	}
});
document.addEventListener('mousedown', () => {
	document.body.classList.remove('keyboard-accessible');
});

// init tab panel
const tabPanel = document.getElementById('tab-panel');
const tabs = tabPanel.querySelectorAll('.tabs .tab');

tabs.forEach((tab) => {
	tab.addEventListener('click', (e) => {
		tabPanel.setAttribute('data-selected-tab', e.target.getAttribute('data-tab-id'));
	});
});

// init checklists
tabs.forEach((tab) => {
	const id = tab.getAttribute('data-tab-id');
	const checklistItems = document.querySelectorAll(`#${id} > li`);

	checklistItems.forEach((item) => {
		const defaultChecked = localStorage.getItem(item.id) === 'true';
		item.setAttribute('data-checked', defaultChecked);

		const checkbox = item.querySelector('input');
		checkbox.checked = defaultChecked;

		checkbox.addEventListener('change', (e) => {
			item.setAttribute('data-checked', e.target.checked);
			localStorage.setItem(item.id, e.target.checked);
		});
	});
})
