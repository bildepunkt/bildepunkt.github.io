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
(function() {
    'use strict';

    var starfieldAlphaCanvas;
    var starfieldAlphaContext;
    var starfieldBetaCanvas;
    var starfieldBetaContext;
    var starfieldAlpha;
    var starfieldBeta;
    var resizeTimeout;
    var mousemoveTimeout;

    function init() {
        starfieldAlphaCanvas = document.getElementById('starfieldAlpha');
        starfieldAlphaContext = starfieldAlphaCanvas.getContext('2d');
        starfieldBetaCanvas = document.getElementById('starfieldBeta');
        starfieldBetaContext = starfieldBetaCanvas.getContext('2d');

        window.removeEventListener('load', init, false);

        starfieldAlphaCanvas.width = window.innerWidth;
        starfieldAlphaCanvas.height = window.innerHeight;
        starfieldBetaCanvas.width = window.innerWidth;
        starfieldBetaCanvas.height = window.innerHeight;

        starfieldAlpha = new Starfield({
            canvas: starfieldAlphaCanvas,
            context: starfieldAlphaContext
        });
        starfieldBeta = new Starfield({
            canvas: starfieldBetaCanvas,
            context: starfieldBetaContext,
            radiusSeed: 2
        });

        sections.init();
        title.init();
        nav.init();
        footer.init();

        $(window).bind('resize', resizeHandler);
        $(document).bind('mousemove', mousemoveHandler);

        //
        jQuery.easing.smoothmove = function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        }; 
    };

    function resizeHandler() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            starfieldAlphaCanvas.width = window.innerWidth;
            starfieldAlphaCanvas.height = window.innerHeight;
            starfieldBetaCanvas.width = window.innerWidth;
            starfieldBetaCanvas.height = window.innerHeight;

            starfieldAlphaCanvas.style.left = 0;
            starfieldAlphaCanvas.style.top = 0;
            starfieldBetaCanvas.style.left = 0;
            starfieldBetaCanvas.style.top = 0;

            starfieldAlphaContext.clearRect(0, 0, starfieldAlphaCanvas.width, starfieldAlphaCanvas.height);
            starfieldBetaContext.clearRect(0, 0, starfieldBetaCanvas.width, starfieldBetaCanvas.height);

            sections.resize();
            title.resize();
            starfieldAlpha.resize();
            starfieldBeta.resize();
        }, 256);
    }

    function mousemoveHandler(e) {
        $(starfieldAlphaCanvas).animate({
            left: (e.pageX - starfieldAlphaCanvas.width / 2) * -0.06,
            top: (e.pageY - starfieldAlphaCanvas.height / 2) * -0.06
        }, {
            queue: false,
            duration: 512,
            easing: 'smoothmove'
        });

        $(starfieldBetaCanvas).animate({
            left: (e.pageX - starfieldBetaCanvas.width / 2) * -0.03,
            top: (e.pageY - starfieldBetaCanvas.height / 2) * -0.03
        }, {
            queue: false,
            duration: 512,
            easing: 'smoothmove'
        });
    }
    
    $(document).ready(init);
}());
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
                'minHeight',
                (this.$win.height() <= this.minHeight) ? this.minHeight : this.$win.height() + 'px'
            );
        }
    };
}());
var Star = (function() {
    'use strict';

    var Star = function(options) {
        this.randColorRange = 65;
        this.useGradient = true;
        this.x = 0;
        this.y = 0;
        this.radius = 8;
        this.opacity = 1;
        this.color = null;
        this.context = null;

        for (var prop in options) {
            this[prop] = options[prop];
        }

        if (!this.color) {
            this.color = this.getFill();
        }
    };

    Star.prototype.getFill = function(x, y, opacity, radius) {
        var r = this.getRandRGB();
        var g = this.getRandRGB();
        var b = this.getRandRGB();
        var display;

        if (this.radius > 1 && this.useGradient) {
            display = this.context.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius);
            display.addColorStop(0, 'rgba(' + [r,g,b,this.opacity].join(',') + ')');
            display.addColorStop(1, 'rgba(' + [r,g,b,0].join(',') + ')');

            return display;
        } else {
            return 'rgba(' + [r,g,b,this.opacity].join(',') + ')';
        }
    };

    Star.prototype.getRandRGB = function() {
        return Math.round(Math.random() * this.randColorRange) + 255 - this.randColorRange;
    };

    return Star;
}());

var Starfield = (function() {
    'use strict';

    var Starfield = function(options) {
        this.radiusSeed = 3;
        this.field     = [];
        this.starCount = null;
        this.vpWidth   = null;
        this.vpHeight  = null;
        this.canvas    = null;
        this.context   = null;

        for (var prop in options) {
            this[prop] = options[prop];
        }

        this.vpWidth = window.innerWidth;
        this.vpHeight = window.innerHeight;

        this.resize();
    };

    Starfield.prototype.resize = function() {
        this.vpWidth = window.innerWidth;
        this.vpHeight = window.innerHeight;

        this.starCount = this.vpWidth / 4;
        this.field = [];
        this.populateEntities();

        this.render();
    };

    Starfield.prototype.populateEntities = function() {
        var radius, x, y, opacity;


        for(var i = 0; i < this.starCount; i += 1) {
            radius = Math.round(Math.random() * this.radiusSeed);
            x = Math.round(Math.random() * this.vpWidth);
            y = Math.round(Math.random() * this.vpHeight);
            opacity = 0.5 + Math.round((Math.random() - 0.5) * 100) / 100;

            this.field.push(
                new Star({
                    x: x,
                    y: y,
                    radius: radius,
                    opacity: opacity,
                    context: this.context
                })
            );
        }
    };

    Starfield.prototype.render = function() {
        var star;

        for(var e = 0; e < this.field.length; e += 1) {
            star = this.field[e];
            this.context.fillStyle = star.color;
            this.context.beginPath();
            this.context.arc(
                star.x,
                star.y,
                star.radius,
                0,
                2 * Math.PI,
                false
            );
            this.context.closePath();
            this.context.fill();
        }
    };

    return Starfield;
}());
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