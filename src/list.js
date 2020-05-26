const React = require('react');
const PropTypes = require('prop-types');

function Table(props) {
	return (
		<table className="checklist-table">
			{Object.keys(props.items).map((id) => (
				<tbody data-item-id={id}>
					<tr>
						<td rowSpan={2}>
							<input
								type="checkbox"
								id={`checkbox-${id}`}
							/>
						</td>
						<td colSpan={props.tableData.length}>
							<label htmlFor={`checkbox=${id}`}>
								{props.items[id].name}
							</label>
						</td>
					</tr>
					<tr className="table-item-details">
						{props.tableData.map((path) => {
							const data = path.split('.').reduce((acc, key) => {
								return acc[key];
							}, props.items[id]);

							return <td>{data}</td>;
						})}
					</tr>
				</tbody>
			))}
		</table>
	);
}

function List(props) {
	return (
		<ul className="checklist">
			{Object.keys(props.items).map((id) => (
				<li data-item-id={id}>
					<label>
						<input type="checkbox"/>
						{props.items[id].name}
					</label>
					{props.renderDetails ? (
						<div className="list-item-details">
							{props.renderDetails(props.items[id])}
						</div>
					) : null}
				</li>
			))}
		</ul>
	);
}

module.exports = function CheckList(props) {
	return (
		<div className="checklist-wrapper">
			{props.renderFilters ? (
				<div className="checklist-filters">
					{props.renderFilters()}
				</div>
			) : null}
			{props.layout === 'list' ? (
				<List
					items={props.items}
					renderDetails={props.renderDetails}
				/>
			) : null}
			{props.layout === 'table' ? (
				<Table
					items={props.items}
					tableData={props.tableData}
				/>
			) : null}
		</div>
	);
};

module.exports.propTypes = {
	layout: PropTypes.oneOf(['list', 'table']),
	items: PropTypes.objectOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired
	),
	renderFilters: PropTypes.func,
	renderDetails: PropTypes.func
};

module.exports.defaultProps = {
	layout: 'list'
};
