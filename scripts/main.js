(()=> {

  class Section {
    constructor (selector="section") {
      this.section = document.querySelector(selector);
      window.addEventListener("resize", this.resize.bind(this), false);
      this.resize();
    }

    resize () {
      this.section.style.height = `${window.innerHeight}px`;
    }
  }

  const year = new Date().getFullYear();
  const logCss = "background-color:#586086; color:#39B7C4;";

  new Section("header");

  console.log(`%c oh, hai! \n © ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED `, logCss);

}).call(this);
