var title = (function() {
    'use strict';

    var $el;
    var $win; 

    var init = function(id) {
        $win = $(window);
        $el = $('#' + id).css('position', 'absolute');

        resize();
        show();
    };

    var show = function() {
        $el.css({
            opacity: 0,
            visibility: 'visible',
            top: (parseInt($el.css('top'), 10) + 32) + 'px'
        }).animate({
            opacity: 1,
            top: '-=32'
        }, 1000);
    };

    var resize = function() {
        $el.css({
            left: ($win.width() / 2 - $el.width() / 2) + 'px',
            top: ($win.height() / 2 - $el.height() / 2) + 'px'
        });
    };

    return {
        init: init,
        resize: resize
    };
}());