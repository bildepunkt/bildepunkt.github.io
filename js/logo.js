/**
 * logo
 */

;(function() {

var height;

$.namespace('cp.logo', {

	$el : null,
	$container : null,

	init : function($el) {
		this.$el = $el;
		this.$container = this.$el.parent();

		height = this.$el.height();

		this.setTop();
		this.$el.fadeIn();

		this.events();
	},

	events : function() {
		var self = this;

		cp.viewport.$observable.on('resizefinish', function() {
			self.setTop();
		});

		$(document).on('mousemove', function(e) {
			self.rotate(e);
		});
	},

	setTop : function() {
		this.$container
			.css('top', ((cp.viewport.winHeight / 2) - (height / 2)) + 'px');
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