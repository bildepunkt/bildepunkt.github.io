/**
 * @copyright 2016 Chris Peters
 * @license ISC
 * @param {Any}      entity the entity to assign value to
 * @param {String}   prop   The entity's property name 
 * @param {Any}      from   initial value
 * @param {Any}      end    end value
 * @param {Integer}  ms     The length of the tween in milliseconds
 * @param {Function} easing The easing function
 */
export default class Tween {
    constructor(entity, prop, start, end, ms, easing, onComplete) {
        if (typeof entity === "function") {
            this.callback = entity;
            this.start = prop;
            this.end = start;
            this.ms = end;
            this.easing = ms;
            this.onComplete = easing;
        } else {
            this.entity = entity;
            this.prop = prop;
            this.start = start;
            this.end = end;
            this.ms = ms;
            this.easing = easing;
            this.onComplete = onComplete;
        }

        this.currentFrame = 0;
        this.totalFrames  = Math.round( this.ms / (1000 / 60) );

        this.update = this.update.bind(this);
        document.addEventListener("ontick", this.update, false);
    }

    isComplete() {
        return this.currentFrame >= this.totalFrames;
    }

    update() {
        if (this.currentFrame < this.totalFrames) {
            if (typeof this.callback === "function") {
                this.callback(
                    this.easing(
                        this.currentFrame,
                        this.start,
                        this.end,
                        this.totalFrames
                    )
                );
            } else {
                this.entity[this.prop] = this.easing(
                    this.currentFrame,
                    this.start,
                    this.end,
                    this.totalFrames
                );
            }
        } else {
            if (this.onComplete) {
                this.onComplete();
            }

            document.removeEventListener("ontick", this.update, false);
        }

        this.currentFrame += 1;
    }
}