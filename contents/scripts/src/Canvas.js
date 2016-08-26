
export default class Canvas {
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
