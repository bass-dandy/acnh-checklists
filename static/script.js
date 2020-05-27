import * as data from './data.js';

// ==============================
// init night mode toggle =======
// ==============================
(() => {
	const nightModeToggle = document.querySelector('#night-mode-toggle');

	function toggleNightMode() {
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
})();

// ==============================
// init reasonable focus outlines
// ==============================
(() => {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Tab') {
			document.documentElement.classList.add('keyboard-accessible');
		}
	});
	document.addEventListener('mousedown', () => {
		document.documentElement.classList.remove('keyboard-accessible');
	});
})();

// ==============================
// init tab panel ===============
// ==============================
(() => {
	const tabPanel = document.getElementById('tab-panel');
	const tabs = tabPanel.querySelectorAll('.tabs .tab');

	tabs.forEach((tab) => {
		tab.addEventListener('click', (e) => {
			tabPanel.setAttribute('data-selected-tab', e.target.dataset.tabId);
		});
	});
})();

// ==============================
// init checklists ==============
// ==============================
(() => {
	document.querySelectorAll('*[data-item-id]').forEach((checklistItem) => {
		const itemId = checklistItem.dataset.itemId;
		const defaultChecked = localStorage.getItem(itemId) === 'true';
		checklistItem.setAttribute('data-checked', defaultChecked);

		const checkbox = checklistItem.querySelector('input[type="checkbox"]');
		checkbox.checked = defaultChecked;

		checklistItem.addEventListener('click', (e) => {
			e.preventDefault();

			const isChecked = checklistItem.dataset.checked === 'true';
			checklistItem.setAttribute('data-checked', !isChecked);
			checkbox.checked = !isChecked;
			localStorage.setItem(itemId, !isChecked);
		});
	});
})();

// ==============================
// init filtering ===============
// ==============================
(() => {
	// tabId: [data-tab-id] of the target filter panel container
	// filterFn(filterState, item): function that returns true if item passes filter test and false otherwise
	function attachFilters(tabId, filterFn) {
		const state = {};
		const tab = document.querySelector(`.tab-panel-content[data-tab-id="${tabId}"]`);
		const controls = tab.querySelectorAll('*[data-filter-id]');
		const items = tab.querySelectorAll('*[data-item-id]');

		controls.forEach((control) => {
			state[control.dataset.filterId] = control.type === 'checkbox'
				? control.checked
				: control.value;

			control.addEventListener('change', (e) => {
				state[control.dataset.filterId] = e.target.type === 'checkbox'
					? e.target.checked
					: e.target.value;

				items.forEach((item) => {
					item.style.display = filterFn(state, item) ? null : 'none';
				});
			});
		});
	}

	const getCreatureFilter = (creatureData) => (state, item) => {
		item.classList.remove('new-this-month', 'leaving-this-month');
		const itemData = creatureData[item.dataset.itemId];

		const {activeMonths, displayMonths} = state.hemisphere === 'n'
			? itemData.nSeasonality
			: itemData.sSeasonality;

		item.querySelector('*[data-key="nSeasonality.displayMonths"]').innerHTML = displayMonths;

		if (!state.month) {
			// show all fish
			return true;
		} else {

			if (!activeMonths || activeMonths.includes(state.month)) {
				// available this month
				const newThisMonth = displayMonths.split(', ').some((range) => {
					return range.startsWith(state.month);
				});
				const leavingThisMonth = displayMonths.split(', ').some((range) => {
					return range.endsWith(state.month);
				});

				if (leavingThisMonth) {
					// leaving takes precedence over new for single-month fish
					item.classList.add('leaving-this-month');
				} else if (newThisMonth) {
					item.classList.add('new-this-month');
				}

				if (state.isNew && state.isLeaving){
					if (!newThisMonth && !leavingThisMonth) {
						return false;
					}
				} else if (state.isNew && !newThisMonth) {
					return false;
				} else if (state.isLeaving && !leavingThisMonth) {
					return false;
				}
				return true;
			} else {
				// not available this month
				return false;
			}
		}
	};

	attachFilters(
		'fish',
		getCreatureFilter(JSON.parse(data.fish))
	);
	attachFilters(
		'bugs',
		getCreatureFilter(JSON.parse(data.bugs))
	);
})();
