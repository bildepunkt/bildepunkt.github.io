/**
 * router
 */

;(function() {

$.namespace('cp.router', {

	$observable : null,

	init : function() {
		this.navigate(this.getPath());
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

		History.pushState(null, url, url);
		$('html body').animate({
			scrollTop : $('#' + url).offset().top
		});
	},

	getPath : function() {
		var pathName = document.location.pathname.match(/[a-zA-Z]+/);
		return pathName ? pathName[0] : 'home';
	}

});

}());