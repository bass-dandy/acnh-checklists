const React = require('react');
const PropTypes = require('prop-types');

module.exports = function List(props) {
	return (
		<div className="list-wrapper">
			{props.renderFilters ? (
				<div className="list-filters">
					{props.renderFilters()}
				</div>
			) : null}
			<ul
				id={props.id}
				className="list"
			>
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
		</div>
	);
};

module.exports.propTypes = {
	id: PropTypes.string,
	items: PropTypes.objectOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired
		}).isRequired
	),
	renderDetails: PropTypes.func
};
