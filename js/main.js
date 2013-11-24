/**
 * Main
 */

$(document).ready(function() {

	cp.viewport.init();
	cp.logo.init($('.logo'));
	cp.stars.init(64, $('.stars'));
	cp.launchCalculator.init($('.launch'));

});

$.namespace('cp.cssPrefixes', [
	'-webkit-', '-moz-', '-ms-', '-o-', ''
]);