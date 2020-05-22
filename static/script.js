// init night mode toggle
const nightModeToggle = document.querySelector('#night-mode-toggle');

function toggleNightMode() {
	if (nightModeToggle.getAttribute('aria-checked') === 'false') {
		nightModeToggle.setAttribute('aria-checked', 'true');
		document.documentElement.classList.add('night-mode')
	} else {
		nightModeToggle.setAttribute('aria-checked', 'false');
		document.documentElement.classList.remove('night-mode');
	}
}

nightModeToggle.addEventListener('keydown', (e) => {
	if (e.key === ' ' || e.key === 'Enter') {
		toggleNightMode();
	}
});

nightModeToggle.addEventListener('click', toggleNightMode);

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
