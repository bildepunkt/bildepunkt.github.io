(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _srcCanvas = require('./src/Canvas');

var _srcCanvas2 = _interopRequireDefault(_srcCanvas);

var _srcStarfield = require('./src/Starfield');

var _srcStarfield2 = _interopRequireDefault(_srcStarfield);

var _srcAttractor = require('./src/Attractor');

var _srcAttractor2 = _interopRequireDefault(_srcAttractor);

var Main = (function () {
    function Main() {
        _classCallCheck(this, Main);

        this.initLogo();
        this.initUniverse();
    }

    _createClass(Main, [{
        key: 'initLogo',
        value: function initLogo() {
            var logo = document.querySelector('#logo');
            var attractor = new _srcAttractor2['default']({
                drag: 12,
                threshold: 0.01,
                startY: -100
            });
            var targetY = -130;
            var targetOpacity = 1;

            logo.style.marginTop = 0;

            function update() {
                var target = attractor.getTarget();

                // use x for opacity here for efficiency
                attractor.update(targetOpacity, targetY);
                logo.style.opacity = target.x;
                logo.style.marginTop = target.y + 'px';

                if (target.y > targetY) {
                    window.requestAnimationFrame(update);
                }

                console.log(target.x);
            }

            update();
        }
    }, {
        key: 'initUniverse',
        value: function initUniverse() {
            var canvas1 = new _srcCanvas2['default']({ id: 'galaxy1' });
            var canvas2 = new _srcCanvas2['default']({ id: 'galaxy2' });

            var canvasEl1 = canvas1.getEl();
            var canvasEl2 = canvas2.getEl();

            var attractor1 = new _srcAttractor2['default']({
                magnitude: -0.08,
                drag: 12
            });
            var attractor2 = new _srcAttractor2['default']({
                magnitude: -0.04,
                drag: 12
            });

            var mouseX = undefined,
                mouseY = undefined;

            new _srcStarfield2['default']({ canvas: canvas1 });
            new _srcStarfield2['default']({ canvas: canvas2 });

            window.addEventListener('mousemove', function (e) {
                mouseX = e.clientX - window.innerWidth / 2;
                mouseY = e.clientY - window.innerHeight / 2;
            }, false);

            function update() {
                attractor1.update(mouseX, mouseY);
                attractor2.update(mouseX, mouseY);

                var t1 = attractor1.getTarget();
                var t2 = attractor2.getTarget();

                canvasEl1.style.left = t1.x + 'px';
                canvasEl1.style.top = t1.y + 'px';

                canvasEl2.style.left = t2.x + 'px';
                canvasEl2.style.top = t2.y + 'px';

                window.requestAnimationFrame(update);
            }

            update();
        }
    }]);

    return Main;
})();

new Main();

},{"./src/Attractor":2,"./src/Canvas":3,"./src/Starfield":5}],2:[function(require,module,exports){
/**
 *
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Attractor = (function () {
    function Attractor(options) {
        _classCallCheck(this, Attractor);

        this.options = {
            startX: 0,
            startY: 0,
            drag: 4,
            magnitude: 1,
            threshold: 0.2
        };

        this.target = {
            x: this.options.startX,
            y: this.options.startY
        };

        this.options = Object.assign(this.options, options || {});
    }

    _createClass(Attractor, [{
        key: "update",
        value: function update(x, y) {
            x = x || this.startX;
            y = y || this.startY;

            var dx = x * this.options.magnitude - this.target.x;
            var dy = y * this.options.magnitude - this.target.y;

            this.target.x += Math.abs(dx) < this.options.threshold ? dx : dx / this.options.drag;
            this.target.y += Math.abs(dy) < this.options.threshold ? dy : dy / this.options.drag;
        }
    }, {
        key: "getTarget",
        value: function getTarget() {
            return this.target;
        }
    }]);

    return Attractor;
})();

exports["default"] = Attractor;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
/**
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
    function Canvas(options) {
        _classCallCheck(this, Canvas);

        this.options = {
            id: 'canvas',
            handleResize: true
        };

        this.options = Object.assign(this.options, options || {});

        this.el = document.querySelector('#' + this.options.id);
        this.context = this.el.getContext('2d');

        if (this.options.handleResize) {
            window.addEventListener('resize', this.handleResize.bind(this), false);
            this.handleResize();
        }
    }

    _createClass(Canvas, [{
        key: 'handleResize',
        value: function handleResize() {
            this.el.width = window.innerWidth;
            this.el.height = window.innerHeight;
        }
    }, {
        key: 'getEl',
        value: function getEl() {
            return this.el;
        }
    }, {
        key: 'getContext',
        value: function getContext() {
            return this.context;
        }
    }]);

    return Canvas;
})();

exports['default'] = Canvas;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
/**
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Star = (function () {
    /**
     * [constructor description]
     * @param  {[type]} options [description]
     */

    function Star(options) {
        _classCallCheck(this, Star);

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

    _createClass(Star, [{
        key: 'getFill',
        value: function getFill() {
            var r = this.rgb ? this.rgb.r : this.getRandRGB();
            var g = this.rgb ? this.rgb.g : this.getRandRGB();
            var b = this.rgb ? this.rgb.b : this.getRandRGB();

            // dont render a gradient if size < 1px
            if (this.radius > 1 && this.useGradient) {
                var gradient = this.canvas.getContext().createRadialGradient(this.x, this.y, 1, this.x, this.y, this.radius);

                gradient.addColorStop(0, 'rgba( ' + [r, g, b, this.opacity].join(',') + ' )');

                gradient.addColorStop(1, 'rgba( ' + [r, g, b, 0].join(',') + ' )');

                return gradient;
            }

            return 'rgba(' + [r, g, b, this.opacity].join(',') + ')';
        }

        /**
         * [getRandRGB description]
         * @return {[type]} [description]
         */
    }, {
        key: 'getRandRGB',
        value: function getRandRGB() {
            return Math.min(Math.round(Math.random() * 255) + this.randRGBMin, 255);
        }
    }]);

    return Star;
})();

exports['default'] = Star;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
/**
 *
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Star = require('./Star');

var _Star2 = _interopRequireDefault(_Star);

var Starfield = (function () {
    function Starfield(options) {
        _classCallCheck(this, Starfield);

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

    _createClass(Starfield, [{
        key: 'handleResize',
        value: function handleResize() {
            this.populateField();
        }
    }, {
        key: 'populateField',
        value: function populateField() {
            var count = this.options.count;

            this.stars = [];

            while (--count) {
                this.stars.push(new _Star2['default']({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    canvas: this.options.canvas,
                    radius: Math.round(Math.random() * 4),
                    opacity: 0.5 + Math.round((Math.random() - 0.5) * 100) / 100
                }));
            }

            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            var context = this.options.canvas.getContext();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.stars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var star = _step.value;

                    context.fillStyle = star.color;
                    context.beginPath();
                    context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
                    context.closePath();
                    context.fill();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return Starfield;
})();

exports['default'] = Starfield;
module.exports = exports['default'];

},{"./Star":4}]},{},[1])


//# sourceMappingURL=bundle.js.map
