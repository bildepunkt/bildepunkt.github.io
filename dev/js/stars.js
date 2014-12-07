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