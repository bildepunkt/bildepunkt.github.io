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