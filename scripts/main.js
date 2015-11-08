import Canvas from './src/Canvas';
import Starfield from './src/Starfield';
import Attractor from './src/Attractor';

class Main {
    constructor() {
        this.initLogo();
        this.initUniverse();
    }

    initLogo() {
        let logo = document.querySelector('#logo');
        let attractor = new Attractor({
            drag: 12,
            threshold: 0.01,
            startY: -100
        });
        let targetY = -130;
        let targetOpacity = 1;

        logo.style.marginTop = 0;

        function update() {
            let target = attractor.getTarget();

            // use x for opacity here for efficiency
            attractor.update( targetOpacity, targetY );
            logo.style.opacity = target.x;
            logo.style.marginTop = `${target.y}px`;

            if (target.y > targetY) {
                window.requestAnimationFrame(update);
            }

            console.log(target.x);
        }

        update();
    }

    initUniverse() {
        let canvas1 = new Canvas({ id: 'galaxy1' });
        let canvas2 = new Canvas({ id: 'galaxy2' });

        let canvasEl1 = canvas1.getEl();
        let canvasEl2 = canvas2.getEl();

        let attractor1 = new Attractor({
            magnitude: -0.08,
            drag: 12
        });
        let attractor2 = new Attractor({
            magnitude: -0.04,
            drag: 12
        });

        let mouseX, mouseY;

        new Starfield({ canvas: canvas1 });
        new Starfield({ canvas: canvas2 });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX - window.innerWidth / 2;
            mouseY = e.clientY - window.innerHeight / 2;
        }, false);

        function update() {
            attractor1.update( mouseX, mouseY );
            attractor2.update( mouseX, mouseY );

            let t1 = attractor1.getTarget();
            let t2 = attractor2.getTarget();

            canvasEl1.style.left = `${t1.x}px`;
            canvasEl1.style.top = `${t1.y}px`;

            canvasEl2.style.left = `${t2.x}px`;
            canvasEl2.style.top = `${t2.y}px`;

            window.requestAnimationFrame(update);
        }

        update();
    }
}

new Main();
