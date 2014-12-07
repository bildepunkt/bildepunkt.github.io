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