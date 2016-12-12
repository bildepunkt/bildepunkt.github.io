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

  class Bars {
    constructor (selector="#headerCanvas") {
      this.canvas = document.querySelector(selector);
      this.context = this.canvas.getContext("2d");
      this.colors = ["#C9518A", "#39B7C4", "#586086"];
      this.barHeight = 128;
      this.ends = [];

      this.onResize();

      const width = window.innerWidth;
      const height = window.innerHeight;
      const barTotal = Math.ceil((width + height) / this.barHeight);

      for (let i = 0; i < barTotal; i++) {
        let end = Math.random() * (width / 2);

        if (i === 0 || i % 2 === 0) {
          end += (width / 2);
        }

        this.ends.push(end);
      }

      this.onScroll();
    }

    onResize () {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    onScroll (factor=0) {
      let colorIndex = 0;
      const halfWidth = this.canvas.width / 2;
      const halfHeight = this.canvas.height / 2;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.save();
      this.context.globalAlpha = 0.08;
      this.context.translate(halfWidth, halfHeight);
      this.context.rotate(-45 * Math.PI / 180);
      this.context.translate(-halfWidth, -this.canvas.height);

      for (let i = 0; i < this.ends.length; i++) {
        let end = this.ends[i];
        this.context.fillStyle = this.colors[colorIndex];

        if (end <= halfWidth) {
          end += factor;
          this.context.fillRect(
            end - this.canvas.width * 4,
            i * this.barHeight,
            this.canvas.width * 4,
            this.barHeight
          );
        } else {
          end -= factor;
          this.context.fillRect(
            end,
            i * this.barHeight,
            end + this.canvas.width * 4,
            this.barHeight
          );
        }

        colorIndex += 1;

        if (colorIndex === this.colors.length) {
          colorIndex = 0;
        }
      }

      this.context.restore();
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

  function windowScroll () {
    bars.onScroll(window.scrollY);
  }

  function windowResize () {
    header.onResize();
    about.onResize();
    logo.onResize();
    
    bars.onResize();
    bars.onScroll();
  }

  let resizeDelay = new DelayCallback(windowResize);
  let logo = new Logo();
  let bars = new Bars();
  let header = new Section("header");
  let about = new Section("#about");
  let delayResize = resizeDelay.call.bind(resizeDelay);

  windowResize();

  window.addEventListener("resize", delayResize, false);
  window.addEventListener("orientationchange", delayResize, false);
  window.addEventListener("scroll", windowScroll, false);

  const logCss = "background-color:#586086; color:#39B7C4; font-size:16px";
  const year = new Date().getFullYear();
  console.log(`%c oh, hai! \n © ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED `, logCss);

}).call(this);
