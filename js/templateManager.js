/**
 * template manager
 */

;(function() {

var $templates,
	templateEngineMethod;

$.namespace('cp.templateManager', {

	$observable : null,

	init : function(src, _templateEngineMethod) {
		this.$observable = new cp.Observable('templateManager');

		$('body').append('<iframe id="templates" class="templates" src="' + src + '"></iframe>');
		$templates = $('#templates');

		templateEngineMethod = _templateEngineMethod;

		this.events();
	},

	events : function() {
		var self = this;

		$templates.one('load', function() {
			self.$observable.trigger('templatesready');
		});
	},

	/**
	 * because templates are in an iframe, their path is even uglier, so this method cleans that up
	 * and makes the templateEngineMethod (currently lodash's _.template) more user friendly
	 */
	template : function(templateSelector, data, settings) {
		return templateEngineMethod(
			$templates.contents().find(templateSelector).html(), data, settings
		);
	}

});

}());