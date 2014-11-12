var title = (function() {
    var el;
    var vpWidth;
    var vpHeight;

    var init = function(id, manualShow) {
        el = document.getElementById(id);
        el.style.position = 'absolute';

        if (!manualShow) {
            show();
        }

        resize();
    };

    var show = function() {
        el.style.visibility = 'visible';
    };

    var resize = function() {
        vpWidth  = window.innerWidth;
        vpHeight = window.innerHeight;

        el.style.top  = (vpHeight / 2 - el.offsetHeight / 2) + 'px';
        el.style.left = (vpWidth / 2 - el.offsetWidth / 2) + 'px';
    };

    return {
        init: init,
        show: show,
        resize: resize
    };
}());