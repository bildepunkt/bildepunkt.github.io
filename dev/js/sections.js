var sections = (function() {
    'use strict';

    var $win;
    var $sections;

    return {
        minHeight: null,

        init: function() {
            $win = $(window);
            $sections = $('section');

            this.minHeight = $sections.css('minHeight');
            this.resize();
        },

        resize: function() {
            $sections.css('height', ($win.height() <= this.minHeight) ? this.minHeight : $win.height() + 'px');
        }
    };
}());