/**
 * Observable
 */

;(function() {

var Observable = function() {
	this.$el = null;
};

Observable.prototype.create = function(name, $parel) {
	$('<div>', {
		class : name + '-observable'
	}).appendTo($parel ? $parel : 'body');

	this.$el = $('.' + name + '-observable');

	return this.$el;
};

Observable.prototype.destory = function() {
	this.$el.off().remove();
};

$.namespace('cp.Observable', Observable);

}());