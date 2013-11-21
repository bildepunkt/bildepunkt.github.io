/**
 * stars
 */

;(function() {

$.namespace('cp.stars', {

	amount : null,
	sizeMax : 32,
	imgPath : 'img/star.png',
	starClass : 'star',
	$container : null,

	init : function(amount, container) {
		this.amount = amount;
		this.$container = container;
		this.render();

		this.events();
	},

	events : function() {
		var self = this;

		cp.viewport.$observable.on('resizestart', function() {
			self.$container.fadeOut();
		});

		cp.viewport.$observable.on('resizefinish', function() {
			self.render();
		});
	},

	render : function() {
		var xPos,
			yPos,
			size;

		this.$container.html('');

		for (var i = 0; i < this.amount; i += 1) {
			xPos = Math.random() * cp.viewport.docWidth - this.sizeMax;
			yPos = Math.random() * cp.viewport.docHeight - this.sizeMax;
			size = Math.random() * this.sizeMax;

			$('<img>', {
				'src'    : this.imgPath,
				'width'  : size,
				'height' : size,
				'class'  : this.starClass
			}).css({
				'left' : xPos + 'px',
				'top'  : yPos + 'px'
			}).appendTo(this.$container);
		}

		this.$container.fadeIn();
	}

});

}());