(()=> {
  class Logger {
    constructor (year) {
      const logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
      console.log(`%c oh, hai! \n © ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED `, logCss);
    }
  }

  class Footer {
    constructor(year) {
      document.querySelector('footer span').innerHTML = year;
    }
  }

  const year = new Date().getFullYear();
  new Logger(year);
  new Footer(year);

}).call(this);
