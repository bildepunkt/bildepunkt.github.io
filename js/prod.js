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
        title.init('title');

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

            starfieldAlphaContext.clearRect(0, 0, starfieldAlphaCanvas.width, starfieldAlphaCanvas.height);
            starfieldBetaContext.clearRect(0, 0, starfieldBetaCanvas.width, starfieldBetaCanvas.height);

            sections.resize();
            title.resize();
            starfieldAlpha.resize();
            starfieldBeta.resize();
        }, 256);
    }

    function mousemoveHandler(e) {
        $(starfieldAlphaCanvas).stop().animate({
            left: (e.pageX - starfieldAlphaCanvas.width / 2) * -0.06,
            top: (e.pageY - starfieldAlphaCanvas.height / 2) * -0.06
        }, {
            queue: false,
            duration: 512,
            easing: 'smoothmove'
        });

        $(starfieldBetaCanvas).stop().animate({
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
    var $trigger;
    var $linkContainer;
    var $links;
    var $curr;

    var init = function() {
        $curr = $('#home');
        $trigger = $('nav #trigger');
        $linkContainer = $('nav #links')
        $links = $('.link');

        $trigger.bind('click', triggerClick);
        $links.bind('click', linksClick);
        $(window).bind('hashchange', onHashchange);

        if (document.location.hash) {
            follow(document.location.hash.replace('#', ''));
        } else {
            $curr.fadeIn(1000);
        }
    };

    var onHashchange = function() {
        follow(document.location.hash.replace('#', ''));
    };

    var triggerClick = function() {
        $trigger.stop().fadeOut();
        $linkContainer.stop().fadeIn();
    };

    var linksClick = function(e) {
        follow($(this).html());
        $trigger.stop().fadeIn();
        $linkContainer.stop().fadeOut();
    };

    /**
     * @param {string} location
     */
    var follow = function(location) {
        var $newCurr = $('#' + location);

        document.location.hash = location;

        $curr.stop().fadeOut();
        $newCurr.stop().fadeIn();

        $curr = $newCurr;
    };

    return {
        init: init
    };
}());
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
var Star = (function() {
    'use strict';

    var config = {
        randColorRange: 65,
        useGradient: true
    };
    var context;

    var Star = function(options) {
        this.x = 0;
        this.y = 0;
        this.radius = 8;
        this.opacity = 1;
        this.color = null;

        for (var prop in options) {
            this[prop] = options[prop];
        }

        context = options.context;

        if (!this.color) {
            this.color = this.getFill();
        }
    };

    Star.prototype.getFill = function(x, y, opacity, radius) {
        var r = Math.round(Math.random() * config.randColorRange) + 255 - config.randColorRange;
        var g = Math.round(Math.random() * config.randColorRange) + 255 - config.randColorRange;
        var b = Math.round(Math.random() * config.randColorRange) + 255 - config.randColorRange;
        var display;

        if (this.radius > 1 && config.useGradient) {
            display = context.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius);
            display.addColorStop(0, 'rgba(' + [r,g,b,this.opacity].join(',') + ')');
            display.addColorStop(1, 'rgba(' + [r,g,b,0].join(',') + ')');

            return display;
        } else {
            return 'rgba(' + [r,g,b,this.opacity].join(',') + ')';
        }
    };

    return Star;
}());

var Starfield = (function() {
    'use strict';

    var offset = {
        x: 0,
        y: 0
    };
    var config = {
        radiusSeed: 3
    };
    var field = [];
    var starCount;
    var vpWidth;
    var vpHeight;
    var canvas;
    var context;

    var Starfield = function(options) {
        for (var prop in config) {
            this[prop] = options[prop];
        }

        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;
        canvas = options.canvas;
        context = options.context;

        this.resize();
    };

    Starfield.prototype.resize = function() {
        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;

        starCount = vpWidth / 4;
        field = [];
        this.populateEntities();

        this.render();
    };

    Starfield.prototype.populateEntities = function() {
        var radius, x, y, opacity;


        for(var i = 0; i < starCount; i += 1) {
            radius = Math.round(Math.random() * config.radiusSeed);
            x = Math.round(Math.random() * vpWidth);
            y = Math.round(Math.random() * vpHeight);
            opacity = 0.5 + Math.round((Math.random() - 0.5) * 100) / 100;

            field.push(
                new Star({
                    x: x,
                    y: y,
                    radius: radius,
                    opacity: opacity,
                    context: context
                })
            );
        }
    };

    Starfield.prototype.render = function() {
        var star;

        for(var e = 0; e < field.length; e += 1) {
            star = field[e];
            context.fillStyle = star.color;
            context.beginPath();
            context.arc(
                star.x,
                star.y,
                star.radius,
                0,
                2 * Math.PI,
                false
            );
            context.closePath();
            context.fill();
        }
    };

    return Starfield;
}());
var title = (function() {
    'use strict';

    var $el;
    var $win; 

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

    return {
        init: function(id) {
            $win = $(window);
            $el = $('#' + id).css('position', 'absolute');

            this.resize();
            show();
        },

        resize: function() {
            $el.css({
                left: ($win.width() / 2 - $el.width() / 2) + 'px',
                top: ($win.height() / 2 - $el.height() / 2) + 'px'
            });
        }
    };
}());