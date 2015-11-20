/**
 *
 */
import Star from './Star';

export default class Starfield {
    constructor(options) {
        this.options = {
            count: 64,
            canvas: null,
            handleResize: true
        };

        this.stars = null;
        this.options = Object.assign(this.options, options || {});

        this.populateField();

        if (this.options.handleResize) {
            window.addEventListener('resize', this.handleResize.bind(this), false);
        }
    }

    handleResize() {
        this.populateField();
    }

    populateField() {
        let { count } = this.options;

        this.stars = [];

        while (--count) {
            this.stars.push(new Star({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                canvas: this.options.canvas,
                radius: Math.round(Math.random() * 4),
                opacity: 0.5 + Math.round((Math.random() - 0.5) * 100) / 100
            }));
        }

        this.render();
    }

    render() {
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
