(()=> {

  class Section {
    constructor (selector="section") {
      this.section = document.querySelector(selector);
    }

    onResize () {
      this.section.style.height = `${window.innerHeight}px`;
    }
  }

  class Logo {
    constructor (svgSelector="#svgLogo") {
      this.svg = document.querySelector(svgSelector);
      this.svgGroup = document.querySelector(`${svgSelector} g`);
    }

    onResize () {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const offsetY = h < 360 ? 264 / 2 : 0;

      this.svg.setAttribute("width", w);
      this.svg.setAttribute("height", h);
      this.svgGroup.setAttribute("transform", `translate(${w / 2}, ${h / 2 + offsetY})`);
    }
  }
  
  class DelayCallback {
    constructor (callback, buffer=256) {
      this.callback = callback;
      this.timeoutId = null;
      this.buffer = buffer;
      this.canCall = false;
    }

    call () {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(this.callback, this.buffer);
    }
  }

  function windowResize () {
    header.onResize();
    logo.onResize();
  }

  let delayCallback = new DelayCallback(windowResize);
  let logo = new Logo();
  let header = new Section("header");
  let delayCall = delayCallback.call.bind(delayCallback);

  windowResize();

  window.addEventListener("resize", delayCall, false);
  window.addEventListener("orientationchange", delayCall, false);

  const logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
  const year = new Date().getFullYear();
  console.log(`%c oh, hai! \n © ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED `, logCss);

}).call(this);
