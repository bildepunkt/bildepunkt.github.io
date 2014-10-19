var fractal = (function() {
    var branchAngle = 20 + Math.random() * 20;
    var branchCount = Math.round(3 + Math.random() * 3);
    var drawLines = false;
    var drawEllipses = true;
    var softRadiusMin = 12;
    var centerX;
    var centerY;
    var canvas;
    var context;
    var vpWidth;
    var vpHeight;
    var angle;

    var init = function(id, startAngle) {
        angle = (startAngle || 0 * Math.PI / 180);

        canvas = document.getElementById(id);
        context = canvas.getContext('2d');

        context.strokeStyle = '#ccc';

        resize();
    };

    var resize = function() {
        var branchLen;

        vpWidth = window.innerWidth;
        vpHeight = window.innerHeight;
        branchLen = vpWidth / 10;

        centerX = vpWidth / 2;
        centerY = vpHeight / 2;

        for (var i = 0; i < branchCount; i += 1) {
            draw(
                centerX,
                centerY,
                centerX + branchLen * Math.sin(angle),
                centerY + branchLen * Math.cos(angle)
            );

            calcAndDraw(
                centerX + branchLen * Math.sin(angle),
                centerY + branchLen * Math.cos(angle),
                angle,
                branchLen
            );

            angle += (360 / branchCount * Math.PI / 180);
        }
    };

    var calcAndDraw = function(x, y, angle, len) {
        if (len < 1) {
            return false;
        }

        var angleA = angle + (branchAngle * Math.PI / 180);
        var angleB = angle - (branchAngle * Math.PI / 180);
        len /= 1.5;

        draw(
            x, y,
            x + len * Math.sin(angleA),
            y + len * Math.cos(angleA)
        );

        draw(
            x, y,
            x + len * Math.sin(angleB),
            y + len * Math.cos(angleB)
        );

        if (len > 0) {
            calcAndDraw(
                x + len * Math.sin(angleA),
                y + len * Math.cos(angleA),
                angleA,
                len
            );

            calcAndDraw(
                x + len * Math.sin(angleB),
                y + len * Math.cos(angleB),
                angleB,
                len
            );
        }
    };

    var draw = function(fromX, fromY, toX, toY) {
        var radius = Math.abs(fromX - toX);

        if (drawLines) {
            context.beginPath();
            context.lineWidth = width || 1;
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.stroke();
        }

        if (drawEllipses) {
            var r = Math.round(Math.random() * 65) + 190;
            var g = Math.round(Math.random() * 65) + 190;
            var b = Math.round(Math.random() * 65) + 190;
            var a = Math.random() / 8;
            var rad;

            if (radius > softRadiusMin) {
                rad = context.createRadialGradient(fromX, fromY, 1, fromX, fromY, radius);
                rad.addColorStop(0, 'rgba(' + [r,g,b,a].join(',') + ')');
                rad.addColorStop(1, 'rgba(' + [r,g,b,a / 4].join(',') + ')');

                context.fillStyle = rad;
            } else {
                context.fillStyle = 'rgba(' + [r,g,b,a].join(',') + ')';
            }

            context.beginPath();
            context.arc(
                fromX,
                fromY,
                radius,
                0,
                2 * Math.PI,
                false
            );
            context.closePath();
            context.fill();
        }
    };

    return {
        init: init,
        resize: resize
    };
}());