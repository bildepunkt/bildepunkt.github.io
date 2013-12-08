/**
 * stars
 */

;(function() {

var amount  = null,
	sizeMax = 32,
	src = 'img/star.png',
	starClass = 'star';

$.namespace('cp.stars', {

	$el : null,

	init : function(factor, $el) {
		amount = factor * cp.viewport.winWidth;
		this.$el = $el;
		this.render();

		this.events();
	},

	events : function() {
		var self = this;

		cp.viewport.$observable.on('resizestart', function() {
			self.$el.fadeOut();
		});

		cp.viewport.$observable.on('resizefinish', function() {
			self.render();
		});
	},

	render : function() {
		var stars = '',
			xPos, yPos,
			size;

		this.$el.html(cp.templateManager.template('#starsTemplate', {
			'stars' : stars
		}));

		for (var i = 0; i < amount; i += 1) {
			xPos = Math.random() * cp.viewport.winWidth - sizeMax;
			yPos = Math.random() * cp.viewport.winHeight - sizeMax;
			size = Math.random() * sizeMax;

			stars += cp.templateManager.template('#starTemplate', {
				'src' : src,
				'size' : size,
				'starClass' : starClass,
				'xPos' : xPos,
				'yPos' : yPos
			});
		}

		this.$el.html(cp.templateManager.template('#starsTemplate', {
			'stars' : stars
		})).fadeIn();
	}

});

}());