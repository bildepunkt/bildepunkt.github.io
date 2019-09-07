"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Logger = function Logger(year) {
    _classCallCheck(this, Logger);

    var logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
    console.log("%c oh, hai! \n \xA9 " + year + " BILDEPUNKT.COM | ALL RIGHTS RESERVED ", logCss);
  };

  var Footer = function Footer(year) {
    _classCallCheck(this, Footer);

    document.querySelector('footer span').innerHTML = year;
  };

  var year = new Date().getFullYear();
  new Logger(year);
  new Footer(year);
}).call(undefined);

//# sourceMappingURL=main.js.map