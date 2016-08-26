
export default class Header {
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
