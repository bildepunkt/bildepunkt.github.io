/**
 *
 */
export default class Star {
    /**
     * [constructor description]
     * @param  {[type]} options [description]
     */
    constructor(options) {
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

    /**
     * [getFill description]
     * @return {[type]} [description]
     */
    getFill() {
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

    /**
     * [getRandRGB description]
     * @return {[type]} [description]
     */
    getRandRGB() {
        return Math.min(
            Math.round(Math.random() * 255) + this.randRGBMin,
            255
        );
    }
}
