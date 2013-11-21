/**
 * Main
 */

$(document).ready(function() {

	cp.viewport.init();
	cp.logo.init($('.logo'));
	cp.content.init($('.content'));
	cp.stars.init(64, $('.stars'));

});

$.namespace('cp.cssPrefixes', [
	'-webkit-', '-moz-', '-ms-', '-o-', ''
]);