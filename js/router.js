/**
 * router
 */

;(function() {

$.namespace('cp.router', {

	$observable : null,

	init : function() {
		this.navigate(document.location.hash);
		this.$observable = new cp.Observable('router');

		this.events();
	},

	events : function() {
		var self = this;

		$('a[data-url]').on('click', function() {
			self.navigate($(this).data('url'));
		});
	},

	navigate : function(url) {
		if (this.$observable) {
			this.$observable.trigger('navigate', url);
		}
		document.location.hash = url;
	}

});

}());