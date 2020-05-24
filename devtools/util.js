exports.nameToId = function(name) {
	return name
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
