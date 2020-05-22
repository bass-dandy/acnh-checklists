const names = ['Black Cosmos', 'Black Lilies', 'Black Roses', 'Black Tulips', 'Blue Hyacinths', 'Blue Pansies', 'Blue Roses', 'Blue Windflowers', 'Gold Roses', 'Green Mums', 'Orange Cosmos', 'Orange Hyacinths', 'Orange Lilies', 'Orange Pansies', 'Orange Roses', 'Orange Tulips', 'Orange Windflowers', 'Pink Cosmos', 'Pink Hyacinths', 'Pink Lilies', 'Pink Mums', 'Pink Roses', 'Pink Tulips', 'Pink Windflowers', 'Purple Hyacinths', 'Purple Mums', 'Purple Pansies', 'Purple Roses', 'Purple Tulips', 'Purple Windflowers', 'Red Cosmos', 'Red Hyacinths', 'Red Lilies', 'Red Mums', 'Red Pansies', 'Red Roses', 'Red Tulip', 'Red Tulips', 'Red Windflowers', 'White Cosmos', 'White Hyacinths', 'White Lilies', 'White Mums', 'White Pansies', 'White Roses', 'White Tulip', 'White Tulips', 'White Windflowers', 'Yellow Cosmos', 'Yellow Hyacinths', 'Yellow Lilies', 'Yellow Mums', 'Yellow Pansies', 'Yellow Roses', 'Yellow Tulip', 'Yellow Tulips']
	.map((name) => {
		const words = name.split(' ');
		return `${words[1]} (${words[0]})`;
	})
	.sort();


const fs = require('fs');

fs.writeFile('./src/flowers.js', JSON.stringify(names), (err) => console.log(err));
