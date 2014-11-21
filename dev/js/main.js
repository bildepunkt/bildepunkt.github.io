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