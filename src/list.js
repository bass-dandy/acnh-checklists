const React = require('react');
const PropTypes = require('prop-types');

module.exports = function List(props) {
	return (
		<div className="list-wrapper">
			<ol
				id={props.id}
				className="list"
			>
				{props.items.map((item) => (
					<li id={item.id}>
						<label>
							<input type="checkbox"/>
							{item.label}
						</label>
					</li>
				))}
			</ol>
		</div>
	);
};

module.exports.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		}).isRequired
	)
};
