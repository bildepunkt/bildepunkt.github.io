var sections = (function() {
    'use strict';

    return {
        $win: null,
        $sections: null,
        minHeight: null,

        init: function() {
            this.$win = $(window);
            this.$sections = $('section');

            this.minHeight = this.$sections.css('minHeight');
            this.resize();
        },

        resize: function() {
            this.$sections.css(
                'height',
                (this.$win.height() <= this.minHeight) ? this.minHeight : this.$win.height() + 'px'
            );
        }
    };
}());