/**
 * logo
 */

;(function() {

$.namespace('cp.launchCalculator', {

	interval : 60000,
	$el : null,
	days : null,

	init : function($el) {
		var self = this;

		this.$el = $el;

		this.calculateDays();

		setInterval(function() {
			self.calculateDays();
		}, self.interval);
	},

	calculateDays : function() {
		var launchDate = Date.parse('January 1, 2014');
		var now = Date.now();

		this.days = Math.ceil( (launchDate - now) / 86400 / 1000 );

		this.render();
	},

	render : function() {
		this.$el.html('t - ' + this.days + ' days until launch');
	}

});

}());