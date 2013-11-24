/**
 * viewport
 */

;(function(window, document) {

var $win = $(window),
	$doc = $(document),
	buffer = 350,
	observable,
	timer;

$.namespace('cp.viewport', {

	winWidth  : null,
	winHeight : null,
	docWidth  : null,
	docHeight : null,
	$observable : null,

	init : function() {
		$doc = $(document);
		this.docHeight = $doc.height();
		this.docWidth = $doc.width();
		this.winHeight = $win.height();
		this.winWidth = $win.width();

		observable = new cp.Observable();
		this.$observable = observable.create('viewport');

		this.events();
	},

	events : function() {
		var self = this;

		$(window).resize(function() {
			self.$observable.trigger('resizestart', self);

			clearTimeout(timer);
			timer = setTimeout(function() {
				self.docHeight = $doc.height();
				self.docWidth = $doc.width();
				self.winHeight = $win.height();
				self.winWidth = $win.width();
				self.$observable.trigger('resizefinish', self);
			}, buffer);
		});
	}

});

}(window, document));