/**
 * content
 */

;(function() {

$.namespace('cp.content', {

	$el  : null,

	init : function($el) {
		this.$el = $el;

		this.setTop();
		this.$el.fadeIn();

		this.events();
	},

	events : function() {
		var self = this;

		$(window).resize(function() {
			self.setTop();
		});
	},

	setTop : function() {
		this.$el.css('top', ((cp.viewport.docHeight / 2) - (this.height / 2)) + 'px');
	}

});

}());