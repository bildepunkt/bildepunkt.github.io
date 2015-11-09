/**
 *
 */
export default class Attractor {
    constructor(options) {
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

    update(x, y) {
        x = x || 0;
        y = y || 0;

        let dx = (x * this.options.magnitude) - this.target.x;
        let dy = (y * this.options.magnitude) - this.target.y;

        this.target.x += (Math.abs(dx) < this.options.threshold) ? dx : dx / this.options.drag;
        this.target.y += (Math.abs(dy) < this.options.threshold) ? dy : dy / this.options.drag;
    }

    getTarget() {
        return this.target;
    }
}
