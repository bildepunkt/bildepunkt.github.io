/**
 * viewport
 */

;(function(window, document) {

var $win = $(window),
	$doc = $(document),
	buffer = 350,
	timer;

$.namespace('cp.viewport', {

	winWidth  : null,
	winHeight : null,
	docWidth  : null,
	docHeight : null,
	$observable : null,

	init : function() {
		this.docHeight = $doc.height();
		this.docWidth  = $doc.width();
		this.winHeight = $win.height();
		this.winWidth  = $win.width();

		this.$observable = new cp.Observable('viewport');

		this.resizeHandler();
		this.events();
	},

	events : function() {
		var self = this;

		$(window).resize(function() {
			self.resizeHandler();
		});
	},

	resizeHandler : function() {
		var self = this;
		this.$observable.trigger('resizestart', this);

		clearTimeout(timer);
		timer = setTimeout(function() {
			self.docHeight = $doc.height();
			self.docWidth  = $doc.width();
			self.winHeight = $win.height();
			self.winWidth  = $win.width();
			self.$observable.trigger('resizefinish', self);
		}, buffer);
	}

});

}(window, document));