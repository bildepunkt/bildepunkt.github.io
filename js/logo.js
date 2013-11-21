/**
 * logo
 */

;(function() {

$.namespace('cp.logo', {

	$el  : null,
	height : null,

	init : function($el) {
		this.$el = $el;
		this.height = this.$el.height();

		this.setTop();
		this.$el.fadeIn();

		this.events();
	},

	events : function() {
		var self = this;

		$(window).resize(function() {
			self.setTop();
		});

		$(document).on('mousemove', function(e) {
			self.rotate(e);
		});
	},

	setTop : function() {
		this.$el.css('top', ((cp.viewport.docHeight / 2) - (this.height / 2)) + 'px');
	},

	rotate : function(e) {
		var halfDocWidth = cp.viewport.docWidth / 2,
			halfDocHeight = cp.viewport.docHeight / 2,
			x = e.pageX - halfDocWidth,
			y = e.pageY - halfDocHeight,
			factor = 128;

		for (var i = 0; i < cp.cssPrefixes.length; i += 1) {
			this.$el.css(
				(cp.cssPrefixes[i] + 'transform'),
				'rotateY(' + (x / factor) + 'deg) rotateX(' + ((y / factor) * -1) + 'deg)'
			);
		}
	}

});

}());