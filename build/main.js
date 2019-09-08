"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Logger = function Logger(year) {
    _classCallCheck(this, Logger);

    var logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
    console.log("%c\n-/oo/-'                                    \n':+ssssoooo+:.                             \n+sssssssoooooooo/-'                        \nosssssssooooooooooo+:.                     \nosssssssooooooooooooooo/-'                 \nosssssss-'./oooooooooooooo+:.              \nosssssss-    .:+ooooooooooooo+/-'          \nosssssss-       '-/oooooooooooooo+-.       \nosssssss-           .:+ooooooooooooo+.     \nosssssss-              '-/ooooooooooo:     \nosssssso:'                 ./oooooooo-     \nossso++////-.            .:ossssooooo-     \n+o+///////////:.'    '-/ossssssssssso-     \n'.:///////////////-:ossssssssssssso:.      \n    '-//////////////++ossssssss+:'         \n      '.://///////////++ooo/-              \n      '-/ooo++/////////////:.              \n    .:+sssssssso++/////////////:-'         \n'-/osssssssssssss+:-///////////////-.      \n/+osssssssssso/-'    '.://///////////-     \n///++ossss+:.            .-//////////-     \n///////+:'                 ./o++/////-     \n////////.              '-/ooooooo++//-     \n////////.           .:+ooooooooooooo+.     \n////////.       '-/oooooooooooooo/-'       \n////////.    .:+ooooooooooooo+:.           \n////////.'-/oooooooooooooo/-'              \n//////+++ooooooooooooo+:.                  \n//+++oooooooooooooo/-'                     \n:oooooooooooooo+:-                         \n'-/oooooooo+:'                             \n    .:+o:-'                                \n                                           \n\xA9 " + year + " BILDEPUNKT.COM | ALL RIGHTS RESERVED", logCss);
  };

  var Footer = function Footer(year) {
    _classCallCheck(this, Footer);

    document.querySelector('footer span').innerHTML = year;
  };

  var year = new Date().getFullYear();
  new Logger(year);
  new Footer(year);
}).call(undefined);
