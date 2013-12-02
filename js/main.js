/**
 * Main
 */

$(document).ready(function() {

	History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
	});

	cp.router.init();
	cp.viewport.init();
	cp.logo.init($('.logo'));
	cp.stars.init(64, $('.stars'));
	cp.launchCalculator.init($('.launch'));

});

$.namespace('cp.cssPrefixes', [
	'-webkit-', '-moz-', '-ms-', '-o-', ''
]);

cp.titleSuffix = '&nbsp;&nbsp;chris peters';