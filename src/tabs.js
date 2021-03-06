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

function CreatureFilter(locations) {
	return (
		<>
			<div className="filter-group">
				<select
					value="n"
					data-filter-id="hemisphere"
					aria-label="hemisphere"
				>
					<option value="n">N. Hemisphere</option>
					<option value="s">S. Hemisphere</option>
				</select>
				<select
					value=""
					data-filter-id="month"
					aria-label="month"
				>
					<option value="">
						All Months
					</option>
					{MONTHS.map((month) => (
						<option value={month}>
							{month}
						</option>
					))}
				</select>
				{locations ? (
					<select
						value=""
						data-filter-id="location"
						aria-label="location"
					>
						<option value="">
							All Locations
						</option>
						{locations.map((location) => (
							<option value={location}>
								{location}
							</option>
						))}
					</select>
				) : null}
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
			renderFilters={() => CreatureFilter(['ocean', 'pond', 'river'])}
			renderDetails={(item) => <PriceTag price={item.price}/>}
			footerData={['nSeasonality.displayMonths', 'time', 'location', 'size']}
		/>
	);
};

exports.Bugs = function Bugs(props) {
	return (
		<Checklist
			items={data.bugs}
			renderFilters={() => CreatureFilter(['tree', 'ground', 'flying', 'rocks', 'flowers', 'other'])}
			renderDetails={(item) => <PriceTag price={item.price}/>}
			footerData={['nSeasonality.displayMonths', 'time', 'location']}
		/>
	);
};

exports.SeaCreatures = function SeaCreatures(props) {
	return (
		<Checklist
			items={data.seaCreatures}
			renderFilters={() => CreatureFilter()}
			renderDetails={(item) => <PriceTag price={item.price}/>}
			footerData={['nSeasonality.displayMonths', 'time']}
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
