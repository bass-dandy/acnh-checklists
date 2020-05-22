const nightModeToggle = document.querySelector('#night-mode-toggle input');

// true if system dark mode preference was detected in earlier script
nightModeToggle.checked = document.documentElement.classList.contains('night-mode');

nightModeToggle.addEventListener('change', (e) => {
	e.target.checked
		? document.documentElement.classList.add('night-mode')
		: document.documentElement.classList.remove('night-mode');
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Tab') {
		document.documentElement.classList.add('keyboard-accessible');
	}
});
document.addEventListener('mousedown', () => {
	document.documentElement.classList.remove('keyboard-accessible');
});

// init tab panel
const tabPanel = document.getElementById('tab-panel');
const tabs = tabPanel.querySelectorAll('.tabs .tab');

tabs.forEach((tab) => {
	tab.addEventListener('click', (e) => {
		tabPanel.setAttribute('data-selected-tab', e.target.dataset.tabId);
	});
});

// init checklists
tabs.forEach((tab) => {
	const checklistItems = document.querySelectorAll(`#${tab.dataset.tabId} > li`);

	checklistItems.forEach((item) => {
		const itemId = item.dataset.itemId;
		const defaultChecked = localStorage.getItem(itemId) === 'true';
		item.setAttribute('data-checked', defaultChecked);

		const checkbox = item.querySelector('input');
		checkbox.checked = defaultChecked;

		checkbox.addEventListener('change', (e) => {
			item.setAttribute('data-checked', e.target.checked);
			localStorage.setItem(itemId, e.target.checked);
		});
	});
})
