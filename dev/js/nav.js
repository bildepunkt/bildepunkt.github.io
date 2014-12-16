var nav = (function() {
    'use strict';

    return {
        $links: null,
        scrollTimer: null,
        pageSelector: 'section',
        scrollOffset: 64,

        init: function() {
            this.$links = $('nav li');

            this.$links.bind('click', this.onLinkClick.bind(this));
            $(window).bind('scroll', this.onPageScroll.bind(this));

            if (document.location.hash) {
                this.follow(document.location.hash.replace('#', ''));
            }
        },

        onLinkClick: function(e) {
            this.follow($(e.target).html());
        },

        onPageScroll: function(e) {
            var self = this;

            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(function() {
                var scrollTop = $('html body').scrollTop();
                var $item;
                var location;

                $(self.pageSelector).each(function() {
                    $item = $(this);
                    location = $item.attr('id');

                    if (scrollTop > $item.offset().top - self.scrollOffset &&
                        scrollTop < $item.offset().top + self.scrollOffset) {

                        // scroll to section when close
                        if (document.location.hash.replace('#', '') != location) {
                            self.follow(location);
                        }
                        return;
                    }
                });
            }, 256);
        },

        follow: function(location) {
            $('html body').stop().animate({
                scrollTop: $('#' + location).offset().top
            }, function() {
                document.location.hash = location;
            });
        }
    };
}());
