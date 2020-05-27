const React = require('react');
const Checklist = require('./list');
const data = require('./data');

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function PriceTag({price}) {
	return (
		<div className="price-tag">
			{price.toLocaleString()}
		</div>
	);
}

function CreatureFilter() {
	return (
		<>
			<div className="filter-group">
				<select
					value="n"
					data-filter-id="hemisphere"
				>
					<option value="n">N. Hemisphere</option>
					<option value="s">S. Hemisphere</option>
				</select>
				<select
					value=""
					data-filter-id="month"
				>
					<option value="">Month</option>
					{MONTHS.map((month) => (
						<option value={month}>
							{month}
						</option>
					))}
				</select>
			</div>
			<div className="filter-group">
				<label className="new-this-month">
					<input
						type="checkbox"
						data-filter-id="isNew"
					/>
					New
				</label>
				<label className="leaving-this-month">
					<input
						type="checkbox"
						data-filter-id="isLeaving"
					/>
					Leaving
				</label>
			</div>
		</>
	);
}

exports.Fish = function Fish(props) {
	return (
		<Checklist
			items={data.fish}
			renderFilters={CreatureFilter}
			renderDetails={(item) => <PriceTag price={item.price}/>}
			footerData={['nSeasonality.displayMonths', 'time', 'location', 'size']}
			renderFooterData={(data) => {
				return data.split(', ').map((part, i) => (
					<>
						{i > 0 ? <br/> : null}
						{part}
					</>
				));
			}}
		/>
	);
};

exports.Bugs = function Bugs(props) {
	return (
		<Checklist
			items={data.bugs}
			renderFilters={CreatureFilter}
			renderDetails={(item) => <PriceTag price={item.price}/>}
			footerData={['nSeasonality.displayMonths', 'time', 'location']}
			renderFooterData={(data) => {
				return data.split(', ').map((part, i) => (
					<>
						{i > 0 ? <br/> : null}
						{part}
					</>
				));
			}}
		/>
	);
};

exports.Fossils = function Fossils(props) {
	return (
		<Checklist
			items={data.fossils}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Art = function Art(props) {
	return (
		<Checklist
			items={data.art}
		/>
	);
};

exports.Songs = function Songs(props) {
	return (
		<Checklist
			items={data.songs}
			renderDetails={(item) => item.conditions}
		/>
	);
};

exports.Flowers = function Flowers(props) {
	return (
		<Checklist
			items={data.flowers}
			renderDetails={(item) => item.conditions}
		/>
	);
};
