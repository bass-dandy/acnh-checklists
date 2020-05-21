const React = require('react');
const List = require('./list');
const util = require('./util');

const flowerNames = ['Cosmos (Black)','Cosmos (Orange)','Cosmos (Pink)','Cosmos (Red)','Cosmos (White)','Cosmos (Yellow)','Hyacinths (Blue)','Hyacinths (Orange)','Hyacinths (Pink)','Hyacinths (Purple)','Hyacinths (Red)','Hyacinths (White)','Hyacinths (Yellow)','Lilies (Black)','Lilies (Orange)','Lilies (Pink)','Lilies (Red)','Lilies (White)','Lilies (Yellow)','Mums (Green)','Mums (Pink)','Mums (Purple)','Mums (Red)','Mums (White)','Mums (Yellow)','Pansies (Blue)','Pansies (Orange)','Pansies (Purple)','Pansies (Red)','Pansies (White)','Pansies (Yellow)','Roses (Black)','Roses (Blue)','Roses (Gold)','Roses (Orange)','Roses (Pink)','Roses (Purple)','Roses (Red)','Roses (White)','Roses (Yellow)','Tulip (Red)','Tulip (White)','Tulip (Yellow)','Tulips (Black)','Tulips (Orange)','Tulips (Pink)','Tulips (Purple)','Tulips (Red)','Tulips (White)','Tulips (Yellow)','Windflowers (Blue)','Windflowers (Orange)','Windflowers (Pink)','Windflowers (Purple)','Windflowers (Red)','Windflowers (White)'];

const flowers = flowerNames.map((name) => ({
	id: util.labelToId(name),
	label: name
}));

module.exports = function Flowers(props) {
	return (
		<List
			id="flowers"
			items={flowers}
			title="Flowers"
		/>
	);
};
