/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Ticker = __webpack_require__(1);
	
	var _Ticker2 = _interopRequireDefault(_Ticker);
	
	var _Tween = __webpack_require__(2);
	
	var _Tween2 = _interopRequireDefault(_Tween);
	
	var _easing = __webpack_require__(3);
	
	var _Galaxy = __webpack_require__(4);
	
	var _Galaxy2 = _interopRequireDefault(_Galaxy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.onload = function () {
	    new _Ticker2.default();
	
	    var header = document.getElementById("header");
	    var staticBg = document.getElementById("static_background");
	    var vpHeight = window.innerHeight + "px";
	
	    header.style.height = vpHeight;
	    staticBg.style.height = vpHeight;
	
	    document.body.style.opacity = 0;
	    document.body.style.display = "block";
	    new _Tween2.default(document.body.style, "opacity", 0, 1, 1000, _easing.easeOut);
	
	    new _Galaxy2.default();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Ticker = function () {
	    function Ticker() {
	        _classCallCheck(this, Ticker);
	
	        this.ticks = 0;
	        this.event = new CustomEvent("ontick", {
	            detail: { ticks: this.ticks }
	        });
	
	        this.update = this.update.bind(this);
	        this.update();
	    }
	
	    _createClass(Ticker, [{
	        key: "update",
	        value: function update() {
	            document.dispatchEvent(this.event);
	            this.ticks++;
	            window.requestAnimationFrame(this.update);
	        }
	    }]);
	
	    return Ticker;
	}();
	
	exports.default = Ticker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Tween = function () {
	    function Tween(entity, prop, start, end, ms, easing, onComplete) {
	        _classCallCheck(this, Tween);
	
	        this.entity = entity;
	        this.prop = prop;
	        this.start = start;
	        this.end = end;
	        this.ms = ms;
	        this.easing = easing;
	        this.onComplete = onComplete;
	        this.currentFrame = 0;
	        this.totalFrames = Math.round(this.ms / (1000 / 60));
	
	        this.update = this.update.bind(this);
	        document.addEventListener("ontick", this.update, false);
	    }
	
	    _createClass(Tween, [{
	        key: "isComplete",
	        value: function isComplete() {
	            return this.currentFrame >= this.totalFrames;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            if (this.currentFrame < this.totalFrames) {
	                this.entity[this.prop] = this.easing(this.currentFrame, this.start, this.end, this.totalFrames);
	            } else {
	                if (this.onComplete) {
	                    this.onComplete();
	                }
	
	                document.removeEventListener("ontick", this.update, false);
	            }
	
	            this.currentFrame += 1;
	        }
	    }]);
	
	    return Tween;
	}();
	
	exports.default = Tween;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @param  {number} t current time
	 * @param  {number} b start value
	 * @param  {number} c change in value
	 * @param  {number} d duration
	 * @return {number}   the new position   
	 */
	var linear = exports.linear = function linear(t, b, c, d) {
	    return c * t / d + b;
	};
	
	// quadradic
	var easeIn = exports.easeIn = function easeIn(t, b, c, d) {
	    t /= d;
	    return c * t * t + b;
	};
	
	var easeOut = exports.easeOut = function easeOut(t, b, c, d) {
	    t /= d;
	    return -c * t * (t - 2) + b;
	};
	
	var easeInOut = exports.easeInOut = function easeInOut(t, b, c, d) {
	    t /= d;
	    return -c * t * (t - 2) + b;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Canvas = __webpack_require__(5);
	
	var _Canvas2 = _interopRequireDefault(_Canvas);
	
	var _Starfield = __webpack_require__(6);
	
	var _Starfield2 = _interopRequireDefault(_Starfield);
	
	var _Attractor = __webpack_require__(8);
	
	var _Attractor2 = _interopRequireDefault(_Attractor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Galaxy = function () {
	    function Galaxy() {
	        var _this = this;
	
	        _classCallCheck(this, Galaxy);
	
	        this.canvas1 = new _Canvas2.default("galaxy1");
	        this.canvas2 = new _Canvas2.default("galaxy2");
	        this.canvasEl1 = this.canvas1.getEl();
	        this.canvasEl2 = this.canvas2.getEl();
	
	        this.attractor1 = new _Attractor2.default({
	            magnitude: -0.08,
	            drag: 12
	        });
	        this.attractor2 = new _Attractor2.default({
	            magnitude: -0.04,
	            drag: 12
	        });
	
	        this.mouseX = 0;
	        this.mouseY = 0;
	
	        new _Starfield2.default({
	            canvas: this.canvas1,
	            count: Math.round(window.innerWidth / 8)
	        });
	        new _Starfield2.default({
	            canvas: this.canvas2,
	            count: Math.round(window.innerWidth / 8)
	        });
	
	        window.addEventListener("mousemove", function (e) {
	            _this.mouseX = e.clientX - window.innerWidth / 2;
	            _this.mouseY = e.clientY - window.innerHeight / 2;
	        }, false);
	
	        this.update = this.update.bind(this);
	        document.addEventListener('ontick', this.update, false);
	    }
	
	    _createClass(Galaxy, [{
	        key: 'update',
	        value: function update() {
	            this.attractor1.update(this.mouseX, this.mouseY);
	            this.attractor2.update(this.mouseX, this.mouseY);
	
	            var t1 = this.attractor1.getTarget();
	            var t2 = this.attractor2.getTarget();
	
	            this.canvasEl1.style.left = t1.x + 'px';
	            this.canvasEl1.style.top = t1.y + 'px';
	
	            this.canvasEl2.style.left = t2.x + 'px';
	            this.canvasEl2.style.top = t2.y + 'px';
	        }
	    }]);
	
	    return Galaxy;
	}();
	
	exports.default = Galaxy;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Canvas = function () {
	    function Canvas(id) {
	        _classCallCheck(this, Canvas);
	
	        this.el = document.getElementById(id);
	        this.context = this.el.getContext('2d');
	
	        this.handleResize = this.handleResize.bind(this);
	        window.addEventListener("resize", this.handleResize, false);
	        this.handleResize();
	    }
	
	    _createClass(Canvas, [{
	        key: "handleResize",
	        value: function handleResize() {
	            this.el.width = window.innerWidth;
	            this.el.height = window.innerHeight;
	        }
	    }, {
	        key: "getEl",
	        value: function getEl() {
	            return this.el;
	        }
	    }, {
	        key: "getContext",
	        value: function getContext() {
	            return this.context;
	        }
	    }]);
	
	    return Canvas;
	}();
	
	exports.default = Canvas;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Star = __webpack_require__(7);
	
	var _Star2 = _interopRequireDefault(_Star);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Starfield = function () {
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
	            this.handleResize = this.handleResize.bind(this);
	            window.addEventListener("resize", this.handleResize, false);
	        }
	    }
	
	    _createClass(Starfield, [{
	        key: "handleResize",
	        value: function handleResize() {
	            this.populateField();
	        }
	    }, {
	        key: "populateField",
	        value: function populateField() {
	            var count = this.options.count;
	
	
	            this.stars = [];
	
	            while (--count) {
	                this.stars.push(new _Star2.default({
	                    x: Math.random() * window.innerWidth,
	                    y: Math.random() * window.innerHeight,
	                    randRGBMin: 212,
	                    canvas: this.options.canvas,
	                    radius: Math.round(Math.random() * 4),
	                    opacity: 0.5 + Math.round((Math.random() - 0.5) * 100) / 100
	                }));
	            }
	
	            this.render();
	        }
	    }, {
	        key: "render",
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
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
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
	}();
	
	exports.default = Starfield;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Star = function () {
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
	}();
	
	exports.default = Star;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @copyright 2016 Chris Peters
	 * @license ISC
	 */
	
	var Attractor = function () {
	    function Attractor(options) {
	        _classCallCheck(this, Attractor);
	
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
	
	    _createClass(Attractor, [{
	        key: "update",
	        value: function update(x, y) {
	            x = x || 0;
	            y = y || 0;
	
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
	}();
	
	exports.default = Attractor;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map