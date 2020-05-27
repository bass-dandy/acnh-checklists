const React = require('react');
const PropTypes = require('prop-types');

module.exports = function CheckList(props) {
	return (
		<div className="checklist-wrapper">
			{props.renderFilters ? (
				<div className="checklist-filters">
					{props.renderFilters()}
				</div>
			) : null}
			<ul className="checklist">
				{Object.keys(props.items).map((id) => (
					<li
						data-item-id={id}
						className="checklist-item"
					>
						<input
							type="checkbox"
							id={`checkbox-${id}`}
							className="table-item-checkbox"
						/>
						<label htmlFor={`checkbox-${id}`}>
							{props.items[id].name}
						</label>
						{props.renderDetails ? (
							<div className="list-item-details">
								{props.renderDetails(props.items[id])}
							</div>
						) : <div/>}
						{props.footerData ? (
							<div className="list-item-footer">
								{props.footerData.map((path) => {
									const pathParts = path.split('.');

									const data = pathParts.reduce((acc, key) => {
										return acc[key];
									}, props.items[id]);

									const lastPart = pathParts[pathParts.length - 1];

									return (
										<div
											className="table-item-detail"
											data-key={lastPart}
										>
											{props.renderFooterData?.(data, lastPart) ?? data}
										</div>
									);
								})}
							</div>
						) : null}
					</li>
				))}
			</ul>
		</div>
	);
};

module.exports.propTypes = {
	items: PropTypes.objectOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired
	),
	renderFilters: PropTypes.func,
	renderDetails: PropTypes.func,
	footerData: PropTypes.arrayOf(PropTypes.string),
	renderFooterData: PropTypes.func
};
