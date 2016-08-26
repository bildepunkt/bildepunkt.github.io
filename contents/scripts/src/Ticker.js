
export default class Ticker {
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
