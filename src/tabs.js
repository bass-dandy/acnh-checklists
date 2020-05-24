const React = require('react');
const List = require('./list');
const data = require('./data');

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function PriceTag({price}) {
	return (
		<div className="price-tag">
			{price.toLocaleString()}
		</div>
	);
}

exports.Fish = function Fish(props) {
	return (
		<List
			id="fish"
			items={data.fish}
			renderFilters={() => (
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
			)}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Bugs = function Bugs(props) {
	return (
		<List
			id="bugs"
			items={data.bugs}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Fossils = function Fossils(props) {
	return (
		<List
			id="fossils"
			items={data.fossils}
			renderDetails={(item) => <PriceTag price={item.price}/>}
		/>
	);
};

exports.Art = function Art(props) {
	return (
		<List
			id="art"
			items={data.art}
		/>
	);
};

exports.Songs = function Songs(props) {
	return (
		<List
			id="songs"
			items={data.songs}
			renderDetails={(item) => item.conditions}
		/>
	);
};

exports.Flowers = function Flowers(props) {
	return (
		<List
			id="flowers"
			items={data.flowers}
			renderDetails={(item) => item.conditions}
		/>
	);
};
