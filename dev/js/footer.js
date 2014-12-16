var footer = (function() {
    'use strict';

    return {
        $el: null,

        init: function() {
            this.$el = $('footer');
            this.$el.find('span').html(new Date().getFullYear());
        }
    };
}());