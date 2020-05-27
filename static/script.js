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
	// updateFn(filterState, item): function that runs side-effects on items that pass the filter test
	function attachFilters(tabId, filterFn, updateFn) {
		const filterState = {};
		const tab = document.querySelector(`.tab-panel-content[data-tab-id="${tabId}"]`);
		const items = tab.querySelectorAll('*[data-item-id]');

		tab.querySelectorAll('*[data-filter-id]').forEach((filterControl) => {
			const {filterId} = filterControl.dataset;

			// init filter state with default values
			filterState[filterId] = filterControl.type === 'checkbox'
				? filterControl.checked
				: filterControl.value;

			filterControl.addEventListener('change', (e) => {
				filterState[filterId] = e.target.type === 'checkbox'
					? e.target.checked
					: e.target.value;

				items.forEach((item) => {
					if (filterFn(filterState, item)) {
						updateFn(filterState, item);
						item.style.display = null;
					} else {
						item.style.display = 'none';
					}
				});
			});
		});
	}

	function getSeasonality(state, itemData) {
		return state.hemisphere === 'n' ? itemData.nSeasonality : itemData.sSeasonality;
	}

	function getWarnings(state, displayMonths) {
		return {
			isNew: state.month && displayMonths.some((range) => {
				return range.startsWith(state.month);
			}),
			isLeaving: state.month && displayMonths.some((range) => {
				return range.endsWith(state.month);
			})
		};
	}

	const getCreatureFilterFn = (creatureData) => (state, item) => {
		const itemData = creatureData[item.dataset.itemId];
		const {activeMonths, displayMonths} = getSeasonality(state, itemData);

		if (!state.month) {
			// remaining filters have no meaning without a selected month
			return true;
		} else if (!activeMonths || activeMonths.includes(state.month)) {
			// available this month
			const {isNew, isLeaving} = getWarnings(state, displayMonths);

			if (state.isNew && isNew) {
				return true;
			} else if (state.isLeaving && isLeaving) {
				return true
			} else if (!state.isNew && !state.isLeaving) {
				return true;
			} else {
				return false;
			}
		} else {
			// not available this month
			return false;
		}
	};

	const getCreatureUpdateFn = (creatureData) => (state, item) => {
		item.classList.remove('new-this-month', 'leaving-this-month');

		const itemData = creatureData[item.dataset.itemId];
		const {displayMonths} = getSeasonality(state, itemData);

		item.querySelector('*[data-key="displayMonths"]').innerHTML =
			displayMonths.map((range, i) => {
				return i > 0 ? `<br/>${range}` : range;
			});

		const {isNew, isLeaving} = getWarnings(state, displayMonths);

		if (isLeaving) {
			// leaving takes precedence over new for single-month fish
			item.classList.add('leaving-this-month');
		} else if (isNew) {
			item.classList.add('new-this-month');
		}
	};

	const fish = JSON.parse(data.fish);
	attachFilters('fish', getCreatureFilterFn(fish), getCreatureUpdateFn(fish));

	const bugs = JSON.parse(data.bugs);
	attachFilters('bugs', getCreatureFilterFn(bugs), getCreatureUpdateFn(bugs));
})();
