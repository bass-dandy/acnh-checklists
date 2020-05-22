const React = require('react');
const PropTypes = require('prop-types');

module.exports = function TabPanel(props) {
	return (
		<div
			id="tab-panel"
			data-selected-tab={props.tabs[0].id}
		>
			<div className="tabs">
				{props.tabs.map((tab) => (
					<button
						className="tab"
						aria-label={tab.id}
						data-tab-id={tab.id}
					>
						<div className="highlight">
							{tab.id}
						</div>
					</button>
				))}
			</div>
			{props.tabs.map((tab) => (
				<div
					className="tab-panel-content"
					data-tab-id={tab.id}
				>
					{tab.content}
				</div>
			))}
		</div>
	);
};

module.exports.propTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		content: PropTypes.node.isRequired
	}))
};
