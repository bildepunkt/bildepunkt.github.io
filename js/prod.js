(function() {
    var canvas;
    var context;

    function init() {
        var timeout;

        canvas = document.getElementById('galaxy');
        context = canvas.getContext('2d');

        window.removeEventListener('load', init, false);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        stars.init({
            canvasId: 'galaxy',
            fieldCount: 3
        });
        title.init('title');

        $(window).bind('resize', function() {
            clearTimeout(timeout);
            timeout = setTimeout(resize, 256);
        });
    };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        title.resize();
        stars.resize();
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
var stars = (function() {
    var offset = {
        x: 0,
        y: 0
    };
    var fields = [];
    var config;
    var vpWidth;
    var vpHeight;
    var canvas;
    var context;

    var init = function(options) {
        var factor = 1;
        config = options;
        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;
        canvas = document.getElementById(config.canvasId);
        context = canvas.getContext('2d');

        for(var i = 0; i < config.fieldCount; i += 1) {
            fields.push({
                type: 'stars',
                count: Math.round((config.fieldCount - i) * vpWidth / 8),
                radius: i + 1,
                factor: factor++,
                entities: []
            });
        }

        resize();
    };

    var resize = function() {
        var field, i, len;

        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;

        for(i = 0, len = fields.length; i < len; i += 1) {
            field = fields[i];
            field.count = Math.round((config.fieldCount - i) * vpWidth / 8);
            field.entities = [];
            populateEntities(field);
        }

        render();
    };

    var populateEntities = function(field) {
        var radius, x, y, opacity;

        for(var i = 0; i < field.count; i += 1) {
            radius = Math.round(Math.random() * field.radius);
            x = Math.round(Math.random() * vpWidth);
            y = Math.round(Math.random() * vpHeight);
            opacity = 0.5 + (Math.random() - 0.5);
            field.entities.push({
                x: x,
                y: y,
                radius: radius,
                opacity: opacity,
                color: getFillStyle(x, y, opacity, radius)
            });
        }
    };

    var render = function() {
        var field, entity;

        for(var f = 0, len = fields.length; f < len; f += 1) {
            field = fields[f];
            for(var e = 0; e < field.entities.length; e += 1) {
                entity = field.entities[e];
                context.fillStyle = entity.color;
                context.beginPath();
                context.arc(
                    entity.x,
                    entity.y,
                    entity.radius,
                    0,
                    2 * Math.PI,
                    false
                );
                context.closePath();
                context.fill();
            }
        }
    };

    var getFillStyle = function(x, y, opacity, radius) {
        var r = Math.round(Math.random() * 65) + 190;
        var g = Math.round(Math.random() * 65) + 190;
        var b = Math.round(Math.random() * 65) + 190;
        var display;

        if (radius > 1) {
            display = context.createRadialGradient(x, y, 1, x, y, radius);
            display.addColorStop(0, 'rgba(' + [r,g,b,opacity].join(',') + ')');
            display.addColorStop(1, 'rgba(' + [r,g,b,0].join(',') + ')');

            return display;
        } else {
            return 'rgba(' + [r,g,b,opacity].join(',') + ')';
        }
    };

    return {
        init: init,
        resize: resize
    };
}());
var title = (function() {
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