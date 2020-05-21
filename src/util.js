exports.labelToId = function(label) {
	return label
		.toLowerCase()
		.replace(/ /g, '_')
		.replace(/-/g, '_')
		.replace(/é/g, 'e')
		.replace(/&/g, 'n')
		.replace(/\./g, '')
		.replace(/\(/g, '')
		.replace(/\)/g, '')
		.replace(/'/g, '');
};
