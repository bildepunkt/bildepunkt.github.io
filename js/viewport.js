/**
 * viewport
 */

;(function() {

$.namespace('cp.viewport', {

	$doc : null,
	docWidth  : null,
	docHeight : null,
	timer  : null,
	buffer : 350,
	buffering : false,
	observable : null,
	$observable : null,

	init : function() {
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
		this.docWidth = this.$doc.width();

		this.observable = new cp.Observable();
		this.$observable = this.observable.create('viewport');

		this.events();
	},

	events : function() {
		var self = this;

		$(window).resize(function() {
			self.$observable.trigger('resizestart');

			clearTimeout(self.timer);
			self.timer = setTimeout(function() {
				self.docHeight = self.$doc.height();
				self.docWidth = self.$doc.width();
				self.$observable.trigger('resizefinish');
			}, self.buffer);
		});
	}

});

}());