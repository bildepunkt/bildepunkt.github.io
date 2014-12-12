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
