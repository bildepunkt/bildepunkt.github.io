/**
 * Main
 */

$(document).ready(function() {

	cp.templateManager.init('templates/templates.html', _.template);
	cp.templateManager.$observable.on('templatesready', function() {
		cp.router.init();
		cp.viewport.init();
		cp.logo.init($('.logo'));
		cp.stars.init(0.1, $('.stars-container'));
		cp.countdown.init($('.launch-container'), 'January 1, 2014');
	});

});

$.namespace('cp.cssPrefixes', [
	'-webkit-', '-moz-', '-ms-', '-o-', ''
]);