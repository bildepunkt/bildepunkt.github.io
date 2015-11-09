import Canvas from './src/Canvas';
import Starfield from './src/Starfield';
import Attractor from './src/Attractor';

class Main {
    constructor() {
        this.initLogo();
        this.initUniverse();
        this.update();
    }

    initLogo() {
        this.logo = document.querySelector('#logo');
        this.logoAttractor = new Attractor({
            drag: 12,
            threshold: 0.01,
            startY: -60
        });
    }

    initUniverse() {
        this.canvas1 = new Canvas({ id: 'galaxy1' });
        this.canvas2 = new Canvas({ id: 'galaxy2' });

        this.canvasEl1 = this.canvas1.getEl();
        this.canvasEl2 = this.canvas2.getEl();

        this.attractor1 = new Attractor({
            magnitude: -0.08,
            drag: 12
        });
        this.attractor2 = new Attractor({
            magnitude: -0.04,
            drag: 12
        });

        this.mouseX = 0;
        this.mouseY = 0;

        new Starfield({ canvas: this.canvas1 });
        new Starfield({ canvas: this.canvas2 });

        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX - window.innerWidth / 2;
            this.mouseY = e.clientY - window.innerHeight / 2;
        }, false);
    }

    update() {
        // universe
        this.attractor1.update( this.mouseX, this.mouseY );
        this.attractor2.update( this.mouseX, this.mouseY );

        let t1 = this.attractor1.getTarget();
        let t2 = this.attractor2.getTarget();

        this.canvasEl1.style.left = `${t1.x}px`;
        this.canvasEl1.style.top = `${t1.y}px`;

        this.canvasEl2.style.left = `${t2.x}px`;
        this.canvasEl2.style.top = `${t2.y}px`;

        // logo
        this.logoAttractor.update( 1, -130 );
        let logoTarget = this.logoAttractor.getTarget();
        // use x for opacity here for efficiency
        this.logo.style.opacity = logoTarget.x;
        this.logo.style.marginTop = `${logoTarget.y}px`;

        window.requestAnimationFrame(this.update.bind(this));
    }
}

new Main();
