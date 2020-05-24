import * as data from './data.js';

(() => {
	// init night mode toggle
	const nightModeToggle = document.querySelector('#night-mode-toggle');

	const toggleNightMode = () => {
		if (nightModeToggle.getAttribute('aria-checked') === 'false') {
			nightModeToggle.setAttribute('aria-checked', 'true');
			document.documentElement.classList.add('night-mode');
		} else {
			nightModeToggle.setAttribute('aria-checked', 'false');
			document.documentElement.classList.remove('night-mode');
		}
	};

	nightModeToggle.addEventListener('keydown', (e) => {
		if (e.key === ' ' || e.key === 'Enter') {
			toggleNightMode();
		}
	});

	nightModeToggle.addEventListener('click', toggleNightMode);

	// init reasonable focus outlines
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
	});

	// init filtering
	const fishData = JSON.parse(data.fish);
	const fishItems = document.querySelectorAll('.tab-panel-content[data-tab-id="fish"] ul li');
	const fishFilterState = {};

	const filterFish = () => {
		fishItems.forEach((item) => {
			item.classList.remove('filtered', 'new-this-month', 'leaving-this-month');

			if (!fishFilterState.month) {
				// show all fish
				return;
			} else {
				const itemData = fishData[item.dataset.itemId];

				const {activeMonths, displayMonths} = fishFilterState.hemisphere === 'n'
					? itemData.nSeasonality
					: itemData.sSeasonality;

				if (!activeMonths || activeMonths.includes(fishFilterState.month)) {
					// available this month
					const newThisMonth = displayMonths.split(',').some((range) => {
						return range.trim().startsWith(fishFilterState.month);
					});
					const leavingThisMonth = displayMonths.split(',').some((range) => {
						return range.trim().endsWith(fishFilterState.month);
					});

					// leaving takes precedence over new
					if (leavingThisMonth) {
						item.classList.add('leaving-this-month');
					} else if (newThisMonth) {
						item.classList.add('new-this-month');
					}

					if (fishFilterState.isNew && fishFilterState.isLeaving) {
						if (!newThisMonth && !leavingThisMonth) {
							item.classList.add('filtered');
						}
					} else if (fishFilterState.isNew && !newThisMonth) {
						item.classList.add('filtered');
					} else if (fishFilterState.isLeaving && !leavingThisMonth) {
						item.classList.add('filtered');
					}
				} else {
					// not available this month
					item.classList.add('filtered');
				}
			}
		});
	};

	const controls =
		document.querySelectorAll('.tab-panel-content[data-tab-id="fish"] *[data-filter-id]');

	controls.forEach((control) => {
		fishFilterState[control.dataset.filterId] = control.type === 'checkbox'
			? control.checked
			: control.value;

		control.addEventListener('change', (e) => {
			fishFilterState[control.dataset.filterId] = e.target.type === 'checkbox'
				? e.target.checked
				: e.target.value;

			filterFish();
		});
	});
})();
