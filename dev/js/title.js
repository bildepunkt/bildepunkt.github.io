var title = (function() {
    'use strict';

    return {
        $el: null,
        $win: null,

        init: function() {
            this.$win = $(window);
            this.$el = $('#title').css('position', 'absolute');

            this.resize();
            this.show();
        },

        show: function() {
            this.$el.css({
                opacity: 0,
                visibility: 'visible',
                top: (parseInt(this.$el.css('top'), 10) + 32) + 'px'
            }).animate({
                opacity: 1,
                top: '-=32'
            }, 1000);
        },

        resize: function() {
            this.$el.css({
                left: (this.$win.width() / 2 - this.$el.width() / 2) + 'px',
                top: (this.$win.height() / 2 - this.$el.height() / 2) + 'px'
            });
        }
    };
}());