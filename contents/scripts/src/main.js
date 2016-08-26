import Header from "./Header";
import Ticker from "./Ticker";
import Galaxy from "./galaxy/Galaxy";

function init () {
    let q = document.querySelector.bind(document);
    
    new Header(q("header"));
    new Ticker();
    new Galaxy();

    document.body.className += " all-systems-go";
}

init();
