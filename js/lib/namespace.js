/**
 * Adds objects and sub-objects to the window object if they don't already exist
 * @param {string} name     The object name e.g.: 'foo.bar'
 * @param {object} value    The object to assign to the last object of the hierarchy
 */

;(function($) {
	
$.namespace = function(name, value) {
	var objects = name.split('.');
	var base = window,
		i,
		max = objects.length;

	for (i = 0; i < max; i += 1) {
		if (!base[objects[i]]) {
			if (i === max - 1) {
				base[objects[i]] = value;
			} else {
				base[objects[i]] = {};
			}
		}
		base = base[objects[i]];
	}
}

}(jQuery));