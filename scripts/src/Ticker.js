/**
 *
 */
export default class Ticker {
    static start() {
        this.update();
    }

    static pause() {
        this.paused = true;
    }

    static resume() {
        this.paused = false;
        this.start();
    }

    static update() {
        if (this.paused) {
            return;
        }

        document.dispatchEvent(this.event);
        this.ticks++;

        window.requestAnimationFrame(this.update.bind(this));
    }
}

// static props
Ticker.paused = false;
Ticker.ticks = 0;
Ticker.event = new CustomEvent('ontick', {
    detail: {
        ticks: Ticker.ticks
    }
});
