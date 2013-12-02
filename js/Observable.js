/**
 * Observable
 */

;(function() {

var $el;

var Observable = function(name, $parel) {
	return this.create(name, $parel);
};

Observable.prototype.create = function(name, $parel) {
	$('<div>', {
		class : name + '-observable'
	}).appendTo($parel ? $parel : 'body');

	$el = $('.' + name + '-observable');

	return $el;
};

Observable.prototype.destory = function() {
	$el.off().remove();
};

$.namespace('cp.Observable', Observable);

}());