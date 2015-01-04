var nav = (function() {
    'use strict';

    return {
        $links: null,
        scrollTimer: null,
        pageSelector: 'section',
        lastScrollTop: null,

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
                var scrollingUp = scrollTop < self.lastScrollTop;
                var $item;
                var location;

                self.lastScrollTop = scrollTop;

                $(self.pageSelector).each(function() {
                    $item = $(this);
                    location = $item.attr('id').replace('goto-', '');

                    if (scrollingUp) {
                        if (scrollTop >= $item.offset().top - $item.height() * 0.65 &&
                            scrollTop <  $item.offset().top + $item.height() * 0.35) {
                            self.setLocation(location);
                        }
                    } else {
                        if (scrollTop >= $item.offset().top - $item.height() * 0.15 &&
                            scrollTop <  $item.offset().top + $item.height() * 0.85) {
                            self.setLocation(location);
                        }
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
                    self.setLocation(location);
                });
            } else {
                this.setLocation(location);
            }
        },

        setLocation: function(location) {
            var $reloads = $('#goto-' + location).find('.reload-on-nav');
            var $item;
            var html;

            // when changing nav location, reload els to restart css animations
            if (location != document.location.hash.replace('#', '')) {
                $reloads.each(function() {
                    $item = $(this);
                    html = $item.html();

                    $item.html('').html(html);
                });
            }

            document.location.hash = location;
        }
    };
}());
