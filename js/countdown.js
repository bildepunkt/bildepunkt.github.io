/**
 * countdown
 */

;(function() {

var interval = 60000,
	days,
	date;

$.namespace('cp.countdown', {

	$el  : null,

	init : function($el, _date) {
		var self = this;

		this.$el = $el;
		date = _date;

		this.calculateDays();

		setInterval(function() {
			self.calculateDays();
		}, interval);
	},

	calculateDays : function() {
		var launchDate = Date.parse(date);
		var now = Date.now();

		days = Math.ceil( (launchDate - now) / 86400 / 1000 );

		this.render();
	},

	render : function() {
		this.$el.html(cp.templateManager.template('#countdownTemplate', {
			days : days
		}));
	}

});

}());