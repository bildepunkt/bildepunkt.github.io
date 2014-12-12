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