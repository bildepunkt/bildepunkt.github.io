var nav = (function() {
    'use strict';

    return {
        $links: null,
        scrollTimer: null,
        pageSelector: 'section',

        init: function() {
            this.$links = $('nav li');

            this.$links.bind('click', this.onLinkClick.bind(this));
            $(window).bind('scroll', this.onPageScroll.bind(this));

            if (document.location.hash) {
                this.goto(document.location.hash.replace('#', ''));
            }
        },

        onLinkClick: function(e) {
            this.goto($(e.target).attr('id').replace('link-', ''));
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
                    location = $item.attr('id').replace('goto-', '');

                    if (scrollTop >= $item.offset().top - $item.height() * 0.5 &&
                        scrollTop <  $item.offset().top + $item.height() * 0.5) {
                        self.setHash(location);
                    }
                });

            }, 256);
        },

        goto: function(location, noScroll) {
            var self = this;

            if (!noScroll) {
                $('html body').stop().animate({
                    scrollTop: $('#goto-' + location).offset().top
                }, function() {
                    self.setHash(location);
                });
            } else {
                this.setHash(location);
            }
        },

        setHash: function(location) {
            var $reloads = $('#goto-' + location).find('.reload-on-nav');
            var $item;
            var html;

            if (location != document.location.hash.replace('#', '')) {
                $reloads.each(function() {
                    $item = $(this);
                    html = $item.html();

                    $item.html('');
                    $item.html(html);
                });
            }

            document.location.hash = location;
        }
    };
}());
