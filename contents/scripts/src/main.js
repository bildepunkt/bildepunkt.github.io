class Ticker {
    constructor () {
        this.ticks = 0;
        this.event = new CustomEvent("ontick", {
            detail: { ticks: this.ticks }
        });

        this.update = this.update.bind(this);
        this.update();
    }

    update () {
        document.dispatchEvent(this.event);
        this.ticks++;
        window.requestAnimationFrame(this.update);
    }
}

class Attractor {
    constructor (options) {
        this.options = {
            startX: 0,
            startY: 0,
            drag: 4,
            magnitude: 1,
            threshold: 0.2
        };

        this.options = Object.assign(this.options, options || {});

        this.target = {
            x: this.options.startX,
            y: this.options.startY
        };
    }

    update (x=0, y=0) {
        let dx = (x * this.options.magnitude) - this.target.x;
        let dy = (y * this.options.magnitude) - this.target.y;

        this.target.x += (Math.abs(dx) < this.options.threshold) ? dx : dx / this.options.drag;
        this.target.y += (Math.abs(dy) < this.options.threshold) ? dy : dy / this.options.drag;
    }

    getTarget () {
        return this.target;
    }
}

class Canvas {
    constructor (id) {
        this.el = document.getElementById(id);
        this.context = this.el.getContext('2d');

        window.addEventListener("resize", this.handleResize.bind(this), false);
        this.handleResize();
    }

    handleResize () {
        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;
    }
    
    getEl () {
        return this.el;
    }
    
    getContext () {
        return this.context;
    }
}

class Star {
    constructor (options) {
        this.randRGBMin = 236;
        this.useGradient = true;
        this.x = 0;
        this.y = 0;
        this.radius = 8;
        this.opacity = 1;
        this.rgb = null;
        this.canvas = null;

        for (var prop in options) {
            this[prop] = options[prop];
        }

        this.color = this.getFill();
    }

    getFill () {
        let r = this.rgb ? this.rgb.r : this.getRandRGB();
        let g = this.rgb ? this.rgb.g : this.getRandRGB();
        let b = this.rgb ? this.rgb.b : this.getRandRGB();

        // dont render a gradient if size < 1px
        if (this.radius > 1 && this.useGradient) {
            let gradient = this.canvas.getContext().createRadialGradient(
                this.x, this.y, 1, this.x, this.y, this.radius
            );

            gradient.addColorStop(0,
                `rgba( ${[r,g,b,this.opacity].join(',')} )`
            );

            gradient.addColorStop(1,
                `rgba( ${[r,g,b,0].join(',')} )`
            );

            return gradient;
        }

        return `rgba(${[r,g,b,this.opacity].join(',')})`;
    }

    getRandRGB () {
        return Math.min(
            Math.round(Math.random() * 255) + this.randRGBMin, 255
        );
    }
}

class Starfield {
    constructor (options) {
        this.options = {
            count: 64,
            canvas: null,
            handleResize: true
        };

        this.stars = null;

        this.options = Object.assign(this.options, options || {});

        this.populateField();

        if (this.options.handleResize) {
            this.handleResize = this.handleResize.bind(this);
            window.addEventListener("resize", this.handleResize, false);
        }
    }

    handleResize () {
        this.populateField();
    }

    populateField () {
        let { count } = this.options;

        this.stars = [];

        while (--count) {
            this.stars.push(new Star({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                randRGBMin: 212,
                canvas: this.options.canvas,
                radius: Math.round(Math.random() * 4),
                opacity: 0.5 + Math.round((Math.random() - 0.5) * 100) / 100
            }));
        }

        this.render();
    }

    render () {
        let context = this.options.canvas.getContext();

        for (let star of this.stars) {
            context.fillStyle = star.color;
            context.beginPath();
            context.arc(
                star.x,
                star.y,
                star.radius,
                0,
                2 * Math.PI,
                false
            );
            context.closePath();
            context.fill();
        }
    }
}

class Galaxy {
    constructor () {
        this.canvas1 = new Canvas("starfield1");
        this.canvas2 = new Canvas("starfield2");
        this.canvasEl1 = this.canvas1.getEl();
        this.canvasEl2 = this.canvas2.getEl();

        this.attractor1 = new Attractor({
            magnitude: -0.06,
            drag: 12
        });
        this.attractor2 = new Attractor({
            magnitude: -0.03,
            drag: 12
        });

        this.mouseX = 0;
        this.mouseY = 0;

        new Starfield({
            canvas: this.canvas1,
            count: Math.round(window.innerWidth / 32)
        });
        new Starfield({
            canvas: this.canvas2,
            count: Math.round(window.innerWidth / 16)
        });

        window.addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX - window.innerWidth / 2;
            this.mouseY = e.clientY - window.innerHeight / 2;
        }, false);

        document.addEventListener('ontick', this.update.bind(this), false);
    }

    update () {
        this.attractor1.update( this.mouseX, this.mouseY );
        this.attractor2.update( this.mouseX, this.mouseY );

        let t1 = this.attractor1.getTarget();
        let t2 = this.attractor2.getTarget();

        this.canvasEl1.style.left = `${t1.x}px`;
        this.canvasEl1.style.top = `${t1.y}px`;

        this.canvasEl2.style.left = `${t2.x}px`;
        this.canvasEl2.style.top = `${t2.y}px`;
    }
}

class Header {
    constructor (el) {
        this.el = el;
        this.el.style.height = `${window.innerHeight}px`;
        this.el.style.width = `${window.innerWidth}px`;
        
        window.addEventListener("resize", this.handleResize.bind(this), false);
        this.handleResize();
    }

    handleResize () {
        this.el.style.width = `${window.innerWidth}px`;
        this.el.style.height = `${window.innerHeight}px`;
    }
}

function init () {
    let q = document.querySelector.bind(document);
    
    new Header(q("header"));
    new Ticker();
    new Galaxy();

    document.body.className += " all-systems-go";
}

init();
