import { easeOut } from "./easing";
import Header from "./Header";
import Ticker from "./Ticker";
import Tween from "./Tween";
import Galaxy from "./galaxy/Galaxy";

function scrollToArticle (delta) {
    if (delta < window.innerHeight) {
        window.scrollTo(0, delta);
    }
}

function init () {
    let q = document.querySelector.bind(document);
    let scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    new Header(q("header"));
    new Ticker();
    new Galaxy();

    document.body.className += " all-systems-go";

    if (scrollY === 0 && document.body.className.indexOf("article-detail") !== -1) {
        new Tween(scrollToArticle, 0, window.innerHeight - 32, 1000, easeOut);
    }
}

init();
