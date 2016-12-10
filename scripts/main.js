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

      this.svg.setAttribute("width", w);
      this.svg.setAttribute("height", h);
      this.svgGroup.setAttribute("transform", `translate(${w / 2}, ${h / 2})`);
    }
  }

  class Bars {
    constructor (canvas, w, h) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.width = w;
      this.height = h;
      this.colors = ["#C9518A", "#39B7C4", "#586086"];
      this.barHeight = 128;
      this.ends = [];
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.context.globalAlpha = 0.08;

      const barTotal = Math.ceil((w + h) / this.barHeight);

      for (let i = 0; i < barTotal; i++) {
        let end = Math.random() * (w / 2);

        if (i === 0 || i % 2 === 0) {
          end += (w / 2);
        }

        this.ends.push(end);
      }

      this.onScroll();
    }

    onScroll (factor=0) {
      let colorIndex = 0;
      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;

      this.context.clearRect(0, 0, this.width, this.height);
      this.context.save();
      this.context.translate(halfWidth, halfHeight);
      this.context.rotate(-45 * Math.PI / 180);
      this.context.translate(-halfWidth, -this.height);

      for (let i = 0; i < this.ends.length; i++) {
        let end = this.ends[i];
        this.context.fillStyle = this.colors[colorIndex];

        if (end <= halfWidth) {
          end += factor;
          this.context.fillRect(
            end - this.width * 4,
            i * this.barHeight,
            this.width * 4,
            this.barHeight
          );
        } else {
          end -= factor;
          this.context.fillRect(
            end,
            i * this.barHeight,
            end + this.width,
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

  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  let headerCanvas = document.querySelector("#headerCanvas");
  let logo = new Logo();
  let bars = new Bars(headerCanvas, winWidth, winHeight);
  let header = new Section("header");
  let about = new Section("#about");

  function onResize () {
    header.onResize();
    about.onResize();
    logo.onResize();
  }

  onResize();

  window.addEventListener("resize", ()=> {
    onResize();
  }, false);

  window.addEventListener("scroll", ()=> {
    bars.onScroll(window.scrollY);
  }, false);

  const logCss = "background-color:#586086; color:#39B7C4;";
  const year = new Date().getFullYear();
  console.log(`%c oh, hai! \n © ${year} BILDEPUNKT.COM | ALL RIGHTS RESERVED `, logCss);

}).call(this);
