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