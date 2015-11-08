/**
 *
 */
export default class Canvas {
    constructor(options) {
        this.options = {
            id: 'canvas',
            handleResize: true
        };

        this.options = Object.assign(this.options, options || {});

        this.el = document.querySelector(`#${this.options.id}`);
        this.context = this.el.getContext('2d');

        if (this.options.handleResize) {
            window.addEventListener('resize', this.handleResize.bind(this), false);
            this.handleResize();
        }
    }

    handleResize() {
        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;
    }

    getEl() {
        return this.el;
    }

    getContext() {
        return this.context;
    }
}
