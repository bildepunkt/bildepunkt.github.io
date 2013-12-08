/**
 * template access
 */

;(function() {



$.namespace('cp.templateManager', {

	$observable : null,
	$templates  : null,

	init : function(src) {
		this.$observable = new cp.Observable('templateManager');
		$('body').append('<iframe id="templates" class="templates" src="' + src + '"></iframe>');
		this.$templates = $('#templates');

		this.events();
	},

	events : function() {
		var self = this;

		this.$templates.once('load', function() {
			this.createTemplateAccess();
			self.$observable.trigger('templatesready');
		});

	},

	createTemplateAccess : function() {
		this.templateAccess = this.$templates.contents();
	}

});

}());