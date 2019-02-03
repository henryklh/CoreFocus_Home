///#source 1 1 /app_themes/HDTemplate/plugins/tether-1.2.0/dist/js/tether.js
/*! tether 1.2.0 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

function getScrollParent(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;

  if (position === 'fixed') {
    return el;
  }

  var parent = el;
  while (parent = parent.parentNode) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      return parent;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        return parent;
      }
    }
  }

  return document.body;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin(doc) {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = doc._tetherZeroElement;
  if (typeof node === 'undefined') {
    node = doc.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    doc.body.appendChild(node);

    doc._tetherZeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = {};

    var rect = node.getBoundingClientRect();
    for (var k in rect) {
      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
      zeroPosCache[id][k] = rect[k];
    }

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = {};
  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = el.getBoundingClientRect();
  for (var k in rect) {
    box[k] = rect[k];
  }

  var origin = getOrigin(doc);

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

function getScrollBarSize() {
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  return { width: width, height: width };
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  if (el.className instanceof SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getScrollParent: getScrollParent,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParent = _TetherBase$Utils.getScrollParent;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (typeof pendingTimeout !== 'undefined') {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function () {
  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParent !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParent = this.target;
      } else {
        this.scrollParent = getScrollParent(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      if (this.scrollParent !== document) {
        this.scrollParent.addEventListener('scroll', this.position);
      }

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParent !== 'undefined') {
        this.scrollParent.removeEventListener('scroll', this.position);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this3) {
          tethers.splice(i, 1);
          return;
        }
      });
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this4 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this4.getClass('element-attached') + '-' + side);
        all.push(_this4.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this4._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this4.element, _this4._addAttachClasses, all);
        if (!(_this4.options.addTargetClasses === false)) {
          updateClasses(_this4.target, _this4._addAttachClasses, all);
        }

        delete _this4._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this5 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this5.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this5.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var scrollbarSize = undefined;
      if (document.body.scrollWidth > window.innerWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (document.body.scrollHeight > window.innerHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = document.body.scrollHeight - top - height;
        next.page.right = document.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this5.cache('target-offsetparent', function () {
            return getOffsetParent(_this5.target);
          });
          var offsetPosition = _this5.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this6 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this6.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this6.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this6.cache('target-offsetparent', function () {
            return getOffsetParent(_this6.target);
          });

          if (getOffsetParent(_this6.element) !== offsetParent) {
            defer(function () {
              _this6.element.parentNode.removeChild(_this6.element);
              offsetParent.appendChild(_this6.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        var offsetParentIsBody = true;
        var currentNode = this.element.parentNode;
        while (currentNode && currentNode.tagName !== 'BODY') {
          if (getComputedStyle(currentNode).position !== 'static') {
            offsetParentIsBody = false;
            break;
          }

          currentNode = currentNode.parentNode;
        }

        if (!offsetParentIsBody) {
          this.element.parentNode.removeChild(this.element);
          document.body.appendChild(this.element);
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
          elVal = parseFloat(elVal);
          val = parseFloat(val);
        }

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this6.element.style, writeCSS);
        });
      }
    }
  }]);

  return TetherClass;
})();

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParent;
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom') {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top') {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top -= height;
            eAttachment.top = 'bottom';
          }
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top') {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom') {
            top -= targetHeight;
            tAttachment.top = 'top';

            top += height;
            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));

///#source 1 1 /app_themes/HDTemplate/plugins/bootstrap-4-dev/dist/js/bootstrap.js
/*!
 * Bootstrap v4.0.0-alpha.2 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0')
  }
}(jQuery);


+function ($) {

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments);
        }
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var _name in TransitionEndEvent) {
      if (el.style[_name] !== undefined) {
        return { end: TransitionEndEvent[_name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        /* eslint-disable no-bitwise */
        prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
        /* eslint-enable no-bitwise */
      } while (document.getElementById(prefix));
      return prefix;
    },

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },

    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },

    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },

    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = undefined;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    IN: 'in'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = (function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Alert, [{
      key: 'close',

      // public

      value: function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      }
    }, {
      key: '_triggerCloseEvent',
      value: function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      }
    }, {
      key: '_removeElement',
      value: function _removeElement(element) {
        $(element).removeClass(ClassName.IN);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: '_destroyElement',
      value: function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: '_handleDismiss',
      value: function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = (function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Button, [{
      key: 'toggle',

      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }

            input.focus();
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREVIOUS: 'prev'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'right',
    LEFT: 'left',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.next, .prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = (function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Carousel, [{
      key: 'next',

      // public

      value: function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      }
    }, {
      key: 'nextWhenVisible',
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREVIOUS);
        }
      }
    }, {
      key: 'pause',
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: 'cycle',
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
        }
      }
    }, {
      key: 'to',
      value: function to(index) {
        var _this2 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this2.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
      }
    }, {
      key: '_keydown',
      value: function _keydown(event) {
        event.preventDefault();

        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case 37:
            this.prev();break;
          case 39:
            this.next();break;
          default:
            return;
        }
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      }
    }, {
      key: '_getItemByDirection',
      value: function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      }
    }, {
      key: '_triggerSlideEvent',
      value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: directionalClassname
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      }
    }, {
      key: '_setActiveIndicatorElement',
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      }
    }, {
      key: '_slide',
      value: function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: directionalClassName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(direction);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName).removeClass(direction);

            $(nextElement).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if (typeof config === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      }
    }, {
      key: '_dataApiClickHandler',
      value: function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.panel > .in, .panel > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = (function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Collapse, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if ($(this._element).hasClass(ClassName.IN)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this4 = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var actives = undefined;
        var activesData = undefined;

        if (this._parent) {
          actives = $.makeArray($(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

          _this4._element.style[dimension] = '';

          _this4.setTransitioning(false);

          $(_this4._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this5 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this5.setTransitioning(false);
          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = 0;

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: 'setTransitioning',
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_getDimension',
      value: function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      }
    }, {
      key: '_getParent',
      value: function _getParent() {
        var _this6 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      }
    }, {
      key: '_addAriaAndCollapsedClass',
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.IN);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }

      // static

    }], [{
      key: '_getTargetFromElement',
      value: function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = (function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Dropdown, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', 'true');

        $(parent).toggleClass(ClassName.OPEN);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            $(this).data(DATA_KEY, data = new Dropdown(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      }
    }, {
      key: '_clearMenus',
      value: function _clearMenus(event) {
        if (event && event.which === 3) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var _parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = { relatedTarget: toggles[i] };

          if (!$(_parent).hasClass(ClassName.OPEN)) {
            continue;
          }

          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(_parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      }
    }, {
      key: '_getParentFromElement',
      value: function _getParentFromElement(element) {
        var parent = undefined;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      }
    }, {
      key: '_dataApiKeydownHandler',
      value: function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        if (!isActive && event.which !== 27 || isActive && event.which === 27) {

          if (event.which === 27) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

        items = items.filter(function (item) {
          return item.offsetWidth || item.offsetHeight;
        });

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === 38 && index > 0) {
          // up
          index--;
        }

        if (event.which === 40 && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  })();

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = (function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Modal, [{
      key: 'toggle',

      // public

      value: function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: 'show',
      value: function show(relatedTarget) {
        var _this7 = this;

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this7._element)) {
              _this7._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
      }
    }, {
      key: 'hide',
      value: function hide(event) {
        if (event) {
          event.preventDefault();
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.IN);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window).off(EVENT_KEY);
        $(document).off(EVENT_KEY);
        $(this._element).off(EVENT_KEY);
        $(this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_showElement',
      value: function _showElement(relatedTarget) {
        var _this8 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.IN);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this8._config.focus) {
            _this8._element.focus();
          }
          $(_this8._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      }
    }, {
      key: '_enforceFocus',
      value: function _enforceFocus() {
        var _this9 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this9._element !== event.target && !$(_this9._element).has(event.target).length) {
            _this9._element.focus();
          }
        });
      }
    }, {
      key: '_setEscapeEvent',
      value: function _setEscapeEvent() {
        var _this10 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === 27) {
              _this10.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      }
    }, {
      key: '_setResizeEvent',
      value: function _setResizeEvent() {
        if (this._isShown) {
          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
        } else {
          $(window).off(Event.RESIZE);
        }
      }
    }, {
      key: '_hideModal',
      value: function _hideModal() {
        var _this11 = this;

        this._element.style.display = 'none';
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this11._resetAdjustments();
          _this11._resetScrollbar();
          $(_this11._element).trigger(Event.HIDDEN);
        });
      }
    }, {
      key: '_removeBackdrop',
      value: function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      }
    }, {
      key: '_showBackdrop',
      value: function _showBackdrop(callback) {
        var _this12 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this12._ignoreBackdropClick) {
              _this12._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this12._config.backdrop === 'static') {
              _this12._element.focus();
            } else {
              _this12.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.IN);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.IN);

          var callbackRemove = function callbackRemove() {
            _this12._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

    }, {
      key: '_handleUpdate',
      value: function _handleUpdate() {
        this._adjustDialog();
      }
    }, {
      key: '_adjustDialog',
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px~';
        }
      }
    }, {
      key: '_resetAdjustments',
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }
    }, {
      key: '_checkScrollbar',
      value: function _checkScrollbar() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          // workaround for missing window.innerWidth in IE8
          var documentElementRect = document.documentElement.getBoundingClientRect();
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      }
    }, {
      key: '_setScrollbar',
      value: function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetScrollbar',
      value: function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      }
    }, {
      key: '_getScrollbarWidth',
      value: function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this13 = this;

    var target = undefined;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this13).is(':visible')) {
          _this13.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = (function () {
    function ScrollSpy(element, config) {
      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

      this.refresh();
      this._process();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(ScrollSpy, [{
      key: 'refresh',

      // public

      value: function refresh() {
        var _this14 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = undefined;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this14._offsets.push(item[0]);
          _this14._targets.push(item[1]);
        });
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      }
    }, {
      key: '_getScrollTop',
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      }
    }, {
      key: '_getScrollHeight',
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: '_process',
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
        }

        if (this._activeTarget && scrollTop < this._offsets[0]) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: '_activate',
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: '_clear',
      value: function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' && config || null;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  })();

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    UL: 'ul:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = (function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tab, [{
      key: 'show',

      // public

      value: function show() {
        var _this15 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
          return;
        }

        var target = undefined;
        var previous = undefined;
        var ulElement = $(this._element).closest(Selector.UL)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (ulElement) {
          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, ulElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this15._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this15._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_activate',
      value: function _activate(element, container, callback) {
        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.IN);
        }
      }
    }, {
      key: '_transitionComplete',
      value: function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.IN);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
})(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = (function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://github.hubspot.com/tether/
   */
  if (window.Tether === undefined) {
    throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: []
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    IN: 'in',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = (function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tooltip, [{
      key: 'enable',

      // public

      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: 'toggleEnabled',
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      }
    }, {
      key: 'show',
      value: function show() {
        var _this16 = this;

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.IN);

          var complete = function complete() {
            var prevHoverState = _this16._hoverState;
            _this16._hoverState = null;

            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this16._leave(null, _this16);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this17 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this17.element.removeAttribute('aria-describedby');
          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
          _this17.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.IN);

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      }

      // protected

    }, {
      key: 'isWithContent',
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }
    }, {
      key: 'setElementContent',
      value: function setElementContent($element, content) {
        var html = this.config.html;
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }
    }, {
      key: 'cleanupTether',
      value: function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      }

      // private

    }, {
      key: '_getAttachment',
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this18 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
          }
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: '_fixTitle',
      value: function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      }
    }, {
      key: '_enter',
      value: function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
          context._hoverState = HoverState.IN;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.IN;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.IN) {
            context.show();
          }
        }, context.config.delay.show);
      }
    }, {
      key: '_leave',
      value: function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      }
    }, {
      key: '_isWithActiveTrigger',
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getDelegateConfig',
      value: function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  })();

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.2';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content',
    ARROW: '.popover-arrow'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = (function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Popover, [{
      key: 'isWithContent',

      // overrides

      value: function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }

      // private

    }, {
      key: '_getContent',
      value: function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',

      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  })(Tooltip);

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
})(jQuery);

}(jQuery);

///#source 1 1 /app_themes/HDTemplate/plugins/owlcarousel2/owl.carousel.js
/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;(function($, window, document, undefined) {

	var drag, state, e;

	/**
	 * Template for status information about drag and touch events.
	 * @private
	 */
	drag = {
		start: 0,
		startX: 0,
		startY: 0,
		current: 0,
		currentX: 0,
		currentY: 0,
		offsetX: 0,
		offsetY: 0,
		distance: null,
		startTime: 0,
		endTime: 0,
		updatedX: 0,
		targetEl: null
	};

	/**
	 * Template for some status informations.
	 * @private
	 */
	state = {
		isTouch: false,
		isScrolling: false,
		isSwiping: false,
		direction: false,
		inMotion: false
	};

	/**
	 * Event functions references.
	 * @private
	 */
	e = {
		_onDragStart: null,
		_onDragMove: null,
		_onDragEnd: null,
		_transitionEnd: null,
		_resizer: null,
		_responsiveCall: null,
		_goToLoop: null,
		_checkVisibile: null
	};

	/**
	 * Creates a carousel.
	 * @class The Owl Carousel.
	 * @public
	 * @param {HTMLElement|jQuery} element - The element to create the carousel for.
	 * @param {Object} [options] - The options
	 */
	function Owl(element, options) {

		/**
		 * Current settings for the carousel.
		 * @public
		 */
		this.settings = null;

		/**
		 * Current options set by the caller including defaults.
		 * @public
		 */
		this.options = $.extend({}, Owl.Defaults, options);

		/**
		 * Plugin element.
		 * @public
		 */
		this.$element = $(element);

		/**
		 * Caches informations about drag and touch events.
		 */
		this.drag = $.extend({}, drag);

		/**
		 * Caches some status informations.
		 * @protected
		 */
		this.state = $.extend({}, state);

		/**
		 * @protected
		 * @todo Must be documented
		 */
		this.e = $.extend({}, e);

		/**
		 * References to the running plugins of this carousel.
		 * @protected
		 */
		this._plugins = {};

		/**
		 * Currently suppressed events to prevent them from beeing retriggered.
		 * @protected
		 */
		this._supress = {};

		/**
		 * Absolute current position.
		 * @protected
		 */
		this._current = null;

		/**
		 * Animation speed in milliseconds.
		 * @protected
		 */
		this._speed = null;

		/**
		 * Coordinates of all items in pixel.
		 * @todo The name of this member is missleading.
		 * @protected
		 */
		this._coordinates = [];

		/**
		 * Current breakpoint.
		 * @todo Real media queries would be nice.
		 * @protected
		 */
		this._breakpoint = null;

		/**
		 * Current width of the plugin element.
		 */
		this._width = null;

		/**
		 * All real items.
		 * @protected
		 */
		this._items = [];

		/**
		 * All cloned items.
		 * @protected
		 */
		this._clones = [];

		/**
		 * Merge values of all items.
		 * @todo Maybe this could be part of a plugin.
		 * @protected
		 */
		this._mergers = [];

		/**
		 * Invalidated parts within the update process.
		 * @protected
		 */
		this._invalidated = {};

		/**
		 * Ordered list of workers for the update process.
		 * @protected
		 */
		this._pipe = [];

		$.each(Owl.Plugins, $.proxy(function(key, plugin) {
			this._plugins[key[0].toLowerCase() + key.slice(1)]
				= new plugin(this);
		}, this));

		$.each(Owl.Pipe, $.proxy(function(priority, worker) {
			this._pipe.push({
				'filter': worker.filter,
				'run': $.proxy(worker.run, this)
			});
		}, this));

		this.setup();
		this.initialize();
	}

	/**
	 * Default options for the carousel.
	 * @public
	 */
	Owl.Defaults = {
		items: 3,
		loop: false,
		center: false,

		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		freeDrag: false,

		margin: 0,
		stagePadding: 0,

		merge: false,
		mergeFit: true,
		autoWidth: false,

		startPosition: 0,
		rtl: false,

		smartSpeed: 250,
		fluidSpeed: false,
		dragEndSpeed: false,

		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: window,
		responsiveClass: false,

		fallbackEasing: 'swing',

		info: false,

		nestedItemSelector: false,
		itemElement: 'div',
		stageElement: 'div',

		// Classes and Names
		themeClass: 'owl-theme',
		baseClass: 'owl-carousel',
		itemClass: 'owl-item',
		centerClass: 'center',
		activeClass: 'active'
	};

	/**
	 * Enumeration for width.
	 * @public
	 * @readonly
	 * @enum {String}
	 */
	Owl.Width = {
		Default: 'default',
		Inner: 'inner',
		Outer: 'outer'
	};

	/**
	 * Contains all registered plugins.
	 * @public
	 */
	Owl.Plugins = {};

	/**
	 * Update pipe.
	 */
	Owl.Pipe = [ {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current = this._items && this._items[this.relative(this._current)];
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var cached = this._clones,
				clones = this.$stage.children('.cloned');

			if (clones.length !== cached.length || (!this.settings.loop && cached.length > 0)) {
				this.$stage.children('.cloned').remove();
				this._clones = [];
			}
		}
	}, {
		filter: [ 'items', 'settings' ],
		run: function() {
			var i, n,
				clones = this._clones,
				items = this._items,
				delta = this.settings.loop ? clones.length - Math.max(this.settings.items * 2, 4) : 0;

			for (i = 0, n = Math.abs(delta / 2); i < n; i++) {
				if (delta > 0) {
					this.$stage.children().eq(items.length + clones.length - 1).remove();
					clones.pop();
					this.$stage.children().eq(0).remove();
					clones.pop();
				} else {
					clones.push(clones.length / 2);
					this.$stage.append(items[clones[clones.length - 1]].clone().addClass('cloned'));
					clones.push(items.length - 1 - (clones.length - 1) / 2);
					this.$stage.prepend(items[clones[clones.length - 1]].clone().addClass('cloned'));
				}
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var rtl = (this.settings.rtl ? 1 : -1),
				width = (this.width() / this.settings.items).toFixed(3),
				coordinate = 0, merge, i, n;

			this._coordinates = [];
			for (i = 0, n = this._clones.length + this._items.length; i < n; i++) {
				merge = this._mergers[this.relative(i)];
				merge = (this.settings.mergeFit && Math.min(merge, this.settings.items)) || merge;
				coordinate += (this.settings.autoWidth ? this._items[this.relative(i)].width() + this.settings.margin : width * merge) * rtl;

				this._coordinates.push(coordinate);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function() {
			var i, n, width = (this.width() / this.settings.items).toFixed(3), css = {
				'width': Math.abs(this._coordinates[this._coordinates.length - 1]) + this.settings.stagePadding * 2,
				'padding-left': this.settings.stagePadding || '',
				'padding-right': this.settings.stagePadding || ''
			};

			this.$stage.css(css);

			css = { 'width': this.settings.autoWidth ? 'auto' : width - this.settings.margin };
			css[this.settings.rtl ? 'margin-left' : 'margin-right'] = this.settings.margin;

			if (!this.settings.autoWidth && $.grep(this._mergers, function(v) { return v > 1 }).length > 0) {
				for (i = 0, n = this._coordinates.length; i < n; i++) {
					css.width = Math.abs(this._coordinates[i]) - Math.abs(this._coordinates[i - 1] || 0) - this.settings.margin;
					this.$stage.children().eq(i).css(css);
				}
			} else {
				this.$stage.children().css(css);
			}
		}
	}, {
		filter: [ 'width', 'items', 'settings' ],
		run: function(cache) {
			cache.current && this.reset(this.$stage.children().index(cache.current));
		}
	}, {
		filter: [ 'position' ],
		run: function() {
			this.animate(this.coordinates(this._current));
		}
	}, {
		filter: [ 'width', 'position', 'items', 'settings' ],
		run: function() {
			var rtl = this.settings.rtl ? 1 : -1,
				padding = this.settings.stagePadding * 2,
				begin = this.coordinates(this.current()) + padding,
				end = begin + this.width() * rtl,
				inner, outer, matches = [], i, n;

			for (i = 0, n = this._coordinates.length; i < n; i++) {
				inner = this._coordinates[i - 1] || 0;
				outer = Math.abs(this._coordinates[i]) + padding * rtl;

				if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end)))
					|| (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
					matches.push(i);
				}
			}

			this.$stage.children('.' + this.settings.activeClass).removeClass(this.settings.activeClass);
			this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass(this.settings.activeClass);

			if (this.settings.center) {
				this.$stage.children('.' + this.settings.centerClass).removeClass(this.settings.centerClass);
				this.$stage.children().eq(this.current()).addClass(this.settings.centerClass);
			}
		}
	} ];

	/**
	 * Initializes the carousel.
	 * @protected
	 */
	Owl.prototype.initialize = function() {
		this.trigger('initialize');

		this.$element
			.addClass(this.settings.baseClass)
			.addClass(this.settings.themeClass)
			.toggleClass('owl-rtl', this.settings.rtl);

		// check support
		this.browserSupport();

		if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
			var imgs, nestedSelector, width;
			imgs = this.$element.find('img');
			nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
			width = this.$element.children(nestedSelector).width();

			if (imgs.length && width <= 0) {
				this.preloadAutoWidthImages(imgs);
				return false;
			}
		}

		this.$element.addClass('owl-loading');

		// create stage
		this.$stage = $('<' + this.settings.stageElement + ' class="owl-stage"/>')
			.wrap('<div class="owl-stage-outer">');

		// append stage
		this.$element.append(this.$stage.parent());

		// append content
		this.replace(this.$element.children().not(this.$stage.parent()));

		// set view width
		this._width = this.$element.width();

		// update view
		this.refresh();

		this.$element.removeClass('owl-loading').addClass('owl-loaded');

		// attach generic events
		this.eventsCall();

		// attach generic events
		this.internalEvents();

		// attach custom control events
		this.addTriggerableEvents();

		this.trigger('initialized');
	};

	/**
	 * Setups the current settings.
	 * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
	 * @todo Support for media queries by using `matchMedia` would be nice.
	 * @public
	 */
	Owl.prototype.setup = function() {
		var viewport = this.viewport(),
			overwrites = this.options.responsive,
			match = -1,
			settings = null;

		if (!overwrites) {
			settings = $.extend({}, this.options);
		} else {
			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			settings = $.extend({}, this.options, overwrites[match]);
			delete settings.responsive;

			// responsive class
			if (settings.responsiveClass) {
				this.$element.attr('class', function(i, c) {
					return c.replace(/\b owl-responsive-\S+/g, '');
				}).addClass('owl-responsive-' + match);
			}
		}

		if (this.settings === null || this._breakpoint !== match) {
			this.trigger('change', { property: { name: 'settings', value: settings } });
			this._breakpoint = match;
			this.settings = settings;
			this.invalidate('settings');
			this.trigger('changed', { property: { name: 'settings', value: this.settings } });
		}
	};

	/**
	 * Updates option logic if necessery.
	 * @protected
	 */
	Owl.prototype.optionsLogic = function() {
		// Toggle Center class
		this.$element.toggleClass('owl-center', this.settings.center);

		// if items number is less than in body
		if (this.settings.loop && this._items.length < this.settings.items) {
			this.settings.loop = false;
		}

		if (this.settings.autoWidth) {
			this.settings.stagePadding = false;
			this.settings.merge = false;
		}
	};

	/**
	 * Prepares an item before add.
	 * @todo Rename event parameter `content` to `item`.
	 * @protected
	 * @returns {jQuery|HTMLElement} - The item container.
	 */
	Owl.prototype.prepare = function(item) {
		var event = this.trigger('prepare', { content: item });

		if (!event.data) {
			event.data = $('<' + this.settings.itemElement + '/>')
				.addClass(this.settings.itemClass).append(item)
		}

		this.trigger('prepared', { content: event.data });

		return event.data;
	};

	/**
	 * Updates the view.
	 * @public
	 */
	Owl.prototype.update = function() {
		var i = 0,
			n = this._pipe.length,
			filter = $.proxy(function(p) { return this[p] }, this._invalidated),
			cache = {};

		while (i < n) {
			if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
				this._pipe[i].run(cache);
			}
			i++;
		}

		this._invalidated = {};
	};

	/**
	 * Gets the width of the view.
	 * @public
	 * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
	 * @returns {Number} - The width of the view in pixel.
	 */
	Owl.prototype.width = function(dimension) {
		dimension = dimension || Owl.Width.Default;
		switch (dimension) {
			case Owl.Width.Inner:
			case Owl.Width.Outer:
				return this._width;
			default:
				return this._width - this.settings.stagePadding * 2 + this.settings.margin;
		}
	};

	/**
	 * Refreshes the carousel primarily for adaptive purposes.
	 * @public
	 */
	Owl.prototype.refresh = function() {
		if (this._items.length === 0) {
			return false;
		}

		var start = new Date().getTime();

		this.trigger('refresh');

		this.setup();

		this.optionsLogic();

		// hide and show methods helps here to set a proper widths,
		// this prevents scrollbar to be calculated in stage width
		this.$stage.addClass('owl-refresh');

		this.update();

		this.$stage.removeClass('owl-refresh');

		this.state.orientation = window.orientation;

		this.watchVisibility();

		this.trigger('refreshed');
	};

	/**
	 * Save internal event references and add event based functions.
	 * @protected
	 */
	Owl.prototype.eventsCall = function() {
		// Save events references
		this.e._onDragStart = $.proxy(function(e) {
			this.onDragStart(e);
		}, this);
		this.e._onDragMove = $.proxy(function(e) {
			this.onDragMove(e);
		}, this);
		this.e._onDragEnd = $.proxy(function(e) {
			this.onDragEnd(e);
		}, this);
		this.e._onResize = $.proxy(function(e) {
			this.onResize(e);
		}, this);
		this.e._transitionEnd = $.proxy(function(e) {
			this.transitionEnd(e);
		}, this);
		this.e._preventClick = $.proxy(function(e) {
			this.preventClick(e);
		}, this);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onThrottledResize = function() {
		window.clearTimeout(this.resizeTimer);
		this.resizeTimer = window.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate);
	};

	/**
	 * Checks window `resize` event.
	 * @protected
	 */
	Owl.prototype.onResize = function() {
		if (!this._items.length) {
			return false;
		}

		if (this._width === this.$element.width()) {
			return false;
		}

		if (this.trigger('resize').isDefaultPrevented()) {
			return false;
		}

		this._width = this.$element.width();

		this.invalidate('width');

		this.refresh();

		this.trigger('resized');
	};

	/**
	 * Checks for touch/mouse drag event type and add run event handlers.
	 * @protected
	 */
	Owl.prototype.eventsRouter = function(event) {
		var type = event.type;

		if (type === "mousedown" || type === "touchstart") {
			this.onDragStart(event);
		} else if (type === "mousemove" || type === "touchmove") {
			this.onDragMove(event);
		} else if (type === "mouseup" || type === "touchend") {
			this.onDragEnd(event);
		} else if (type === "touchcancel") {
			this.onDragEnd(event);
		}
	};

	/**
	 * Checks for touch/mouse drag options and add necessery event handlers.
	 * @protected
	 */
	Owl.prototype.internalEvents = function() {
		var isTouch = isTouchSupport(),
			isTouchIE = isTouchSupportIE();

		if (this.settings.mouseDrag){
			this.$stage.on('mousedown', $.proxy(function(event) { this.eventsRouter(event) }, this));
			this.$stage.on('dragstart', function() { return false });
			this.$stage.get(0).onselectstart = function() { return false };
		} else {
			this.$element.addClass('owl-text-select-on');
		}

		if (this.settings.touchDrag && !isTouchIE){
			this.$stage.on('touchstart touchcancel', $.proxy(function(event) { this.eventsRouter(event) }, this));
		}

		// catch transitionEnd event
		if (this.transitionEndVendor) {
			this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, false);
		}

		// responsive
		if (this.settings.responsive !== false) {
			this.on(window, 'resize', $.proxy(this.onThrottledResize, this));
		}
	};

	/**
	 * Handles touchstart/mousedown event.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragStart = function(event) {
		var ev, isTouchEvent, pageX, pageY, animatedPos;

		ev = event.originalEvent || event || window.event;

		// prevent right click
		if (ev.which === 3 || this.state.isTouch) {
			return false;
		}

		if (ev.type === 'mousedown') {
			this.$stage.addClass('owl-grab');
		}

		this.trigger('drag');
		this.drag.startTime = new Date().getTime();
		this.speed(0);
		this.state.isTouch = true;
		this.state.isScrolling = false;
		this.state.isSwiping = false;
		this.drag.distance = 0;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// get stage position left
		this.drag.offsetX = this.$stage.position().left;
		this.drag.offsetY = this.$stage.position().top;

		if (this.settings.rtl) {
			this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width()
				+ this.settings.margin;
		}

		// catch position // ie to fix
		if (this.state.inMotion && this.support3d) {
			animatedPos = this.getTransformProperty();
			this.drag.offsetX = animatedPos;
			this.animate(animatedPos);
			this.state.inMotion = true;
		} else if (this.state.inMotion && !this.support3d) {
			this.state.inMotion = false;
			return false;
		}

		this.drag.startX = pageX - this.drag.offsetX;
		this.drag.startY = pageY - this.drag.offsetY;

		this.drag.start = pageX - this.drag.startX;
		this.drag.targetEl = ev.target || ev.srcElement;
		this.drag.updatedX = this.drag.start;

		// to do/check
		// prevent links and images dragging;
		if (this.drag.targetEl.tagName === "IMG" || this.drag.targetEl.tagName === "A") {
			this.drag.targetEl.draggable = false;
		}

		$(document).on('mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents', $.proxy(function(event) {this.eventsRouter(event)},this));
	};

	/**
	 * Handles the touchmove/mousemove events.
	 * @todo Simplify
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.onDragMove = function(event) {
		var ev, isTouchEvent, pageX, pageY, minValue, maxValue, pull;

		if (!this.state.isTouch) {
			return;
		}

		if (this.state.isScrolling) {
			return;
		}

		ev = event.originalEvent || event || window.event;

		pageX = getTouches(ev).x;
		pageY = getTouches(ev).y;

		// Drag Direction
		this.drag.currentX = pageX - this.drag.startX;
		this.drag.currentY = pageY - this.drag.startY;
		this.drag.distance = this.drag.currentX - this.drag.offsetX;

		// Check move direction
		if (this.drag.distance < 0) {
			this.state.direction = this.settings.rtl ? 'right' : 'left';
		} else if (this.drag.distance > 0) {
			this.state.direction = this.settings.rtl ? 'left' : 'right';
		}
		// Loop
		if (this.settings.loop) {
			if (this.op(this.drag.currentX, '>', this.coordinates(this.minimum())) && this.state.direction === 'right') {
				this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			} else if (this.op(this.drag.currentX, '<', this.coordinates(this.maximum())) && this.state.direction === 'left') {
				this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length);
			}
		} else {
			// pull
			minValue = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
			maxValue = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
			pull = this.settings.pullDrag ? this.drag.distance / 5 : 0;
			this.drag.currentX = Math.max(Math.min(this.drag.currentX, minValue + pull), maxValue + pull);
		}

		// Lock browser if swiping horizontal

		if ((this.drag.distance > 8 || this.drag.distance < -8)) {
			if (ev.preventDefault !== undefined) {
				ev.preventDefault();
			} else {
				ev.returnValue = false;
			}
			this.state.isSwiping = true;
		}

		this.drag.updatedX = this.drag.currentX;

		// Lock Owl if scrolling
		if ((this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === false) {
			this.state.isScrolling = true;
			this.drag.updatedX = this.drag.start;
		}

		this.animate(this.drag.updatedX);
	};

	/**
	 * Handles the touchend/mouseup events.
	 * @protected
	 */
	Owl.prototype.onDragEnd = function(event) {
		var compareTimes, distanceAbs, closest;

		if (!this.state.isTouch) {
			return;
		}

		if (event.type === 'mouseup') {
			this.$stage.removeClass('owl-grab');
		}

		this.trigger('dragged');

		// prevent links and images dragging;
		this.drag.targetEl.removeAttribute("draggable");

		// remove drag event listeners

		this.state.isTouch = false;
		this.state.isScrolling = false;
		this.state.isSwiping = false;

		// to check
		if (this.drag.distance === 0 && this.state.inMotion !== true) {
			this.state.inMotion = false;
			return false;
		}

		// prevent clicks while scrolling

		this.drag.endTime = new Date().getTime();
		compareTimes = this.drag.endTime - this.drag.startTime;
		distanceAbs = Math.abs(this.drag.distance);

		// to test
		if (distanceAbs > 3 || compareTimes > 300) {
			this.removeClick(this.drag.targetEl);
		}

		closest = this.closest(this.drag.updatedX);

		this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
		this.current(closest);
		this.invalidate('position');
		this.update();

		// if pullDrag is off then fire transitionEnd event manually when stick
		// to border
		if (!this.settings.pullDrag && this.drag.updatedX === this.coordinates(closest)) {
			this.transitionEnd();
		}

		this.drag.distance = 0;

		$(document).off('.owl.dragEvents');
	};

	/**
	 * Attaches `preventClick` to disable link while swipping.
	 * @protected
	 * @param {HTMLElement} [target] - The target of the `click` event.
	 */
	Owl.prototype.removeClick = function(target) {
		this.drag.targetEl = target;
		$(target).on('click.preventClick', this.e._preventClick);
		// to make sure click is removed:
		window.setTimeout(function() {
			$(target).off('click.preventClick');
		}, 300);
	};

	/**
	 * Suppresses click event.
	 * @protected
	 * @param {Event} ev - The event arguments.
	 */
	Owl.prototype.preventClick = function(ev) {
		if (ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
		if (ev.stopPropagation) {
			ev.stopPropagation();
		}
		$(ev.target).off('click.preventClick');
	};

	/**
	 * Catches stage position while animate (only CSS3).
	 * @protected
	 * @returns
	 */
	Owl.prototype.getTransformProperty = function() {
		var transform, matrix3d;

		transform = window.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + 'transform');
		// var transform = this.$stage.css(this.vendorName + 'transform')
		transform = transform.replace(/matrix(3d)?\(|\)/g, '').split(',');
		matrix3d = transform.length === 16;

		return matrix3d !== true ? transform[4] : transform[12];
	};

	/**
	 * Gets absolute position of the closest item for a coordinate.
	 * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
	 * @protected
	 * @param {Number} coordinate - The coordinate in pixel.
	 * @return {Number} - The absolute position of the closest item.
	 */
	Owl.prototype.closest = function(coordinate) {
		var position = -1, pull = 30, width = this.width(), coordinates = this.coordinates();

		if (!this.settings.freeDrag) {
			// check closest item
			$.each(coordinates, $.proxy(function(index, value) {
				if (coordinate > value - pull && coordinate < value + pull) {
					position = index;
				} else if (this.op(coordinate, '<', value)
					&& this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
					position = this.state.direction === 'left' ? index + 1 : index;
				}
				return position === -1;
			}, this));
		}

		if (!this.settings.loop) {
			// non loop boundries
			if (this.op(coordinate, '>', coordinates[this.minimum()])) {
				position = coordinate = this.minimum();
			} else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
				position = coordinate = this.maximum();
			}
		}

		return position;
	};

	/**
	 * Animates the stage.
	 * @public
	 * @param {Number} coordinate - The coordinate in pixels.
	 */
	Owl.prototype.animate = function(coordinate) {
		this.trigger('translate');
		this.state.inMotion = this.speed() > 0;

		if (this.support3d) {
			this.$stage.css({
				transform: 'translate3d(' + coordinate + 'px' + ',0px, 0px)',
				transition: (this.speed() / 1000) + 's'
			});
		} else if (this.state.isTouch) {
			this.$stage.css({
				left: coordinate + 'px'
			});
		} else {
			this.$stage.animate({
				left: coordinate
			}, this.speed() / 1000, this.settings.fallbackEasing, $.proxy(function() {
				if (this.state.inMotion) {
					this.transitionEnd();
				}
			}, this));
		}
	};

	/**
	 * Sets the absolute position of the current item.
	 * @public
	 * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
	 * @returns {Number} - The absolute position of the current item.
	 */
	Owl.prototype.current = function(position) {
		if (position === undefined) {
			return this._current;
		}

		if (this._items.length === 0) {
			return undefined;
		}

		position = this.normalize(position);

		if (this._current !== position) {
			var event = this.trigger('change', { property: { name: 'position', value: position } });

			if (event.data !== undefined) {
				position = this.normalize(event.data);
			}

			this._current = position;

			this.invalidate('position');

			this.trigger('changed', { property: { name: 'position', value: this._current } });
		}

		return this._current;
	};

	/**
	 * Invalidates the given part of the update routine.
	 * @param {String} part - The part to invalidate.
	 */
	Owl.prototype.invalidate = function(part) {
		this._invalidated[part] = true;
	}

	/**
	 * Resets the absolute position of the current item.
	 * @public
	 * @param {Number} position - The absolute position of the new item.
	 */
	Owl.prototype.reset = function(position) {
		position = this.normalize(position);

		if (position === undefined) {
			return;
		}

		this._speed = 0;
		this._current = position;

		this.suppress([ 'translate', 'translated' ]);

		this.animate(this.coordinates(position));

		this.release([ 'translate', 'translated' ]);
	};

	/**
	 * Normalizes an absolute or a relative position for an item.
	 * @public
	 * @param {Number} position - The absolute or relative position to normalize.
	 * @param {Boolean} [relative=false] - Whether the given position is relative or not.
	 * @returns {Number} - The normalized position.
	 */
	Owl.prototype.normalize = function(position, relative) {
		var n = (relative ? this._items.length : this._items.length + this._clones.length);

		if (!$.isNumeric(position) || n < 1) {
			return undefined;
		}

		if (this._clones.length) {
			position = ((position % n) + n) % n;
		} else {
			position = Math.max(this.minimum(relative), Math.min(this.maximum(relative), position));
		}

		return position;
	};

	/**
	 * Converts an absolute position for an item into a relative position.
	 * @public
	 * @param {Number} position - The absolute position to convert.
	 * @returns {Number} - The converted position.
	 */
	Owl.prototype.relative = function(position) {
		position = this.normalize(position);
		position = position - this._clones.length / 2;
		return this.normalize(position, true);
	};

	/**
	 * Gets the maximum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.maximum = function(relative) {
		var maximum, width, i = 0, coordinate,
			settings = this.settings;

		if (relative) {
			return this._items.length - 1;
		}

		if (!settings.loop && settings.center) {
			maximum = this._items.length - 1;
		} else if (!settings.loop && !settings.center) {
			maximum = this._items.length - settings.items;
		} else if (settings.loop || settings.center) {
			maximum = this._items.length + settings.items;
		} else if (settings.autoWidth || settings.merge) {
			revert = settings.rtl ? 1 : -1;
			width = this.$stage.width() - this.$element.width();
			while (coordinate = this.coordinates(i)) {
				if (coordinate * revert >= width) {
					break;
				}
				maximum = ++i;
			}
		} else {
			throw 'Can not detect maximum absolute position.'
		}

		return maximum;
	};

	/**
	 * Gets the minimum position for an item.
	 * @public
	 * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
	 * @returns {Number}
	 */
	Owl.prototype.minimum = function(relative) {
		if (relative) {
			return 0;
		}

		return this._clones.length / 2;
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.items = function(position) {
		if (position === undefined) {
			return this._items.slice();
		}

		position = this.normalize(position, true);
		return this._items[position];
	};

	/**
	 * Gets an item at the specified relative position.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
	 */
	Owl.prototype.mergers = function(position) {
		if (position === undefined) {
			return this._mergers.slice();
		}

		position = this.normalize(position, true);
		return this._mergers[position];
	};

	/**
	 * Gets the absolute positions of clones for an item.
	 * @public
	 * @param {Number} [position] - The relative position of the item.
	 * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
	 */
	Owl.prototype.clones = function(position) {
		var odd = this._clones.length / 2,
			even = odd + this._items.length,
			map = function(index) { return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2 };

		if (position === undefined) {
			return $.map(this._clones, function(v, i) { return map(i) });
		}

		return $.map(this._clones, function(v, i) { return v === position ? map(i) : null });
	};

	/**
	 * Sets the current animation speed.
	 * @public
	 * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
	 * @returns {Number} - The current animation speed in milliseconds.
	 */
	Owl.prototype.speed = function(speed) {
		if (speed !== undefined) {
			this._speed = speed;
		}

		return this._speed;
	};

	/**
	 * Gets the coordinate of an item.
	 * @todo The name of this method is missleanding.
	 * @public
	 * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
	 * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
	 */
	Owl.prototype.coordinates = function(position) {
		var coordinate = null;

		if (position === undefined) {
			return $.map(this._coordinates, $.proxy(function(coordinate, index) {
				return this.coordinates(index);
			}, this));
		}

		if (this.settings.center) {
			coordinate = this._coordinates[position];
			coordinate += (this.width() - coordinate + (this._coordinates[position - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1);
		} else {
			coordinate = this._coordinates[position - 1] || 0;
		}

		return coordinate;
	};

	/**
	 * Calculates the speed for a translation.
	 * @protected
	 * @param {Number} from - The absolute position of the start item.
	 * @param {Number} to - The absolute position of the target item.
	 * @param {Number} [factor=undefined] - The time factor in milliseconds.
	 * @returns {Number} - The time in milliseconds for the translation.
	 */
	Owl.prototype.duration = function(from, to, factor) {
		return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
	};

	/**
	 * Slides to the specified item.
	 * @public
	 * @param {Number} position - The position of the item.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.to = function(position, speed) {
		if (this.settings.loop) {
			var distance = position - this.relative(this.current()),
				revert = this.current(),
				before = this.current(),
				after = this.current() + distance,
				direction = before - after < 0 ? true : false,
				items = this._clones.length + this._items.length;

			if (after < this.settings.items && direction === false) {
				revert = before + this._items.length;
				this.reset(revert);
			} else if (after >= items - this.settings.items && direction === true) {
				revert = before - this._items.length;
				this.reset(revert);
			}
			window.clearTimeout(this.e._goToLoop);
			this.e._goToLoop = window.setTimeout($.proxy(function() {
				this.speed(this.duration(this.current(), revert + distance, speed));
				this.current(revert + distance);
				this.update();
			}, this), 30);
		} else {
			this.speed(this.duration(this.current(), position, speed));
			this.current(position);
			this.update();
		}
	};

	/**
	 * Slides to the next item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.next = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) + 1, speed);
	};

	/**
	 * Slides to the previous item.
	 * @public
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 */
	Owl.prototype.prev = function(speed) {
		speed = speed || false;
		this.to(this.relative(this.current()) - 1, speed);
	};

	/**
	 * Handles the end of an animation.
	 * @protected
	 * @param {Event} event - The event arguments.
	 */
	Owl.prototype.transitionEnd = function(event) {

		// if css2 animation then event object is undefined
		if (event !== undefined) {
			event.stopPropagation();

			// Catch only owl-stage transitionEnd event
			if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
				return false;
			}
		}

		this.state.inMotion = false;
		this.trigger('translated');
	};

	/**
	 * Gets viewport width.
	 * @protected
	 * @return {Number} - The width in pixel.
	 */
	Owl.prototype.viewport = function() {
		var width;
		if (this.options.responsiveBaseElement !== window) {
			width = $(this.options.responsiveBaseElement).width();
		} else if (window.innerWidth) {
			width = window.innerWidth;
		} else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};

	/**
	 * Replaces the current content.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The new content.
	 */
	Owl.prototype.replace = function(content) {
		this.$stage.empty();
		this._items = [];

		if (content) {
			content = (content instanceof jQuery) ? content : $(content);
		}

		if (this.settings.nestedItemSelector) {
			content = content.find('.' + this.settings.nestedItemSelector);
		}

		content.filter(function() {
			return this.nodeType === 1;
		}).each($.proxy(function(index, item) {
			item = this.prepare(item);
			this.$stage.append(item);
			this._items.push(item);
			this._mergers.push(item.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}, this));

		this.reset($.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

		this.invalidate('items');
	};

	/**
	 * Adds an item.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {HTMLElement|jQuery|String} content - The item content to add.
	 * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
	 */
	Owl.prototype.add = function(content, position) {
		position = position === undefined ? this._items.length : this.normalize(position, true);

		this.trigger('add', { content: content, position: position });

		if (this._items.length === 0 || position === this._items.length) {
			this.$stage.append(content);
			this._items.push(content);
			this._mergers.push(content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		} else {
			this._items[position].before(content);
			this._items.splice(position, 0, content);
			this._mergers.splice(position, 0, content.find('[data-merge]').andSelf('[data-merge]').attr('data-merge') * 1 || 1);
		}

		this.invalidate('items');

		this.trigger('added', { content: content, position: position });
	};

	/**
	 * Removes an item by its position.
	 * @todo Use `item` instead of `content` for the event arguments.
	 * @public
	 * @param {Number} position - The relative position of the item to remove.
	 */
	Owl.prototype.remove = function(position) {
		position = this.normalize(position, true);

		if (position === undefined) {
			return;
		}

		this.trigger('remove', { content: this._items[position], position: position });

		this._items[position].remove();
		this._items.splice(position, 1);
		this._mergers.splice(position, 1);

		this.invalidate('items');

		this.trigger('removed', { content: null, position: position });
	};

	/**
	 * Adds triggerable events.
	 * @protected
	 */
	Owl.prototype.addTriggerableEvents = function() {
		var handler = $.proxy(function(callback, event) {
			return $.proxy(function(e) {
				if (e.relatedTarget !== this) {
					this.suppress([ event ]);
					callback.apply(this, [].slice.call(arguments, 1));
					this.release([ event ]);
				}
			}, this);
		}, this);

		$.each({
			'next': this.next,
			'prev': this.prev,
			'to': this.to,
			'destroy': this.destroy,
			'refresh': this.refresh,
			'replace': this.replace,
			'add': this.add,
			'remove': this.remove
		}, $.proxy(function(event, callback) {
			this.$element.on(event + '.owl.carousel', handler(callback, event + '.owl.carousel'));
		}, this));

	};

	/**
	 * Watches the visibility of the carousel element.
	 * @protected
	 */
	Owl.prototype.watchVisibility = function() {

		// test on zepto
		if (!isElVisible(this.$element.get(0))) {
			this.$element.addClass('owl-hidden');
			window.clearInterval(this.e._checkVisibile);
			this.e._checkVisibile = window.setInterval($.proxy(checkVisible, this), 500);
		}

		function isElVisible(el) {
			return el.offsetWidth > 0 && el.offsetHeight > 0;
		}

		function checkVisible() {
			if (isElVisible(this.$element.get(0))) {
				this.$element.removeClass('owl-hidden');
				this.refresh();
				window.clearInterval(this.e._checkVisibile);
			}
		}
	};

	/**
	 * Preloads images with auto width.
	 * @protected
	 * @todo Still to test
	 */
	Owl.prototype.preloadAutoWidthImages = function(imgs) {
		var loaded, that, $el, img;

		loaded = 0;
		that = this;
		imgs.each(function(i, el) {
			$el = $(el);
			img = new Image();

			img.onload = function() {
				loaded++;
				$el.attr('src', img.src);
				$el.css('opacity', 1);
				if (loaded >= imgs.length) {
					that.state.imagesLoaded = true;
					that.initialize();
				}
			};

			img.src = $el.attr('src') || $el.attr('data-src') || $el.attr('data-src-retina');
		});
	};

	/**
	 * Destroys the carousel.
	 * @public
	 */
	Owl.prototype.destroy = function() {

		if (this.$element.hasClass(this.settings.themeClass)) {
			this.$element.removeClass(this.settings.themeClass);
		}

		if (this.settings.responsive !== false) {
			$(window).off('resize.owl.carousel');
		}

		if (this.transitionEndVendor) {
			this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
		}

		for ( var i in this._plugins) {
			this._plugins[i].destroy();
		}

		if (this.settings.mouseDrag || this.settings.touchDrag) {
			this.$stage.off('mousedown touchstart touchcancel');
			$(document).off('.owl.dragEvents');
			this.$stage.get(0).onselectstart = function() {};
			this.$stage.off('dragstart', function() { return false });
		}

		// remove event handlers in the ".owl.carousel" namespace
		this.$element.off('.owl');

		this.$stage.children('.cloned').remove();
		this.e = null;
		this.$element.removeData('owlCarousel');

		this.$stage.children().contents().unwrap();
		this.$stage.children().unwrap();
		this.$stage.unwrap();
	};

	/**
	 * Operators to calculate right-to-left and left-to-right.
	 * @protected
	 * @param {Number} [a] - The left side operand.
	 * @param {String} [o] - The operator.
	 * @param {Number} [b] - The right side operand.
	 */
	Owl.prototype.op = function(a, o, b) {
		var rtl = this.settings.rtl;
		switch (o) {
			case '<':
				return rtl ? a > b : a < b;
			case '>':
				return rtl ? a < b : a > b;
			case '>=':
				return rtl ? a <= b : a >= b;
			case '<=':
				return rtl ? a >= b : a <= b;
			default:
				break;
		}
	};

	/**
	 * Attaches to an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The event handler to attach.
	 * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
	 */
	Owl.prototype.on = function(element, event, listener, capture) {
		if (element.addEventListener) {
			element.addEventListener(event, listener, capture);
		} else if (element.attachEvent) {
			element.attachEvent('on' + event, listener);
		}
	};

	/**
	 * Detaches from an internal event.
	 * @protected
	 * @param {HTMLElement} element - The event source.
	 * @param {String} event - The event name.
	 * @param {Function} listener - The attached event handler to detach.
	 * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
	 */
	Owl.prototype.off = function(element, event, listener, capture) {
		if (element.removeEventListener) {
			element.removeEventListener(event, listener, capture);
		} else if (element.detachEvent) {
			element.detachEvent('on' + event, listener);
		}
	};

	/**
	 * Triggers an public event.
	 * @protected
	 * @param {String} name - The event name.
	 * @param {*} [data=null] - The event data.
	 * @param {String} [namespace=.owl.carousel] - The event namespace.
	 * @returns {Event} - The event arguments.
	 */
	Owl.prototype.trigger = function(name, data, namespace) {
		var status = {
			item: { count: this._items.length, index: this.current() }
		}, handler = $.camelCase(
			$.grep([ 'on', name, namespace ], function(v) { return v })
				.join('-').toLowerCase()
		), event = $.Event(
			[ name, 'owl', namespace || 'carousel' ].join('.').toLowerCase(),
			$.extend({ relatedTarget: this }, status, data)
		);

		if (!this._supress[name]) {
			$.each(this._plugins, function(name, plugin) {
				if (plugin.onTrigger) {
					plugin.onTrigger(event);
				}
			});

			this.$element.trigger(event);

			if (this.settings && typeof this.settings[handler] === 'function') {
				this.settings[handler].apply(this, event);
			}
		}

		return event;
	};

	/**
	 * Suppresses events.
	 * @protected
	 * @param {Array.<String>} events - The events to suppress.
	 */
	Owl.prototype.suppress = function(events) {
		$.each(events, $.proxy(function(index, event) {
			this._supress[event] = true;
		}, this));
	}

	/**
	 * Releases suppressed events.
	 * @protected
	 * @param {Array.<String>} events - The events to release.
	 */
	Owl.prototype.release = function(events) {
		$.each(events, $.proxy(function(index, event) {
			delete this._supress[event];
		}, this));
	}

	/**
	 * Checks the availability of some browser features.
	 * @protected
	 */
	Owl.prototype.browserSupport = function() {
		this.support3d = isPerspective();

		if (this.support3d) {
			this.transformVendor = isTransform();

			// take transitionend event name by detecting transition
			var endVendors = [ 'transitionend', 'webkitTransitionEnd', 'transitionend', 'oTransitionEnd' ];
			this.transitionEndVendor = endVendors[isTransition()];

			// take vendor name from transform name
			this.vendorName = this.transformVendor.replace(/Transform/i, '');
			this.vendorName = this.vendorName !== '' ? '-' + this.vendorName.toLowerCase() + '-' : '';
		}

		this.state.orientation = window.orientation;
	};

	/**
	 * Get touch/drag coordinats.
	 * @private
	 * @param {event} - mousedown/touchstart event
	 * @returns {object} - Contains X and Y of current mouse/touch position
	 */

	function getTouches(event) {
		if (event.touches !== undefined) {
			return {
				x: event.touches[0].pageX,
				y: event.touches[0].pageY
			};
		}

		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return {
					x: event.pageX,
					y: event.pageY
				};
			}

		if (event.pageX === undefined) {
			return {
					x: event.clientX,
					y: event.clientY
				};
			}
		}
	}

	/**
	 * Checks for CSS support.
	 * @private
	 * @param {Array} array - The CSS properties to check for.
	 * @returns {Array} - Contains the supported CSS property name and its index or `false`.
	 */
	function isStyleSupported(array) {
		var p, s, fake = document.createElement('div'), list = array;
		for (p in list) {
			s = list[p];
			if (typeof fake.style[s] !== 'undefined') {
				fake = null;
				return [ s, p ];
			}
		}
		return [ false ];
	}

	/**
	 * Checks for CSS transition support.
	 * @private
	 * @todo Realy bad design
	 * @returns {Number}
	 */
	function isTransition() {
		return isStyleSupported([ 'transition', 'WebkitTransition', 'MozTransition', 'OTransition' ])[1];
	}

	/**
	 * Checks for CSS transform support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isTransform() {
		return isStyleSupported([ 'transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ])[0];
	}

	/**
	 * Checks for CSS perspective support.
	 * @private
	 * @returns {String} The supported property name or false.
	 */
	function isPerspective() {
		return isStyleSupported([ 'perspective', 'webkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective' ])[0];
	}

	/**
	 * Checks wether touch is supported or not.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupport() {
		return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
	}

	/**
	 * Checks wether touch is supported or not for IE.
	 * @private
	 * @returns {Boolean}
	 */
	function isTouchSupportIE() {
		return window.navigator.msPointerEnabled;
	}

	/**
	 * The jQuery Plugin for the Owl Carousel
	 * @public
	 */
	$.fn.owlCarousel = function(options) {
		return this.each(function() {
			if (!$(this).data('owlCarousel')) {
				$(this).data('owlCarousel', new Owl(this, options));
			}
		});
	};

	/**
	 * The constructor for the jQuery Plugin
	 * @public
	 */
	$.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the lazy plugin.
	 * @class The Lazy Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Lazy = function(carousel) {

		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Already loaded items.
		 * @protected
		 * @type {Array.<jQuery>}
		 */
		this._loaded = [];

		/**
		 * Event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel change.owl.carousel': $.proxy(function(e) {
				if (!e.namespace) {
					return;
				}

				if (!this._core.settings || !this._core.settings.lazyLoad) {
					return;
				}

				if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
					var settings = this._core.settings,
						n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
						i = ((settings.center && n * -1) || 0),
						position = ((e.property && e.property.value) || this._core.current()) + i,
						clones = this._core.clones().length,
						load = $.proxy(function(i, v) { this.load(v) }, this);

					while (i++ < n) {
						this.load(clones / 2 + this._core.relative(position));
						clones && $.each(this._core.clones(this._core.relative(position++)), load);
					}
				}
			}, this)
		};

		// set the default options
		this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

		// register event handler
		this._core.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 */
	Lazy.Defaults = {
		lazyLoad: false
	}

	/**
	 * Loads all resources of an item at the specified position.
	 * @param {Number} position - The absolute position of the item.
	 * @protected
	 */
	Lazy.prototype.load = function(position) {
		var $item = this._core.$stage.children().eq(position),
			$elements = $item && $item.find('.owl-lazy');

		if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
			return;
		}

		$elements.each($.proxy(function(index, element) {
			var $element = $(element), image,
				url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

			this._core.trigger('load', { element: $element, url: url }, 'lazy');

			if ($element.is('img')) {
				$element.one('load.owl.lazy', $.proxy(function() {
					$element.css('opacity', 1);
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this)).attr('src', url);
			} else {
				image = new Image();
				image.onload = $.proxy(function() {
					$element.css({
						'background-image': 'url(' + url + ')',
						'opacity': '1'
					});
					this._core.trigger('loaded', { element: $element, url: url }, 'lazy');
				}, this);
				image.src = url;
			}
		}, this));

		this._loaded.push($item.get(0));
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Lazy.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this._core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the auto height plugin.
	 * @class The Auto Height Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var AutoHeight = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.autoHeight) {
					this.update();
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.property.name == 'position'){
					this.update();
				}
			}, this),
			'loaded.owl.lazy': $.proxy(function(e) {
				if (this._core.settings.autoHeight && e.element.closest('.' + this._core.settings.itemClass)
					=== this._core.$stage.children().eq(this._core.current())) {
					this.update();
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	AutoHeight.Defaults = {
		autoHeight: false,
		autoHeightClass: 'owl-height'
	};

	/**
	 * Updates the view.
	 */
	AutoHeight.prototype.update = function() {
		this._core.$stage.parent()
			.height(this._core.$stage.children().eq(this._core.current()).height())
			.addClass(this._core.settings.autoHeightClass);
	};

	AutoHeight.prototype.destroy = function() {
		var handler, property;

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the video plugin.
	 * @class The Video Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Video = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Cache all video URLs.
		 * @protected
		 * @type {Object}
		 */
		this._videos = {};

		/**
		 * Current playing item.
		 * @protected
		 * @type {jQuery}
		 */
		this._playing = null;

		/**
		 * Whether this is in fullscreen or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._fullscreen = false;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'resize.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.video && !this.isInFullScreen()) {
					e.preventDefault();
				}
			}, this),
			'refresh.owl.carousel changed.owl.carousel': $.proxy(function(e) {
				if (this._playing) {
					this.stop();
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var $element = $(e.content).find('.owl-video');
				if ($element.length) {
					$element.css('display', 'none');
					this.fetch($element, $(e.content));
				}
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Video.Defaults, this._core.options);

		// register event handlers
		this._core.$element.on(this._handlers);

		this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
			this.play(e);
		}, this));
	};

	/**
	 * Default options.
	 * @public
	 */
	Video.Defaults = {
		video: false,
		videoHeight: false,
		videoWidth: false
	};

	/**
	 * Gets the video ID and the type (YouTube/Vimeo only).
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {jQuery} item - The item containing the video.
	 */
	Video.prototype.fetch = function(target, item) {

		var type = target.attr('data-vimeo-id') ? 'vimeo' : 'youtube',
			id = target.attr('data-vimeo-id') || target.attr('data-youtube-id'),
			width = target.attr('data-width') || this._core.settings.videoWidth,
			height = target.attr('data-height') || this._core.settings.videoHeight,
			url = target.attr('href');

		if (url) {
			id = url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

			if (id[3].indexOf('youtu') > -1) {
				type = 'youtube';
			} else if (id[3].indexOf('vimeo') > -1) {
				type = 'vimeo';
			} else {
				throw new Error('Video URL not supported.');
			}
			id = id[6];
		} else {
			throw new Error('Missing video URL.');
		}

		this._videos[url] = {
			type: type,
			id: id,
			width: width,
			height: height
		};

		item.attr('data-video', url);

		this.thumbnail(target, this._videos[url]);
	};

	/**
	 * Creates video thumbnail.
	 * @protected
	 * @param {jQuery} target - The target containing the video data.
	 * @param {Object} info - The video info object.
	 * @see `fetch`
	 */
	Video.prototype.thumbnail = function(target, video) {

		var tnLink,
			icon,
			path,
			dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
			customTn = target.find('img'),
			srcType = 'src',
			lazyClass = '',
			settings = this._core.settings,
			create = function(path) {
				icon = '<div class="owl-video-play-icon"></div>';

				if (settings.lazyLoad) {
					tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
				} else {
					tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
				}
				target.after(tnLink);
				target.after(icon);
			};

		// wrap video content into owl-video-wrapper div
		target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

		if (this._core.settings.lazyLoad) {
			srcType = 'data-src';
			lazyClass = 'owl-lazy';
		}

		// custom thumbnail
		if (customTn.length) {
			create(customTn.attr(srcType));
			customTn.remove();
			return false;
		}

		if (video.type === 'youtube') {
			path = "http://img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
			create(path);
		} else if (video.type === 'vimeo') {
			$.ajax({
				type: 'GET',
				url: 'http://vimeo.com/api/v2/video/' + video.id + '.json',
				jsonp: 'callback',
				dataType: 'jsonp',
				success: function(data) {
					path = data[0].thumbnail_large;
					create(path);
				}
			});
		}
	};

	/**
	 * Stops the current video.
	 * @public
	 */
	Video.prototype.stop = function() {
		this._core.trigger('stop', null, 'video');
		this._playing.find('.owl-video-frame').remove();
		this._playing.removeClass('owl-video-playing');
		this._playing = null;
	};

	/**
	 * Starts the current video.
	 * @public
	 * @param {Event} ev - The event arguments.
	 */
	Video.prototype.play = function(ev) {
		this._core.trigger('play', null, 'video');

		if (this._playing) {
			this.stop();
		}

		var target = $(ev.target || ev.srcElement),
			item = target.closest('.' + this._core.settings.itemClass),
			video = this._videos[item.attr('data-video')],
			width = video.width || '100%',
			height = video.height || this._core.$stage.height(),
			html, wrap;

		if (video.type === 'youtube') {
			html = '<iframe width="' + width + '" height="' + height + '" src="http://www.youtube.com/embed/'
				+ video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
		} else if (video.type === 'vimeo') {
			html = '<iframe src="http://player.vimeo.com/video/' + video.id + '?autoplay=1" width="' + width
				+ '" height="' + height
				+ '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		}

		item.addClass('owl-video-playing');
		this._playing = item;

		wrap = $('<div style="height:' + height + 'px; width:' + width + 'px" class="owl-video-frame">'
			+ html + '</div>');
		target.after(wrap);
	};

	/**
	 * Checks whether an video is currently in full screen mode or not.
	 * @todo Bad style because looks like a readonly method but changes members.
	 * @protected
	 * @returns {Boolean}
	 */
	Video.prototype.isInFullScreen = function() {

		// if Vimeo Fullscreen mode
		var element = document.fullscreenElement || document.mozFullScreenElement
			|| document.webkitFullscreenElement;

		if (element && $(element).parent().hasClass('owl-video-frame')) {
			this._core.speed(0);
			this._fullscreen = true;
		}

		if (element && this._fullscreen && this._playing) {
			return false;
		}

		// comming back from fullscreen
		if (this._fullscreen) {
			this._fullscreen = false;
			return false;
		}

		// check full screen mode and window orientation
		if (this._playing) {
			if (this._core.state.orientation !== window.orientation) {
				this._core.state.orientation = window.orientation;
				return false;
			}
		}

		return true;
	};

	/**
	 * Destroys the plugin.
	 */
	Video.prototype.destroy = function() {
		var handler, property;

		this._core.$element.off('click.owl.video');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the animate plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Animate = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Animate.Defaults, this.core.options);
		this.swapping = true;
		this.previous = undefined;
		this.next = undefined;

		this.handlers = {
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.previous = this.core.current();
					this.next = e.property.value;
				}
			}, this),
			'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
				this.swapping = e.type == 'translated';
			}, this),
			'translate.owl.carousel': $.proxy(function(e) {
				if (this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
					this.swap();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Animate.Defaults = {
		animateOut: false,
		animateIn: false
	};

	/**
	 * Toggles the animation classes whenever an translations starts.
	 * @protected
	 * @returns {Boolean|undefined}
	 */
	Animate.prototype.swap = function() {

		if (this.core.settings.items !== 1 || !this.core.support3d) {
			return;
		}

		this.core.speed(0);

		var left,
			clear = $.proxy(this.clear, this),
			previous = this.core.$stage.children().eq(this.previous),
			next = this.core.$stage.children().eq(this.next),
			incoming = this.core.settings.animateIn,
			outgoing = this.core.settings.animateOut;

		if (this.core.current() === this.previous) {
			return;
		}

		if (outgoing) {
			left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
			previous.css( { 'left': left + 'px' } )
				.addClass('animated owl-animated-out')
				.addClass(outgoing)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}

		if (incoming) {
			next.addClass('animated owl-animated-in')
				.addClass(incoming)
				.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', clear);
		}
	};

	Animate.prototype.clear = function(e) {
		$(e.target).css( { 'left': '' } )
			.removeClass('animated owl-animated-out owl-animated-in')
			.removeClass(this.core.settings.animateIn)
			.removeClass(this.core.settings.animateOut);
		this.core.transitionEnd();
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Animate.prototype.destroy = function() {
		var handler, property;

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {

	/**
	 * Creates the autoplay plugin.
	 * @class The Autoplay Plugin
	 * @param {Owl} scope - The Owl Carousel
	 */
	var Autoplay = function(scope) {
		this.core = scope;
		this.core.options = $.extend({}, Autoplay.Defaults, this.core.options);

		this.handlers = {
			'translated.owl.carousel refreshed.owl.carousel': $.proxy(function() {
				this.autoplay();
			}, this),
			'play.owl.autoplay': $.proxy(function(e, t, s) {
				this.play(t, s);
			}, this),
			'stop.owl.autoplay': $.proxy(function() {
				this.stop();
			}, this),
			'mouseover.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.pause();
				}
			}, this),
			'mouseleave.owl.autoplay': $.proxy(function() {
				if (this.core.settings.autoplayHoverPause) {
					this.autoplay();
				}
			}, this)
		};

		this.core.$element.on(this.handlers);
	};

	/**
	 * Default options.
	 * @public
	 */
	Autoplay.Defaults = {
		autoplay: false,
		autoplayTimeout: 5000,
		autoplayHoverPause: false,
		autoplaySpeed: false
	};

	/**
	 * @protected
	 * @todo Must be documented.
	 */
	Autoplay.prototype.autoplay = function() {
		if (this.core.settings.autoplay && !this.core.state.videoPlay) {
			window.clearInterval(this.interval);

			this.interval = window.setInterval($.proxy(function() {
				this.play();
			}, this), this.core.settings.autoplayTimeout);
		} else {
			window.clearInterval(this.interval);
		}
	};

	/**
	 * Starts the autoplay.
	 * @public
	 * @param {Number} [timeout] - ...
	 * @param {Number} [speed] - ...
	 * @returns {Boolean|undefined} - ...
	 * @todo Must be documented.
	 */
	Autoplay.prototype.play = function(timeout, speed) {
		// if tab is inactive - doesnt work in <IE10
		if (document.hidden === true) {
			return;
		}

		if (this.core.state.isTouch || this.core.state.isScrolling
			|| this.core.state.isSwiping || this.core.state.inMotion) {
			return;
		}

		if (this.core.settings.autoplay === false) {
			window.clearInterval(this.interval);
			return;
		}

		this.core.next(this.core.settings.autoplaySpeed);
	};

	/**
	 * Stops the autoplay.
	 * @public
	 */
	Autoplay.prototype.stop = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Pauses the autoplay.
	 * @public
	 */
	Autoplay.prototype.pause = function() {
		window.clearInterval(this.interval);
	};

	/**
	 * Destroys the plugin.
	 */
	Autoplay.prototype.destroy = function() {
		var handler, property;

		window.clearInterval(this.interval);

		for (handler in this.handlers) {
			this.core.$element.off(handler, this.handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	};

	$.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the navigation plugin.
	 * @class The Navigation Plugin
	 * @param {Owl} carousel - The Owl Carousel.
	 */
	var Navigation = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Indicates whether the plugin is initialized or not.
		 * @protected
		 * @type {Boolean}
		 */
		this._initialized = false;

		/**
		 * The current paging indexes.
		 * @protected
		 * @type {Array}
		 */
		this._pages = [];

		/**
		 * All DOM elements of the user interface.
		 * @protected
		 * @type {Object}
		 */
		this._controls = {};

		/**
		 * Markup for an indicator.
		 * @protected
		 * @type {Array.<String>}
		 */
		this._templates = [];

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * Overridden methods of the carousel.
		 * @protected
		 * @type {Object}
		 */
		this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		};

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.push($(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'add.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 0, $(e.content).find('[data-dot]').andSelf('[data-dot]').attr('data-dot'));
				}
			}, this),
			'remove.owl.carousel prepared.owl.carousel': $.proxy(function(e) {
				if (this._core.settings.dotsData) {
					this._templates.splice(e.position, 1);
				}
			}, this),
			'change.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					if (!this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
						var current = this._core.current(),
							maximum = this._core.maximum(),
							minimum = this._core.minimum();
						e.data = e.property.value > maximum
							? current >= maximum ? minimum : maximum
							: e.property.value < minimum ? maximum : e.property.value;
					}
				}
			}, this),
			'changed.owl.carousel': $.proxy(function(e) {
				if (e.property.name == 'position') {
					this.draw();
				}
			}, this),
			'refreshed.owl.carousel': $.proxy(function() {
				if (!this._initialized) {
					this.initialize();
					this._initialized = true;
				}
				this._core.trigger('refresh', null, 'navigation');
				this.update();
				this.draw();
				this._core.trigger('refreshed', null, 'navigation');
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

		// register event handlers
		this.$element.on(this._handlers);
	}

	/**
	 * Default options.
	 * @public
	 * @todo Rename `slideBy` to `navBy`
	 */
	Navigation.Defaults = {
		nav: false,
		navRewind: true,
		navText: [ 'prev', 'next' ],
		navSpeed: false,
		navElement: 'div',
		navContainer: false,
		navContainerClass: 'owl-nav',
		navClass: [ 'owl-prev', 'owl-next' ],
		slideBy: 1,
		dotClass: 'owl-dot',
		dotsClass: 'owl-dots',
		dots: true,
		dotsEach: false,
		dotData: false,
		dotsSpeed: false,
		dotsContainer: false,
		controlsClass: 'owl-controls'
	}

	/**
	 * Initializes the layout of the plugin and extends the carousel.
	 * @protected
	 */
	Navigation.prototype.initialize = function() {
		var $container, override,
			options = this._core.settings;

		// create the indicator template
		if (!options.dotsData) {
			this._templates = [ $('<div>')
				.addClass(options.dotClass)
				.append($('<span>'))
				.prop('outerHTML') ];
		}

		// create controls container if needed
		if (!options.navContainer || !options.dotsContainer) {
			this._controls.$container = $('<div>')
				.addClass(options.controlsClass)
				.appendTo(this.$element);
		}

		// create DOM structure for absolute navigation
		this._controls.$indicators = options.dotsContainer ? $(options.dotsContainer)
			: $('<div>').hide().addClass(options.dotsClass).appendTo(this._controls.$container);

		this._controls.$indicators.on('click', 'div', $.proxy(function(e) {
			var index = $(e.target).parent().is(this._controls.$indicators)
				? $(e.target).index() : $(e.target).parent().index();

			e.preventDefault();

			this.to(index, options.dotsSpeed);
		}, this));

		// create DOM structure for relative navigation
		$container = options.navContainer ? $(options.navContainer)
			: $('<div>').addClass(options.navContainerClass).prependTo(this._controls.$container);

		this._controls.$next = $('<' + options.navElement + '>');
		this._controls.$previous = this._controls.$next.clone();

		this._controls.$previous
			.addClass(options.navClass[0])
			.html(options.navText[0])
			.hide()
			.prependTo($container)
			.on('click', $.proxy(function(e) {
				this.prev(options.navSpeed);
			}, this));
		this._controls.$next
			.addClass(options.navClass[1])
			.html(options.navText[1])
			.hide()
			.appendTo($container)
			.on('click', $.proxy(function(e) {
				this.next(options.navSpeed);
			}, this));

		// override public methods of the carousel
		for (override in this._overrides) {
			this._core[override] = $.proxy(this[override], this);
		}
	}

	/**
	 * Destroys the plugin.
	 * @protected
	 */
	Navigation.prototype.destroy = function() {
		var handler, control, property, override;

		for (handler in this._handlers) {
			this.$element.off(handler, this._handlers[handler]);
		}
		for (control in this._controls) {
			this._controls[control].remove();
		}
		for (override in this.overides) {
			this._core[override] = this._overrides[override];
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	/**
	 * Updates the internal state.
	 * @protected
	 */
	Navigation.prototype.update = function() {
		var i, j, k,
			options = this._core.settings,
			lower = this._core.clones().length / 2,
			upper = lower + this._core.items().length,
			size = options.center || options.autoWidth || options.dotData
				? 1 : options.dotsEach || options.items;

		if (options.slideBy !== 'page') {
			options.slideBy = Math.min(options.slideBy, options.items);
		}

		if (options.dots || options.slideBy == 'page') {
			this._pages = [];

			for (i = lower, j = 0, k = 0; i < upper; i++) {
				if (j >= size || j === 0) {
					this._pages.push({
						start: i - lower,
						end: i - lower + size - 1
					});
					j = 0, ++k;
				}
				j += this._core.mergers(this._core.relative(i));
			}
		}
	}

	/**
	 * Draws the user interface.
	 * @todo The option `dotData` wont work.
	 * @protected
	 */
	Navigation.prototype.draw = function() {
		var difference, i, html = '',
			options = this._core.settings,
			$items = this._core.$stage.children(),
			index = this._core.relative(this._core.current());

		if (options.nav && !options.loop && !options.navRewind) {
			this._controls.$previous.toggleClass('disabled', index <= 0);
			this._controls.$next.toggleClass('disabled', index >= this._core.maximum());
		}

		this._controls.$previous.toggle(options.nav);
		this._controls.$next.toggle(options.nav);

		if (options.dots) {
			difference = this._pages.length - this._controls.$indicators.children().length;

			if (options.dotData && difference !== 0) {
				for (i = 0; i < this._controls.$indicators.children().length; i++) {
					html += this._templates[this._core.relative(i)];
				}
				this._controls.$indicators.html(html);
			} else if (difference > 0) {
				html = new Array(difference + 1).join(this._templates[0]);
				this._controls.$indicators.append(html);
			} else if (difference < 0) {
				this._controls.$indicators.children().slice(difference).remove();
			}

			this._controls.$indicators.find('.active').removeClass('active');
			this._controls.$indicators.children().eq($.inArray(this.current(), this._pages)).addClass('active');
		}

		this._controls.$indicators.toggle(options.dots);
	}

	/**
	 * Extends event data.
	 * @protected
	 * @param {Event} event - The event object which gets thrown.
	 */
	Navigation.prototype.onTrigger = function(event) {
		var settings = this._core.settings;

		event.page = {
			index: $.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: settings && (settings.center || settings.autoWidth || settings.dotData
				? 1 : settings.dotsEach || settings.items)
		};
	}

	/**
	 * Gets the current page position of the carousel.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.current = function() {
		var index = this._core.relative(this._core.current());
		return $.grep(this._pages, function(o) {
			return o.start <= index && o.end >= index;
		}).pop();
	}

	/**
	 * Gets the current succesor/predecessor position.
	 * @protected
	 * @returns {Number}
	 */
	Navigation.prototype.getPosition = function(successor) {
		var position, length,
			options = this._core.settings;

		if (options.slideBy == 'page') {
			position = $.inArray(this.current(), this._pages);
			length = this._pages.length;
			successor ? ++position : --position;
			position = this._pages[((position % length) + length) % length].start;
		} else {
			position = this._core.relative(this._core.current());
			length = this._core.items().length;
			successor ? position += options.slideBy : position -= options.slideBy;
		}
		return position;
	}

	/**
	 * Slides to the next item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.next = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
	}

	/**
	 * Slides to the previous item or page.
	 * @public
	 * @param {Number} [speed=false] - The time in milliseconds for the transition.
	 */
	Navigation.prototype.prev = function(speed) {
		$.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
	}

	/**
	 * Slides to the specified item or page.
	 * @public
	 * @param {Number} position - The position of the item or page.
	 * @param {Number} [speed] - The time in milliseconds for the transition.
	 * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
	 */
	Navigation.prototype.to = function(position, speed, standard) {
		var length;

		if (!standard) {
			length = this._pages.length;
			$.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
		} else {
			$.proxy(this._overrides.to, this._core)(position, speed);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
;(function($, window, document, undefined) {
	'use strict';

	/**
	 * Creates the hash plugin.
	 * @class The Hash Plugin
	 * @param {Owl} carousel - The Owl Carousel
	 */
	var Hash = function(carousel) {
		/**
		 * Reference to the core.
		 * @protected
		 * @type {Owl}
		 */
		this._core = carousel;

		/**
		 * Hash table for the hashes.
		 * @protected
		 * @type {Object}
		 */
		this._hashes = {};

		/**
		 * The carousel element.
		 * @type {jQuery}
		 */
		this.$element = this._core.$element;

		/**
		 * All event handlers.
		 * @protected
		 * @type {Object}
		 */
		this._handlers = {
			'initialized.owl.carousel': $.proxy(function() {
				if (this._core.settings.startPosition == 'URLHash') {
					$(window).trigger('hashchange.owl.navigation');
				}
			}, this),
			'prepared.owl.carousel': $.proxy(function(e) {
				var hash = $(e.content).find('[data-hash]').andSelf('[data-hash]').attr('data-hash');
				this._hashes[hash] = e.content;
			}, this)
		};

		// set default options
		this._core.options = $.extend({}, Hash.Defaults, this._core.options);

		// register the event handlers
		this.$element.on(this._handlers);

		// register event listener for hash navigation
		$(window).on('hashchange.owl.navigation', $.proxy(function() {
			var hash = window.location.hash.substring(1),
				items = this._core.$stage.children(),
				position = this._hashes[hash] && items.index(this._hashes[hash]) || 0;

			if (!hash) {
				return false;
			}

			this._core.to(position, false, true);
		}, this));
	}

	/**
	 * Default options.
	 * @public
	 */
	Hash.Defaults = {
		URLhashListener: false
	}

	/**
	 * Destroys the plugin.
	 * @public
	 */
	Hash.prototype.destroy = function() {
		var handler, property;

		$(window).off('hashchange.owl.navigation');

		for (handler in this._handlers) {
			this._core.$element.off(handler, this._handlers[handler]);
		}
		for (property in Object.getOwnPropertyNames(this)) {
			typeof this[property] != 'function' && (this[property] = null);
		}
	}

	$.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

///#source 1 1 /app_themes/HDTemplate/plugins/isotope/imagesloaded.pkgd.min.js
/*!
 * imagesLoaded PACKAGED v3.1.7
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var c=r[o];this.addImage(c)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
///#source 1 1 /app_themes/HDTemplate/plugins/isotope/isotope.pkgd.js
/*!
 * Isotope PACKAGED v2.0.0
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

/**
 * Bridget makes jQuery widgets
 * v1.0.1
 */

( function( window ) {



// -------------------------- utils -------------------------- //

var slice = Array.prototype.slice;

function noop() {}

// -------------------------- definition -------------------------- //

function defineBridget( $ ) {

// bail if no jQuery
if ( !$ ) {
  return;
}

// -------------------------- addOptionMethod -------------------------- //

/**
 * adds option method -> $().plugin('option', {...})
 * @param {Function} PluginClass - constructor class
 */
function addOptionMethod( PluginClass ) {
  // don't overwrite original option method
  if ( PluginClass.prototype.option ) {
    return;
  }

  // option setter
  PluginClass.prototype.option = function( opts ) {
    // bail out if not an object
    if ( !$.isPlainObject( opts ) ){
      return;
    }
    this.options = $.extend( true, this.options, opts );
  };
}


// -------------------------- plugin bridge -------------------------- //

// helper function for logging errors
// $.error breaks jQuery chaining
var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

/**
 * jQuery plugin bridge, access methods like $elem.plugin('method')
 * @param {String} namespace - plugin name
 * @param {Function} PluginClass - constructor class
 */
function bridge( namespace, PluginClass ) {
  // add to jQuery fn namespace
  $.fn[ namespace ] = function( options ) {
    if ( typeof options === 'string' ) {
      // call plugin method when first argument is a string
      // get arguments for method
      var args = slice.call( arguments, 1 );

      for ( var i=0, len = this.length; i < len; i++ ) {
        var elem = this[i];
        var instance = $.data( elem, namespace );
        if ( !instance ) {
          logError( "cannot call methods on " + namespace + " prior to initialization; " +
            "attempted to call '" + options + "'" );
          continue;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === '_' ) {
          logError( "no such method '" + options + "' for " + namespace + " instance" );
          continue;
        }

        // trigger method with arguments
        var returnValue = instance[ options ].apply( instance, args );

        // break look and return first value if provided
        if ( returnValue !== undefined ) {
          return returnValue;
        }
      }
      // return this if no return value
      return this;
    } else {
      return this.each( function() {
        var instance = $.data( this, namespace );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init();
        } else {
          // initialize new instance
          instance = new PluginClass( this, options );
          $.data( this, namespace, instance );
        }
      });
    }
  };

}

// -------------------------- bridget -------------------------- //

/**
 * converts a Prototypical class into a proper jQuery plugin
 *   the class must have a ._init method
 * @param {String} namespace - plugin name, used in $().pluginName
 * @param {Function} PluginClass - constructor class
 */
$.bridget = function( namespace, PluginClass ) {
  addOptionMethod( PluginClass );
  bridge( namespace, PluginClass );
};

return $.bridget;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'jquery-bridget/jquery.bridget',[ 'jquery' ], defineBridget );
} else {
  // get jquery from browser global
  defineBridget( window.jQuery );
}

})( window );

/*!
 * eventie v1.0.5
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * docReady
 * Cross browser DOMContentLoaded event emitter
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false */

( function( window ) {



var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function init( event ) {
  // bail if IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }
  docReady.isReady = true;

  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  eventie.bind( document, 'DOMContentLoaded', init );
  eventie.bind( document, 'readystatechange', init );
  eventie.bind( window, 'load', init );

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  // if RequireJS, then doc is already ready
  docReady.isReady = typeof requirejs === 'function';
  define( 'doc-ready/doc-ready',[ 'eventie/eventie' ], defineDocReady );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( this );

/*!
 * EventEmitter v4.2.7 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (evt instanceof RegExp) {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (evt instanceof RegExp) {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * getStyleProperty v1.0.3
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false, exports: false, module: false */

( function( window ) {



var prefixes = 'Webkit Moz ms Ms O'.split(' ');
var docElemStyle = document.documentElement.style;

function getStyleProperty( propName ) {
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'get-style-property/get-style-property',[],function() {
    return getStyleProperty;
  });
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = getStyleProperty;
} else {
  // browser global
  window.getStyleProperty = getStyleProperty;
}

})( window );

/**
 * getSize v1.1.7
 * measure size of elements
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, exports: false, require: false, module: false */

( function( window, undefined ) {



// -------------------------- helpers -------------------------- //

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

// -------------------------- box sizing -------------------------- //

var boxSizingProp = getStyleProperty('boxSizing');
var isBoxSizeOuter;

/**
 * WebKit measures the outer-width on style.width on border-box elems
 * IE & Firefox measures the inner-width
 */
( function() {
  if ( !boxSizingProp ) {
    return;
  }

  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style[ boxSizingProp ] = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  isBoxSizeOuter = getStyleSize( style.width ) === 200;
  body.removeChild( div );
})();


// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  // use querySeletor if elem is string
  if ( typeof elem === 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display === 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

  // get all measurements
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    value = mungeNonPixel( elem, value );
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

// IE8 returns percent values, not pixels
// taken from jQuery's curCSS
function mungeNonPixel( elem, value ) {
  // IE8 and has percent value
  if ( getComputedStyle || value.indexOf('%') === -1 ) {
    return value;
  }
  var style = elem.style;
  // Remember the original values
  var left = style.left;
  var rs = elem.runtimeStyle;
  var rsLeft = rs && rs.left;

  // Put in the new values to get a computed value out
  if ( rsLeft ) {
    rs.left = elem.currentStyle.left;
  }
  style.left = value;
  value = style.pixelLeft;

  // Revert the changed values
  style.left = left;
  if ( rsLeft ) {
    rs.left = rsLeft;
  }

  return value;
}

return getSize;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD for RequireJS
  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = defineGetSize( require('get-style-property') );
} else {
  // browser global
  window.getSize = defineGetSize( window.getStyleProperty );
}

})( window );

/**
 * matchesSelector helper v1.0.1
 *
 * @name matchesSelector
 *   @param {Element} elem
 *   @param {String} selector
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( global, ElemProto ) {

  

  var matchesMethod = ( function() {
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  // ----- match ----- //

  function match( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  }

  // ----- appendToFragment ----- //

  function checkParent( elem ) {
    // not needed if already has parent
    if ( elem.parentNode ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild( elem );
  }

  // ----- query ----- //

  // fall back to using QSA
  // thx @jonathantneal https://gist.github.com/3062955
  function query( elem, selector ) {
    // append to fragment if no parent
    checkParent( elem );

    // match elem with all selected elems of parent
    var elems = elem.parentNode.querySelectorAll( selector );
    for ( var i=0, len = elems.length; i < len; i++ ) {
      // return true if match
      if ( elems[i] === elem ) {
        return true;
      }
    }
    // otherwise return false
    return false;
  }

  // ----- matchChild ----- //

  function matchChild( elem, selector ) {
    checkParent( elem );
    return match( elem, selector );
  }

  // ----- matchesSelector ----- //

  var matchesSelector;

  if ( matchesMethod ) {
    // IE9 supports matchesSelector, but doesn't work on orphaned elems
    // check for that
    var div = document.createElement('div');
    var supportsOrphans = match( div, 'div' );
    matchesSelector = supportsOrphans ? match : matchChild;
  } else {
    matchesSelector = query;
  }

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( 'matches-selector/matches-selector',[],function() {
      return matchesSelector;
    });
  } else {
    // browser global
    window.matchesSelector = matchesSelector;
  }

})( this, Element.prototype );

/**
 * Outlayer Item
 */

( function( window ) {



// ----- get style ----- //

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
function toDash( str ) {
  return str.replace( /([A-Z])/g, function( $1 ){
    return '-' + $1.toLowerCase();
  });
}

// -------------------------- Outlayer definition -------------------------- //

function outlayerItemDefinition( EventEmitter, getSize, getStyleProperty ) {

// -------------------------- CSS3 support -------------------------- //

var transitionProperty = getStyleProperty('transition');
var transformProperty = getStyleProperty('transform');
var supportsCSS3 = transitionProperty && transformProperty;
var is3d = !!getStyleProperty('perspective');

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProperty ];

// properties that could have vendor prefix
var prefixableProperties = [
  'transform',
  'transition',
  'transitionDuration',
  'transitionProperty'
];

// cache all vendor properties
var vendorProperties = ( function() {
  var cache = {};
  for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
    var prop = prefixableProperties[i];
    var supportedProp = getStyleProperty( prop );
    if ( supportedProp && supportedProp !== prop ) {
      cache[ prop ] = supportedProp;
    }
  }
  return cache;
})();

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EventEmitter
extend( Item.prototype, EventEmitter.prototype );

Item.prototype._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
Item.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

Item.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
Item.prototype.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
Item.prototype.getPosition = function() {
  var style = getStyle( this.element );
  var layoutOptions = this.layout.options;
  var isOriginLeft = layoutOptions.isOriginLeft;
  var isOriginTop = layoutOptions.isOriginTop;
  var x = parseInt( style[ isOriginLeft ? 'left' : 'right' ], 10 );
  var y = parseInt( style[ isOriginTop ? 'top' : 'bottom' ], 10 );

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  var layoutSize = this.layout.size;
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
Item.prototype.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var layoutOptions = this.layout.options;
  var style = {};

  if ( layoutOptions.isOriginLeft ) {
    style.left = ( this.position.x + layoutSize.paddingLeft ) + 'px';
    // reset other property
    style.right = '';
  } else {
    style.right = ( this.position.x + layoutSize.paddingRight ) + 'px';
    style.left = '';
  }

  if ( layoutOptions.isOriginTop ) {
    style.top = ( this.position.y + layoutSize.paddingTop ) + 'px';
    style.bottom = '';
  } else {
    style.bottom = ( this.position.y + layoutSize.paddingBottom ) + 'px';
    style.top = '';
  }

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};


// transform translate function
var translate = is3d ?
  function( x, y ) {
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  } :
  function( x, y ) {
    return 'translate(' + x + 'px, ' + y + 'px)';
  };


Item.prototype._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  // flip cooridinates if origin on right or bottom
  var layoutOptions = this.layout.options;
  transX = layoutOptions.isOriginLeft ? transX : -transX;
  transY = layoutOptions.isOriginTop ? transY : -transY;
  transitionStyle.transform = translate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

// non transition + transform support
Item.prototype.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

// use transition and transforms if supported
Item.prototype.moveTo = supportsCSS3 ?
  Item.prototype._transitionTo : Item.prototype.goTo;

Item.prototype.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
Item.prototype._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
Item.prototype._transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

var itemTransitionProperties = transformProperty && ( toDash( transformProperty ) +
  ',opacity' );

Item.prototype.enableTransition = function(/* style */) {
  // only enable if not already transitioning
  // bug in IE10 were re-setting transition style will prevent
  // transitionend event from triggering
  if ( this.isTransitioning ) {
    return;
  }

  // make transition: foo, bar, baz from style object
  // TODO uncomment this bit when IE10 bug is resolved
  // var transitionValue = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   transitionValue.push( toDash( prop ) );
  // }
  // enable transition styles
  // HACK always enable transform,opacity for IE10
  this.css({
    transitionProperty: itemTransitionProperties,
    transitionDuration: this.layout.options.transitionDuration
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];

// ----- events ----- //

Item.prototype.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

Item.prototype.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform',
  '-moz-transform': 'transform',
  '-o-transform': 'transform'
};

Item.prototype.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

Item.prototype.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
Item.prototype._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: ''
};

Item.prototype.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- show/hide/remove ----- //

// remove element from DOM
Item.prototype.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  this.emitEvent( 'remove', [ this ] );
};

Item.prototype.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  var _this = this;
  this.on( 'transitionEnd', function() {
    _this.removeElem();
    return true; // bind once
  });
  this.hide();
};

Item.prototype.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;
  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true
  });
};

Item.prototype.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;
  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: {
      opacity: function() {
        // check if still hidden
        // during transition, item may have been un-hidden
        if ( this.isHidden ) {
          this.css({ display: 'none' });
        }
      }
    }
  });
};

Item.prototype.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'outlayer/item',[
      'eventEmitter/EventEmitter',
      'get-size/get-size',
      'get-style-property/get-style-property'
    ],
    outlayerItemDefinition );
} else {
  // browser global
  window.Outlayer = {};
  window.Outlayer.Item = outlayerItemDefinition(
    window.EventEmitter,
    window.getSize,
    window.getStyleProperty
  );
}

})( window );

/*!
 * Outlayer v1.2.0
 * the brains and guts of a layout library
 * MIT license
 */

( function( window ) {



// ----- vars ----- //

var document = window.document;
var console = window.console;
var jQuery = window.jQuery;

var noop = function() {};

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}


var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// http://stackoverflow.com/a/384380/182183
var isElement = ( typeof HTMLElement === 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj === 'object' &&
      obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };

// index of helper cause IE8
var indexOf = Array.prototype.indexOf ? function( ary, obj ) {
    return ary.indexOf( obj );
  } : function( ary, obj ) {
    for ( var i=0, len = ary.length; i < len; i++ ) {
      if ( ary[i] === obj ) {
        return i;
      }
    }
    return -1;
  };

function removeFrom( obj, ary ) {
  var index = indexOf( ary, obj );
  if ( index !== -1 ) {
    ary.splice( index, 1 );
  }
}

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
function toDashed( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
}


function outlayerDefinition( eventie, docReady, EventEmitter, getSize, matchesSelector, Item ) {

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  // use element as selector string
  if ( typeof element === 'string' ) {
    element = document.querySelector( element );
  }

  // bail out if not proper element
  if ( !element || !isElement( element ) ) {
    if ( console ) {
      console.error( 'Bad ' + this.constructor.namespace + ' element: ' + element );
    }
    return;
  }

  this.element = element;

  // options
  this.options = extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  if ( this.options.isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  isInitLayout: true,
  isOriginLeft: true,
  isOriginTop: true,
  isResizeBound: true,
  isResizingContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

// inherit EventEmitter
extend( Outlayer.prototype, EventEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
Outlayer.prototype.option = function( opts ) {
  extend( this.options, opts );
};

Outlayer.prototype._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  extend( this.element.style, this.options.containerStyle );

  // bind resize method
  if ( this.options.isResizeBound ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
Outlayer.prototype.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
Outlayer.prototype._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
Outlayer.prototype._filterFindItemElements = function( elems ) {
  // make array of elems
  elems = makeArray( elems );
  var itemSelector = this.options.itemSelector;
  var itemElems = [];

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // check that elem is an actual element
    if ( !isElement( elem ) ) {
      continue;
    }
    // filter & find items if we have an item selector
    if ( itemSelector ) {
      // filter siblings
      if ( matchesSelector( elem, itemSelector ) ) {
        itemElems.push( elem );
      }
      // find children
      var childElems = elem.querySelectorAll( itemSelector );
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        itemElems.push( childElems[j] );
      }
    } else {
      itemElems.push( elem );
    }
  }

  return itemElems;
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
Outlayer.prototype.getItemElements = function() {
  var elems = [];
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    elems.push( this.items[i].element );
  }
  return elems;
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
Outlayer.prototype.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var isInstant = this.options.isLayoutInstant !== undefined ?
    this.options.isLayoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
Outlayer.prototype._init = Outlayer.prototype.layout;

/**
 * logic before any new layout
 */
Outlayer.prototype._resetLayout = function() {
  this.getSize();
};


Outlayer.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
Outlayer.prototype._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option === 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( isElement( option ) ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
Outlayer.prototype.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
Outlayer.prototype._getItemsForLayout = function( items ) {
  var layoutItems = [];
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    if ( !item.isIgnored ) {
      layoutItems.push( item );
    }
  }
  return layoutItems;
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
Outlayer.prototype._layoutItems = function( items, isInstant ) {
  var _this = this;
  function onItemsLayout() {
    _this.emitEvent( 'layoutComplete', [ _this, items ] );
  }

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    onItemsLayout();
    return;
  }

  // emit layoutComplete when done
  this._itemsOn( items, 'layout', onItemsLayout );

  var queue = [];

  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
Outlayer.prototype._processLayoutQueue = function( queue ) {
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var obj = queue[i];
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
  }
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
Outlayer.prototype._postLayout = function() {
  this.resizeContainer();
};

Outlayer.prototype.resizeContainer = function() {
  if ( !this.options.isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
Outlayer.prototype._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * trigger a callback for a collection of items events
 * @param {Array} items - Outlayer.Items
 * @param {String} eventName
 * @param {Function} callback
 */
Outlayer.prototype._itemsOn = function( items, eventName, callback ) {
  var doneCount = 0;
  var count = items.length;
  // event callback
  var _this = this;
  function tick() {
    doneCount++;
    if ( doneCount === count ) {
      callback.call( _this );
    }
    return true; // bind once
  }
  // bind callback
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    item.on( eventName, tick );
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
Outlayer.prototype.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
Outlayer.prototype.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
Outlayer.prototype.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    this.ignore( elem );
  }
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
Outlayer.prototype.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // filter out removed stamp elements
    removeFrom( elem, this.stamps );
    this.unignore( elem );
  }

};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
Outlayer.prototype._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems === 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = makeArray( elems );
  return elems;
};

Outlayer.prototype._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  for ( var i=0, len = this.stamps.length; i < len; i++ ) {
    var stamp = this.stamps[i];
    this._manageStamp( stamp );
  }
};

// update boundingLeft / Top
Outlayer.prototype._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
Outlayer.prototype._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
Outlayer.prototype._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
Outlayer.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

/**
 * Bind layout to window resizing
 */
Outlayer.prototype.bindResize = function() {
  // bind just one listener
  if ( this.isResizeBound ) {
    return;
  }
  eventie.bind( window, 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
Outlayer.prototype.unbindResize = function() {
  if ( this.isResizeBound ) {
    eventie.unbind( window, 'resize', this );
  }
  this.isResizeBound = false;
};

// original debounce by John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

// this fires every resize
Outlayer.prototype.onresize = function() {
  if ( this.resizeTimeout ) {
    clearTimeout( this.resizeTimeout );
  }

  var _this = this;
  function delayed() {
    _this.resize();
    delete _this.resizeTimeout;
  }

  this.resizeTimeout = setTimeout( delayed, 100 );
};

// debounced, layout on resize
Outlayer.prototype.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
Outlayer.prototype.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
Outlayer.prototype.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.reveal = function( items ) {
  var len = items && items.length;
  if ( !len ) {
    return;
  }
  for ( var i=0; i < len; i++ ) {
    var item = items[i];
    item.reveal();
  }
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.hide = function( items ) {
  var len = items && items.length;
  if ( !len ) {
    return;
  }
  for ( var i=0; i < len; i++ ) {
    var item = items[i];
    item.hide();
  }
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
Outlayer.prototype.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    if ( item.element === elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
Outlayer.prototype.getItems = function( elems ) {
  if ( !elems || !elems.length ) {
    return;
  }
  var items = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.remove = function( elems ) {
  elems = makeArray( elems );

  var removeItems = this.getItems( elems );
  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  this._itemsOn( removeItems, 'remove', function() {
    this.emitEvent( 'removeComplete', [ this, removeItems ] );
  });

  for ( var i=0, len = removeItems.length; i < len; i++ ) {
    var item = removeItems[i];
    item.remove();
    // remove item from collection
    removeFrom( item, this.items );
  }
};

// ----- destroy ----- //

// remove and disable Outlayer instance
Outlayer.prototype.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    item.destroy();
  }

  this.unbindResize();

  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  function Layout() {
    Outlayer.apply( this, arguments );
  }
  // inherit Outlayer prototype, use Object.create if there
  if ( Object.create ) {
    Layout.prototype = Object.create( Outlayer.prototype );
  } else {
    extend( Layout.prototype, Outlayer.prototype );
  }
  // set contructor, used for namespace and Item
  Layout.prototype.constructor = Layout;

  Layout.defaults = extend( {}, Outlayer.defaults );
  // apply new options
  extend( Layout.defaults, options );
  // keep prototype.settings for backwards compatibility (Packery v1.2.0)
  Layout.prototype.settings = {};

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = function LayoutItem() {
    Item.apply( this, arguments );
  };

  Layout.Item.prototype = new Item();

  // -------------------------- declarative -------------------------- //

  /**
   * allow user to initialize Outlayer via .js-namespace class
   * options are parsed from data-namespace-option attribute
   */
  docReady( function() {
    var dashedNamespace = toDashed( namespace );
    var elems = document.querySelectorAll( '.js-' + dashedNamespace );
    var dataAttr = 'data-' + dashedNamespace + '-options';

    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      var attr = elem.getAttribute( dataAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' +
            elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
            error );
        }
        continue;
      }
      // initialize
      var instance = new Layout( elem, options );
      // make available via $().data('layoutname')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    }
  });

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'outlayer/outlayer',[
      'eventie/eventie',
      'doc-ready/doc-ready',
      'eventEmitter/EventEmitter',
      'get-size/get-size',
      'matches-selector/matches-selector',
      './item'
    ],
    outlayerDefinition );
} else {
  // browser global
  window.Outlayer = outlayerDefinition(
    window.eventie,
    window.docReady,
    window.EventEmitter,
    window.getSize,
    window.matchesSelector,
    window.Outlayer.Item
  );
}

})( window );

/**
 * Isotope Item
**/

( function( window ) {



// -------------------------- Item -------------------------- //

function itemDefinition( Outlayer ) {

// sub-class Outlayer Item
function Item() {
  Outlayer.Item.apply( this, arguments );
}

Item.prototype = new Outlayer.Item();

Item.prototype._create = function() {
  // assign id, used for original-order sorting
  this.id = this.layout.itemGUID++;
  Outlayer.Item.prototype._create.call( this );
  this.sortData = {};
};

Item.prototype.updateSortData = function() {
  if ( this.isIgnored ) {
    return;
  }
  // default sorters
  this.sortData.id = this.id;
  // for backward compatibility
  this.sortData['original-order'] = this.id;
  this.sortData.random = Math.random();
  // go thru getSortData obj and apply the sorters
  var getSortData = this.layout.options.getSortData;
  var sorters = this.layout._sorters;
  for ( var key in getSortData ) {
    var sorter = sorters[ key ];
    this.sortData[ key ] = sorter( this.element, this );
  }
};

return Item;

}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'isotope/js/item',[
      'outlayer/outlayer'
    ],
    itemDefinition );
} else {
  // browser global
  window.Isotope = window.Isotope || {};
  window.Isotope.Item = itemDefinition(
    window.Outlayer
  );
}

})( window );

( function( window ) {



// --------------------------  -------------------------- //

function layoutModeDefinition( getSize, Outlayer ) {

  // layout mode class
  function LayoutMode( isotope ) {
    this.isotope = isotope;
    // link properties
    if ( isotope ) {
      this.options = isotope.options[ this.namespace ];
      this.element = isotope.element;
      this.items = isotope.filteredItems;
      this.size = isotope.size;
    }
  }

  /**
   * some methods should just defer to default Outlayer method
   * and reference the Isotope instance as `this`
  **/
  ( function() {
    var facadeMethods = [
      '_resetLayout',
      '_getItemLayoutPosition',
      '_manageStamp',
      '_getContainerSize',
      '_getElementOffset',
      'needsResizeLayout'
    ];

    for ( var i=0, len = facadeMethods.length; i < len; i++ ) {
      var methodName = facadeMethods[i];
      LayoutMode.prototype[ methodName ] = getOutlayerMethod( methodName );
    }

    function getOutlayerMethod( methodName ) {
      return function() {
        return Outlayer.prototype[ methodName ].apply( this.isotope, arguments );
      };
    }
  })();

  // -----  ----- //

  // for horizontal layout modes, check vertical size
  LayoutMode.prototype.needsVerticalResizeLayout = function() {
    // don't trigger if size did not change
    var size = getSize( this.isotope.element );
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var hasSizes = this.isotope.size && size;
    return hasSizes && size.innerHeight !== this.isotope.size.innerHeight;
  };

  // ----- measurements ----- //

  LayoutMode.prototype._getMeasurement = function() {
    this.isotope._getMeasurement.apply( this, arguments );
  };

  LayoutMode.prototype.getColumnWidth = function() {
    this.getSegmentSize( 'column', 'Width' );
  };

  LayoutMode.prototype.getRowHeight = function() {
    this.getSegmentSize( 'row', 'Height' );
  };

  /**
   * get columnWidth or rowHeight
   * segment: 'column' or 'row'
   * size 'Width' or 'Height'
  **/
  LayoutMode.prototype.getSegmentSize = function( segment, size ) {
    var segmentName = segment + size;
    var outerSize = 'outer' + size;
    // columnWidth / outerWidth // rowHeight / outerHeight
    this._getMeasurement( segmentName, outerSize );
    // got rowHeight or columnWidth, we can chill
    if ( this[ segmentName ] ) {
      return;
    }
    // fall back to item of first element
    var firstItemSize = this.getFirstItemSize();
    this[ segmentName ] = firstItemSize && firstItemSize[ outerSize ] ||
      // or size of container
      this.isotope.size[ 'inner' + size ];
  };

  LayoutMode.prototype.getFirstItemSize = function() {
    var firstItem = this.isotope.filteredItems[0];
    return firstItem && firstItem.element && getSize( firstItem.element );
  };

  // ----- methods that should reference isotope ----- //

  LayoutMode.prototype.layout = function() {
    this.isotope.layout.apply( this.isotope, arguments );
  };

  LayoutMode.prototype.getSize = function() {
    this.isotope.getSize();
    this.size = this.isotope.size;
  };

  // -------------------------- create -------------------------- //

  LayoutMode.modes = {};

  LayoutMode.create = function( namespace, options ) {

    function Mode() {
      LayoutMode.apply( this, arguments );
    }

    Mode.prototype = new LayoutMode();

    // default options
    if ( options ) {
      Mode.options = options;
    }

    Mode.prototype.namespace = namespace;
    // register in Isotope
    LayoutMode.modes[ namespace ] = Mode;

    return Mode;
  };


  return LayoutMode;

}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'isotope/js/layout-mode',[
      'get-size/get-size',
      'outlayer/outlayer'
    ],
    layoutModeDefinition );
} else {
  // browser global
  window.Isotope = window.Isotope || {};
  window.Isotope.LayoutMode = layoutModeDefinition(
    window.getSize,
    window.Outlayer
  );
}


})( window );

/*!
 * Masonry v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

( function( window ) {



// -------------------------- helpers -------------------------- //

var indexOf = Array.prototype.indexOf ?
  function( items, value ) {
    return items.indexOf( value );
  } :
  function ( items, value ) {
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      if ( item === value ) {
        return i;
      }
    }
    return -1;
  };

// -------------------------- masonryDefinition -------------------------- //

// used for AMD definition and requires
function masonryDefinition( Outlayer, getSize ) {
  // create an Outlayer layout class
  var Masonry = Outlayer.create('masonry');

  Masonry.prototype._resetLayout = function() {
    this.getSize();
    this._getMeasurement( 'columnWidth', 'outerWidth' );
    this._getMeasurement( 'gutter', 'outerWidth' );
    this.measureColumns();

    // reset column Y
    var i = this.cols;
    this.colYs = [];
    while (i--) {
      this.colYs.push( 0 );
    }

    this.maxY = 0;
  };

  Masonry.prototype.measureColumns = function() {
    this.getContainerWidth();
    // if columnWidth is 0, default to outerWidth of first item
    if ( !this.columnWidth ) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element;
      // columnWidth fall back to item of first element
      this.columnWidth = firstItemElem && getSize( firstItemElem ).outerWidth ||
        // if first elem has no width, default to size of container
        this.containerWidth;
    }

    this.columnWidth += this.gutter;

    this.cols = Math.floor( ( this.containerWidth + this.gutter ) / this.columnWidth );
    this.cols = Math.max( this.cols, 1 );
  };

  Masonry.prototype.getContainerWidth = function() {
    // container is parent if fit width
    var container = this.options.isFitWidth ? this.element.parentNode : this.element;
    // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be
    var size = getSize( container );
    this.containerWidth = size && size.innerWidth;
  };

  Masonry.prototype._getItemLayoutPosition = function( item ) {
    item.getSize();
    // how many columns does this brick span
    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
    // round if off by 1 pixel, otherwise use ceil
    var colSpan = Math[ mathMethod ]( item.size.outerWidth / this.columnWidth );
    colSpan = Math.min( colSpan, this.cols );

    var colGroup = this._getColGroup( colSpan );
    // get the minimum Y value from the columns
    var minimumY = Math.min.apply( Math, colGroup );
    var shortColIndex = indexOf( colGroup, minimumY );

    // position the brick
    var position = {
      x: this.columnWidth * shortColIndex,
      y: minimumY
    };

    // apply setHeight to necessary columns
    var setHeight = minimumY + item.size.outerHeight;
    var setSpan = this.cols + 1 - colGroup.length;
    for ( var i = 0; i < setSpan; i++ ) {
      this.colYs[ shortColIndex + i ] = setHeight;
    }

    return position;
  };

  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */
  Masonry.prototype._getColGroup = function( colSpan ) {
    if ( colSpan < 2 ) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = [];
    // how many different places could this brick fit horizontally
    var groupCount = this.cols + 1 - colSpan;
    // for each group potential horizontal position
    for ( var i = 0; i < groupCount; i++ ) {
      // make an array of colY values for that one group
      var groupColYs = this.colYs.slice( i, i + colSpan );
      // and get the max value of the array
      colGroup[i] = Math.max.apply( Math, groupColYs );
    }
    return colGroup;
  };

  Masonry.prototype._manageStamp = function( stamp ) {
    var stampSize = getSize( stamp );
    var offset = this._getElementOffset( stamp );
    // get the columns that this stamp affects
    var firstX = this.options.isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor( firstX / this.columnWidth );
    firstCol = Math.max( 0, firstCol );
    var lastCol = Math.floor( lastX / this.columnWidth );
    // lastCol should not go over if multiple of columnWidth #425
    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min( this.cols - 1, lastCol );
    // set colYs to bottom of the stamp
    var stampMaxY = ( this.options.isOriginTop ? offset.top : offset.bottom ) +
      stampSize.outerHeight;
    for ( var i = firstCol; i <= lastCol; i++ ) {
      this.colYs[i] = Math.max( stampMaxY, this.colYs[i] );
    }
  };

  Masonry.prototype._getContainerSize = function() {
    this.maxY = Math.max.apply( Math, this.colYs );
    var size = {
      height: this.maxY
    };

    if ( this.options.isFitWidth ) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  Masonry.prototype._getContainerFitWidth = function() {
    var unusedCols = 0;
    // count unused columns
    var i = this.cols;
    while ( --i ) {
      if ( this.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    // fit container to columns that have been used
    return ( this.cols - unusedCols ) * this.columnWidth - this.gutter;
  };

  Masonry.prototype.needsResizeLayout = function() {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth !== this.containerWidth;
  };

  return Masonry;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'masonry/masonry',[
      'outlayer/outlayer',
      'get-size/get-size'
    ],
    masonryDefinition );
} else {
  // browser global
  window.Masonry = masonryDefinition(
    window.Outlayer,
    window.getSize
  );
}

})( window );

/*!
 * Masonry layout mode
 * sub-classes Masonry
 * http://masonry.desandro.com
 */

( function( window ) {



// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// -------------------------- masonryDefinition -------------------------- //

// used for AMD definition and requires
function masonryDefinition( LayoutMode, Masonry ) {
  // create an Outlayer layout class
  var MasonryMode = LayoutMode.create('masonry');

  // save on to these methods
  var _getElementOffset = MasonryMode.prototype._getElementOffset;
  var layout = MasonryMode.prototype.layout;
  var _getMeasurement = MasonryMode.prototype._getMeasurement;

  // sub-class Masonry
  extend( MasonryMode.prototype, Masonry.prototype );

  // set back, as it was overwritten by Masonry
  MasonryMode.prototype._getElementOffset = _getElementOffset;
  MasonryMode.prototype.layout = layout;
  MasonryMode.prototype._getMeasurement = _getMeasurement;

  var measureColumns = MasonryMode.prototype.measureColumns;
  MasonryMode.prototype.measureColumns = function() {
    // set items, used if measuring first item
    this.items = this.isotope.filteredItems;
    measureColumns.call( this );
  };

  // HACK copy over isOriginLeft/Top options
  var _manageStamp = MasonryMode.prototype._manageStamp;
  MasonryMode.prototype._manageStamp = function() {
    this.options.isOriginLeft = this.isotope.options.isOriginLeft;
    this.options.isOriginTop = this.isotope.options.isOriginTop;
    _manageStamp.apply( this, arguments );
  };

  return MasonryMode;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'isotope/js/layout-modes/masonry',[
      '../layout-mode',
      'masonry/masonry'
    ],
    masonryDefinition );
} else {
  // browser global
  masonryDefinition(
    window.Isotope.LayoutMode,
    window.Masonry
  );
}

})( window );

( function( window ) {



function fitRowsDefinition( LayoutMode ) {

var FitRows = LayoutMode.create('fitRows');

FitRows.prototype._resetLayout = function() {
  this.x = 0;
  this.y = 0;
  this.maxY = 0;
};

FitRows.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();

  // if this element cannot fit in the current row
  if ( this.x !== 0 && item.size.outerWidth + this.x > this.isotope.size.innerWidth ) {
    this.x = 0;
    this.y = this.maxY;
  }

  var position = {
    x: this.x,
    y: this.y
  };

  this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
  this.x += item.size.outerWidth;

  return position;
};

FitRows.prototype._getContainerSize = function() {
  return { height: this.maxY };
};

return FitRows;

}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'isotope/js/layout-modes/fit-rows',[
      '../layout-mode'
    ],
    fitRowsDefinition );
} else {
  // browser global
  fitRowsDefinition(
    window.Isotope.LayoutMode
  );
}

})( window );

( function( window ) {



function verticalDefinition( LayoutMode ) {

var Vertical = LayoutMode.create( 'vertical', {
  horizontalAlignment: 0
});

Vertical.prototype._resetLayout = function() {
  this.y = 0;
};

Vertical.prototype._getItemLayoutPosition = function( item ) {
  item.getSize();
  var x = ( this.isotope.size.innerWidth - item.size.outerWidth ) *
    this.options.horizontalAlignment;
  var y = this.y;
  this.y += item.size.outerHeight;
  return { x: x, y: y };
};

Vertical.prototype._getContainerSize = function() {
  return { height: this.y };
};

return Vertical;

}

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'isotope/js/layout-modes/vertical',[
      '../layout-mode'
    ],
    verticalDefinition );
} else {
  // browser global
  verticalDefinition(
    window.Isotope.LayoutMode
  );
}

})( window );

/*!
 * Isotope v2.0.0
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

( function( window ) {



// -------------------------- vars -------------------------- //

var jQuery = window.jQuery;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var trim = String.prototype.trim ?
  function( str ) {
    return str.trim();
  } :
  function( str ) {
    return str.replace( /^\s+|\s+$/g, '' );
  };

var docElem = document.documentElement;

var getText = docElem.textContent ?
  function( elem ) {
    return elem.textContent;
  } :
  function( elem ) {
    return elem.innerText;
  };

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// index of helper cause IE8
var indexOf = Array.prototype.indexOf ? function( ary, obj ) {
    return ary.indexOf( obj );
  } : function( ary, obj ) {
    for ( var i=0, len = ary.length; i < len; i++ ) {
      if ( ary[i] === obj ) {
        return i;
      }
    }
    return -1;
  };

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

function removeFrom( obj, ary ) {
  var index = indexOf( ary, obj );
  if ( index !== -1 ) {
    ary.splice( index, 1 );
  }
}

// -------------------------- isotopeDefinition -------------------------- //

// used for AMD definition and requires
function isotopeDefinition( Outlayer, getSize, matchesSelector, Item, LayoutMode ) {
  // create an Outlayer layout class
  var Isotope = Outlayer.create( 'isotope', {
    layoutMode: "masonry",
    isJQueryFiltering: true,
    sortAscending: true
  });

  Isotope.Item = Item;
  Isotope.LayoutMode = LayoutMode;

  Isotope.prototype._create = function() {
    this.itemGUID = 0;
    // functions that sort items
    this._sorters = {};
    this._getSorters();
    // call super
    Outlayer.prototype._create.call( this );

    // create layout modes
    this.modes = {};
    // start filteredItems with all items
    this.filteredItems = this.items;
    // keep of track of sortBys
    this.sortHistory = [ 'original-order' ];
    // create from registered layout modes
    for ( var name in LayoutMode.modes ) {
      this._initLayoutMode( name );
    }
  };

  Isotope.prototype.reloadItems = function() {
    // reset item ID counter
    this.itemGUID = 0;
    // call super
    Outlayer.prototype.reloadItems.call( this );
  };

  Isotope.prototype._itemize = function() {
    var items = Outlayer.prototype._itemize.apply( this, arguments );
    // assign ID for original-order
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      item.id = this.itemGUID++;
    }
    this._updateItemsSortData( items );
    return items;
  };


  // -------------------------- layout -------------------------- //

  Isotope.prototype._initLayoutMode = function( name ) {
    var Mode = LayoutMode.modes[ name ];
    // set mode options
    // HACK extend initial options, back-fill in default options
    var initialOpts = this.options[ name ] || {};
    this.options[ name ] = Mode.options ?
      extend( Mode.options, initialOpts ) : initialOpts;
    // init layout mode instance
    this.modes[ name ] = new Mode( this );
  };


  Isotope.prototype.layout = function() {
    // if first time doing layout, do all magic
    if ( !this._isLayoutInited && this.options.isInitLayout ) {
      this.arrange();
      return;
    }
    this._layout();
  };

  // private method to be used in layout() & magic()
  Isotope.prototype._layout = function() {
    // don't animate first layout
    var isInstant = this._getIsInstant();
    // layout flow
    this._resetLayout();
    this._manageStamps();
    this.layoutItems( this.filteredItems, isInstant );

    // flag for initalized
    this._isLayoutInited = true;
  };

  // filter + sort + layout
  Isotope.prototype.arrange = function( opts ) {
    // set any options pass
    this.option( opts );
    this._getIsInstant();
    // filter, sort, and layout
    this.filteredItems = this._filter( this.items );
    this._sort();
    this._layout();
  };
  // alias to _init for main plugin method
  Isotope.prototype._init = Isotope.prototype.arrange;

  // HACK
  // Don't animate/transition first layout
  // Or don't animate/transition other layouts
  Isotope.prototype._getIsInstant = function() {
    var isInstant = this.options.isLayoutInstant !== undefined ?
      this.options.isLayoutInstant : !this._isLayoutInited;
    this._isInstant = isInstant;
    return isInstant;
  };

  // -------------------------- filter -------------------------- //

  Isotope.prototype._filter = function( items ) {
    var filter = this.options.filter;
    filter = filter || '*';
    var matches = [];
    var hiddenMatched = [];
    var visibleUnmatched = [];

    var test = this._getFilterTest( filter );

    // test each item
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      if ( item.isIgnored ) {
        continue;
      }
      // add item to either matched or unmatched group
      var isMatched = test( item );
      // item.isFilterMatched = isMatched;
      // add to matches if its a match
      if ( isMatched ) {
        matches.push( item );
      }
      // add to additional group if item needs to be hidden or revealed
      if ( isMatched && item.isHidden ) {
        hiddenMatched.push( item );
      } else if ( !isMatched && !item.isHidden ) {
        visibleUnmatched.push( item );
      }
    }

    var _this = this;
    function hideReveal() {
      _this.reveal( hiddenMatched );
      _this.hide( visibleUnmatched );
    }

    if ( this._isInstant ) {
      this._noTransition( hideReveal );
    } else {
      hideReveal();
    }

    return matches;
  };

  // get a jQuery, function, or a matchesSelector test given the filter
  Isotope.prototype._getFilterTest = function( filter ) {
    if ( jQuery && this.options.isJQueryFiltering ) {
      // use jQuery
      return function( item ) {
        return jQuery( item.element ).is( filter );
      };
    }
    if ( typeof filter === 'function' ) {
      // use filter as function
      return function( item ) {
        return filter( item.element );
      };
    }
    // default, use filter as selector string
    return function( item ) {
      return matchesSelector( item.element, filter );
    };
  };

  // -------------------------- sorting -------------------------- //

  /**
   * @params {Array} elems
   * @public
   */
  Isotope.prototype.updateSortData = function( elems ) {
    this._getSorters();
    // update item sort data
    // default to all items if none are passed in
    elems = makeArray( elems );
    var items = this.getItems( elems );
    // if no items found, update all items
    items = items.length ? items : this.items;
    this._updateItemsSortData( items );
  };

  Isotope.prototype._getSorters = function() {
    var getSortData = this.options.getSortData;
    for ( var key in getSortData ) {
      var sorter = getSortData[ key ];
      this._sorters[ key ] = mungeSorter( sorter );
    }
  };

  /**
   * @params {Array} items - of Isotope.Items
   * @private
   */
  Isotope.prototype._updateItemsSortData = function( items ) {
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      item.updateSortData();
    }
  };

  // ----- munge sorter ----- //

  // encapsulate this, as we just need mungeSorter
  // other functions in here are just for munging
  var mungeSorter = ( function() {
    // add a magic layer to sorters for convienent shorthands
    // `.foo-bar` will use the text of .foo-bar querySelector
    // `[foo-bar]` will use attribute
    // you can also add parser
    // `.foo-bar parseInt` will parse that as a number
    function mungeSorter( sorter ) {
      // if not a string, return function or whatever it is
      if ( typeof sorter !== 'string' ) {
        return sorter;
      }
      // parse the sorter string
      var args = trim( sorter ).split(' ');
      var query = args[0];
      // check if query looks like [an-attribute]
      var attrMatch = query.match( /^\[(.+)\]$/ );
      var attr = attrMatch && attrMatch[1];
      var getValue = getValueGetter( attr, query );
      // use second argument as a parser
      var parser = Isotope.sortDataParsers[ args[1] ];
      // parse the value, if there was a parser
      sorter = parser ? function( elem ) {
        return elem && parser( getValue( elem ) );
      } :
      // otherwise just return value
      function( elem ) {
        return elem && getValue( elem );
      };

      return sorter;
    }

    // get an attribute getter, or get text of the querySelector
    function getValueGetter( attr, query ) {
      var getValue;
      // if query looks like [foo-bar], get attribute
      if ( attr ) {
        getValue = function( elem ) {
          return elem.getAttribute( attr );
        };
      } else {
        // otherwise, assume its a querySelector, and get its text
        getValue = function( elem ) {
          var child = elem.querySelector( query );
          return child && getText( child );
        };
      }
      return getValue;
    }

    return mungeSorter;
  })();

  // parsers used in getSortData shortcut strings
  Isotope.sortDataParsers = {
    'parseInt': function( val ) {
      return parseInt( val, 10 );
    },
    'parseFloat': function( val ) {
      return parseFloat( val );
    }
  };

  // ----- sort method ----- //

  // sort filteredItem order
  Isotope.prototype._sort = function() {
    var sortByOpt = this.options.sortBy;
    if ( !sortByOpt ) {
      return;
    }
    // concat all sortBy and sortHistory
    var sortBys = [].concat.apply( sortByOpt, this.sortHistory );
    // sort magic
    var itemSorter = getItemSorter( sortBys, this.options.sortAscending );
    this.filteredItems.sort( itemSorter );
    // keep track of sortBy History
    if ( sortByOpt !== this.sortHistory[0] ) {
      // add to front, oldest goes in last
      this.sortHistory.unshift( sortByOpt );
    }
  };

  // returns a function used for sorting
  function getItemSorter( sortBys, sortAsc ) {
    return function sorter( itemA, itemB ) {
      // cycle through all sortKeys
      for ( var i = 0, len = sortBys.length; i < len; i++ ) {
        var sortBy = sortBys[i];
        var a = itemA.sortData[ sortBy ];
        var b = itemB.sortData[ sortBy ];
        if ( a > b || a < b ) {
          // if sortAsc is an object, use the value given the sortBy key
          var isAscending = sortAsc[ sortBy ] !== undefined ? sortAsc[ sortBy ] : sortAsc;
          var direction = isAscending ? 1 : -1;
          return ( a > b ? 1 : -1 ) * direction;
        }
      }
      return 0;
    };
  }

  // -------------------------- methods -------------------------- //

  // get layout mode
  Isotope.prototype._mode = function() {
    var layoutMode = this.options.layoutMode;
    var mode = this.modes[ layoutMode ];
    if ( !mode ) {
      // TODO console.error
      throw new Error( 'No layout mode: ' + layoutMode );
    }
    // HACK sync mode's options
    // any options set after init for layout mode need to be synced
    mode.options = this.options[ layoutMode ];
    return mode;
  };

  Isotope.prototype._resetLayout = function() {
    // trigger original reset layout
    Outlayer.prototype._resetLayout.call( this );
    this._mode()._resetLayout();
  };

  Isotope.prototype._getItemLayoutPosition = function( item  ) {
    return this._mode()._getItemLayoutPosition( item );
  };

  Isotope.prototype._manageStamp = function( stamp ) {
    this._mode()._manageStamp( stamp );
  };

  Isotope.prototype._getContainerSize = function() {
    return this._mode()._getContainerSize();
  };

  Isotope.prototype.needsResizeLayout = function() {
    return this._mode().needsResizeLayout();
  };

  // -------------------------- adding & removing -------------------------- //

  // HEADS UP overwrites default Outlayer appended
  Isotope.prototype.appended = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    var filteredItems = this._filterRevealAdded( items );
    // add to filteredItems
    this.filteredItems = this.filteredItems.concat( filteredItems );
  };

  // HEADS UP overwrites default Outlayer prepended
  Isotope.prototype.prepended = function( elems ) {
    var items = this._itemize( elems );
    if ( !items.length ) {
      return;
    }
    // add items to beginning of collection
    var previousItems = this.items.slice(0);
    this.items = items.concat( previousItems );
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // layout new stuff without transition
    var filteredItems = this._filterRevealAdded( items );
    // layout previous items
    this.layoutItems( previousItems );
    // add to filteredItems
    this.filteredItems = filteredItems.concat( this.filteredItems );
  };

  Isotope.prototype._filterRevealAdded = function( items ) {
    var filteredItems = this._noTransition( function() {
      return this._filter( items );
    });
    // layout and reveal just the new items
    this.layoutItems( filteredItems, true );
    this.reveal( filteredItems );
    return items;
  };

  /**
   * Filter, sort, and layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  Isotope.prototype.insert = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // append item elements
    var i, item;
    var len = items.length;
    for ( i=0; i < len; i++ ) {
      item = items[i];
      this.element.appendChild( item.element );
    }
    // filter new stuff
    /*
    // this way adds hides new filtered items with NO transition
    // so user can't see if new hidden items have been inserted
    var filteredInsertItems;
    this._noTransition( function() {
      filteredInsertItems = this._filter( items );
      // hide all new items
      this.hide( filteredInsertItems );
    });
    // */
    // this way hides new filtered items with transition
    // so user at least sees that something has been added
    var filteredInsertItems = this._filter( items );
    // hide all newitems
    this._noTransition( function() {
      this.hide( filteredInsertItems );
    });
    // */
    // set flag
    for ( i=0; i < len; i++ ) {
      items[i].isLayoutInstant = true;
    }
    this.arrange();
    // reset flag
    for ( i=0; i < len; i++ ) {
      delete items[i].isLayoutInstant;
    }
    this.reveal( filteredInsertItems );
  };

  var _remove = Isotope.prototype.remove;
  Isotope.prototype.remove = function( elems ) {
    elems = makeArray( elems );
    var removeItems = this.getItems( elems );
    // do regular thing
    _remove.call( this, elems );
    // bail if no items to remove
    if ( !removeItems || !removeItems.length ) {
      return;
    }
    // remove elems from filteredItems
    for ( var i=0, len = removeItems.length; i < len; i++ ) {
      var item = removeItems[i];
      // remove item from collection
      removeFrom( item, this.filteredItems );
    }
  };

  /**
   * trigger fn without transition
   * kind of hacky to have this in the first place
   * @param {Function} fn
   * @returns ret
   * @private
   */
  Isotope.prototype._noTransition = function( fn ) {
    // save transitionDuration before disabling
    var transitionDuration = this.options.transitionDuration;
    // disable transition
    this.options.transitionDuration = 0;
    // do it
    var returnValue = fn.call( this );
    // re-enable transition for reveal
    this.options.transitionDuration = transitionDuration;
    return returnValue;
  };

  // -----  ----- //

  return Isotope;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'outlayer/outlayer',
      'get-size/get-size',
      'matches-selector/matches-selector',
      'isotope/js/item',
      'isotope/js/layout-mode',
      // include default layout modes
      'isotope/js/layout-modes/masonry',
      'isotope/js/layout-modes/fit-rows',
      'isotope/js/layout-modes/vertical'
    ],
    isotopeDefinition );
} else {
  // browser global
  window.Isotope = isotopeDefinition(
    window.Outlayer,
    window.getSize,
    window.matchesSelector,
    window.Isotope.Item,
    window.Isotope.LayoutMode
  );
}

})( window );


///#source 1 1 /app_themes/hdtemplate/plugins/rs-plugin/revolution/js/revolution.js
///#source 1 1 /App_Themes/basic/plugins/rs-plugin/revolution/js/jquery.themepunch.tools.min.js
/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 27.02.2015
*********************************************/


/*
* @fileOverview TouchSwipe - jQuery Plugin
* @version 1.6.9
*
* @author Matt Bryson http://www.github.com/mattbryson
* @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* @see http://labs.skinkers.com/touchSwipe/
* @see http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/



(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.9",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipetp=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipetp")}}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}return G};f.fn.swipetp.version=y;f.fn.swipetp.defaults=n;f.fn.swipetp.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipetp.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipetp.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipetp.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipetp.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,aw){var aA=(a||d||!aw.fallbackToMouseEvents),K=aA?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",az=aA?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=aA?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=aA?null:"mouseleave",aE=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ah=0,aQ=null,ac=0,a2=0,a0=0,H=1,ar=0,aK=0,N=null;var aS=f(a5);var aa="start";var X=0;var aR=null;var U=0,a3=0,a6=0,ae=0,O=0;var aX=null,ag=null;try{aS.bind(K,aO);aS.bind(aE,ba)}catch(al){f.error("events not supported "+K+","+aE+" on jQuery.swipetp")}this.enable=function(){aS.bind(K,aO);aS.bind(aE,ba);return aS};this.disable=function(){aL();return aS};this.destroy=function(){aL();aS.data(C,null);aS=null};this.option=function(bd,bc){if(aw[bd]!==undefined){if(bc===undefined){return aw[bd]}else{aw[bd]=bc}}else{f.error("Option "+bd+" does not exist on jQuery.swipetp.options")}return null};function aO(be){if(aC()){return}if(f(be.target).closest(aw.excludedElements,aS).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{be.preventDefault()}ah=0;aQ=null;aK=null;ac=0;a2=0;a0=0;H=1;ar=0;aR=ak();N=ab();S();if(!bg||(X===aw.fingers||aw.fingers===i)||aY()){aj(0,bc);U=au();if(X==2){aj(1,bg[1]);a2=a0=av(aR[0].start,aR[1].start)}if(aw.swipeStatus||aw.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(aw.hold){ag=setTimeout(f.proxy(function(){aS.trigger("hold",[bf.target]);if(aw.hold){bd=aw.hold.call(aS,bf,bf.target)}},this),aw.longTapThreshold)}ap(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||an()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aI(bd);a3=au();if(bj){X=bj.length}if(aw.hold){clearTimeout(ag)}aa=k;if(X==2){if(a2==0){aj(1,bj[1]);a2=a0=av(aR[0].start,aR[1].start)}else{aI(bj[1]);a0=av(aR[0].end,aR[1].end);aK=at(aR[0].end,aR[1].end)}H=a8(a2,a0);ar=Math.abs(a2-a0)}if((X===aw.fingers||aw.fingers===i)||!bj||aY()){aQ=aM(bg.start,bg.end);am(bf,aQ);ah=aT(bg.start,bg.end);ac=aN();aJ(aQ,ah);if(aw.swipeStatus||aw.pinchStatus){be=P(bi,aa)}if(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave){var bc=true;if(aw.triggerOnTouchLeave){var bh=aZ(this);bc=F(bg.end,bh)}if(!aw.triggerOnTouchEnd&&bc){aa=aD(k)}else{if(aw.triggerOnTouchLeave&&!bc){aa=aD(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length){G();return true}}if(an()){X=ae}a3=au();ac=aN();if(bb()||!ao()){aa=q;P(bd,aa)}else{if(aw.triggerOnTouchEnd||(aw.triggerOnTouchEnd==false&&aa===k)){bc.preventDefault();aa=h;P(bd,aa)}else{if(!aw.triggerOnTouchEnd&&a7()){aa=h;aG(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}ap(false);return null}function ba(){X=0;a3=0;U=0;a2=0;a0=0;H=1;S();ap(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(aw.triggerOnTouchLeave){aa=aD(h);P(bd,aa)}}function aL(){aS.unbind(K,aO);aS.unbind(aE,ba);aS.unbind(az,a4);aS.unbind(V,M);if(T){aS.unbind(T,L)}ap(false)}function aD(bg){var bf=bg;var be=aB();var bd=ao();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!aw.triggerOnTouchEnd||aw.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&aw.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if((J()||W())||(Q()||aY())){if(J()||W()){bd=aG(be,bc,l)}if((Q()||aY())&&bd!==false){bd=aG(be,bc,t)}}else{if(aH()&&bd!==false){bd=aG(be,bc,j)}else{if(aq()&&bd!==false){bd=aG(be,bc,b)}else{if(ai()&&bd!==false){bd=aG(be,bc,B)}}}}if(bc===q){ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aG(bf,bc,be){var bd;if(be==l){aS.trigger("swipeStatus",[bc,aQ||null,ah||0,ac||0,X,aR]);if(aw.swipeStatus){bd=aw.swipeStatus.call(aS,bf,bc,aQ||null,ah||0,ac||0,X,aR);if(bd===false){return false}}if(bc==h&&aW()){aS.trigger("swipe",[aQ,ah,ac,X,aR]);if(aw.swipe){bd=aw.swipe.call(aS,bf,aQ,ah,ac,X,aR);if(bd===false){return false}}switch(aQ){case p:aS.trigger("swipeLeft",[aQ,ah,ac,X,aR]);if(aw.swipeLeft){bd=aw.swipeLeft.call(aS,bf,aQ,ah,ac,X,aR)}break;case o:aS.trigger("swipeRight",[aQ,ah,ac,X,aR]);if(aw.swipeRight){bd=aw.swipeRight.call(aS,bf,aQ,ah,ac,X,aR)}break;case e:aS.trigger("swipeUp",[aQ,ah,ac,X,aR]);if(aw.swipeUp){bd=aw.swipeUp.call(aS,bf,aQ,ah,ac,X,aR)}break;case x:aS.trigger("swipeDown",[aQ,ah,ac,X,aR]);if(aw.swipeDown){bd=aw.swipeDown.call(aS,bf,aQ,ah,ac,X,aR)}break}}}if(be==t){aS.trigger("pinchStatus",[bc,aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchStatus){bd=aw.pinchStatus.call(aS,bf,bc,aK||null,ar||0,ac||0,X,H,aR);if(bd===false){return false}}if(bc==h&&a9()){switch(aK){case c:aS.trigger("pinchIn",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchIn){bd=aw.pinchIn.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break;case A:aS.trigger("pinchOut",[aK||null,ar||0,ac||0,X,H,aR]);if(aw.pinchOut){bd=aw.pinchOut.call(aS,bf,aK||null,ar||0,ac||0,X,H,aR)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aX);clearTimeout(ag);if(Z()&&!I()){O=au();aX=setTimeout(f.proxy(function(){O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}},this),aw.doubleTapThreshold)}else{O=null;aS.trigger("tap",[bf.target]);if(aw.tap){bd=aw.tap.call(aS,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("doubletap",[bf.target]);if(aw.doubleTap){bd=aw.doubleTap.call(aS,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aX);O=null;aS.trigger("longtap",[bf.target]);if(aw.longTap){bd=aw.longTap.call(aS,bf,bf.target)}}}}}return bd}function ao(){var bc=true;if(aw.threshold!==null){bc=ah>=aw.threshold}return bc}function bb(){var bc=false;if(aw.cancelThreshold!==null&&aQ!==null){bc=(aU(aQ)-ah)>=aw.cancelThreshold}return bc}function af(){if(aw.pinchThreshold!==null){return ar>=aw.pinchThreshold}return true}function aB(){var bc;if(aw.maxTimeThreshold){if(ac>=aw.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function am(bc,bd){if(aw.preventDefaultEvents===false){return}if(aw.allowPageScroll===m){bc.preventDefault()}else{var be=aw.allowPageScroll===s;switch(bd){case p:if((aw.swipeLeft&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((aw.swipeRight&&be)||(!be&&aw.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((aw.swipeUp&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((aw.swipeDown&&be)||(!be&&aw.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aP();var bc=Y();var be=af();return bd&&bc&&be}function aY(){return !!(aw.pinchStatus||aw.pinchIn||aw.pinchOut)}function Q(){return !!(a9()&&aY())}function aW(){var bf=aB();var bh=ao();var be=aP();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return !!(aw.swipe||aw.swipeStatus||aw.swipeLeft||aw.swipeRight||aw.swipeUp||aw.swipeDown)}function J(){return !!(aW()&&W())}function aP(){return((X===aw.fingers||aw.fingers===i)||!a)}function Y(){return aR[0].end.x!==0}function a7(){return !!(aw.tap)}function Z(){return !!(aw.doubleTap)}function aV(){return !!(aw.longTap)}function R(){if(O==null){return false}var bc=au();return(Z()&&((bc-O)<=aw.doubleTapThreshold))}function I(){return R()}function ay(){return((X===1||!a)&&(isNaN(ah)||ah<aw.threshold))}function a1(){return((ac>aw.longTapThreshold)&&(ah<r))}function ai(){return !!(ay()&&a7())}function aH(){return !!(R()&&Z())}function aq(){return !!(a1()&&aV())}function G(){a6=au();ae=event.touches.length+1}function S(){a6=0;ae=0}function an(){var bc=false;if(a6){var bd=au()-a6;if(bd<=aw.fingerReleaseThreshold){bc=true}}return bc}function aC(){return !!(aS.data(C+"_intouch")===true)}function ap(bc){if(bc===true){aS.bind(az,a4);aS.bind(V,M);if(T){aS.bind(T,L)}}else{aS.unbind(az,a4,false);aS.unbind(V,M,false);if(T){aS.unbind(T,L,false)}}aS.data(C+"_intouch",bc===true)}function aj(bd,bc){var be=bc.identifier!==undefined?bc.identifier:0;aR[bd].identifier=be;aR[bd].start.x=aR[bd].end.x=bc.pageX||bc.clientX;aR[bd].start.y=aR[bd].end.y=bc.pageY||bc.clientY;return aR[bd]}function aI(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bd){for(var bc=0;bc<aR.length;bc++){if(aR[bc].identifier==bd){return aR[bc]}}}function ak(){var bc=[];for(var bd=0;bd<=5;bd++){bc.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bc}function aJ(bc,bd){bd=Math.max(bd,aU(bc));N[bc].distance=bd}function aU(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=ax(p);bc[o]=ax(o);bc[e]=ax(e);bc[x]=ax(x);return bc}function ax(bc){return{direction:bc,distance:0}}function aN(){return a3-U}function av(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function at(){if(H<1){return A}else{return c}}function aT(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aF(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aM(bd,bc){var be=aF(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function au(){var bc=new Date();return bc.getTime()}function aZ(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));

if(typeof(console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function() {};
}

if (window.tplogs==true)
	try {
		console.groupCollapsed("ThemePunch GreenSocks Logs");
	} catch(e) { }


var oldgs = window.GreenSockGlobals;
	oldgs_queue = window._gsQueue;
	
var punchgs = window.GreenSockGlobals = {};

if (window.tplogs==true)
	try {
		console.info("Build GreenSock SandBox for ThemePunch Plugins");
		console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
	} catch(e) {}

/*!
 * VERSION: 1.18.0
 * DATE: 2015-09-03
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function(t,e){"use strict";var i=t.GreenSockGlobals=t.GreenSockGlobals||t;if(!i.TweenLite){var s,r,n,a,o,l=function(t){var e,s=t.split("."),r=i;for(e=0;s.length>e;e++)r[s[e]]=r=r[s[e]]||{};return r},h=l("com.greensock"),_=1e-10,u=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},f=function(){},c=function(){var t=Object.prototype.toString,e=t.call([]);return function(i){return null!=i&&(i instanceof Array||"object"==typeof i&&!!i.push&&t.call(i)===e)}}(),m={},p=function(s,r,n,a){this.sc=m[s]?m[s].sc:[],m[s]=this,this.gsClass=null,this.func=n;var o=[];this.check=function(h){for(var _,u,f,c,d,v=r.length,g=v;--v>-1;)(_=m[r[v]]||new p(r[v],[])).gsClass?(o[v]=_.gsClass,g--):h&&_.sc.push(this);if(0===g&&n)for(u=("com.greensock."+s).split("."),f=u.pop(),c=l(u.join("."))[f]=this.gsClass=n.apply(n,o),a&&(i[f]=c,d="undefined"!=typeof module&&module.exports,!d&&"function"==typeof define&&define.amd?define((t.GreenSockAMDPath?t.GreenSockAMDPath+"/":"")+s.split(".").pop(),[],function(){return c}):s===e&&d&&(module.exports=c)),v=0;this.sc.length>v;v++)this.sc[v].check()},this.check(!0)},d=t._gsDefine=function(t,e,i,s){return new p(t,e,i,s)},v=h._class=function(t,e,i){return e=e||function(){},d(t,[],function(){return e},i),e};d.globals=i;var g=[0,0,1,1],T=[],y=v("easing.Ease",function(t,e,i,s){this._func=t,this._type=i||0,this._power=s||0,this._params=e?g.concat(e):g},!0),w=y.map={},P=y.register=function(t,e,i,s){for(var r,n,a,o,l=e.split(","),_=l.length,u=(i||"easeIn,easeOut,easeInOut").split(",");--_>-1;)for(n=l[_],r=s?v("easing."+n,null,!0):h.easing[n]||{},a=u.length;--a>-1;)o=u[a],w[n+"."+o]=w[o+n]=r[o]=t.getRatio?t:t[o]||new t};for(n=y.prototype,n._calcEnd=!1,n.getRatio=function(t){if(this._func)return this._params[0]=t,this._func.apply(null,this._params);var e=this._type,i=this._power,s=1===e?1-t:2===e?t:.5>t?2*t:2*(1-t);return 1===i?s*=s:2===i?s*=s*s:3===i?s*=s*s*s:4===i&&(s*=s*s*s*s),1===e?1-s:2===e?s:.5>t?s/2:1-s/2},s=["Linear","Quad","Cubic","Quart","Quint,Strong"],r=s.length;--r>-1;)n=s[r]+",Power"+r,P(new y(null,null,1,r),n,"easeOut",!0),P(new y(null,null,2,r),n,"easeIn"+(0===r?",easeNone":"")),P(new y(null,null,3,r),n,"easeInOut");w.linear=h.easing.Linear.easeIn,w.swing=h.easing.Quad.easeInOut;var b=v("events.EventDispatcher",function(t){this._listeners={},this._eventTarget=t||this});n=b.prototype,n.addEventListener=function(t,e,i,s,r){r=r||0;var n,l,h=this._listeners[t],_=0;for(null==h&&(this._listeners[t]=h=[]),l=h.length;--l>-1;)n=h[l],n.c===e&&n.s===i?h.splice(l,1):0===_&&r>n.pr&&(_=l+1);h.splice(_,0,{c:e,s:i,up:s,pr:r}),this!==a||o||a.wake()},n.removeEventListener=function(t,e){var i,s=this._listeners[t];if(s)for(i=s.length;--i>-1;)if(s[i].c===e)return s.splice(i,1),void 0},n.dispatchEvent=function(t){var e,i,s,r=this._listeners[t];if(r)for(e=r.length,i=this._eventTarget;--e>-1;)s=r[e],s&&(s.up?s.c.call(s.s||i,{type:t,target:i}):s.c.call(s.s||i))};var k=t.requestAnimationFrame,A=t.cancelAnimationFrame,S=Date.now||function(){return(new Date).getTime()},x=S();for(s=["ms","moz","webkit","o"],r=s.length;--r>-1&&!k;)k=t[s[r]+"RequestAnimationFrame"],A=t[s[r]+"CancelAnimationFrame"]||t[s[r]+"CancelRequestAnimationFrame"];v("Ticker",function(t,e){var i,s,r,n,l,h=this,u=S(),c=e!==!1&&k,m=500,p=33,d="tick",v=function(t){var e,a,o=S()-x;o>m&&(u+=o-p),x+=o,h.time=(x-u)/1e3,e=h.time-l,(!i||e>0||t===!0)&&(h.frame++,l+=e+(e>=n?.004:n-e),a=!0),t!==!0&&(r=s(v)),a&&h.dispatchEvent(d)};b.call(h),h.time=h.frame=0,h.tick=function(){v(!0)},h.lagSmoothing=function(t,e){m=t||1/_,p=Math.min(e,m,0)},h.sleep=function(){null!=r&&(c&&A?A(r):clearTimeout(r),s=f,r=null,h===a&&(o=!1))},h.wake=function(){null!==r?h.sleep():h.frame>10&&(x=S()-m+5),s=0===i?f:c&&k?k:function(t){return setTimeout(t,0|1e3*(l-h.time)+1)},h===a&&(o=!0),v(2)},h.fps=function(t){return arguments.length?(i=t,n=1/(i||60),l=this.time+n,h.wake(),void 0):i},h.useRAF=function(t){return arguments.length?(h.sleep(),c=t,h.fps(i),void 0):c},h.fps(t),setTimeout(function(){c&&5>h.frame&&h.useRAF(!1)},1500)}),n=h.Ticker.prototype=new h.events.EventDispatcher,n.constructor=h.Ticker;var R=v("core.Animation",function(t,e){if(this.vars=e=e||{},this._duration=this._totalDuration=t||0,this._delay=Number(e.delay)||0,this._timeScale=1,this._active=e.immediateRender===!0,this.data=e.data,this._reversed=e.reversed===!0,H){o||a.wake();var i=this.vars.useFrames?K:H;i.add(this,i._time),this.vars.paused&&this.paused(!0)}});a=R.ticker=new h.Ticker,n=R.prototype,n._dirty=n._gc=n._initted=n._paused=!1,n._totalTime=n._time=0,n._rawPrevTime=-1,n._next=n._last=n._onUpdate=n._timeline=n.timeline=null,n._paused=!1;var C=function(){o&&S()-x>2e3&&a.wake(),setTimeout(C,2e3)};C(),n.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},n.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},n.resume=function(t,e){return null!=t&&this.seek(t,e),this.paused(!1)},n.seek=function(t,e){return this.totalTime(Number(t),e!==!1)},n.restart=function(t,e){return this.reversed(!1).paused(!1).totalTime(t?-this._delay:0,e!==!1,!0)},n.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},n.render=function(){},n.invalidate=function(){return this._time=this._totalTime=0,this._initted=this._gc=!1,this._rawPrevTime=-1,(this._gc||!this.timeline)&&this._enabled(!0),this},n.isActive=function(){var t,e=this._timeline,i=this._startTime;return!e||!this._gc&&!this._paused&&e.isActive()&&(t=e.rawTime())>=i&&i+this.totalDuration()/this._timeScale>t},n._enabled=function(t,e){return o||a.wake(),this._gc=!t,this._active=this.isActive(),e!==!0&&(t&&!this.timeline?this._timeline.add(this,this._startTime-this._delay):!t&&this.timeline&&this._timeline._remove(this,!0)),!1},n._kill=function(){return this._enabled(!1,!1)},n.kill=function(t,e){return this._kill(t,e),this},n._uncache=function(t){for(var e=t?this:this.timeline;e;)e._dirty=!0,e=e.timeline;return this},n._swapSelfInParams=function(t){for(var e=t.length,i=t.concat();--e>-1;)"{self}"===t[e]&&(i[e]=this);return i},n._callback=function(t){var e=this.vars;e[t].apply(e[t+"Scope"]||e.callbackScope||this,e[t+"Params"]||T)},n.eventCallback=function(t,e,i,s){if("on"===(t||"").substr(0,2)){var r=this.vars;if(1===arguments.length)return r[t];null==e?delete r[t]:(r[t]=e,r[t+"Params"]=c(i)&&-1!==i.join("").indexOf("{self}")?this._swapSelfInParams(i):i,r[t+"Scope"]=s),"onUpdate"===t&&(this._onUpdate=e)}return this},n.delay=function(t){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+t-this._delay),this._delay=t,this):this._delay},n.duration=function(t){return arguments.length?(this._duration=this._totalDuration=t,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==t&&this.totalTime(this._totalTime*(t/this._duration),!0),this):(this._dirty=!1,this._duration)},n.totalDuration=function(t){return this._dirty=!1,arguments.length?this.duration(t):this._totalDuration},n.time=function(t,e){return arguments.length?(this._dirty&&this.totalDuration(),this.totalTime(t>this._duration?this._duration:t,e)):this._time},n.totalTime=function(t,e,i){if(o||a.wake(),!arguments.length)return this._totalTime;if(this._timeline){if(0>t&&!i&&(t+=this.totalDuration()),this._timeline.smoothChildTiming){this._dirty&&this.totalDuration();var s=this._totalDuration,r=this._timeline;if(t>s&&!i&&(t=s),this._startTime=(this._paused?this._pauseTime:r._time)-(this._reversed?s-t:t)/this._timeScale,r._dirty||this._uncache(!1),r._timeline)for(;r._timeline;)r._timeline._time!==(r._startTime+r._totalTime)/r._timeScale&&r.totalTime(r._totalTime,!0),r=r._timeline}this._gc&&this._enabled(!0,!1),(this._totalTime!==t||0===this._duration)&&(z.length&&V(),this.render(t,e,!1),z.length&&V())}return this},n.progress=n.totalProgress=function(t,e){var i=this.duration();return arguments.length?this.totalTime(i*t,e):i?this._time/i:this.ratio},n.startTime=function(t){return arguments.length?(t!==this._startTime&&(this._startTime=t,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,t-this._delay)),this):this._startTime},n.endTime=function(t){return this._startTime+(0!=t?this.totalDuration():this.duration())/this._timeScale},n.timeScale=function(t){if(!arguments.length)return this._timeScale;if(t=t||_,this._timeline&&this._timeline.smoothChildTiming){var e=this._pauseTime,i=e||0===e?e:this._timeline.totalTime();this._startTime=i-(i-this._startTime)*this._timeScale/t}return this._timeScale=t,this._uncache(!1)},n.reversed=function(t){return arguments.length?(t!=this._reversed&&(this._reversed=t,this.totalTime(this._timeline&&!this._timeline.smoothChildTiming?this.totalDuration()-this._totalTime:this._totalTime,!0)),this):this._reversed},n.paused=function(t){if(!arguments.length)return this._paused;var e,i,s=this._timeline;return t!=this._paused&&s&&(o||t||a.wake(),e=s.rawTime(),i=e-this._pauseTime,!t&&s.smoothChildTiming&&(this._startTime+=i,this._uncache(!1)),this._pauseTime=t?e:null,this._paused=t,this._active=this.isActive(),!t&&0!==i&&this._initted&&this.duration()&&(e=s.smoothChildTiming?this._totalTime:(e-this._startTime)/this._timeScale,this.render(e,e===this._totalTime,!0))),this._gc&&!t&&this._enabled(!0,!1),this};var D=v("core.SimpleTimeline",function(t){R.call(this,0,t),this.autoRemoveChildren=this.smoothChildTiming=!0});n=D.prototype=new R,n.constructor=D,n.kill()._gc=!1,n._first=n._last=n._recent=null,n._sortChildren=!1,n.add=n.insert=function(t,e){var i,s;if(t._startTime=Number(e||0)+t._delay,t._paused&&this!==t._timeline&&(t._pauseTime=t._startTime+(this.rawTime()-t._startTime)/t._timeScale),t.timeline&&t.timeline._remove(t,!0),t.timeline=t._timeline=this,t._gc&&t._enabled(!0,!0),i=this._last,this._sortChildren)for(s=t._startTime;i&&i._startTime>s;)i=i._prev;return i?(t._next=i._next,i._next=t):(t._next=this._first,this._first=t),t._next?t._next._prev=t:this._last=t,t._prev=i,this._recent=t,this._timeline&&this._uncache(!0),this},n._remove=function(t,e){return t.timeline===this&&(e||t._enabled(!1,!0),t._prev?t._prev._next=t._next:this._first===t&&(this._first=t._next),t._next?t._next._prev=t._prev:this._last===t&&(this._last=t._prev),t._next=t._prev=t.timeline=null,t===this._recent&&(this._recent=this._last),this._timeline&&this._uncache(!0)),this},n.render=function(t,e,i){var s,r=this._first;for(this._totalTime=this._time=this._rawPrevTime=t;r;)s=r._next,(r._active||t>=r._startTime&&!r._paused)&&(r._reversed?r.render((r._dirty?r.totalDuration():r._totalDuration)-(t-r._startTime)*r._timeScale,e,i):r.render((t-r._startTime)*r._timeScale,e,i)),r=s},n.rawTime=function(){return o||a.wake(),this._totalTime};var I=v("TweenLite",function(e,i,s){if(R.call(this,i,s),this.render=I.prototype.render,null==e)throw"Cannot tween a null target.";this.target=e="string"!=typeof e?e:I.selector(e)||e;var r,n,a,o=e.jquery||e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType),l=this.vars.overwrite;if(this._overwrite=l=null==l?$[I.defaultOverwrite]:"number"==typeof l?l>>0:$[l],(o||e instanceof Array||e.push&&c(e))&&"number"!=typeof e[0])for(this._targets=a=u(e),this._propLookup=[],this._siblings=[],r=0;a.length>r;r++)n=a[r],n?"string"!=typeof n?n.length&&n!==t&&n[0]&&(n[0]===t||n[0].nodeType&&n[0].style&&!n.nodeType)?(a.splice(r--,1),this._targets=a=a.concat(u(n))):(this._siblings[r]=W(n,this,!1),1===l&&this._siblings[r].length>1&&Y(n,this,null,1,this._siblings[r])):(n=a[r--]=I.selector(n),"string"==typeof n&&a.splice(r+1,1)):a.splice(r--,1);else this._propLookup={},this._siblings=W(e,this,!1),1===l&&this._siblings.length>1&&Y(e,this,null,1,this._siblings);(this.vars.immediateRender||0===i&&0===this._delay&&this.vars.immediateRender!==!1)&&(this._time=-_,this.render(-this._delay))},!0),E=function(e){return e&&e.length&&e!==t&&e[0]&&(e[0]===t||e[0].nodeType&&e[0].style&&!e.nodeType)},O=function(t,e){var i,s={};for(i in t)M[i]||i in e&&"transform"!==i&&"x"!==i&&"y"!==i&&"width"!==i&&"height"!==i&&"className"!==i&&"border"!==i||!(!Q[i]||Q[i]&&Q[i]._autoCSS)||(s[i]=t[i],delete t[i]);t.css=s};n=I.prototype=new R,n.constructor=I,n.kill()._gc=!1,n.ratio=0,n._firstPT=n._targets=n._overwrittenProps=n._startAt=null,n._notifyPluginsOfEnabled=n._lazy=!1,I.version="1.18.0",I.defaultEase=n._ease=new y(null,null,1,1),I.defaultOverwrite="auto",I.ticker=a,I.autoSleep=120,I.lagSmoothing=function(t,e){a.lagSmoothing(t,e)},I.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(I.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)};var z=[],F={},L=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,N=function(t){for(var e,i=this._firstPT,s=1e-6;i;)e=i.blob?t?this.join(""):this.start:i.c*t+i.s,i.r?e=Math.round(e):s>e&&e>-s&&(e=0),i.f?i.fp?i.t[i.p](i.fp,e):i.t[i.p](e):i.t[i.p]=e,i=i._next},U=function(t,e,i,s){var r,n,a,o,l,h,_,u=[t,e],f=0,c="",m=0;for(u.start=t,i&&(i(u),t=u[0],e=u[1]),u.length=0,r=t.match(L)||[],n=e.match(L)||[],s&&(s._next=null,s.blob=1,u._firstPT=s),l=n.length,o=0;l>o;o++)_=n[o],h=e.substr(f,e.indexOf(_,f)-f),c+=h||!o?h:",",f+=h.length,m?m=(m+1)%5:"rgba("===h.substr(-5)&&(m=1),_===r[o]||o>=r.length?c+=_:(c&&(u.push(c),c=""),a=parseFloat(r[o]),u.push(a),u._firstPT={_next:u._firstPT,t:u,p:u.length-1,s:a,c:("="===_.charAt(1)?parseInt(_.charAt(0)+"1",10)*parseFloat(_.substr(2)):parseFloat(_)-a)||0,f:0,r:m&&4>m}),f+=_.length;return c+=e.substr(f),c&&u.push(c),u.setRatio=N,u},j=function(t,e,i,s,r,n,a,o){var l,h,_="get"===i?t[e]:i,u=typeof t[e],f="string"==typeof s&&"="===s.charAt(1),c={t:t,p:e,s:_,f:"function"===u,pg:0,n:r||e,r:n,pr:0,c:f?parseInt(s.charAt(0)+"1",10)*parseFloat(s.substr(2)):parseFloat(s)-_||0};return"number"!==u&&("function"===u&&"get"===i&&(h=e.indexOf("set")||"function"!=typeof t["get"+e.substr(3)]?e:"get"+e.substr(3),c.s=_=a?t[h](a):t[h]()),"string"==typeof _&&(a||isNaN(_))?(c.fp=a,l=U(_,s,o||I.defaultStringFilter,c),c={t:l,p:"setRatio",s:0,c:1,f:2,pg:0,n:r||e,pr:0}):f||(c.c=parseFloat(s)-parseFloat(_)||0)),c.c?((c._next=this._firstPT)&&(c._next._prev=c),this._firstPT=c,c):void 0},G=I._internals={isArray:c,isSelector:E,lazyTweens:z,blobDif:U},Q=I._plugins={},q=G.tweenLookup={},B=0,M=G.reservedProps={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1,lazy:1,onOverwrite:1,callbackScope:1,stringFilter:1},$={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},K=R._rootFramesTimeline=new D,H=R._rootTimeline=new D,J=30,V=G.lazyRender=function(){var t,e=z.length;for(F={};--e>-1;)t=z[e],t&&t._lazy!==!1&&(t.render(t._lazy[0],t._lazy[1],!0),t._lazy=!1);z.length=0};H._startTime=a.time,K._startTime=a.frame,H._active=K._active=!0,setTimeout(V,1),R._updateRoot=I.render=function(){var t,e,i;if(z.length&&V(),H.render((a.time-H._startTime)*H._timeScale,!1,!1),K.render((a.frame-K._startTime)*K._timeScale,!1,!1),z.length&&V(),a.frame>=J){J=a.frame+(parseInt(I.autoSleep,10)||120);for(i in q){for(e=q[i].tweens,t=e.length;--t>-1;)e[t]._gc&&e.splice(t,1);0===e.length&&delete q[i]}if(i=H._first,(!i||i._paused)&&I.autoSleep&&!K._first&&1===a._listeners.tick.length){for(;i&&i._paused;)i=i._next;i||a.sleep()}}},a.addEventListener("tick",R._updateRoot);var W=function(t,e,i){var s,r,n=t._gsTweenID;if(q[n||(t._gsTweenID=n="t"+B++)]||(q[n]={target:t,tweens:[]}),e&&(s=q[n].tweens,s[r=s.length]=e,i))for(;--r>-1;)s[r]===e&&s.splice(r,1);return q[n].tweens},X=function(t,e,i,s){var r,n,a=t.vars.onOverwrite;return a&&(r=a(t,e,i,s)),a=I.onOverwrite,a&&(n=a(t,e,i,s)),r!==!1&&n!==!1},Y=function(t,e,i,s,r){var n,a,o,l;if(1===s||s>=4){for(l=r.length,n=0;l>n;n++)if((o=r[n])!==e)o._gc||o._kill(null,t,e)&&(a=!0);else if(5===s)break;return a}var h,u=e._startTime+_,f=[],c=0,m=0===e._duration;for(n=r.length;--n>-1;)(o=r[n])===e||o._gc||o._paused||(o._timeline!==e._timeline?(h=h||Z(e,0,m),0===Z(o,h,m)&&(f[c++]=o)):u>=o._startTime&&o._startTime+o.totalDuration()/o._timeScale>u&&((m||!o._initted)&&2e-10>=u-o._startTime||(f[c++]=o)));for(n=c;--n>-1;)if(o=f[n],2===s&&o._kill(i,t,e)&&(a=!0),2!==s||!o._firstPT&&o._initted){if(2!==s&&!X(o,e))continue;o._enabled(!1,!1)&&(a=!0)}return a},Z=function(t,e,i){for(var s=t._timeline,r=s._timeScale,n=t._startTime;s._timeline;){if(n+=s._startTime,r*=s._timeScale,s._paused)return-100;s=s._timeline}return n/=r,n>e?n-e:i&&n===e||!t._initted&&2*_>n-e?_:(n+=t.totalDuration()/t._timeScale/r)>e+_?0:n-e-_};n._init=function(){var t,e,i,s,r,n=this.vars,a=this._overwrittenProps,o=this._duration,l=!!n.immediateRender,h=n.ease;if(n.startAt){this._startAt&&(this._startAt.render(-1,!0),this._startAt.kill()),r={};for(s in n.startAt)r[s]=n.startAt[s];if(r.overwrite=!1,r.immediateRender=!0,r.lazy=l&&n.lazy!==!1,r.startAt=r.delay=null,this._startAt=I.to(this.target,0,r),l)if(this._time>0)this._startAt=null;else if(0!==o)return}else if(n.runBackwards&&0!==o)if(this._startAt)this._startAt.render(-1,!0),this._startAt.kill(),this._startAt=null;else{0!==this._time&&(l=!1),i={};for(s in n)M[s]&&"autoCSS"!==s||(i[s]=n[s]);if(i.overwrite=0,i.data="isFromStart",i.lazy=l&&n.lazy!==!1,i.immediateRender=l,this._startAt=I.to(this.target,0,i),l){if(0===this._time)return}else this._startAt._init(),this._startAt._enabled(!1),this.vars.immediateRender&&(this._startAt=null)}if(this._ease=h=h?h instanceof y?h:"function"==typeof h?new y(h,n.easeParams):w[h]||I.defaultEase:I.defaultEase,n.easeParams instanceof Array&&h.config&&(this._ease=h.config.apply(h,n.easeParams)),this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(t=this._targets.length;--t>-1;)this._initProps(this._targets[t],this._propLookup[t]={},this._siblings[t],a?a[t]:null)&&(e=!0);else e=this._initProps(this.target,this._propLookup,this._siblings,a);if(e&&I._onPluginEvent("_onInitAllProps",this),a&&(this._firstPT||"function"!=typeof this.target&&this._enabled(!1,!1)),n.runBackwards)for(i=this._firstPT;i;)i.s+=i.c,i.c=-i.c,i=i._next;this._onUpdate=n.onUpdate,this._initted=!0},n._initProps=function(e,i,s,r){var n,a,o,l,h,_;if(null==e)return!1;F[e._gsTweenID]&&V(),this.vars.css||e.style&&e!==t&&e.nodeType&&Q.css&&this.vars.autoCSS!==!1&&O(this.vars,e);for(n in this.vars)if(_=this.vars[n],M[n])_&&(_ instanceof Array||_.push&&c(_))&&-1!==_.join("").indexOf("{self}")&&(this.vars[n]=_=this._swapSelfInParams(_,this));else if(Q[n]&&(l=new Q[n])._onInitTween(e,this.vars[n],this)){for(this._firstPT=h={_next:this._firstPT,t:l,p:"setRatio",s:0,c:1,f:1,n:n,pg:1,pr:l._priority},a=l._overwriteProps.length;--a>-1;)i[l._overwriteProps[a]]=this._firstPT;(l._priority||l._onInitAllProps)&&(o=!0),(l._onDisable||l._onEnable)&&(this._notifyPluginsOfEnabled=!0),h._next&&(h._next._prev=h)}else i[n]=j.call(this,e,n,"get",_,n,0,null,this.vars.stringFilter);return r&&this._kill(r,e)?this._initProps(e,i,s,r):this._overwrite>1&&this._firstPT&&s.length>1&&Y(e,this,i,this._overwrite,s)?(this._kill(i,e),this._initProps(e,i,s,r)):(this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration)&&(F[e._gsTweenID]=!0),o)},n.render=function(t,e,i){var s,r,n,a,o=this._time,l=this._duration,h=this._rawPrevTime;if(t>=l)this._totalTime=this._time=l,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(s=!0,r="onComplete",i=i||this._timeline.autoRemoveChildren),0===l&&(this._initted||!this.vars.lazy||i)&&(this._startTime===this._timeline._duration&&(t=0),(0===t||0>h||h===_&&"isPause"!==this.data)&&h!==t&&(i=!0,h>_&&(r="onReverseComplete")),this._rawPrevTime=a=!e||t||h===t?t:_);else if(1e-7>t)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==o||0===l&&h>0)&&(r="onReverseComplete",s=this._reversed),0>t&&(this._active=!1,0===l&&(this._initted||!this.vars.lazy||i)&&(h>=0&&(h!==_||"isPause"!==this.data)&&(i=!0),this._rawPrevTime=a=!e||t||h===t?t:_)),this._initted||(i=!0);else if(this._totalTime=this._time=t,this._easeType){var u=t/l,f=this._easeType,c=this._easePower;(1===f||3===f&&u>=.5)&&(u=1-u),3===f&&(u*=2),1===c?u*=u:2===c?u*=u*u:3===c?u*=u*u*u:4===c&&(u*=u*u*u*u),this.ratio=1===f?1-u:2===f?u:.5>t/l?u/2:1-u/2}else this.ratio=this._ease.getRatio(t/l);if(this._time!==o||i){if(!this._initted){if(this._init(),!this._initted||this._gc)return;if(!i&&this._firstPT&&(this.vars.lazy!==!1&&this._duration||this.vars.lazy&&!this._duration))return this._time=this._totalTime=o,this._rawPrevTime=h,z.push(this),this._lazy=[t,e],void 0;this._time&&!s?this.ratio=this._ease.getRatio(this._time/l):s&&this._ease._calcEnd&&(this.ratio=this._ease.getRatio(0===this._time?0:1))}for(this._lazy!==!1&&(this._lazy=!1),this._active||!this._paused&&this._time!==o&&t>=0&&(this._active=!0),0===o&&(this._startAt&&(t>=0?this._startAt.render(t,e,i):r||(r="_dummyGS")),this.vars.onStart&&(0!==this._time||0===l)&&(e||this._callback("onStart"))),n=this._firstPT;n;)n.f?n.t[n.p](n.c*this.ratio+n.s):n.t[n.p]=n.c*this.ratio+n.s,n=n._next;this._onUpdate&&(0>t&&this._startAt&&t!==-1e-4&&this._startAt.render(t,e,i),e||(this._time!==o||s)&&this._callback("onUpdate")),r&&(!this._gc||i)&&(0>t&&this._startAt&&!this._onUpdate&&t!==-1e-4&&this._startAt.render(t,e,i),s&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[r]&&this._callback(r),0===l&&this._rawPrevTime===_&&a!==_&&(this._rawPrevTime=0))}},n._kill=function(t,e,i){if("all"===t&&(t=null),null==t&&(null==e||e===this.target))return this._lazy=!1,this._enabled(!1,!1);e="string"!=typeof e?e||this._targets||this.target:I.selector(e)||e;var s,r,n,a,o,l,h,_,u,f=i&&this._time&&i._startTime===this._startTime&&this._timeline===i._timeline;if((c(e)||E(e))&&"number"!=typeof e[0])for(s=e.length;--s>-1;)this._kill(t,e[s],i)&&(l=!0);else{if(this._targets){for(s=this._targets.length;--s>-1;)if(e===this._targets[s]){o=this._propLookup[s]||{},this._overwrittenProps=this._overwrittenProps||[],r=this._overwrittenProps[s]=t?this._overwrittenProps[s]||{}:"all";break}}else{if(e!==this.target)return!1;o=this._propLookup,r=this._overwrittenProps=t?this._overwrittenProps||{}:"all"}if(o){if(h=t||o,_=t!==r&&"all"!==r&&t!==o&&("object"!=typeof t||!t._tempKill),i&&(I.onOverwrite||this.vars.onOverwrite)){for(n in h)o[n]&&(u||(u=[]),u.push(n));if((u||!t)&&!X(this,i,e,u))return!1}for(n in h)(a=o[n])&&(f&&(a.f?a.t[a.p](a.s):a.t[a.p]=a.s,l=!0),a.pg&&a.t._kill(h)&&(l=!0),a.pg&&0!==a.t._overwriteProps.length||(a._prev?a._prev._next=a._next:a===this._firstPT&&(this._firstPT=a._next),a._next&&(a._next._prev=a._prev),a._next=a._prev=null),delete o[n]),_&&(r[n]=1);!this._firstPT&&this._initted&&this._enabled(!1,!1)}}return l},n.invalidate=function(){return this._notifyPluginsOfEnabled&&I._onPluginEvent("_onDisable",this),this._firstPT=this._overwrittenProps=this._startAt=this._onUpdate=null,this._notifyPluginsOfEnabled=this._active=this._lazy=!1,this._propLookup=this._targets?{}:[],R.prototype.invalidate.call(this),this.vars.immediateRender&&(this._time=-_,this.render(-this._delay)),this},n._enabled=function(t,e){if(o||a.wake(),t&&this._gc){var i,s=this._targets;if(s)for(i=s.length;--i>-1;)this._siblings[i]=W(s[i],this,!0);else this._siblings=W(this.target,this,!0)}return R.prototype._enabled.call(this,t,e),this._notifyPluginsOfEnabled&&this._firstPT?I._onPluginEvent(t?"_onEnable":"_onDisable",this):!1},I.to=function(t,e,i){return new I(t,e,i)},I.from=function(t,e,i){return i.runBackwards=!0,i.immediateRender=0!=i.immediateRender,new I(t,e,i)},I.fromTo=function(t,e,i,s){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,new I(t,e,s)},I.delayedCall=function(t,e,i,s,r){return new I(e,0,{delay:t,onComplete:e,onCompleteParams:i,callbackScope:s,onReverseComplete:e,onReverseCompleteParams:i,immediateRender:!1,lazy:!1,useFrames:r,overwrite:0})},I.set=function(t,e){return new I(t,0,e)},I.getTweensOf=function(t,e){if(null==t)return[];t="string"!=typeof t?t:I.selector(t)||t;var i,s,r,n;if((c(t)||E(t))&&"number"!=typeof t[0]){for(i=t.length,s=[];--i>-1;)s=s.concat(I.getTweensOf(t[i],e));for(i=s.length;--i>-1;)for(n=s[i],r=i;--r>-1;)n===s[r]&&s.splice(i,1)}else for(s=W(t).concat(),i=s.length;--i>-1;)(s[i]._gc||e&&!s[i].isActive())&&s.splice(i,1);return s},I.killTweensOf=I.killDelayedCallsTo=function(t,e,i){"object"==typeof e&&(i=e,e=!1);for(var s=I.getTweensOf(t,e),r=s.length;--r>-1;)s[r]._kill(i,t)};var te=v("plugins.TweenPlugin",function(t,e){this._overwriteProps=(t||"").split(","),this._propName=this._overwriteProps[0],this._priority=e||0,this._super=te.prototype},!0);if(n=te.prototype,te.version="1.18.0",te.API=2,n._firstPT=null,n._addTween=j,n.setRatio=N,n._kill=function(t){var e,i=this._overwriteProps,s=this._firstPT;if(null!=t[this._propName])this._overwriteProps=[];else for(e=i.length;--e>-1;)null!=t[i[e]]&&i.splice(e,1);for(;s;)null!=t[s.n]&&(s._next&&(s._next._prev=s._prev),s._prev?(s._prev._next=s._next,s._prev=null):this._firstPT===s&&(this._firstPT=s._next)),s=s._next;return!1},n._roundProps=function(t,e){for(var i=this._firstPT;i;)(t[this._propName]||null!=i.n&&t[i.n.split(this._propName+"_").join("")])&&(i.r=e),i=i._next},I._onPluginEvent=function(t,e){var i,s,r,n,a,o=e._firstPT;if("_onInitAllProps"===t){for(;o;){for(a=o._next,s=r;s&&s.pr>o.pr;)s=s._next;(o._prev=s?s._prev:n)?o._prev._next=o:r=o,(o._next=s)?s._prev=o:n=o,o=a}o=e._firstPT=r}for(;o;)o.pg&&"function"==typeof o.t[t]&&o.t[t]()&&(i=!0),o=o._next;return i},te.activate=function(t){for(var e=t.length;--e>-1;)t[e].API===te.API&&(Q[(new t[e])._propName]=t[e]);return!0},d.plugin=function(t){if(!(t&&t.propName&&t.init&&t.API))throw"illegal plugin definition.";var e,i=t.propName,s=t.priority||0,r=t.overwriteProps,n={init:"_onInitTween",set:"setRatio",kill:"_kill",round:"_roundProps",initAll:"_onInitAllProps"},a=v("plugins."+i.charAt(0).toUpperCase()+i.substr(1)+"Plugin",function(){te.call(this,i,s),this._overwriteProps=r||[]},t.global===!0),o=a.prototype=new te(i);o.constructor=a,a.API=t.API;for(e in n)"function"==typeof t[e]&&(o[n[e]]=t[e]);return a.version=t.version,te.activate([a]),a},s=t._gsQueue){for(r=0;s.length>r;r++)s[r]();for(n in m)m[n].func||t.console.log("GSAP encountered missing dependency: com.greensock."+n)}o=!1}})("undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window,"TweenLite");

/*!
 * VERSION: 1.18.0
 * DATE: 2015-08-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("TimelineLite",["core.Animation","core.SimpleTimeline","TweenLite"],function(t,e,i){var s=function(t){e.call(this,t),this._labels={},this.autoRemoveChildren=this.vars.autoRemoveChildren===!0,this.smoothChildTiming=this.vars.smoothChildTiming===!0,this._sortChildren=!0,this._onUpdate=this.vars.onUpdate;var i,s,r=this.vars;for(s in r)i=r[s],l(i)&&-1!==i.join("").indexOf("{self}")&&(r[s]=this._swapSelfInParams(i));l(r.tweens)&&this.add(r.tweens,0,r.align,r.stagger)},r=1e-10,n=i._internals,a=s._internals={},o=n.isSelector,l=n.isArray,h=n.lazyTweens,_=n.lazyRender,u=_gsScope._gsDefine.globals,f=function(t){var e,i={};for(e in t)i[e]=t[e];return i},c=function(t,e,i){var s,r,n=t.cycle;for(s in n)r=n[s],t[s]="function"==typeof r?r.call(e[i],i):r[i%r.length];delete t.cycle},p=a.pauseCallback=function(){},m=function(t){var e,i=[],s=t.length;for(e=0;e!==s;i.push(t[e++]));return i},d=s.prototype=new e;return s.version="1.18.0",d.constructor=s,d.kill()._gc=d._forcingPlayhead=d._hasPause=!1,d.to=function(t,e,s,r){var n=s.repeat&&u.TweenMax||i;return e?this.add(new n(t,e,s),r):this.set(t,s,r)},d.from=function(t,e,s,r){return this.add((s.repeat&&u.TweenMax||i).from(t,e,s),r)},d.fromTo=function(t,e,s,r,n){var a=r.repeat&&u.TweenMax||i;return e?this.add(a.fromTo(t,e,s,r),n):this.set(t,r,n)},d.staggerTo=function(t,e,r,n,a,l,h,_){var u,p,d=new s({onComplete:l,onCompleteParams:h,callbackScope:_,smoothChildTiming:this.smoothChildTiming}),g=r.cycle;for("string"==typeof t&&(t=i.selector(t)||t),t=t||[],o(t)&&(t=m(t)),n=n||0,0>n&&(t=m(t),t.reverse(),n*=-1),p=0;t.length>p;p++)u=f(r),u.startAt&&(u.startAt=f(u.startAt),u.startAt.cycle&&c(u.startAt,t,p)),g&&c(u,t,p),d.to(t[p],e,u,p*n);return this.add(d,a)},d.staggerFrom=function(t,e,i,s,r,n,a,o){return i.immediateRender=0!=i.immediateRender,i.runBackwards=!0,this.staggerTo(t,e,i,s,r,n,a,o)},d.staggerFromTo=function(t,e,i,s,r,n,a,o,l){return s.startAt=i,s.immediateRender=0!=s.immediateRender&&0!=i.immediateRender,this.staggerTo(t,e,s,r,n,a,o,l)},d.call=function(t,e,s,r){return this.add(i.delayedCall(0,t,e,s),r)},d.set=function(t,e,s){return s=this._parseTimeOrLabel(s,0,!0),null==e.immediateRender&&(e.immediateRender=s===this._time&&!this._paused),this.add(new i(t,0,e),s)},s.exportRoot=function(t,e){t=t||{},null==t.smoothChildTiming&&(t.smoothChildTiming=!0);var r,n,a=new s(t),o=a._timeline;for(null==e&&(e=!0),o._remove(a,!0),a._startTime=0,a._rawPrevTime=a._time=a._totalTime=o._time,r=o._first;r;)n=r._next,e&&r instanceof i&&r.target===r.vars.onComplete||a.add(r,r._startTime-r._delay),r=n;return o.add(a,0),a},d.add=function(r,n,a,o){var h,_,u,f,c,p;if("number"!=typeof n&&(n=this._parseTimeOrLabel(n,0,!0,r)),!(r instanceof t)){if(r instanceof Array||r&&r.push&&l(r)){for(a=a||"normal",o=o||0,h=n,_=r.length,u=0;_>u;u++)l(f=r[u])&&(f=new s({tweens:f})),this.add(f,h),"string"!=typeof f&&"function"!=typeof f&&("sequence"===a?h=f._startTime+f.totalDuration()/f._timeScale:"start"===a&&(f._startTime-=f.delay())),h+=o;return this._uncache(!0)}if("string"==typeof r)return this.addLabel(r,n);if("function"!=typeof r)throw"Cannot add "+r+" into the timeline; it is not a tween, timeline, function, or string.";r=i.delayedCall(0,r)}if(e.prototype.add.call(this,r,n),(this._gc||this._time===this._duration)&&!this._paused&&this._duration<this.duration())for(c=this,p=c.rawTime()>r._startTime;c._timeline;)p&&c._timeline.smoothChildTiming?c.totalTime(c._totalTime,!0):c._gc&&c._enabled(!0,!1),c=c._timeline;return this},d.remove=function(e){if(e instanceof t){this._remove(e,!1);var i=e._timeline=e.vars.useFrames?t._rootFramesTimeline:t._rootTimeline;return e._startTime=(e._paused?e._pauseTime:i._time)-(e._reversed?e.totalDuration()-e._totalTime:e._totalTime)/e._timeScale,this}if(e instanceof Array||e&&e.push&&l(e)){for(var s=e.length;--s>-1;)this.remove(e[s]);return this}return"string"==typeof e?this.removeLabel(e):this.kill(null,e)},d._remove=function(t,i){e.prototype._remove.call(this,t,i);var s=this._last;return s?this._time>s._startTime+s._totalDuration/s._timeScale&&(this._time=this.duration(),this._totalTime=this._totalDuration):this._time=this._totalTime=this._duration=this._totalDuration=0,this},d.append=function(t,e){return this.add(t,this._parseTimeOrLabel(null,e,!0,t))},d.insert=d.insertMultiple=function(t,e,i,s){return this.add(t,e||0,i,s)},d.appendMultiple=function(t,e,i,s){return this.add(t,this._parseTimeOrLabel(null,e,!0,t),i,s)},d.addLabel=function(t,e){return this._labels[t]=this._parseTimeOrLabel(e),this},d.addPause=function(t,e,s,r){var n=i.delayedCall(0,p,s,r||this);return n.vars.onComplete=n.vars.onReverseComplete=e,n.data="isPause",this._hasPause=!0,this.add(n,t)},d.removeLabel=function(t){return delete this._labels[t],this},d.getLabelTime=function(t){return null!=this._labels[t]?this._labels[t]:-1},d._parseTimeOrLabel=function(e,i,s,r){var n;if(r instanceof t&&r.timeline===this)this.remove(r);else if(r&&(r instanceof Array||r.push&&l(r)))for(n=r.length;--n>-1;)r[n]instanceof t&&r[n].timeline===this&&this.remove(r[n]);if("string"==typeof i)return this._parseTimeOrLabel(i,s&&"number"==typeof e&&null==this._labels[i]?e-this.duration():0,s);if(i=i||0,"string"!=typeof e||!isNaN(e)&&null==this._labels[e])null==e&&(e=this.duration());else{if(n=e.indexOf("="),-1===n)return null==this._labels[e]?s?this._labels[e]=this.duration()+i:i:this._labels[e]+i;i=parseInt(e.charAt(n-1)+"1",10)*Number(e.substr(n+1)),e=n>1?this._parseTimeOrLabel(e.substr(0,n-1),0,s):this.duration()}return Number(e)+i},d.seek=function(t,e){return this.totalTime("number"==typeof t?t:this._parseTimeOrLabel(t),e!==!1)},d.stop=function(){return this.paused(!0)},d.gotoAndPlay=function(t,e){return this.play(t,e)},d.gotoAndStop=function(t,e){return this.pause(t,e)},d.render=function(t,e,i){this._gc&&this._enabled(!0,!1);var s,n,a,o,l,u,f=this._dirty?this.totalDuration():this._totalDuration,c=this._time,p=this._startTime,m=this._timeScale,d=this._paused;if(t>=f)this._totalTime=this._time=f,this._reversed||this._hasPausedChild()||(n=!0,o="onComplete",l=!!this._timeline.autoRemoveChildren,0===this._duration&&(0===t||0>this._rawPrevTime||this._rawPrevTime===r)&&this._rawPrevTime!==t&&this._first&&(l=!0,this._rawPrevTime>r&&(o="onReverseComplete"))),this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,t=f+1e-4;else if(1e-7>t)if(this._totalTime=this._time=0,(0!==c||0===this._duration&&this._rawPrevTime!==r&&(this._rawPrevTime>0||0>t&&this._rawPrevTime>=0))&&(o="onReverseComplete",n=this._reversed),0>t)this._active=!1,this._timeline.autoRemoveChildren&&this._reversed?(l=n=!0,o="onReverseComplete"):this._rawPrevTime>=0&&this._first&&(l=!0),this._rawPrevTime=t;else{if(this._rawPrevTime=this._duration||!e||t||this._rawPrevTime===t?t:r,0===t&&n)for(s=this._first;s&&0===s._startTime;)s._duration||(n=!1),s=s._next;t=0,this._initted||(l=!0)}else{if(this._hasPause&&!this._forcingPlayhead&&!e){if(t>=c)for(s=this._first;s&&t>=s._startTime&&!u;)s._duration||"isPause"!==s.data||s.ratio||0===s._startTime&&0===this._rawPrevTime||(u=s),s=s._next;else for(s=this._last;s&&s._startTime>=t&&!u;)s._duration||"isPause"===s.data&&s._rawPrevTime>0&&(u=s),s=s._prev;u&&(this._time=t=u._startTime,this._totalTime=t+this._cycle*(this._totalDuration+this._repeatDelay))}this._totalTime=this._time=this._rawPrevTime=t}if(this._time!==c&&this._first||i||l||u){if(this._initted||(this._initted=!0),this._active||!this._paused&&this._time!==c&&t>0&&(this._active=!0),0===c&&this.vars.onStart&&0!==this._time&&(e||this._callback("onStart")),this._time>=c)for(s=this._first;s&&(a=s._next,!this._paused||d);)(s._active||s._startTime<=this._time&&!s._paused&&!s._gc)&&(u===s&&this.pause(),s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)),s=a;else for(s=this._last;s&&(a=s._prev,!this._paused||d);){if(s._active||c>=s._startTime&&!s._paused&&!s._gc){if(u===s){for(u=s._prev;u&&u.endTime()>this._time;)u.render(u._reversed?u.totalDuration()-(t-u._startTime)*u._timeScale:(t-u._startTime)*u._timeScale,e,i),u=u._prev;u=null,this.pause()}s._reversed?s.render((s._dirty?s.totalDuration():s._totalDuration)-(t-s._startTime)*s._timeScale,e,i):s.render((t-s._startTime)*s._timeScale,e,i)}s=a}this._onUpdate&&(e||(h.length&&_(),this._callback("onUpdate"))),o&&(this._gc||(p===this._startTime||m!==this._timeScale)&&(0===this._time||f>=this.totalDuration())&&(n&&(h.length&&_(),this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),!e&&this.vars[o]&&this._callback(o)))}},d._hasPausedChild=function(){for(var t=this._first;t;){if(t._paused||t instanceof s&&t._hasPausedChild())return!0;t=t._next}return!1},d.getChildren=function(t,e,s,r){r=r||-9999999999;for(var n=[],a=this._first,o=0;a;)r>a._startTime||(a instanceof i?e!==!1&&(n[o++]=a):(s!==!1&&(n[o++]=a),t!==!1&&(n=n.concat(a.getChildren(!0,e,s)),o=n.length))),a=a._next;return n},d.getTweensOf=function(t,e){var s,r,n=this._gc,a=[],o=0;for(n&&this._enabled(!0,!0),s=i.getTweensOf(t),r=s.length;--r>-1;)(s[r].timeline===this||e&&this._contains(s[r]))&&(a[o++]=s[r]);return n&&this._enabled(!1,!0),a},d.recent=function(){return this._recent},d._contains=function(t){for(var e=t.timeline;e;){if(e===this)return!0;e=e.timeline}return!1},d.shiftChildren=function(t,e,i){i=i||0;for(var s,r=this._first,n=this._labels;r;)r._startTime>=i&&(r._startTime+=t),r=r._next;if(e)for(s in n)n[s]>=i&&(n[s]+=t);return this._uncache(!0)},d._kill=function(t,e){if(!t&&!e)return this._enabled(!1,!1);for(var i=e?this.getTweensOf(e):this.getChildren(!0,!0,!1),s=i.length,r=!1;--s>-1;)i[s]._kill(t,e)&&(r=!0);return r},d.clear=function(t){var e=this.getChildren(!1,!0,!0),i=e.length;for(this._time=this._totalTime=0;--i>-1;)e[i]._enabled(!1,!1);return t!==!1&&(this._labels={}),this._uncache(!0)},d.invalidate=function(){for(var e=this._first;e;)e.invalidate(),e=e._next;return t.prototype.invalidate.call(this)},d._enabled=function(t,i){if(t===this._gc)for(var s=this._first;s;)s._enabled(t,!0),s=s._next;return e.prototype._enabled.call(this,t,i)},d.totalTime=function(){this._forcingPlayhead=!0;var e=t.prototype.totalTime.apply(this,arguments);return this._forcingPlayhead=!1,e},d.duration=function(t){return arguments.length?(0!==this.duration()&&0!==t&&this.timeScale(this._duration/t),this):(this._dirty&&this.totalDuration(),this._duration)},d.totalDuration=function(t){if(!arguments.length){if(this._dirty){for(var e,i,s=0,r=this._last,n=999999999999;r;)e=r._prev,r._dirty&&r.totalDuration(),r._startTime>n&&this._sortChildren&&!r._paused?this.add(r,r._startTime-r._delay):n=r._startTime,0>r._startTime&&!r._paused&&(s-=r._startTime,this._timeline.smoothChildTiming&&(this._startTime+=r._startTime/this._timeScale),this.shiftChildren(-r._startTime,!1,-9999999999),n=0),i=r._startTime+r._totalDuration/r._timeScale,i>s&&(s=i),r=e;this._duration=this._totalDuration=s,this._dirty=!1}return this._totalDuration}return 0!==this.totalDuration()&&0!==t&&this.timeScale(this._totalDuration/t),this},d.paused=function(e){if(!e)for(var i=this._first,s=this._time;i;)i._startTime===s&&"isPause"===i.data&&(i._rawPrevTime=0),i=i._next;return t.prototype.paused.apply(this,arguments)},d.usesFrames=function(){for(var e=this._timeline;e._timeline;)e=e._timeline;return e===t._rootFramesTimeline},d.rawTime=function(){return this._paused?this._totalTime:(this._timeline.rawTime()-this._startTime)*this._timeScale},s},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("./TweenLite.js"),module.exports=e())}("TimelineLite");

/*!
 * VERSION: beta 1.15.2
 * DATE: 2015-01-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.Back",["easing.Ease"],function(t){var e,i,s,r=_gsScope.GreenSockGlobals||_gsScope,n=r.com.greensock,a=2*Math.PI,o=Math.PI/2,h=n._class,l=function(e,i){var s=h("easing."+e,function(){},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,s},_=t.register||function(){},u=function(t,e,i,s){var r=h("easing."+t,{easeOut:new e,easeIn:new i,easeInOut:new s},!0);return _(r,t),r},c=function(t,e,i){this.t=t,this.v=e,i&&(this.next=i,i.prev=this,this.c=i.v-e,this.gap=i.t-t)},f=function(e,i){var s=h("easing."+e,function(t){this._p1=t||0===t?t:1.70158,this._p2=1.525*this._p1},!0),r=s.prototype=new t;return r.constructor=s,r.getRatio=i,r.config=function(t){return new s(t)},s},p=u("Back",f("BackOut",function(t){return(t-=1)*t*((this._p1+1)*t+this._p1)+1}),f("BackIn",function(t){return t*t*((this._p1+1)*t-this._p1)}),f("BackInOut",function(t){return 1>(t*=2)?.5*t*t*((this._p2+1)*t-this._p2):.5*((t-=2)*t*((this._p2+1)*t+this._p2)+2)})),m=h("easing.SlowMo",function(t,e,i){e=e||0===e?e:.7,null==t?t=.7:t>1&&(t=1),this._p=1!==t?e:0,this._p1=(1-t)/2,this._p2=t,this._p3=this._p1+this._p2,this._calcEnd=i===!0},!0),d=m.prototype=new t;return d.constructor=m,d.getRatio=function(t){var e=t+(.5-t)*this._p;return this._p1>t?this._calcEnd?1-(t=1-t/this._p1)*t:e-(t=1-t/this._p1)*t*t*t*e:t>this._p3?this._calcEnd?1-(t=(t-this._p3)/this._p1)*t:e+(t-e)*(t=(t-this._p3)/this._p1)*t*t*t:this._calcEnd?1:e},m.ease=new m(.7,.7),d.config=m.config=function(t,e,i){return new m(t,e,i)},e=h("easing.SteppedEase",function(t){t=t||1,this._p1=1/t,this._p2=t+1},!0),d=e.prototype=new t,d.constructor=e,d.getRatio=function(t){return 0>t?t=0:t>=1&&(t=.999999999),(this._p2*t>>0)*this._p1},d.config=e.config=function(t){return new e(t)},i=h("easing.RoughEase",function(e){e=e||{};for(var i,s,r,n,a,o,h=e.taper||"none",l=[],_=0,u=0|(e.points||20),f=u,p=e.randomize!==!1,m=e.clamp===!0,d=e.template instanceof t?e.template:null,g="number"==typeof e.strength?.4*e.strength:.4;--f>-1;)i=p?Math.random():1/u*f,s=d?d.getRatio(i):i,"none"===h?r=g:"out"===h?(n=1-i,r=n*n*g):"in"===h?r=i*i*g:.5>i?(n=2*i,r=.5*n*n*g):(n=2*(1-i),r=.5*n*n*g),p?s+=Math.random()*r-.5*r:f%2?s+=.5*r:s-=.5*r,m&&(s>1?s=1:0>s&&(s=0)),l[_++]={x:i,y:s};for(l.sort(function(t,e){return t.x-e.x}),o=new c(1,1,null),f=u;--f>-1;)a=l[f],o=new c(a.x,a.y,o);this._prev=new c(0,0,0!==o.t?o:o.next)},!0),d=i.prototype=new t,d.constructor=i,d.getRatio=function(t){var e=this._prev;if(t>e.t){for(;e.next&&t>=e.t;)e=e.next;e=e.prev}else for(;e.prev&&e.t>=t;)e=e.prev;return this._prev=e,e.v+(t-e.t)/e.gap*e.c},d.config=function(t){return new i(t)},i.ease=new i,u("Bounce",l("BounceOut",function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}),l("BounceIn",function(t){return 1/2.75>(t=1-t)?1-7.5625*t*t:2/2.75>t?1-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1-(7.5625*(t-=2.25/2.75)*t+.9375):1-(7.5625*(t-=2.625/2.75)*t+.984375)}),l("BounceInOut",function(t){var e=.5>t;return t=e?1-2*t:2*t-1,t=1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375,e?.5*(1-t):.5*t+.5})),u("Circ",l("CircOut",function(t){return Math.sqrt(1-(t-=1)*t)}),l("CircIn",function(t){return-(Math.sqrt(1-t*t)-1)}),l("CircInOut",function(t){return 1>(t*=2)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)})),s=function(e,i,s){var r=h("easing."+e,function(t,e){this._p1=t>=1?t:1,this._p2=(e||s)/(1>t?t:1),this._p3=this._p2/a*(Math.asin(1/this._p1)||0),this._p2=a/this._p2},!0),n=r.prototype=new t;return n.constructor=r,n.getRatio=i,n.config=function(t,e){return new r(t,e)},r},u("Elastic",s("ElasticOut",function(t){return this._p1*Math.pow(2,-10*t)*Math.sin((t-this._p3)*this._p2)+1},.3),s("ElasticIn",function(t){return-(this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2))},.3),s("ElasticInOut",function(t){return 1>(t*=2)?-.5*this._p1*Math.pow(2,10*(t-=1))*Math.sin((t-this._p3)*this._p2):.5*this._p1*Math.pow(2,-10*(t-=1))*Math.sin((t-this._p3)*this._p2)+1},.45)),u("Expo",l("ExpoOut",function(t){return 1-Math.pow(2,-10*t)}),l("ExpoIn",function(t){return Math.pow(2,10*(t-1))-.001}),l("ExpoInOut",function(t){return 1>(t*=2)?.5*Math.pow(2,10*(t-1)):.5*(2-Math.pow(2,-10*(t-1)))})),u("Sine",l("SineOut",function(t){return Math.sin(t*o)}),l("SineIn",function(t){return-Math.cos(t*o)+1}),l("SineInOut",function(t){return-.5*(Math.cos(Math.PI*t)-1)})),h("easing.EaseLookup",{find:function(e){return t.map[e]}},!0),_(r.SlowMo,"SlowMo","ease,"),_(i,"RoughEase","ease,"),_(e,"SteppedEase","ease,"),p},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();


/*!
 * VERSION: 1.18.0
 * DATE: 2015-09-05
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(t,e){var i,r,s,n,a=function(){t.call(this,"css"),this._overwriteProps.length=0,this.setRatio=a.prototype.setRatio},o=_gsScope._gsDefine.globals,l={},h=a.prototype=new t("css");h.constructor=a,a.version="1.18.0",a.API=2,a.defaultTransformPerspective=0,a.defaultSkewType="compensated",a.defaultSmoothOrigin=!0,h="px",a.suffixMap={top:h,right:h,bottom:h,left:h,width:h,height:h,fontSize:h,padding:h,margin:h,perspective:h,lineHeight:""};var u,f,c,_,p,d,m=/(?:\d|\-\d|\.\d|\-\.\d)+/g,g=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,v=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,y=/(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,x=/(?:\d|\-|\+|=|#|\.)*/g,T=/opacity *= *([^)]*)/i,w=/opacity:([^;]*)/i,b=/alpha\(opacity *=.+?\)/i,P=/^(rgb|hsl)/,S=/([A-Z])/g,O=/-([a-z])/gi,C=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,k=function(t,e){return e.toUpperCase()},R=/(?:Left|Right|Width)/i,A=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,M=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,D=/,(?=[^\)]*(?:\(|$))/gi,L=Math.PI/180,N=180/Math.PI,F={},X=document,z=function(t){return X.createElementNS?X.createElementNS("http://www.w3.org/1999/xhtml",t):X.createElement(t)},B=z("div"),I=z("img"),E=a._internals={_specialProps:l},Y=navigator.userAgent,W=function(){var t=Y.indexOf("Android"),e=z("a");return c=-1!==Y.indexOf("Safari")&&-1===Y.indexOf("Chrome")&&(-1===t||Number(Y.substr(t+8,1))>3),p=c&&6>Number(Y.substr(Y.indexOf("Version/")+8,1)),_=-1!==Y.indexOf("Firefox"),(/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y)||/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y))&&(d=parseFloat(RegExp.$1)),e?(e.style.cssText="top:1px;opacity:.55;",/^0.55/.test(e.style.opacity)):!1}(),V=function(t){return T.test("string"==typeof t?t:(t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?parseFloat(RegExp.$1)/100:1},j=function(t){window.console&&console.log(t)},G="",U="",q=function(t,e){e=e||B;var i,r,s=e.style;if(void 0!==s[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),i=["O","Moz","ms","Ms","Webkit"],r=5;--r>-1&&void 0===s[i[r]+t];);return r>=0?(U=3===r?"ms":i[r],G="-"+U.toLowerCase()+"-",U+t):null},H=X.defaultView?X.defaultView.getComputedStyle:function(){},Q=a.getStyle=function(t,e,i,r,s){var n;return W||"opacity"!==e?(!r&&t.style[e]?n=t.style[e]:(i=i||H(t))?n=i[e]||i.getPropertyValue(e)||i.getPropertyValue(e.replace(S,"-$1").toLowerCase()):t.currentStyle&&(n=t.currentStyle[e]),null==s||n&&"none"!==n&&"auto"!==n&&"auto auto"!==n?n:s):V(t)},Z=E.convertToPixels=function(t,i,r,s,n){if("px"===s||!s)return r;if("auto"===s||!r)return 0;var o,l,h,u=R.test(i),f=t,c=B.style,_=0>r;if(_&&(r=-r),"%"===s&&-1!==i.indexOf("border"))o=r/100*(u?t.clientWidth:t.clientHeight);else{if(c.cssText="border:0 solid red;position:"+Q(t,"position")+";line-height:0;","%"!==s&&f.appendChild&&"v"!==s.charAt(0)&&"rem"!==s)c[u?"borderLeftWidth":"borderTopWidth"]=r+s;else{if(f=t.parentNode||X.body,l=f._gsCache,h=e.ticker.frame,l&&u&&l.time===h)return l.width*r/100;c[u?"width":"height"]=r+s}f.appendChild(B),o=parseFloat(B[u?"offsetWidth":"offsetHeight"]),f.removeChild(B),u&&"%"===s&&a.cacheWidths!==!1&&(l=f._gsCache=f._gsCache||{},l.time=h,l.width=100*(o/r)),0!==o||n||(o=Z(t,i,r,s,!0))}return _?-o:o},$=E.calculateOffset=function(t,e,i){if("absolute"!==Q(t,"position",i))return 0;var r="left"===e?"Left":"Top",s=Q(t,"margin"+r,i);return t["offset"+r]-(Z(t,e,parseFloat(s),s.replace(x,""))||0)},K=function(t,e){var i,r,s,n={};if(e=e||H(t,null))if(i=e.length)for(;--i>-1;)s=e[i],(-1===s.indexOf("-transform")||Se===s)&&(n[s.replace(O,k)]=e.getPropertyValue(s));else for(i in e)(-1===i.indexOf("Transform")||Pe===i)&&(n[i]=e[i]);else if(e=t.currentStyle||t.style)for(i in e)"string"==typeof i&&void 0===n[i]&&(n[i.replace(O,k)]=e[i]);return W||(n.opacity=V(t)),r=ze(t,e,!1),n.rotation=r.rotation,n.skewX=r.skewX,n.scaleX=r.scaleX,n.scaleY=r.scaleY,n.x=r.x,n.y=r.y,Ce&&(n.z=r.z,n.rotationX=r.rotationX,n.rotationY=r.rotationY,n.scaleZ=r.scaleZ),n.filters&&delete n.filters,n},J=function(t,e,i,r,s){var n,a,o,l={},h=t.style;for(a in i)"cssText"!==a&&"length"!==a&&isNaN(a)&&(e[a]!==(n=i[a])||s&&s[a])&&-1===a.indexOf("Origin")&&("number"==typeof n||"string"==typeof n)&&(l[a]="auto"!==n||"left"!==a&&"top"!==a?""!==n&&"auto"!==n&&"none"!==n||"string"!=typeof e[a]||""===e[a].replace(y,"")?n:0:$(t,a),void 0!==h[a]&&(o=new pe(h,a,h[a],o)));if(r)for(a in r)"className"!==a&&(l[a]=r[a]);return{difs:l,firstMPT:o}},te={width:["Left","Right"],height:["Top","Bottom"]},ee=["marginLeft","marginRight","marginTop","marginBottom"],ie=function(t,e,i){var r=parseFloat("width"===e?t.offsetWidth:t.offsetHeight),s=te[e],n=s.length;for(i=i||H(t,null);--n>-1;)r-=parseFloat(Q(t,"padding"+s[n],i,!0))||0,r-=parseFloat(Q(t,"border"+s[n]+"Width",i,!0))||0;return r},re=function(t,e){if("contain"===t||"auto"===t||"auto auto"===t)return t+" ";(null==t||""===t)&&(t="0 0");var i=t.split(" "),r=-1!==t.indexOf("left")?"0%":-1!==t.indexOf("right")?"100%":i[0],s=-1!==t.indexOf("top")?"0%":-1!==t.indexOf("bottom")?"100%":i[1];return null==s?s="center"===r?"50%":"0":"center"===s&&(s="50%"),("center"===r||isNaN(parseFloat(r))&&-1===(r+"").indexOf("="))&&(r="50%"),t=r+" "+s+(i.length>2?" "+i[2]:""),e&&(e.oxp=-1!==r.indexOf("%"),e.oyp=-1!==s.indexOf("%"),e.oxr="="===r.charAt(1),e.oyr="="===s.charAt(1),e.ox=parseFloat(r.replace(y,"")),e.oy=parseFloat(s.replace(y,"")),e.v=t),e||t},se=function(t,e){return"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2)):parseFloat(t)-parseFloat(e)},ne=function(t,e){return null==t?e:"string"==typeof t&&"="===t.charAt(1)?parseInt(t.charAt(0)+"1",10)*parseFloat(t.substr(2))+e:parseFloat(t)},ae=function(t,e,i,r){var s,n,a,o,l,h=1e-6;return null==t?o=e:"number"==typeof t?o=t:(s=360,n=t.split("_"),l="="===t.charAt(1),a=(l?parseInt(t.charAt(0)+"1",10)*parseFloat(n[0].substr(2)):parseFloat(n[0]))*(-1===t.indexOf("rad")?1:N)-(l?0:e),n.length&&(r&&(r[i]=e+a),-1!==t.indexOf("short")&&(a%=s,a!==a%(s/2)&&(a=0>a?a+s:a-s)),-1!==t.indexOf("_cw")&&0>a?a=(a+9999999999*s)%s-(0|a/s)*s:-1!==t.indexOf("ccw")&&a>0&&(a=(a-9999999999*s)%s-(0|a/s)*s)),o=e+a),h>o&&o>-h&&(o=0),o},oe={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},le=function(t,e,i){return t=0>t?t+1:t>1?t-1:t,0|255*(1>6*t?e+6*(i-e)*t:.5>t?i:2>3*t?e+6*(i-e)*(2/3-t):e)+.5},he=a.parseColor=function(t,e){var i,r,s,n,a,o,l,h,u,f,c;if(t)if("number"==typeof t)i=[t>>16,255&t>>8,255&t];else{if(","===t.charAt(t.length-1)&&(t=t.substr(0,t.length-1)),oe[t])i=oe[t];else if("#"===t.charAt(0))4===t.length&&(r=t.charAt(1),s=t.charAt(2),n=t.charAt(3),t="#"+r+r+s+s+n+n),t=parseInt(t.substr(1),16),i=[t>>16,255&t>>8,255&t];else if("hsl"===t.substr(0,3))if(i=c=t.match(m),e){if(-1!==t.indexOf("="))return t.match(g)}else a=Number(i[0])%360/360,o=Number(i[1])/100,l=Number(i[2])/100,s=.5>=l?l*(o+1):l+o-l*o,r=2*l-s,i.length>3&&(i[3]=Number(t[3])),i[0]=le(a+1/3,r,s),i[1]=le(a,r,s),i[2]=le(a-1/3,r,s);else i=t.match(m)||oe.transparent;i[0]=Number(i[0]),i[1]=Number(i[1]),i[2]=Number(i[2]),i.length>3&&(i[3]=Number(i[3]))}else i=oe.black;return e&&!c&&(r=i[0]/255,s=i[1]/255,n=i[2]/255,h=Math.max(r,s,n),u=Math.min(r,s,n),l=(h+u)/2,h===u?a=o=0:(f=h-u,o=l>.5?f/(2-h-u):f/(h+u),a=h===r?(s-n)/f+(n>s?6:0):h===s?(n-r)/f+2:(r-s)/f+4,a*=60),i[0]=0|a+.5,i[1]=0|100*o+.5,i[2]=0|100*l+.5),i},ue=function(t,e){var i,r,s,n=t.match(fe)||[],a=0,o=n.length?"":t;for(i=0;n.length>i;i++)r=n[i],s=t.substr(a,t.indexOf(r,a)-a),a+=s.length+r.length,r=he(r,e),3===r.length&&r.push(1),o+=s+(e?"hsla("+r[0]+","+r[1]+"%,"+r[2]+"%,"+r[3]:"rgba("+r.join(","))+")";return o},fe="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";for(h in oe)fe+="|"+h+"\\b";fe=RegExp(fe+")","gi"),a.colorStringFilter=function(t){var e,i=t[0]+t[1];fe.lastIndex=0,fe.test(i)&&(e=-1!==i.indexOf("hsl(")||-1!==i.indexOf("hsla("),t[0]=ue(t[0],e),t[1]=ue(t[1],e))},e.defaultStringFilter||(e.defaultStringFilter=a.colorStringFilter);var ce=function(t,e,i,r){if(null==t)return function(t){return t};var s,n=e?(t.match(fe)||[""])[0]:"",a=t.split(n).join("").match(v)||[],o=t.substr(0,t.indexOf(a[0])),l=")"===t.charAt(t.length-1)?")":"",h=-1!==t.indexOf(" ")?" ":",",u=a.length,f=u>0?a[0].replace(m,""):"";return u?s=e?function(t){var e,c,_,p;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(p=t.replace(D,"|").split("|"),_=0;p.length>_;_++)p[_]=s(p[_]);return p.join(",")}if(e=(t.match(fe)||[n])[0],c=t.split(e).join("").match(v)||[],_=c.length,u>_--)for(;u>++_;)c[_]=i?c[0|(_-1)/2]:a[_];return o+c.join(h)+h+e+l+(-1!==t.indexOf("inset")?" inset":"")}:function(t){var e,n,c;if("number"==typeof t)t+=f;else if(r&&D.test(t)){for(n=t.replace(D,"|").split("|"),c=0;n.length>c;c++)n[c]=s(n[c]);return n.join(",")}if(e=t.match(v)||[],c=e.length,u>c--)for(;u>++c;)e[c]=i?e[0|(c-1)/2]:a[c];return o+e.join(h)+l}:function(t){return t}},_e=function(t){return t=t.split(","),function(e,i,r,s,n,a,o){var l,h=(i+"").split(" ");for(o={},l=0;4>l;l++)o[t[l]]=h[l]=h[l]||h[(l-1)/2>>0];return s.parse(e,o,n,a)}},pe=(E._setPluginRatio=function(t){this.plugin.setRatio(t);for(var e,i,r,s,n=this.data,a=n.proxy,o=n.firstMPT,l=1e-6;o;)e=a[o.v],o.r?e=Math.round(e):l>e&&e>-l&&(e=0),o.t[o.p]=e,o=o._next;if(n.autoRotate&&(n.autoRotate.rotation=a.rotation),1===t)for(o=n.firstMPT;o;){if(i=o.t,i.type){if(1===i.type){for(s=i.xs0+i.s+i.xs1,r=1;i.l>r;r++)s+=i["xn"+r]+i["xs"+(r+1)];i.e=s}}else i.e=i.s+i.xs0;o=o._next}},function(t,e,i,r,s){this.t=t,this.p=e,this.v=i,this.r=s,r&&(r._prev=this,this._next=r)}),de=(E._parseToProxy=function(t,e,i,r,s,n){var a,o,l,h,u,f=r,c={},_={},p=i._transform,d=F;for(i._transform=null,F=e,r=u=i.parse(t,e,r,s),F=d,n&&(i._transform=p,f&&(f._prev=null,f._prev&&(f._prev._next=null)));r&&r!==f;){if(1>=r.type&&(o=r.p,_[o]=r.s+r.c,c[o]=r.s,n||(h=new pe(r,"s",o,h,r.r),r.c=0),1===r.type))for(a=r.l;--a>0;)l="xn"+a,o=r.p+"_"+l,_[o]=r.data[l],c[o]=r[l],n||(h=new pe(r,l,o,h,r.rxp[l]));r=r._next}return{proxy:c,end:_,firstMPT:h,pt:u}},E.CSSPropTween=function(t,e,r,s,a,o,l,h,u,f,c){this.t=t,this.p=e,this.s=r,this.c=s,this.n=l||e,t instanceof de||n.push(this.n),this.r=h,this.type=o||0,u&&(this.pr=u,i=!0),this.b=void 0===f?r:f,this.e=void 0===c?r+s:c,a&&(this._next=a,a._prev=this)}),me=function(t,e,i,r,s,n){var a=new de(t,e,i,r-i,s,-1,n);return a.b=i,a.e=a.xs0=r,a},ge=a.parseComplex=function(t,e,i,r,s,n,a,o,l,h){i=i||n||"",a=new de(t,e,0,0,a,h?2:1,null,!1,o,i,r),r+="";var f,c,_,p,d,v,y,x,T,w,b,P,S,O=i.split(", ").join(",").split(" "),C=r.split(", ").join(",").split(" "),k=O.length,R=u!==!1;for((-1!==r.indexOf(",")||-1!==i.indexOf(","))&&(O=O.join(" ").replace(D,", ").split(" "),C=C.join(" ").replace(D,", ").split(" "),k=O.length),k!==C.length&&(O=(n||"").split(" "),k=O.length),a.plugin=l,a.setRatio=h,fe.lastIndex=0,f=0;k>f;f++)if(p=O[f],d=C[f],x=parseFloat(p),x||0===x)a.appendXtra("",x,se(d,x),d.replace(g,""),R&&-1!==d.indexOf("px"),!0);else if(s&&fe.test(p))P=","===d.charAt(d.length-1)?"),":")",S=-1!==d.indexOf("hsl")&&W,p=he(p,S),d=he(d,S),T=p.length+d.length>6,T&&!W&&0===d[3]?(a["xs"+a.l]+=a.l?" transparent":"transparent",a.e=a.e.split(C[f]).join("transparent")):(W||(T=!1),S?a.appendXtra(T?"hsla(":"hsl(",p[0],se(d[0],p[0]),",",!1,!0).appendXtra("",p[1],se(d[1],p[1]),"%,",!1).appendXtra("",p[2],se(d[2],p[2]),T?"%,":"%"+P,!1):a.appendXtra(T?"rgba(":"rgb(",p[0],d[0]-p[0],",",!0,!0).appendXtra("",p[1],d[1]-p[1],",",!0).appendXtra("",p[2],d[2]-p[2],T?",":P,!0),T&&(p=4>p.length?1:p[3],a.appendXtra("",p,(4>d.length?1:d[3])-p,P,!1))),fe.lastIndex=0;else if(v=p.match(m)){if(y=d.match(g),!y||y.length!==v.length)return a;for(_=0,c=0;v.length>c;c++)b=v[c],w=p.indexOf(b,_),a.appendXtra(p.substr(_,w-_),Number(b),se(y[c],b),"",R&&"px"===p.substr(w+b.length,2),0===c),_=w+b.length;a["xs"+a.l]+=p.substr(_)}else a["xs"+a.l]+=a.l?" "+p:p;if(-1!==r.indexOf("=")&&a.data){for(P=a.xs0+a.data.s,f=1;a.l>f;f++)P+=a["xs"+f]+a.data["xn"+f];a.e=P+a["xs"+f]}return a.l||(a.type=-1,a.xs0=a.e),a.xfirst||a},ve=9;for(h=de.prototype,h.l=h.pr=0;--ve>0;)h["xn"+ve]=0,h["xs"+ve]="";h.xs0="",h._next=h._prev=h.xfirst=h.data=h.plugin=h.setRatio=h.rxp=null,h.appendXtra=function(t,e,i,r,s,n){var a=this,o=a.l;return a["xs"+o]+=n&&o?" "+t:t||"",i||0===o||a.plugin?(a.l++,a.type=a.setRatio?2:1,a["xs"+a.l]=r||"",o>0?(a.data["xn"+o]=e+i,a.rxp["xn"+o]=s,a["xn"+o]=e,a.plugin||(a.xfirst=new de(a,"xn"+o,e,i,a.xfirst||a,0,a.n,s,a.pr),a.xfirst.xs0=0),a):(a.data={s:e+i},a.rxp={},a.s=e,a.c=i,a.r=s,a)):(a["xs"+o]+=e+(r||""),a)};var ye=function(t,e){e=e||{},this.p=e.prefix?q(t)||t:t,l[t]=l[this.p]=this,this.format=e.formatter||ce(e.defaultValue,e.color,e.collapsible,e.multi),e.parser&&(this.parse=e.parser),this.clrs=e.color,this.multi=e.multi,this.keyword=e.keyword,this.dflt=e.defaultValue,this.pr=e.priority||0},xe=E._registerComplexSpecialProp=function(t,e,i){"object"!=typeof e&&(e={parser:i});var r,s,n=t.split(","),a=e.defaultValue;for(i=i||[a],r=0;n.length>r;r++)e.prefix=0===r&&e.prefix,e.defaultValue=i[r]||a,s=new ye(n[r],e)},Te=function(t){if(!l[t]){var e=t.charAt(0).toUpperCase()+t.substr(1)+"Plugin";xe(t,{parser:function(t,i,r,s,n,a,h){var u=o.com.greensock.plugins[e];return u?(u._cssRegister(),l[r].parse(t,i,r,s,n,a,h)):(j("Error: "+e+" js file not loaded."),n)}})}};h=ye.prototype,h.parseComplex=function(t,e,i,r,s,n){var a,o,l,h,u,f,c=this.keyword;if(this.multi&&(D.test(i)||D.test(e)?(o=e.replace(D,"|").split("|"),l=i.replace(D,"|").split("|")):c&&(o=[e],l=[i])),l){for(h=l.length>o.length?l.length:o.length,a=0;h>a;a++)e=o[a]=o[a]||this.dflt,i=l[a]=l[a]||this.dflt,c&&(u=e.indexOf(c),f=i.indexOf(c),u!==f&&(-1===f?o[a]=o[a].split(c).join(""):-1===u&&(o[a]+=" "+c)));e=o.join(", "),i=l.join(", ")}return ge(t,this.p,e,i,this.clrs,this.dflt,r,this.pr,s,n)},h.parse=function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,this.p,s,!1,this.dflt)),this.format(e),n,a)},a.registerSpecialProp=function(t,e,i){xe(t,{parser:function(t,r,s,n,a,o){var l=new de(t,s,0,0,a,2,s,!1,i);return l.plugin=o,l.setRatio=e(t,r,n._tween,s),l},priority:i})},a.useSVGTransformAttr=c||_;var we,be="scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),Pe=q("transform"),Se=G+"transform",Oe=q("transformOrigin"),Ce=null!==q("perspective"),ke=E.Transform=function(){this.perspective=parseFloat(a.defaultTransformPerspective)||0,this.force3D=a.defaultForce3D!==!1&&Ce?a.defaultForce3D||"auto":!1},Re=window.SVGElement,Ae=function(t,e,i){var r,s=X.createElementNS("http://www.w3.org/2000/svg",t),n=/([a-z])([A-Z])/g;for(r in i)s.setAttributeNS(null,r.replace(n,"$1-$2").toLowerCase(),i[r]);return e.appendChild(s),s},Me=X.documentElement,De=function(){var t,e,i,r=d||/Android/i.test(Y)&&!window.chrome;return X.createElementNS&&!r&&(t=Ae("svg",Me),e=Ae("rect",t,{width:100,height:50,x:100}),i=e.getBoundingClientRect().width,e.style[Oe]="50% 50%",e.style[Pe]="scaleX(0.5)",r=i===e.getBoundingClientRect().width&&!(_&&Ce),Me.removeChild(t)),r}(),Le=function(t,e,i,r,s){var n,o,l,h,u,f,c,_,p,d,m,g,v,y,x=t._gsTransform,T=Xe(t,!0);x&&(v=x.xOrigin,y=x.yOrigin),(!r||2>(n=r.split(" ")).length)&&(c=t.getBBox(),e=re(e).split(" "),n=[(-1!==e[0].indexOf("%")?parseFloat(e[0])/100*c.width:parseFloat(e[0]))+c.x,(-1!==e[1].indexOf("%")?parseFloat(e[1])/100*c.height:parseFloat(e[1]))+c.y]),i.xOrigin=h=parseFloat(n[0]),i.yOrigin=u=parseFloat(n[1]),r&&T!==Fe&&(f=T[0],c=T[1],_=T[2],p=T[3],d=T[4],m=T[5],g=f*p-c*_,o=h*(p/g)+u*(-_/g)+(_*m-p*d)/g,l=h*(-c/g)+u*(f/g)-(f*m-c*d)/g,h=i.xOrigin=n[0]=o,u=i.yOrigin=n[1]=l),x&&(s||s!==!1&&a.defaultSmoothOrigin!==!1?(o=h-v,l=u-y,x.xOffset+=o*T[0]+l*T[2]-o,x.yOffset+=o*T[1]+l*T[3]-l):x.xOffset=x.yOffset=0),t.setAttribute("data-svg-origin",n.join(" "))},Ne=function(t){return!!(Re&&"function"==typeof t.getBBox&&t.getCTM&&(!t.parentNode||t.parentNode.getBBox&&t.parentNode.getCTM))},Fe=[1,0,0,1,0,0],Xe=function(t,e){var i,r,s,n,a,o=t._gsTransform||new ke,l=1e5;if(Pe?r=Q(t,Se,null,!0):t.currentStyle&&(r=t.currentStyle.filter.match(A),r=r&&4===r.length?[r[0].substr(4),Number(r[2].substr(4)),Number(r[1].substr(4)),r[3].substr(4),o.x||0,o.y||0].join(","):""),i=!r||"none"===r||"matrix(1, 0, 0, 1, 0, 0)"===r,(o.svg||t.getBBox&&Ne(t))&&(i&&-1!==(t.style[Pe]+"").indexOf("matrix")&&(r=t.style[Pe],i=0),s=t.getAttribute("transform"),i&&s&&(-1!==s.indexOf("matrix")?(r=s,i=0):-1!==s.indexOf("translate")&&(r="matrix(1,0,0,1,"+s.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",")+")",i=0))),i)return Fe;for(s=(r||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],ve=s.length;--ve>-1;)n=Number(s[ve]),s[ve]=(a=n-(n|=0))?(0|a*l+(0>a?-.5:.5))/l+n:n;return e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s},ze=E.getTransform=function(t,i,r,n){if(t._gsTransform&&r&&!n)return t._gsTransform;var o,l,h,u,f,c,_=r?t._gsTransform||new ke:new ke,p=0>_.scaleX,d=2e-5,m=1e5,g=Ce?parseFloat(Q(t,Oe,i,!1,"0 0 0").split(" ")[2])||_.zOrigin||0:0,v=parseFloat(a.defaultTransformPerspective)||0;if(_.svg=!(!t.getBBox||!Ne(t)),_.svg&&(Le(t,Q(t,Oe,s,!1,"50% 50%")+"",_,t.getAttribute("data-svg-origin")),we=a.useSVGTransformAttr||De),o=Xe(t),o!==Fe){if(16===o.length){var y,x,T,w,b,P=o[0],S=o[1],O=o[2],C=o[3],k=o[4],R=o[5],A=o[6],M=o[7],D=o[8],L=o[9],F=o[10],X=o[12],z=o[13],B=o[14],I=o[11],E=Math.atan2(A,F);_.zOrigin&&(B=-_.zOrigin,X=D*B-o[12],z=L*B-o[13],B=F*B+_.zOrigin-o[14]),_.rotationX=E*N,E&&(w=Math.cos(-E),b=Math.sin(-E),y=k*w+D*b,x=R*w+L*b,T=A*w+F*b,D=k*-b+D*w,L=R*-b+L*w,F=A*-b+F*w,I=M*-b+I*w,k=y,R=x,A=T),E=Math.atan2(D,F),_.rotationY=E*N,E&&(w=Math.cos(-E),b=Math.sin(-E),y=P*w-D*b,x=S*w-L*b,T=O*w-F*b,L=S*b+L*w,F=O*b+F*w,I=C*b+I*w,P=y,S=x,O=T),E=Math.atan2(S,P),_.rotation=E*N,E&&(w=Math.cos(-E),b=Math.sin(-E),P=P*w+k*b,x=S*w+R*b,R=S*-b+R*w,A=O*-b+A*w,S=x),_.rotationX&&Math.abs(_.rotationX)+Math.abs(_.rotation)>359.9&&(_.rotationX=_.rotation=0,_.rotationY+=180),_.scaleX=(0|Math.sqrt(P*P+S*S)*m+.5)/m,_.scaleY=(0|Math.sqrt(R*R+L*L)*m+.5)/m,_.scaleZ=(0|Math.sqrt(A*A+F*F)*m+.5)/m,_.skewX=0,_.perspective=I?1/(0>I?-I:I):0,_.x=X,_.y=z,_.z=B,_.svg&&(_.x-=_.xOrigin-(_.xOrigin*P-_.yOrigin*k),_.y-=_.yOrigin-(_.yOrigin*S-_.xOrigin*R))}else if(!(Ce&&!n&&o.length&&_.x===o[4]&&_.y===o[5]&&(_.rotationX||_.rotationY)||void 0!==_.x&&"none"===Q(t,"display",i))){var Y=o.length>=6,W=Y?o[0]:1,V=o[1]||0,j=o[2]||0,G=Y?o[3]:1;_.x=o[4]||0,_.y=o[5]||0,h=Math.sqrt(W*W+V*V),u=Math.sqrt(G*G+j*j),f=W||V?Math.atan2(V,W)*N:_.rotation||0,c=j||G?Math.atan2(j,G)*N+f:_.skewX||0,Math.abs(c)>90&&270>Math.abs(c)&&(p?(h*=-1,c+=0>=f?180:-180,f+=0>=f?180:-180):(u*=-1,c+=0>=c?180:-180)),_.scaleX=h,_.scaleY=u,_.rotation=f,_.skewX=c,Ce&&(_.rotationX=_.rotationY=_.z=0,_.perspective=v,_.scaleZ=1),_.svg&&(_.x-=_.xOrigin-(_.xOrigin*W+_.yOrigin*j),_.y-=_.yOrigin-(_.xOrigin*V+_.yOrigin*G))}_.zOrigin=g;for(l in _)d>_[l]&&_[l]>-d&&(_[l]=0)}return r&&(t._gsTransform=_,_.svg&&(we&&t.style[Pe]?e.delayedCall(.001,function(){Ye(t.style,Pe)}):!we&&t.getAttribute("transform")&&e.delayedCall(.001,function(){t.removeAttribute("transform")}))),_},Be=function(t){var e,i,r=this.data,s=-r.rotation*L,n=s+r.skewX*L,a=1e5,o=(0|Math.cos(s)*r.scaleX*a)/a,l=(0|Math.sin(s)*r.scaleX*a)/a,h=(0|Math.sin(n)*-r.scaleY*a)/a,u=(0|Math.cos(n)*r.scaleY*a)/a,f=this.t.style,c=this.t.currentStyle;if(c){i=l,l=-h,h=-i,e=c.filter,f.filter="";var _,p,m=this.t.offsetWidth,g=this.t.offsetHeight,v="absolute"!==c.position,y="progid:DXImageTransform.Microsoft.Matrix(M11="+o+", M12="+l+", M21="+h+", M22="+u,w=r.x+m*r.xPercent/100,b=r.y+g*r.yPercent/100;if(null!=r.ox&&(_=(r.oxp?.01*m*r.ox:r.ox)-m/2,p=(r.oyp?.01*g*r.oy:r.oy)-g/2,w+=_-(_*o+p*l),b+=p-(_*h+p*u)),v?(_=m/2,p=g/2,y+=", Dx="+(_-(_*o+p*l)+w)+", Dy="+(p-(_*h+p*u)+b)+")"):y+=", sizingMethod='auto expand')",f.filter=-1!==e.indexOf("DXImageTransform.Microsoft.Matrix(")?e.replace(M,y):y+" "+e,(0===t||1===t)&&1===o&&0===l&&0===h&&1===u&&(v&&-1===y.indexOf("Dx=0, Dy=0")||T.test(e)&&100!==parseFloat(RegExp.$1)||-1===e.indexOf("gradient("&&e.indexOf("Alpha"))&&f.removeAttribute("filter")),!v){var P,S,O,C=8>d?1:-1;for(_=r.ieOffsetX||0,p=r.ieOffsetY||0,r.ieOffsetX=Math.round((m-((0>o?-o:o)*m+(0>l?-l:l)*g))/2+w),r.ieOffsetY=Math.round((g-((0>u?-u:u)*g+(0>h?-h:h)*m))/2+b),ve=0;4>ve;ve++)S=ee[ve],P=c[S],i=-1!==P.indexOf("px")?parseFloat(P):Z(this.t,S,parseFloat(P),P.replace(x,""))||0,O=i!==r[S]?2>ve?-r.ieOffsetX:-r.ieOffsetY:2>ve?_-r.ieOffsetX:p-r.ieOffsetY,f[S]=(r[S]=Math.round(i-O*(0===ve||2===ve?1:C)))+"px"}}},Ie=E.set3DTransformRatio=E.setTransformRatio=function(t){var e,i,r,s,n,a,o,l,h,u,f,c,p,d,m,g,v,y,x,T,w,b,P,S=this.data,O=this.t.style,C=S.rotation,k=S.rotationX,R=S.rotationY,A=S.scaleX,M=S.scaleY,D=S.scaleZ,N=S.x,F=S.y,X=S.z,z=S.svg,B=S.perspective,I=S.force3D;if(!(((1!==t&&0!==t||"auto"!==I||this.tween._totalTime!==this.tween._totalDuration&&this.tween._totalTime)&&I||X||B||R||k)&&(!we||!z)&&Ce))return C||S.skewX||z?(C*=L,b=S.skewX*L,P=1e5,e=Math.cos(C)*A,s=Math.sin(C)*A,i=Math.sin(C-b)*-M,n=Math.cos(C-b)*M,b&&"simple"===S.skewType&&(v=Math.tan(b),v=Math.sqrt(1+v*v),i*=v,n*=v,S.skewY&&(e*=v,s*=v)),z&&(N+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i)+S.xOffset,F+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n)+S.yOffset,we&&(S.xPercent||S.yPercent)&&(d=this.t.getBBox(),N+=.01*S.xPercent*d.width,F+=.01*S.yPercent*d.height),d=1e-6,d>N&&N>-d&&(N=0),d>F&&F>-d&&(F=0)),x=(0|e*P)/P+","+(0|s*P)/P+","+(0|i*P)/P+","+(0|n*P)/P+","+N+","+F+")",z&&we?this.t.setAttribute("transform","matrix("+x):O[Pe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+x):O[Pe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix(":"matrix(")+A+",0,0,"+M+","+N+","+F+")",void 0;if(_&&(d=1e-4,d>A&&A>-d&&(A=D=2e-5),d>M&&M>-d&&(M=D=2e-5),!B||S.z||S.rotationX||S.rotationY||(B=0)),C||S.skewX)C*=L,m=e=Math.cos(C),g=s=Math.sin(C),S.skewX&&(C-=S.skewX*L,m=Math.cos(C),g=Math.sin(C),"simple"===S.skewType&&(v=Math.tan(S.skewX*L),v=Math.sqrt(1+v*v),m*=v,g*=v,S.skewY&&(e*=v,s*=v))),i=-g,n=m;else{if(!(R||k||1!==D||B||z))return O[Pe]=(S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) translate3d(":"translate3d(")+N+"px,"+F+"px,"+X+"px)"+(1!==A||1!==M?" scale("+A+","+M+")":""),void 0;e=n=1,i=s=0}h=1,r=a=o=l=u=f=0,c=B?-1/B:0,p=S.zOrigin,d=1e-6,T=",",w="0",C=R*L,C&&(m=Math.cos(C),g=Math.sin(C),o=-g,u=c*-g,r=e*g,a=s*g,h=m,c*=m,e*=m,s*=m),C=k*L,C&&(m=Math.cos(C),g=Math.sin(C),v=i*m+r*g,y=n*m+a*g,l=h*g,f=c*g,r=i*-g+r*m,a=n*-g+a*m,h*=m,c*=m,i=v,n=y),1!==D&&(r*=D,a*=D,h*=D,c*=D),1!==M&&(i*=M,n*=M,l*=M,f*=M),1!==A&&(e*=A,s*=A,o*=A,u*=A),(p||z)&&(p&&(N+=r*-p,F+=a*-p,X+=h*-p+p),z&&(N+=S.xOrigin-(S.xOrigin*e+S.yOrigin*i)+S.xOffset,F+=S.yOrigin-(S.xOrigin*s+S.yOrigin*n)+S.yOffset),d>N&&N>-d&&(N=w),d>F&&F>-d&&(F=w),d>X&&X>-d&&(X=0)),x=S.xPercent||S.yPercent?"translate("+S.xPercent+"%,"+S.yPercent+"%) matrix3d(":"matrix3d(",x+=(d>e&&e>-d?w:e)+T+(d>s&&s>-d?w:s)+T+(d>o&&o>-d?w:o),x+=T+(d>u&&u>-d?w:u)+T+(d>i&&i>-d?w:i)+T+(d>n&&n>-d?w:n),k||R?(x+=T+(d>l&&l>-d?w:l)+T+(d>f&&f>-d?w:f)+T+(d>r&&r>-d?w:r),x+=T+(d>a&&a>-d?w:a)+T+(d>h&&h>-d?w:h)+T+(d>c&&c>-d?w:c)+T):x+=",0,0,0,0,1,0,",x+=N+T+F+T+X+T+(B?1+-X/B:1)+")",O[Pe]=x};h=ke.prototype,h.x=h.y=h.z=h.skewX=h.skewY=h.rotation=h.rotationX=h.rotationY=h.zOrigin=h.xPercent=h.yPercent=h.xOffset=h.yOffset=0,h.scaleX=h.scaleY=h.scaleZ=1,xe("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin",{parser:function(t,e,i,r,n,o,l){if(r._lastParsedTransform===l)return n;r._lastParsedTransform=l;var h,u,f,c,_,p,d,m,g,v,y=t._gsTransform,x=t.style,T=1e-6,w=be.length,b=l,P={},S="transformOrigin";if(l.display?(c=Q(t,"display"),x.display="block",h=ze(t,s,!0,l.parseTransform),x.display=c):h=ze(t,s,!0,l.parseTransform),r._transform=h,"string"==typeof b.transform&&Pe)c=B.style,c[Pe]=b.transform,c.display="block",c.position="absolute",X.body.appendChild(B),u=ze(B,null,!1),X.body.removeChild(B),u.perspective||(u.perspective=h.perspective),null!=b.xPercent&&(u.xPercent=ne(b.xPercent,h.xPercent)),null!=b.yPercent&&(u.yPercent=ne(b.yPercent,h.yPercent));else if("object"==typeof b){if(u={scaleX:ne(null!=b.scaleX?b.scaleX:b.scale,h.scaleX),scaleY:ne(null!=b.scaleY?b.scaleY:b.scale,h.scaleY),scaleZ:ne(b.scaleZ,h.scaleZ),x:ne(b.x,h.x),y:ne(b.y,h.y),z:ne(b.z,h.z),xPercent:ne(b.xPercent,h.xPercent),yPercent:ne(b.yPercent,h.yPercent),perspective:ne(b.transformPerspective,h.perspective)},m=b.directionalRotation,null!=m)if("object"==typeof m)for(c in m)b[c]=m[c];else b.rotation=m;"string"==typeof b.x&&-1!==b.x.indexOf("%")&&(u.x=0,u.xPercent=ne(b.x,h.xPercent)),"string"==typeof b.y&&-1!==b.y.indexOf("%")&&(u.y=0,u.yPercent=ne(b.y,h.yPercent)),u.rotation=ae("rotation"in b?b.rotation:"shortRotation"in b?b.shortRotation+"_short":"rotationZ"in b?b.rotationZ:h.rotation,h.rotation,"rotation",P),Ce&&(u.rotationX=ae("rotationX"in b?b.rotationX:"shortRotationX"in b?b.shortRotationX+"_short":h.rotationX||0,h.rotationX,"rotationX",P),u.rotationY=ae("rotationY"in b?b.rotationY:"shortRotationY"in b?b.shortRotationY+"_short":h.rotationY||0,h.rotationY,"rotationY",P)),u.skewX=null==b.skewX?h.skewX:ae(b.skewX,h.skewX),u.skewY=null==b.skewY?h.skewY:ae(b.skewY,h.skewY),(f=u.skewY-h.skewY)&&(u.skewX+=f,u.rotation+=f)}for(Ce&&null!=b.force3D&&(h.force3D=b.force3D,d=!0),h.skewType=b.skewType||h.skewType||a.defaultSkewType,p=h.force3D||h.z||h.rotationX||h.rotationY||u.z||u.rotationX||u.rotationY||u.perspective,p||null==b.scale||(u.scaleZ=1);--w>-1;)i=be[w],_=u[i]-h[i],(_>T||-T>_||null!=b[i]||null!=F[i])&&(d=!0,n=new de(h,i,h[i],_,n),i in P&&(n.e=P[i]),n.xs0=0,n.plugin=o,r._overwriteProps.push(n.n));return _=b.transformOrigin,h.svg&&(_||b.svgOrigin)&&(g=h.xOffset,v=h.yOffset,Le(t,re(_),u,b.svgOrigin,b.smoothOrigin),n=me(h,"xOrigin",(y?h:u).xOrigin,u.xOrigin,n,S),n=me(h,"yOrigin",(y?h:u).yOrigin,u.yOrigin,n,S),(g!==h.xOffset||v!==h.yOffset)&&(n=me(h,"xOffset",y?g:h.xOffset,h.xOffset,n,S),n=me(h,"yOffset",y?v:h.yOffset,h.yOffset,n,S)),_=we?null:"0px 0px"),(_||Ce&&p&&h.zOrigin)&&(Pe?(d=!0,i=Oe,_=(_||Q(t,i,s,!1,"50% 50%"))+"",n=new de(x,i,0,0,n,-1,S),n.b=x[i],n.plugin=o,Ce?(c=h.zOrigin,_=_.split(" "),h.zOrigin=(_.length>2&&(0===c||"0px"!==_[2])?parseFloat(_[2]):c)||0,n.xs0=n.e=_[0]+" "+(_[1]||"50%")+" 0px",n=new de(h,"zOrigin",0,0,n,-1,n.n),n.b=c,n.xs0=n.e=h.zOrigin):n.xs0=n.e=_):re(_+"",h)),d&&(r._transformType=h.svg&&we||!p&&3!==this._transformType?2:3),n},prefix:!0}),xe("boxShadow",{defaultValue:"0px 0px 0px 0px #999",prefix:!0,color:!0,multi:!0,keyword:"inset"}),xe("borderRadius",{defaultValue:"0px",parser:function(t,e,i,n,a){e=this.format(e);var o,l,h,u,f,c,_,p,d,m,g,v,y,x,T,w,b=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],P=t.style;for(d=parseFloat(t.offsetWidth),m=parseFloat(t.offsetHeight),o=e.split(" "),l=0;b.length>l;l++)this.p.indexOf("border")&&(b[l]=q(b[l])),f=u=Q(t,b[l],s,!1,"0px"),-1!==f.indexOf(" ")&&(u=f.split(" "),f=u[0],u=u[1]),c=h=o[l],_=parseFloat(f),v=f.substr((_+"").length),y="="===c.charAt(1),y?(p=parseInt(c.charAt(0)+"1",10),c=c.substr(2),p*=parseFloat(c),g=c.substr((p+"").length-(0>p?1:0))||""):(p=parseFloat(c),g=c.substr((p+"").length)),""===g&&(g=r[i]||v),g!==v&&(x=Z(t,"borderLeft",_,v),T=Z(t,"borderTop",_,v),"%"===g?(f=100*(x/d)+"%",u=100*(T/m)+"%"):"em"===g?(w=Z(t,"borderLeft",1,"em"),f=x/w+"em",u=T/w+"em"):(f=x+"px",u=T+"px"),y&&(c=parseFloat(f)+p+g,h=parseFloat(u)+p+g)),a=ge(P,b[l],f+" "+u,c+" "+h,!1,"0px",a);return a},prefix:!0,formatter:ce("0px 0px 0px 0px",!1,!0)}),xe("backgroundPosition",{defaultValue:"0 0",parser:function(t,e,i,r,n,a){var o,l,h,u,f,c,_="background-position",p=s||H(t,null),m=this.format((p?d?p.getPropertyValue(_+"-x")+" "+p.getPropertyValue(_+"-y"):p.getPropertyValue(_):t.currentStyle.backgroundPositionX+" "+t.currentStyle.backgroundPositionY)||"0 0"),g=this.format(e);if(-1!==m.indexOf("%")!=(-1!==g.indexOf("%"))&&(c=Q(t,"backgroundImage").replace(C,""),c&&"none"!==c)){for(o=m.split(" "),l=g.split(" "),I.setAttribute("src",c),h=2;--h>-1;)m=o[h],u=-1!==m.indexOf("%"),u!==(-1!==l[h].indexOf("%"))&&(f=0===h?t.offsetWidth-I.width:t.offsetHeight-I.height,o[h]=u?parseFloat(m)/100*f+"px":100*(parseFloat(m)/f)+"%");m=o.join(" ")}return this.parseComplex(t.style,m,g,n,a)},formatter:re}),xe("backgroundSize",{defaultValue:"0 0",formatter:re}),xe("perspective",{defaultValue:"0px",prefix:!0}),xe("perspectiveOrigin",{defaultValue:"50% 50%",prefix:!0}),xe("transformStyle",{prefix:!0}),xe("backfaceVisibility",{prefix:!0}),xe("userSelect",{prefix:!0}),xe("margin",{parser:_e("marginTop,marginRight,marginBottom,marginLeft")}),xe("padding",{parser:_e("paddingTop,paddingRight,paddingBottom,paddingLeft")}),xe("clip",{defaultValue:"rect(0px,0px,0px,0px)",parser:function(t,e,i,r,n,a){var o,l,h;return 9>d?(l=t.currentStyle,h=8>d?" ":",",o="rect("+l.clipTop+h+l.clipRight+h+l.clipBottom+h+l.clipLeft+")",e=this.format(e).split(",").join(h)):(o=this.format(Q(t,this.p,s,!1,this.dflt)),e=this.format(e)),this.parseComplex(t.style,o,e,n,a)}}),xe("textShadow",{defaultValue:"0px 0px 0px #999",color:!0,multi:!0}),xe("autoRound,strictUnits",{parser:function(t,e,i,r,s){return s}}),xe("border",{defaultValue:"0px solid #000",parser:function(t,e,i,r,n,a){return this.parseComplex(t.style,this.format(Q(t,"borderTopWidth",s,!1,"0px")+" "+Q(t,"borderTopStyle",s,!1,"solid")+" "+Q(t,"borderTopColor",s,!1,"#000")),this.format(e),n,a)},color:!0,formatter:function(t){var e=t.split(" ");return e[0]+" "+(e[1]||"solid")+" "+(t.match(fe)||["#000"])[0]}}),xe("borderWidth",{parser:_e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}),xe("float,cssFloat,styleFloat",{parser:function(t,e,i,r,s){var n=t.style,a="cssFloat"in n?"cssFloat":"styleFloat";return new de(n,a,0,0,s,-1,i,!1,0,n[a],e)}});var Ee=function(t){var e,i=this.t,r=i.filter||Q(this.data,"filter")||"",s=0|this.s+this.c*t;100===s&&(-1===r.indexOf("atrix(")&&-1===r.indexOf("radient(")&&-1===r.indexOf("oader(")?(i.removeAttribute("filter"),e=!Q(this.data,"filter")):(i.filter=r.replace(b,""),e=!0)),e||(this.xn1&&(i.filter=r=r||"alpha(opacity="+s+")"),-1===r.indexOf("pacity")?0===s&&this.xn1||(i.filter=r+" alpha(opacity="+s+")"):i.filter=r.replace(T,"opacity="+s))};xe("opacity,alpha,autoAlpha",{defaultValue:"1",parser:function(t,e,i,r,n,a){var o=parseFloat(Q(t,"opacity",s,!1,"1")),l=t.style,h="autoAlpha"===i;return"string"==typeof e&&"="===e.charAt(1)&&(e=("-"===e.charAt(0)?-1:1)*parseFloat(e.substr(2))+o),h&&1===o&&"hidden"===Q(t,"visibility",s)&&0!==e&&(o=0),W?n=new de(l,"opacity",o,e-o,n):(n=new de(l,"opacity",100*o,100*(e-o),n),n.xn1=h?1:0,l.zoom=1,n.type=2,n.b="alpha(opacity="+n.s+")",n.e="alpha(opacity="+(n.s+n.c)+")",n.data=t,n.plugin=a,n.setRatio=Ee),h&&(n=new de(l,"visibility",0,0,n,-1,null,!1,0,0!==o?"inherit":"hidden",0===e?"hidden":"inherit"),n.xs0="inherit",r._overwriteProps.push(n.n),r._overwriteProps.push(i)),n}});var Ye=function(t,e){e&&(t.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),t.removeProperty(e.replace(S,"-$1").toLowerCase())):t.removeAttribute(e))},We=function(t){if(this.t._gsClassPT=this,1===t||0===t){this.t.setAttribute("class",0===t?this.b:this.e);for(var e=this.data,i=this.t.style;e;)e.v?i[e.p]=e.v:Ye(i,e.p),e=e._next;1===t&&this.t._gsClassPT===this&&(this.t._gsClassPT=null)}else this.t.getAttribute("class")!==this.e&&this.t.setAttribute("class",this.e)};xe("className",{parser:function(t,e,r,n,a,o,l){var h,u,f,c,_,p=t.getAttribute("class")||"",d=t.style.cssText;if(a=n._classNamePT=new de(t,r,0,0,a,2),a.setRatio=We,a.pr=-11,i=!0,a.b=p,u=K(t,s),f=t._gsClassPT){for(c={},_=f.data;_;)c[_.p]=1,_=_._next;
f.setRatio(1)}return t._gsClassPT=a,a.e="="!==e.charAt(1)?e:p.replace(RegExp("\\s*\\b"+e.substr(2)+"\\b"),"")+("+"===e.charAt(0)?" "+e.substr(2):""),t.setAttribute("class",a.e),h=J(t,u,K(t),l,c),t.setAttribute("class",p),a.data=h.firstMPT,t.style.cssText=d,a=a.xfirst=n.parse(t,h.difs,a,o)}});var Ve=function(t){if((1===t||0===t)&&this.data._totalTime===this.data._totalDuration&&"isFromStart"!==this.data.data){var e,i,r,s,n,a=this.t.style,o=l.transform.parse;if("all"===this.e)a.cssText="",s=!0;else for(e=this.e.split(" ").join("").split(","),r=e.length;--r>-1;)i=e[r],l[i]&&(l[i].parse===o?s=!0:i="transformOrigin"===i?Oe:l[i].p),Ye(a,i);s&&(Ye(a,Pe),n=this.t._gsTransform,n&&(n.svg&&this.t.removeAttribute("data-svg-origin"),delete this.t._gsTransform))}};for(xe("clearProps",{parser:function(t,e,r,s,n){return n=new de(t,r,0,0,n,2),n.setRatio=Ve,n.e=e,n.pr=-10,n.data=s._tween,i=!0,n}}),h="bezier,throwProps,physicsProps,physics2D".split(","),ve=h.length;ve--;)Te(h[ve]);h=a.prototype,h._firstPT=h._lastParsedTransform=h._transform=null,h._onInitTween=function(t,e,o){if(!t.nodeType)return!1;this._target=t,this._tween=o,this._vars=e,u=e.autoRound,i=!1,r=e.suffixMap||a.suffixMap,s=H(t,""),n=this._overwriteProps;var h,_,d,m,g,v,y,x,T,b=t.style;if(f&&""===b.zIndex&&(h=Q(t,"zIndex",s),("auto"===h||""===h)&&this._addLazySet(b,"zIndex",0)),"string"==typeof e&&(m=b.cssText,h=K(t,s),b.cssText=m+";"+e,h=J(t,h,K(t)).difs,!W&&w.test(e)&&(h.opacity=parseFloat(RegExp.$1)),e=h,b.cssText=m),this._firstPT=_=e.className?l.className.parse(t,e.className,"className",this,null,null,e):this.parse(t,e,null),this._transformType){for(T=3===this._transformType,Pe?c&&(f=!0,""===b.zIndex&&(y=Q(t,"zIndex",s),("auto"===y||""===y)&&this._addLazySet(b,"zIndex",0)),p&&this._addLazySet(b,"WebkitBackfaceVisibility",this._vars.WebkitBackfaceVisibility||(T?"visible":"hidden"))):b.zoom=1,d=_;d&&d._next;)d=d._next;x=new de(t,"transform",0,0,null,2),this._linkCSSP(x,null,d),x.setRatio=Pe?Ie:Be,x.data=this._transform||ze(t,s,!0),x.tween=o,x.pr=-1,n.pop()}if(i){for(;_;){for(v=_._next,d=m;d&&d.pr>_.pr;)d=d._next;(_._prev=d?d._prev:g)?_._prev._next=_:m=_,(_._next=d)?d._prev=_:g=_,_=v}this._firstPT=m}return!0},h.parse=function(t,e,i,n){var a,o,h,f,c,_,p,d,m,g,v=t.style;for(a in e)_=e[a],o=l[a],o?i=o.parse(t,_,a,this,i,n,e):(c=Q(t,a,s)+"",m="string"==typeof _,"color"===a||"fill"===a||"stroke"===a||-1!==a.indexOf("Color")||m&&P.test(_)?(m||(_=he(_),_=(_.length>3?"rgba(":"rgb(")+_.join(",")+")"),i=ge(v,a,c,_,!0,"transparent",i,0,n)):!m||-1===_.indexOf(" ")&&-1===_.indexOf(",")?(h=parseFloat(c),p=h||0===h?c.substr((h+"").length):"",(""===c||"auto"===c)&&("width"===a||"height"===a?(h=ie(t,a,s),p="px"):"left"===a||"top"===a?(h=$(t,a,s),p="px"):(h="opacity"!==a?0:1,p="")),g=m&&"="===_.charAt(1),g?(f=parseInt(_.charAt(0)+"1",10),_=_.substr(2),f*=parseFloat(_),d=_.replace(x,"")):(f=parseFloat(_),d=m?_.replace(x,""):""),""===d&&(d=a in r?r[a]:p),_=f||0===f?(g?f+h:f)+d:e[a],p!==d&&""!==d&&(f||0===f)&&h&&(h=Z(t,a,h,p),"%"===d?(h/=Z(t,a,100,"%")/100,e.strictUnits!==!0&&(c=h+"%")):"em"===d||"rem"===d?h/=Z(t,a,1,d):"px"!==d&&(f=Z(t,a,f,d),d="px"),g&&(f||0===f)&&(_=f+h+d)),g&&(f+=h),!h&&0!==h||!f&&0!==f?void 0!==v[a]&&(_||"NaN"!=_+""&&null!=_)?(i=new de(v,a,f||h||0,0,i,-1,a,!1,0,c,_),i.xs0="none"!==_||"display"!==a&&-1===a.indexOf("Style")?_:c):j("invalid "+a+" tween value: "+e[a]):(i=new de(v,a,h,f-h,i,0,a,u!==!1&&("px"===d||"zIndex"===a),0,c,_),i.xs0=d)):i=ge(v,a,c,_,!0,null,i,0,n)),n&&i&&!i.plugin&&(i.plugin=n);return i},h.setRatio=function(t){var e,i,r,s=this._firstPT,n=1e-6;if(1!==t||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(t||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;s;){if(e=s.c*t+s.s,s.r?e=Math.round(e):n>e&&e>-n&&(e=0),s.type)if(1===s.type)if(r=s.l,2===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2;else if(3===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3;else if(4===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4;else if(5===r)s.t[s.p]=s.xs0+e+s.xs1+s.xn1+s.xs2+s.xn2+s.xs3+s.xn3+s.xs4+s.xn4+s.xs5;else{for(i=s.xs0+e+s.xs1,r=1;s.l>r;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}else-1===s.type?s.t[s.p]=s.xs0:s.setRatio&&s.setRatio(t);else s.t[s.p]=e+s.xs0;s=s._next}else for(;s;)2!==s.type?s.t[s.p]=s.b:s.setRatio(t),s=s._next;else for(;s;){if(2!==s.type)if(s.r&&-1!==s.type)if(e=Math.round(s.s+s.c),s.type){if(1===s.type){for(r=s.l,i=s.xs0+e+s.xs1,r=1;s.l>r;r++)i+=s["xn"+r]+s["xs"+(r+1)];s.t[s.p]=i}}else s.t[s.p]=e+s.xs0;else s.t[s.p]=s.e;else s.setRatio(t);s=s._next}},h._enableTransforms=function(t){this._transform=this._transform||ze(this._target,s,!0),this._transformType=this._transform.svg&&we||!t&&3!==this._transformType?2:3};var je=function(){this.t[this.p]=this.e,this.data._linkCSSP(this,this._next,null,!0)};h._addLazySet=function(t,e,i){var r=this._firstPT=new de(t,e,0,0,this._firstPT,2);r.e=i,r.setRatio=je,r.data=this},h._linkCSSP=function(t,e,i,r){return t&&(e&&(e._prev=t),t._next&&(t._next._prev=t._prev),t._prev?t._prev._next=t._next:this._firstPT===t&&(this._firstPT=t._next,r=!0),i?i._next=t:r||null!==this._firstPT||(this._firstPT=t),t._next=e,t._prev=i),t},h._kill=function(e){var i,r,s,n=e;if(e.autoAlpha||e.alpha){n={};for(r in e)n[r]=e[r];n.opacity=1,n.autoAlpha&&(n.visibility=1)}return e.className&&(i=this._classNamePT)&&(s=i.xfirst,s&&s._prev?this._linkCSSP(s._prev,i._next,s._prev._prev):s===this._firstPT&&(this._firstPT=i._next),i._next&&this._linkCSSP(i._next,i._next._next,s._prev),this._classNamePT=null),t.prototype._kill.call(this,n)};var Ge=function(t,e,i){var r,s,n,a;if(t.slice)for(s=t.length;--s>-1;)Ge(t[s],e,i);else for(r=t.childNodes,s=r.length;--s>-1;)n=r[s],a=n.type,n.style&&(e.push(K(n)),i&&i.push(n)),1!==a&&9!==a&&11!==a||!n.childNodes.length||Ge(n,e,i)};return a.cascadeTo=function(t,i,r){var s,n,a,o,l=e.to(t,i,r),h=[l],u=[],f=[],c=[],_=e._internals.reservedProps;for(t=l._targets||l.target,Ge(t,u,c),l.render(i,!0,!0),Ge(t,f),l.render(0,!0,!0),l._enabled(!0),s=c.length;--s>-1;)if(n=J(c[s],u[s],f[s]),n.firstMPT){n=n.difs;for(a in r)_[a]&&(n[a]=r[a]);o={};for(a in n)o[a]=u[s][a];h.push(e.fromTo(c[s],i,o,n))}return h},t.activate([a]),a},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(require("../TweenLite.js"),module.exports=e())}("CSSPlugin");


/*!
 * VERSION: beta 0.3.4
 * DATE: 2015-08-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(function(t){"use strict";var e=t.GreenSockGlobals||t,i=function(t){var i,s=t.split("."),r=e;for(i=0;s.length>i;i++)r[s[i]]=r=r[s[i]]||{};return r},s=i("com.greensock.utils"),r=function(t){var e=t.nodeType,i="";if(1===e||9===e||11===e){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)i+=r(t)}else if(3===e||4===e)return t.nodeValue;return i},n=document,a=n.defaultView?n.defaultView.getComputedStyle:function(){},o=/([A-Z])/g,l=function(t,e,i,s){var r;return(i=i||a(t,null))?(t=i.getPropertyValue(e.replace(o,"-$1").toLowerCase()),r=t||i.length?t:i[e]):t.currentStyle&&(i=t.currentStyle,r=i[e]),s?r:parseInt(r,10)||0},h=function(t){return t.length&&t[0]&&(t[0].nodeType&&t[0].style&&!t.nodeType||t[0].length&&t[0][0])?!0:!1},_=function(t){var e,i,s,r=[],n=t.length;for(e=0;n>e;e++)if(i=t[e],h(i))for(s=i.length,s=0;i.length>s;s++)r.push(i[s]);else r.push(i);return r},u=")eefec303079ad17405c",c=/(?:<br>|<br\/>|<br \/>)/gi,f=n.all&&!n.addEventListener,p="<div style='position:relative;display:inline-block;"+(f?"*display:inline;*zoom:1;'":"'"),m=function(t){t=t||"";var e=-1!==t.indexOf("++"),i=1;return e&&(t=t.split("++").join("")),function(){return p+(t?" class='"+t+(e?i++:"")+"'>":">")}},d=s.SplitText=e.SplitText=function(t,e){if("string"==typeof t&&(t=d.selector(t)),!t)throw"cannot split a null element.";this.elements=h(t)?_(t):[t],this.chars=[],this.words=[],this.lines=[],this._originals=[],this.vars=e||{},this.split(e)},g=function(t,e,i){var s=t.nodeType;if(1===s||9===s||11===s)for(t=t.firstChild;t;t=t.nextSibling)g(t,e,i);else(3===s||4===s)&&(t.nodeValue=t.nodeValue.split(e).join(i))},v=function(t,e){for(var i=e.length;--i>-1;)t.push(e[i])},y=function(t,e,i,s,o){c.test(t.innerHTML)&&(t.innerHTML=t.innerHTML.replace(c,u));var h,_,f,p,d,y,T,w,b,x,P,S,k,C,R=r(t),O=e.type||e.split||"chars,words,lines",A=-1!==O.indexOf("lines")?[]:null,D=-1!==O.indexOf("words"),M=-1!==O.indexOf("chars"),L="absolute"===e.position||e.absolute===!0,F=L?"&#173; ":" ",z=-999,I=a(t),E=l(t,"paddingLeft",I),N=l(t,"borderBottomWidth",I)+l(t,"borderTopWidth",I),X=l(t,"borderLeftWidth",I)+l(t,"borderRightWidth",I),B=l(t,"paddingTop",I)+l(t,"paddingBottom",I),j=l(t,"paddingLeft",I)+l(t,"paddingRight",I),U=l(t,"textAlign",I,!0),Y=t.clientHeight,q=t.clientWidth,V="</div>",G=m(e.wordsClass),Q=m(e.charsClass),W=-1!==(e.linesClass||"").indexOf("++"),Z=e.linesClass,H=-1!==R.indexOf("<"),$=!0,K=[],J=[],te=[];for(W&&(Z=Z.split("++").join("")),H&&(R=R.split("<").join("{{LT}}")),h=R.length,p=G(),d=0;h>d;d++)if(T=R.charAt(d),")"===T&&R.substr(d,20)===u)p+=($?V:"")+"<BR/>",$=!1,d!==h-20&&R.substr(d+20,20)!==u&&(p+=" "+G(),$=!0),d+=19;else if(" "===T&&" "!==R.charAt(d-1)&&d!==h-1&&R.substr(d-20,20)!==u){for(p+=$?V:"",$=!1;" "===R.charAt(d+1);)p+=F,d++;(")"!==R.charAt(d+1)||R.substr(d+1,20)!==u)&&(p+=F+G(),$=!0)}else"{"===T&&"{{LT}}"===R.substr(d,6)?(p+=M?Q()+"{{LT}}"+"</div>":"{{LT}}",d+=5):p+=M&&" "!==T?Q()+T+"</div>":T;for(t.innerHTML=p+($?V:""),H&&g(t,"{{LT}}","<"),y=t.getElementsByTagName("*"),h=y.length,w=[],d=0;h>d;d++)w[d]=y[d];if(A||L)for(d=0;h>d;d++)b=w[d],f=b.parentNode===t,(f||L||M&&!D)&&(x=b.offsetTop,A&&f&&x!==z&&"BR"!==b.nodeName&&(_=[],A.push(_),z=x),L&&(b._x=b.offsetLeft,b._y=x,b._w=b.offsetWidth,b._h=b.offsetHeight),A&&(D!==f&&M||(_.push(b),b._x-=E),f&&d&&(w[d-1]._wordEnd=!0),"BR"===b.nodeName&&b.nextSibling&&"BR"===b.nextSibling.nodeName&&A.push([])));for(d=0;h>d;d++)b=w[d],f=b.parentNode===t,"BR"!==b.nodeName?(L&&(S=b.style,D||f||(b._x+=b.parentNode._x,b._y+=b.parentNode._y),S.left=b._x+"px",S.top=b._y+"px",S.position="absolute",S.display="block",S.width=b._w+1+"px",S.height=b._h+"px"),D?f&&""!==b.innerHTML?J.push(b):M&&K.push(b):f?(t.removeChild(b),w.splice(d--,1),h--):!f&&M&&(x=!A&&!L&&b.nextSibling,t.appendChild(b),x||t.appendChild(n.createTextNode(" ")),K.push(b))):A||L?(t.removeChild(b),w.splice(d--,1),h--):D||t.appendChild(b);if(A){for(L&&(P=n.createElement("div"),t.appendChild(P),k=P.offsetWidth+"px",x=P.offsetParent===t?0:t.offsetLeft,t.removeChild(P)),S=t.style.cssText,t.style.cssText="display:none;";t.firstChild;)t.removeChild(t.firstChild);for(C=!L||!D&&!M,d=0;A.length>d;d++){for(_=A[d],P=n.createElement("div"),P.style.cssText="display:block;text-align:"+U+";position:"+(L?"absolute;":"relative;"),Z&&(P.className=Z+(W?d+1:"")),te.push(P),h=_.length,y=0;h>y;y++)"BR"!==_[y].nodeName&&(b=_[y],P.appendChild(b),C&&(b._wordEnd||D)&&P.appendChild(n.createTextNode(" ")),L&&(0===y&&(P.style.top=b._y+"px",P.style.left=E+x+"px"),b.style.top="0px",x&&(b.style.left=b._x-x+"px")));0===h&&(P.innerHTML="&nbsp;"),D||M||(P.innerHTML=r(P).split(String.fromCharCode(160)).join(" ")),L&&(P.style.width=k,P.style.height=b._h+"px"),t.appendChild(P)}t.style.cssText=S}L&&(Y>t.clientHeight&&(t.style.height=Y-B+"px",Y>t.clientHeight&&(t.style.height=Y+N+"px")),q>t.clientWidth&&(t.style.width=q-j+"px",q>t.clientWidth&&(t.style.width=q+X+"px"))),v(i,K),v(s,J),v(o,te)},T=d.prototype;T.split=function(t){this.isSplit&&this.revert(),this.vars=t||this.vars,this._originals.length=this.chars.length=this.words.length=this.lines.length=0;for(var e=this.elements.length;--e>-1;)this._originals[e]=this.elements[e].innerHTML,y(this.elements[e],this.vars,this.chars,this.words,this.lines);return this.chars.reverse(),this.words.reverse(),this.lines.reverse(),this.isSplit=!0,this},T.revert=function(){if(!this._originals)throw"revert() call wasn't scoped properly.";for(var t=this._originals.length;--t>-1;)this.elements[t].innerHTML=this._originals[t];return this.chars=[],this.words=[],this.lines=[],this.isSplit=!1,this},d.selector=t.$||t.jQuery||function(e){var i=t.$||t.jQuery;return i?(d.selector=i,i(e)):"undefined"==typeof document?e:document.querySelectorAll?document.querySelectorAll(e):document.getElementById("#"===e.charAt(0)?e.substr(1):e)},d.version="0.3.4"})(_gsScope),function(t){"use strict";var e=function(){return(_gsScope.GreenSockGlobals||_gsScope)[t]};"function"==typeof define&&define.amd?define(["TweenLite"],e):"undefined"!=typeof module&&module.exports&&(module.exports=e())}("SplitText");


try{
	window.GreenSockGlobals = null;
	window._gsQueue = null;
	window._gsDefine = null;

	delete(window.GreenSockGlobals);
	delete(window._gsQueue);
	delete(window._gsDefine);	
   } catch(e) {}

try{
	window.GreenSockGlobals = oldgs;
	window._gsQueue = oldgs_queue;
	} catch(e) {}

if (window.tplogs==true)
	try {
		console.groupEnd();
	} catch(e) {}

(function(e,t){
		e.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage"]};e.expr[":"].uncached=function(t){var n=document.createElement("img");n.src=t.src;return e(t).is('img[src!=""]')&&!n.complete};e.fn.waitForImages=function(t,n,r){if(e.isPlainObject(arguments[0])){n=t.each;r=t.waitForAll;t=t.finished}t=t||e.noop;n=n||e.noop;r=!!r;if(!e.isFunction(t)||!e.isFunction(n)){throw new TypeError("An invalid callback was supplied.")}return this.each(function(){var i=e(this),s=[];if(r){var o=e.waitForImages.hasImageProperties||[],u=/url\((['"]?)(.*?)\1\)/g;i.find("*").each(function(){var t=e(this);if(t.is("img:uncached")){s.push({src:t.attr("src"),element:t[0]})}e.each(o,function(e,n){var r=t.css(n);if(!r){return true}var i;while(i=u.exec(r)){s.push({src:i[2],element:t[0]})}})})}else{i.find("img:uncached").each(function(){s.push({src:this.src,element:this})})}var f=s.length,l=0;if(f==0){t.call(i[0])}e.each(s,function(r,s){var o=new Image;e(o).bind("load error",function(e){l++;n.call(s.element,l,f,e.type=="load");if(l==f){t.call(i[0]);return false}});o.src=s.src})})};		
})(jQuery)

///#source 1 1 /App_Themes/basic/plugins/rs-plugin/revolution/js/jquery.themepunch.revolution.min.js
/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 5.2.4 (25.03.2016)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
**************************************************************************/
!function(jQuery,undefined){"use strict";jQuery.fn.extend({revolution:function(e){var t={delay:9e3,responsiveLevels:4064,visibilityLevels:[2048,1024,778,480],gridwidth:960,gridheight:500,minHeight:0,autoHeight:"off",sliderType:"standard",sliderLayout:"auto",fullScreenAutoWidth:"off",fullScreenAlignForce:"off",fullScreenOffsetContainer:"",fullScreenOffset:"0",hideCaptionAtLimit:0,hideAllCaptionAtLimit:0,hideSliderAtLimit:0,disableProgressBar:"off",stopAtSlide:-1,stopAfterLoops:-1,shadow:0,dottedOverlay:"none",startDelay:0,lazyType:"smart",spinner:"spinner0",shuffle:"off",viewPort:{enable:!1,outof:"wait",visible_area:"60%"},fallbacks:{isJoomla:!1,panZoomDisableOnMobile:"off",simplifyAll:"on",nextSlideOnWindowFocus:"off",disableFocusListener:!0},parallax:{type:"off",levels:[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85],origo:"enterpoint",speed:400,bgparallax:"off",opacity:"on",disable_onmobile:"off",ddd_shadow:"on",ddd_bgfreeze:"off",ddd_overflow:"visible",ddd_layer_overflow:"visible",ddd_z_correction:65,ddd_path:"mouse"},carousel:{horizontal_align:"center",vertical_align:"center",infinity:"on",space:0,maxVisibleItems:3,stretch:"off",fadeout:"on",maxRotation:0,minScale:0,vary_fade:"off",vary_rotation:"on",vary_scale:"off",border_radius:"0px",padding_top:0,padding_bottom:0},navigation:{keyboardNavigation:"on",keyboard_direction:"horizontal",mouseScrollNavigation:"off",onHoverStop:"on",touch:{touchenabled:"off",swipe_treshold:75,swipe_min_touches:1,drag_block_vertical:!1,swipe_direction:"horizontal"},arrows:{style:"",enable:!1,hide_onmobile:!1,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,tmp:"",rtl:!1,left:{h_align:"left",v_align:"center",h_offset:20,v_offset:0,container:"slider"},right:{h_align:"right",v_align:"center",h_offset:20,v_offset:0,container:"slider"}},bullets:{container:"slider",rtl:!1,style:"",enable:!1,hide_onmobile:!1,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",h_align:"left",v_align:"center",space:0,h_offset:20,v_offset:0,tmp:'<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>'},thumbnails:{container:"slider",rtl:!1,style:"",enable:!1,width:100,height:50,min_width:100,wrapper_padding:2,wrapper_color:"#f5f5f5",wrapper_opacity:1,tmp:'<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',visibleAmount:5,hide_onmobile:!1,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",span:!1,position:"inner",space:2,h_align:"left",v_align:"center",h_offset:20,v_offset:0},tabs:{container:"slider",rtl:!1,style:"",enable:!1,width:100,min_width:100,height:50,wrapper_padding:10,wrapper_color:"#f5f5f5",wrapper_opacity:1,tmp:'<span class="tp-tab-image"></span>',visibleAmount:5,hide_onmobile:!1,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,hide_under:0,hide_over:9999,direction:"horizontal",span:!1,space:0,position:"inner",h_align:"left",v_align:"center",h_offset:20,v_offset:0}},extensions:"extensions/",extensions_suffix:".min.js",debugMode:!1};return e=jQuery.extend(!0,{},t,e),this.each(function(){var t=jQuery(this);"hero"==e.sliderType&&t.find(">ul>li").each(function(e){e>0&&jQuery(this).remove()}),e.jsFileLocation=e.jsFileLocation||getScriptLocation("themepunch.revolution.min.js"),e.jsFileLocation=e.jsFileLocation+e.extensions,e.scriptsneeded=getNeededScripts(e,t),e.curWinRange=0,e.rtl=!0,e.navigation!=undefined&&e.navigation.touch!=undefined&&(e.navigation.touch.swipe_min_touches=e.navigation.touch.swipe_min_touches>5?1:e.navigation.touch.swipe_min_touches),jQuery(this).on("scriptsloaded",function(){return e.modulesfailing?(t.html('<div style="margin:auto;line-height:40px;font-size:14px;color:#fff;padding:15px;background:#e74c3c;margin:20px 0px;">!! Error at loading Slider Revolution 5.0 Extrensions.'+e.errorm+"</div>").show(),!1):(_R.migration!=undefined&&(e=_R.migration(t,e)),punchgs.force3D=!0,"on"!==e.simplifyAll&&punchgs.TweenLite.lagSmoothing(1e3,16),prepareOptions(t,e),void initSlider(t,e))}),t.data("opt",e),waitForScripts(t,e)})},revremoveslide:function(e){return this.each(function(){var t=jQuery(this);if(t!=undefined&&t.length>0&&jQuery("body").find("#"+t.attr("id")).length>0){var i=t.parent().find(".tp-bannertimer"),n=i.data("opt");if(n&&n.li.length>0&&(e>0||e<=n.li.length)){var a=jQuery(n.li[e]),r=a.data("index"),o=!1;n.slideamount=n.slideamount-1,removeNavWithLiref(".tp-bullet",r,n),removeNavWithLiref(".tp-tab",r,n),removeNavWithLiref(".tp-thumb",r,n),a.hasClass("active-revslide")&&(o=!0),a.remove(),n.li=removeArray(n.li,e),n.carousel&&n.carousel.slides&&(n.carousel.slides=removeArray(n.carousel.slides,e)),n.thumbs=removeArray(n.thumbs,e),_R.updateNavIndexes&&_R.updateNavIndexes(n),o&&t.revnext()}}})},revaddcallback:function(e){return this.each(function(){var t=jQuery(this);if(t!=undefined&&t.length>0&&jQuery("body").find("#"+t.attr("id")).length>0){var i=t.parent().find(".tp-bannertimer"),n=i.data("opt");n.callBackArray===undefined&&(n.callBackArray=new Array),n.callBackArray.push(e)}})},revgetparallaxproc:function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");return i.scrollproc}},revdebugmode:function(){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");i.debugMode=!0,containerResized(e,i)}})},revscroll:function(e){return this.each(function(){var t=jQuery(this);t!=undefined&&t.length>0&&jQuery("body").find("#"+t.attr("id")).length>0&&jQuery("body,html").animate({scrollTop:t.offset().top+t.height()-e+"px"},{duration:400})})},revredraw:function(e){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");containerResized(e,i)}})},revkill:function(e){var t=this,i=jQuery(this);if(punchgs.TweenLite.killDelayedCallsTo(_R.showHideNavElements),_R.endMoveCaption&&a.endtimeouts&&a.endtimeouts.length>0&&jQuery.each(a.endtimeouts,function(e,t){clearTimeout(t)}),i!=undefined&&i.length>0&&jQuery("body").find("#"+i.attr("id")).length>0){i.data("conthover",1),i.data("conthover-changed",1),i.trigger("revolution.slide.onpause");var n=i.parent().find(".tp-bannertimer"),a=n.data("opt");a.tonpause=!0,i.trigger("stoptimer"),punchgs.TweenLite.killTweensOf(i.find("*"),!1),punchgs.TweenLite.killTweensOf(i,!1),i.unbind("hover, mouseover, mouseenter,mouseleave, resize");var r="resize.revslider-"+i.attr("id");jQuery(window).off(r),i.find("*").each(function(){var e=jQuery(this);e.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"),e.off("on, hover, mouseenter,mouseleave,mouseover, resize"),e.data("mySplitText",null),e.data("ctl",null),e.data("tween")!=undefined&&e.data("tween").kill(),e.data("kenburn")!=undefined&&e.data("kenburn").kill(),e.data("timeline_out")!=undefined&&e.data("timeline_out").kill(),e.data("timeline")!=undefined&&e.data("timeline").kill(),e.remove(),e.empty(),e=null}),punchgs.TweenLite.killTweensOf(i.find("*"),!1),punchgs.TweenLite.killTweensOf(i,!1),n.remove();try{i.closest(".forcefullwidth_wrapper_tp_banner").remove()}catch(o){}try{i.closest(".rev_slider_wrapper").remove()}catch(o){}try{i.remove()}catch(o){}return i.empty(),i.html(),i=null,a=null,delete t.c,delete t.opt,!0}return!1},revpause:function(){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){e.data("conthover",1),e.data("conthover-changed",1),e.trigger("revolution.slide.onpause");var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");i.tonpause=!0,e.trigger("stoptimer")}})},revresume:function(){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){e.data("conthover",0),e.data("conthover-changed",1),e.trigger("revolution.slide.onresume");var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");i.tonpause=!1,e.trigger("starttimer")}})},revstart:function(){var e=jQuery(this);return e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0&&e.data("opt")?e.data("opt").sliderisrunning?(console.log("Slider Is Running Already"),!1):(runSlider(e,e.data("opt")),!0):void 0},revnext:function(){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");_R.callingNewSlide(i,e,1)}})},revprev:function(){return this.each(function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");_R.callingNewSlide(i,e,-1)}})},revmaxslide:function(){return jQuery(this).find(".tp-revslider-mainul >li").length},revcurrentslide:function(){var e=jQuery(this);if(e!=undefined&&e.length>0&&jQuery("body").find("#"+e.attr("id")).length>0){var t=e.parent().find(".tp-bannertimer"),i=t.data("opt");return parseInt(i.act,0)+1}},revlastslide:function(){return jQuery(this).find(".tp-revslider-mainul >li").length},revshowslide:function(e){return this.each(function(){var t=jQuery(this);if(t!=undefined&&t.length>0&&jQuery("body").find("#"+t.attr("id")).length>0){var i=t.parent().find(".tp-bannertimer"),n=i.data("opt");_R.callingNewSlide(n,t,"to"+(e-1))}})},revcallslidewithid:function(e){return this.each(function(){var t=jQuery(this);if(t!=undefined&&t.length>0&&jQuery("body").find("#"+t.attr("id")).length>0){var i=t.parent().find(".tp-bannertimer"),n=i.data("opt");_R.callingNewSlide(n,t,e)}})}});var _R=jQuery.fn.revolution;jQuery.extend(!0,_R,{simp:function(e,t,i){var n=Math.abs(e)-Math.floor(Math.abs(e/t))*t;return i?n:0>e?-1*n:n},iOSVersion:function(){var e=!1;return navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)?navigator.userAgent.match(/OS 4_\d like Mac OS X/i)&&(e=!0):e=!1,e},isIE:function(e,t){var i=jQuery('<div style="display:none;"/>').appendTo(jQuery("body"));i.html("<!--[if "+(t||"")+" IE "+(e||"")+"]><a>&nbsp;</a><![endif]-->");var n=i.find("a").length;return i.remove(),n},is_mobile:function(){var e=["android","webos","iphone","ipad","blackberry","Android","webos",,"iPod","iPhone","iPad","Blackberry","BlackBerry"],t=!1;for(var i in e)navigator.userAgent.split(e[i]).length>1&&(t=!0);return t},callBackHandling:function(e,t,i){try{e.callBackArray&&jQuery.each(e.callBackArray,function(e,n){n&&n.inmodule&&n.inmodule===t&&n.atposition&&n.atposition===i&&n.callback&&n.callback.call()})}catch(n){console.log("Call Back Failed")}},get_browser:function(){var e,t=navigator.appName,i=navigator.userAgent,n=i.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);return n&&null!=(e=i.match(/version\/([\.\d]+)/i))&&(n[2]=e[1]),n=n?[n[1],n[2]]:[t,navigator.appVersion,"-?"],n[0]},get_browser_version:function(){var e,t=navigator.appName,i=navigator.userAgent,n=i.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);return n&&null!=(e=i.match(/version\/([\.\d]+)/i))&&(n[2]=e[1]),n=n?[n[1],n[2]]:[t,navigator.appVersion,"-?"],n[1]},getHorizontalOffset:function(e,t){var i=gWiderOut(e,".outer-left"),n=gWiderOut(e,".outer-right");switch(t){case"left":return i;case"right":return n;case"both":return i+n}},callingNewSlide:function(e,t,i){var n=t.find(".next-revslide").length>0?t.find(".next-revslide").index():t.find(".processing-revslide").length>0?t.find(".processing-revslide").index():t.find(".active-revslide").index(),a=0;t.find(".next-revslide").removeClass("next-revslide"),t.find(".active-revslide").hasClass("tp-invisible-slide")&&(n=e.last_shown_slide),i&&jQuery.isNumeric(i)||i.match(/to/g)?(1===i||-1===i?(a=n+i,a=0>a?e.slideamount-1:a>=e.slideamount?0:a):(i=jQuery.isNumeric(i)?i:parseInt(i.split("to")[1],0),a=0>i?0:i>e.slideamount-1?e.slideamount-1:i),t.find(".tp-revslider-slidesli:eq("+a+")").addClass("next-revslide")):i&&t.find(".tp-revslider-slidesli").each(function(){var e=jQuery(this);e.data("index")===i&&e.addClass("next-revslide")}),a=t.find(".next-revslide").index(),t.trigger("revolution.nextslide.waiting"),a!==n&&-1!=a?swapSlide(t,e):t.find(".next-revslide").removeClass("next-revslide")},slotSize:function(e,t){t.slotw=Math.ceil(t.width/t.slots),"fullscreen"==t.sliderLayout?t.sloth=Math.ceil(jQuery(window).height()/t.slots):t.sloth=Math.ceil(t.height/t.slots),"on"==t.autoHeight&&e!==undefined&&""!==e&&(t.sloth=Math.ceil(e.height()/t.slots))},setSize:function(e){var t=(e.top_outer||0)+(e.bottom_outer||0),i=parseInt(e.carousel.padding_top||0,0),n=parseInt(e.carousel.padding_bottom||0,0),a=e.gridheight[e.curWinRange];if(e.paddings=e.paddings===undefined?{top:parseInt(e.c.parent().css("paddingTop"),0)||0,bottom:parseInt(e.c.parent().css("paddingBottom"),0)||0}:e.paddings,a=a<e.minHeight?e.minHeight:a,"fullwidth"==e.sliderLayout&&"off"==e.autoHeight&&punchgs.TweenLite.set(e.c,{maxHeight:a+"px"}),e.c.css({marginTop:i,marginBottom:n}),e.width=e.ul.width(),e.height=e.ul.height(),setScale(e),e.height=Math.round(e.gridheight[e.curWinRange]*(e.width/e.gridwidth[e.curWinRange])),e.height>e.gridheight[e.curWinRange]&&"on"!=e.autoHeight&&(e.height=e.gridheight[e.curWinRange]),"fullscreen"==e.sliderLayout||e.infullscreenmode){e.height=e.bw*e.gridheight[e.curWinRange];var r=(e.c.parent().width(),jQuery(window).height());if(e.fullScreenOffsetContainer!=undefined){try{var o=e.fullScreenOffsetContainer.split(",");o&&jQuery.each(o,function(e,t){r=jQuery(t).length>0?r-jQuery(t).outerHeight(!0):r})}catch(s){}try{e.fullScreenOffset.split("%").length>1&&e.fullScreenOffset!=undefined&&e.fullScreenOffset.length>0?r-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:e.fullScreenOffset!=undefined&&e.fullScreenOffset.length>0&&(r-=parseInt(e.fullScreenOffset,0))}catch(s){}}r=r<e.minHeight?e.minHeight:r,r-=t,e.c.parent().height(r),e.c.closest(".rev_slider_wrapper").height(r),e.c.css({height:"100%"}),e.height=r,e.minHeight!=undefined&&e.height<e.minHeight&&(e.height=e.minHeight)}else e.minHeight!=undefined&&e.height<e.minHeight&&(e.height=e.minHeight),e.c.height(e.height);var d={height:i+n+t+e.height+e.paddings.top+e.paddings.bottom};e.c.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css(d),e.c.closest(".rev_slider_wrapper").css(d),setScale(e)},enterInViewPort:function(e){e.waitForCountDown&&(countDown(e.c,e),e.waitForCountDown=!1),e.waitForFirstSlide&&(swapSlide(e.c,e),e.waitForFirstSlide=!1),("playing"==e.sliderlaststatus||e.sliderlaststatus==undefined)&&e.c.trigger("starttimer"),e.lastplayedvideos!=undefined&&e.lastplayedvideos.length>0&&jQuery.each(e.lastplayedvideos,function(t,i){_R.playVideo(i,e)})},leaveViewPort:function(e){e.sliderlaststatus=e.sliderstatus,e.c.trigger("stoptimer"),e.playingvideos!=undefined&&e.playingvideos.length>0&&(e.lastplayedvideos=jQuery.extend(!0,[],e.playingvideos),e.playingvideos&&jQuery.each(e.playingvideos,function(t,i){_R.stopVideo&&_R.stopVideo(i,e)}))},unToggleState:function(e){e!=undefined&&e.length>0&&jQuery.each(e,function(e,t){t.removeClass("rs-toggle-content-active")})},toggleState:function(e){e!=undefined&&e.length>0&&jQuery.each(e,function(e,t){t.addClass("rs-toggle-content-active")})},lastToggleState:function(e){var t=0;return e!=undefined&&e.length>0&&jQuery.each(e,function(e,i){t=i.hasClass("rs-toggle-content-active")}),t}});var _ISM=_R.is_mobile(),removeArray=function(e,t){var i=[];return jQuery.each(e,function(e,n){e!=t&&i.push(n)}),i},removeNavWithLiref=function(e,t,i){i.c.find(e).each(function(){var e=jQuery(this);e.data("liref")===t&&e.remove()})},lAjax=function(e,t){return jQuery("body").data(e)?!1:t.filesystem?(t.errorm===undefined&&(t.errorm="<br>Local Filesystem Detected !<br>Put this to your header:"),console.warn("Local Filesystem detected !"),t.errorm=t.errorm+'<br>&lt;script type="text/javascript" src="'+t.jsFileLocation+e+t.extensions_suffix+'"&gt;&lt;/script&gt;',console.warn(t.jsFileLocation+e+t.extensions_suffix+" could not be loaded !"),console.warn("Please use a local Server or work online or make sure that you load all needed Libraries manually in your Document."),console.log(" "),t.modulesfailing=!0,!1):(jQuery.ajax({url:t.jsFileLocation+e+t.extensions_suffix,dataType:"script",cache:!0,error:function(i){console.warn("Slider Revolution 5.0 Error !"),console.error("Failure at Loading:"+e+t.extensions_suffix+" on Path:"+t.jsFileLocation),console.info(i)}}),void jQuery("body").data(e,!0))},getNeededScripts=function(e,t){var i=new Object,n=e.navigation;return i.kenburns=!1,i.parallax=!1,i.carousel=!1,i.navigation=!1,i.videos=!1,i.actions=!1,i.layeranim=!1,i.migration=!1,t.data("version")&&t.data("version").toString().match(/5./gi)?(t.find("img").each(function(){"on"==jQuery(this).data("kenburns")&&(i.kenburns=!0)}),("carousel"==e.sliderType||"on"==n.keyboardNavigation||"on"==n.mouseScrollNavigation||"on"==n.touch.touchenabled||n.arrows.enable||n.bullets.enable||n.thumbnails.enable||n.tabs.enable)&&(i.navigation=!0),t.find(".tp-caption, .tp-static-layer, .rs-background-video-layer").each(function(){var e=jQuery(this);(e.data("ytid")!=undefined||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&(i.videos=!0),(e.data("vimeoid")!=undefined||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&(i.videos=!0),e.data("actions")!==undefined&&(i.actions=!0),i.layeranim=!0}),t.find("li").each(function(){jQuery(this).data("link")&&jQuery(this).data("link")!=undefined&&(i.layeranim=!0,i.actions=!0)}),!i.videos&&(t.find(".rs-background-video-layer").length>0||t.find(".tp-videolayer").length>0||t.find(".tp-audiolayer")||t.find("iframe").length>0||t.find("video").length>0)&&(i.videos=!0),"carousel"==e.sliderType&&(i.carousel=!0),("off"!==e.parallax.type||e.viewPort.enable||"true"==e.viewPort.enable)&&(i.parallax=!0)):(i.kenburns=!0,i.parallax=!0,i.carousel=!1,i.navigation=!0,i.videos=!0,i.actions=!0,i.layeranim=!0,i.migration=!0),"hero"==e.sliderType&&(i.carousel=!1,i.navigation=!1),window.location.href.match(/file:/gi)&&(i.filesystem=!0,e.filesystem=!0),i.videos&&"undefined"==typeof _R.isVideoPlaying&&lAjax("revolution.extension.video",e),i.carousel&&"undefined"==typeof _R.prepareCarousel&&lAjax("revolution.extension.carousel",e),i.carousel||"undefined"!=typeof _R.animateSlide||lAjax("revolution.extension.slideanims",e),i.actions&&"undefined"==typeof _R.checkActions&&lAjax("revolution.extension.actions",e),i.layeranim&&"undefined"==typeof _R.handleStaticLayers&&lAjax("revolution.extension.layeranimation",e),i.kenburns&&"undefined"==typeof _R.stopKenBurn&&lAjax("revolution.extension.kenburn",e),i.navigation&&"undefined"==typeof _R.createNavigation&&lAjax("revolution.extension.navigation",e),i.migration&&"undefined"==typeof _R.migration&&lAjax("revolution.extension.migration",e),i.parallax&&"undefined"==typeof _R.checkForParallax&&lAjax("revolution.extension.parallax",e),e.addons!=undefined&&e.addons.length>0&&jQuery.each(e.addons,function(t,i){"object"==typeof i&&i.fileprefix!=undefined&&lAjax(i.fileprefix,e)}),i},waitForScripts=function(e,t){var i=!0,n=t.scriptsneeded;t.addons!=undefined&&t.addons.length>0&&jQuery.each(t.addons,function(e,t){"object"==typeof t&&t.init!=undefined&&_R[t.init]===undefined&&(i=!1)}),n.filesystem||"undefined"!=typeof punchgs&&i&&(!n.kenburns||n.kenburns&&"undefined"!=typeof _R.stopKenBurn)&&(!n.navigation||n.navigation&&"undefined"!=typeof _R.createNavigation)&&(!n.carousel||n.carousel&&"undefined"!=typeof _R.prepareCarousel)&&(!n.videos||n.videos&&"undefined"!=typeof _R.resetVideo)&&(!n.actions||n.actions&&"undefined"!=typeof _R.checkActions)&&(!n.layeranim||n.layeranim&&"undefined"!=typeof _R.handleStaticLayers)&&(!n.migration||n.migration&&"undefined"!=typeof _R.migration)&&(!n.parallax||n.parallax&&"undefined"!=typeof _R.checkForParallax)&&(n.carousel||!n.carousel&&"undefined"!=typeof _R.animateSlide)?e.trigger("scriptsloaded"):setTimeout(function(){waitForScripts(e,t)},50)},getScriptLocation=function(e){var t=new RegExp("themepunch.revolution.min.js","gi"),i="";return jQuery("script").each(function(){var e=jQuery(this).attr("src");e&&e.match(t)&&(i=e)}),i=i.replace("jquery.themepunch.revolution.min.js",""),i=i.replace("jquery.themepunch.revolution.js",""),i=i.split("?")[0]},setCurWinRange=function(e,t){var i=9999,n=0,a=0,r=0,o=jQuery(window).width(),s=t&&9999==e.responsiveLevels?e.visibilityLevels:e.responsiveLevels;s&&s.length&&jQuery.each(s,function(e,t){t>o&&(0==n||n>t)&&(i=t,r=e,n=t),o>t&&t>n&&(n=t,a=e)}),i>n&&(r=a),t?e.forcedWinRange=r:e.curWinRange=r},prepareOptions=function(e,t){t.carousel.maxVisibleItems=t.carousel.maxVisibleItems<1?999:t.carousel.maxVisibleItems,t.carousel.vertical_align="top"===t.carousel.vertical_align?"0%":"bottom"===t.carousel.vertical_align?"100%":"50%"},gWiderOut=function(e,t){var i=0;return e.find(t).each(function(){var e=jQuery(this);!e.hasClass("tp-forcenotvisible")&&i<e.outerWidth()&&(i=e.outerWidth())}),i},initSlider=function(container,opt){return container==undefined?!1:(container.data("aimg")!=undefined&&("enabled"==container.data("aie8")&&_R.isIE(8)||"enabled"==container.data("amobile")&&_ISM)&&container.html('<img class="tp-slider-alternative-image" src="'+container.data("aimg")+'">'),container.find(">ul").addClass("tp-revslider-mainul"),opt.c=container,opt.ul=container.find(".tp-revslider-mainul"),opt.ul.find(">li").each(function(e){var t=jQuery(this);"on"==t.data("hideslideonmobile")&&_ISM&&t.remove(),(t.data("invisible")||t.data("invisible")===!0)&&(t.addClass("tp-invisible-slide"),t.appendTo(opt.ul))}),opt.addons!=undefined&&opt.addons.length>0&&jQuery.each(opt.addons,function(i,obj){"object"==typeof obj&&obj.init!=undefined&&_R[obj.init](eval(obj.params))}),opt.cid=container.attr("id"),opt.ul.css({visibility:"visible"}),opt.slideamount=opt.ul.find(">li").not(".tp-invisible-slide").length,opt.slayers=container.find(".tp-static-layers"),void(1!=opt.waitForInit&&(container.data("opt",opt),runSlider(container,opt))))},runSlider=function(e,t){if(t.sliderisrunning=!0,t.ul.find(">li").each(function(e){jQuery(this).data("originalindex",e)}),"on"==t.shuffle){var i=new Object,n=t.ul.find(">li:first-child");i.fstransition=n.data("fstransition"),i.fsmasterspeed=n.data("fsmasterspeed"),i.fsslotamount=n.data("fsslotamount");for(var a=0;a<t.slideamount;a++){var r=Math.round(Math.random()*t.slideamount);t.ul.find(">li:eq("+r+")").prependTo(t.ul)}var o=t.ul.find(">li:first-child");o.data("fstransition",i.fstransition),o.data("fsmasterspeed",i.fsmasterspeed),o.data("fsslotamount",i.fsslotamount),t.li=t.ul.find(">li").not(".tp-invisible-slide")}if(t.allli=t.ul.find(">li"),t.li=t.ul.find(">li").not(".tp-invisible-slide"),t.inli=t.ul.find(">li.tp-invisible-slide"),t.thumbs=new Array,t.slots=4,t.act=-1,t.firststart=1,t.loadqueue=new Array,t.syncload=0,t.conw=e.width(),t.conh=e.height(),t.responsiveLevels.length>1?t.responsiveLevels[0]=9999:t.responsiveLevels=9999,jQuery.each(t.allli,function(e,i){var i=jQuery(i),n=i.find(".rev-slidebg")||i.find("img").first(),a=0;i.addClass("tp-revslider-slidesli"),i.data("index")===undefined&&i.data("index","rs-"+Math.round(999999*Math.random()));var r=new Object;r.params=new Array,r.id=i.data("index"),r.src=i.data("thumb")!==undefined?i.data("thumb"):n.data("lazyload")!==undefined?n.data("lazyload"):n.attr("src"),i.data("title")!==undefined&&r.params.push({from:RegExp("\\{\\{title\\}\\}","g"),to:i.data("title")}),i.data("description")!==undefined&&r.params.push({from:RegExp("\\{\\{description\\}\\}","g"),to:i.data("description")});for(var a=1;10>=a;a++)i.data("param"+a)!==undefined&&r.params.push({from:RegExp("\\{\\{param"+a+"\\}\\}","g"),to:i.data("param"+a)});if(t.thumbs.push(r),i.data("origindex",i.index()),i.data("link")!=undefined){var o=i.data("link"),s=i.data("target")||"_self",d="back"===i.data("slideindex")?0:60,l=i.data("linktoslide"),u=l;l!=undefined&&"next"!=l&&"prev"!=l&&t.allli.each(function(){var e=jQuery(this);e.data("origindex")+1==u&&(l=e.data("index"))}),"slide"!=o&&(l="no");var c='<div class="tp-caption slidelink" style="cursor:pointer;width:100%;height:100%;z-index:'+d+';" data-x="center" data-y="center" data-basealign="slide" ',p="scroll_under"===l?'[{"event":"click","action":"scrollbelow","offset":"100px","delay":"0"}]':"prev"===l?'[{"event":"click","action":"jumptoslide","slide":"prev","delay":"0.2"}]':"next"===l?'[{"event":"click","action":"jumptoslide","slide":"next","delay":"0.2"}]':'[{"event":"click","action":"jumptoslide","slide":"'+l+'","delay":"0.2"}]';c="no"==l?c+' data-start="0">':c+"data-actions='"+p+'\' data-start="0">',c+='<a style="width:100%;height:100%;display:block"',c="slide"!=o?c+' target="'+s+'" href="'+o+'"':c,c+='><span style="width:100%;height:100%;display:block"></span></a></div>',i.append(c)}}),t.rle=t.responsiveLevels.length||1,t.gridwidth=cArray(t.gridwidth,t.rle),t.gridheight=cArray(t.gridheight,t.rle),"on"==t.simplifyAll&&(_R.isIE(8)||_R.iOSVersion())&&(e.find(".tp-caption").each(function(){var e=jQuery(this);e.removeClass("customin customout").addClass("fadein fadeout"),e.data("splitin",""),e.data("speed",400)}),t.allli.each(function(){var e=jQuery(this);e.data("transition","fade"),e.data("masterspeed",500),e.data("slotamount",1);var t=e.find(".rev-slidebg")||e.find(">img").first();t.data("kenburns","off")})),t.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),t.autoHeight="fullscreen"==t.sliderLayout?"on":t.autoHeight,"fullwidth"==t.sliderLayout&&"off"==t.autoHeight&&e.css({maxHeight:t.gridheight[t.curWinRange]+"px"}),"auto"!=t.sliderLayout&&0==e.closest(".forcefullwidth_wrapper_tp_banner").length&&("fullscreen"!==t.sliderLayout||"on"!=t.fullScreenAutoWidth)){var s=e.parent(),d=s.css("marginBottom"),l=s.css("marginTop");d=d===undefined?0:d,l=l===undefined?0:l,s.wrap('<div class="forcefullwidth_wrapper_tp_banner" style="position:relative;width:100%;height:auto;margin-top:'+l+";margin-bottom:"+d+'"></div>'),e.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:'+e.height()+'px"></div>'),e.parent().css({marginTop:"0px",marginBottom:"0px"}),e.parent().css({position:"absolute"})}if(t.shadow!==undefined&&t.shadow>0&&(e.parent().addClass("tp-shadow"+t.shadow),e.parent().append('<div class="tp-shadowcover"></div>'),e.parent().find(".tp-shadowcover").css({backgroundColor:e.parent().css("backgroundColor"),backgroundImage:e.parent().css("backgroundImage")})),setCurWinRange(t),setCurWinRange(t,!0),!e.hasClass("revslider-initialised")){e.addClass("revslider-initialised"),e.addClass("tp-simpleresponsive"),e.attr("id")==undefined&&e.attr("id","revslider-"+Math.round(1e3*Math.random()+5)),t.firefox13=!1,t.ie=!jQuery.support.opacity,t.ie9=9==document.documentMode,t.origcd=t.delay;var u=jQuery.fn.jquery.split("."),c=parseFloat(u[0]),p=parseFloat(u[1]);parseFloat(u[2]||"0");1==c&&7>p&&e.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:'+u+" <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"),c>1&&(t.ie=!1);var f=new Object;f.addedyt=0,f.addedvim=0,f.addedvid=0,e.find(".tp-caption, .rs-background-video-layer").each(function(e){var i=jQuery(this),n=i.data("autoplayonlyfirsttime"),a=i.data("autoplay"),r=i.hasClass("tp-audiolayer"),o=i.data("videoloop");i.hasClass("tp-static-layer")&&_R.handleStaticLayers&&_R.handleStaticLayers(i,t);var s=i.data("noposteronmobile")||i.data("noPosterOnMobile")||i.data("posteronmobile")||i.data("posterOnMobile")||i.data("posterOnMObile");i.data("noposteronmobile",s);var d=0;if(i.find("iframe").each(function(){punchgs.TweenLite.set(jQuery(this),{autoAlpha:0}),d++}),d>0&&i.data("iframes",!0),i.hasClass("tp-caption")){var l=i.hasClass("slidelink")?"width:100% !important;height:100% !important;":"";i.wrap('<div class="tp-parallax-wrap" style="'+l+'position:absolute;visibility:hidden"><div class="tp-loop-wrap" style="'+l+'position:absolute;"><div class="tp-mask-wrap" style="'+l+'position:absolute" ></div></div></div>');var u=["pendulum","rotate","slideloop","pulse","wave"],c=i.closest(".tp-loop-wrap");jQuery.each(u,function(e,t){var n=i.find(".rs-"+t),a=n.data()||"";""!=a&&(c.data(a),c.addClass("rs-"+t),n.children(0).unwrap(),i.data("loopanimation","on"))}),punchgs.TweenLite.set(i,{visibility:"hidden"})}var p=i.data("actions");p!==undefined&&_R.checkActions(i,t,p),checkHoverDependencies(i,t),_R.checkVideoApis&&(f=_R.checkVideoApis(i,t,f)),_ISM&&((1==n||"true"==n)&&(i.data("autoplayonlyfirsttime","false"),n=!1),(1==a||"true"==a||"on"==a||"1sttime"==a)&&(i.data("autoplay","off"),a="off")),i.data("videoloop",o),r||1!=n&&"true"!=n&&"1sttime"!=a||"loopandnoslidestop"==o||i.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-once"),r||1!=a&&"true"!=a&&"on"!=a&&"no1sttime"!=a||"loopandnoslidestop"==o||i.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-always")}),e.hover(function(){e.trigger("tp-mouseenter"),t.overcontainer=!0},function(){e.trigger("tp-mouseleft"),t.overcontainer=!1}),e.on("mouseover",function(){e.trigger("tp-mouseover"),t.overcontainer=!0}),e.find(".tp-caption video").each(function(e){var t=jQuery(this);t.removeClass("video-js vjs-default-skin"),t.attr("preload",""),t.css({display:"none"})}),"standard"!==t.sliderType&&(t.lazyType="all"),loadImages(e.find(".tp-static-layers"),t,0,!0),waitForCurrentImages(e.find(".tp-static-layers"),t,function(){e.find(".tp-static-layers img").each(function(){var e=jQuery(this),i=e.data("lazyload")!=undefined?e.data("lazyload"):e.attr("src"),n=getLoadObj(t,i);e.attr("src",n.src)})}),t.allli.each(function(e){var i=jQuery(this);("all"==t.lazyType||"smart"==t.lazyType&&(0==e||1==e||e==t.slideamount||e==t.slideamount-1))&&(loadImages(i,t,e),waitForCurrentImages(i,t,function(){"carousel"==t.sliderType&&punchgs.TweenLite.to(i,1,{autoAlpha:1,ease:punchgs.Power3.easeInOut})}))});var h=getUrlVars("#")[0];if(h.length<9&&h.split("slide").length>1){var g=parseInt(h.split("slide")[1],0);1>g&&(g=1),g>t.slideamount&&(g=t.slideamount),t.startWithSlide=g-1}e.append('<div class="tp-loader '+t.spinner+'"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'),0===e.find(".tp-bannertimer").length&&e.append('<div class="tp-bannertimer" style="visibility:hidden"></div>'),e.find(".tp-bannertimer").css({width:"0%"}),e.find(".tp-bannertimer").data("opt",t),t.ul.css({display:"block"}),prepareSlides(e,t),"off"!==t.parallax.type&&_R.checkForParallax(e,t),_R.setSize(t),"hero"!==t.sliderType&&_R.createNavigation(e,t),_R.resizeThumbsTabs&&_R.resizeThumbsTabs(t),contWidthManager(t);var v=t.viewPort;t.inviewport=!1,v!=undefined&&v.enable&&(jQuery.isNumeric(v.visible_area)||-1!==v.visible_area.indexOf("%")&&(v.visible_area=parseInt(v.visible_area)/100),_R.scrollTicker&&_R.scrollTicker(t,e)),setTimeout(function(){"carousel"==t.sliderType&&_R.prepareCarousel(t),!v.enable||v.enable&&t.inviewport||v.enable&&!t.inviewport&&"wait"==!v.outof?swapSlide(e,t):t.waitForFirstSlide=!0,_R.manageNavigation&&_R.manageNavigation(t),t.slideamount>1&&(!v.enable||v.enable&&t.inviewport?countDown(e,t):t.waitForCountDown=!0),setTimeout(function(){e.trigger("revolution.slide.onloaded")},100)},t.startDelay),t.startDelay=0,jQuery("body").data("rs-fullScreenMode",!1),jQuery(window).on("mozfullscreenchange webkitfullscreenchange fullscreenchange",function(){jQuery("body").data("rs-fullScreenMode",!jQuery("body").data("rs-fullScreenMode")),jQuery("body").data("rs-fullScreenMode")&&setTimeout(function(){jQuery(window).trigger("resize")},200)});var m="resize.revslider-"+e.attr("id");jQuery(window).on(m,function(){
return e==undefined?!1:(0!=jQuery("body").find(e)&&contWidthManager(t),void((e.outerWidth(!0)!=t.width||e.is(":hidden")||"fullscreen"==t.sliderLayout&&jQuery(window).height()!=t.lastwindowheight)&&(t.lastwindowheight=jQuery(window).height(),containerResized(e,t))))}),hideSliderUnder(e,t),contWidthManager(t),t.fallbacks.disableFocusListener||"true"==t.fallbacks.disableFocusListener||t.fallbacks.disableFocusListener===!0||tabBlurringCheck(e,t)}},cArray=function(e,t){if(!jQuery.isArray(e)){var i=e;e=new Array,e.push(i)}if(e.length<t)for(var i=e[e.length-1],n=0;n<t-e.length+2;n++)e.push(i);return e},checkHoverDependencies=function(e,t){"sliderenter"===e.data("start")&&(t.layersonhover===undefined&&(t.c.on("tp-mouseenter",function(){t.layersonhover&&jQuery.each(t.layersonhover,function(e,i){i.data("animdirection","in");var n=i.data("timeline_out"),a="carousel"===t.sliderType?0:t.width/2-t.gridwidth[t.curWinRange]*t.bw/2,r=0,o=i.closest(".tp-revslider-slidesli"),s=i.closest(".tp-static-layers");if(o.length>0&&o.hasClass("active-revslide")||o.hasClass("processing-revslide")||s.length>0){n!=undefined&&(n.pause(0),n.kill()),_R.animateSingleCaption(i,t,a,r,0,!1,!0);var d=i.data("timeline");i.data("triggerstate","on"),d.play(0)}})}),t.c.on("tp-mouseleft",function(){t.layersonhover&&jQuery.each(t.layersonhover,function(e,i){i.data("animdirection","out"),i.data("triggered",!0),i.data("triggerstate","off"),_R.stopVideo&&_R.stopVideo(i,t),_R.endMoveCaption&&_R.endMoveCaption(i,null,null,t)})}),t.layersonhover=new Array),t.layersonhover.push(e))},contWidthManager=function(e){var t=_R.getHorizontalOffset(e.c,"left");if("auto"==e.sliderLayout||"fullscreen"===e.sliderLayout&&"on"==e.fullScreenAutoWidth)"fullscreen"==e.sliderLayout&&"on"==e.fullScreenAutoWidth?punchgs.TweenLite.set(e.ul,{left:0,width:e.c.width()}):punchgs.TweenLite.set(e.ul,{left:t,width:e.c.width()-_R.getHorizontalOffset(e.c,"both")});else{var i=Math.ceil(e.c.closest(".forcefullwidth_wrapper_tp_banner").offset().left-t);punchgs.TweenLite.set(e.c.parent(),{left:0-i+"px",width:jQuery(window).width()-_R.getHorizontalOffset(e.c,"both")})}e.slayers&&"fullwidth"!=e.sliderLayout&&"fullscreen"!=e.sliderLayout&&punchgs.TweenLite.set(e.slayers,{left:t})},cv=function(e,t){return e===undefined?t:e},hideSliderUnder=function(e,t,i){var n=e.parent();jQuery(window).width()<t.hideSliderAtLimit?(e.trigger("stoptimer"),"none"!=n.css("display")&&n.data("olddisplay",n.css("display")),n.css({display:"none"})):e.is(":hidden")&&i&&(n.data("olddisplay")!=undefined&&"undefined"!=n.data("olddisplay")&&"none"!=n.data("olddisplay")?n.css({display:n.data("olddisplay")}):n.css({display:"block"}),e.trigger("restarttimer"),setTimeout(function(){containerResized(e,t)},150)),_R.hideUnHideNav&&_R.hideUnHideNav(t)},containerResized=function(e,t){if(1==t.infullscreenmode&&(t.minHeight=jQuery(window).height()),setCurWinRange(t),setCurWinRange(t,!0),!_R.resizeThumbsTabs||_R.resizeThumbsTabs(t)===!0){if(hideSliderUnder(e,t,!0),contWidthManager(t),"carousel"==t.sliderType&&_R.prepareCarousel(t,!0),e===undefined)return!1;_R.setSize(t),t.conw=t.c.width(),t.conh=t.infullscreenmode?t.minHeight:t.c.height();var i=e.find(".active-revslide .slotholder"),n=e.find(".processing-revslide .slotholder");removeSlots(e,t,e,2),"standard"===t.sliderType&&(punchgs.TweenLite.set(n.find(".defaultimg"),{opacity:0}),i.find(".defaultimg").css({opacity:1})),"carousel"==t.sliderType&&t.lastconw!=t.conw&&(clearTimeout(t.pcartimer),t.pcartimer=setTimeout(function(){_R.prepareCarousel(t,!0)},100),t.lastconw=t.conw),_R.manageNavigation&&_R.manageNavigation(t),_R.animateTheCaptions&&_R.animateTheCaptions(e.find(".active-revslide"),t,!0),"on"==n.data("kenburns")&&_R.startKenBurn(n,t,n.data("kbtl").progress()),"on"==i.data("kenburns")&&_R.startKenBurn(i,t,i.data("kbtl").progress()),_R.animateTheCaptions&&_R.animateTheCaptions(n.closest("li"),t,!0),_R.manageNavigation&&_R.manageNavigation(t)}},setScale=function(e){e.bw=e.width/e.gridwidth[e.curWinRange],e.bh=e.height/e.gridheight[e.curWinRange],e.bh>e.bw?e.bh=e.bw:e.bw=e.bh,(e.bh>1||e.bw>1)&&(e.bw=1,e.bh=1)},prepareSlides=function(e,t){if(e.find(".tp-caption").each(function(){var e=jQuery(this);e.data("transition")!==undefined&&e.addClass(e.data("transition"))}),t.ul.css({overflow:"hidden",width:"100%",height:"100%",maxHeight:e.parent().css("maxHeight")}),"on"==t.autoHeight&&(t.ul.css({overflow:"hidden",width:"100%",height:"100%",maxHeight:"none"}),e.css({maxHeight:"none"}),e.parent().css({maxHeight:"none"})),t.allli.each(function(e){var i=jQuery(this),n=i.data("originalindex");(t.startWithSlide!=undefined&&n==t.startWithSlide||t.startWithSlide===undefined&&0==e)&&i.addClass("next-revslide"),i.css({width:"100%",height:"100%",overflow:"hidden"})}),"carousel"===t.sliderType){t.ul.css({overflow:"visible"}).wrap('<div class="tp-carousel-wrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden;"></div>');var i='<div style="clear:both;display:block;width:100%;height:1px;position:relative;margin-bottom:-1px"></div>';t.c.parent().prepend(i),t.c.parent().append(i),_R.prepareCarousel(t)}e.parent().css({overflow:"visible"}),t.allli.find(">img").each(function(e){var i=jQuery(this),n=i.closest("li").find(".rs-background-video-layer");n.addClass("defaultvid").css({zIndex:30}),i.addClass("defaultimg"),"on"==t.fallbacks.panZoomDisableOnMobile&&_ISM&&(i.data("kenburns","off"),i.data("bgfit","cover")),i.wrap('<div class="slotholder" style="position:absolute; top:0px; left:0px; z-index:0;width:100%;height:100%;"></div>'),n.appendTo(i.closest("li").find(".slotholder"));var a=i.data();i.closest(".slotholder").data(a),n.length>0&&a.bgparallax!=undefined&&n.data("bgparallax",a.bgparallax),"none"!=t.dottedOverlay&&t.dottedOverlay!=undefined&&i.closest(".slotholder").append('<div class="tp-dottedoverlay '+t.dottedOverlay+'"></div>');var r=i.attr("src");a.src=r,a.bgfit=a.bgfit||"cover",a.bgrepeat=a.bgrepeat||"no-repeat",a.bgposition=a.bgposition||"center center";var o=i.closest(".slotholder");i.parent().append('<div class="tp-bgimg defaultimg" style="background-color:'+i.css("backgroundColor")+";background-repeat:"+a.bgrepeat+";background-image:url("+r+");background-size:"+a.bgfit+";background-position:"+a.bgposition+';width:100%;height:100%;"></div>');var s=document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - "+i.get(0).outerHTML);i.replaceWith(s),i=o.find(".tp-bgimg"),i.data(a),i.attr("src",r),("standard"===t.sliderType||"undefined"===t.sliderType)&&i.css({opacity:0})})},removeSlots=function(e,t,i,n){t.removePrepare=t.removePrepare+n,i.find(".slot, .slot-circle-wrapper").each(function(){jQuery(this).remove()}),t.transition=0,t.removePrepare=0},cutParams=function(e){var t=e;return e!=undefined&&e.length>0&&(t=e.split("?")[0]),t},relativeRedir=function(e){return location.pathname.replace(/(.*)\/[^\/]*/,"$1/"+e)},abstorel=function(e,t){var i=e.split("/"),n=t.split("/");i.pop();for(var a=0;a<n.length;a++)"."!=n[a]&&(".."==n[a]?i.pop():i.push(n[a]));return i.join("/")},imgLoaded=function(e,t,i){t.syncload--,t.loadqueue&&jQuery.each(t.loadqueue,function(t,n){var a=n.src.replace(/\.\.\/\.\.\//gi,""),r=self.location.href,o=document.location.origin,s=r.substring(0,r.length-1)+"/"+a,d=o+"/"+a,l=abstorel(self.location.href,n.src);r=r.substring(0,r.length-1)+a,o+=a,(cutParams(o)===cutParams(decodeURIComponent(e.src))||cutParams(r)===cutParams(decodeURIComponent(e.src))||cutParams(l)===cutParams(decodeURIComponent(e.src))||cutParams(d)===cutParams(decodeURIComponent(e.src))||cutParams(s)===cutParams(decodeURIComponent(e.src))||cutParams(n.src)===cutParams(decodeURIComponent(e.src))||cutParams(n.src).replace(/^.*\/\/[^\/]+/,"")===cutParams(decodeURIComponent(e.src)).replace(/^.*\/\/[^\/]+/,"")||"file://"===window.location.origin&&cutParams(e.src).match(new RegExp(a)))&&(n.progress=i,n.width=e.width,n.height=e.height)}),progressImageLoad(t)},progressImageLoad=function(e){3!=e.syncload&&e.loadqueue&&jQuery.each(e.loadqueue,function(t,i){if(i.progress.match(/prepared/g)&&e.syncload<=3){if(e.syncload++,"img"==i.type){var n=new Image;n.onload=function(){imgLoaded(this,e,"loaded")},n.onerror=function(){imgLoaded(this,e,"failed")},n.src=i.src}else jQuery.get(i.src,function(t){i.innerHTML=(new XMLSerializer).serializeToString(t.documentElement),i.progress="loaded",e.syncload--,progressImageLoad(e)}).fail(function(){i.progress="failed",e.syncload--,progressImageLoad(e)});i.progress="inload"}})},addToLoadQueue=function(e,t,i,n,a){var r=!1;if(t.loadqueue&&jQuery.each(t.loadqueue,function(t,i){i.src===e&&(r=!0)}),!r){var o=new Object;o.src=e,o.type=n||"img",o.prio=i,o.progress="prepared",o["static"]=a,t.loadqueue.push(o)}},loadImages=function(e,t,i,n){e.find("img,.defaultimg, .tp-svg-layer").each(function(){var e=jQuery(this),a=e.data("lazyload")!==undefined&&"undefined"!==e.data("lazyload")?e.data("lazyload"):e.data("svg_src")!=undefined?e.data("svg_src"):e.attr("src"),r=e.data("svg_src")!=undefined?"svg":"img";e.data("start-to-load",jQuery.now()),addToLoadQueue(a,t,i,r,n)}),progressImageLoad(t)},getLoadObj=function(e,t){var i=new Object;return e.loadqueue&&jQuery.each(e.loadqueue,function(e,n){n.src==t&&(i=n)}),i},waitForCurrentImages=function(e,t,i){var n=!1;e.find("img,.defaultimg, .tp-svg-layer").each(function(){var i=jQuery(this),a=i.data("lazyload")!=undefined?i.data("lazyload"):i.data("svg_src")!=undefined?i.data("svg_src"):i.attr("src"),r=getLoadObj(t,a);if(i.data("loaded")===undefined&&r!==undefined&&r.progress&&r.progress.match(/loaded/g)){if(i.attr("src",r.src),"img"==r.type)if(i.hasClass("defaultimg"))_R.isIE(8)?defimg.attr("src",r.src):i.css({backgroundImage:'url("'+r.src+'")'}),e.data("owidth",r.width),e.data("oheight",r.height),e.find(".slotholder").data("owidth",r.width),e.find(".slotholder").data("oheight",r.height);else{var o=i.data("ww"),s=i.data("hh");i.data("owidth",r.width),i.data("oheight",r.height),o=o==undefined||"auto"==o||""==o?r.width:o,s=s==undefined||"auto"==s||""==s?r.height:s,i.data("ww",o),i.data("hh",s)}else"svg"==r.type&&"loaded"==r.progress&&(i.append('<div class="tp-svg-innercontainer"></div>'),i.find(".tp-svg-innercontainer").append(r.innerHTML));i.data("loaded",!0)}if(r&&r.progress&&r.progress.match(/inprogress|inload|prepared/g)&&(jQuery.now()-i.data("start-to-load")<5e3?n=!0:(r.progress="failed",console.error(a+"  Could not be loaded !"))),1==t.youtubeapineeded&&(!window.YT||YT.Player==undefined)&&(n=!0,jQuery.now()-t.youtubestarttime>5e3&&1!=t.youtubewarning)){t.youtubewarning=!0;var d="YouTube Api Could not be loaded !";"https:"===location.protocol&&(d+=" Please Check and Renew SSL Certificate !"),console.error(d),t.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>'+d+"</strong></div>")}if(1==t.vimeoapineeded&&!window.Froogaloop&&(n=!0,jQuery.now()-t.vimeostarttime>5e3&&1!=t.vimeowarning)){t.vimeowarning=!0;var d="Vimeo Froogaloop Api Could not be loaded !";"https:"===location.protocol&&(d+=" Please Check and Renew SSL Certificate !"),console.error(d),t.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>'+d+"</strong></div>")}}),!_ISM&&t.audioqueue&&t.audioqueue.length>0&&jQuery.each(t.audioqueue,function(e,t){t.status&&"prepared"===t.status&&jQuery.now()-t.start<t.waittime&&(n=!0)}),jQuery.each(t.loadqueue,function(e,t){t["static"]!==!0||"loaded"==t.progress&&"failed"!==t.progress||(n=!0)}),n?setTimeout(function(){waitForCurrentImages(e,t,i)},19):setTimeout(i,19)},swapSlide=function(e,t){if(clearTimeout(t.waitWithSwapSlide),e.find(".processing-revslide").length>0)return t.waitWithSwapSlide=setTimeout(function(){swapSlide(e,t)},150),!1;var i=e.find(".active-revslide"),n=e.find(".next-revslide"),a=n.find(".defaultimg");return n.index()===i.index()?(n.removeClass("next-revslide"),!1):(n.removeClass("next-revslide").addClass("processing-revslide"),n.data("slide_on_focus_amount",n.data("slide_on_focus_amount")+1||1),"on"==t.stopLoop&&n.index()==t.lastslidetoshow-1&&(e.find(".tp-bannertimer").css({visibility:"hidden"}),e.trigger("revolution.slide.onstop"),t.noloopanymore=1),n.index()===t.slideamount-1&&(t.looptogo=t.looptogo-1,t.looptogo<=0&&(t.stopLoop="on")),t.tonpause=!0,e.trigger("stoptimer"),t.cd=0,"off"===t.spinner?e.find(".tp-loader").css({display:"none"}):e.find(".tp-loader").css({display:"block"}),loadImages(n,t,1),_R.preLoadAudio&&_R.preLoadAudio(n,t,1),void waitForCurrentImages(n,t,function(){n.find(".rs-background-video-layer").each(function(){var e=jQuery(this);e.hasClass("HasListener")||(e.data("bgvideo",1),_R.manageVideoLayer&&_R.manageVideoLayer(e,t)),0==e.find(".rs-fullvideo-cover").length&&e.append('<div class="rs-fullvideo-cover"></div>')}),swapSlideProgress(t,a,e)}))},swapSlideProgress=function(e,t,i){var n=i.find(".active-revslide"),a=i.find(".processing-revslide"),r=n.find(".slotholder"),o=a.find(".slotholder");e.tonpause=!1,e.cd=0,i.find(".tp-loader").css({display:"none"}),_R.setSize(e),_R.slotSize(t,e),_R.manageNavigation&&_R.manageNavigation(e);var s={};s.nextslide=a,s.currentslide=n,i.trigger("revolution.slide.onbeforeswap",s),e.transition=1,e.videoplaying=!1,a.data("delay")!=undefined?(e.cd=0,e.delay=a.data("delay")):e.delay=e.origcd,"true"==a.data("ssop")||a.data("ssop")===!0?e.ssop=!0:e.ssop=!1,i.trigger("nulltimer");var d=n.index(),l=a.index();e.sdir=d>l?1:0,"arrow"==e.sc_indicator&&(0==d&&l==e.slideamount-1&&(e.sdir=1),d==e.slideamount-1&&0==l&&(e.sdir=0)),e.lsdir=e.lsdir===undefined?e.sdir:e.lsdir,e.dirc=e.lsdir!=e.sdir,e.lsdir=e.sdir,n.index()!=a.index()&&1!=e.firststart&&_R.removeTheCaptions&&_R.removeTheCaptions(n,e),a.hasClass("rs-pause-timer-once")||a.hasClass("rs-pause-timer-always")?e.videoplaying=!0:i.trigger("restarttimer"),a.removeClass("rs-pause-timer-once");var u,c;if("carousel"==e.sliderType)c=new punchgs.TimelineLite,_R.prepareCarousel(e,c),letItFree(i,e,o,r,a,n,c),e.transition=0,e.firststart=0;else{c=new punchgs.TimelineLite({onComplete:function(){letItFree(i,e,o,r,a,n,c)}}),c.add(punchgs.TweenLite.set(o.find(".defaultimg"),{opacity:0})),c.pause(),1==e.firststart&&(punchgs.TweenLite.set(n,{autoAlpha:0}),e.firststart=0),punchgs.TweenLite.set(n,{zIndex:18}),punchgs.TweenLite.set(a,{autoAlpha:0,zIndex:20}),"prepared"==a.data("differentissplayed")&&(a.data("differentissplayed","done"),a.data("transition",a.data("savedtransition")),a.data("slotamount",a.data("savedslotamount")),a.data("masterspeed",a.data("savedmasterspeed"))),a.data("fstransition")!=undefined&&"done"!=a.data("differentissplayed")&&(a.data("savedtransition",a.data("transition")),a.data("savedslotamount",a.data("slotamount")),a.data("savedmasterspeed",a.data("masterspeed")),a.data("transition",a.data("fstransition")),a.data("slotamount",a.data("fsslotamount")),a.data("masterspeed",a.data("fsmasterspeed")),a.data("differentissplayed","prepared")),a.data("transition")==undefined&&a.data("transition","random"),u=0;var p=a.data("transition")!==undefined?a.data("transition").split(","):"fade",f=a.data("nexttransid")==undefined?-1:a.data("nexttransid");"on"==a.data("randomtransition")?f=Math.round(Math.random()*p.length):f+=1,f==p.length&&(f=0),a.data("nexttransid",f);var h=p[f];e.ie&&("boxfade"==h&&(h="boxslide"),"slotfade-vertical"==h&&(h="slotzoom-vertical"),"slotfade-horizontal"==h&&(h="slotzoom-horizontal")),_R.isIE(8)&&(h=11),c=_R.animateSlide(u,h,i,e,a,n,o,r,c),"on"==o.data("kenburns")&&(_R.startKenBurn(o,e),c.add(punchgs.TweenLite.set(o,{autoAlpha:0}))),c.pause()}_R.scrollHandling&&(_R.scrollHandling(e,!0),c.eventCallback("onUpdate",function(){_R.scrollHandling(e,!0)})),"off"!=e.parallax.type&&e.parallax.firstgo==undefined&&_R.scrollHandling&&(e.parallax.firstgo=!0,e.lastscrolltop=-999,_R.scrollHandling(e,!0),setTimeout(function(){e.lastscrolltop=-999,_R.scrollHandling(e,!0)},210),setTimeout(function(){e.lastscrolltop=-999,_R.scrollHandling(e,!0)},420)),_R.animateTheCaptions?_R.animateTheCaptions(a,e,null,c):c!=undefined&&setTimeout(function(){c.resume()},30),punchgs.TweenLite.to(a,.001,{autoAlpha:1})},letItFree=function(e,t,i,n,a,r,o){"carousel"===t.sliderType||(t.removePrepare=0,punchgs.TweenLite.to(i.find(".defaultimg"),.001,{zIndex:20,autoAlpha:1,onComplete:function(){removeSlots(e,t,a,1)}}),a.index()!=r.index()&&punchgs.TweenLite.to(r,.2,{zIndex:18,autoAlpha:0,onComplete:function(){removeSlots(e,t,r,1)}})),e.find(".active-revslide").removeClass("active-revslide"),e.find(".processing-revslide").removeClass("processing-revslide").addClass("active-revslide"),t.act=a.index(),t.c.attr("data-slideactive",e.find(".active-revslide").data("index")),("scroll"==t.parallax.type||"scroll+mouse"==t.parallax.type||"mouse+scroll"==t.parallax.type)&&(t.lastscrolltop=-999,_R.scrollHandling(t)),o.clear(),n.data("kbtl")!=undefined&&(n.data("kbtl").reverse(),n.data("kbtl").timeScale(25)),"on"==i.data("kenburns")&&(i.data("kbtl")!=undefined?(i.data("kbtl").timeScale(1),i.data("kbtl").play()):_R.startKenBurn(i,t)),a.find(".rs-background-video-layer").each(function(e){if(_ISM)return!1;var i=jQuery(this);_R.resetVideo(i,t),punchgs.TweenLite.fromTo(i,1,{autoAlpha:0},{autoAlpha:1,ease:punchgs.Power3.easeInOut,delay:.2,onComplete:function(){_R.animcompleted&&_R.animcompleted(i,t)}})}),r.find(".rs-background-video-layer").each(function(e){if(_ISM)return!1;var i=jQuery(this);_R.stopVideo&&(_R.resetVideo(i,t),_R.stopVideo(i,t)),punchgs.TweenLite.to(i,1,{autoAlpha:0,ease:punchgs.Power3.easeInOut,delay:.2})});var s={};s.slideIndex=a.index()+1,s.slideLIIndex=a.index(),s.slide=a,s.currentslide=a,s.prevslide=r,t.last_shown_slide=r.index(),e.trigger("revolution.slide.onchange",s),e.trigger("revolution.slide.onafterswap",s),t.duringslidechange=!1;var d=r.data("slide_on_focus_amount"),l=r.data("hideafterloop");0!=l&&d>=l&&t.c.revremoveslide(r.index())},removeAllListeners=function(e,t){e.children().each(function(){try{jQuery(this).die("click")}catch(e){}try{jQuery(this).die("mouseenter")}catch(e){}try{jQuery(this).die("mouseleave")}catch(e){}try{jQuery(this).unbind("hover")}catch(e){}});try{e.die("click","mouseenter","mouseleave")}catch(i){}clearInterval(t.cdint),e=null},countDown=function(e,t){t.cd=0,t.loop=0,t.stopAfterLoops!=undefined&&t.stopAfterLoops>-1?t.looptogo=t.stopAfterLoops:t.looptogo=9999999,t.stopAtSlide!=undefined&&t.stopAtSlide>-1?t.lastslidetoshow=t.stopAtSlide:t.lastslidetoshow=999,t.stopLoop="off",0==t.looptogo&&(t.stopLoop="on");var i=e.find(".tp-bannertimer");e.on("stoptimer",function(){var e=jQuery(this).find(".tp-bannertimer");e.data("tween").pause(),"on"==t.disableProgressBar&&e.css({visibility:"hidden"}),t.sliderstatus="paused",_R.unToggleState(t.slidertoggledby)}),e.on("starttimer",function(){t.forcepause_viatoggle||(1!=t.conthover&&1!=t.videoplaying&&t.width>t.hideSliderAtLimit&&1!=t.tonpause&&1!=t.overnav&&1!=t.ssop&&(1===t.noloopanymore||t.viewPort.enable&&!t.inviewport||(i.css({visibility:"visible"}),i.data("tween").resume(),t.sliderstatus="playing")),"on"==t.disableProgressBar&&i.css({visibility:"hidden"}),_R.toggleState(t.slidertoggledby))}),e.on("restarttimer",function(){if(!t.forcepause_viatoggle){var e=jQuery(this).find(".tp-bannertimer");if(t.mouseoncontainer&&"on"==t.navigation.onHoverStop&&!_ISM)return!1;1===t.noloopanymore||t.viewPort.enable&&!t.inviewport||1==t.ssop||(e.css({visibility:"visible"}),e.data("tween").kill(),e.data("tween",punchgs.TweenLite.fromTo(e,t.delay/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:n,delay:1})),t.sliderstatus="playing"),"on"==t.disableProgressBar&&e.css({visibility:"hidden"}),_R.toggleState(t.slidertoggledby)}}),e.on("nulltimer",function(){i.data("tween").kill(),i.data("tween",punchgs.TweenLite.fromTo(i,t.delay/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:n,delay:1})),i.data("tween").pause(0),"on"==t.disableProgressBar&&i.css({visibility:"hidden"}),t.sliderstatus="paused"});var n=function(){0==jQuery("body").find(e).length&&(removeAllListeners(e,t),clearInterval(t.cdint)),e.trigger("revolution.slide.slideatend"),1==e.data("conthover-changed")&&(t.conthover=e.data("conthover"),e.data("conthover-changed",0)),_R.callingNewSlide(t,e,1)};i.data("tween",punchgs.TweenLite.fromTo(i,t.delay/1e3,{width:"0%"},{force3D:"auto",width:"100%",ease:punchgs.Linear.easeNone,onComplete:n,delay:1})),i.data("opt",t),t.slideamount>1&&(0!=t.stopAfterLoops||1!=t.stopAtSlide)?e.trigger("starttimer"):(t.noloopanymore=1,e.trigger("nulltimer")),e.on("tp-mouseenter",function(){t.mouseoncontainer=!0,"on"!=t.navigation.onHoverStop||_ISM||(e.trigger("stoptimer"),e.trigger("revolution.slide.onpause"))}),e.on("tp-mouseleft",function(){t.mouseoncontainer=!1,1!=e.data("conthover")&&"on"==t.navigation.onHoverStop&&(1==t.viewPort.enable&&t.inviewport||0==t.viewPort.enable)&&(e.trigger("revolution.slide.onresume"),e.trigger("starttimer"))})},vis=function(){var e,t,i={hidden:"visibilitychange",webkitHidden:"webkitvisibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange"};for(e in i)if(e in document){t=i[e];break}return function(i){return i&&document.addEventListener(t,i),!document[e]}}(),restartOnFocus=function(e){return e==undefined||e.c==undefined?!1:void(1!=e.windowfocused&&(e.windowfocused=!0,punchgs.TweenLite.delayedCall(.3,function(){"on"==e.fallbacks.nextSlideOnWindowFocus&&e.c.revnext(),e.c.revredraw(),"playing"==e.lastsliderstatus&&e.c.revresume()})))},lastStatBlur=function(e){e.windowfocused=!1,e.lastsliderstatus=e.sliderstatus,e.c.revpause();var t=e.c.find(".active-revslide .slotholder"),i=e.c.find(".processing-revslide .slotholder");"on"==i.data("kenburns")&&_R.stopKenBurn(i,e),"on"==t.data("kenburns")&&_R.stopKenBurn(t,e)},tabBlurringCheck=function(e,t){var i=document.documentMode===undefined,n=window.chrome;i&&!n?jQuery(window).on("focusin",function(){restartOnFocus(t)}).on("focusout",function(){lastStatBlur(t)}):window.addEventListener?(window.addEventListener("focus",function(e){restartOnFocus(t)},!1),window.addEventListener("blur",function(e){lastStatBlur(t)},!1)):(window.attachEvent("focus",function(e){restartOnFocus(t)}),window.attachEvent("blur",function(e){lastStatBlur(t)}))},getUrlVars=function(e){for(var t,i=[],n=window.location.href.slice(window.location.href.indexOf(e)+1).split("_"),a=0;a<n.length;a++)n[a]=n[a].replace("%3D","="),t=n[a].split("="),i.push(t[0]),i[t[0]]=t[1];return i}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.actions.min.js
/********************************************
 * REVOLUTION 5.2 EXTENSION - ACTIONS
 * @version: 1.3.1 (03.03.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function($){var _R=jQuery.fn.revolution,_ISM=_R.is_mobile();jQuery.extend(!0,_R,{checkActions:function(e,t,o){checkActions_intern(e,t,o)}});var checkActions_intern=function(e,t,o){o&&jQuery.each(o,function(o,a){a.delay=parseInt(a.delay,0)/1e3,e.addClass("noSwipe"),t.fullscreen_esclistener||("exitfullscreen"==a.action||"togglefullscreen"==a.action)&&(jQuery(document).keyup(function(t){27==t.keyCode&&jQuery("#rs-go-fullscreen").length>0&&e.trigger(a.event)}),t.fullscreen_esclistener=!0);var l="backgroundvideo"==a.layer?jQuery(".rs-background-video-layer"):"firstvideo"==a.layer?jQuery(".tp-revslider-slidesli").find(".tp-videolayer"):jQuery("#"+a.layer);switch(a.action){case"togglevideo":jQuery.each(l,function(t,o){o=jQuery(o);var a=o.data("videotoggledby");void 0==a&&(a=new Array),a.push(e),o.data("videotoggledby",a)});break;case"togglelayer":jQuery.each(l,function(t,o){o=jQuery(o);var a=o.data("layertoggledby");void 0==a&&(a=new Array),a.push(e),o.data("layertoggledby",a)});break;case"toggle_mute_video":jQuery.each(l,function(t,o){o=jQuery(o);var a=o.data("videomutetoggledby");void 0==a&&(a=new Array),a.push(e),o.data("videomutetoggledby",a)});break;case"toggle_global_mute_video":jQuery.each(l,function(t,o){o=jQuery(o);var a=o.data("videomutetoggledby");void 0==a&&(a=new Array),a.push(e),o.data("videomutetoggledby",a)});break;case"toggleslider":void 0==t.slidertoggledby&&(t.slidertoggledby=new Array),t.slidertoggledby.push(e);break;case"togglefullscreen":void 0==t.fullscreentoggledby&&(t.fullscreentoggledby=new Array),t.fullscreentoggledby.push(e)}switch(e.on(a.event,function(){var o="backgroundvideo"==a.layer?jQuery(".active-revslide .slotholder .rs-background-video-layer"):"firstvideo"==a.layer?jQuery(".active-revslide .tp-videolayer").first():jQuery("#"+a.layer);if("stoplayer"==a.action||"togglelayer"==a.action||"startlayer"==a.action){if(o.length>0)if("startlayer"==a.action||"togglelayer"==a.action&&"in"!=o.data("animdirection")){o.data("animdirection","in");var l=o.data("timeline_out"),i="carousel"===t.sliderType?0:t.width/2-t.gridwidth[t.curWinRange]*t.bw/2,r=0;void 0!=l&&l.pause(0).kill(),_R.animateSingleCaption&&_R.animateSingleCaption(o,t,i,r,0,!1,!0);var n=o.data("timeline");o.data("triggerstate","on"),_R.toggleState(o.data("layertoggledby")),punchgs.TweenLite.delayedCall(a.delay,function(){n.play(0)},[n])}else("stoplayer"==a.action||"togglelayer"==a.action&&"out"!=o.data("animdirection"))&&(o.data("animdirection","out"),o.data("triggered",!0),o.data("triggerstate","off"),_R.stopVideo&&_R.stopVideo(o,t),_R.endMoveCaption&&punchgs.TweenLite.delayedCall(a.delay,_R.endMoveCaption,[o,null,null,t]),_R.unToggleState(o.data("layertoggledby")))}else!_ISM||"playvideo"!=a.action&&"stopvideo"!=a.action&&"togglevideo"!=a.action&&"mutevideo"!=a.action&&"unmutevideo"!=a.action&&"toggle_mute_video"!=a.action&&"toggle_global_mute_video"!=a.action?punchgs.TweenLite.delayedCall(a.delay,function(){actionSwitches(o,t,a,e)},[o,t,a,e]):actionSwitches(o,t,a,e)}),a.action){case"togglelayer":case"startlayer":case"playlayer":case"stoplayer":var l=jQuery("#"+a.layer);"bytrigger"!=l.data("start")&&(l.data("triggerstate","on"),l.data("animdirection","in"))}})},actionSwitches=function(tnc,opt,a,_nc){switch(a.action){case"scrollbelow":_nc.addClass("tp-scrollbelowslider"),_nc.data("scrolloffset",a.offset),_nc.data("scrolldelay",a.delay);var off=getOffContH(opt.fullScreenOffsetContainer)||0,aof=parseInt(a.offset,0)||0;off=off-aof||0,jQuery("body,html").animate({scrollTop:opt.c.offset().top+jQuery(opt.li[0]).height()-off+"px"},{duration:400});break;case"callback":eval(a.callback);break;case"jumptoslide":switch(a.slide.toLowerCase()){case"+1":case"next":opt.sc_indicator="arrow",_R.callingNewSlide(opt,opt.c,1);break;case"previous":case"prev":case"-1":opt.sc_indicator="arrow",_R.callingNewSlide(opt,opt.c,-1);break;default:var ts=jQuery.isNumeric(a.slide)?parseInt(a.slide,0):a.slide;_R.callingNewSlide(opt,opt.c,ts)}break;case"simplelink":window.open(a.url,a.target);break;case"toggleslider":opt.noloopanymore=0,"playing"==opt.sliderstatus?(opt.c.revpause(),opt.forcepause_viatoggle=!0,_R.unToggleState(opt.slidertoggledby)):(opt.forcepause_viatoggle=!1,opt.c.revresume(),_R.toggleState(opt.slidertoggledby));break;case"pauseslider":opt.c.revpause(),_R.unToggleState(opt.slidertoggledby);break;case"playslider":opt.noloopanymore=0,opt.c.revresume(),_R.toggleState(opt.slidertoggledby);break;case"playvideo":tnc.length>0&&_R.playVideo(tnc,opt);break;case"stopvideo":tnc.length>0&&_R.stopVideo&&_R.stopVideo(tnc,opt);break;case"togglevideo":tnc.length>0&&(_R.isVideoPlaying(tnc,opt)?_R.stopVideo&&_R.stopVideo(tnc,opt):_R.playVideo(tnc,opt));break;case"mutevideo":tnc.length>0&&_R.muteVideo(tnc,opt);break;case"unmutevideo":tnc.length>0&&_R.unMuteVideo&&_R.unMuteVideo(tnc,opt);break;case"toggle_mute_video":tnc.length>0&&(_R.isVideoMuted(tnc,opt)?_R.unMuteVideo(tnc,opt):_R.muteVideo&&_R.muteVideo(tnc,opt)),_nc.toggleClass("rs-toggle-content-active");break;case"toggle_global_mute_video":_nc.hasClass("rs-toggle-content-active")?(opt.globalmute=!1,void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(e,t){_R.unMuteVideo&&_R.unMuteVideo(t,opt)})):(opt.globalmute=!0,void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(e,t){_R.muteVideo&&_R.muteVideo(t,opt)})),_nc.toggleClass("rs-toggle-content-active");break;case"simulateclick":tnc.length>0&&tnc.click();break;case"toggleclass":tnc.length>0&&(tnc.hasClass(a.classname)?tnc.removeClass(a.classname):tnc.addClass(a.classname));break;case"gofullscreen":case"exitfullscreen":case"togglefullscreen":if(jQuery("#rs-go-fullscreen").length>0&&("togglefullscreen"==a.action||"exitfullscreen"==a.action)){jQuery("#rs-go-fullscreen").appendTo(jQuery("#rs-was-here"));var paw=opt.c.closest(".forcefullwidth_wrapper_tp_banner").length>0?opt.c.closest(".forcefullwidth_wrapper_tp_banner"):opt.c.closest(".rev_slider_wrapper");paw.unwrap(),paw.unwrap(),opt.minHeight=opt.oldminheight,opt.infullscreenmode=!1,opt.c.revredraw(),void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(e,t){_R.playVideo(t,opt)}),_R.unToggleState(opt.fullscreentoggledby)}else if(0==jQuery("#rs-go-fullscreen").length&&("togglefullscreen"==a.action||"gofullscreen"==a.action)){var paw=opt.c.closest(".forcefullwidth_wrapper_tp_banner").length>0?opt.c.closest(".forcefullwidth_wrapper_tp_banner"):opt.c.closest(".rev_slider_wrapper");paw.wrap('<div id="rs-was-here"><div id="rs-go-fullscreen"></div></div>');var gf=jQuery("#rs-go-fullscreen");gf.appendTo(jQuery("body")),gf.css({position:"fixed",width:"100%",height:"100%",top:"0px",left:"0px",zIndex:"9999999",background:"#ffffff"}),opt.oldminheight=opt.minHeight,opt.minHeight=jQuery(window).height(),opt.infullscreenmode=!0,opt.c.revredraw(),void 0!=opt.playingvideos&&opt.playingvideos.length>0&&jQuery.each(opt.playingvideos,function(e,t){_R.playVideo(t,opt)}),_R.toggleState(opt.fullscreentoggledby)}}},getOffContH=function(e){if(void 0==e)return 0;if(e.split(",").length>1){oc=e.split(",");var t=0;return oc&&jQuery.each(oc,function(e,o){jQuery(o).length>0&&(t+=jQuery(o).outerHeight(!0))}),t}return jQuery(e).height()}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.carousel.min.js
/********************************************
 * REVOLUTION 5.0 EXTENSION - CAROUSEL
 * @version: 1.0.2 (01.10.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(){var e=jQuery.fn.revolution;jQuery.extend(!0,e,{prepareCarousel:function(i,l,o){o=i.carousel.lastdirection=a(o,i.carousel.lastdirection),t(i),i.carousel.slide_offset_target=r(i),void 0==l?e.carouselToEvalPosition(i,o):s(i,o,!1)},carouselToEvalPosition:function(i,t){var l=i.carousel;t=l.lastdirection=a(t,l.lastdirection);var o="center"===l.horizontal_align?(l.wrapwidth/2-l.slide_width/2-l.slide_globaloffset)/l.slide_width:(0-l.slide_globaloffset)/l.slide_width,r=e.simp(o,i.slideamount,!1),n=r-Math.floor(r),d=0,f=-1*(Math.ceil(r)-r),h=-1*(Math.floor(r)-r);d=n>=.3&&"left"===t||n>=.7&&"right"===t?f:.3>n&&"left"===t||.7>n&&"right"===t?h:d,d="off"===l.infinity?0>r?r:o>i.slideamount-1?o-(i.slideamount-1):d:d,l.slide_offset_target=d*l.slide_width,0!==Math.abs(l.slide_offset_target)?s(i,t,!0):e.organiseCarousel(i,t)},organiseCarousel:function(e,i,t,a){i=void 0===i||"down"==i||"up"==i||null===i||jQuery.isEmptyObject(i)?"left":i;for(var s=e.carousel,l=new Array,o=s.slides.length,r="right"===s.horizontal_align?r=e.width:0,n=0;o>n;n++){var d=n*s.slide_width+s.slide_offset;"on"===s.infinity&&(d=d>s.wrapwidth-s.inneroffset&&"right"==i?s.slide_offset-(s.slides.length-n)*s.slide_width:d,d=d<0-s.inneroffset-s.slide_width&&"left"==i?d+s.maxwidth:d),l[n]=d}var f=999;s.slides&&jQuery.each(s.slides,function(a,r){var n=l[a];"on"===s.infinity&&(n=n>s.wrapwidth-s.inneroffset&&"left"===i?l[0]-(o-a)*s.slide_width:n,n=n<0-s.inneroffset-s.slide_width?"left"==i?n+s.maxwidth:"right"===i?l[o-1]+(a+1)*s.slide_width:n:n);var d=new Object;d.left=n+s.inneroffset;var h="center"===s.horizontal_align?(Math.abs(s.wrapwidth/2)-(d.left+s.slide_width/2))/s.slide_width:(s.inneroffset-d.left)/s.slide_width,w="center"===s.horizontal_align?2:1;if((t&&Math.abs(h)<f||0===h)&&(f=Math.abs(h),s.focused=a),d.width=s.slide_width,d.x=0,d.transformPerspective=1200,d.transformOrigin="50% "+s.vertical_align,"on"===s.fadeout)if("on"===s.vary_fade)d.autoAlpha=1-Math.abs(1/Math.ceil(s.maxVisibleItems/w)*h);else switch(s.horizontal_align){case"center":d.autoAlpha=Math.abs(h)<Math.ceil(s.maxVisibleItems/w-1)?1:1-(Math.abs(h)-Math.floor(Math.abs(h)));break;case"left":d.autoAlpha=1>h&&h>0?1-h:Math.abs(h)>s.maxVisibleItems-1?1-(Math.abs(h)-(s.maxVisibleItems-1)):1;break;case"right":d.autoAlpha=h>-1&&0>h?1-Math.abs(h):h>s.maxVisibleItems-1?1-(Math.abs(h)-(s.maxVisibleItems-1)):1}else d.autoAlpha=Math.abs(h)<Math.ceil(s.maxVisibleItems/w)?1:0;if(void 0!==s.minScale&&s.minScale>0)if("on"===s.vary_scale){d.scale=1-Math.abs(s.minScale/100/Math.ceil(s.maxVisibleItems/w)*h);var c=(s.slide_width-s.slide_width*d.scale)*Math.abs(h)}else{d.scale=h>=1||-1>=h?1-s.minScale/100:(100-s.minScale*Math.abs(h))/100;var c=(s.slide_width-s.slide_width*(1-s.minScale/100))*Math.abs(h)}void 0!==s.maxRotation&&0!=Math.abs(s.maxRotation)&&("on"===s.vary_rotation?(d.rotationY=Math.abs(s.maxRotation)-Math.abs((1-Math.abs(1/Math.ceil(s.maxVisibleItems/w)*h))*s.maxRotation),d.autoAlpha=Math.abs(d.rotationY)>90?0:d.autoAlpha):d.rotationY=h>=1||-1>=h?s.maxRotation:Math.abs(h)*s.maxRotation,d.rotationY=0>h?-1*d.rotationY:d.rotationY),d.x=-1*s.space*h,d.left=Math.floor(d.left),d.x=Math.floor(d.x),void 0!==d.scale?0>h?d.x-c:d.x+c:d.x,d.zIndex=Math.round(100-Math.abs(5*h)),d.transformStyle="3D"!=e.parallax.type&&"3d"!=e.parallax.type?"flat":"preserve-3d",punchgs.TweenLite.set(r,d)}),a&&(e.c.find(".next-revslide").removeClass("next-revslide"),jQuery(s.slides[s.focused]).addClass("next-revslide"),e.c.trigger("revolution.nextslide.waiting"));s.wrapwidth/2-s.slide_offset,s.maxwidth+s.slide_offset-s.wrapwidth/2}});var i=function(e){var i=e.carousel;i.infbackup=i.infinity,i.maxVisiblebackup=i.maxVisibleItems,i.slide_globaloffset="none",i.slide_offset=0,i.wrap=e.c.find(".tp-carousel-wrapper"),i.slides=e.c.find(".tp-revslider-slidesli"),0!==i.maxRotation&&("3D"!=e.parallax.type&&"3d"!=e.parallax.type?punchgs.TweenLite.set(i.wrap,{perspective:1200,transformStyle:"flat"}):punchgs.TweenLite.set(i.wrap,{perspective:1600,transformStyle:"preserve-3d"})),void 0!==i.border_radius&&parseInt(i.border_radius,0)>0&&punchgs.TweenLite.set(e.c.find(".tp-revslider-slidesli"),{borderRadius:i.border_radius})},t=function(t){void 0===t.bw&&e.setSize(t);var a=t.carousel,s=e.getHorizontalOffset(t.c,"left"),l=e.getHorizontalOffset(t.c,"right");void 0===a.wrap&&i(t),a.slide_width="on"!==a.stretch?t.gridwidth[t.curWinRange]*t.bw:t.c.width(),a.maxwidth=t.slideamount*a.slide_width,a.maxVisiblebackup>a.slides.length+1&&(a.maxVisibleItems=a.slides.length+2),a.wrapwidth=a.maxVisibleItems*a.slide_width+(a.maxVisibleItems-1)*a.space,a.wrapwidth="auto"!=t.sliderLayout?a.wrapwidth>t.c.closest(".tp-simpleresponsive").width()?t.c.closest(".tp-simpleresponsive").width():a.wrapwidth:a.wrapwidth>t.ul.width()?t.ul.width():a.wrapwidth,a.infinity=a.wrapwidth>=a.maxwidth?"off":a.infbackup,a.wrapoffset="center"===a.horizontal_align?(t.c.width()-l-s-a.wrapwidth)/2:0,a.wrapoffset="auto"!=t.sliderLayout&&t.outernav?0:a.wrapoffset<s?s:a.wrapoffset;var o="hidden";("3D"==t.parallax.type||"3d"==t.parallax.type)&&(o="visible"),"right"===a.horizontal_align?punchgs.TweenLite.set(a.wrap,{left:"auto",right:a.wrapoffset+"px",width:a.wrapwidth,overflow:o}):punchgs.TweenLite.set(a.wrap,{right:"auto",left:a.wrapoffset+"px",width:a.wrapwidth,overflow:o}),a.inneroffset="right"===a.horizontal_align?a.wrapwidth-a.slide_width:0,a.realoffset=Math.abs(a.wrap.position().left),a.windhalf=jQuery(window).width()/2},a=function(e,i){return null===e||jQuery.isEmptyObject(e)?i:void 0===e?"right":e},s=function(i,t,s){var l=i.carousel;t=l.lastdirection=a(t,l.lastdirection);var o=new Object;o.from=0,o.to=l.slide_offset_target,void 0!==l.positionanim&&l.positionanim.pause(),l.positionanim=punchgs.TweenLite.to(o,1.2,{from:o.to,onUpdate:function(){l.slide_offset=l.slide_globaloffset+o.from,l.slide_offset=e.simp(l.slide_offset,l.maxwidth),e.organiseCarousel(i,t,!1,!1)},onComplete:function(){l.slide_globaloffset="off"===l.infinity?l.slide_globaloffset+l.slide_offset_target:e.simp(l.slide_globaloffset+l.slide_offset_target,l.maxwidth),l.slide_offset=e.simp(l.slide_offset,l.maxwidth),e.organiseCarousel(i,t,!1,!0);var a=jQuery(i.li[l.focused]);i.c.find(".next-revslide").removeClass("next-revslide"),s&&e.callingNewSlide(i,i.c,a.data("index"))},ease:punchgs.Expo.easeOut})},l=function(e,i){return Math.abs(e)>Math.abs(i)?e>0?e-Math.abs(Math.floor(e/i)*i):e+Math.abs(Math.floor(e/i)*i):e},o=function(e,i,t){var t,t,a=i-e,s=i-t-e;return a=l(a,t),s=l(s,t),Math.abs(a)>Math.abs(s)?s:a},r=function(i){var t=0,a=i.carousel;if(void 0!==a.positionanim&&a.positionanim.kill(),"none"==a.slide_globaloffset)a.slide_globaloffset=t="center"===a.horizontal_align?a.wrapwidth/2-a.slide_width/2:0;else{a.slide_globaloffset=a.slide_offset,a.slide_offset=0;var s=i.c.find(".processing-revslide").index(),l="center"===a.horizontal_align?(a.wrapwidth/2-a.slide_width/2-a.slide_globaloffset)/a.slide_width:(0-a.slide_globaloffset)/a.slide_width;l=e.simp(l,i.slideamount,!1),s=s>=0?s:i.c.find(".active-revslide").index(),s=s>=0?s:0,t="off"===a.infinity?l-s:-o(l,s,i.slideamount),t*=a.slide_width}return t}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.kenburn.min.js
/********************************************
 * REVOLUTION 5.0 EXTENSION - KEN BURN
 * @version: 1.0.0 (03.08.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(){var t=jQuery.fn.revolution;jQuery.extend(!0,t,{stopKenBurn:function(t){void 0!=t.data("kbtl")&&t.data("kbtl").pause()},startKenBurn:function(t,e,a){var r=t.data(),n=t.find(".defaultimg"),s=n.data("lazyload")||n.data("src"),i=(r.owidth/r.oheight,"carousel"===e.sliderType?e.carousel.slide_width:e.ul.width()),o=e.ul.height();t.data("kbtl")&&t.data("kbtl").kill(),a=a||0,0==t.find(".tp-kbimg").length&&(t.append('<div class="tp-kbimg-wrap" style="z-index:2;width:100%;height:100%;top:0px;left:0px;position:absolute;"><img class="tp-kbimg" src="'+s+'" style="position:absolute;" width="'+r.owidth+'" height="'+r.oheight+'"></div>'),t.data("kenburn",t.find(".tp-kbimg")));var d=function(t,e,a,r,n,s,i){var o=t*a,d=e*a,l=Math.abs(r-o),h=Math.abs(n-d),p=new Object;return p.l=(0-s)*l,p.r=p.l+o,p.t=(0-i)*h,p.b=p.t+d,p.h=s,p.v=i,p},l=function(t,e,a,r,n){var s=t.bgposition.split(" ")||"center center",i="center"==s[0]?"50%":"left"==s[0]||"left"==s[1]?"0%":"right"==s[0]||"right"==s[1]?"100%":s[0],o="center"==s[1]?"50%":"top"==s[0]||"top"==s[1]?"0%":"bottom"==s[0]||"bottom"==s[1]?"100%":s[1];i=parseInt(i,0)/100||0,o=parseInt(o,0)/100||0;var l=new Object;return l.start=d(n.start.width,n.start.height,n.start.scale,e,a,i,o),l.end=d(n.start.width,n.start.height,n.end.scale,e,a,i,o),l},h=function(t,e,a){var r=a.scalestart/100,n=a.scaleend/100,s=void 0!=a.oofsetstart?a.offsetstart.split(" ")||[0,0]:[0,0],i=void 0!=a.offsetend?a.offsetend.split(" ")||[0,0]:[0,0];a.bgposition="center center"==a.bgposition?"50% 50%":a.bgposition;{var o=new Object,d=t*r,h=(d/a.owidth*a.oheight,t*n);h/a.owidth*a.oheight}if(o.start=new Object,o.starto=new Object,o.end=new Object,o.endo=new Object,o.start.width=t,o.start.height=o.start.width/a.owidth*a.oheight,o.start.height<e){var p=e/o.start.height;o.start.height=e,o.start.width=o.start.width*p}o.start.transformOrigin=a.bgposition,o.start.scale=r,o.end.scale=n,o.start.rotation=a.rotatestart+"deg",o.end.rotation=a.rotateend+"deg";var g=l(a,t,e,s,o);s[0]=parseFloat(s[0])+g.start.l,i[0]=parseFloat(i[0])+g.end.l,s[1]=parseFloat(s[1])+g.start.t,i[1]=parseFloat(i[1])+g.end.t;var c=g.start.r-g.start.l,b=g.start.b-g.start.t,u=g.end.r-g.end.l,f=g.end.b-g.end.t;return s[0]=s[0]>0?0:c+s[0]<t?t-c:s[0],i[0]=i[0]>0?0:u+i[0]<t?t-u:i[0],s[1]=s[1]>0?0:b+s[1]<e?e-b:s[1],i[1]=i[1]>0?0:f+i[1]<e?e-f:i[1],o.starto.x=s[0]+"px",o.starto.y=s[1]+"px",o.endo.x=i[0]+"px",o.endo.y=i[1]+"px",o.end.ease=o.endo.ease=a.ease,o.end.force3D=o.endo.force3D=!0,o};void 0!=t.data("kbtl")&&(t.data("kbtl").kill(),t.removeData("kbtl"));var p=t.data("kenburn"),g=p.parent(),c=h(i,o,r),b=new punchgs.TimelineLite;b.pause(),c.start.transformOrigin="0% 0%",c.starto.transformOrigin="0% 0%",b.add(punchgs.TweenLite.fromTo(p,r.duration/1e3,c.start,c.end),0),b.add(punchgs.TweenLite.fromTo(g,r.duration/1e3,c.starto,c.endo),0),b.progress(a),b.play(),t.data("kbtl",b)}})}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.layeranimation.min.js
/************************************************
 * REVOLUTION 5.2 EXTENSION - LAYER ANIMATION
 * @version: 2.2.1 (23.03.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/

!function(a){function e(a,e,t,i,n,o,r){var d=a.find(e);d.css("borderWidth",o+"px"),d.css(t,0-o+"px"),d.css(i,"0px solid transparent"),d.css(n,r)}var t=jQuery.fn.revolution;t.is_mobile();jQuery.extend(!0,t,{animcompleted:function(a,e){var i=a.data("videotype"),n=a.data("autoplay"),o=a.data("autoplayonlyfirsttime");void 0!=i&&"none"!=i&&(1==n||"true"==n||"on"==n||"1sttime"==n||o?(t.playVideo(a,e),t.toggleState(a.data("videotoggledby")),(o||"1sttime"==n)&&(a.data("autoplayonlyfirsttime",!1),a.data("autoplay","off"))):("no1sttime"==n&&a.data("autoplay","on"),t.unToggleState(a.data("videotoggledby"))))},handleStaticLayers:function(a,e){var t=parseInt(a.data("startslide"),0),i=parseInt(a.data("endslide"),0);0>t&&(t=0),0>i&&(i=e.slideamount),0===t&&i===e.slideamount-1&&(i=e.slideamount+1),a.data("startslide",t),a.data("endslide",i)},animateTheCaptions:function(a,e,i,n){var o="carousel"===e.sliderType?0:e.width/2-e.gridwidth[e.curWinRange]*e.bw/2,r=0,d=a.data("index");e.layers=e.layers||new Object,e.layers[d]=e.layers[d]||a.find(".tp-caption"),e.layers["static"]=e.layers["static"]||e.c.find(".tp-static-layers").find(".tp-caption");var s=new Array;if(e.conh=e.c.height(),e.conw=e.c.width(),e.ulw=e.ul.width(),e.ulh=e.ul.height(),e.debugMode){a.addClass("indebugmode"),a.find(".helpgrid").remove(),e.c.find(".hglayerinfo").remove(),a.append('<div class="helpgrid" style="width:'+e.gridwidth[e.curWinRange]*e.bw+"px;height:"+e.gridheight[e.curWinRange]*e.bw+'px;"></div>');var l=a.find(".helpgrid");l.append('<div class="hginfo">Zoom:'+Math.round(100*e.bw)+"% &nbsp;&nbsp;&nbsp; Device Level:"+e.curWinRange+"&nbsp;&nbsp;&nbsp; Grid Preset:"+e.gridwidth[e.curWinRange]+"x"+e.gridheight[e.curWinRange]+"</div>"),e.c.append('<div class="hglayerinfo"></div>'),l.append('<div class="tlhg"></div>')}s&&jQuery.each(s,function(a){var e=jQuery(this);punchgs.TweenLite.set(e.find(".tp-videoposter"),{autoAlpha:1}),punchgs.TweenLite.set(e.find("iframe"),{autoAlpha:0})}),e.layers[d]&&jQuery.each(e.layers[d],function(a,e){s.push(e)}),e.layers["static"]&&jQuery.each(e.layers["static"],function(a,e){s.push(e)}),s&&jQuery.each(s,function(a){t.animateSingleCaption(jQuery(this),e,o,r,a,i)});var p=jQuery("body").find("#"+e.c.attr("id")).find(".tp-bannertimer");p.data("opt",e),void 0!=n&&setTimeout(function(){n.resume()},30)},animateSingleCaption:function(a,r,s,f,b,x,T){var L=x,W=g(a,r,"in",!0),j=a.data("_pw")||a.closest(".tp-parallax-wrap"),C=a.data("_lw")||a.closest(".tp-loop-wrap"),R=a.data("_mw")||a.closest(".tp-mask-wrap"),k=a.data("responsive")||"on",I=a.data("responsive_offset")||"on",_=a.data("basealign")||"grid",Q="grid"===_?r.width:r.ulw,S="grid"===_?r.height:r.ulh,z=jQuery("body").hasClass("rtl");if(a.data("_pw")||(a.data("staticlayer")?a.data("_li",a.closest(".tp-static-layers")):a.data("_li",a.closest(".tp-revslider-slidesli")),a.data("slidelink",a.hasClass("slidelink")),a.data("_pw",j),a.data("_lw",C),a.data("_mw",R)),"fullscreen"==r.sliderLayout&&(f=S/2-r.gridheight[r.curWinRange]*r.bh/2),("on"==r.autoHeight||void 0!=r.minHeight&&r.minHeight>0)&&(f=r.conh/2-r.gridheight[r.curWinRange]*r.bh/2),0>f&&(f=0),r.debugMode){a.closest("li").find(".helpgrid").css({top:f+"px",left:s+"px"});var M=r.c.find(".hglayerinfo");a.on("hover, mouseenter",function(){var e="";a.data()&&jQuery.each(a.data(),function(a,t){"object"!=typeof t&&(e=e+'<span style="white-space:nowrap"><span style="color:#27ae60">'+a+":</span>"+t+"</span>&nbsp; &nbsp; ")}),M.html(e)})}var O=c(a.data("visibility"),r)[r.forcedWinRange]||c(a.data("visibility"),r)||"on";if("off"==O||Q<r.hideCaptionAtLimit&&"on"==a.data("captionhidden")||Q<r.hideAllCaptionAtLimit?a.addClass("tp-hidden-caption"):a.removeClass("tp-hidden-caption"),a.data("layertype","html"),0>s&&(s=0),void 0!=a.data("thumbimage")&&void 0==a.data("videoposter")&&a.data("videoposter",a.data("thumbimage")),a.find("img").length>0){var H=a.find("img");a.data("layertype","image"),0==H.width()&&H.css({width:"auto"}),0==H.height()&&H.css({height:"auto"}),void 0==H.data("ww")&&H.width()>0&&H.data("ww",H.width()),void 0==H.data("hh")&&H.height()>0&&H.data("hh",H.height());var B=H.data("ww"),A=H.data("hh"),D="slide"==_?r.ulw:r.gridwidth[r.curWinRange],F="slide"==_?r.ulh:r.gridheight[r.curWinRange],B=c(H.data("ww"),r)[r.curWinRange]||c(H.data("ww"),r)||"auto",A=c(H.data("hh"),r)[r.curWinRange]||c(H.data("hh"),r)||"auto",P="full"===B||"full-proportional"===B,X="full"===A||"full-proportional"===A;if("full-proportional"===B){var Y=H.data("owidth"),V=H.data("oheight");V/F>Y/D?(B=D,A=V*(D/Y)):(A=F,B=Y*(F/V))}else B=P?D:parseFloat(B),A=X?F:parseFloat(A);void 0==B&&(B=0),void 0==A&&(A=0),"off"!==k?("grid"!=_&&P?H.width(B):H.width(B*r.bw),"grid"!=_&&X?H.height(A):H.height(A*r.bh)):(H.width(B),H.height(A))}"slide"===_&&(s=0,f=0);var N="html5"==a.data("audio")?"audio":"video";if(a.hasClass("tp-videolayer")||a.hasClass("tp-audiolayer")||a.find("iframe").length>0||a.find(N).length>0){if(a.data("layertype","video"),t.manageVideoLayer&&t.manageVideoLayer(a,r,x,L),!x&&!L){a.data("videotype");t.resetVideo&&t.resetVideo(a,r)}var $=a.data("aspectratio");void 0!=$&&$.split(":").length>1&&t.prepareCoveredVideo($,r,a);var H=a.find("iframe")?a.find("iframe"):H=a.find(N),Z=a.find("iframe")?!1:!0,G=a.hasClass("coverscreenvideo");H.css({display:"block"}),void 0==a.data("videowidth")&&(a.data("videowidth",H.width()),a.data("videoheight",H.height()));var U,B=c(a.data("videowidth"),r)[r.curWinRange]||c(a.data("videowidth"),r)||"auto",A=c(a.data("videoheight"),r)[r.curWinRange]||c(a.data("videoheight"),r)||"auto";B=parseFloat(B),A=parseFloat(A),void 0===a.data("cssobj")&&(U=v(a,0),a.data("cssobj",U));var q=u(a.data("cssobj"),r);if("auto"==q.lineHeight&&(q.lineHeight=q.fontSize+4),a.hasClass("fullscreenvideo")||G){s=0,f=0,a.data("x",0),a.data("y",0);var E=S;"on"==r.autoHeight&&(E=r.conh),a.css({width:Q,height:E})}else punchgs.TweenLite.set(a,{paddingTop:Math.round(q.paddingTop*r.bh)+"px",paddingBottom:Math.round(q.paddingBottom*r.bh)+"px",paddingLeft:Math.round(q.paddingLeft*r.bw)+"px",paddingRight:Math.round(q.paddingRight*r.bw)+"px",marginTop:q.marginTop*r.bh+"px",marginBottom:q.marginBottom*r.bh+"px",marginLeft:q.marginLeft*r.bw+"px",marginRight:q.marginRight*r.bw+"px",borderTopWidth:Math.round(q.borderTopWidth*r.bh)+"px",borderBottomWidth:Math.round(q.borderBottomWidth*r.bh)+"px",borderLeftWidth:Math.round(q.borderLeftWidth*r.bw)+"px",borderRightWidth:Math.round(q.borderRightWidth*r.bw)+"px",width:B*r.bw+"px",height:A*r.bh+"px"});(0==Z&&!G||1!=a.data("forcecover")&&!a.hasClass("fullscreenvideo")&&!G)&&(H.width(B*r.bw),H.height(A*r.bh))}var J=a.data("slidelink")||!1;a.find(".tp-resizeme, .tp-resizeme *").each(function(){w(jQuery(this),r,"rekursive",k)}),a.hasClass("tp-resizeme")&&a.find("*").each(function(){w(jQuery(this),r,"rekursive",k)}),w(a,r,0,k);var K=a.outerHeight(),aa=a.css("backgroundColor");e(a,".frontcorner","left","borderRight","borderTopColor",K,aa),e(a,".frontcornertop","left","borderRight","borderBottomColor",K,aa),e(a,".backcorner","right","borderLeft","borderBottomColor",K,aa),e(a,".backcornertop","right","borderLeft","borderTopColor",K,aa),"on"==r.fullScreenAlignForce&&(s=0,f=0);var ea=a.data("arrobj");if(void 0===ea){var ea=new Object;ea.voa=c(a.data("voffset"),r)[r.curWinRange]||c(a.data("voffset"),r)[0],ea.hoa=c(a.data("hoffset"),r)[r.curWinRange]||c(a.data("hoffset"),r)[0],ea.elx=c(a.data("x"),r)[r.curWinRange]||c(a.data("x"),r)[0],ea.ely=c(a.data("y"),r)[r.curWinRange]||c(a.data("y"),r)[0]}var ta=0==ea.voa.length?0:ea.voa,ia=0==ea.hoa.length?0:ea.hoa,na=0==ea.elx.length?0:ea.elx,oa=0==ea.ely.length?0:ea.ely,ra=a.outerWidth(!0),da=a.outerHeight(!0);0==ra&&0==da&&(ra=r.ulw,da=r.ulh);var sa="off"!==I?parseInt(ta,0)*r.bw:parseInt(ta,0),la="off"!==I?parseInt(ia,0)*r.bw:parseInt(ia,0),pa="grid"===_?r.gridwidth[r.curWinRange]*r.bw:Q,ha="grid"===_?r.gridheight[r.curWinRange]*r.bw:S;"on"==r.fullScreenAlignForce&&(pa=r.ulw,ha=r.ulh),na="center"===na||"middle"===na?pa/2-ra/2+la:"left"===na?la:"right"===na?pa-ra-la:"off"!==I?na*r.bw:na,oa="center"==oa||"middle"==oa?ha/2-da/2+sa:"top"==oa?sa:"bottom"==oa?ha-da-sa:"off"!==I?oa*r.bw:oa,z&&!J&&(na+=ra),J&&(na=0);var ca=a.data("lasttriggerstate"),ga=a.data("triggerstate"),ma=void 0!=a.data("start")?a.data("start"):100,va=a.data("end"),ua=T?0:"bytrigger"===ma||"sliderenter"===ma?0:parseFloat(ma)/1e3,fa=na+s,wa=oa+f,ya=a.css("z-Index");T||("reset"==ca&&"bytrigger"!=ma?(a.data("triggerstate","on"),a.data("animdirection","in"),ga="on"):"reset"==ca&&"bytrigger"==ma&&(a.data("triggerstate","off"),a.data("animdirection","out"),ga="off")),punchgs.TweenLite.set(j,{zIndex:ya,top:wa,left:fa,overwrite:"auto"}),0==W&&(L=!0),void 0==a.data("timeline")||L||(2!=W&&a.data("timeline").gotoAndPlay(0),L=!0),!x&&a.data("timeline_out")&&2!=W&&0!=W&&(a.data("timeline_out").kill(),a.data("outstarted",0)),T&&void 0!=a.data("timeline")&&(a.removeData("$anims"),a.data("timeline").pause(0),a.data("timeline").kill(),void 0!=a.data("newhoveranim")&&(a.data("newhoveranim").progress(0),a.data("newhoveranim").kill()),a.removeData("timeline"),punchgs.TweenLite.killTweensOf(a),a.unbind("hover"),a.removeClass("rs-hover-ready"),a.removeData("newhoveranim"));var ba=a.data("timeline")?a.data("timeline").time():0,xa=void 0!==a.data("timeline")?a.data("timeline").progress():0,Ta=a.data("timeline")||new punchgs.TimelineLite({smoothChildTiming:!0});xa=jQuery.isNumeric(xa)?xa:0,Ta.pause();var La={};if(La.svg=void 0!=a.data("svg_src")?a.find("svg"):!1,1>xa&&1!=a.data("outstarted")||2==W||T){var Wa=a;if(void 0!=a.data("mySplitText")&&a.data("mySplitText").revert(),void 0!=a.data("splitin")&&a.data("splitin").match(/chars|words|lines/g)||void 0!=a.data("splitout")&&a.data("splitout").match(/chars|words|lines/g)){var ja=a.find("a").length>0?a.find("a"):a;a.data("mySplitText",new punchgs.SplitText(ja,{type:"lines,words,chars",charsClass:"tp-splitted tp-charsplit",wordsClass:"tp-splitted tp-wordsplit",linesClass:"tp-splitted tp-linesplit"})),a.addClass("splitted")}void 0!==a.data("mySplitText")&&a.data("splitin")&&a.data("splitin").match(/chars|words|lines/g)&&(Wa=a.data("mySplitText")[a.data("splitin")]);var Ca=new Object;La.svg&&(La.idle=o(a.data("svg_idle"),n()),punchgs.TweenLite.set(La.svg,La.idle.anim));var Ra=void 0!=a.data("transform_in")?a.data("transform_in").match(/\(R\)/gi):!1;if(!a.data("$anims")||T||Ra){var ka=i(),Ia=i(),_a=d(),Qa=void 0!==a.data("transform_hover")||void 0!==a.data("style_hover");Ia=p(Ia,a.data("transform_idle")),ka=p(Ia,a.data("transform_in"),1==r.sdir),Qa&&(_a=p(_a,a.data("transform_hover")),_a=m(_a,a.data("style_hover")),La.svg&&($svghover=o(a.data("svg_hover"),n()),void 0!=_a.anim.color&&($svghover.anim.fill=_a.anim.color),a.data("hoversvg",$svghover)),a.data("hover",_a)),ka.elemdelay=void 0==a.data("elementdelay")?0:a.data("elementdelay"),Ia.anim.ease=ka.anim.ease=ka.anim.ease||punchgs.Power1.easeInOut,Qa&&!a.hasClass("rs-hover-ready")&&(a.addClass("rs-hover-ready"),a.hover(function(a){var e=jQuery(a.currentTarget),t=e.data("hover"),i=e.data("timeline");i&&1==i.progress()&&(void 0===e.data("newhoveranim")||"none"===e.data("newhoveranim")?(e.data("newhoveranim",punchgs.TweenLite.to(e,t.speed,t.anim)),La.svg&&e.data("newsvghoveranim",punchgs.TweenLite.to(La.svg,t.speed,e.data("hoversvg").anim))):(e.data("newhoveranim").progress(0),e.data("newhoveranim").play(),La.svg&&e.data("newsvghoveranim").progress(0).play()))},function(a){var e=jQuery(a.currentTarget),t=e.data("timeline");t&&1==t.progress()&&void 0!=e.data("newhoveranim")&&(e.data("newhoveranim").reverse(),La.svg&&e.data("newsvghoveranim").reverse())})),Ca=new Object,Ca.f=ka,Ca.r=Ia,a.data("$anims")}else Ca=a.data("$anims");var Sa=h(a.data("mask_in")),za=new punchgs.TimelineLite;if(Ca.f.anim.x=Ca.f.anim.x*r.bw||l(Ca.f.anim.x,r,ra,da,wa,fa,"horizontal"),Ca.f.anim.y=Ca.f.anim.y*r.bw||l(Ca.f.anim.y,r,ra,da,wa,fa,"vertical"),2!=W||T){if(Wa!=a){var Ma=Ca.r.anim.ease;Ta.add(punchgs.TweenLite.set(a,Ca.r.anim)),Ca.r=i(),Ca.r.anim.ease=Ma}if(Ca.f.anim.visibility="hidden",a.data("eow",ra),a.data("eoh",da),a.data("speed",Ca.f.speed),a.data("ease",Ca.r.anim.ease),za.eventCallback("onStart",function(){punchgs.TweenLite.set(a,{visibility:"visible"}),a.data("iframes")&&a.find("iframe").each(function(){punchgs.TweenLite.set(jQuery(this),{autoAlpha:1})}),punchgs.TweenLite.set(j,{visibility:"visible"});var e={};e.layer=a,e.eventtype="enterstage",e.layertype=a.data("layertype"),a.data("active",!0),e.layersettings=a.data(),r.c.trigger("revolution.layeraction",[e])}),za.eventCallback("onComplete",function(){var e={};e.layer=a,e.eventtype="enteredstage",e.layertype=a.data("layertype"),e.layersettings=a.data(),r.c.trigger("revolution.layeraction",[e]),t.animcompleted(a,r)}),"sliderenter"==ma&&r.overcontainer&&(ua=.6),Ta.add(za.staggerFromTo(Wa,Ca.f.speed,Ca.f.anim,Ca.r.anim,Ca.f.elemdelay),ua),Sa){var Oa=new Object;Oa.ease=Ca.r.anim.ease,Oa.overflow=Sa.anim.overflow="hidden",Oa.overwrite="all",Oa.x=Oa.y=0,Sa.anim.x=Sa.anim.x*r.bw||l(Sa.anim.x,r,ra,da,wa,fa,"horizontal"),Sa.anim.y=Sa.anim.y*r.bw||l(Sa.anim.y,r,ra,da,wa,fa,"vertical"),Ta.add(punchgs.TweenLite.fromTo(R,Ca.f.speed,Sa.anim,Oa,ka.elemdelay),ua)}else Ta.add(punchgs.TweenLite.set(R,{overflow:"visible"},ka.elemdelay),0)}if(a.data("timeline",Ta),r.sliderscrope=void 0===r.sliderscrope?Math.round(99999*Math.random()):r.sliderscrope,W=g(a,r,"in"),void 0===r.endtimeouts&&(r.endtimeouts=[]),(0===xa||2==W)&&"bytrigger"!==va&&!T&&"sliderleave"!=va){if(void 0!=va&&(-1==W||2==W)&&"bytriger"!==va)var Ha=setTimeout(function(){t.endMoveCaption(a,R,j,r)},parseInt(a.data("end"),0));r.endtimeouts.push(Ha)}Ta=a.data("timeline"),"on"==a.data("loopanimation")&&y(C,r.bw),("sliderenter"!=ma||"sliderenter"==ma&&r.overcontainer)&&(-1==W||1==W||T||0==W&&1>xa&&a.hasClass("rev-static-visbile"))&&(1>xa&&xa>0||0==xa&&"bytrigger"!=ma&&"keep"!=ca||0==xa&&"bytrigger"!=ma&&"keep"==ca&&"on"==ga||"bytrigger"==ma&&"keep"==ca&&"on"==ga)&&(Ta.resume(ba),t.toggleState(a.data("layertoggledby")))}"on"==a.data("loopanimation")&&punchgs.TweenLite.set(C,{minWidth:ra,minHeight:da}),0==a.data("slidelink")||1!=a.data("slidelink")&&!a.hasClass("slidelink")?(punchgs.TweenLite.set(R,{width:"auto",height:"auto"}),a.data("slidelink",0)):(punchgs.TweenLite.set(R,{width:"100%",height:"100%"}),a.data("slidelink",1))},endMoveCaption:function(a,e,n,o){if(e=void 0!=e?e:a.data("_mw"),n=void 0!=n?n:a.data("_pw"),a.data("outstarted",1),a.data("timeline"))a.data("timeline").pause();else if(void 0===a.data("_pw"))return;var d=new punchgs.TimelineLite,s=new punchgs.TimelineLite,c=new punchgs.TimelineLite,g=p(i(),a.data("transform_in"),1==o.sdir),m=a.data("transform_out")?p(r(),a.data("transform_out"),1==o.sdir):p(r(),a.data("transform_in"),1==o.sdir),v=a.data("splitout")&&a.data("splitout").match(/words|chars|lines/g)?a.data("mySplitText")[a.data("splitout")]:a,u=void 0==a.data("endelementdelay")?0:a.data("endelementdelay"),f=a.innerWidth(),w=a.innerHeight(),y=n.position();a.data("transform_out")&&a.data("transform_out").match(/auto:auto/g)&&(g.speed=m.speed,g.anim.ease=m.anim.ease,m=g);var b=h(a.data("mask_out"));m.anim.x=m.anim.x*o.bw||l(m.anim.x,o,f,w,y.top,y.left,"horizontal"),m.anim.y=m.anim.y*o.bw||l(m.anim.y,o,f,w,y.top,y.left,"vertical"),s.eventCallback("onStart",function(){var e={};e.layer=a,e.eventtype="leavestage",e.layertype=a.data("layertype"),e.layersettings=a.data(),a.data("active",!1),o.c.trigger("revolution.layeraction",[e])}),s.eventCallback("onComplete",function(){punchgs.TweenLite.set(a,{visibility:"hidden"}),punchgs.TweenLite.set(n,{visibility:"hidden"});var e={};e.layer=a,e.eventtype="leftstage",a.data("active",!1),e.layertype=a.data("layertype"),e.layersettings=a.data(),o.c.trigger("revolution.layeraction",[e]),t.stopVideo&&t.stopVideo(a,o)}),d.add(s.staggerTo(v,m.speed,m.anim,u),0),b?(b.anim.ease=m.anim.ease,b.anim.overflow="hidden",b.anim.x=b.anim.x*o.bw||l(b.anim.x,o,f,w,y.top,y.left,"horizontal"),b.anim.y=b.anim.y*o.bw||l(b.anim.y,o,f,w,y.top,y.left,"vertical"),d.add(c.to(e,m.speed,b.anim,u),0)):d.add(c.set(e,{overflow:"visible",overwrite:"auto"},u),0),a.data("timeline_out",d)},removeTheCaptions:function(a,e){var i=a.data("index"),n=new Array;e.layers[i]&&jQuery.each(e.layers[i],function(a,e){n.push(e)}),e.layers["static"]&&jQuery.each(e.layers["static"],function(a,e){n.push(e)}),e.endtimeouts&&e.endtimeouts.length>0&&jQuery.each(e.endtimeouts,function(a,e){clearTimeout(e)}),e.endtimeouts=new Array,n&&jQuery.each(n,function(a){var i=jQuery(this),n=g(i,e,"out");0!=n&&(b(i),clearTimeout(i.data("videoplaywait")),t.stopVideo&&t.stopVideo(i,e),t.endMoveCaption(i,null,null,e),t.removeMediaFromList&&t.removeMediaFromList(i,e),e.lastplayedvideos=[])})}});var i=function(){var a=new Object;return a.anim=new Object,a.anim.x=0,a.anim.y=0,a.anim.z=0,a.anim.rotationX=0,a.anim.rotationY=0,a.anim.rotationZ=0,a.anim.scaleX=1,a.anim.scaleY=1,a.anim.skewX=0,a.anim.skewY=0,a.anim.opacity=1,a.anim.transformOrigin="50% 50%",a.anim.transformPerspective=600,a.anim.rotation=0,a.anim.ease=punchgs.Power3.easeOut,a.anim.force3D="auto",a.speed=.3,a.anim.autoAlpha=1,a.anim.visibility="visible",a.anim.overwrite="all",a},n=function(){var a=new Object;return a.anim=new Object,a.anim.stroke="none",a.anim.strokeWidth=0,a.anim.strokeDasharray="none",a.anim.strokeDashoffset="0",a},o=function(a,e){var t=a.split(";");return t&&jQuery.each(t,function(a,t){var i=t.split(":"),n=i[0],o=i[1];"sc"==n&&(e.anim.stroke=o),"sw"==n&&(e.anim.strokeWidth=o),"sda"==n&&(e.anim.strokeDasharray=o),"sdo"==n&&(e.anim.strokeDashoffset=o)}),e},r=function(){var a=new Object;return a.anim=new Object,a.anim.x=0,a.anim.y=0,a.anim.z=0,a},d=function(){var a=new Object;return a.anim=new Object,a.speed=.2,a},s=function(a,e){if(jQuery.isNumeric(parseFloat(a)))return parseFloat(a);if(void 0===a||"inherit"===a)return e;if(a.split("{").length>1){var t=a.split(","),i=parseFloat(t[1].split("}")[0]);t=parseFloat(t[0].split("{")[1]),a=Math.random()*(i-t)+t}return a},l=function(a,e,t,i,n,o,r){return!jQuery.isNumeric(a)&&a.match(/%]/g)?(a=a.split("[")[1].split("]")[0],"horizontal"==r?a=(t+2)*parseInt(a,0)/100:"vertical"==r&&(a=(i+2)*parseInt(a,0)/100)):(a="layer_left"===a?0-t:"layer_right"===a?t:a,a="layer_top"===a?0-i:"layer_bottom"===a?i:a,a="left"===a||"stage_left"===a?0-t-o:"right"===a||"stage_right"===a?e.conw-o:"center"===a||"stage_center"===a?e.conw/2-t/2-o:a,a="top"===a||"stage_top"===a?0-i-n:"bottom"===a||"stage_bottom"===a?e.conh-n:"middle"===a||"stage_middle"===a?e.conh/2-i/2-n:a),a},p=function(a,e,t){var i=new Object;if(i=jQuery.extend(!0,{},i,a),void 0===e)return i;var n=e.split(";");return n&&jQuery.each(n,function(a,e){var n=e.split(":"),o=n[0],r=n[1];t&&void 0!=r&&r.length>0&&r.match(/\(R\)/)&&(r=r.replace("(R)",""),r="right"===r?"left":"left"===r?"right":"top"===r?"bottom":"bottom"===r?"top":r,"["===r[0]&&"-"===r[1]?r=r.replace("[-","["):"["===r[0]&&"-"!==r[1]?r=r.replace("[","[-"):"-"===r[0]?r=r.replace("-",""):r[0].match(/[1-9]/)&&(r="-"+r)),void 0!=r&&(r=r.replace(/\(R\)/,""),("rotationX"==o||"rX"==o)&&(i.anim.rotationX=s(r,i.anim.rotationX)+"deg"),("rotationY"==o||"rY"==o)&&(i.anim.rotationY=s(r,i.anim.rotationY)+"deg"),("rotationZ"==o||"rZ"==o)&&(i.anim.rotation=s(r,i.anim.rotationZ)+"deg"),("scaleX"==o||"sX"==o)&&(i.anim.scaleX=s(r,i.anim.scaleX)),("scaleY"==o||"sY"==o)&&(i.anim.scaleY=s(r,i.anim.scaleY)),("opacity"==o||"o"==o)&&(i.anim.opacity=s(r,i.anim.opacity)),i.anim.opacity=0==i.anim.opacity?1e-4:i.anim.opacity,("skewX"==o||"skX"==o)&&(i.anim.skewX=s(r,i.anim.skewX)),("skewY"==o||"skY"==o)&&(i.anim.skewY=s(r,i.anim.skewY)),"x"==o&&(i.anim.x=s(r,i.anim.x)),"y"==o&&(i.anim.y=s(r,i.anim.y)),"z"==o&&(i.anim.z=s(r,i.anim.z)),("transformOrigin"==o||"tO"==o)&&(i.anim.transformOrigin=r.toString()),("transformPerspective"==o||"tP"==o)&&(i.anim.transformPerspective=parseInt(r,0)),("speed"==o||"s"==o)&&(i.speed=parseFloat(r)/1e3),("ease"==o||"e"==o)&&(i.anim.ease=r))}),i},h=function(a){if(void 0===a)return!1;var e=new Object;e.anim=new Object;var t=a.split(";");return t&&jQuery.each(t,function(a,t){t=t.split(":");var i=t[0],n=t[1];"x"==i&&(e.anim.x=n),"y"==i&&(e.anim.y=n),"s"==i&&(e.speed=parseFloat(n)/1e3),("e"==i||"ease"==i)&&(e.anim.ease=n)}),e},c=function(a,e,t){if(void 0==a&&(a=0),!jQuery.isArray(a)&&"string"===jQuery.type(a)&&(a.split(",").length>1||a.split("[").length>1)){a=a.replace("[",""),a=a.replace("]","");var i=a.match(/'/g)?a.split("',"):a.split(",");a=new Array,i&&jQuery.each(i,function(e,t){t=t.replace("'",""),t=t.replace("'",""),a.push(t)})}else{var n=a;jQuery.isArray(a)||(a=new Array,a.push(n))}var n=a[a.length-1];if(a.length<e.rle)for(var o=1;o<=e.curWinRange;o++)a.push(n);return a},g=function(a,e,t,i){var n=-1;if(a.hasClass("tp-static-layer")){a.data("staticlayer",!0);var o=parseInt(a.data("startslide"),0),r=parseInt(a.data("endslide"),0),d=e.c.find(".processing-revslide").index(),s=-1!=d?d:e.c.find(".active-revslide").index();s=-1==s?0:s,"in"===t?a.hasClass("rev-static-visbile")?n=r==s||o>s||s>r?2:0:s>=o&&r>=s||o==s||r==s?(i||(a.addClass("rev-static-visbile"),a.removeClass("rev-static-hidden")),n=1):n=0:a.hasClass("rev-static-visbile")?o>s||s>r?(n=2,i||(a.removeClass("rev-static-visbile"),a.addClass("rev-static-hidden"))):n=0:n=2}return n},m=function(a,e){if(void 0===e)return a;e=e.replace("c:","color:"),e=e.replace("bg:","background-color:"),e=e.replace("bw:","border-width:"),e=e.replace("bc:","border-color:"),e=e.replace("br:","borderRadius:"),e=e.replace("bs:","border-style:"),e=e.replace("td:","text-decoration:");var t=e.split(";");return t&&jQuery.each(t,function(e,t){var i=t.split(":");i[0].length>0&&(a.anim[i[0]]=i[1])}),a},v=function(a,e){var t,i=new Object,n=!1;if("rekursive"==e&&(t=a.closest(".tp-caption"),t&&a.css("fontSize")===t.css("fontSize")&&(n=!0)),i.basealign=a.data("basealign")||"grid",i.fontSize=n?void 0===t.data("fontsize")?parseInt(t.css("fontSize"),0)||0:t.data("fontsize"):void 0===a.data("fontsize")?parseInt(a.css("fontSize"),0)||0:a.data("fontsize"),i.fontWeight=n?void 0===t.data("fontweight")?parseInt(t.css("fontWeight"),0)||0:t.data("fontweight"):void 0===a.data("fontweight")?parseInt(a.css("fontWeight"),0)||0:a.data("fontweight"),i.whiteSpace=n?void 0===t.data("whitespace")?t.css("whitespace")||"normal":t.data("whitespace"):void 0===a.data("whitespace")?a.css("whitespace")||"normal":a.data("whitespace"),-1!==jQuery.inArray(a.data("layertype"),["video","image","audio"])||a.is("img")?i.lineHeight=0:i.lineHeight=n?void 0===t.data("lineheight")?parseInt(t.css("lineHeight"),0)||0:t.data("lineheight"):void 0===a.data("lineheight")?parseInt(a.css("lineHeight"),0)||0:a.data("lineheight"),i.letterSpacing=n?void 0===t.data("letterspacing")?parseFloat(t.css("letterSpacing"),0)||0:t.data("letterspacing"):void 0===a.data("letterspacing")?parseFloat(a.css("letterSpacing"))||0:a.data("letterspacing"),i.paddingTop=void 0===a.data("paddingtop")?parseInt(a.css("paddingTop"),0)||0:a.data("paddingtop"),i.paddingBottom=void 0===a.data("paddingbottom")?parseInt(a.css("paddingBottom"),0)||0:a.data("paddingbottom"),i.paddingLeft=void 0===a.data("paddingleft")?parseInt(a.css("paddingLeft"),0)||0:a.data("paddingleft"),i.paddingRight=void 0===a.data("paddingright")?parseInt(a.css("paddingRight"),0)||0:a.data("paddingright"),i.marginTop=void 0===a.data("margintop")?parseInt(a.css("marginTop"),0)||0:a.data("margintop"),i.marginBottom=void 0===a.data("marginbottom")?parseInt(a.css("marginBottom"),0)||0:a.data("marginbottom"),i.marginLeft=void 0===a.data("marginleft")?parseInt(a.css("marginLeft"),0)||0:a.data("marginleft"),i.marginRight=void 0===a.data("marginright")?parseInt(a.css("marginRight"),0)||0:a.data("marginright"),i.borderTopWidth=void 0===a.data("bordertopwidth")?parseInt(a.css("borderTopWidth"),0)||0:a.data("bordertopwidth"),i.borderBottomWidth=void 0===a.data("borderbottomwidth")?parseInt(a.css("borderBottomWidth"),0)||0:a.data("borderbottomwidth"),i.borderLeftWidth=void 0===a.data("borderleftwidth")?parseInt(a.css("borderLeftWidth"),0)||0:a.data("borderleftwidth"),i.borderRightWidth=void 0===a.data("borderrightwidth")?parseInt(a.css("borderRightWidth"),0)||0:a.data("borderrightwidth"),"rekursive"!=e){if(i.color=void 0===a.data("color")?"nopredefinedcolor":a.data("color"),i.whiteSpace=n?void 0===t.data("whitespace")?t.css("whiteSpace")||"nowrap":t.data("whitespace"):void 0===a.data("whitespace")?a.css("whiteSpace")||"nowrap":a.data("whitespace"),i.minWidth=void 0===a.data("width")?parseInt(a.css("minWidth"),0)||0:a.data("width"),i.minHeight=void 0===a.data("height")?parseInt(a.css("minHeight"),0)||0:a.data("height"),void 0!=a.data("videowidth")&&void 0!=a.data("videoheight")){var o=a.data("videowidth"),r=a.data("videoheight");o="100%"===o?"none":o,r="100%"===r?"none":r,a.data("width",o),a.data("height",r)}i.maxWidth=void 0===a.data("width")?parseInt(a.css("maxWidth"),0)||"none":a.data("width"),i.maxHeight=void 0===a.data("height")?parseInt(a.css("maxHeight"),0)||"none":a.data("height"),i.wan=void 0===a.data("wan")?parseInt(a.css("-webkit-transition"),0)||"none":a.data("wan"),i.moan=void 0===a.data("moan")?parseInt(a.css("-moz-animation-transition"),0)||"none":a.data("moan"),i.man=void 0===a.data("man")?parseInt(a.css("-ms-animation-transition"),0)||"none":a.data("man"),i.ani=void 0===a.data("ani")?parseInt(a.css("transition"),0)||"none":a.data("ani")}return i.styleProps=a.css(["background-color","border-top-color","border-bottom-color","border-right-color","border-left-color","border-top-style","border-bottom-style","border-left-style","border-right-style","border-left-width","border-right-width","border-bottom-width","border-top-width","color","text-decoration","font-style","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]),i},u=function(a,e){var t=new Object;return a&&jQuery.each(a,function(i,n){t[i]=c(n,e)[e.curWinRange]||a[i]}),t},f=function(a,e,t,i){return a=jQuery.isNumeric(a)?a*e+"px":a,a="full"===a?i:"auto"===a||"none"===a?t:a},w=function(a,e,t,i){var n;try{if("BR"==a[0].nodeName||"br"==a[0].tagName)return!1}catch(o){}void 0===a.data("cssobj")?(n=v(a,t),a.data("cssobj",n)):n=a.data("cssobj");var r=u(n,e),d=e.bw,s=e.bh;if("off"===i&&(d=1,s=1),"auto"==r.lineHeight&&(r.lineHeight=r.fontSize+4),!a.hasClass("tp-splitted")){a.css("-webkit-transition","none"),a.css("-moz-transition","none"),a.css("-ms-transition","none"),a.css("transition","none");var l=void 0!==a.data("transform_hover")||void 0!==a.data("style_hover");if(l&&punchgs.TweenLite.set(a,r.styleProps),punchgs.TweenLite.set(a,{fontSize:Math.round(r.fontSize*d)+"px",fontWeight:r.fontWeight,letterSpacing:Math.floor(r.letterSpacing*d)+"px",paddingTop:Math.round(r.paddingTop*s)+"px",paddingBottom:Math.round(r.paddingBottom*s)+"px",paddingLeft:Math.round(r.paddingLeft*d)+"px",paddingRight:Math.round(r.paddingRight*d)+"px",marginTop:r.marginTop*s+"px",marginBottom:r.marginBottom*s+"px",marginLeft:r.marginLeft*d+"px",marginRight:r.marginRight*d+"px",borderTopWidth:Math.round(r.borderTopWidth*s)+"px",borderBottomWidth:Math.round(r.borderBottomWidth*s)+"px",borderLeftWidth:Math.round(r.borderLeftWidth*d)+"px",borderRightWidth:Math.round(r.borderRightWidth*d)+"px",lineHeight:Math.round(r.lineHeight*s)+"px",overwrite:"auto"}),"rekursive"!=t){var p="slide"==r.basealign?e.ulw:e.gridwidth[e.curWinRange],h="slide"==r.basealign?e.ulh:e.gridheight[e.curWinRange],c=f(r.maxWidth,d,"none",p),g=f(r.maxHeight,s,"none",h),m=f(r.minWidth,d,"0px",p),w=f(r.minHeight,s,"0px",h);punchgs.TweenLite.set(a,{maxWidth:c,maxHeight:g,minWidth:m,minHeight:w,whiteSpace:r.whiteSpace,overwrite:"auto"}),"nopredefinedcolor"!=r.color&&punchgs.TweenLite.set(a,{color:r.color,overwrite:"auto"}),void 0!=a.data("svg_src")&&("nopredefinedcolor"!=r.color?punchgs.TweenLite.set(a.find("svg"),{fill:r.color,overwrite:"auto"}):punchgs.TweenLite.set(a.find("svg"),{fill:r.styleProps.color,overwrite:"auto"}))}setTimeout(function(){a.css("-webkit-transition",a.data("wan")),a.css("-moz-transition",a.data("moan")),a.css("-ms-transition",a.data("man")),a.css("transition",a.data("ani"))},30)}},y=function(a,e){if(a.hasClass("rs-pendulum")&&void 0==a.data("loop-timeline")){a.data("loop-timeline",new punchgs.TimelineLite);var t=void 0==a.data("startdeg")?-20:a.data("startdeg"),i=void 0==a.data("enddeg")?20:a.data("enddeg"),n=void 0==a.data("speed")?2:a.data("speed"),o=void 0==a.data("origin")?"50% 50%":a.data("origin"),r=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("ease");t*=e,i*=e,a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",rotation:t,transformOrigin:o},{rotation:i,ease:r})),a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",rotation:i,transformOrigin:o},{rotation:t,ease:r,onComplete:function(){a.data("loop-timeline").restart()}}))}if(a.hasClass("rs-rotate")&&void 0==a.data("loop-timeline")){a.data("loop-timeline",new punchgs.TimelineLite);var t=void 0==a.data("startdeg")?0:a.data("startdeg"),i=void 0==a.data("enddeg")?360:a.data("enddeg");n=void 0==a.data("speed")?2:a.data("speed"),o=void 0==a.data("origin")?"50% 50%":a.data("origin"),r=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing"),t*=e,i*=e,a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",rotation:t,transformOrigin:o},{rotation:i,ease:r,onComplete:function(){a.data("loop-timeline").restart()}}))}if(a.hasClass("rs-slideloop")&&void 0==a.data("loop-timeline")){a.data("loop-timeline",new punchgs.TimelineLite);var d=void 0==a.data("xs")?0:a.data("xs"),s=void 0==a.data("ys")?0:a.data("ys"),l=void 0==a.data("xe")?0:a.data("xe"),p=void 0==a.data("ye")?0:a.data("ye"),n=void 0==a.data("speed")?2:a.data("speed"),r=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");d*=e,s*=e,l*=e,p*=e,a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",x:d,y:s},{x:l,y:p,ease:r})),a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",x:l,y:p},{x:d,y:s,onComplete:function(){a.data("loop-timeline").restart()}}))}if(a.hasClass("rs-pulse")&&void 0==a.data("loop-timeline")){a.data("loop-timeline",new punchgs.TimelineLite);var h=void 0==a.data("zoomstart")?0:a.data("zoomstart"),c=void 0==a.data("zoomend")?0:a.data("zoomend"),n=void 0==a.data("speed")?2:a.data("speed"),r=void 0==a.data("easing")?punchgs.Power2.easeInOut:a.data("easing");a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",scale:h},{scale:c,ease:r})),a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(a,n,{force3D:"auto",scale:c},{scale:h,onComplete:function(){a.data("loop-timeline").restart()}}))}if(a.hasClass("rs-wave")&&void 0==a.data("loop-timeline")){a.data("loop-timeline",new punchgs.TimelineLite);var g=void 0==a.data("angle")?10:parseInt(a.data("angle"),0),m=void 0==a.data("radius")?10:parseInt(a.data("radius"),0),n=void 0==a.data("speed")?-20:a.data("speed"),o=void 0==a.data("origin")?"50% 50%":a.data("origin"),v=o.split(" "),u=new Object;v.length>=1?(u.x=v[0],u.y=v[1]):(u.x="50%",u.y="50%"),g*=e,m*=e;var f=0-a.height()/2+m*(-1+parseInt(u.y,0)/100),w=a.width()*(-.5+parseInt(u.x,0)/100),y={a:0,ang:g,element:a,unit:m,xoffset:w,yoffset:f};a.data("loop-timeline").append(new punchgs.TweenLite.fromTo(y,n,{a:360},{a:0,force3D:"auto",ease:punchgs.Linear.easeNone,onUpdate:function(){var a=y.a*(Math.PI/180);punchgs.TweenLite.to(y.element,.1,{force3D:"auto",x:y.xoffset+Math.cos(a)*y.unit,y:y.yoffset+y.unit*(1-Math.sin(a))})},onComplete:function(){a.data("loop-timeline").restart()}}))}},b=function(a){a.find(".rs-pendulum, .rs-slideloop, .rs-pulse, .rs-wave").each(function(){var a=jQuery(this);void 0!=a.data("loop-timeline")&&(a.data("loop-timeline").pause(),a.data("loop-timeline",null))})}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.migration.min.js
/*****************************************************************************************************
 * jquery.themepunch.revmigrate.js - jQuery Plugin for Revolution Slider Migration from 4.x to 5.0   
 * @version: 1.0.2 (20.01.2016)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
*****************************************************************************************************/
!function(t){var a=jQuery.fn.revolution;jQuery.extend(!0,a,{migration:function(t,a){return a=o(a),e(t,a),a}});var o=function(t){if(t.parallaxLevels||t.parallaxBgFreeze){var a=new Object;a.type=t.parallax,a.levels=t.parallaxLevels,a.bgparallax="on"==t.parallaxBgFreeze?"off":"on",a.disable_onmobile=t.parallaxDisableOnMobile,t.parallax=a}if(void 0===t.disableProgressBar&&(t.disableProgressBar=t.hideTimerBar||"off"),(t.startwidth||t.startheight)&&(t.gridwidth=t.startwidth,t.gridheight=t.startheight),void 0===t.sliderType&&(t.sliderType="standard"),"on"===t.fullScreen&&(t.sliderLayout="fullscreen"),"on"===t.fullWidth&&(t.sliderLayout="fullwidth"),void 0===t.sliderLayout&&(t.sliderLayout="auto"),void 0===t.navigation){var o=new Object;if("solo"==t.navigationArrows||"nextto"==t.navigationArrows){var e=new Object;e.enable=!0,e.style=t.navigationStyle||"",e.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,e.hide_onleave=t.hideThumbs>0?!0:!1,e.hide_delay=t.hideThumbs>0?t.hideThumbs:200,e.hide_delay_mobile=t.hideNavDelayOnMobile||1500,e.hide_under=0,e.tmp="",e.left={h_align:t.soloArrowLeftHalign,v_align:t.soloArrowLeftValign,h_offset:t.soloArrowLeftHOffset,v_offset:t.soloArrowLeftVOffset},e.right={h_align:t.soloArrowRightHalign,v_align:t.soloArrowRightValign,h_offset:t.soloArrowRightHOffset,v_offset:t.soloArrowRightVOffset},o.arrows=e}if("bullet"==t.navigationType){var r=new Object;r.style=t.navigationStyle||"",r.enable=!0,r.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,r.hide_onleave=t.hideThumbs>0?!0:!1,r.hide_delay=t.hideThumbs>0?t.hideThumbs:200,r.hide_delay_mobile=t.hideNavDelayOnMobile||1500,r.hide_under=0,r.direction="horizontal",r.h_align=t.navigationHAlign||"center",r.v_align=t.navigationVAlign||"bottom",r.space=5,r.h_offset=t.navigationHOffset||0,r.v_offset=t.navigationVOffset||20,r.tmp='<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',o.bullets=r}if("thumb"==t.navigationType){var i=new Object;i.style=t.navigationStyle||"",i.enable=!0,i.width=t.thumbWidth||100,i.height=t.thumbHeight||50,i.min_width=t.thumbWidth||100,i.wrapper_padding=2,i.wrapper_color="#f5f5f5",i.wrapper_opacity=1,i.visibleAmount=t.thumbAmount||3,i.hide_onmobile="on"===t.hideArrowsOnMobile?!0:!1,i.hide_onleave=t.hideThumbs>0?!0:!1,i.hide_delay=t.hideThumbs>0?t.hideThumbs:200,i.hide_delay_mobile=t.hideNavDelayOnMobile||1500,i.hide_under=0,i.direction="horizontal",i.span=!1,i.position="inner",i.space=2,i.h_align=t.navigationHAlign||"center",i.v_align=t.navigationVAlign||"bottom",i.h_offset=t.navigationHOffset||0,i.v_offset=t.navigationVOffset||20,i.tmp='<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',o.thumbnails=i}t.navigation=o,t.navigation.keyboardNavigation=t.keyboardNavigation||"on",t.navigation.onHoverStop=t.onHoverStop||"on",t.navigation.touch={touchenabled:t.touchenabled||"on",swipe_treshold:t.swipe_treshold||75,swipe_min_touches:t.swipe_min_touches||1,drag_block_vertical:t.drag_block_vertical||!1}}return void 0==t.fallbacks&&(t.fallbacks={isJoomla:t.isJoomla||!1,panZoomDisableOnMobile:t.parallaxDisableOnMobile||"off",simplifyAll:t.simplifyAll||"on",nextSlideOnWindowFocus:t.nextSlideOnWindowFocus||"off",disableFocusListener:t.disableFocusListener||!0}),t},e=function(t,a){var o=new Object,e=t.width(),r=t.height();o.skewfromleftshort="x:-50;skX:85;o:0",o.skewfromrightshort="x:50;skX:-85;o:0",o.sfl="x:-50;o:0",o.sfr="x:50;o:0",o.sft="y:-50;o:0",o.sfb="y:50;o:0",o.skewfromleft="x:top;skX:85;o:0",o.skewfromright="x:bottom;skX:-85;o:0",o.lfl="x:top;o:0",o.lfr="x:bottom;o:0",o.lft="y:left;o:0",o.lfb="y:right;o:0",o.fade="o:0";720*Math.random()-360;t.find(".tp-caption").each(function(){var t=jQuery(this),a=(Math.random()*(2*e)-e,Math.random()*(2*r)-r,3*Math.random(),720*Math.random()-360,70*Math.random()-35,70*Math.random()-35,t.attr("class"));o.randomrotate="x:{-400,400};y:{-400,400};sX:{0,2};sY:{0,2};rZ:{-180,180};rX:{-180,180};rY:{-180,180};o:0;",a.match("randomrotate")?t.data("transform_in",o.randomrotate):a.match(/\blfl\b/)?t.data("transform_in",o.lfl):a.match(/\blfr\b/)?t.data("transform_in",o.lfr):a.match(/\blft\b/)?t.data("transform_in",o.lft):a.match(/\blfb\b/)?t.data("transform_in",o.lfb):a.match(/\bsfl\b/)?t.data("transform_in",o.sfl):a.match(/\bsfr\b/)?t.data("transform_in",o.sfr):a.match(/\bsft\b/)?t.data("transform_in",o.sft):a.match(/\bsfb\b/)?t.data("transform_in",o.sfb):a.match(/\bskewfromleftshort\b/)?t.data("transform_in",o.skewfromleftshort):a.match(/\bskewfromrightshort\b/)?t.data("transform_in",o.skewfromrightshort):a.match(/\bskewfromleft\b/)?t.data("transform_in",o.skewfromleft):a.match(/\bskewfromright\b/)?t.data("transform_in",o.skewfromright):a.match(/\bfade\b/)&&t.data("transform_in",o.fade),a.match(/\brandomrotateout\b/)?t.data("transform_out",o.randomrotate):a.match(/\bltl\b/)?t.data("transform_out",o.lfl):a.match(/\bltr\b/)?t.data("transform_out",o.lfr):a.match(/\bltt\b/)?t.data("transform_out",o.lft):a.match(/\bltb\b/)?t.data("transform_out",o.lfb):a.match(/\bstl\b/)?t.data("transform_out",o.sfl):a.match(/\bstr\b/)?t.data("transform_out",o.sfr):a.match(/\bstt\b/)?t.data("transform_out",o.sft):a.match(/\bstb\b/)?t.data("transform_out",o.sfb):a.match(/\bskewtoleftshortout\b/)?t.data("transform_out",o.skewfromleftshort):a.match(/\bskewtorightshortout\b/)?t.data("transform_out",o.skewfromrightshort):a.match(/\bskewtoleftout\b/)?t.data("transform_out",o.skewfromleft):a.match(/\bskewtorightout\b/)?t.data("transform_out",o.skewfromright):a.match(/\bfadeout\b/)&&t.data("transform_out",o.fade),void 0!=t.data("customin")&&t.data("transform_in",t.data("customin")),void 0!=t.data("customout")&&t.data("transform_out",t.data("customout"))})}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.navigation.min.js
/********************************************
 * REVOLUTION 5.2 EXTENSION - NAVIGATION
 * @version: 1.2.4 (10.03.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(t){var e=jQuery.fn.revolution,i=e.is_mobile();jQuery.extend(!0,e,{hideUnHideNav:function(t){var e=t.c.width(),i=t.navigation.arrows,a=t.navigation.bullets,n=t.navigation.thumbnails,r=t.navigation.tabs;p(i)&&T(t.c.find(".tparrows"),i.hide_under,e,i.hide_over),p(a)&&T(t.c.find(".tp-bullets"),a.hide_under,e,a.hide_over),p(n)&&T(t.c.parent().find(".tp-thumbs"),n.hide_under,e,n.hide_over),p(r)&&T(t.c.parent().find(".tp-tabs"),r.hide_under,e,r.hide_over),y(t)},resizeThumbsTabs:function(t,e){if(t.navigation&&t.navigation.tabs.enable||t.navigation&&t.navigation.thumbnails.enable){var i=(jQuery(window).width()-480)/500,a=new punchgs.TimelineLite,r=t.navigation.tabs,s=t.navigation.thumbnails,o=t.navigation.bullets;if(a.pause(),i=i>1?1:0>i?0:i,p(r)&&(e||r.width>r.min_width)&&n(i,a,t.c,r,t.slideamount,"tab"),p(s)&&(e||s.width>s.min_width)&&n(i,a,t.c,s,t.slideamount,"thumb"),p(o)&&e){var d=t.c.find(".tp-bullets");d.find(".tp-bullet").each(function(t){var e=jQuery(this),i=t+1,a=e.outerWidth()+parseInt(void 0===o.space?0:o.space,0),n=e.outerHeight()+parseInt(void 0===o.space?0:o.space,0);"vertical"===o.direction?(e.css({top:(i-1)*n+"px",left:"0px"}),d.css({height:(i-1)*n+e.outerHeight(),width:e.outerWidth()})):(e.css({left:(i-1)*a+"px",top:"0px"}),d.css({width:(i-1)*a+e.outerWidth(),height:e.outerHeight()}))})}a.play(),y(t)}return!0},updateNavIndexes:function(t){function i(t){a.find(t).lenght>0&&a.find(t).each(function(t){jQuery(this).data("liindex",t)})}var a=t.c;i(".tp-tab"),i(".tp-bullet"),i(".tp-thumb"),e.resizeThumbsTabs(t,!0),e.manageNavigation(t)},manageNavigation:function(t){var i=e.getHorizontalOffset(t.c.parent(),"left"),n=e.getHorizontalOffset(t.c.parent(),"right");p(t.navigation.bullets)&&("fullscreen"!=t.sliderLayout&&"fullwidth"!=t.sliderLayout&&(t.navigation.bullets.h_offset_old=void 0===t.navigation.bullets.h_offset_old?t.navigation.bullets.h_offset:t.navigation.bullets.h_offset_old,t.navigation.bullets.h_offset="center"===t.navigation.bullets.h_align?t.navigation.bullets.h_offset_old+i/2-n/2:t.navigation.bullets.h_offset_old+i-n),b(t.c.find(".tp-bullets"),t.navigation.bullets,t)),p(t.navigation.thumbnails)&&b(t.c.parent().find(".tp-thumbs"),t.navigation.thumbnails,t),p(t.navigation.tabs)&&b(t.c.parent().find(".tp-tabs"),t.navigation.tabs,t),p(t.navigation.arrows)&&("fullscreen"!=t.sliderLayout&&"fullwidth"!=t.sliderLayout&&(t.navigation.arrows.left.h_offset_old=void 0===t.navigation.arrows.left.h_offset_old?t.navigation.arrows.left.h_offset:t.navigation.arrows.left.h_offset_old,t.navigation.arrows.left.h_offset="right"===t.navigation.arrows.left.h_align?t.navigation.arrows.left.h_offset_old+n:t.navigation.arrows.left.h_offset_old+i,t.navigation.arrows.right.h_offset_old=void 0===t.navigation.arrows.right.h_offset_old?t.navigation.arrows.right.h_offset:t.navigation.arrows.right.h_offset_old,t.navigation.arrows.right.h_offset="right"===t.navigation.arrows.right.h_align?t.navigation.arrows.right.h_offset_old+n:t.navigation.arrows.right.h_offset_old+i),b(t.c.find(".tp-leftarrow.tparrows"),t.navigation.arrows.left,t),b(t.c.find(".tp-rightarrow.tparrows"),t.navigation.arrows.right,t)),p(t.navigation.thumbnails)&&a(t.c.parent().find(".tp-thumbs"),t.navigation.thumbnails),p(t.navigation.tabs)&&a(t.c.parent().find(".tp-tabs"),t.navigation.tabs)},createNavigation:function(t,e){var n=t.parent(),r=e.navigation.arrows,d=e.navigation.bullets,u=e.navigation.thumbnails,f=e.navigation.tabs,m=p(r),b=p(d),_=p(u),y=p(f);s(t,e),o(t,e),m&&v(t,r,e),e.li.each(function(i){var a=jQuery(e.li[e.li.length-1-i]),n=jQuery(this);b&&(e.navigation.bullets.rtl?w(t,d,a,e):w(t,d,n,e)),_&&(e.navigation.thumbnails.rtl?x(t,u,a,"tp-thumb",e):x(t,u,n,"tp-thumb",e)),y&&(e.navigation.tabs.rtl?x(t,f,a,"tp-tab",e):x(t,f,n,"tp-tab",e))}),t.bind("revolution.slide.onafterswap revolution.nextslide.waiting",function(){var i=0==t.find(".next-revslide").length?t.find(".active-revslide").data("index"):t.find(".next-revslide").data("index");t.find(".tp-bullet").each(function(){var t=jQuery(this);t.data("liref")===i?t.addClass("selected"):t.removeClass("selected")}),n.find(".tp-thumb, .tp-tab").each(function(){var t=jQuery(this);t.data("liref")===i?(t.addClass("selected"),t.hasClass("tp-tab")?a(n.find(".tp-tabs"),f):a(n.find(".tp-thumbs"),u)):t.removeClass("selected")});var s=0,o=!1;e.thumbs&&jQuery.each(e.thumbs,function(t,e){s=o===!1?t:s,o=e.id===i||t===i?!0:o});var d=s>0?s-1:e.slideamount-1,l=s+1==e.slideamount?0:s+1;if(r.enable===!0){var h=r.tmp;if(jQuery.each(e.thumbs[d].params,function(t,e){h=h.replace(e.from,e.to)}),r.left.j.html(h),h=r.tmp,l>e.slideamount)return;jQuery.each(e.thumbs[l].params,function(t,e){h=h.replace(e.from,e.to)}),r.right.j.html(h),punchgs.TweenLite.set(r.left.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+e.thumbs[d].src+")"}),punchgs.TweenLite.set(r.right.j.find(".tp-arr-imgholder"),{backgroundImage:"url("+e.thumbs[l].src+")"})}}),h(r),h(d),h(u),h(f),n.on("mouseenter mousemove",function(){n.hasClass("tp-mouseover")||(n.addClass("tp-mouseover"),punchgs.TweenLite.killDelayedCallsTo(g),m&&r.hide_onleave&&g(n.find(".tparrows"),r,"show"),b&&d.hide_onleave&&g(n.find(".tp-bullets"),d,"show"),_&&u.hide_onleave&&g(n.find(".tp-thumbs"),u,"show"),y&&f.hide_onleave&&g(n.find(".tp-tabs"),f,"show"),i&&(n.removeClass("tp-mouseover"),c(t,e)))}),n.on("mouseleave",function(){n.removeClass("tp-mouseover"),c(t,e)}),m&&r.hide_onleave&&g(n.find(".tparrows"),r,"hide",0),b&&d.hide_onleave&&g(n.find(".tp-bullets"),d,"hide",0),_&&u.hide_onleave&&g(n.find(".tp-thumbs"),u,"hide",0),y&&f.hide_onleave&&g(n.find(".tp-tabs"),f,"hide",0),_&&l(n.find(".tp-thumbs"),e),y&&l(n.find(".tp-tabs"),e),"carousel"===e.sliderType&&l(t,e,!0),"on"==e.navigation.touch.touchenabled&&l(t,e,"swipebased")}});var a=function(t,e){var i=(t.hasClass("tp-thumbs")?".tp-thumbs":".tp-tabs",t.hasClass("tp-thumbs")?".tp-thumb-mask":".tp-tab-mask"),a=t.hasClass("tp-thumbs")?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",n=t.hasClass("tp-thumbs")?".tp-thumb":".tp-tab",r=t.find(i),s=r.find(a),o=e.direction,d="vertical"===o?r.find(n).first().outerHeight(!0)+e.space:r.find(n).first().outerWidth(!0)+e.space,l="vertical"===o?r.height():r.width(),h=parseInt(r.find(n+".selected").data("liindex"),0),p=l/d,u="vertical"===o?r.height():r.width(),c=0-h*d,g="vertical"===o?s.height():s.width(),v=0-(g-u)>c?0-(g-u):v>0?0:c,f=s.data("offset");p>2&&(v=0>=c-(f+d)?0-d>c-(f+d)?f:v+d:v,v=d>c-d+f+l&&c+(Math.round(p)-2)*d<f?c+(Math.round(p)-2)*d:v),v=0-(g-u)>v?0-(g-u):v>0?0:v,"vertical"!==o&&r.width()>=s.width()&&(v=0),"vertical"===o&&r.height()>=s.height()&&(v=0),t.hasClass("dragged")||("vertical"===o?s.data("tmmove",punchgs.TweenLite.to(s,.5,{top:v+"px",ease:punchgs.Power3.easeInOut})):s.data("tmmove",punchgs.TweenLite.to(s,.5,{left:v+"px",ease:punchgs.Power3.easeInOut})),s.data("offset",v))},n=function(t,e,i,a,n,r){var s=i.parent().find(".tp-"+r+"s"),o=s.find(".tp-"+r+"s-inner-wrapper"),d=s.find(".tp-"+r+"-mask"),l=a.width*t<a.min_width?a.min_width:Math.round(a.width*t),h=Math.round(l/a.width*a.height),p="vertical"===a.direction?l:l*n+a.space*(n-1),u="vertical"===a.direction?h*n+a.space*(n-1):h,c="vertical"===a.direction?{width:l+"px"}:{height:h+"px"};e.add(punchgs.TweenLite.set(s,c)),e.add(punchgs.TweenLite.set(o,{width:p+"px",height:u+"px"})),e.add(punchgs.TweenLite.set(d,{width:p+"px",height:u+"px"}));var g=o.find(".tp-"+r);return g&&jQuery.each(g,function(t,i){"vertical"===a.direction?e.add(punchgs.TweenLite.set(i,{top:t*(h+parseInt(void 0===a.space?0:a.space,0)),width:l+"px",height:h+"px"})):"horizontal"===a.direction&&e.add(punchgs.TweenLite.set(i,{left:t*(l+parseInt(void 0===a.space?0:a.space,0)),width:l+"px",height:h+"px"}))}),e},r=function(t){var e=0,i=0,a=0,n=0,r=1,s=1,o=1;return"detail"in t&&(i=t.detail),"wheelDelta"in t&&(i=-t.wheelDelta/120),"wheelDeltaY"in t&&(i=-t.wheelDeltaY/120),"wheelDeltaX"in t&&(e=-t.wheelDeltaX/120),"axis"in t&&t.axis===t.HORIZONTAL_AXIS&&(e=i,i=0),a=e*r,n=i*r,"deltaY"in t&&(n=t.deltaY),"deltaX"in t&&(a=t.deltaX),(a||n)&&t.deltaMode&&(1==t.deltaMode?(a*=s,n*=s):(a*=o,n*=o)),a&&!e&&(e=1>a?-1:1),n&&!i&&(i=1>n?-1:1),n=navigator.userAgent.match(/mozilla/i)?10*n:n,(n>300||-300>n)&&(n/=10),{spinX:e,spinY:i,pixelX:a,pixelY:n}},s=function(t,i){"on"===i.navigation.keyboardNavigation&&jQuery(document).keydown(function(a){("horizontal"==i.navigation.keyboard_direction&&39==a.keyCode||"vertical"==i.navigation.keyboard_direction&&40==a.keyCode)&&(i.sc_indicator="arrow",i.sc_indicator_dir=0,e.callingNewSlide(i,t,1)),("horizontal"==i.navigation.keyboard_direction&&37==a.keyCode||"vertical"==i.navigation.keyboard_direction&&38==a.keyCode)&&(i.sc_indicator="arrow",i.sc_indicator_dir=1,e.callingNewSlide(i,t,-1))})},o=function(t,i){if("on"===i.navigation.mouseScrollNavigation||"carousel"===i.navigation.mouseScrollNavigation){i.isIEEleven=!!navigator.userAgent.match(/Trident.*rv\:11\./),i.isSafari=!!navigator.userAgent.match(/safari/i),i.ischrome=!!navigator.userAgent.match(/chrome/i);var a=i.ischrome?-49:i.isIEEleven||i.isSafari?-9:navigator.userAgent.match(/mozilla/i)?-29:-49,n=i.ischrome?49:i.isIEEleven||i.isSafari?9:navigator.userAgent.match(/mozilla/i)?29:49;t.on("mousewheel DOMMouseScroll",function(s){var o=r(s.originalEvent),d=t.find(".tp-revslider-slidesli.active-revslide").index(),l=t.find(".tp-revslider-slidesli.processing-revslide").index(),h=-1!=d&&0==d||-1!=l&&0==l?!0:!1,p=-1!=d&&d==i.slideamount-1||1!=l&&l==i.slideamount-1?!0:!1,u=!0;"carousel"==i.navigation.mouseScrollNavigation&&(h=p=!1),-1==l?o.pixelY<a?(h||(i.sc_indicator="arrow","reverse"!==i.navigation.mouseScrollReverse&&(i.sc_indicator_dir=0,e.callingNewSlide(i,t,-1)),u=!1),p||(i.sc_indicator="arrow","reverse"===i.navigation.mouseScrollReverse&&(i.sc_indicator_dir=1,e.callingNewSlide(i,t,1)),u=!1)):o.pixelY>n&&(p||(i.sc_indicator="arrow","reverse"!==i.navigation.mouseScrollReverse&&(i.sc_indicator_dir=1,e.callingNewSlide(i,t,1)),u=!1),h||(i.sc_indicator="arrow","reverse"===i.navigation.mouseScrollReverse&&(i.sc_indicator_dir=0,e.callingNewSlide(i,t,-1)),u=!1)):u=!1;var c=i.c.offset().top-jQuery("body").scrollTop(),g=c+i.c.height();return"carousel"!=i.navigation.mouseScrollNavigation?("reverse"!==i.navigation.mouseScrollReverse&&(c>0&&o.pixelY>0||g<jQuery(window).height()&&o.pixelY<0)&&(u=!0),"reverse"===i.navigation.mouseScrollReverse&&(0>c&&o.pixelY<0||g>jQuery(window).height()&&o.pixelY>0)&&(u=!0)):u=!1,0==u?(s.preventDefault(s),!1):void 0})}},d=function(t,e,a){return t=i?jQuery(a.target).closest("."+t).length||jQuery(a.srcElement).closest("."+t).length:jQuery(a.toElement).closest("."+t).length||jQuery(a.originalTarget).closest("."+t).length,t===!0||1===t?1:0},l=function(t,a,n){t.data("opt",a);var r=a.carousel;jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),r.Limit="endless";var s=(i||"Firefox"===e.get_browser(),t),o="vertical"===a.navigation.thumbnails.direction||"vertical"===a.navigation.tabs.direction?"none":"vertical",l=a.navigation.touch.swipe_direction||"horizontal";o="swipebased"==n&&"vertical"==l?"none":n?"vertical":o,jQuery.fn.swipetp||(jQuery.fn.swipetp=jQuery.fn.swipe),jQuery.fn.swipetp.defaults&&jQuery.fn.swipetp.defaults.excludedElements||jQuery.fn.swipetp.defaults||(jQuery.fn.swipetp.defaults=new Object),jQuery.fn.swipetp.defaults.excludedElements="label, button, input, select, textarea, .noSwipe",s.swipetp({allowPageScroll:o,triggerOnTouchLeave:!0,treshold:a.navigation.touch.swipe_treshold,fingers:a.navigation.touch.swipe_min_touches,excludeElements:jQuery.fn.swipetp.defaults.excludedElements,swipeStatus:function(i,n,s,o,h,p,u){var c=d("rev_slider_wrapper",t,i),g=d("tp-thumbs",t,i),v=d("tp-tabs",t,i),f=jQuery(this).attr("class"),m=f.match(/tp-tabs|tp-thumb/gi)?!0:!1;if("carousel"===a.sliderType&&(("move"===n||"end"===n||"cancel"==n)&&a.dragStartedOverSlider&&!a.dragStartedOverThumbs&&!a.dragStartedOverTabs||"start"===n&&c>0&&0===g&&0===v))switch(a.dragStartedOverSlider=!0,o=s&&s.match(/left|up/g)?Math.round(-1*o):o=Math.round(1*o),n){case"start":void 0!==r.positionanim&&(r.positionanim.kill(),r.slide_globaloffset="off"===r.infinity?r.slide_offset:e.simp(r.slide_offset,r.maxwidth)),r.overpull="none",r.wrap.addClass("dragged");break;case"move":if(r.slide_offset="off"===r.infinity?r.slide_globaloffset+o:e.simp(r.slide_globaloffset+o,r.maxwidth),"off"===r.infinity){var b="center"===r.horizontal_align?(r.wrapwidth/2-r.slide_width/2-r.slide_offset)/r.slide_width:(0-r.slide_offset)/r.slide_width;"none"!==r.overpull&&0!==r.overpull||!(0>b||b>a.slideamount-1)?b>=0&&b<=a.slideamount-1&&(b>=0&&o>r.overpull||b<=a.slideamount-1&&o<r.overpull)&&(r.overpull=0):r.overpull=o,r.slide_offset=0>b?r.slide_offset+(r.overpull-o)/1.1+Math.sqrt(Math.abs((r.overpull-o)/1.1)):b>a.slideamount-1?r.slide_offset+(r.overpull-o)/1.1-Math.sqrt(Math.abs((r.overpull-o)/1.1)):r.slide_offset}e.organiseCarousel(a,s,!0,!0);break;case"end":case"cancel":r.slide_globaloffset=r.slide_offset,r.wrap.removeClass("dragged"),e.carouselToEvalPosition(a,s),a.dragStartedOverSlider=!1,a.dragStartedOverThumbs=!1,a.dragStartedOverTabs=!1}else{if(("move"!==n&&"end"!==n&&"cancel"!=n||a.dragStartedOverSlider||!a.dragStartedOverThumbs&&!a.dragStartedOverTabs)&&!("start"===n&&c>0&&(g>0||v>0))){if("end"==n&&!m){if(a.sc_indicator="arrow","horizontal"==l&&"left"==s||"vertical"==l&&"up"==s)return a.sc_indicator_dir=0,e.callingNewSlide(a,a.c,1),!1;if("horizontal"==l&&"right"==s||"vertical"==l&&"down"==s)return a.sc_indicator_dir=1,e.callingNewSlide(a,a.c,-1),!1}return a.dragStartedOverSlider=!1,a.dragStartedOverThumbs=!1,a.dragStartedOverTabs=!1,!0}g>0&&(a.dragStartedOverThumbs=!0),v>0&&(a.dragStartedOverTabs=!0);var w=a.dragStartedOverThumbs?".tp-thumbs":".tp-tabs",_=a.dragStartedOverThumbs?".tp-thumb-mask":".tp-tab-mask",x=a.dragStartedOverThumbs?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",y=a.dragStartedOverThumbs?".tp-thumb":".tp-tab",T=a.dragStartedOverThumbs?a.navigation.thumbnails:a.navigation.tabs;o=s&&s.match(/left|up/g)?Math.round(-1*o):o=Math.round(1*o);var S=t.parent().find(_),j=S.find(x),C=T.direction,L="vertical"===C?j.height():j.width(),Q="vertical"===C?S.height():S.width(),k="vertical"===C?S.find(y).first().outerHeight(!0)+T.space:S.find(y).first().outerWidth(!0)+T.space,I=void 0===j.data("offset")?0:parseInt(j.data("offset"),0),O=0;switch(n){case"start":t.parent().find(w).addClass("dragged"),I="vertical"===C?j.position().top:j.position().left,j.data("offset",I),j.data("tmmove")&&j.data("tmmove").pause();break;case"move":if(Q>=L)return!1;O=I+o,O=O>0?"horizontal"===C?O-j.width()*(O/j.width()*O/j.width()):O-j.height()*(O/j.height()*O/j.height()):O;var H="vertical"===C?0-(j.height()-S.height()):0-(j.width()-S.width());O=H>O?"horizontal"===C?O+j.width()*(O-H)/j.width()*(O-H)/j.width():O+j.height()*(O-H)/j.height()*(O-H)/j.height():O,"vertical"===C?punchgs.TweenLite.set(j,{top:O+"px"}):punchgs.TweenLite.set(j,{left:O+"px"});break;case"end":case"cancel":if(m)return O=I+o,O="vertical"===C?O<0-(j.height()-S.height())?0-(j.height()-S.height()):O:O<0-(j.width()-S.width())?0-(j.width()-S.width()):O,O=O>0?0:O,O=Math.abs(o)>k/10?0>=o?Math.floor(O/k)*k:Math.ceil(O/k)*k:0>o?Math.ceil(O/k)*k:Math.floor(O/k)*k,O="vertical"===C?O<0-(j.height()-S.height())?0-(j.height()-S.height()):O:O<0-(j.width()-S.width())?0-(j.width()-S.width()):O,O=O>0?0:O,"vertical"===C?punchgs.TweenLite.to(j,.5,{top:O+"px",ease:punchgs.Power3.easeOut}):punchgs.TweenLite.to(j,.5,{left:O+"px",ease:punchgs.Power3.easeOut}),O=O?O:"vertical"===C?j.position().top:j.position().left,j.data("offset",O),j.data("distance",o),setTimeout(function(){a.dragStartedOverSlider=!1,a.dragStartedOverThumbs=!1,a.dragStartedOverTabs=!1},100),t.parent().find(w).removeClass("dragged"),!1}}}})},h=function(t){t.hide_delay=jQuery.isNumeric(parseInt(t.hide_delay,0))?t.hide_delay/1e3:.2,t.hide_delay_mobile=jQuery.isNumeric(parseInt(t.hide_delay_mobile,0))?t.hide_delay_mobile/1e3:.2},p=function(t){return t&&t.enable},u=function(t){return t&&t.enable&&t.hide_onleave===!0&&(void 0===t.position?!0:!t.position.match(/outer/g))},c=function(t,e){var a=t.parent();u(e.navigation.arrows)&&punchgs.TweenLite.delayedCall(i?e.navigation.arrows.hide_delay_mobile:e.navigation.arrows.hide_delay,g,[a.find(".tparrows"),e.navigation.arrows,"hide"]),u(e.navigation.bullets)&&punchgs.TweenLite.delayedCall(i?e.navigation.bullets.hide_delay_mobile:e.navigation.bullets.hide_delay,g,[a.find(".tp-bullets"),e.navigation.bullets,"hide"]),u(e.navigation.thumbnails)&&punchgs.TweenLite.delayedCall(i?e.navigation.thumbnails.hide_delay_mobile:e.navigation.thumbnails.hide_delay,g,[a.find(".tp-thumbs"),e.navigation.thumbnails,"hide"]),u(e.navigation.tabs)&&punchgs.TweenLite.delayedCall(i?e.navigation.tabs.hide_delay_mobile:e.navigation.tabs.hide_delay,g,[a.find(".tp-tabs"),e.navigation.tabs,"hide"])},g=function(t,e,i,a){switch(a=void 0===a?.5:a,i){case"show":punchgs.TweenLite.to(t,a,{autoAlpha:1,ease:punchgs.Power3.easeInOut,overwrite:"auto"});break;case"hide":punchgs.TweenLite.to(t,a,{autoAlpha:0,ease:punchgs.Power3.easeInOu,overwrite:"auto"})}},v=function(t,e,i){e.style=void 0===e.style?"":e.style,e.left.style=void 0===e.left.style?"":e.left.style,e.right.style=void 0===e.right.style?"":e.right.style,0===t.find(".tp-leftarrow.tparrows").length&&t.append('<div class="tp-leftarrow tparrows '+e.style+" "+e.left.style+'">'+e.tmp+"</div>"),0===t.find(".tp-rightarrow.tparrows").length&&t.append('<div class="tp-rightarrow tparrows '+e.style+" "+e.right.style+'">'+e.tmp+"</div>");var a=t.find(".tp-leftarrow.tparrows"),n=t.find(".tp-rightarrow.tparrows");e.rtl?(a.click(function(){i.sc_indicator="arrow",i.sc_indicator_dir=0,t.revnext()}),n.click(function(){i.sc_indicator="arrow",i.sc_indicator_dir=1,t.revprev()})):(n.click(function(){i.sc_indicator="arrow",i.sc_indicator_dir=0,t.revnext()}),a.click(function(){i.sc_indicator="arrow",i.sc_indicator_dir=1,t.revprev()})),e.right.j=t.find(".tp-rightarrow.tparrows"),e.left.j=t.find(".tp-leftarrow.tparrows"),e.padding_top=parseInt(i.carousel.padding_top||0,0),e.padding_bottom=parseInt(i.carousel.padding_bottom||0,0),b(a,e.left,i),b(n,e.right,i),e.left.opt=i,e.right.opt=i,("outer-left"==e.position||"outer-right"==e.position)&&(i.outernav=!0)},f=function(t,e,i){var a=t.outerHeight(!0),n=(t.outerWidth(!0),void 0==e.opt?0:0==i.conh?i.height:i.conh),r="layergrid"==e.container?"fullscreen"==i.sliderLayout?i.height/2-i.gridheight[i.curWinRange]*i.bh/2:"on"==i.autoHeight||void 0!=i.minHeight&&i.minHeight>0?n/2-i.gridheight[i.curWinRange]*i.bh/2:0:0,s="top"===e.v_align?{top:"0px",y:Math.round(e.v_offset+r)+"px"}:"center"===e.v_align?{top:"50%",y:Math.round(0-a/2+e.v_offset)+"px"}:{top:"100%",y:Math.round(0-(a+e.v_offset+r))+"px"};t.hasClass("outer-bottom")||punchgs.TweenLite.set(t,s)},m=function(t,e,i){var a=(t.outerHeight(!0),t.outerWidth(!0)),n="layergrid"==e.container?"carousel"===i.sliderType?0:i.width/2-i.gridwidth[i.curWinRange]*i.bw/2:0,r="left"===e.h_align?{left:"0px",x:Math.round(e.h_offset+n)+"px"}:"center"===e.h_align?{left:"50%",x:Math.round(0-a/2+e.h_offset)+"px"}:{left:"100%",x:Math.round(0-(a+e.h_offset+n))+"px"};punchgs.TweenLite.set(t,r)},b=function(t,e,i){var a=t.closest(".tp-simpleresponsive").length>0?t.closest(".tp-simpleresponsive"):t.closest(".tp-revslider-mainul").length>0?t.closest(".tp-revslider-mainul"):t.closest(".rev_slider_wrapper").length>0?t.closest(".rev_slider_wrapper"):t.parent().find(".tp-revslider-mainul"),n=a.width(),r=a.height();if(f(t,e,i),m(t,e,i),"outer-left"!==e.position||"fullwidth"!=e.sliderLayout&&"fullscreen"!=e.sliderLayout?"outer-right"!==e.position||"fullwidth"!=e.sliderLayout&&"fullscreen"!=e.sliderLayout||punchgs.TweenLite.set(t,{right:0-t.outerWidth()+"px",x:e.h_offset+"px"}):punchgs.TweenLite.set(t,{left:0-t.outerWidth()+"px",x:e.h_offset+"px"}),t.hasClass("tp-thumbs")||t.hasClass("tp-tabs")){var s=t.data("wr_padding"),o=t.data("maxw"),d=t.data("maxh"),l=t.hasClass("tp-thumbs")?t.find(".tp-thumb-mask"):t.find(".tp-tab-mask"),h=parseInt(e.padding_top||0,0),p=parseInt(e.padding_bottom||0,0);o>n&&"outer-left"!==e.position&&"outer-right"!==e.position?(punchgs.TweenLite.set(t,{left:"0px",x:0,maxWidth:n-2*s+"px"}),punchgs.TweenLite.set(l,{maxWidth:n-2*s+"px"})):(punchgs.TweenLite.set(t,{maxWidth:o+"px"}),punchgs.TweenLite.set(l,{maxWidth:o+"px"})),d+2*s>r&&"outer-bottom"!==e.position&&"outer-top"!==e.position?(punchgs.TweenLite.set(t,{top:"0px",y:0,maxHeight:h+p+(r-2*s)+"px"}),punchgs.TweenLite.set(l,{maxHeight:h+p+(r-2*s)+"px"})):(punchgs.TweenLite.set(t,{maxHeight:d+"px"}),punchgs.TweenLite.set(l,{maxHeight:d+"px"})),"outer-left"!==e.position&&"outer-right"!==e.position&&(h=0,p=0),e.span===!0&&"vertical"===e.direction?(punchgs.TweenLite.set(t,{maxHeight:h+p+(r-2*s)+"px",height:h+p+(r-2*s)+"px",top:0-h,y:0}),f(l,e,i)):e.span===!0&&"horizontal"===e.direction&&(punchgs.TweenLite.set(t,{maxWidth:"100%",width:n-2*s+"px",left:0,x:0}),m(l,e,i))}},w=function(t,e,i,a){0===t.find(".tp-bullets").length&&(e.style=void 0===e.style?"":e.style,t.append('<div class="tp-bullets '+e.style+" "+e.direction+'"></div>'));var n=t.find(".tp-bullets"),r=i.data("index"),s=e.tmp;jQuery.each(a.thumbs[i.index()].params,function(t,e){s=s.replace(e.from,e.to)}),n.append('<div class="justaddedbullet tp-bullet">'+s+"</div>");var o=t.find(".justaddedbullet"),d=t.find(".tp-bullet").length,l=o.outerWidth()+parseInt(void 0===e.space?0:e.space,0),h=o.outerHeight()+parseInt(void 0===e.space?0:e.space,0);"vertical"===e.direction?(o.css({top:(d-1)*h+"px",left:"0px"}),n.css({height:(d-1)*h+o.outerHeight(),width:o.outerWidth()})):(o.css({left:(d-1)*l+"px",top:"0px"}),n.css({width:(d-1)*l+o.outerWidth(),height:o.outerHeight()})),o.find(".tp-bullet-image").css({backgroundImage:"url("+a.thumbs[i.index()].src+")"}),o.data("liref",r),o.click(function(){a.sc_indicator="bullet",t.revcallslidewithid(r),t.find(".tp-bullet").removeClass("selected"),jQuery(this).addClass("selected")}),o.removeClass("justaddedbullet"),e.padding_top=parseInt(a.carousel.padding_top||0,0),e.padding_bottom=parseInt(a.carousel.padding_bottom||0,0),e.opt=a,("outer-left"==e.position||"outer-right"==e.position)&&(a.outernav=!0),n.addClass("nav-pos-hor-"+e.h_align),n.addClass("nav-pos-ver-"+e.v_align),n.addClass("nav-dir-"+e.direction),b(n,e,a)},_=function(t,e){e=parseFloat(e),t=t.replace("#","");var i=parseInt(t.substring(0,2),16),a=parseInt(t.substring(2,4),16),n=parseInt(t.substring(4,6),16),r="rgba("+i+","+a+","+n+","+e+")";return r},x=function(t,e,i,a,n){var r="tp-thumb"===a?".tp-thumbs":".tp-tabs",s="tp-thumb"===a?".tp-thumb-mask":".tp-tab-mask",o="tp-thumb"===a?".tp-thumbs-inner-wrapper":".tp-tabs-inner-wrapper",d="tp-thumb"===a?".tp-thumb":".tp-tab",l="tp-thumb"===a?".tp-thumb-image":".tp-tab-image";if(e.visibleAmount=e.visibleAmount>n.slideamount?n.slideamount:e.visibleAmount,e.sliderLayout=n.sliderLayout,0===t.parent().find(r).length){e.style=void 0===e.style?"":e.style;var h=e.span===!0?"tp-span-wrapper":"",p='<div class="'+a+"s "+h+" "+e.position+" "+e.style+'"><div class="'+a+'-mask"><div class="'+a+'s-inner-wrapper" style="position:relative;"></div></div></div>';"outer-top"===e.position?t.parent().prepend(p):"outer-bottom"===e.position?t.after(p):t.append(p),e.padding_top=parseInt(n.carousel.padding_top||0,0),e.padding_bottom=parseInt(n.carousel.padding_bottom||0,0),("outer-left"==e.position||"outer-right"==e.position)&&(n.outernav=!0)}var u=i.data("index"),c=t.parent().find(r),g=c.find(s),v=g.find(o),f="horizontal"===e.direction?e.width*e.visibleAmount+e.space*(e.visibleAmount-1):e.width,m="horizontal"===e.direction?e.height:e.height*e.visibleAmount+e.space*(e.visibleAmount-1),w=e.tmp;jQuery.each(n.thumbs[i.index()].params,function(t,e){w=w.replace(e.from,e.to)}),v.append('<div data-liindex="'+i.index()+'" data-liref="'+u+'" class="justaddedthumb '+a+'" style="width:'+e.width+"px;height:"+e.height+'px;">'+w+"</div>");var x=c.find(".justaddedthumb"),y=c.find(d).length,T=x.outerWidth()+parseInt(void 0===e.space?0:e.space,0),S=x.outerHeight()+parseInt(void 0===e.space?0:e.space,0);x.find(l).css({backgroundImage:"url("+n.thumbs[i.index()].src+")"}),"vertical"===e.direction?(x.css({top:(y-1)*S+"px",left:"0px"}),v.css({height:(y-1)*S+x.outerHeight(),width:x.outerWidth()})):(x.css({left:(y-1)*T+"px",top:"0px"}),v.css({width:(y-1)*T+x.outerWidth(),height:x.outerHeight()})),c.data("maxw",f),c.data("maxh",m),c.data("wr_padding",e.wrapper_padding);var j="outer-top"===e.position||"outer-bottom"===e.position?"relative":"absolute";"outer-top"!==e.position&&"outer-bottom"!==e.position||"center"!==e.h_align?"0":"auto";g.css({maxWidth:f+"px",maxHeight:m+"px",overflow:"hidden",position:"relative"}),c.css({maxWidth:f+"px",maxHeight:m+"px",overflow:"visible",position:j,background:_(e.wrapper_color,e.wrapper_opacity),padding:e.wrapper_padding+"px",boxSizing:"contet-box"}),x.click(function(){n.sc_indicator="bullet";var e=t.parent().find(o).data("distance");e=void 0===e?0:e,Math.abs(e)<10&&(t.revcallslidewithid(u),t.parent().find(r).removeClass("selected"),jQuery(this).addClass("selected"))}),x.removeClass("justaddedthumb"),e.opt=n,c.addClass("nav-pos-hor-"+e.h_align),c.addClass("nav-pos-ver-"+e.v_align),c.addClass("nav-dir-"+e.direction),b(c,e,n)},y=function(t){var e=t.c.parent().find(".outer-top"),i=t.c.parent().find(".outer-bottom");t.top_outer=e.hasClass("tp-forcenotvisible")?0:e.outerHeight()||0,t.bottom_outer=i.hasClass("tp-forcenotvisible")?0:i.outerHeight()||0},T=function(t,e,i,a){e>i||i>a?t.addClass("tp-forcenotvisible"):t.removeClass("tp-forcenotvisible")}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.parallax.min.js
/********************************************
 * REVOLUTION 5.1.6 EXTENSION - PARALLAX
 * @version: 1.4 (10.03.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(e){var a=jQuery.fn.revolution,r=a.is_mobile();jQuery.extend(!0,a,{checkForParallax:function(e,t){function l(e){if("3D"==o.type||"3d"==o.type){e.find(".slotholder").wrapAll('<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'),e.find(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:'+o.ddd_layer_overflow+';"></div>'),e.find(".rs-parallaxlevel-tobggroup").closest(".tp-parallax-wrap").wrapAll('<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>');var a=e.find(".dddwrapper"),r=e.find(".dddwrapper-layer"),l=e.find(".dddwrapper-layertobggroup");l.appendTo(a),"carousel"==t.sliderType&&("on"==o.ddd_shadow&&a.addClass("dddwrappershadow"),punchgs.TweenLite.set(a,{borderRadius:t.carousel.border_radius})),punchgs.TweenLite.set(e,{overflow:"visible",transformStyle:"preserve-3d",perspective:1600}),punchgs.TweenLite.set(a,{force3D:"auto",transformOrigin:"50% 50%"}),punchgs.TweenLite.set(r,{force3D:"auto",transformOrigin:"50% 50%",zIndex:5}),punchgs.TweenLite.set(t.ul,{transformStyle:"preserve-3d",transformPerspective:1600})}}var o=t.parallax;if(r&&"on"==o.disable_onmobile)return!1;("3D"==o.type||"3d"==o.type)&&(punchgs.TweenLite.set(t.c,{overflow:o.ddd_overflow}),punchgs.TweenLite.set(t.ul,{overflow:o.ddd_overflow}),"carousel"!=t.sliderType&&"on"==o.ddd_shadow&&(t.c.prepend('<div class="dddwrappershadow"></div>'),punchgs.TweenLite.set(t.c.find(".dddwrappershadow"),{force3D:"auto",transformPerspective:1600,transformOrigin:"50% 50%",width:"100%",height:"100%",position:"absolute",top:0,left:0,zIndex:0}))),t.li.each(function(){l(jQuery(this))}),("3D"==o.type||"3d"==o.type&&t.c.find(".tp-static-layers").length>0)&&(punchgs.TweenLite.set(t.c.find(".tp-static-layers"),{top:0,left:0,width:"100%",height:"100%"}),l(t.c.find(".tp-static-layers")));for(var s=1;s<=o.levels.length;s++)t.c.find(".rs-parallaxlevel-"+s).each(function(){var e=jQuery(this),a=e.closest(".tp-parallax-wrap");a.data("parallaxlevel",o.levels[s-1]),a.addClass("tp-parallax-container")});("mouse"==o.type||"scroll+mouse"==o.type||"mouse+scroll"==o.type||"3D"==o.type||"3d"==o.type)&&(e.mouseenter(function(a){var r=e.find(".active-revslide"),t=e.offset().top,l=e.offset().left,o=a.pageX-l,s=a.pageY-t;r.data("enterx",o),r.data("entery",s)}),e.on("mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",function(a,r){var l=r&&r.li?r.li:e.find(".active-revslide");if("enterpoint"==o.origo){var s=e.offset().top,i=e.offset().left;void 0==l.data("enterx")&&l.data("enterx",a.pageX-i),void 0==l.data("entery")&&l.data("entery",a.pageY-s);var d=l.data("enterx")||a.pageX-i,n=l.data("entery")||a.pageY-s,p=d-(a.pageX-i),c=n-(a.pageY-s),u=o.speed/1e3||.4}else var s=e.offset().top,i=e.offset().left,p=t.conw/2-(a.pageX-i),c=t.conh/2-(a.pageY-s),u=o.speed/1e3||3;"mouseleave"==a.type&&(p=o.ddd_lasth||0,c=o.ddd_lastv||0,u=1.5);var h=[];if(l.find(".tp-parallax-container").each(function(e){h.push(jQuery(this))}),e.find(".tp-static-layers .tp-parallax-container").each(function(){h.push(jQuery(this))}),jQuery.each(h,function(){var e=jQuery(this),a=parseInt(e.data("parallaxlevel"),0),r="3D"==o.type||"3d"==o.type?a/200:a/100,t=p*r,l=c*r;"scroll+mouse"==o.type||"mouse+scroll"==o.type?punchgs.TweenLite.to(e,u,{force3D:"auto",x:t,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(e,u,{force3D:"auto",x:t,y:l,ease:punchgs.Power3.easeOut,overwrite:"all"})}),"3D"==o.type||"3d"==o.type){var w=".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";"carousel"===t.sliderType&&(w=".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),t.c.find(w).each(function(){var e=jQuery(this),r=o.levels[o.levels.length-1]/200,l=p*r,s=c*r,i=0==t.conw?0:Math.round(p/t.conw*r*100)||0,d=0==t.conh?0:Math.round(c/t.conh*r*100)||0,n=e.closest("li"),h=0,w=!1;e.hasClass("dddwrapper-layer")&&(h=o.ddd_z_correction||65,w=!0),e.hasClass("dddwrapper-layer")&&(l=0,s=0),n.hasClass("active-revslide")||"carousel"!=t.sliderType?"on"!=o.ddd_bgfreeze||w?punchgs.TweenLite.to(e,u,{rotationX:d,rotationY:-i,x:l,z:h,y:s,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(e,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(e,.5,{force3D:"auto",rotationY:0,z:0,x:0,y:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==a.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}}),r&&(window.ondeviceorientation=function(a){var r=Math.round(a.beta||0)-70,l=Math.round(a.gamma||0),s=e.find(".active-revslide");if(jQuery(window).width()>jQuery(window).height()){var i=l;l=r,r=i}var d=e.width(),n=e.height(),p=360/d*l,c=180/n*r,u=o.speed/1e3||3,h=[];if(s.find(".tp-parallax-container").each(function(e){h.push(jQuery(this))}),e.find(".tp-static-layers .tp-parallax-container").each(function(){h.push(jQuery(this))}),jQuery.each(h,function(){var e=jQuery(this),a=parseInt(e.data("parallaxlevel"),0),r=a/100,t=p*r*2,l=c*r*4;punchgs.TweenLite.to(e,u,{force3D:"auto",x:t,y:l,ease:punchgs.Power3.easeOut,overwrite:"all"})}),"3D"==o.type||"3d"==o.type){var w=".tp-revslider-slidesli .dddwrapper, .dddwrappershadow, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer";"carousel"===t.sliderType&&(w=".tp-revslider-slidesli .dddwrapper, .tp-revslider-slidesli .dddwrapper-layer, .tp-static-layers .dddwrapper-layer"),t.c.find(w).each(function(){var e=jQuery(this),r=o.levels[o.levels.length-1]/200;offsh=p*r,offsv=c*r*3,offrv=0==t.conw?0:Math.round(p/t.conw*r*500)||0,offrh=0==t.conh?0:Math.round(c/t.conh*r*700)||0,li=e.closest("li"),zz=0,itslayer=!1,e.hasClass("dddwrapper-layer")&&(zz=o.ddd_z_correction||65,itslayer=!0),e.hasClass("dddwrapper-layer")&&(offsh=0,offsv=0),li.hasClass("active-revslide")||"carousel"!=t.sliderType?"on"!=o.ddd_bgfreeze||itslayer?punchgs.TweenLite.to(e,u,{rotationX:offrh,rotationY:-offrv,x:offsh,z:zz,y:offsv,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(e,.5,{force3D:"auto",rotationY:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}):punchgs.TweenLite.to(e,.5,{force3D:"auto",rotationY:0,z:0,x:0,y:0,rotationX:0,z:0,ease:punchgs.Power3.easeOut,overwrite:"all"}),"mouseleave"==a.type&&punchgs.TweenLite.to(jQuery(this),3.8,{z:0,ease:punchgs.Power3.easeOut})})}})),a.scrollTicker(t,e)},scrollTicker:function(e,t){1!=e.scrollTicker&&(e.scrollTicker=!0,r?(punchgs.TweenLite.ticker.fps(150),punchgs.TweenLite.ticker.addEventListener("tick",function(){a.scrollHandling(e)},t,!1,1)):jQuery(window).on("scroll mousewheel DOMMouseScroll",function(){a.scrollHandling(e,!0)})),a.scrollHandling(e,!0)},scrollHandling:function(e,t){function l(e,a){e.lastscrolltop=a}e.lastwindowheight=e.lastwindowheight||jQuery(window).height();var o=e.c.offset().top,s=jQuery(window).scrollTop(),i=new Object,d=e.viewPort,n=e.parallax;if(e.lastscrolltop==s&&!e.duringslidechange&&!t)return!1;punchgs.TweenLite.delayedCall(.2,l,[e,s]),i.top=o-s,i.h=0==e.conh?e.c.height():e.conh,i.bottom=o-s+i.h;var p=i.top<0||i.h>e.lastwindowheight?i.top/i.h:i.bottom>e.lastwindowheight?(i.bottom-e.lastwindowheight)/i.h:0;if(e.scrollproc=p,a.callBackHandling&&a.callBackHandling(e,"parallax","start"),d.enable){var c=1-Math.abs(p);c=0>c?0:c,jQuery.isNumeric(d.visible_area)||-1!==d.visible_area.indexOf("%")&&(d.visible_area=parseInt(d.visible_area)/100),1-d.visible_area<=c?e.inviewport||(e.inviewport=!0,a.enterInViewPort(e)):e.inviewport&&(e.inviewport=!1,a.leaveViewPort(e))}if(r&&"on"==e.parallax.disable_onmobile)return!1;var u=new punchgs.TimelineLite;u.pause(),"3d"!=n.type&&"3D"!=n.type&&(("scroll"==n.type||"scroll+mouse"==n.type||"mouse+scroll"==n.type)&&e.c.find(".tp-parallax-container").each(function(a){var r=jQuery(this),t=parseInt(r.data("parallaxlevel"),0)/100,l=p*-(t*e.conh)||0;r.data("parallaxoffset",l),u.add(punchgs.TweenLite.set(r,{force3D:"auto",y:l}),0)}),e.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function(){var a=jQuery(this),r=a.data("bgparallax")||e.parallax.bgparallax;if(r="on"==r?1:r,void 0!==r||"off"!==r){var t=e.parallax.levels[parseInt(r,0)-1]/100,l=p*-(t*e.conh)||0;jQuery.isNumeric(l)&&u.add(punchgs.TweenLite.set(a,{position:"absolute",top:"0px",left:"0px",backfaceVisibility:"hidden",force3D:"true",y:l+"px"}),0)}})),a.callBackHandling&&a.callBackHandling(e,"parallax","end"),u.play(0)}})}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.slideanims.min.js
/************************************************
 * REVOLUTION 5.2 EXTENSION - SLIDE ANIMATIONS
 * @version: 1.1.2 (23.02.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
************************************************/
!function(t){var e=jQuery.fn.revolution;jQuery.extend(!0,e,{animateSlide:function(t,e,o,a,i,r,s,l,d){return n(t,e,o,a,i,r,s,l,d)}});var o=function(t,o,a,i){var n=t,r=n.find(".defaultimg"),s=n.data("zoomstart"),l=n.data("rotationstart");void 0!=r.data("currotate")&&(l=r.data("currotate")),void 0!=r.data("curscale")&&"box"==i?s=100*r.data("curscale"):void 0!=r.data("curscale")&&(s=r.data("curscale")),e.slotSize(r,o);var d=r.attr("src"),h=r.css("backgroundColor"),f=o.width,c=o.height,p=r.data("fxof"),u=0;"on"==o.autoHeight&&(c=o.c.height()),void 0==p&&(p=0);var g=0,w=r.data("bgfit"),v=r.data("bgrepeat"),m=r.data("bgposition");switch(void 0==w&&(w="cover"),void 0==v&&(v="no-repeat"),void 0==m&&(m="center center"),i){case"box":for(var x=0,y=0,T=0;T<o.slots;T++){y=0;for(var z=0;z<o.slots;z++)n.append('<div class="slot" style="position:absolute;top:'+(u+y)+"px;left:"+(p+x)+"px;width:"+o.slotw+"px;height:"+o.sloth+'px;overflow:hidden;"><div class="slotslide" data-x="'+x+'" data-y="'+y+'" style="position:absolute;top:0px;left:0px;width:'+o.slotw+"px;height:"+o.sloth+'px;overflow:hidden;"><div style="position:absolute;top:'+(0-y)+"px;left:"+(0-x)+"px;width:"+f+"px;height:"+c+"px;background-color:"+h+";background-image:url("+d+");background-repeat:"+v+";background-size:"+w+";background-position:"+m+';"></div></div></div>'),y+=o.sloth,void 0!=s&&void 0!=l&&punchgs.TweenLite.set(n.find(".slot").last(),{rotationZ:l});x+=o.slotw}break;case"vertical":case"horizontal":if("horizontal"==i){if(!a)var g=0-o.slotw;for(var z=0;z<o.slots;z++)n.append('<div class="slot" style="position:absolute;top:'+(0+u)+"px;left:"+(p+z*o.slotw)+"px;overflow:hidden;width:"+(o.slotw+.6)+"px;height:"+c+'px"><div class="slotslide" style="position:absolute;top:0px;left:'+g+"px;width:"+(o.slotw+.6)+"px;height:"+c+'px;overflow:hidden;"><div style="background-color:'+h+";position:absolute;top:0px;left:"+(0-z*o.slotw)+"px;width:"+f+"px;height:"+c+"px;background-image:url("+d+");background-repeat:"+v+";background-size:"+w+";background-position:"+m+';"></div></div></div>'),void 0!=s&&void 0!=l&&punchgs.TweenLite.set(n.find(".slot").last(),{rotationZ:l})}else{if(!a)var g=0-o.sloth;for(var z=0;z<o.slots+2;z++)n.append('<div class="slot" style="position:absolute;top:'+(u+z*o.sloth)+"px;left:"+p+"px;overflow:hidden;width:"+f+"px;height:"+o.sloth+'px"><div class="slotslide" style="position:absolute;top:'+g+"px;left:0px;width:"+f+"px;height:"+o.sloth+'px;overflow:hidden;"><div style="background-color:'+h+";position:absolute;top:"+(0-z*o.sloth)+"px;left:0px;width:"+f+"px;height:"+c+"px;background-image:url("+d+");background-repeat:"+v+";background-size:"+w+";background-position:"+m+';"></div></div></div>'),void 0!=s&&void 0!=l&&punchgs.TweenLite.set(n.find(".slot").last(),{rotationZ:l})}}},a=function(t,e,o,a,i){function n(){jQuery.each(y,function(t,e){(e[0]==o||e[8]==o)&&(w=e[1],v=e[2],m=x),x+=1})}var r=punchgs.Power1.easeIn,s=punchgs.Power1.easeOut,l=punchgs.Power1.easeInOut,d=punchgs.Power2.easeIn,h=punchgs.Power2.easeOut,f=punchgs.Power2.easeInOut,c=(punchgs.Power3.easeIn,punchgs.Power3.easeOut),p=punchgs.Power3.easeInOut,u=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],g=[16,17,18,19,20,21,22,23,24,25,27],w=0,v=1,m=0,x=0,y=(new Array,[["boxslide",0,1,10,0,"box",!1,null,0,s,s,500,6],["boxfade",1,0,10,0,"box",!1,null,1,l,l,700,5],["slotslide-horizontal",2,0,0,200,"horizontal",!0,!1,2,f,f,700,3],["slotslide-vertical",3,0,0,200,"vertical",!0,!1,3,f,f,700,3],["curtain-1",4,3,0,0,"horizontal",!0,!0,4,s,s,300,5],["curtain-2",5,3,0,0,"horizontal",!0,!0,5,s,s,300,5],["curtain-3",6,3,25,0,"horizontal",!0,!0,6,s,s,300,5],["slotzoom-horizontal",7,0,0,400,"horizontal",!0,!0,7,s,s,300,7],["slotzoom-vertical",8,0,0,0,"vertical",!0,!0,8,h,h,500,8],["slotfade-horizontal",9,0,0,500,"horizontal",!0,null,9,h,h,500,25],["slotfade-vertical",10,0,0,500,"vertical",!0,null,10,h,h,500,25],["fade",11,0,1,300,"horizontal",!0,null,11,f,f,1e3,1],["crossfade",11,1,1,300,"horizontal",!0,null,11,f,f,1e3,1],["fadethroughdark",11,2,1,300,"horizontal",!0,null,11,f,f,1e3,1],["fadethroughlight",11,3,1,300,"horizontal",!0,null,11,f,f,1e3,1],["fadethroughtransparent",11,4,1,300,"horizontal",!0,null,11,f,f,1e3,1],["slideleft",12,0,1,0,"horizontal",!0,!0,12,p,p,1e3,1],["slideup",13,0,1,0,"horizontal",!0,!0,13,p,p,1e3,1],["slidedown",14,0,1,0,"horizontal",!0,!0,14,p,p,1e3,1],["slideright",15,0,1,0,"horizontal",!0,!0,15,p,p,1e3,1],["slideoverleft",12,7,1,0,"horizontal",!0,!0,12,p,p,1e3,1],["slideoverup",13,7,1,0,"horizontal",!0,!0,13,p,p,1e3,1],["slideoverdown",14,7,1,0,"horizontal",!0,!0,14,p,p,1e3,1],["slideoverright",15,7,1,0,"horizontal",!0,!0,15,p,p,1e3,1],["slideremoveleft",12,8,1,0,"horizontal",!0,!0,12,p,p,1e3,1],["slideremoveup",13,8,1,0,"horizontal",!0,!0,13,p,p,1e3,1],["slideremovedown",14,8,1,0,"horizontal",!0,!0,14,p,p,1e3,1],["slideremoveright",15,8,1,0,"horizontal",!0,!0,15,p,p,1e3,1],["papercut",16,0,0,600,"",null,null,16,p,p,1e3,2],["3dcurtain-horizontal",17,0,20,100,"vertical",!1,!0,17,l,l,500,7],["3dcurtain-vertical",18,0,10,100,"horizontal",!1,!0,18,l,l,500,5],["cubic",19,0,20,600,"horizontal",!1,!0,19,p,p,500,1],["cube",19,0,20,600,"horizontal",!1,!0,20,p,p,500,1],["flyin",20,0,4,600,"vertical",!1,!0,21,c,p,500,1],["turnoff",21,0,1,500,"horizontal",!1,!0,22,p,p,500,1],["incube",22,0,20,200,"horizontal",!1,!0,23,f,f,500,1],["cubic-horizontal",23,0,20,500,"vertical",!1,!0,24,h,h,500,1],["cube-horizontal",23,0,20,500,"vertical",!1,!0,25,h,h,500,1],["incube-horizontal",24,0,20,500,"vertical",!1,!0,26,f,f,500,1],["turnoff-vertical",25,0,1,200,"horizontal",!1,!0,27,f,f,500,1],["fadefromright",12,1,1,0,"horizontal",!0,!0,28,f,f,1e3,1],["fadefromleft",15,1,1,0,"horizontal",!0,!0,29,f,f,1e3,1],["fadefromtop",14,1,1,0,"horizontal",!0,!0,30,f,f,1e3,1],["fadefrombottom",13,1,1,0,"horizontal",!0,!0,31,f,f,1e3,1],["fadetoleftfadefromright",12,2,1,0,"horizontal",!0,!0,32,f,f,1e3,1],["fadetorightfadefromleft",15,2,1,0,"horizontal",!0,!0,33,f,f,1e3,1],["fadetobottomfadefromtop",14,2,1,0,"horizontal",!0,!0,34,f,f,1e3,1],["fadetotopfadefrombottom",13,2,1,0,"horizontal",!0,!0,35,f,f,1e3,1],["parallaxtoright",12,3,1,0,"horizontal",!0,!0,36,f,d,1500,1],["parallaxtoleft",15,3,1,0,"horizontal",!0,!0,37,f,d,1500,1],["parallaxtotop",14,3,1,0,"horizontal",!0,!0,38,f,r,1500,1],["parallaxtobottom",13,3,1,0,"horizontal",!0,!0,39,f,r,1500,1],["scaledownfromright",12,4,1,0,"horizontal",!0,!0,40,f,d,1e3,1],["scaledownfromleft",15,4,1,0,"horizontal",!0,!0,41,f,d,1e3,1],["scaledownfromtop",14,4,1,0,"horizontal",!0,!0,42,f,d,1e3,1],["scaledownfrombottom",13,4,1,0,"horizontal",!0,!0,43,f,d,1e3,1],["zoomout",13,5,1,0,"horizontal",!0,!0,44,f,d,1e3,1],["zoomin",13,6,1,0,"horizontal",!0,!0,45,f,d,1e3,1],["slidingoverlayup",27,0,1,0,"horizontal",!0,!0,47,l,s,2e3,1],["slidingoverlaydown",28,0,1,0,"horizontal",!0,!0,48,l,s,2e3,1],["slidingoverlayright",30,0,1,0,"horizontal",!0,!0,49,l,s,2e3,1],["slidingoverlayleft",29,0,1,0,"horizontal",!0,!0,50,l,s,2e3,1],["parallaxcirclesup",31,0,1,0,"horizontal",!0,!0,51,f,r,1500,1],["parallaxcirclesdown",32,0,1,0,"horizontal",!0,!0,52,f,r,1500,1],["parallaxcirclesright",33,0,1,0,"horizontal",!0,!0,53,f,r,1500,1],["parallaxcirclesleft",34,0,1,0,"horizontal",!0,!0,54,f,r,1500,1],["notransition",26,0,1,0,"horizontal",!0,null,46,f,d,1e3,1],["parallaxright",12,3,1,0,"horizontal",!0,!0,55,f,d,1500,1],["parallaxleft",15,3,1,0,"horizontal",!0,!0,56,f,d,1500,1],["parallaxup",14,3,1,0,"horizontal",!0,!0,57,f,r,1500,1],["parallaxdown",13,3,1,0,"horizontal",!0,!0,58,f,r,1500,1]]);e.duringslidechange=!0,e.testanims=!1,1==e.testanims&&(e.nexttesttransform=void 0===e.nexttesttransform?34:e.nexttesttransform+1,e.nexttesttransform=e.nexttesttransform>70?0:e.nexttesttransform,o=y[e.nexttesttransform][0],console.log(o+"  "+e.nexttesttransform+"  "+y[e.nexttesttransform][1]+"  "+y[e.nexttesttransform][2])),jQuery.each(["parallaxcircles","slidingoverlay","slide","slideover","slideremove","parallax"],function(t,e){o==e+"horizontal"&&(o=1!=i?e+"left":e+"right"),o==e+"vertical"&&(o=1!=i?e+"up":e+"down")}),"random"==o&&(o=Math.round(Math.random()*y.length-1),o>y.length-1&&(o=y.length-1)),"random-static"==o&&(o=Math.round(Math.random()*u.length-1),o>u.length-1&&(o=u.length-1),o=u[o]),"random-premium"==o&&(o=Math.round(Math.random()*g.length-1),o>g.length-1&&(o=g.length-1),o=g[o]);var T=[12,13,14,15,16,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];if(1==e.isJoomla&&void 0!=window.MooTools&&-1!=T.indexOf(o)){var z=Math.round(Math.random()*(g.length-2))+1;z>g.length-1&&(z=g.length-1),0==z&&(z=1),o=g[z]}n(),w>30&&(w=30),0>w&&(w=0);var L=new Object;return L.nexttrans=w,L.STA=y[m],L.specials=v,L},i=function(t,e){return void 0==e||jQuery.isNumeric(t)?t:void 0==t?t:t.split(",")[e]},n=function(t,e,n,r,s,l,d,h,f){function c(t,e,o,a,i){var n=t.find(".slot"),r=6,s=[2,1.2,.9,.7,.55,.42],l=t.width(),h=t.height();n.wrap('<div class="slot-circle-wrapper" style="overflow:hidden;position:absolute;border:1px solid #fff"></div>');for(var c=0;r>c;c++)n.parent().clone(!1).appendTo(d);t.find(".slot-circle-wrapper").each(function(t){if(r>t){var a=jQuery(this),n=a.find(".slot"),d=l>h?s[t]*l:s[t]*h,c=d,p=0+(c/2-l/2),u=0+(d/2-h/2),g=0!=t?"50%":"0",w=31==o?h/2-d/2:32==o?h/2-d/2:h/2-d/2,v=33==o?l/2-c/2:34==o?l-c:l/2-c/2,m={scale:1,transformOrigo:"50% 50%",width:c+"px",height:d+"px",top:w+"px",left:v+"px",borderRadius:g},x={scale:1,top:h/2-d/2,left:l/2-c/2,ease:i},y=31==o?u:32==o?u:u,T=33==o?p:34==o?p+l/2:p,z={width:l,height:h,autoAlpha:1,top:y+"px",position:"absolute",left:T+"px"},L={top:u+"px",left:p+"px",ease:i},b=e,D=0;f.add(punchgs.TweenLite.fromTo(a,b,m,x),D),f.add(punchgs.TweenLite.fromTo(n,b,z,L),D),f.add(punchgs.TweenLite.fromTo(a,.001,{autoAlpha:0},{autoAlpha:1}),0)}})}var p=l.index(),u=s.index(),g=p>u?1:0;"arrow"==r.sc_indicator&&(g=r.sc_indicator_dir);var w=a(n,r,e,d,g),v=w.STA,m=w.specials,t=w.nexttrans;"on"==d.data("kenburns")&&(t=11);var x=s.data("nexttransid")||0,y=i(s.data("masterspeed"),x);y="default"===y?v[11]:"random"===y?Math.round(1e3*Math.random()+300):void 0!=y?parseInt(y,0):v[11],y=y>r.delay?r.delay:y,y+=v[4],r.slots=i(s.data("slotamount"),x),r.slots=void 0==r.slots||"default"==r.slots?v[12]:"random"==r.slots?Math.round(12*Math.random()+4):r.slots,r.slots=r.slots<1?"boxslide"==e?Math.round(6*Math.random()+3):"flyin"==e?Math.round(4*Math.random()+1):r.slots:r.slots,r.slots=(4==t||5==t||6==t)&&r.slots<3?3:r.slots,r.slots=0!=v[3]?Math.min(r.slots,v[3]):r.slots,r.slots=9==t?r.width/20:10==t?r.height/20:r.slots,r.rotate=i(s.data("rotate"),x),r.rotate=void 0==r.rotate||"default"==r.rotate?0:999==r.rotate||"random"==r.rotate?Math.round(360*Math.random()):r.rotate,r.rotate=!jQuery.support.transition||r.ie||r.ie9?0:r.rotate,11!=t&&(null!=v[7]&&o(h,r,v[7],v[5]),null!=v[6]&&o(d,r,v[6],v[5])),f.add(punchgs.TweenLite.set(d.find(".defaultvid"),{y:0,x:0,top:0,left:0,scale:1}),0),f.add(punchgs.TweenLite.set(h.find(".defaultvid"),{y:0,x:0,top:0,left:0,scale:1}),0),f.add(punchgs.TweenLite.set(d.find(".defaultvid"),{y:"+0%",x:"+0%"}),0),f.add(punchgs.TweenLite.set(h.find(".defaultvid"),{y:"+0%",x:"+0%"}),0),f.add(punchgs.TweenLite.set(d,{autoAlpha:1,y:"+0%",x:"+0%"}),0),f.add(punchgs.TweenLite.set(h,{autoAlpha:1,y:"+0%",x:"+0%"}),0),f.add(punchgs.TweenLite.set(d.parent(),{backgroundColor:"transparent"}),0),f.add(punchgs.TweenLite.set(h.parent(),{backgroundColor:"transparent"}),0);var T=i(s.data("easein"),x),z=i(s.data("easeout"),x);if(T="default"===T?v[9]||punchgs.Power2.easeInOut:T||v[9]||punchgs.Power2.easeInOut,z="default"===z?v[10]||punchgs.Power2.easeInOut:z||v[10]||punchgs.Power2.easeInOut,0==t){var L=Math.ceil(r.height/r.sloth),b=0;d.find(".slotslide").each(function(t){var e=jQuery(this);b+=1,b==L&&(b=0),f.add(punchgs.TweenLite.from(e,y/600,{opacity:0,top:0-r.sloth,left:0-r.slotw,rotation:r.rotate,force3D:"auto",ease:T}),(15*t+30*b)/1500)})}if(1==t){var D,A=0;d.find(".slotslide").each(function(t){var e=jQuery(this),o=Math.random()*y+300,a=500*Math.random()+200;o+a>D&&(D=a+a,A=t),f.add(punchgs.TweenLite.from(e,o/1e3,{autoAlpha:0,force3D:"auto",rotation:r.rotate,ease:T}),a/1e3)})}if(2==t){var j=new punchgs.TimelineLite;h.find(".slotslide").each(function(){var t=jQuery(this);j.add(punchgs.TweenLite.to(t,y/1e3,{left:r.slotw,ease:T,force3D:"auto",rotation:0-r.rotate}),0),f.add(j,0)}),d.find(".slotslide").each(function(){var t=jQuery(this);j.add(punchgs.TweenLite.from(t,y/1e3,{left:0-r.slotw,ease:T,force3D:"auto",rotation:r.rotate}),0),f.add(j,0)})}if(3==t){var j=new punchgs.TimelineLite;h.find(".slotslide").each(function(){var t=jQuery(this);j.add(punchgs.TweenLite.to(t,y/1e3,{top:r.sloth,ease:T,rotation:r.rotate,force3D:"auto",transformPerspective:600}),0),f.add(j,0)}),d.find(".slotslide").each(function(){var t=jQuery(this);j.add(punchgs.TweenLite.from(t,y/1e3,{top:0-r.sloth,rotation:r.rotate,ease:z,force3D:"auto",transformPerspective:600}),0),f.add(j,0)})}if(4==t||5==t){setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100);var k=y/1e3,j=new punchgs.TimelineLite;h.find(".slotslide").each(function(e){var o=jQuery(this),a=e*k/r.slots;5==t&&(a=(r.slots-e-1)*k/r.slots/1.5),j.add(punchgs.TweenLite.to(o,3*k,{transformPerspective:600,force3D:"auto",top:0+r.height,opacity:.5,rotation:r.rotate,ease:T,delay:a}),0),f.add(j,0)}),d.find(".slotslide").each(function(e){var o=jQuery(this),a=e*k/r.slots;5==t&&(a=(r.slots-e-1)*k/r.slots/1.5),j.add(punchgs.TweenLite.from(o,3*k,{top:0-r.height,opacity:.5,rotation:r.rotate,force3D:"auto",ease:punchgs.eo,delay:a}),0),f.add(j,0)})}if(6==t){r.slots<2&&(r.slots=2),r.slots%2&&(r.slots=r.slots+1);var j=new punchgs.TimelineLite;setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100),h.find(".slotslide").each(function(t){var e=jQuery(this);if(t+1<r.slots/2)var o=90*(t+2);else var o=90*(2+r.slots-t);j.add(punchgs.TweenLite.to(e,(y+o)/1e3,{top:0+r.height,opacity:1,force3D:"auto",rotation:r.rotate,ease:T}),0),f.add(j,0)}),d.find(".slotslide").each(function(t){var e=jQuery(this);if(t+1<r.slots/2)var o=90*(t+2);else var o=90*(2+r.slots-t);j.add(punchgs.TweenLite.from(e,(y+o)/1e3,{top:0-r.height,opacity:1,force3D:"auto",rotation:r.rotate,ease:z}),0),f.add(j,0)})}if(7==t){y=2*y,y>r.delay&&(y=r.delay);var j=new punchgs.TimelineLite;setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100),h.find(".slotslide").each(function(){var t=jQuery(this).find("div");j.add(punchgs.TweenLite.to(t,y/1e3,{left:0-r.slotw/2+"px",top:0-r.height/2+"px",width:2*r.slotw+"px",height:2*r.height+"px",opacity:0,rotation:r.rotate,force3D:"auto",ease:T}),0),f.add(j,0)}),d.find(".slotslide").each(function(t){var e=jQuery(this).find("div");j.add(punchgs.TweenLite.fromTo(e,y/1e3,{left:0,top:0,opacity:0,transformPerspective:600},{left:0-t*r.slotw+"px",ease:z,force3D:"auto",top:"0px",width:r.width,height:r.height,opacity:1,rotation:0,delay:.1}),0),f.add(j,0)})}if(8==t){y=3*y,y>r.delay&&(y=r.delay);var j=new punchgs.TimelineLite;h.find(".slotslide").each(function(){var t=jQuery(this).find("div");j.add(punchgs.TweenLite.to(t,y/1e3,{left:0-r.width/2+"px",top:0-r.sloth/2+"px",width:2*r.width+"px",height:2*r.sloth+"px",force3D:"auto",ease:T,opacity:0,rotation:r.rotate}),0),f.add(j,0)}),d.find(".slotslide").each(function(t){var e=jQuery(this).find("div");j.add(punchgs.TweenLite.fromTo(e,y/1e3,{left:0,top:0,opacity:0,force3D:"auto"},{left:"0px",top:0-t*r.sloth+"px",width:d.find(".defaultimg").data("neww")+"px",height:d.find(".defaultimg").data("newh")+"px",opacity:1,ease:z,rotation:0}),0),f.add(j,0)})}if(9==t||10==t){var M=0;d.find(".slotslide").each(function(t){var e=jQuery(this);M++,f.add(punchgs.TweenLite.fromTo(e,y/1e3,{autoAlpha:0,force3D:"auto",transformPerspective:600},{autoAlpha:1,ease:T,delay:5*t/1e3}),0)})}if(27==t||28==t||29==t||30==t){var P=d.find(".slot"),Q=27==t||28==t?1:2,O=27==t||29==t?"-100%":"+100%",I=27==t||29==t?"+100%":"-100%",X=27==t||29==t?"-80%":"80%",Y=27==t||29==t?"80%":"-80%",S=27==t||29==t?"10%":"-10%",_={overwrite:"all"},C={autoAlpha:0,zIndex:1,force3D:"auto",ease:T},V={position:"inherit",autoAlpha:0,overwrite:"all",zIndex:1},Z={autoAlpha:1,force3D:"auto",ease:z},H={overwrite:"all",zIndex:2},J={autoAlpha:1,force3D:"auto",overwrite:"all",ease:T},N={overwrite:"all",zIndex:2},R={autoAlpha:1,force3D:"auto",ease:T},q=1==Q?"y":"x";_[q]="0px",C[q]=O,V[q]=S,Z[q]="0%",H[q]=I,J[q]=O,N[q]=X,R[q]=Y,P.append('<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'),f.add(punchgs.TweenLite.fromTo(h,y/1e3,_,C),0),f.add(punchgs.TweenLite.fromTo(d.find(".defaultimg"),y/2e3,V,Z),y/2e3),f.add(punchgs.TweenLite.fromTo(P,y/1e3,H,J),0),f.add(punchgs.TweenLite.fromTo(P.find(".slotslide div"),y/1e3,N,R),0)}if(31==t||32==t||33==t||34==t){y=6e3,T=punchgs.Power3.easeInOut;var B=y/1e3;mas=B-B/5,_nt=t,fy=31==_nt?"+100%":32==_nt?"-100%":"0%",fx=33==_nt?"+100%":34==_nt?"-100%":"0%",ty=31==_nt?"-100%":32==_nt?"+100%":"0%",tx=33==_nt?"-100%":34==_nt?"+100%":"0%",f.add(punchgs.TweenLite.fromTo(h,B-.2*B,{y:0,x:0},{y:ty,x:tx,ease:z}),.2*B),f.add(punchgs.TweenLite.fromTo(d,B,{y:fy,x:fx},{y:"0%",x:"0%",ease:T}),0),d.find(".slot").remove(),d.find(".defaultimg").clone().appendTo(d).addClass("slot"),c(d,B,_nt,"in",T)}if(11==t){m>4&&(m=0);var M=0,E=2==m?"#000000":3==m?"#ffffff":"transparent";switch(m){case 0:f.add(punchgs.TweenLite.fromTo(d,y/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:T}),0);break;case 1:f.add(punchgs.TweenLite.fromTo(d,y/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:T}),0),f.add(punchgs.TweenLite.fromTo(h,y/1e3,{autoAlpha:1},{autoAlpha:0,force3D:"auto",ease:T}),0);break;case 2:case 3:case 4:f.add(punchgs.TweenLite.set(h.parent(),{backgroundColor:E,force3D:"auto"}),0),f.add(punchgs.TweenLite.set(d.parent(),{backgroundColor:"transparent",force3D:"auto"}),0),f.add(punchgs.TweenLite.to(h,y/2e3,{autoAlpha:0,force3D:"auto",ease:T}),0),f.add(punchgs.TweenLite.fromTo(d,y/2e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:T}),y/2e3)}f.add(punchgs.TweenLite.set(d.find(".defaultimg"),{autoAlpha:1}),0),f.add(punchgs.TweenLite.set(h.find("defaultimg"),{autoAlpha:1}),0)}if(26==t){var M=0;y=0,f.add(punchgs.TweenLite.fromTo(d,y/1e3,{autoAlpha:0},{autoAlpha:1,force3D:"auto",ease:T}),0),f.add(punchgs.TweenLite.to(h,y/1e3,{autoAlpha:0,force3D:"auto",ease:T}),0),f.add(punchgs.TweenLite.set(d.find(".defaultimg"),{autoAlpha:1}),0),f.add(punchgs.TweenLite.set(h.find("defaultimg"),{autoAlpha:1}),0)}if(12==t||13==t||14==t||15==t){y=y,y>r.delay&&(y=r.delay),setTimeout(function(){punchgs.TweenLite.set(h.find(".defaultimg"),{autoAlpha:0})},100);var F=r.width,G=r.height,K=d.find(".slotslide, .defaultvid"),U=0,W=0,$=1,tt=1,et=1,ot=y/1e3,at=ot;("fullwidth"==r.sliderLayout||"fullscreen"==r.sliderLayout)&&(F=K.width(),G=K.height()),12==t?U=F:15==t?U=0-F:13==t?W=G:14==t&&(W=0-G),1==m&&($=0),2==m&&($=0),3==m&&(ot=y/1300),(4==m||5==m)&&(tt=.6),6==m&&(tt=1.4),(5==m||6==m)&&(et=1.4,$=0,F=0,G=0,U=0,W=0),6==m&&(et=.6);7==m&&(F=0,G=0);var it=d.find(".slotslide"),nt=h.find(".slotslide, .defaultvid");if(f.add(punchgs.TweenLite.set(l,{zIndex:15}),0),f.add(punchgs.TweenLite.set(s,{zIndex:20}),0),8==m?(f.add(punchgs.TweenLite.set(l,{zIndex:20}),0),f.add(punchgs.TweenLite.set(s,{zIndex:15}),0),f.add(punchgs.TweenLite.set(it,{left:0,top:0,scale:1,opacity:1,rotation:0,ease:T,force3D:"auto"}),0)):f.add(punchgs.TweenLite.from(it,ot,{left:U,top:W,scale:et,opacity:$,rotation:r.rotate,ease:T,force3D:"auto"}),0),(4==m||5==m)&&(F=0,G=0),1!=m)switch(t){case 12:f.add(punchgs.TweenLite.to(nt,at,{left:0-F+"px",force3D:"auto",scale:tt,opacity:$,rotation:r.rotate,ease:z}),0);break;case 15:f.add(punchgs.TweenLite.to(nt,at,{left:F+"px",force3D:"auto",scale:tt,opacity:$,rotation:r.rotate,ease:z}),0);break;case 13:f.add(punchgs.TweenLite.to(nt,at,{top:0-G+"px",force3D:"auto",scale:tt,opacity:$,rotation:r.rotate,ease:z}),0);break;case 14:f.add(punchgs.TweenLite.to(nt,at,{top:G+"px",force3D:"auto",scale:tt,opacity:$,rotation:r.rotate,ease:z}),0)}}if(16==t){var j=new punchgs.TimelineLite;f.add(punchgs.TweenLite.set(l,{position:"absolute","z-index":20}),0),f.add(punchgs.TweenLite.set(s,{position:"absolute","z-index":15}),0),l.wrapInner('<div class="tp-half-one" style="position:relative; width:100%;height:100%"></div>'),l.find(".tp-half-one").clone(!0).appendTo(l).addClass("tp-half-two"),l.find(".tp-half-two").removeClass("tp-half-one");var F=r.width,G=r.height;"on"==r.autoHeight&&(G=n.height()),l.find(".tp-half-one .defaultimg").wrap('<div class="tp-papercut" style="width:'+F+"px;height:"+G+'px;"></div>'),l.find(".tp-half-two .defaultimg").wrap('<div class="tp-papercut" style="width:'+F+"px;height:"+G+'px;"></div>'),l.find(".tp-half-two .defaultimg").css({position:"absolute",top:"-50%"}),l.find(".tp-half-two .tp-caption").wrapAll('<div style="position:absolute;top:-50%;left:0px;"></div>'),f.add(punchgs.TweenLite.set(l.find(".tp-half-two"),{width:F,height:G,overflow:"hidden",zIndex:15,position:"absolute",top:G/2,left:"0px",transformPerspective:600,transformOrigin:"center bottom"}),0),f.add(punchgs.TweenLite.set(l.find(".tp-half-one"),{width:F,height:G/2,overflow:"visible",zIndex:10,position:"absolute",top:"0px",left:"0px",transformPerspective:600,transformOrigin:"center top"}),0);var rt=(l.find(".defaultimg"),Math.round(20*Math.random()-10)),st=Math.round(20*Math.random()-10),lt=Math.round(20*Math.random()-10),dt=.4*Math.random()-.2,ht=.4*Math.random()-.2,ft=1*Math.random()+1,ct=1*Math.random()+1,pt=.3*Math.random()+.3;f.add(punchgs.TweenLite.set(l.find(".tp-half-one"),{overflow:"hidden"}),0),f.add(punchgs.TweenLite.fromTo(l.find(".tp-half-one"),y/800,{width:F,height:G/2,position:"absolute",top:"0px",left:"0px",force3D:"auto",transformOrigin:"center top"},{scale:ft,rotation:rt,y:0-G-G/4,autoAlpha:0,ease:T}),0),f.add(punchgs.TweenLite.fromTo(l.find(".tp-half-two"),y/800,{width:F,height:G,overflow:"hidden",position:"absolute",top:G/2,left:"0px",force3D:"auto",transformOrigin:"center bottom"},{scale:ct,rotation:st,y:G+G/4,ease:T,autoAlpha:0,onComplete:function(){punchgs.TweenLite.set(l,{position:"absolute","z-index":15}),punchgs.TweenLite.set(s,{position:"absolute","z-index":20}),l.find(".tp-half-one").length>0&&(l.find(".tp-half-one .defaultimg").unwrap(),l.find(".tp-half-one .slotholder").unwrap()),l.find(".tp-half-two").remove()}}),0),j.add(punchgs.TweenLite.set(d.find(".defaultimg"),{autoAlpha:1}),0),null!=l.html()&&f.add(punchgs.TweenLite.fromTo(s,(y-200)/1e3,{scale:pt,x:r.width/4*dt,y:G/4*ht,rotation:lt,force3D:"auto",transformOrigin:"center center",ease:z},{autoAlpha:1,scale:1,x:0,y:0,rotation:0}),0),f.add(j,0)}if(17==t&&d.find(".slotslide").each(function(t){var e=jQuery(this);f.add(punchgs.TweenLite.fromTo(e,y/800,{opacity:0,rotationY:0,scale:.9,rotationX:-110,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{opacity:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:T,delay:.06*t}),0)}),18==t&&d.find(".slotslide").each(function(t){var e=jQuery(this);f.add(punchgs.TweenLite.fromTo(e,y/500,{autoAlpha:0,rotationY:110,scale:.9,rotationX:10,force3D:"auto",transformPerspective:600,transformOrigin:"center center"},{autoAlpha:1,top:0,left:0,scale:1,rotation:0,rotationX:0,force3D:"auto",rotationY:0,ease:T,delay:.06*t}),0)}),19==t||22==t){var j=new punchgs.TimelineLite;f.add(punchgs.TweenLite.set(l,{zIndex:20}),0),f.add(punchgs.TweenLite.set(s,{zIndex:20}),0),setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100);var ut=90,$=1,gt="center center ";1==g&&(ut=-90),19==t?(gt=gt+"-"+r.height/2,$=0):gt+=r.height/2,punchgs.TweenLite.set(n,{transformStyle:"flat",backfaceVisibility:"hidden",transformPerspective:600}),d.find(".slotslide").each(function(t){var e=jQuery(this);j.add(punchgs.TweenLite.fromTo(e,y/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",left:0,rotationY:r.rotate,z:10,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:gt,rotationX:ut},{left:0,rotationY:0,top:0,z:0,scale:1,force3D:"auto",rotationX:0,delay:50*t/1e3,ease:T}),0),j.add(punchgs.TweenLite.to(e,.1,{autoAlpha:1,delay:50*t/1e3}),0),f.add(j)}),h.find(".slotslide").each(function(t){var e=jQuery(this),o=-90;1==g&&(o=90),j.add(punchgs.TweenLite.fromTo(e,y/1e3,{transformStyle:"flat",backfaceVisibility:"hidden",autoAlpha:1,rotationY:0,top:0,z:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:gt,rotationX:0},{autoAlpha:1,rotationY:r.rotate,top:0,z:10,scale:1,rotationX:o,delay:50*t/1e3,force3D:"auto",ease:z}),0),f.add(j)}),f.add(punchgs.TweenLite.set(l,{zIndex:18}),0)}if(20==t){if(setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100),1==g)var wt=-r.width,ut=80,gt="20% 70% -"+r.height/2;else var wt=r.width,ut=-80,gt="80% 70% -"+r.height/2;d.find(".slotslide").each(function(t){var e=jQuery(this),o=50*t/1e3;f.add(punchgs.TweenLite.fromTo(e,y/1e3,{left:wt,rotationX:40,z:-600,opacity:$,top:0,scale:1,force3D:"auto",transformPerspective:600,transformOrigin:gt,transformStyle:"flat",rotationY:ut},{left:0,rotationX:0,opacity:1,top:0,z:0,scale:1,rotationY:0,delay:o,ease:T}),0)}),h.find(".slotslide").each(function(t){var e=jQuery(this),o=50*t/1e3;if(o=t>0?o+y/9e3:0,1!=g)var a=-r.width/2,i=30,n="20% 70% -"+r.height/2;else var a=r.width/2,i=-30,n="80% 70% -"+r.height/2;z=punchgs.Power2.easeInOut,f.add(punchgs.TweenLite.fromTo(e,y/1e3,{opacity:1,rotationX:0,top:0,z:0,scale:1,left:0,force3D:"auto",transformPerspective:600,transformOrigin:n,transformStyle:"flat",rotationY:0},{opacity:1,rotationX:20,top:0,z:-600,left:a,force3D:"auto",rotationY:i,delay:o,ease:z}),0)})}if(21==t||25==t){setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100);var ut=90,wt=-r.width,vt=-ut;if(1==g)if(25==t){var gt="center top 0";ut=r.rotate}else{var gt="left center 0";vt=r.rotate}else if(wt=r.width,ut=-90,25==t){var gt="center bottom 0";vt=-ut,ut=r.rotate}else{var gt="right center 0";vt=r.rotate}d.find(".slotslide").each(function(t){var e=jQuery(this),o=y/1.5/3;f.add(punchgs.TweenLite.fromTo(e,2*o/1e3,{left:0,transformStyle:"flat",rotationX:vt,z:0,autoAlpha:0,top:0,scale:1,force3D:"auto",transformPerspective:1200,transformOrigin:gt,rotationY:ut},{left:0,rotationX:0,top:0,z:0,autoAlpha:1,scale:1,rotationY:0,force3D:"auto",delay:o/1e3,ease:T}),0)}),1!=g?(wt=-r.width,ut=90,25==t?(gt="center top 0",vt=-ut,ut=r.rotate):(gt="left center 0",vt=r.rotate)):(wt=r.width,ut=-90,25==t?(gt="center bottom 0",vt=-ut,ut=r.rotate):(gt="right center 0",vt=r.rotate)),h.find(".slotslide").each(function(t){var e=jQuery(this);f.add(punchgs.TweenLite.fromTo(e,y/1e3,{left:0,transformStyle:"flat",rotationX:0,z:0,autoAlpha:1,top:0,scale:1,force3D:"auto",transformPerspective:1200,transformOrigin:gt,rotationY:0},{left:0,rotationX:vt,top:0,z:0,autoAlpha:1,force3D:"auto",scale:1,rotationY:ut,ease:z}),0)})}if(23==t||24==t){setTimeout(function(){h.find(".defaultimg").css({opacity:0})},100);var ut=-90,$=1,mt=0;if(1==g&&(ut=90),23==t){var gt="center center -"+r.width/2;$=0}else var gt="center center "+r.width/2;punchgs.TweenLite.set(n,{transformStyle:"preserve-3d",backfaceVisibility:"hidden",perspective:2500}),d.find(".slotslide").each(function(t){var e=jQuery(this);f.add(punchgs.TweenLite.fromTo(e,y/1e3,{left:mt,rotationX:r.rotate,force3D:"auto",opacity:$,top:0,scale:1,transformPerspective:1200,transformOrigin:gt,rotationY:ut},{left:0,rotationX:0,autoAlpha:1,top:0,z:0,scale:1,rotationY:0,delay:50*t/500,ease:T}),0)}),ut=90,1==g&&(ut=-90),h.find(".slotslide").each(function(e){var o=jQuery(this);f.add(punchgs.TweenLite.fromTo(o,y/1e3,{left:0,rotationX:0,top:0,z:0,scale:1,force3D:"auto",transformStyle:"flat",transformPerspective:1200,transformOrigin:gt,rotationY:0},{left:mt,rotationX:r.rotate,top:0,scale:1,rotationY:ut,delay:50*e/500,ease:z}),0),23==t&&f.add(punchgs.TweenLite.fromTo(o,y/2e3,{autoAlpha:1},{autoAlpha:0,delay:50*e/500+y/3e3,ease:z}),0)})}return f}}(jQuery);
///#source 1 1 /app_themes/basic/plugins/rs-plugin/revolution/js/extensions/revolution.extension.video.min.js
/********************************************
 * REVOLUTION 5.2.3 EXTENSION - VIDEO FUNCTIONS
 * @version: 1.7 (16.03.2016)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
*********************************************/
!function(e){function t(e){return void 0==e?-1:jQuery.isNumeric(e)?e:e.split(":").length>1?60*parseInt(e.split(":")[0],0)+parseInt(e.split(":")[1],0):e}var a=jQuery.fn.revolution,i=a.is_mobile();jQuery.extend(!0,a,{preLoadAudio:function(e,t){e.find(".tp-audiolayer").each(function(){var e=jQuery(this),i={};0===e.find("audio").length&&(i.src=void 0!=e.data("videomp4")?e.data("videomp4"):"",i.pre=e.data("videopreload")||"",void 0===e.attr("id")&&e.attr("audio-layer-"+Math.round(199999*Math.random())),i.id=e.attr("id"),i.status="prepared",i.start=jQuery.now(),i.waittime=1e3*e.data("videopreloadwait")||5e3,("auto"==i.pre||"canplaythrough"==i.pre||"canplay"==i.pre||"progress"==i.pre)&&(void 0===t.audioqueue&&(t.audioqueue=[]),t.audioqueue.push(i),a.manageVideoLayer(e,t)))})},preLoadAudioDone:function(e,t,a){t.audioqueue&&t.audioqueue.length>0&&jQuery.each(t.audioqueue,function(t,i){e.data("videomp4")!==i.src||i.pre!==a&&"auto"!==i.pre||(i.status="loaded")})},resetVideo:function(e,d){switch(e.data("videotype")){case"youtube":e.data("player");try{if("on"==e.data("forcerewind")&&!i){var o=t(e.data("videostartat"));o=-1==o?0:o,void 0!=e.data("player")&&(e.data("player").seekTo(o),e.data("player").pauseVideo())}}catch(r){}0==e.find(".tp-videoposter").length&&punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"vimeo":var n=$f(e.find("iframe").attr("id"));try{if("on"==e.data("forcerewind")&&!i){var o=t(e.data("videostartat"));o=-1==o?0:o,n.api("seekTo",o),n.api("pause")}}catch(r){}0==e.find(".tp-videoposter").length&&punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});break;case"html5":if(i&&1==e.data("disablevideoonmobile"))return!1;var s="html5"==e.data("audio")?"audio":"video",l=e.find(s),u=l[0];if(punchgs.TweenLite.to(l,.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),"on"==e.data("forcerewind")&&!e.hasClass("videoisplaying"))try{var o=t(e.data("videostartat"));u.currentTime=-1==o?0:o}catch(r){}("mute"==e.data("volume")||a.lastToggleState(e.data("videomutetoggledby"))||d.globalmute===!0)&&(u.muted=!0)}},isVideoMuted:function(e,t){var a=!1;switch(e.data("videotype")){case"youtube":try{var i=e.data("player");a=i.isMuted()}catch(d){}break;case"vimeo":try{$f(e.find("iframe").attr("id"));"mute"==e.data("volume")&&(a=!0)}catch(d){}break;case"html5":var o="html5"==e.data("audio")?"audio":"video",r=e.find(o),n=r[0];n.muted&&(a=!0)}return a},muteVideo:function(e,t){switch(e.data("videotype")){case"youtube":try{var a=e.data("player");a.mute()}catch(i){}break;case"vimeo":try{var d=$f(e.find("iframe").attr("id"));e.data("volume","mute"),d.api("setVolume",0)}catch(i){}break;case"html5":var o="html5"==e.data("audio")?"audio":"video",r=e.find(o),n=r[0];n.muted=!0}},unMuteVideo:function(e,t){if(t.globalmute!==!0)switch(e.data("videotype")){case"youtube":try{var a=e.data("player");a.unMute()}catch(i){}break;case"vimeo":try{var d=$f(e.find("iframe").attr("id"));e.data("volume","1"),d.api("setVolume",1)}catch(i){}break;case"html5":var o="html5"==e.data("audio")?"audio":"video",r=e.find(o),n=r[0];n.muted=!1}},stopVideo:function(e,t){switch(e.data("videotype")){case"youtube":try{var a=e.data("player");a.pauseVideo()}catch(i){}break;case"vimeo":try{var d=$f(e.find("iframe").attr("id"));d.api("pause")}catch(i){}break;case"html5":var o="html5"==e.data("audio")?"audio":"video",r=e.find(o),n=r[0];void 0!=r&&void 0!=n&&n.pause()}},playVideo:function(e,o){switch(clearTimeout(e.data("videoplaywait")),e.data("videotype")){case"youtube":if(0==e.find("iframe").length)e.append(e.data("videomarkup")),r(e,o,!0);else if(void 0!=e.data("player").playVideo){var n=t(e.data("videostartat")),s=e.data("player").getCurrentTime();1==e.data("nextslideatend-triggered")&&(s=-1,e.data("nextslideatend-triggered",0)),-1!=n&&n>s&&e.data("player").seekTo(n),e.data("player").playVideo()}else e.data("videoplaywait",setTimeout(function(){a.playVideo(e,o)},50));break;case"vimeo":if(0==e.find("iframe").length)e.append(e.data("videomarkup")),r(e,o,!0);else if(e.hasClass("rs-apiready")){var l=e.find("iframe").attr("id"),u=$f(l);void 0==u.api("play")?e.data("videoplaywait",setTimeout(function(){a.playVideo(e,o)},50)):setTimeout(function(){u.api("play");var a=t(e.data("videostartat")),i=e.data("currenttime");1==e.data("nextslideatend-triggered")&&(i=-1,e.data("nextslideatend-triggered",0)),-1!=a&&a>i&&u.api("seekTo",a)},510)}else e.data("videoplaywait",setTimeout(function(){a.playVideo(e,o)},50));break;case"html5":if(i&&1==e.data("disablevideoonmobile"))return!1;var p="html5"==e.data("audio")?"audio":"video",v=e.find(p),c=v[0],g=v.parent();if(1!=g.data("metaloaded"))d(c,"loadedmetadata",function(e){a.resetVideo(e,o),c.play();var i=t(e.data("videostartat")),d=c.currentTime;1==e.data("nextslideatend-triggered")&&(d=-1,e.data("nextslideatend-triggered",0)),-1!=i&&i>d&&(c.currentTime=i)}(e));else{c.play();var n=t(e.data("videostartat")),s=c.currentTime;1==e.data("nextslideatend-triggered")&&(s=-1,e.data("nextslideatend-triggered",0)),-1!=n&&n>s&&(c.currentTime=n)}}},isVideoPlaying:function(e,t){var a=!1;return void 0!=t.playingvideos&&jQuery.each(t.playingvideos,function(t,i){e.attr("id")==i.attr("id")&&(a=!0)}),a},removeMediaFromList:function(e,t){p(e,t)},prepareCoveredVideo:function(e,t,i){var d=i.find("iframe, video"),o=e.split(":")[0],r=e.split(":")[1],n=i.closest(".tp-revslider-slidesli"),s=n.width()/n.height(),l=o/r,u=s/l*100,p=l/s*100;s>l?punchgs.TweenLite.to(d,.001,{height:u+"%",width:"100%",top:-(u-100)/2+"%",left:"0px",position:"absolute"}):punchgs.TweenLite.to(d,.001,{width:p+"%",height:"100%",left:-(p-100)/2+"%",top:"0px",position:"absolute"}),d.hasClass("resizelistener")||(d.addClass("resizelistener"),jQuery(window).resize(function(){clearTimeout(d.data("resizelistener")),d.data("resizelistener",setTimeout(function(){a.prepareCoveredVideo(e,t,i)},30))}))},checkVideoApis:function(e,t,a){var i="https:"===location.protocol?"https":"http";if((void 0!=e.data("ytid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&(t.youtubeapineeded=!0),(void 0!=e.data("ytid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("youtube")>0)&&0==a.addedyt){t.youtubestarttime=jQuery.now(),a.addedyt=1;var d=document.createElement("script");d.src="https://www.youtube.com/iframe_api";var o=document.getElementsByTagName("script")[0],r=!0;jQuery("head").find("*").each(function(){"https://www.youtube.com/iframe_api"==jQuery(this).attr("src")&&(r=!1)}),r&&o.parentNode.insertBefore(d,o)}if((void 0!=e.data("vimeoid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&(t.vimeoapineeded=!0),(void 0!=e.data("vimeoid")||e.find("iframe").length>0&&e.find("iframe").attr("src").toLowerCase().indexOf("vimeo")>0)&&0==a.addedvim){t.vimeostarttime=jQuery.now(),a.addedvim=1;var n=document.createElement("script"),o=document.getElementsByTagName("script")[0],r=!0;n.src=i+"://f.vimeocdn.com/js/froogaloop2.min.js",jQuery("head").find("*").each(function(){jQuery(this).attr("src")==i+"://f.vimeocdn.com/js/froogaloop2.min.js"&&(r=!1)}),r&&o.parentNode.insertBefore(n,o)}return a},manageVideoLayer:function(e,o,n,s){var u=e.data("videoattributes"),p=e.data("ytid"),v=e.data("vimeoid"),c="auto"===e.data("videopreload")||"canplay"===e.data("videopreload")||"canplaythrough"===e.data("videopreload")||"progress"===e.data("videopreload")?"auto":e.data("videopreload"),g=e.data("videomp4"),f=e.data("videowebm"),m=e.data("videoogv"),y=e.data("allowfullscreenvideo"),h=e.data("videocontrols"),b="http",w="loop"==e.data("videoloop")?"loop":"loopandnoslidestop"==e.data("videoloop")?"loop":"",k=void 0!=g||void 0!=f?"html5":void 0!=p&&String(p).length>1?"youtube":void 0!=v&&String(v).length>1?"vimeo":"none",T="html5"==e.data("audio")?"audio":"video",x="html5"==k&&0==e.find(T).length?"html5":"youtube"==k&&0==e.find("iframe").length?"youtube":"vimeo"==k&&0==e.find("iframe").length?"vimeo":"none";switch(w=e.data("nextslideatend")===!0?"":w,e.data("videotype",k),x){case"html5":"controls"!=h&&(h="");var T="video";"html5"==e.data("audio")&&(T="audio",e.addClass("tp-audio-html5"));var L="<"+T+' style="object-fit:cover;background-size:cover;visible:hidden;width:100%; height:100%" class="" '+w+' preload="'+c+'">';"auto"==c&&(o.mediapreload=!0),void 0!=f&&"firefox"==a.get_browser().toLowerCase()&&(L=L+'<source src="'+f+'" type="video/webm" />'),void 0!=g&&(L=L+'<source src="'+g+'" type="video/mp4" />'),void 0!=m&&(L=L+'<source src="'+m+'" type="video/ogg" />'),L=L+"</"+T+">";var V="";("true"===y||y===!0)&&(V='<div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-full-screen">Full-Screen</button></div>'),"controls"==h&&(L+='<div class="tp-video-controls"><div class="tp-video-button-wrap"><button type="button" class="tp-video-button tp-vid-play-pause">Play</button></div><div class="tp-video-seek-bar-wrap"><input  type="range" class="tp-seek-bar" value="0"></div><div class="tp-video-button-wrap"><button  type="button" class="tp-video-button tp-vid-mute">Mute</button></div><div class="tp-video-vol-bar-wrap"><input  type="range" class="tp-volume-bar" min="0" max="1" step="0.1" value="1"></div>'+V+"</div>"),e.data("videomarkup",L),e.append(L),(i&&1==e.data("disablevideoonmobile")||a.isIE(8))&&e.find(T).remove(),e.find(T).each(function(t){var i=this,r=jQuery(this);r.parent().hasClass("html5vid")||r.wrap('<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>');var n=r.parent();1!=n.data("metaloaded")&&d(i,"loadedmetadata",function(e){l(e,o),a.resetVideo(e,o)}(e))});break;case"youtube":b="http","https:"===location.protocol&&(b="https"),"none"==h&&(u=u.replace("controls=1","controls=0"),-1==u.toLowerCase().indexOf("controls")&&(u+="&controls=0"));var C=t(e.data("videostartat")),P=t(e.data("videoendat"));-1!=C&&(u=u+"&start="+C),-1!=P&&(u=u+"&end="+P);var I=u.split("origin="+b+"://"),j="";I.length>1?(j=I[0]+"origin="+b+"://",self.location.href.match(/www/gi)&&!I[1].match(/www/gi)&&(j+="www."),j+=I[1]):j=u;var A="true"===y||y===!0?"allowfullscreen":"";e.data("videomarkup",'<iframe style="visible:hidden" src="'+b+"://www.youtube.com/embed/"+p+"?"+j+'" '+A+' width="100%" height="100%" style="width:100%;height:100%"></iframe>');break;case"vimeo":"https:"===location.protocol&&(b="https"),e.data("videomarkup",'<iframe style="visible:hidden" src="'+b+"://player.vimeo.com/video/"+v+"?autoplay=0&"+u+'" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="100%;height:100%"></iframe>')}var _=i&&"on"==e.data("noposteronmobile");if(void 0!=e.data("videoposter")&&e.data("videoposter").length>2&&!_)0==e.find(".tp-videoposter").length&&e.append('<div class="tp-videoposter noSwipe" style="cursor:pointer; position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:3;background-image:url('+e.data("videoposter")+'); background-size:cover;background-position:center center;"></div>'),0==e.find("iframe").length&&e.find(".tp-videoposter").click(function(){if(a.playVideo(e,o),i){if(1==e.data("disablevideoonmobile"))return!1;punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut})}});else{if(i&&1==e.data("disablevideoonmobile"))return!1;0!=e.find("iframe").length||"youtube"!=k&&"vimeo"!=k||(e.append(e.data("videomarkup")),r(e,o,!1))}"none"!=e.data("dottedoverlay")&&void 0!=e.data("dottedoverlay")&&1!=e.find(".tp-dottedoverlay").length&&e.append('<div class="tp-dottedoverlay '+e.data("dottedoverlay")+'"></div>'),e.addClass("HasListener"),1==e.data("bgvideo")&&punchgs.TweenLite.set(e.find("video, iframe"),{autoAlpha:0})}});var d=function(e,t,a){e.addEventListener?e.addEventListener(t,a,!1):e.attachEvent(t,a,!1)},o=function(e,t,a){var i={};return i.video=e,i.videotype=t,i.settings=a,i},r=function(e,d,r){var l=e.find("iframe"),v="iframe"+Math.round(1e5*Math.random()+1),c=e.data("videoloop"),g="loopandnoslidestop"!=c;if(c="loop"==c||"loopandnoslidestop"==c,1==e.data("forcecover")){e.removeClass("fullscreenvideo").addClass("coverscreenvideo");var f=e.data("aspectratio");void 0!=f&&f.split(":").length>1&&a.prepareCoveredVideo(f,d,e)}if(1==e.data("bgvideo")){var f=e.data("aspectratio");void 0!=f&&f.split(":").length>1&&a.prepareCoveredVideo(f,d,e)}if(l.attr("id",v),r&&e.data("startvideonow",!0),1!==e.data("videolistenerexist"))switch(e.data("videotype")){case"youtube":var m=new YT.Player(v,{events:{onStateChange:function(i){var r=e.closest(".tp-simpleresponsive"),l=(e.data("videorate"),e.data("videostart"),s());if(i.data==YT.PlayerState.PLAYING)punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),"mute"==e.data("volume")||a.lastToggleState(e.data("videomutetoggledby"))||d.globalmute===!0?m.mute():(m.unMute(),m.setVolume(parseInt(e.data("volume"),0)||75)),d.videoplaying=!0,u(e,d),g?d.c.trigger("stoptimer"):d.videoplaying=!1,d.c.trigger("revolution.slide.onvideoplay",o(m,"youtube",e.data())),a.toggleState(e.data("videotoggledby"));else{if(0==i.data&&c){var v=t(e.data("videostartat"));-1!=v&&m.seekTo(v),m.playVideo(),a.toggleState(e.data("videotoggledby"))}!l&&(0==i.data||2==i.data)&&"on"==e.data("showcoveronpause")&&e.find(".tp-videoposter").length>0&&(punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),-1!=i.data&&3!=i.data&&(d.videoplaying=!1,d.tonpause=!1,p(e,d),r.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",o(m,"youtube",e.data())),(void 0==d.currentLayerVideoIsPlaying||d.currentLayerVideoIsPlaying.attr("id")==e.attr("id"))&&a.unToggleState(e.data("videotoggledby"))),0==i.data&&1==e.data("nextslideatend")?(n(),e.data("nextslideatend-triggered",1),d.c.revnext(),p(e,d)):(p(e,d),d.videoplaying=!1,r.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",o(m,"youtube",e.data())),(void 0==d.currentLayerVideoIsPlaying||d.currentLayerVideoIsPlaying.attr("id")==e.attr("id"))&&a.unToggleState(e.data("videotoggledby")))}},onReady:function(a){var d=e.data("videorate");e.data("videostart");if(e.addClass("rs-apiready"),void 0!=d&&a.target.setPlaybackRate(parseFloat(d)),e.find(".tp-videoposter").unbind("click"),e.find(".tp-videoposter").click(function(){i||m.playVideo()}),e.data("startvideonow")){e.data("player").playVideo();var o=t(e.data("videostartat"));-1!=o&&e.data("player").seekTo(o)}e.data("videolistenerexist",1)}}});e.data("player",m);break;case"vimeo":for(var y,h=l.attr("src"),b={},w=h,k=/([^&=]+)=([^&]*)/g;y=k.exec(w);)b[decodeURIComponent(y[1])]=decodeURIComponent(y[2]);h=void 0!=b.player_id?h.replace(b.player_id,v):h+"&player_id="+v;try{h=h.replace("api=0","api=1")}catch(T){}h+="&api=1",l.attr("src",h);var m=e.find("iframe")[0],x=(jQuery("#"+v),$f(v));x.addEvent("ready",function(){if(e.addClass("rs-apiready"),x.addEvent("play",function(t){e.data("nextslidecalled",0),punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut}),d.c.trigger("revolution.slide.onvideoplay",o(x,"vimeo",e.data())),d.videoplaying=!0,u(e,d),g?d.c.trigger("stoptimer"):d.videoplaying=!1,"mute"==e.data("volume")||a.lastToggleState(e.data("videomutetoggledby"))||d.globalmute===!0?x.api("setVolume","0"):x.api("setVolume",parseInt(e.data("volume"),0)/100||.75),a.toggleState(e.data("videotoggledby"))}),x.addEvent("playProgress",function(a){var i=t(e.data("videoendat"));if(e.data("currenttime",a.seconds),0!=i&&Math.abs(i-a.seconds)<.3&&i>a.seconds&&1!=e.data("nextslidecalled"))if(c){x.api("play");var o=t(e.data("videostartat"));-1!=o&&x.api("seekTo",o)}else 1==e.data("nextslideatend")&&(e.data("nextslideatend-triggered",1),e.data("nextslidecalled",1),d.c.revnext()),x.api("pause")}),x.addEvent("finish",function(t){p(e,d),d.videoplaying=!1,d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",o(x,"vimeo",e.data())),1==e.data("nextslideatend")&&(e.data("nextslideatend-triggered",1),d.c.revnext()),(void 0==d.currentLayerVideoIsPlaying||d.currentLayerVideoIsPlaying.attr("id")==e.attr("id"))&&a.unToggleState(e.data("videotoggledby"))}),x.addEvent("pause",function(t){e.find(".tp-videoposter").length>0&&"on"==e.data("showcoveronpause")&&(punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find("iframe"),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),d.videoplaying=!1,d.tonpause=!1,p(e,d),d.c.trigger("starttimer"),d.c.trigger("revolution.slide.onvideostop",o(x,"vimeo",e.data())),(void 0==d.currentLayerVideoIsPlaying||d.currentLayerVideoIsPlaying.attr("id")==e.attr("id"))&&a.unToggleState(e.data("videotoggledby"))}),e.find(".tp-videoposter").unbind("click"),e.find(".tp-videoposter").click(function(){return i?void 0:(x.api("play"),!1)}),e.data("startvideonow")){x.api("play");var r=t(e.data("videostartat"));-1!=r&&x.api("seekTo",r)}e.data("videolistenerexist",1)})}else{var L=t(e.data("videostartat"));switch(e.data("videotype")){case"youtube":r&&(e.data("player").playVideo(),-1!=L&&e.data("player").seekTo());break;case"vimeo":if(r){var x=$f(e.find("iframe").attr("id"));x.api("play"),-1!=L&&x.api("seekTo",L)}}}},n=function(){document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen()},s=function(){try{if(void 0!==window.fullScreen)return window.fullScreen;var e=5;return jQuery.browser.webkit&&/Apple Computer/.test(navigator.vendor)&&(e=42),screen.width==window.innerWidth&&Math.abs(screen.height-window.innerHeight)<e}catch(t){}},l=function(e,r,l){if(i&&1==e.data("disablevideoonmobile"))return!1;var v="html5"==e.data("audio")?"audio":"video",c=e.find(v),g=c[0],f=c.parent(),m=e.data("videoloop"),y="loopandnoslidestop"!=m;if(m="loop"==m||"loopandnoslidestop"==m,f.data("metaloaded",1),1!=e.data("bgvideo")||"none"!==e.data("videoloop")&&e.data("videoloop")!==!1||(y=!1),void 0==c.attr("control")&&(0!=e.find(".tp-video-play-button").length||i||e.append('<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'),e.find("video, .tp-poster, .tp-video-play-button").click(function(){e.hasClass("videoisplaying")?g.pause():g.play()})),1==e.data("forcecover")||e.hasClass("fullscreenvideo")||1==e.data("bgvideo"))if(1==e.data("forcecover")||1==e.data("bgvideo")){f.addClass("fullcoveredvideo");var h=e.data("aspectratio")||"4:3";a.prepareCoveredVideo(h,r,e)}else f.addClass("fullscreenvideo");var b=e.find(".tp-vid-play-pause")[0],w=e.find(".tp-vid-mute")[0],k=e.find(".tp-vid-full-screen")[0],T=e.find(".tp-seek-bar")[0],x=e.find(".tp-volume-bar")[0];void 0!=b&&d(b,"click",function(){1==g.paused?g.play():g.pause()}),void 0!=w&&d(w,"click",function(){0==g.muted?(g.muted=!0,w.innerHTML="Unmute"):(g.muted=!1,w.innerHTML="Mute")}),void 0!=k&&k&&d(k,"click",function(){g.requestFullscreen?g.requestFullscreen():g.mozRequestFullScreen?g.mozRequestFullScreen():g.webkitRequestFullscreen&&g.webkitRequestFullscreen()}),void 0!=T&&(d(T,"change",function(){var e=g.duration*(T.value/100);g.currentTime=e}),d(T,"mousedown",function(){e.addClass("seekbardragged"),g.pause()}),d(T,"mouseup",function(){e.removeClass("seekbardragged"),g.play()})),d(g,"canplaythrough",function(){a.preLoadAudioDone(e,r,"canplaythrough")}),d(g,"canplay",function(){a.preLoadAudioDone(e,r,"canplay")}),d(g,"progress",function(){a.preLoadAudioDone(e,r,"progress")}),d(g,"timeupdate",function(){var a=100/g.duration*g.currentTime,i=t(e.data("videoendat")),d=g.currentTime;if(void 0!=T&&(T.value=a),0!=i&&-1!=i&&Math.abs(i-d)<=.3&&i>d&&1!=e.data("nextslidecalled"))if(m){g.play();var o=t(e.data("videostartat"));-1!=o&&(g.currentTime=o)}else 1==e.data("nextslideatend")&&(e.data("nextslideatend-triggered",1),e.data("nextslidecalled",1),r.just_called_nextslide_at_htmltimer=!0,r.c.revnext(),setTimeout(function(){r.just_called_nextslide_at_htmltimer=!1},1e3)),g.pause()}),void 0!=x&&d(x,"change",function(){g.volume=x.value}),d(g,"play",function(){e.data("nextslidecalled",0);var t=e.data("volume");t=void 0!=t&&"mute"!=t?parseFloat(t)/100:t,r.globalmute===!0?g.muted=!0:g.muted=!1,t>1&&(t/=100),"mute"==t?g.muted=!0:void 0!=t&&(g.volume=t),e.addClass("videoisplaying");var i="html5"==e.data("audio")?"audio":"video";u(e,r),y&&"audio"!=i?(r.videoplaying=!0,r.c.trigger("stoptimer"),r.c.trigger("revolution.slide.onvideoplay",o(g,"html5",e.data()))):(r.videoplaying=!1,"audio"!=i&&r.c.trigger("starttimer"),r.c.trigger("revolution.slide.onvideostop",o(g,"html5",e.data()))),punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:0,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find(i),.3,{autoAlpha:1,display:"block",ease:punchgs.Power3.easeInOut});var d=e.find(".tp-vid-play-pause")[0],n=e.find(".tp-vid-mute")[0];void 0!=d&&(d.innerHTML="Pause"),void 0!=n&&g.muted&&(n.innerHTML="Unmute"),a.toggleState(e.data("videotoggledby"))}),d(g,"pause",function(){var t="html5"==e.data("audio")?"audio":"video",i=s();!i&&e.find(".tp-videoposter").length>0&&"on"==e.data("showcoveronpause")&&!e.hasClass("seekbardragged")&&(punchgs.TweenLite.to(e.find(".tp-videoposter"),.3,{autoAlpha:1,force3D:"auto",ease:punchgs.Power3.easeInOut}),punchgs.TweenLite.to(e.find(t),.3,{autoAlpha:0,ease:punchgs.Power3.easeInOut})),e.removeClass("videoisplaying"),r.videoplaying=!1,p(e,r),"audio"!=t&&r.c.trigger("starttimer"),r.c.trigger("revolution.slide.onvideostop",o(g,"html5",e.data()));var d=e.find(".tp-vid-play-pause")[0];void 0!=d&&(d.innerHTML="Play"),(void 0==r.currentLayerVideoIsPlaying||r.currentLayerVideoIsPlaying.attr("id")==e.attr("id"))&&a.unToggleState(e.data("videotoggledby"))}),d(g,"ended",function(){n(),p(e,r),r.videoplaying=!1,p(e,r),"audio"!=v&&r.c.trigger("starttimer"),r.c.trigger("revolution.slide.onvideostop",o(g,"html5",e.data())),e.data("nextslideatend")===!0&&(1==!r.just_called_nextslide_at_htmltimer&&(e.data("nextslideatend-triggered",1),r.c.revnext(),r.just_called_nextslide_at_htmltimer=!0),setTimeout(function(){r.just_called_nextslide_at_htmltimer=!1},1500)),e.removeClass("videoisplaying")})},u=function(e,t){void 0==t.playingvideos&&(t.playingvideos=new Array),e.data("stopallvideos")&&void 0!=t.playingvideos&&t.playingvideos.length>0&&(t.lastplayedvideos=jQuery.extend(!0,[],t.playingvideos),jQuery.each(t.playingvideos,function(e,i){a.stopVideo(i,t)})),t.playingvideos.push(e),t.currentLayerVideoIsPlaying=e},p=function(e,t){void 0!=t.playingvideos&&jQuery.inArray(e,t.playingvideos)>=0&&t.playingvideos.splice(jQuery.inArray(e,t.playingvideos),1)}}(jQuery);

///#source 1 1 /app_themes/HDTemplate/plugins/zetta/js/zm.jquery.js
/**
 * @name jQuery plugin Zetta Menu 1.1
 * @author nK http://codecanyon.net/user/nKdev
 * @description Zetta Menu - mega dropdown menu plugin.
 *
 * @similar Pure CSS3 Zetta Menu - http://codecanyon.net/item/zetta-menu-css3-mega-drop-down-menu/7667949?ref=nKdev
 */
(function($) {
	var zmId = 0,
		prefixes = {};

	// animation test
	$.extend($.support, {
	  animation: (function() {
    	if(window.opera && opera.toString() == "[object Opera]") {
    		return; }
	    var animation = false,
	      animationstring = 'animation',
	      keyframeprefix = '',
	      domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
	      pfx  = '',
	      elm = document.createElement('div');

	    if( elm.style.animationName !== undefined ) { animation = true; }

	    if( animation === false ) {
	      for( var i = 0; i < domPrefixes.length; i++ ) {
	        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
	          pfx = domPrefixes[ i ];
	          animationstring = pfx + 'Animation';
	          keyframeprefix = '-' + pfx.toLowerCase() + '-';
	          animation = true;
	          break;
	        }
	      }
	    }
	    return animation;
	  }())
	});

	// check meta tag
	if(!$('meta[name=viewport]')[0]) {
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">');
	}

	$.fn.zettaMenu = function(method) {
		var namespace = 'zettaMenu';

		// plugin class that does all work
		window[namespace] = function(obj, settings) {
			var base = this;

			base.id = zmId;
			zmId++;
			// default settings
			base.settings = {
				position: '', // left, right, bottom [other values - top position]
				fixed: false,
				sticky: false,
				fullWidth: true,
				responsive: 'switch', // simple, switch[-margin], stack[-margin]
				showOn: 'click', // hover, click, toggle
				effect: {
					name: 'fade', // fade, slide[-top, -bottom, -left, -right]
					speed: 500, // animation speed (ms)
					delay: 200, // delay between animation (ms)
					easing: 'ease' // easing function, can use cubic-bezier()
				}
			}

			// extending with settings parameter
			if (settings) {
				for(var k in settings) {
					if(typeof settings[k] == 'object') {
						$.extend(base.settings[k], settings[k]);
					} else {
						base.settings[k] = settings[k];
					}
				}
			}

			base.obj = obj; // actual DOM element
			base.$obj = $(obj); // jQuery version of DOM element
			base.$liDrop = $('li > ul, li > div', base.$obj).parent().find('> a'); // li with drop children

			// init method
			var _init = function () {
				// replace special zm tags
				$('[zm-size]', base.$obj).each(function(){$(this).css('width', $(this).attr('zm-size'))});
				// base.$obj.html().replace(/zm-size=\"(.*?)\"/gim, 'style=\"width: $1px\"');

				// set ID
				base.$obj.addClass('zm-js-'+base.id);

				// set position menu
				if(base.settings.position == 'left' || base.settings.position == 'right' || base.settings.position == 'bottom')
					base.$obj.addClass('zm-position-'+base.settings.position);

				// set fixed menu
				if(base.settings.fixed)
					base.$obj.addClass('zm-fixed');

				// set full width
				if(base.settings.fullWidth)
					base.$obj.addClass('zm-full-width');

				// add responsive
				if(base.settings.responsive) {
					var rType = base.settings.responsive;

					if(rType == 'stack-margin' || rType == 'switch-margin') {
						base.$obj.addClass('zm-response-margin');
						rType = rType.replace('-margin', '');
					}

					base.$obj.addClass('zm-response-'+rType);
				}

				if(!base.settings.effect) {
					base.settings.effect = {
						name: 'fade',
						speed: 0,
						delay: 0,
						easing: 'linear'
					}
				}

				// set effect
				base.$styles = $(setEffect(base.settings.effect.name));
				base.$obj.after(base.$styles);

				// call to bind events on DOM element
				_bindEvents();
			}

			var setEffect = function(effect) {
				var showFrom = {
							opacity: 0
						},
						showTo = {
							opacity: 1
						};
				switch(effect) {
					case 'slide-top':
						showFrom['transform'] = 'translateY(50px)';
						showFrom['-webkit-transform'] = 'translateY(50px)';
						break;
					case 'slide-bottom':
						showFrom['transform'] = 'translateY(-50px)';
						showFrom['-webkit-transform'] = 'translateY(-50px)';
						break;
					case 'slide-left':
						showFrom['transform'] = 'translateX(50px)';
						showFrom['-webkit-transform'] = 'translateX(50px)';
						break;
					case 'slide-right':
						showFrom['transform'] = 'translateX(-50px)';
						showFrom['-webkit-transform'] = 'translateX(-50px)';
						break;
				}

				$.keyframe.define([{
			    name: 'zm-show',
			    'from': showFrom,
			    'to': showTo
				}]);
				$.keyframe.define([{
			    name: 'zm-hide',
			    'from': showTo,
			    'to': showFrom
				}]);

				var style = [
					'<style>',
						'.zetta-menu.zm-js-'+base.id+' > li > div,',
						'.zetta-menu.zm-js-'+base.id+' li > ul,',
						'.zetta-menu.zm-js-'+base.id+' > li:hover > div,',
						'.zetta-menu.zm-js-'+base.id+' li:hover > ul {',
							'display: none;',
							'z-index: -1;',
						'}',
						'.zetta-menu.zm-js-'+base.id+' > li.zm-opened > div,',
						'.zetta-menu.zm-js-'+base.id+' li.zm-opened > ul {',
							'display: block;',
							'z-index: 20;',
						'}',
					'</style>'
				].join('');

				return style;
			}

			// public destroy method
			base.destroy = function() {
				// unbind events
				base.$liDrop.off('.' + namespace);
				base.$liDrop.parent().off('.' + namespace);
				$(document).off('.' + namespace);

				// remove custom styles
				if(base.$styles) base.$styles.remove();

				// remove classes
				base.$obj.removeClass('zm-js-'+base.id);
				base.$obj.removeClass('zm-position-'+base.settings.position);
				if(base.settings.fixed)
					base.$obj.removeClass('zm-fixed');
				if(base.settings.fullWidth)
					base.$obj.removeClass('zm-full-width');
				if(base.settings.responsive)
					base.$obj.removeClass('zm-response-'+base.settings.responsive);

				// object destruction
				base.$obj.removeData(namespace);
				delete base;
			}

			// plugin events
			var _bindEvents = function() {
				function animationShow(item) {
					item = item.addClass('zm-opened').find('> div, > ul');
                  if(base.settings.effect.speed && $.support.animation) {
                    item.playKeyframe([{
                      name: 'zm-show',
                      duration: base.settings.effect.speed + 'ms',
                      timingFunction: base.settings.effect.easing
                    }], function() {
                      $(this).resetKeyframe();
                    });
                  }
				}
				function animationHide(item) {
					item = item.find('> div, > ul');
                    if(base.settings.effect.speed && $.support.animation) {
                        item.playKeyframe([{
                            name: 'zm-hide',
                            duration: base.settings.effect.speed + 'ms',
                            timingFunction: base.settings.effect.easing
                        }], function(){
                            $(this).resetKeyframe();
                            $(this).parent().removeClass('zm-opened');
                        });
                    } else {
						item.parent().removeClass('zm-opened');
					}
				}

				// click events
				if(base.settings.showOn == 'click') {
					base.$liDrop.on('click.' + namespace, function(e) {
						var li = $(this).parent();
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] != $this[0]) return;
							if($this.hasClass('zm-opened')) {
								animationHide($this);
							} else {
								animationShow($this);
							}
						}.bind(this, li), base.settings.effect.delay);
						animationHide(li.siblings('.zm-opened'));

                        if(!li.hasClass('zm-opened')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
					});
				}
				// toggle events
				else if(base.settings.showOn == 'toggle') {
					base.$liDrop.on('click.' + namespace, function(e) {
						var li = $(this).parent();
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] != $this[0]) return;
							if($this.hasClass('zm-opened')) {
								animationHide($this);
							} else {
								animationShow($this);
							}
						}.bind(this, li), base.settings.effect.delay);
						animationHide(li.siblings('.zm-opened'));

                        if(!li.hasClass('zm-opened')) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
					});
				}
				// hover events
				else {
				    base.$liDrop.on('mouseenter.' + namespace + ' click.' + namespace, function (e) {
						var li = $(this).parent();
						// add opened class and prevent follow a link
						if(!li.hasClass('zm-opened')) {
							setTimeout(function($this) {
								if($this.parent().find("> :hover")[0] != $this[0]) return;
								animationShow($this);
							}.bind(this, li), base.settings.effect.delay);
							e.preventDefault();
							e.stopPropagation();
						}
					});
				}

				if(base.settings.showOn == 'click' || base.settings.showOn == 'hover') {
					base.$liDrop.parent().on('mouseleave.' + namespace, function() {
						// intent
						setTimeout(function($this) {
							if($this.parent().find("> :hover")[0] == $this[0]) return;
							animationHide($this);
						}.bind(this, $(this)), base.settings.effect.delay);
					});
				}

				$(document).on('click.' + namespace + ' touchstart.' + namespace, function(e) {
					// remove opened classes when clicking on document
					if(!$(e.target).parents('.zm-js-'+base.id).length)
						animationHide(base.$liDrop.parent());
				});

				// sticky menu
				if(base.settings.sticky && !base.settings.fixed) {
					var zmHeight = base.$obj.outerHeight(true),
						zmPos = base.$obj.offset(),
						wndH = $(window).height();

					$(window).on('scroll.' + namespace, function() {
						var stickyOn =
							(base.settings.position != 'bottom' && $(this).scrollTop() >= zmPos.top)
							|| (base.settings.position == 'bottom' && $(this).scrollTop() + wndH <= zmPos.top + zmHeight);

						if(stickyOn)
							base.$obj.addClass('zm-fixed');
						else
							base.$obj.removeClass('zm-fixed');
					}).scroll();
				}
			}

			// calling init
			_init();
		}

		// Method calling logic
		return this.each(function() {
			if (typeof $(this).data(namespace) == 'undefined') {
				// Create plugin for this element
				$(this).data(namespace, new window[namespace](this, method));
			} else if (typeof $(this).data(namespace) == 'object' && typeof method == 'undefined') {
				$.error('This element already has jQuery.' + namespace);
			} else if (typeof $(this).data(namespace) == 'object' && typeof $(this).data(namespace)[method] == 'function') {
				// Element has a plugin and method, call it
				$(this).data(namespace)[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.' + namespace);
			}
		});
	}
})(jQuery);

/*!
	jQuery.Keyframes
	https://github.com/jQueryKeyframes/jQuery.Keyframes

	some changes by nK
*/
(function() {
    var $ = jQuery,
    		animationSupport = false,
    		animationString = 'animation',
    		prefix = '',
        vendorPrefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

    (function(){
        var item = $('<div>')[0];
        if( item.style.animationName !== undefined ) {
        	animationSupport = true; return; }

        for( var i = 0; i < domPrefixes.length; i++ ) {
          if( item.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
            prefix = domPrefixes[ i ];
            animationString = prefix + 'Animation';
            vendorPrefix = '-' + prefix.toLowerCase() + '-';
            animationSupport = true;
            return;
          }
        }
        animationSupport = false;
    }());


    var $createKeyframeStyleTag = function(id) {
      return $("<style>").attr({
        'class': "keyframe-style",
        id: id,
        type: "text/css"
      }).appendTo("head");
    };

    $.keyframe = {
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
        	if(animationSupport) {
            var frameName = frameData.name || "";
            var css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css += "}";

            var $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                var $elems = $("*").filter(function() {
                    this.style[animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el, options;
                    $el = $(this);
                    options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
              $createKeyframeStyleTag(frameName).append(css);
            }
          }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        }
    };

    var animationPlayState = "animation-play-state";
    var playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        var animObjToStr = function(obj){
            obj = $.extend({
                duration: '0ms',
                timingFunction: "ease",
                delay: '0ms',
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [obj.name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
        };

        var animationcss = "";

        if($.isArray(frameOptions)){
            var frameOptionsStrings = [];
            for(var i = 0; i < frameOptions.length; i++){
                if (typeof frameOptions[i] === 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        var animationkey = vendorPrefix + "animation";
        var pfx = ["webkit", "moz", "MS", "o", ""];

        var _prefixEvent = function(element, type, callback) {
            for(var i = 0; i < pfx.length; i++){
                if (!pfx[i]) {
                    type = type.toLowerCase();
                }
                var evt = pfx[i] + type;
                element.off(evt).on(evt, callback);
            }
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);

            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };

    if(animationSupport) {
    	$createKeyframeStyleTag("boost-keyframe").append(" .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");
		}

}).call(this);

// bind polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i});

///#source 1 1 /app_themes/HDTemplate/plugins/mmenu/dist/js/jquery.mmenu.all.min.js
/*
 * jQuery mmenu v5.6.4
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *	
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
!function(e){function t(){e[n].glbl||(r={$wndw:e(window),$docu:e(document),$html:e("html"),$body:e("body")},i={},a={},o={},e.each([i,a,o],function(e,t){t.add=function(e){e=e.split(" ");for(var n=0,s=e.length;s>n;n++)t[e[n]]=t.mm(e[n])}}),i.mm=function(e){return"mm-"+e},i.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"),i.umm=function(e){return"mm-"==e.slice(0,3)&&(e=e.slice(3)),e},a.mm=function(e){return"mm-"+e},a.add("parent sub"),o.mm=function(e){return e+".mm"},o.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"),e[n]._c=i,e[n]._d=a,e[n]._e=o,e[n].glbl=r)}var n="mmenu",s="5.6.4";if(!(e[n]&&e[n].version>s)){e[n]=function(e,t,n){this.$menu=e,this._api=["bind","init","update","setSelected","getInstance","openPanel","closePanel","closeAllPanels"],this.opts=t,this.conf=n,this.vars={},this.cbck={},"function"==typeof this.___deprecated&&this.___deprecated(),this._initMenu(),this._initAnchors();var s=this.$pnls.children();return this._initAddons(),this.init(s),"function"==typeof this.___debug&&this.___debug(),this},e[n].version=s,e[n].addons={},e[n].uniqueId=0,e[n].defaults={extensions:[],navbar:{add:!0,title:"Menu",titleLink:"panel"},onClick:{setSelected:!0},slidingSubmenus:!0},e[n].configuration={classNames:{divider:"Divider",inset:"Inset",panel:"Panel",selected:"Selected",spacer:"Spacer",vertical:"Vertical"},clone:!1,openingInterval:25,panelNodetype:"ul, ol, div",transitionDuration:400},e[n].prototype={init:function(e){e=e.not("."+i.nopanel),e=this._initPanels(e),this.trigger("init",e),this.trigger("update")},update:function(){this.trigger("update")},setSelected:function(e){this.$menu.find("."+i.listview).children().removeClass(i.selected),e.addClass(i.selected),this.trigger("setSelected",e)},openPanel:function(t){var s=t.parent(),a=this;if(s.hasClass(i.vertical)){var o=s.parents("."+i.subopened);if(o.length)return void this.openPanel(o.first());s.addClass(i.opened),this.trigger("openPanel",t),this.trigger("openingPanel",t),this.trigger("openedPanel",t)}else{if(t.hasClass(i.current))return;var r=this.$pnls.children("."+i.panel),l=r.filter("."+i.current);r.removeClass(i.highest).removeClass(i.current).not(t).not(l).not("."+i.vertical).addClass(i.hidden),e[n].support.csstransitions||l.addClass(i.hidden),t.hasClass(i.opened)?t.nextAll("."+i.opened).addClass(i.highest).removeClass(i.opened).removeClass(i.subopened):(t.addClass(i.highest),l.addClass(i.subopened)),t.removeClass(i.hidden).addClass(i.current),a.trigger("openPanel",t),setTimeout(function(){t.removeClass(i.subopened).addClass(i.opened),a.trigger("openingPanel",t),a.__transitionend(t,function(){a.trigger("openedPanel",t)},a.conf.transitionDuration)},this.conf.openingInterval)}},closePanel:function(e){var t=e.parent();t.hasClass(i.vertical)&&(t.removeClass(i.opened),this.trigger("closePanel",e),this.trigger("closingPanel",e),this.trigger("closedPanel",e))},closeAllPanels:function(){this.$menu.find("."+i.listview).children().removeClass(i.selected).filter("."+i.vertical).removeClass(i.opened);var e=this.$pnls.children("."+i.panel),t=e.first();this.$pnls.children("."+i.panel).not(t).removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden),this.openPanel(t)},togglePanel:function(e){var t=e.parent();t.hasClass(i.vertical)&&this[t.hasClass(i.opened)?"closePanel":"openPanel"](e)},getInstance:function(){return this},bind:function(e,t){this.cbck[e]=this.cbck[e]||[],this.cbck[e].push(t)},trigger:function(){var e=this,t=Array.prototype.slice.call(arguments),n=t.shift();if(this.cbck[n])for(var s=0,i=this.cbck[n].length;i>s;s++)this.cbck[n][s].apply(e,t)},_initMenu:function(){this.$menu.attr("id",this.$menu.attr("id")||this.__getUniqueId()),this.conf.clone&&(this.$menu=this.$menu.clone(!0),this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function(){e(this).attr("id",i.mm(e(this).attr("id")))})),this.$menu.contents().each(function(){3==e(this)[0].nodeType&&e(this).remove()}),this.$pnls=e('<div class="'+i.panels+'" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu),this.$menu.parent().addClass(i.wrapper);var t=[i.menu];this.opts.slidingSubmenus||t.push(i.vertical),this.opts.extensions=this.opts.extensions.length?"mm-"+this.opts.extensions.join(" mm-"):"",this.opts.extensions&&t.push(this.opts.extensions),this.$menu.addClass(t.join(" "))},_initPanels:function(t){var n=this,s=this.__findAddBack(t,"ul, ol");this.__refactorClass(s,this.conf.classNames.inset,"inset").addClass(i.nolistview+" "+i.nopanel),s.not("."+i.nolistview).addClass(i.listview);var o=this.__findAddBack(t,"."+i.listview).children();this.__refactorClass(o,this.conf.classNames.selected,"selected"),this.__refactorClass(o,this.conf.classNames.divider,"divider"),this.__refactorClass(o,this.conf.classNames.spacer,"spacer"),this.__refactorClass(this.__findAddBack(t,"."+this.conf.classNames.panel),this.conf.classNames.panel,"panel");var r=e(),l=t.add(t.find("."+i.panel)).add(this.__findAddBack(t,"."+i.listview).children().children(this.conf.panelNodetype)).not("."+i.nopanel);this.__refactorClass(l,this.conf.classNames.vertical,"vertical"),this.opts.slidingSubmenus||l.addClass(i.vertical),l.each(function(){var t=e(this),s=t;t.is("ul, ol")?(t.wrap('<div class="'+i.panel+'" />'),s=t.parent()):s.addClass(i.panel);var a=t.attr("id");t.removeAttr("id"),s.attr("id",a||n.__getUniqueId()),t.hasClass(i.vertical)&&(t.removeClass(n.conf.classNames.vertical),s.add(s.parent()).addClass(i.vertical)),r=r.add(s)});var d=e("."+i.panel,this.$menu);r.each(function(t){var s,o,r=e(this),l=r.parent(),d=l.children("a, span").first();if(l.is("."+i.panels)||(l.data(a.sub,r),r.data(a.parent,l)),l.children("."+i.next).length||l.parent().is("."+i.listview)&&(s=r.attr("id"),o=e('<a class="'+i.next+'" href="#'+s+'" data-target="#'+s+'" />').insertBefore(d),d.is("span")&&o.addClass(i.fullsubopen)),!r.children("."+i.navbar).length&&!l.hasClass(i.vertical)){l.parent().is("."+i.listview)?l=l.closest("."+i.panel):(d=l.closest("."+i.panel).find('a[href="#'+r.attr("id")+'"]').first(),l=d.closest("."+i.panel));var c=!1,h=e('<div class="'+i.navbar+'" />');if(l.length){switch(s=l.attr("id"),n.opts.navbar.titleLink){case"anchor":c=d.attr("href");break;case"panel":case"parent":c="#"+s;break;default:c=!1}h.append('<a class="'+i.btn+" "+i.prev+'" href="#'+s+'" data-target="#'+s+'" />').append(e('<a class="'+i.title+'"'+(c?' href="'+c+'"':"")+" />").text(d.text())).prependTo(r),n.opts.navbar.add&&r.addClass(i.hasnavbar)}else n.opts.navbar.title&&(h.append('<a class="'+i.title+'">'+n.opts.navbar.title+"</a>").prependTo(r),n.opts.navbar.add&&r.addClass(i.hasnavbar))}});var c=this.__findAddBack(t,"."+i.listview).children("."+i.selected).removeClass(i.selected).last().addClass(i.selected);c.add(c.parentsUntil("."+i.menu,"li")).filter("."+i.vertical).addClass(i.opened).end().each(function(){e(this).parentsUntil("."+i.menu,"."+i.panel).not("."+i.vertical).first().addClass(i.opened).parentsUntil("."+i.menu,"."+i.panel).not("."+i.vertical).first().addClass(i.opened).addClass(i.subopened)}),c.children("."+i.panel).not("."+i.vertical).addClass(i.opened).parentsUntil("."+i.menu,"."+i.panel).not("."+i.vertical).first().addClass(i.opened).addClass(i.subopened);var h=d.filter("."+i.opened);return h.length||(h=r.first()),h.addClass(i.opened).last().addClass(i.current),r.not("."+i.vertical).not(h.last()).addClass(i.hidden).end().filter(function(){return!e(this).parent().hasClass(i.panels)}).appendTo(this.$pnls),r},_initAnchors:function(){var t=this;r.$body.on(o.click+"-oncanvas","a[href]",function(s){var a=e(this),o=!1,r=t.$menu.find(a).length;for(var l in e[n].addons)if(e[n].addons[l].clickAnchor.call(t,a,r)){o=!0;break}var d=a.attr("href");if(!o&&r&&d.length>1&&"#"==d.slice(0,1))try{var c=e(d,t.$menu);c.is("."+i.panel)&&(o=!0,t[a.parent().hasClass(i.vertical)?"togglePanel":"openPanel"](c))}catch(h){}if(o&&s.preventDefault(),!o&&r&&a.is("."+i.listview+" > li > a")&&!a.is('[rel="external"]')&&!a.is('[target="_blank"]')){t.__valueOrFn(t.opts.onClick.setSelected,a)&&t.setSelected(e(s.target).parent());var u=t.__valueOrFn(t.opts.onClick.preventDefault,a,"#"==d.slice(0,1));u&&s.preventDefault(),t.__valueOrFn(t.opts.onClick.close,a,u)&&t.close()}})},_initAddons:function(){var t;for(t in e[n].addons)e[n].addons[t].add.call(this),e[n].addons[t].add=function(){};for(t in e[n].addons)e[n].addons[t].setup.call(this)},_getOriginalMenuId:function(){var e=this.$menu.attr("id");return e&&e.length&&this.conf.clone&&(e=i.umm(e)),e},__api:function(){var t=this,n={};return e.each(this._api,function(e){var s=this;n[s]=function(){var e=t[s].apply(t,arguments);return"undefined"==typeof e?n:e}}),n},__valueOrFn:function(e,t,n){return"function"==typeof e?e.call(t[0]):"undefined"==typeof e&&"undefined"!=typeof n?n:e},__refactorClass:function(e,t,n){return e.filter("."+t).removeClass(t).addClass(i[n])},__findAddBack:function(e,t){return e.find(t).add(e.filter(t))},__filterListItems:function(e){return e.not("."+i.divider).not("."+i.hidden)},__transitionend:function(e,t,n){var s=!1,i=function(){s||t.call(e[0]),s=!0};e.one(o.transitionend,i),e.one(o.webkitTransitionEnd,i),setTimeout(i,1.1*n)},__getUniqueId:function(){return i.mm(e[n].uniqueId++)}},e.fn[n]=function(s,i){return t(),s=e.extend(!0,{},e[n].defaults,s),i=e.extend(!0,{},e[n].configuration,i),this.each(function(){var t=e(this);if(!t.data(n)){var a=new e[n](t,s,i);a.$menu.data(n,a.__api())}})},e[n].support={touch:"ontouchstart"in window||navigator.msMaxTouchPoints||!1,csstransitions:function(){if("undefined"!=typeof Modernizr&&"undefined"!=typeof Modernizr.csstransitions)return Modernizr.csstransitions;var e=document.body||document.documentElement,t=e.style,n="transition";if("string"==typeof t[n])return!0;var s=["Moz","webkit","Webkit","Khtml","O","ms"];n=n.charAt(0).toUpperCase()+n.substr(1);for(var i=0;i<s.length;i++)if("string"==typeof t[s[i]+n])return!0;return!1}()};var i,a,o,r}}(jQuery),/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="offCanvas";e[t].addons[n]={setup:function(){if(this.opts[n]){var i=this.opts[n],a=this.conf[n];o=e[t].glbl,this._api=e.merge(this._api,["open","close","setPage"]),("top"==i.position||"bottom"==i.position)&&(i.zposition="front"),"string"!=typeof a.pageSelector&&(a.pageSelector="> "+a.pageNodetype),o.$allMenus=(o.$allMenus||e()).add(this.$menu),this.vars.opened=!1;var r=[s.offcanvas];"left"!=i.position&&r.push(s.mm(i.position)),"back"!=i.zposition&&r.push(s.mm(i.zposition)),this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper),this.setPage(o.$page),this._initBlocker(),this["_initWindow_"+n](),this.$menu[a.menuInjectMethod+"To"](a.menuWrapperSelector);var l=window.location.hash;if(l){var d=this._getOriginalMenuId();d&&d==l.slice(1)&&this.open()}}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("offcanvas slideout blocking modal background opening blocker page"),i.add("style"),a.add("resize")},clickAnchor:function(e,t){if(!this.opts[n])return!1;var s=this._getOriginalMenuId();if(s&&e.is('[href="#'+s+'"]'))return this.open(),!0;if(o.$page)return s=o.$page.first().attr("id"),s&&e.is('[href="#'+s+'"]')?(this.close(),!0):!1}},e[t].defaults[n]={position:"left",zposition:"back",blockUI:!0,moveBackground:!0},e[t].configuration[n]={pageNodetype:"div",pageSelector:null,noPageSelector:[],wrapPageIfNeeded:!0,menuWrapperSelector:"body",menuInjectMethod:"prepend"},e[t].prototype.open=function(){if(!this.vars.opened){var e=this;this._openSetup(),setTimeout(function(){e._openFinish()},this.conf.openingInterval),this.trigger("open")}},e[t].prototype._openSetup=function(){var t=this,r=this.opts[n];this.closeAllOthers(),o.$page.each(function(){e(this).data(i.style,e(this).attr("style")||"")}),o.$wndw.trigger(a.resize+"-"+n,[!0]);var l=[s.opened];r.blockUI&&l.push(s.blocking),"modal"==r.blockUI&&l.push(s.modal),r.moveBackground&&l.push(s.background),"left"!=r.position&&l.push(s.mm(this.opts[n].position)),"back"!=r.zposition&&l.push(s.mm(this.opts[n].zposition)),this.opts.extensions&&l.push(this.opts.extensions),o.$html.addClass(l.join(" ")),setTimeout(function(){t.vars.opened=!0},this.conf.openingInterval),this.$menu.addClass(s.current+" "+s.opened)},e[t].prototype._openFinish=function(){var e=this;this.__transitionend(o.$page.first(),function(){e.trigger("opened")},this.conf.transitionDuration),o.$html.addClass(s.opening),this.trigger("opening")},e[t].prototype.close=function(){if(this.vars.opened){var t=this;this.__transitionend(o.$page.first(),function(){t.$menu.removeClass(s.current).removeClass(s.opened),o.$html.removeClass(s.opened).removeClass(s.blocking).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(t.opts[n].position)).removeClass(s.mm(t.opts[n].zposition)),t.opts.extensions&&o.$html.removeClass(t.opts.extensions),o.$page.each(function(){e(this).attr("style",e(this).data(i.style))}),t.vars.opened=!1,t.trigger("closed")},this.conf.transitionDuration),o.$html.removeClass(s.opening),this.trigger("close"),this.trigger("closing")}},e[t].prototype.closeAllOthers=function(){o.$allMenus.not(this.$menu).each(function(){var n=e(this).data(t);n&&n.close&&n.close()})},e[t].prototype.setPage=function(t){var i=this,a=this.conf[n];t&&t.length||(t=o.$body.find(a.pageSelector),a.noPageSelector.length&&(t=t.not(a.noPageSelector.join(", "))),t.length>1&&a.wrapPageIfNeeded&&(t=t.wrapAll("<"+this.conf[n].pageNodetype+" />").parent())),t.each(function(){e(this).attr("id",e(this).attr("id")||i.__getUniqueId())}),t.addClass(s.page+" "+s.slideout),o.$page=t,this.trigger("setPage",t)},e[t].prototype["_initWindow_"+n]=function(){o.$wndw.off(a.keydown+"-"+n).on(a.keydown+"-"+n,function(e){return o.$html.hasClass(s.opened)&&9==e.keyCode?(e.preventDefault(),!1):void 0});var e=0;o.$wndw.off(a.resize+"-"+n).on(a.resize+"-"+n,function(t,n){if(1==o.$page.length&&(n||o.$html.hasClass(s.opened))){var i=o.$wndw.height();(n||i!=e)&&(e=i,o.$page.css("minHeight",i))}})},e[t].prototype._initBlocker=function(){var t=this;this.opts[n].blockUI&&(o.$blck||(o.$blck=e('<div id="'+s.blocker+'" class="'+s.slideout+'" />')),o.$blck.appendTo(o.$body).off(a.touchstart+"-"+n+" "+a.touchmove+"-"+n).on(a.touchstart+"-"+n+" "+a.touchmove+"-"+n,function(e){e.preventDefault(),e.stopPropagation(),o.$blck.trigger(a.mousedown+"-"+n)}).off(a.mousedown+"-"+n).on(a.mousedown+"-"+n,function(e){e.preventDefault(),o.$html.hasClass(s.modal)||(t.closeAllOthers(),t.close())}))};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu scrollBugFix addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="scrollBugFix";e[t].addons[n]={setup:function(){var i=this,r=this.opts[n];this.conf[n];if(o=e[t].glbl,e[t].support.touch&&this.opts.offCanvas&&this.opts.offCanvas.blockUI&&("boolean"==typeof r&&(r={fix:r}),"object"!=typeof r&&(r={}),r=this.opts[n]=e.extend(!0,{},e[t].defaults[n],r),r.fix)){var l=this.$menu.attr("id"),d=!1;this.bind("opening",function(){this.$pnls.children("."+s.current).scrollTop(0)}),o.$docu.on(a.touchmove,function(e){i.vars.opened&&e.preventDefault()}),o.$body.on(a.touchstart,"#"+l+"> ."+s.panels+"> ."+s.current,function(e){i.vars.opened&&(d||(d=!0,0===e.currentTarget.scrollTop?e.currentTarget.scrollTop=1:e.currentTarget.scrollHeight===e.currentTarget.scrollTop+e.currentTarget.offsetHeight&&(e.currentTarget.scrollTop-=1),d=!1))}).on(a.touchmove,"#"+l+"> ."+s.panels+"> ."+s.current,function(t){i.vars.opened&&e(this)[0].scrollHeight>e(this).innerHeight()&&t.stopPropagation()}),o.$wndw.on(a.orientationchange,function(){i.$pnls.children("."+s.current).scrollTop(0).css({"-webkit-overflow-scrolling":"auto"}).css({"-webkit-overflow-scrolling":"touch"})})}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e},clickAnchor:function(e,t){}},e[t].defaults[n]={fix:!0};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu autoHeight addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="autoHeight";e[t].addons[n]={setup:function(){if(this.opts.offCanvas){var i=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof i&&i&&(i={height:"auto"}),"string"==typeof i&&(i={height:i}),"object"!=typeof i&&(i={}),i=this.opts[n]=e.extend(!0,{},e[t].defaults[n],i),"auto"==i.height||"highest"==i.height){this.$menu.addClass(s.autoheight);var a=function(t){if(this.vars.opened){var n=parseInt(this.$pnls.css("top"),10)||0,a=parseInt(this.$pnls.css("bottom"),10)||0,o=0;this.$menu.addClass(s.measureheight),"auto"==i.height?(t=t||this.$pnls.children("."+s.current),t.is("."+s.vertical)&&(t=t.parents("."+s.panel).not("."+s.vertical).first()),o=t.outerHeight()):"highest"==i.height&&this.$pnls.children().each(function(){var t=e(this);t.is("."+s.vertical)&&(t=t.parents("."+s.panel).not("."+s.vertical).first()),o=Math.max(o,t.outerHeight())}),this.$menu.height(o+n+a).removeClass(s.measureheight)}};this.bind("opening",a),"highest"==i.height&&this.bind("init",a),"auto"==i.height&&(this.bind("update",a),this.bind("openPanel",a),this.bind("closePanel",a))}}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("autoheight measureheight"),a.add("resize")},clickAnchor:function(e,t){}},e[t].defaults[n]={height:"default"};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu backButton addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="backButton";e[t].addons[n]={setup:function(){if(this.opts.offCanvas){var i=this,a=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof a&&(a={close:a}),"object"!=typeof a&&(a={}),a=e.extend(!0,{},e[t].defaults[n],a),a.close){var r="#"+i.$menu.attr("id");this.bind("opened",function(e){location.hash!=r&&history.pushState(null,document.title,r)}),e(window).on("popstate",function(e){o.$html.hasClass(s.opened)?(e.stopPropagation(),i.close()):location.hash==r&&(e.stopPropagation(),i.open())})}}},add:function(){return window.history&&window.history.pushState?(s=e[t]._c,i=e[t]._d,void(a=e[t]._e)):void(e[t].addons[n].setup=function(){})},clickAnchor:function(e,t){}},e[t].defaults[n]={close:!1};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu columns addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="columns";e[t].addons[n]={setup:function(){var i=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof i&&(i={add:i}),"number"==typeof i&&(i={add:!0,visible:i}),"object"!=typeof i&&(i={}),"number"==typeof i.visible&&(i.visible={min:i.visible,max:i.visible}),i=this.opts[n]=e.extend(!0,{},e[t].defaults[n],i),i.add){i.visible.min=Math.max(1,Math.min(6,i.visible.min)),i.visible.max=Math.max(i.visible.min,Math.min(6,i.visible.max)),this.$menu.addClass(s.columns);for(var a=this.opts.offCanvas?this.$menu.add(o.$html):this.$menu,r=[],l=0;l<=i.visible.max;l++)r.push(s.columns+"-"+l);r=r.join(" ");var d=function(e){u.call(this,this.$pnls.children("."+s.current)),i.hideNavbars&&e.removeClass(s.hasnavbar)},c=function(){var e=this.$pnls.children("."+s.panel).filter("."+s.opened).length;e=Math.min(i.visible.max,Math.max(i.visible.min,e)),a.removeClass(r).addClass(s.columns+"-"+e)},h=function(){this.opts.offCanvas&&o.$html.removeClass(r)},u=function(t){this.$pnls.children("."+s.panel).removeClass(r).filter("."+s.subopened).removeClass(s.hidden).add(t).slice(-i.visible.max).each(function(t){e(this).addClass(s.columns+"-"+t)})};this.bind("open",c),this.bind("close",h),this.bind("init",d),this.bind("openPanel",u),this.bind("openingPanel",c),this.bind("openedPanel",c),this.opts.offCanvas||c.call(this)}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("columns")},clickAnchor:function(t,i){if(!this.opts[n].add)return!1;if(i){var a=t.attr("href");if(a.length>1&&"#"==a.slice(0,1))try{var o=e(a,this.$menu);if(o.is("."+s.panel))for(var r=parseInt(t.closest("."+s.panel).attr("class").split(s.columns+"-")[1].split(" ")[0],10)+1;r!==!1;){var l=this.$pnls.children("."+s.columns+"-"+r);if(!l.length){r=!1;break}r++,l.removeClass(s.subopened).removeClass(s.opened).removeClass(s.current).removeClass(s.highest).addClass(s.hidden)}}catch(d){}}}},e[t].defaults[n]={add:!1,visible:{min:1,max:3},hideNavbars:!1};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="counters";e[t].addons[n]={setup:function(){var a=this,r=this.opts[n];this.conf[n];o=e[t].glbl,"boolean"==typeof r&&(r={add:r,update:r}),"object"!=typeof r&&(r={}),r=this.opts[n]=e.extend(!0,{},e[t].defaults[n],r),this.bind("init",function(t){this.__refactorClass(e("em",t),this.conf.classNames[n].counter,"counter")}),r.add&&this.bind("init",function(t){var n;switch(r.addTo){case"panels":n=t;break;default:n=t.filter(r.addTo)}n.each(function(){var t=e(this).data(i.parent);t&&(t.children("em."+s.counter).length||t.prepend(e('<em class="'+s.counter+'" />')))})}),r.update&&this.bind("update",function(){this.$pnls.children("."+s.panel).each(function(){var t=e(this),n=t.data(i.parent);if(n){var o=n.children("em."+s.counter);o.length&&(t=t.children("."+s.listview),t.length&&o.html(a.__filterListItems(t.children()).length))}})})},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("counter search noresultsmsg")},clickAnchor:function(e,t){}},e[t].defaults[n]={add:!1,addTo:"panels",update:!1},e[t].configuration.classNames[n]={counter:"Counter"};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu dividers addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="dividers";e[t].addons[n]={setup:function(){var i=this,r=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof r&&(r={add:r,fixed:r}),"object"!=typeof r&&(r={}),r=this.opts[n]=e.extend(!0,{},e[t].defaults[n],r),this.bind("init",function(t){this.__refactorClass(e("li",this.$menu),this.conf.classNames[n].collapsed,"collapsed")}),r.add&&this.bind("init",function(t){var n;switch(r.addTo){case"panels":n=t;break;default:n=t.filter(r.addTo)}e("."+s.divider,n).remove(),n.find("."+s.listview).not("."+s.vertical).each(function(){var t="";i.__filterListItems(e(this).children()).each(function(){var n=e.trim(e(this).children("a, span").text()).slice(0,1).toLowerCase();n!=t&&n.length&&(t=n,e('<li class="'+s.divider+'">'+n+"</li>").insertBefore(this))})})}),r.collapse&&this.bind("init",function(t){e("."+s.divider,t).each(function(){var t=e(this),n=t.nextUntil("."+s.divider,"."+s.collapsed);n.length&&(t.children("."+s.subopen).length||(t.wrapInner("<span />"),t.prepend('<a href="#" class="'+s.subopen+" "+s.fullsubopen+'" />')))})}),r.fixed){var l=function(t){t=t||this.$pnls.children("."+s.current);var n=t.find("."+s.divider).not("."+s.hidden);if(n.length){this.$menu.addClass(s.hasdividers);var i=t.scrollTop()||0,a="";t.is(":visible")&&t.find("."+s.divider).not("."+s.hidden).each(function(){e(this).position().top+i<i+1&&(a=e(this).text())}),this.$fixeddivider.text(a)}else this.$menu.removeClass(s.hasdividers)};this.$fixeddivider=e('<ul class="'+s.listview+" "+s.fixeddivider+'"><li class="'+s.divider+'"></li></ul>').prependTo(this.$pnls).children(),this.bind("openPanel",l),this.bind("update",l),this.bind("init",function(t){t.off(a.scroll+"-dividers "+a.touchmove+"-dividers").on(a.scroll+"-dividers "+a.touchmove+"-dividers",function(t){l.call(i,e(this))})})}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("collapsed uncollapsed fixeddivider hasdividers"),a.add("scroll")},clickAnchor:function(e,t){if(this.opts[n].collapse&&t){var i=e.parent();if(i.is("."+s.divider)){var a=i.nextUntil("."+s.divider,"."+s.collapsed);return i.toggleClass(s.opened),a[i.hasClass(s.opened)?"addClass":"removeClass"](s.uncollapsed),!0}}return!1}},e[t].defaults[n]={add:!1,addTo:"panels",fixed:!1,collapse:!1},e[t].configuration.classNames[n]={collapsed:"Collapsed"};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){function t(e,t,n){return t>e&&(e=t),e>n&&(e=n),e}var n="mmenu",s="dragOpen";e[n].addons[s]={setup:function(){if(this.opts.offCanvas){var a=this,o=this.opts[s],l=this.conf[s];if(r=e[n].glbl,"boolean"==typeof o&&(o={open:o}),"object"!=typeof o&&(o={}),o=this.opts[s]=e.extend(!0,{},e[n].defaults[s],o),o.open){var d,c,h,u,p,f={},v=0,m=!1,g=!1,b=0,C=0;switch(this.opts.offCanvas.position){case"left":case"right":f.events="panleft panright",f.typeLower="x",f.typeUpper="X",g="width";break;case"top":case"bottom":f.events="panup pandown",f.typeLower="y",f.typeUpper="Y",g="height"}switch(this.opts.offCanvas.position){case"right":case"bottom":f.negative=!0,u=function(e){e>=r.$wndw[g]()-o.maxStartPos&&(v=1)};break;default:f.negative=!1,u=function(e){e<=o.maxStartPos&&(v=1)}}switch(this.opts.offCanvas.position){case"left":f.open_dir="right",f.close_dir="left";break;case"right":f.open_dir="left",f.close_dir="right";break;case"top":f.open_dir="down",f.close_dir="up";break;case"bottom":f.open_dir="up",f.close_dir="down"}switch(this.opts.offCanvas.zposition){case"front":p=function(){return this.$menu};break;default:p=function(){return e("."+i.slideout)}}var _=this.__valueOrFn(o.pageNode,this.$menu,r.$page);"string"==typeof _&&(_=e(_));var $=new Hammer(_[0],o.vendors.hammer);$.on("panstart",function(e){u(e.center[f.typeLower]),r.$slideOutNodes=p(),m=f.open_dir}).on(f.events+" panend",function(e){v>0&&e.preventDefault()}).on(f.events,function(e){if(d=e["delta"+f.typeUpper],f.negative&&(d=-d),d!=b&&(m=d>=b?f.open_dir:f.close_dir),b=d,b>o.threshold&&1==v){if(r.$html.hasClass(i.opened))return;v=2,a._openSetup(),a.trigger("opening"),r.$html.addClass(i.dragging),C=t(r.$wndw[g]()*l[g].perc,l[g].min,l[g].max)}2==v&&(c=t(b,10,C)-("front"==a.opts.offCanvas.zposition?C:0),f.negative&&(c=-c),h="translate"+f.typeUpper+"("+c+"px )",r.$slideOutNodes.css({"-webkit-transform":"-webkit-"+h,transform:h}))}).on("panend",function(e){2==v&&(r.$html.removeClass(i.dragging),r.$slideOutNodes.css("transform",""),a[m==f.open_dir?"_openFinish":"close"]()),v=0})}}},add:function(){return"function"!=typeof Hammer||Hammer.VERSION<2?void(e[n].addons[s].setup=function(){}):(i=e[n]._c,a=e[n]._d,o=e[n]._e,void i.add("dragging"))},clickAnchor:function(e,t){}},e[n].defaults[s]={open:!1,maxStartPos:100,threshold:50,vendors:{hammer:{}}},e[n].configuration[s]={width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}};var i,a,o,r}(jQuery),/*	
 * jQuery mmenu dropdown addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="dropdown";e[t].addons[n]={setup:function(){if(this.opts.offCanvas){var r=this,l=this.opts[n],d=this.conf[n];if(o=e[t].glbl,"boolean"==typeof l&&l&&(l={drop:l}),"object"!=typeof l&&(l={}),"string"==typeof l.position&&(l.position={of:l.position}),l=this.opts[n]=e.extend(!0,{},e[t].defaults[n],l),l.drop){if("string"!=typeof l.position.of){var c=this.$menu.attr("id");c&&c.length&&(this.conf.clone&&(c=s.umm(c)),l.position.of='[href="#'+c+'"]')}if("string"==typeof l.position.of){var h=e(l.position.of);if(h.length){this.$menu.addClass(s.dropdown),l.tip&&this.$menu.addClass(s.tip),l.event=l.event.split(" "),1==l.event.length&&(l.event[1]=l.event[0]),"hover"==l.event[0]&&h.on(a.mouseenter+"-dropdown",function(){r.open()}),"hover"==l.event[1]&&this.$menu.on(a.mouseleave+"-dropdown",function(){r.close()}),this.bind("opening",function(){this.$menu.data(i.style,this.$menu.attr("style")||""),o.$html.addClass(s.dropdown)}),this.bind("closed",function(){this.$menu.attr("style",this.$menu.data(i.style)),o.$html.removeClass(s.dropdown)});var u=function(i,a){var r=a[0],c=a[1],u="x"==i?"scrollLeft":"scrollTop",p="x"==i?"outerWidth":"outerHeight",f="x"==i?"left":"top",v="x"==i?"right":"bottom",m="x"==i?"width":"height",g="x"==i?"maxWidth":"maxHeight",b=null,C=o.$wndw[u](),_=h.offset()[f]-=C,$=_+h[p](),y=o.$wndw[m](),x=d.offset.button[i]+d.offset.viewport[i];if(l.position[i])switch(l.position[i]){case"left":case"bottom":b="after";break;case"right":case"top":b="before"}null===b&&(b=y/2>_+($-_)/2?"after":"before");var w,k;return"after"==b?(w="x"==i?_:$,k=y-(w+x),r[f]=w+d.offset.button[i],r[v]="auto",c.push(s["x"==i?"tipleft":"tiptop"])):(w="x"==i?$:_,k=w-x,r[v]="calc( 100% - "+(w-d.offset.button[i])+"px )",r[f]="auto",c.push(s["x"==i?"tipright":"tipbottom"])),r[g]=Math.min(e[t].configuration[n][m].max,k),[r,c]},p=function(e){if(this.vars.opened){this.$menu.attr("style",this.$menu.data(i.style));var t=[{},[]];t=u.call(this,"y",t),t=u.call(this,"x",t),this.$menu.css(t[0]),l.tip&&this.$menu.removeClass(s.tipleft+" "+s.tipright+" "+s.tiptop+" "+s.tipbottom).addClass(t[1].join(" "))}};this.bind("opening",p),o.$wndw.on(a.resize+"-dropdown",function(e){p.call(r)}),this.opts.offCanvas.blockUI||o.$wndw.on(a.scroll+"-dropdown",function(e){p.call(r)})}}}}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("dropdown tip tipleft tipright tiptop tipbottom"),a.add("mouseenter mouseleave resize scroll")},clickAnchor:function(e,t){}},e[t].defaults[n]={drop:!1,event:"click",position:{},tip:!0},e[t].configuration[n]={offset:{button:{x:-10,y:10},viewport:{x:20,y:20}},height:{max:880},width:{max:440}};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="fixedElements";e[t].addons[n]={setup:function(){if(this.opts.offCanvas){var s=this.opts[n];this.conf[n];o=e[t].glbl,s=this.opts[n]=e.extend(!0,{},e[t].defaults[n],s);var i=function(e){var t=this.conf.classNames[n].fixed;this.__refactorClass(e.find("."+t),t,"slideout").appendTo(o.$body)};i.call(this,o.$page),this.bind("setPage",i)}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("fixed")},clickAnchor:function(e,t){}},e[t].configuration.classNames[n]={fixed:"Fixed"};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu iconPanels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="iconPanels";e[t].addons[n]={setup:function(){var i=this,a=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof a&&(a={add:a}),"number"==typeof a&&(a={add:!0,visible:a}),"object"!=typeof a&&(a={}),a=this.opts[n]=e.extend(!0,{},e[t].defaults[n],a),a.visible++,a.add){this.$menu.addClass(s.iconpanel);for(var r=[],l=0;l<=a.visible;l++)r.push(s.iconpanel+"-"+l);r=r.join(" ");var d=function(t){t.hasClass(s.vertical)||i.$pnls.children("."+s.panel).removeClass(r).filter("."+s.subopened).removeClass(s.hidden).add(t).not("."+s.vertical).slice(-a.visible).each(function(t){e(this).addClass(s.iconpanel+"-"+t)})};this.bind("openPanel",d),this.bind("init",function(t){d.call(i,i.$pnls.children("."+s.current)),a.hideNavbars&&t.removeClass(s.hasnavbar),t.not("."+s.vertical).each(function(){e(this).children("."+s.subblocker).length||e(this).prepend('<a href="#'+e(this).closest("."+s.panel).attr("id")+'" class="'+s.subblocker+'" />')})})}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("iconpanel subblocker")},clickAnchor:function(e,t){}},e[t].defaults[n]={add:!1,visible:3,hideNavbars:!1};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu navbar addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars";e[t].addons[n]={setup:function(){var i=this,a=this.opts[n],r=this.conf[n];if(o=e[t].glbl,"undefined"!=typeof a){a instanceof Array||(a=[a]);var l={};e.each(a,function(o){var d=a[o];"boolean"==typeof d&&d&&(d={}),"object"!=typeof d&&(d={}),"undefined"==typeof d.content&&(d.content=["prev","title"]),d.content instanceof Array||(d.content=[d.content]),d=e.extend(!0,{},i.opts.navbar,d);var c=d.position,h=d.height;"number"!=typeof h&&(h=1),h=Math.min(4,Math.max(1,h)),"bottom"!=c&&(c="top"),l[c]||(l[c]=0),l[c]++;var u=e("<div />").addClass(s.navbar+" "+s.navbar+"-"+c+" "+s.navbar+"-"+c+"-"+l[c]+" "+s.navbar+"-size-"+h);l[c]+=h-1;for(var p=0,f=0,v=d.content.length;v>f;f++){var m=e[t].addons[n][d.content[f]]||!1;m?p+=m.call(i,u,d,r):(m=d.content[f],m instanceof e||(m=e(d.content[f])),u.append(m))}p+=Math.ceil(u.children().not("."+s.btn).not("."+s.title+"-prev").length/h),p>1&&u.addClass(s.navbar+"-content-"+p),u.children("."+s.btn).length&&u.addClass(s.hasbtns),u.prependTo(i.$menu)});for(var d in l)i.$menu.addClass(s.hasnavbar+"-"+d+"-"+l[d])}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("close hasbtns")},clickAnchor:function(e,t){}},e[t].configuration[n]={breadcrumbSeparator:"/"},e[t].configuration.classNames[n]={};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu navbar addon breadcrumbs content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="breadcrumbs";e[t].addons[n][s]=function(n,s,i){var a=e[t]._c,o=e[t]._d;a.add("breadcrumbs separator");var r=e('<span class="'+a.breadcrumbs+'" />').appendTo(n);this.bind("init",function(t){t.removeClass(a.hasnavbar).each(function(){for(var t=[],n=e(this),s=e('<span class="'+a.breadcrumbs+'"></span>'),r=e(this).children().first(),l=!0;r&&r.length;){r.is("."+a.panel)||(r=r.closest("."+a.panel));var d=r.children("."+a.navbar).children("."+a.title).text();t.unshift(l?"<span>"+d+"</span>":'<a href="#'+r.attr("id")+'">'+d+"</a>"),l=!1,r=r.data(o.parent)}s.append(t.join('<span class="'+a.separator+'">'+i.breadcrumbSeparator+"</span>")).appendTo(n.children("."+a.navbar))})});var l=function(){r.html(this.$pnls.children("."+a.current).children("."+a.navbar).children("."+a.breadcrumbs).html())};return this.bind("openPanel",l),this.bind("init",l),0}}(jQuery),/*	
 * jQuery mmenu navbar addon close content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="close";e[t].addons[n][s]=function(n,s){var i=e[t]._c,a=e[t].glbl,o=e('<a class="'+i.close+" "+i.btn+'" href="#" />').appendTo(n),r=function(e){o.attr("href","#"+e.attr("id"))};return r.call(this,a.$page),this.bind("setPage",r),-1}}(jQuery),/*	
 * jQuery mmenu navbar addon next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="next";e[t].addons[n][s]=function(s,i){var a,o,r=e[t]._c,l=e('<a class="'+r.next+" "+r.btn+'" href="#" />').appendTo(s),d=function(e){e=e||this.$pnls.children("."+r.current);var t=e.find("."+this.conf.classNames[n].panelNext);a=t.attr("href"),o=t.html(),l[a?"attr":"removeAttr"]("href",a),l[a||o?"removeClass":"addClass"](r.hidden),l.html(o)};return this.bind("openPanel",d),this.bind("init",function(){d.call(this)}),-1},e[t].configuration.classNames[n].panelNext="Next"}(jQuery),/*	
 * jQuery mmenu navbar addon prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="prev";e[t].addons[n][s]=function(s,i){var a=e[t]._c,o=e('<a class="'+a.prev+" "+a.btn+'" href="#" />').appendTo(s);this.bind("init",function(e){e.removeClass(a.hasnavbar).children("."+a.navbar).addClass(a.hidden)});var r,l,d=function(e){if(e=e||this.$pnls.children("."+a.current),!e.hasClass(a.vertical)){var t=e.find("."+this.conf.classNames[n].panelPrev);t.length||(t=e.children("."+a.navbar).children("."+a.prev)),r=t.attr("href"),l=t.html(),o[r?"attr":"removeAttr"]("href",r),o[r||l?"removeClass":"addClass"](a.hidden),o.html(l)}};return this.bind("openPanel",d),this.bind("init",function(){d.call(this)}),-1},e[t].configuration.classNames[n].panelPrev="Prev"}(jQuery),/*	
 * jQuery mmenu navbar addon searchfield content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="searchfield";e[t].addons[n][s]=function(n,s){var i=e[t]._c,a=e('<div class="'+i.search+'" />').appendTo(n);return"object"!=typeof this.opts.searchfield&&(this.opts.searchfield={}),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=a,0}}(jQuery),/*	
 * jQuery mmenu navbar addon title content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="navbars",s="title";e[t].addons[n][s]=function(s,i){var a,o,r=e[t]._c,l=e('<a class="'+r.title+'" />').appendTo(s),d=function(e){if(e=e||this.$pnls.children("."+r.current),!e.hasClass(r.vertical)){var t=e.find("."+this.conf.classNames[n].panelTitle);t.length||(t=e.children("."+r.navbar).children("."+r.title)),a=t.attr("href"),o=t.html()||i.title,l[a?"attr":"removeAttr"]("href",a),l[a||o?"removeClass":"addClass"](r.hidden),l.html(o)}};return this.bind("openPanel",d),this.bind("init",function(e){d.call(this)}),0},e[t].configuration.classNames[n].panelTitle="Title"}(jQuery),/*	
 * jQuery mmenu screenReader addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){function t(e,t,n){e.prop("aria-"+t,n)[n?"attr":"removeAttr"]("aria-"+t,"true")}function n(e){return'<span class="'+a.sronly+'">'+e+"</span>"}var s="mmenu",i="screenReader";e[s].addons[i]={setup:function(){var o=this.opts[i],r=this.conf[i];if(l=e[s].glbl,"boolean"==typeof o&&(o={aria:o,text:o}),"object"!=typeof o&&(o={}),o=this.opts[i]=e.extend(!0,{},e[s].defaults[i],o),o.aria){if(this.opts.offCanvas){var d=function(){t(this.$menu,"hidden",!1)},c=function(){t(this.$menu,"hidden",!0)};this.bind("open",d),this.bind("close",c),c.call(this)}var h=function(){t(this.$menu.find("."+a.hidden),"hidden",!0),t(this.$menu.find('[aria-hidden="true"]').not("."+a.hidden),"hidden",!1)},u=function(e){t(this.$pnls.children("."+a.panel).not(e).not("."+a.hidden),"hidden",!0),t(e,"hidden",!1)};this.bind("update",h),this.bind("openPanel",h),this.bind("openPanel",u);var p=function(e){t(e.find("."+a.prev+", ."+a.next),"haspopup",!0)};this.bind("init",p),p.call(this,this.$menu.children("."+a.navbar))}if(o.text){var f=function(t){t.children("."+a.navbar).children("."+a.prev).html(n(r.text.closeSubmenu)).end().children("."+a.next).html(n(r.text.openSubmenu)).end().children("."+a.close).html(n(r.text.closeMenu)),t.is("."+a.panel)&&t.find("."+a.listview).find("."+a.next).each(function(){e(this).html(n(r.text[e(this).parent().is("."+a.vertical)?"toggleSubmenu":"openSubmenu"]))})};this.bind("init",f),f.call(this,this.$menu)}},add:function(){a=e[s]._c,o=e[s]._d,r=e[s]._e,a.add("sronly")},clickAnchor:function(e,t){}},e[s].defaults[i]={aria:!1,text:!1},e[s].configuration[i]={text:{closeMenu:"Close menu",closeSubmenu:"Close submenu",openSubmenu:"Open submenu",toggleSubmenu:"Toggle submenu"}};var a,o,r,l}(jQuery),/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){function t(e){switch(e){case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:return!0}return!1}var n="mmenu",s="searchfield";e[n].addons[s]={setup:function(){var l=this,d=this.opts[s],c=this.conf[s];r=e[n].glbl,"boolean"==typeof d&&(d={add:d}),"object"!=typeof d&&(d={}),"boolean"==typeof d.resultsPanel&&(d.resultsPanel={add:d.resultsPanel}),d=this.opts[s]=e.extend(!0,{},e[n].defaults[s],d),c=this.conf[s]=e.extend(!0,{},e[n].configuration[s],c),this.bind("close",function(){this.$menu.find("."+i.search).find("input").blur()}),this.bind("init",function(n){if(d.add){var r;switch(d.addTo){case"panels":r=n;break;default:r=this.$menu.find(d.addTo)}if(r.each(function(){var t=e(this);if(!t.is("."+i.panel)||!t.is("."+i.vertical)){if(!t.children("."+i.search).length){var n=l.__valueOrFn(c.clear,t),s=l.__valueOrFn(c.form,t),a=l.__valueOrFn(c.input,t),r=l.__valueOrFn(c.submit,t),h=e("<"+(s?"form":"div")+' class="'+i.search+'" />'),u=e('<input placeholder="'+d.placeholder+'" type="text" autocomplete="off" />');h.append(u);var p;if(a)for(p in a)u.attr(p,a[p]);if(n&&e('<a class="'+i.btn+" "+i.clear+'" href="#" />').appendTo(h).on(o.click+"-searchfield",function(e){e.preventDefault(),u.val("").trigger(o.keyup+"-searchfield")}),s){for(p in s)h.attr(p,s[p]);r&&!n&&e('<a class="'+i.btn+" "+i.next+'" href="#" />').appendTo(h).on(o.click+"-searchfield",function(e){e.preventDefault(),h.submit()})}t.hasClass(i.search)?t.replaceWith(h):t.prepend(h).addClass(i.hassearch)}if(d.noResults){var f=t.closest("."+i.panel).length;if(f||(t=l.$pnls.children("."+i.panel).first()),!t.children("."+i.noresultsmsg).length){var v=t.children("."+i.listview).first();e('<div class="'+i.noresultsmsg+" "+i.hidden+'" />').append(d.noResults)[v.length?"insertAfter":"prependTo"](v.length?v:t)}}}}),d.search){if(d.resultsPanel.add){d.showSubPanels=!1;var h=this.$pnls.children("."+i.resultspanel);h.length||(h=e('<div class="'+i.panel+" "+i.resultspanel+" "+i.hidden+'" />').appendTo(this.$pnls).append('<div class="'+i.navbar+" "+i.hidden+'"><a class="'+i.title+'">'+d.resultsPanel.title+"</a></div>").append('<ul class="'+i.listview+'" />').append(this.$pnls.find("."+i.noresultsmsg).first().clone()),this.init(h))}this.$menu.find("."+i.search).each(function(){var n,r,c=e(this),u=c.closest("."+i.panel).length;u?(n=c.closest("."+i.panel),r=n):(n=e("."+i.panel,l.$menu),r=l.$menu),d.resultsPanel.add&&(n=n.not(h));var p=c.children("input"),f=l.__findAddBack(n,"."+i.listview).children("li"),v=f.filter("."+i.divider),m=l.__filterListItems(f),g="a",b=g+", span",C="",_=function(){var t=p.val().toLowerCase();if(t!=C){if(C=t,d.resultsPanel.add&&h.children("."+i.listview).empty(),n.scrollTop(0),m.add(v).addClass(i.hidden).find("."+i.fullsubopensearch).removeClass(i.fullsubopen+" "+i.fullsubopensearch),m.each(function(){var t=e(this),n=g;(d.showTextItems||d.showSubPanels&&t.find("."+i.next))&&(n=b);var s=t.data(a.searchtext)||t.children(n).text();s.toLowerCase().indexOf(C)>-1&&t.add(t.prevAll("."+i.divider).first()).removeClass(i.hidden)}),d.showSubPanels&&n.each(function(t){var n=e(this);l.__filterListItems(n.find("."+i.listview).children()).each(function(){var t=e(this),n=t.data(a.sub);t.removeClass(i.nosubresults),n&&n.find("."+i.listview).children().removeClass(i.hidden)})}),d.resultsPanel.add)if(""===C)this.closeAllPanels(),this.openPanel(this.$pnls.children("."+i.subopened).last());else{var s=e();n.each(function(){var t=l.__filterListItems(e(this).find("."+i.listview).children()).not("."+i.hidden).clone(!0);t.length&&(d.resultsPanel.dividers&&(s=s.add('<li class="'+i.divider+'">'+e(this).children("."+i.navbar).text()+"</li>")),s=s.add(t))}),s.find("."+i.next).remove(),h.children("."+i.listview).append(s),this.openPanel(h)}else e(n.get().reverse()).each(function(t){var n=e(this),s=n.data(a.parent);s&&(l.__filterListItems(n.find("."+i.listview).children()).length?(s.hasClass(i.hidden)&&s.children("."+i.next).not("."+i.fullsubopen).addClass(i.fullsubopen).addClass(i.fullsubopensearch),s.removeClass(i.hidden).removeClass(i.nosubresults).prevAll("."+i.divider).first().removeClass(i.hidden)):u||(n.hasClass(i.opened)&&setTimeout(function(){l.openPanel(s.closest("."+i.panel))},(t+1)*(1.5*l.conf.openingInterval)),s.addClass(i.nosubresults)))});r.find("."+i.noresultsmsg)[m.not("."+i.hidden).length?"addClass":"removeClass"](i.hidden),this.update()}};p.off(o.keyup+"-"+s+" "+o.change+"-"+s).on(o.keyup+"-"+s,function(e){t(e.keyCode)||_.call(l)}).on(o.change+"-"+s,function(e){_.call(l)});var $=c.children("."+i.btn);$.length&&p.on(o.keyup+"-"+s,function(e){$[p.val().length?"removeClass":"addClass"](i.hidden)}),p.trigger(o.keyup+"-"+s)})}}})},add:function(){i=e[n]._c,a=e[n]._d,o=e[n]._e,i.add("clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"),a.add("searchtext"),o.add("change keyup")},clickAnchor:function(e,t){}},e[n].defaults[s]={add:!1,addTo:"panels",placeholder:"Search",noResults:"No results found.",resultsPanel:{add:!1,dividers:!0,title:"Search results"},search:!0,showTextItems:!1,showSubPanels:!0},e[n].configuration[s]={clear:!1,form:!1,input:!1,submit:!1};var i,a,o,r}(jQuery),/*	
 * jQuery mmenu sectionIndexer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="sectionIndexer";e[t].addons[n]={setup:function(){var i=this,r=this.opts[n];this.conf[n];o=e[t].glbl,"boolean"==typeof r&&(r={add:r}),"object"!=typeof r&&(r={}),r=this.opts[n]=e.extend(!0,{},e[t].defaults[n],r),this.bind("init",function(t){if(r.add){var n;switch(r.addTo){case"panels":n=t;break;default:n=e(r.addTo,this.$menu).filter("."+s.panel)}n.find("."+s.divider).closest("."+s.panel).addClass(s.hasindexer)}if(!this.$indexer&&this.$pnls.children("."+s.hasindexer).length){this.$indexer=e('<div class="'+s.indexer+'" />').prependTo(this.$pnls).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'),this.$indexer.children().on(a.mouseover+"-sectionindexer "+s.touchstart+"-sectionindexer",function(t){var n=e(this).attr("href").slice(1),a=i.$pnls.children("."+s.current),o=a.find("."+s.listview),r=!1,l=a.scrollTop();a.scrollTop(0),o.children("."+s.divider).not("."+s.hidden).each(function(){r===!1&&n==e(this).text().slice(0,1).toLowerCase()&&(r=e(this).position().top)}),a.scrollTop(r!==!1?r:l)});var o=function(e){i.$menu[(e.hasClass(s.hasindexer)?"add":"remove")+"Class"](s.hasindexer)};this.bind("openPanel",o),o.call(this,this.$pnls.children("."+s.current))}})},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("indexer hasindexer"),a.add("mouseover touchstart")},clickAnchor:function(e,t){return e.parent().is("."+s.indexer)?!0:void 0}},e[t].defaults[n]={add:!1,addTo:"panels"};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu setSelected addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="setSelected";e[t].addons[n]={setup:function(){var a=this.opts[n];this.conf[n];if(o=e[t].glbl,"boolean"==typeof a&&(a={hover:a,parent:a}),"object"!=typeof a&&(a={}),a=this.opts[n]=e.extend(!0,{},e[t].defaults[n],a),a.current||this.bind("init",function(e){e.find("."+s.listview).children("."+s.selected).removeClass(s.selected)}),a.hover&&this.$menu.addClass(s.hoverselected),a.parent){this.$menu.addClass(s.parentselected);var r=function(e){this.$pnls.find("."+s.listview).find("."+s.next).removeClass(s.selected);for(var t=e.data(i.parent);t&&t.length;)t=t.children("."+s.next).addClass(s.selected).closest("."+s.panel).data(i.parent)};this.bind("openedPanel",r),this.bind("init",function(e){r.call(this,this.$pnls.children("."+s.current))})}},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("hoverselected parentselected")},clickAnchor:function(e,t){}},e[t].defaults[n]={current:!0,hover:!1,parent:!1};var s,i,a,o}(jQuery),/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
function(e){var t="mmenu",n="toggles";e[t].addons[n]={setup:function(){var i=this;this.opts[n],this.conf[n];o=e[t].glbl,this.bind("init",function(t){this.__refactorClass(e("input",t),this.conf.classNames[n].toggle,"toggle"),this.__refactorClass(e("input",t),this.conf.classNames[n].check,"check"),e("input."+s.toggle+", input."+s.check,t).each(function(){var t=e(this),n=t.closest("li"),a=t.hasClass(s.toggle)?"toggle":"check",o=t.attr("id")||i.__getUniqueId();n.children('label[for="'+o+'"]').length||(t.attr("id",o),n.prepend(t),e('<label for="'+o+'" class="'+s[a]+'"></label>').insertBefore(n.children("a, span").last()))})})},add:function(){s=e[t]._c,i=e[t]._d,a=e[t]._e,s.add("toggle check")},clickAnchor:function(e,t){}},e[t].configuration.classNames[n]={toggle:"Toggle",check:"Check"};var s,i,a,o}(jQuery);
///#source 1 1 /app_themes/HDTemplate/plugins/lazyload/jquery.lazyload.js
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.5
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);

///#source 1 1 /app_themes/hdtemplate/plugins/wow/wow.min.js
/*! WOW - v1.0.3 - 2015-01-14
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],e=0,f=b.length;f>e;e++)d=b[e],g.push(function(){var a,b,e,f;for(e=d.addedNodes||[],f=[],a=0,b=e.length;b>a;a++)c=e[a],f.push(this.doSync(c));return f}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=""+a.className+" "+this.config.animateClass,null!=this.config.callback?this.config.callback(a):void 0},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;f=[];for(c in b)d=b[c],a[""+c]=d,f.push(function(){var b,f,g,h;for(g=this.vendors,h=[],b=0,f=g.length;f>b;b++)e=g[b],h.push(a[""+e+c.charAt(0).toUpperCase()+c.substr(1)]=d);return h}.call(this));return f},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(e=d(a),c=e.getPropertyCSSValue(b),i=this.vendors,g=0,h=i.length;h>g;g++)f=i[g],c=c||e.getPropertyCSSValue("-"+f+"-"+b);return c},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);
///#source 1 1 /app_themes/HDTemplate/plugins/glasscase/js/modernizr.custom.js
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
* Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
*/
; window.Modernizr = function (a, b, c) { function C(a) { j.cssText = a } function D(a, b) { return C(n.join(a + ";") + (b || "")) } function E(a, b) { return typeof a === b } function F(a, b) { return !! ~("" + a).indexOf(b) } function G(a, b) { for (var d in a) { var e = a[d]; if (!F(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 } function H(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : E(f, "function") ? f.bind(d || b) : f } return !1 } function I(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + p.join(d + " ") + d).split(" "); return E(b, "string") || E(b, "undefined") ? G(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), H(e, b, c)) } function J() { e.input = function (c) { for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k; return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u } ("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) { for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e; return t } ("search tel url email datetime date month week time datetime-local number range color".split(" ")) } var d = "2.8.3", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k = b.createElement("input"), l = ":)", m = {}.toString, n = " -webkit- -moz- -o- -ms- ".split(" "), o = "Webkit Moz O ms", p = o.split(" "), q = o.toLowerCase().split(" "), r = { svg: "http://www.w3.org/2000/svg" }, s = {}, t = {}, u = {}, v = [], w = v.slice, x, y = function (a, c, d, e) { var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body"); if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j); return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i }, z = function () { function d(d, e) { e = e || b.createElement(a[d] || "div"), d = "on" + d; var f = d in e; return f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = E(e[d], "function"), E(e[d], "undefined") || (e[d] = c), e.removeAttribute(d))), e = null, f } var a = { select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img" }; return d } (), A = {}.hasOwnProperty, B; !E(A, "undefined") && !E(A.call, "undefined") ? B = function (a, b) { return A.call(a, b) } : B = function (a, b) { return b in a && E(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = w.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(w.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(w.call(arguments))) }; return e }), s.flexbox = function () { return I("flexWrap") }, s.flexboxlegacy = function () { return I("boxDirection") }, s.canvas = function () { var a = b.createElement("canvas"); return !!a.getContext && !!a.getContext("2d") }, s.canvastext = function () { return !!e.canvas && !!E(b.createElement("canvas").getContext("2d").fillText, "function") }, s.webgl = function () { return !!a.WebGLRenderingContext }, s.touch = function () { var c; return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) { c = a.offsetTop === 9 }), c }, s.geolocation = function () { return "geolocation" in navigator }, s.postmessage = function () { return !!a.postMessage }, s.websqldatabase = function () { return !!a.openDatabase }, s.indexedDB = function () { return !!I("indexedDB", a) }, s.hashchange = function () { return z("hashchange", a) && (b.documentMode === c || b.documentMode > 7) }, s.history = function () { return !!a.history && !!history.pushState }, s.draganddrop = function () { var a = b.createElement("div"); return "draggable" in a || "ondragstart" in a && "ondrop" in a }, s.websockets = function () { return "WebSocket" in a || "MozWebSocket" in a }, s.rgba = function () { return C("background-color:rgba(150,255,150,.5)"), F(j.backgroundColor, "rgba") }, s.hsla = function () { return C("background-color:hsla(120,40%,100%,.5)"), F(j.backgroundColor, "rgba") || F(j.backgroundColor, "hsla") }, s.multiplebgs = function () { return C("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(j.background) }, s.backgroundsize = function () { return I("backgroundSize") }, s.borderimage = function () { return I("borderImage") }, s.borderradius = function () { return I("borderRadius") }, s.boxshadow = function () { return I("boxShadow") }, s.textshadow = function () { return b.createElement("div").style.textShadow === "" }, s.opacity = function () { return D("opacity:.55"), /^0.55$/.test(j.opacity) }, s.cssanimations = function () { return I("animationName") }, s.csscolumns = function () { return I("columnCount") }, s.cssgradients = function () { var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);"; return C((a + "-webkit- ".split(" ").join(b + a) + n.join(c + a)).slice(0, -a.length)), F(j.backgroundImage, "gradient") }, s.cssreflections = function () { return I("boxReflect") }, s.csstransforms = function () { return !!I("transform") }, s.csstransforms3d = function () { var a = !!I("perspective"); return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b, c) { a = b.offsetLeft === 9 && b.offsetHeight === 3 }), a }, s.csstransitions = function () { return I("transition") }, s.fontface = function () { var a; return y('@font-face {font-family:"font";src:url("https://")}', function (c, d) { var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet, g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : ""; a = /src/i.test(g) && g.indexOf(d.split(" ")[0]) === 0 }), a }, s.generatedcontent = function () { var a; return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function (b) { a = b.offsetHeight >= 3 }), a }, s.video = function () { var a = b.createElement("video"), c = !1; try { if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "") } catch (d) { } return c }, s.audio = function () { var a = b.createElement("audio"), c = !1; try { if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "") } catch (d) { } return c }, s.localstorage = function () { try { return localStorage.setItem(h, h), localStorage.removeItem(h), !0 } catch (a) { return !1 } }, s.sessionstorage = function () { try { return sessionStorage.setItem(h, h), sessionStorage.removeItem(h), !0 } catch (a) { return !1 } }, s.webworkers = function () { return !!a.Worker }, s.applicationcache = function () { return !!a.applicationCache }, s.svg = function () { return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect }, s.inlinesvg = function () { var a = b.createElement("div"); return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg }, s.smil = function () { return !!b.createElementNS && /SVGAnimate/.test(m.call(b.createElementNS(r.svg, "animate"))) }, s.svgclippaths = function () { return !!b.createElementNS && /SVGClipPath/.test(m.call(b.createElementNS(r.svg, "clipPath"))) }; for (var K in s) B(s, K) && (x = K.toLowerCase(), e[x] = s[K](), v.push((e[x] ? "" : "no-") + x)); return e.input || J(), e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) B(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, C(""), i = k = null, function (a, b) { function l(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) } function m() { var a = s.elements; return typeof a == "string" ? a.split(" ") : a } function n(a) { var b = j[a[h]]; return b || (b = {}, i++, a[h] = i, j[i] = b), b } function o(a, c, d) { c || (c = b); if (k) return c.createElement(a); d || (d = n(c)); var g; return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g } function p(a, c) { a || (a = b); if (k) return a.createDocumentFragment(); c = c || n(a); var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; for (; e < g; e++) d.createElement(f[e]); return d } function q(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return s.shivMethods ? o(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(s, b.frag) } function r(a) { a || (a = b); var c = n(a); return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a } var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g, h = "_html5shiv", i = 0, j = {}, k; (function () { try { var a = b.createElement("a"); a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" } () } catch (c) { g = !0, k = !0 } })(); var s = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: c, shivCSS: d.shivCSS !== !1, supportsUnknownElements: k, shivMethods: d.shivMethods !== !1, type: "default", shivDocument: r, createElement: o, createDocumentFragment: p }; a.html5 = s, r(b) } (this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.hasEvent = z, e.testProp = function (a) { return G([a]) }, e.testAllProps = I, e.testStyles = y, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e } (this, this.document), function (a, b, c) { function d(a) { return "[object Function]" == o.call(a) } function e(a) { return "string" == typeof a } function f() { } function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; 1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return "[object Array]" == o.call(a) }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++) c = x[f](c); return c } function g(a, e, f, g, h) { var i = b(a), j = i.autoCallback; i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) } function h(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b } (), a) a.hasOwnProperty(n) && (!c && ! --m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } } (k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var i, j, l = this.yepnope.loader; if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } } (this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };
///#source 1 1 /app_themes/HDTemplate/plugins/glasscase/js/jquery.glasscase.min.js
eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('Q(q(e){"3M 4f";z o,t=e.6D,i=e.8D,s=i&&i.2q,n=/\\s*;\\s*2x\\s*(?:;|$)/i,a="6O",c=q(e){1U(z i,s,n,a=e.R,c=1z t(a/4*3|0),r=0,g=0,l=[0,0],u=0,h=0;a--;)s=e.8A(r++),i=o[s-43],8m!==i&&i!==n&&(l[1]=l[0],l[0]=s,h=h<<6|i,u++,4===u&&(c[g++]=h>>>16,61!==l[1]&&(c[g++]=h>>>8),61!==l[0]&&(c[g++]=h),u=0));1l c};t&&(o=1z t([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),i&&!s.3q&&(s.3q=q(e,o){Q(o||(o="3r/6A"),C.6t)1l 2h e(C.6t("5f",o));z i,s=7R.2q.4l.2s(4k,1),r=C[a].6g(C,s),g=r.7S(","),l=r.4Z(g+1),u=n.6c(r.4Z(0,g));1N.4Y?(i=1z 1N,i.2k=u?"2x":"4X",i.1n=l,i.3u=l.R):t&&(i=u?1z 1N([c(l)],{2L:o}):1z 1N([4V(l)],{2L:o})),e(i)},s.7T=s.66?q(){a="66";z e=C.3q();1l a="6O",e}:s.3q)}("1R"!=1s 2A&&2A||"1R"!=1s 2n&&2n||C.4R||C),"q"!=1s 1N&&"3v"!=1s 1N||"1R"==1s 2W)"q"!=1s 1N&&"3v"!=1s 1N||"1R"==1s 3y||(2A.2W=3y);1E z 1N=q(e){"3M 4f";z o=e.72||e.85||e.86||e.87||q(e){z o=q(e){1l 8b.2q.5G.2s(e).8d(/^\\[3v\\s(.*)\\]$/)[1]},t=q(){C.1n=[]},i=q(e,o,t){C.1n=e,C.3u=e.R,C.2L=o,C.2k=t},s=t.2q,n=i.2q,a=e.8e,c=q(e){C.5y=C[C.8f=e]},r="6x 8g 6v 6b 8l 8o 8q 8r".5H(" "),g=r.R,l=e.2W||e.3y||e,u=l.3K,h=l.4O,m=l,d=e.5T,p=e.8Q,f=e.8U,v=e.6D;1U(i.4Y=n.4Y=!0;g--;)c.2q[r[g]]=g+1;1l l.3K||(m=e.2W={}),m.3K=q(e){z o,t=e.2L;1l 3B===t&&(t="6B/6o-5R"),e 4w i?(o="1n:"+t,"2x"===e.2k?o+";2x,"+e.1n:"4X"===e.2k?o+","+4V(e.1n):d?o+";2x,"+d(e.1n):o+","+5Q(e.1n)):u?u.2s(l,e):2h 0},m.4O=q(e){"1n:"!==e.4Z(0,5)&&h&&h.2s(l,e)},s.3i=q(e){z t=C.1n;Q(v&&(e 4w f||e 4w v)){1U(z s="",n=1z v(e),r=0,g=n.R;g>r;r++)s+=7l.9m(n[r]);t.2i(s)}1E Q("1N"===o(e)||"9j"===o(e)){Q(!a)6i 1z c("6b");z l=1z a;t.2i(l.9h(e))}1E e 4w i?"2x"===e.2k&&p?t.2i(p(e.1n)):"4X"===e.2k?t.2i(4V(e.1n)):"6y"===e.2k&&t.2i(e.1n):("6P"!=1s e&&(e+=""),t.2i(99(5Q(e))))},s.6U=q(e){1l 4k.R||(e=3B),1z i(C.1n.98(""),e,"6y")},s.5G=q(){1l"[3v 72]"},n.4l=q(e,o,t){z s=4k.R;1l 3>s&&(t=3B),1z i(C.1n.4l(e,s>1?o:C.1n.R),t,C.2k)},n.5G=q(){1l"[3v 1N]"},t}(e);1l q(e,t){z i=t?t.2L||"":"",s=1z o;Q(e)1U(z n=0,a=e.R;a>n;n++)s.3i(e[n]);1l s.6U(i)}}("1R"!=1s 2A&&2A||"1R"!=1s 2n&&2n||C.4R||C);z 4z=4z||"1R"!=1s 2F&&2F.69&&2F.69.96(2F)||q(e){"3M 4f";Q("1R"==1s 2F||!/94 [1-9]\\./.6c(2F.93)){z o=e.5C,t=q(){1l e.2W||e.3y||e},i=e.2W||e.3y||e,s=o.6K("5s://5p.5o.5m/76/5P","a"),n=!e.92&&"2E"4W s,a=e.91,c=e.90||a||e.8Z,r=q(o){(e.8Y||e.3d)(q(){6i o},0)},g="6B/6o-5R",l=0,u=[],h=q(){1U(z e=u.R;e--;){z o=u[e];"6P"==1s o?i.4O(o):o.4d()}u.R=0},m=q(e,o,t){o=[].8X(o);1U(z i=o.R;i--;){z s=e["O"+o[i]];Q("q"==1s s)8W{s.2s(e,t||e)}8V(n){r(n)}}},d=q(i,r){z h,d,p,f=C,v=i.2L,y=!1,b=q(){z e=t().3K(i);1l u.2i(e),e},T=q(){m(f,"6V 73 4P 75".5H(" "))},D=q(){(y||!h)&&(h=b(i)),d?d.77.5v=h:2n.8T(h,"8R"),f.1X=f.2w,T()},w=q(e){1l q(){1l f.1X!==f.2w?e.6g(C,4k):2h 0}},L={68:!0,8P:!1};Q(f.1X=f.6e,r||(r="2E"),n){h=b(i),o=e.5C,s=o.6K("5s://5p.5o.5m/76/5P","a"),s.5v=h,s.2E=r;z A=o.8O("8N");1l A.8M("1y",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,3B),s.8L(A),f.1X=f.2w,2h T()}1l e.8K&&v&&v!==g&&(p=i.4l||i.8J,i=p.2s(i,0,i.3u,g),y=!0),a&&"2E"!==r&&(r+=".2E"),(v===g||a)&&(d=e),c?(l+=i.3u,2h c(e.8I,l,w(q(e){e.8H.8G("8F",L,w(q(e){z o=q(){e.6H(r,L,w(q(e){e.8E(w(q(o){o.6N=q(o){d.77.5v=e.8C(),u.2i(e),f.1X=f.2w,m(f,"75",o)},o.4T=q(){z e=o.5b;e.5y!==e.6v&&D()},"6V 73 4P 3G".5H(" ").8B(q(e){o["O"+e]=f["O"+e]}),o.4P(i),f.3G=q(){o.3G(),f.1X=f.2w},f.1X=f.6W}),D)}),D)};e.6H(r,{68:!1},w(q(e){e.4d(),o()}),w(q(e){e.5y===e.6x?o():D()}))}),D)}),D)):2h D()},p=d.2q,f=q(e,o){1l 1z d(e,o)};1l p.3G=q(){z e=C;e.1X=e.2w,m(e,"3G")},p.1X=p.6e=0,p.6W=1,p.2w=2,p.5b=p.8y=p.8x=p.8w=p.8v=p.4T=p.6N=3B,e.8u("5w",h,!1),f.5w=q(){h(),e.8t("5w",h,!1)},f}}("1R"!=1s 2A&&2A||"1R"!=1s 2n&&2n||C.4R);"1R"!=1s 7a&&(7a.8s=4z),q(e,o,t,i){"3M 4f";q s(e,o){z t=C;t.1a=e.4G(\'<G W="8p-3R"></G>\').2O(),t.5Y(o)}z n=o.8n;s.4U={1Y:6a,2M:8k,8j:!0,8i:!0,3W:!0,6j:3,5i:!1,5r:8h,6s:q(){},6u:q(){},1o:"1B",1j:5,2I:!0,2H:!1,2G:0,4a:-1,2c:4,6G:!1,1P:"1w",6M:!0,5I:!0,3h:!1,5K:88,3c:!1,3b:0,3e:0,6T:"83",4D:4,3A:!1,4F:82,6Z:!0,4c:!1,2g:6a,81:"80",4I:!0,4J:-1,4K:-1,78:"7Z 7Y",4C:!0,2X:"4W",3x:"1B",4e:"3w"},s.2q={5Y:q(t){z a=C;a.j=e.5U(!0,{},s.4U,t),a.5V=t,a.2U=s.4U,a.4g=!1;z c=o.2F.7X;("7W"===c||"7V"===c||"7U"===c)&&(a.4g=!0),a.65=n.5f;z r="<G W=\'k-1f-1T\'><G W=\'k-V k-V-2E\'></G><G W=\'k-V k-V-2a\'></G><G W=\'k-V k-V-2l\'></G><G W=\'k-1f-1J\'><G W=\'k-6d\'></G><1C W=\'k-1f-1f\' 1K=\' \' /></G></G>",g="<G W=\'k-2v\'><G W=\'k-2v-1J\'><1C 1K=\' \' /></G></G>",l="<G W=\'k-1g-1T\'><G W=\'k-1g-B-5c\'><G W=\'k-V k-V-6k\'>&3t;</G><G W=\'k-V k-V-6m\'>&3t;</G><G W=\'k-V k-V-6n\'>&3t;</G></G><G W=\'k-1g-E-5c\'><G W=\'k-V k-V-2l\'>&3t;</G></G><G W=\'k-1g-1w-5c\'><G W=\'k-V k-V-2a\'>&3t;</G></G><G W=\'k-1g-6p\'><G W=\'k-1g-1J\'><G W=\'k-1g-1J-1f\'><1C W=\'k-1g-1f\' 1K=\' \' /></G></G></G></G>",u="1w"==a.j.1o||"E"==a.j.1o?"-6q":"",h="<G W=\'k-2P-1T-2l\'><G W=\'k-V k-V-2l"+u+"\'></G></G><G W=\'k-2P-1T-2a\'><G W=\'k-V k-V-2a"+u+"\'></G></G>";Q(a.5g=1q,"B"==a.j.1o||"E"==a.j.1o?a.1a.3i(r):a.1a.4n(r),a.1a.4n(g).4n(l),a.4o=1==n.6w?"k-7D":"k-7y",a.5l=e("<G W=\'"+a.4o+"\'></G>"),a.7w=a.1a.I("."+a.4o),-1!=a.j.4K&&1==n.6w){z m=/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.7s(a.j.4K);Q(m){z d="7r("+5n(m[1],16)+", "+5n(m[2],16)+", "+5n(m[3],16)+", ";a.5l.F({"2f-B-2y":d+"0.2)","2f-1w-2y":d+"0.2)","2f-1B-2y":d+"0.2)","2f-E-2y":d+"1)"})}}a.X=[],a.U=a.1a.I(".k-1f-1T"),a.1e=a.U.I(".k-1f-1J"),a.1t=a.1e.I(".k-1f-1f"),a.1V=a.1e.I(".k-6d").N(),a.2B=a.U.I(".k-V-2E"),a.2r=a.U.I(".k-V-2l"),a.2j=a.U.I(".k-V-2a"),a.1u=a.1a.I(".k-2v").N(),a.2J=a.1u.I(".k-2v-1J"),a.3g=a.2J.I("1C"),a.1x=a.1a.I(".k-1g-1T").N(),a.5A=a.1x.I(".k-1g-6p"),a.2o=a.1x.I(".k-1g-1J"),a.7k=a.2o.I(".k-1g-1J-1f"),a.1M=a.2o.I(".k-1g-1f"),a.3o=a.1x.I(".k-V-2l"),a.3n=a.1x.I(".k-V-2a"),a.6X=a.1x.I(".k-V-6k"),a.2Z=a.1x.I(".k-V-6m").N(),a.2Y=a.1x.I(".k-V-6n").N(),a.1A=a.1a.I("7f"),a.1A.4G("<G W=\'k-2P-1T\'></G>"),a.Y=a.1a.I(".k-2P-1T"),a.Y.3i(h),a.1Z=a.Y.I(".k-2P-1T-2l"),a.3k=a.1Z.I(".k-V-2l"+u),a.1W=a.Y.I(".k-2P-1T-2a"),a.3j=a.1W.I(".k-V-2a"+u),a.H=a.1A.I("2b"),a.H.3I(q(){1U(z o=e.7e(e(C).I("1C").1c("1m")),t=a.H.I(\'1C[1m="\'+o+\'"]\');t.R>1;)t.5N().2O().4d(),a.H=a.1A.I("2b"),t=a.H.I(\'1C[1m="\'+o+\'"]\')}),a.H=a.1A.I("2b"),a.1H=a.H.I("1C"),a.1H.4G(\'<G W="k-2b-1f-1J"></G>\'),a.2u=a.H.I(".k-2b-1f-1J"),a.1A.1h("k-7d"),a.2m=a.1H.R;z p;Q(a.j.4C===!0&&(a.1Q=e(\'<G W="k-1v-1J"><G></G></G>\'),a.7c=a.1Q.I("G"),"1L"===a.j.1P&&(a.j.2X="4W"),p="k-1v-"+a.j.2X+a.j.3x,-1===e.79(p,["k-1v-5M","k-1v-5L","k-1v-4A","k-1v-4y"])&&(p="k-1v-"+a.2U.2X+a.2U.3x),p+=-1===e.79(a.j.4e,["E","1w","3w"])?" k-71-"+a.2U.4e:" k-71-"+a.j.4e,a.1Q.1b(p).4x(a.1u)),a.3l=!1,a.2p=!1,a.3m=0,1!=a.j.5i&&(a.2B.N(),a.2r.N(),a.2j.N()),a.2N=!1,"1L"==a.j.1P&&(a.j.3c=!0,a.j.3b=0,a.j.3e=0),a.Y.1b("E"==a.j.1o||"1w"==a.j.1o?"k-6q":"k-7g"),-1!=a.j.4J&&a.1a.I(".k-V").F("2y",a.j.4J),0==a.j.3W||0==a.65)a.2B.1b("k-N");1E{z f={B:"",1B:"",1w:"",E:""},v="-"+a.U.F("2f-E-J");7h(a.j.6j){3R 1:f.B=v,f.E=v;5E;3R 2:f.B=v,f.1w=v;5E;3R 4:f.1B=v,f.1w=v;5E;7i:f.1B=v,f.E=v}a.2B.F(f)}a.K=0==7j(a.j.2G)&&1d(a.j.2G)>-1&&1d(a.j.2G)<=a.H.R-1?a.j.2G:a.2U.2G,a.2e=1k.4u(a.K/a.j.1j),a.4t=0,a.1p={x:-1,y:-1},a.5x=0,a.4s=!1,a.1I={E:0,B:0},a.1D={E:0,B:0},a.4r=0,a.1G={E:0,B:0},a.1F={E:0,B:0},a.4q=0;z y=a.H.1r(a.K).I("1C").1c("1K");y===i&&(y="3r"),a.1t.1c("1m",a.1H.1r(a.K).1c("1m")).1c("1K",y),a.5t(),e.7m(a.6L()).7n(q(){a.3p(),a.6J()})},6L:q(){q t(e,o,t){C.J=e,C.M=o,C.7o=t}z i=C,s=0,a=i.2m;1l e.7p(q(c){i.1H.3I(q(){e("<1C/>").O("7q",q(){z o=C.J,n=C.M,r=1z t(o,n,!0),g=i.H.I("1C[1m*=\'"+e(C).1c("1m")+"\']").6I("2b").4p();i.X[g]=r,i.5q(g),++s===a&&c.6C()}).O("5b",q(){z r=i.H.I("1C[1m*=\'"+e(C).1c("1m")+"\']").6I("2b").4p(),g=i.H.J(),l=i.H.M(),u=1z t(g,l,!1);Q(i.X[r]=u,C.4T="",n.3s){z h=o.5T("<3s 7t=\'5s://5p.5o.5m/7u/3s\' J=\'"+g+"\' M=\'"+l+"\'><7v J=\'"+g+"\' M=\'"+l+"\' 6z=\'#7x\'/><5k 5k-7z=\'7A\' x=\'"+g/2+"\' y=\'"+l/2+"\' 7B=\'6z:#7C;5j-7E:7F;5j-3u:7G;5j-7H:7I,7J,7K-7L;7M-7N:7O\'>"+i.j.78+"</5k></3s>");i.1H.1r(r).1c("1m","1n:3r/3s+7P;2x,"+h)}i.5q(r),++s===a&&c.6C()}).1c("1m",e(C).1c("1m"))})}).7Q()},5q:q(e){z o=C;o.5e(o.H.1r(e),e),o.2t(o.H.1r(e)),o.H.1r(e).I(".k-2b-1f-1J").1h("k-N"),o.K==e&&(o.2t(o.U),o.1e.1h("k-N"),o.4j(),o.4i())},5t:q(){z e,o=C;Q(("1w"==o.j.1o||"E"==o.j.1o)&&0==o.j.2H&&o.H.R>1){z t=1d(o.H.F("1i-1B")),i=1d(o.j.2M)/o.j.1j-(o.j.1j-1)*t/o.j.1j,s=o.j.1Y/o.j.2M,n=i*s,a=n+o.j.2c+1d(o.j.1Y);o.5g=1k.2C(1q*o.j.1Y/a),e=o.1a.2O().J()>a?a:o.1a.2O().J()}1E e=o.1a.2O().J()>o.j.1Y?o.j.1Y:o.1a.2O().J();Q(o.1a.F({J:e}),o.64(),0==o.j.2H&&1==o.2m?(o.Y.S(0),o.Y.1b("k-N"),o.j.4I=!1):(o.j.2H=!0,o.5Z()),1==o.2m?(o.3o.1b("k-N"),o.3n.1b("k-N")):(o.3o.F("1i-B",-(o.3o.S()/2)),o.3n.F("1i-B",-(o.3n.S()/2))),"B"==o.j.1o||"1B"==o.j.1o){z c=0==o.j.2H?0:o.Y.S();o.1a.F({M:c+o.U.S()+1d(o.j.2c)})}1E{z r=0==o.j.2H?0:o.Y.P();o.1a.F({J:r+o.U.P()+1d(o.j.2c)}),o.1a.F({M:o.U.S()})}},64:q(){z e,o,t=C,i=t.j.1Y,s=t.j.2M;t.U.F({M:"0",J:"0"}),e=t.5g*t.1a.P()/1q,o=e*(s/i),t.U.F({M:1k.1O(o),J:1k.1O(e)}),t.2r.F("1i-B",-(t.2r.S()/2)),t.2j.F("1i-B",-(t.2j.S()/2)),1==t.2m&&(t.2r.1b("k-N"),t.2j.1b("k-N")),t.1e.1b("k-N"),t.4h(t.U)},4j:q(){z e=C;e.1e.F({J:"0",M:"0"}),e.1e.F({J:e.U.P(),M:e.U.S()});z o,t,i,s=e.1e.P()/e.X[e.K].J,n=e.1e.S()/e.X[e.K].M;1>s||1>n?(e.3l=e.j.5I===!0?!0:!1,o=n>s?s:n,t=o*e.X[e.K].J,i=o*e.X[e.K].M):(e.1e.7b("3z.Z"),e.3l=!1,t=e.X[e.K].J,i=e.X[e.K].M),e.1t.F({J:t,M:i}),e.1e.F({J:t,M:i});z a=2*1d(e.U.F("2f-E-J")),c=2*1d(e.U.F("4H-B")),r=e.1e.P()/2*1q/(e.U.P()-a-c),g=e.1e.S()/2*1q/(e.U.P()-a-c);e.1e.F({"1i-E":"-"+r+"%","1i-B":"-"+g+"%"})},6Y:q(){z t=C;t.3g.1c("1m",t.1t.1c("1m")).1c("1K",t.1t.1c("1K")),"1L"!=t.j.1P&&(t.2N=!1,t.j=e.5U(!0,{},t.2U,t.5V),t.1u.4x(t.1a).1h("k-2v-1L"));1U(z s=2*1d(t.1u.F("2f-E-J")),n=2*1d(t.U.F("4H-B")),a="1L"==t.j.1P?n:s+n,c="1L"==t.j.1P?n:s+n,r=0;2>r&&(a+=t.j.3c&&t.j.3b>0?1d(t.j.3b)<t.X[t.K].J?1d(t.j.3b):t.X[t.K].J:t.1e.P(),c+=t.j.3c&&t.j.3e>0?1d(t.j.3e)<t.X[t.K].M?1d(t.j.3e):t.X[t.K].M:t.1e.S(),0==t.j.3c&&(a=c),1==t.j.6M&&"1L"!=t.j.1P)&&t.1a.P()+a>e(o).J()&&(t.2N=!0,t.j.3c=!0,t.j.3b=0,t.j.3e=0,0==r&&(a=c=n),"1L"!=t.j.1P);r++);Q(t.2J.F({J:0,M:0}),t.1u.F({J:a,M:c}),t.2J.F({J:t.1u.P(),M:t.1u.S()}),t.j.4C===!0){z g=e(t.1H[t.K]).1n("k-1v");g===i?t.1Q.N():(t.1Q.2z(),t.7c.84().3i(g));z l;t.2N===!0?"6S"===t.j.2X&&(t.1Q.1h("k-1v-5M k-1v-5L"),l="B"===t.j.3x?"k-1v-4A":"k-1v-4y",t.1Q.1b(l)):"6S"===t.j.2X&&(t.1Q.3a("k-1v-4A")||t.1Q.3a("k-1v-4y"))&&(t.1Q.1h("k-1v-4A k-1v-4y"),l="B"===t.j.3x?"k-1v-5M":"k-1v-5L",t.1Q.1b(l))}},6R:q(){z e=C;Q("1L"==e.j.1P||1==e.2N)e.1u.4x(e.1e).1b("k-2v-1L");1E{e.1u.4x(e.1a).1h("k-2v-1L"),e.1u.F("E"==e.j.1P?{1w:e.1a.P(!0),"1i-1w":e.j.4D+"3C"}:{E:e.1a.P(!0),"1i-E":e.j.4D+"3C"});z o="89"==e.j.6T?0:e.1e.8a().B+1d(e.1e.F("1i-B"))-1d(e.U.F("4H-B"));Q("B"==e.j.1o){z t=e.Y.S()+1d(e.j.2c);e.1u.F({B:o+t})}1E e.1u.F({B:o})}},4i:q(){z e=C,o=1k.2C(e.2J.P()/e.X[e.K].J*1q),t=1k.2C(e.1t.P()*o/1q),i=1k.2C(e.2J.S()/e.X[e.K].M*1q),s=1k.2C(e.1t.S()*i/1q);e.1V.F({J:t,M:s}),e.4b()},4h:q(o){z t=C;e(o).4n(t.5l.8c())},2t:q(o){z t=C,i=e(o).I("."+t.4o);i.R&&i.4d()},5e:q(o,t){z i,s=C,n=s.H.P(),a=s.H.S(),c=(e(o),n/s.X[t].J),r=a/s.X[t].M;i=c>r?c:r,s.1H[t].J=1k.1O(s.X[t].J*i,10),s.1H[t].M=1k.1O(s.X[t].M*i,10);z g=s.1H.1r(t).P()/2*1q/s.2u.P(),l=s.1H.1r(t).S()/2*1q/s.2u.P();s.1H.1r(t).F({"1i-B":"-"+l+"%","1i-E":"-"+g+"%"}),s.2u.1r(t).1h("k-N"),s.2t(s.H.1r(t)),s.2u.1r(t).1h("k-N"),s.2t(s.H.1r(t))},5Z:q(){z e=C;"1w"==e.j.1o&&(e.5D(),e.U.F({B:"0",E:"0"}),e.Y.F({B:"0",E:e.U.P()+1d(e.j.2c)})),"E"==e.j.1o&&(e.5D(),e.Y.F({B:"0",E:"0"}),e.U.F({B:"0",E:e.Y.P()+1d(e.j.2c)})),"1B"==e.j.1o&&(e.5z(),e.U.F({B:"0",E:"0"}),e.Y.F({B:e.U.S()+1d(e.j.2c),E:"0"})),"B"==e.j.1o&&(e.5z(),e.Y.F({B:"0",E:"0"}),e.U.F({B:e.Y.S()+1d(e.j.2c),E:"0"}))},5z:q(){z e=C;e.Y.F("J",e.U.P());z o,t=1d(e.H.F("1i-1w")),i=e.j.1Y/e.j.2M,s=e.Y.P()/e.j.1j-(e.j.1j-1)*t/e.j.1j,n=s/i;o=1==e.j.2I?1q*s/((s+t)*e.H.R-t):1q*s/e.Y.P(),e.H.F({J:o+"%",M:n}),e.2u.1b("k-N");1U(z a=0;a<e.H.R;a++)e.4h(e.H[a]);Q(1==e.j.2I?e.H.5N().F("1i-1w",0):(e.1A.I(":3Z-3Y("+e.j.1j+"n)").F("1i-1w",0),e.1A.I(":3Z-3Y(n +"+(1d(e.j.1j)+1)+")").F("1i-B",t+"3C")),1==e.j.2I)e.1A.F({J:1k.1O(s*e.H.R+(e.H.R-1)*t),M:1k.1O(n)}),e.Y.F("M",1k.1O(n));1E{z c=1k.1O(e.H.R/e.j.1j),r=1k.1O(n*c+t*(c-1));e.1A.F({J:e.Y.P(),M:r}),e.Y.F("M",r)}Q(1==e.j.2I?(e.1Z.1h("k-N"),e.3k.F("1i-B",-e.3k.S()/2),e.1W.1h("k-N"),e.3j.F("1i-B",-e.3j.S()/2),e.3X()):(e.1Z.1b("k-N"),e.1W.1b("k-N")),e.4g){z g=e.H.P(),l=e.Y.P()-(g*e.j.1j+(e.j.1j-1)*t);e.1A.I(":3Z-3Y("+e.j.1j+"n)").F("J",g+l)}},5D:q(){z e=C;e.Y.F("M",e.U.S());z o,t=1d(e.H.F("1i-1B")),i=e.j.1Y/e.j.2M,s=e.Y.S()/e.j.1j-(e.j.1j-1)*t/e.j.1j,n=s*i;o=1q*s/((s+t)*e.H.R-t),e.H.F({J:n,M:o+"%"}),e.2u.1b("k-N");1U(z a=0;a<e.H.R;a++)e.4h(e.H[a]);Q(e.H.5N().F("1i-1B",0),e.1A.F({J:1k.1O(n),M:1k.1O((s+t)*e.H.R-t)}),e.Y.F("J",1k.1O(n)),e.1Z.1h("k-N"),e.3k.F("1i-E",-e.3k.P()/2),e.1W.1h("k-N"),e.3j.F("1i-E",-e.3j.P()/2),e.3X(),e.4g){z c=e.H.S(),r=e.Y.S()-(c*e.j.1j+(e.j.1j-1)*t);e.1A.I(":3Z-3Y("+e.j.1j+"n)").F("M",c+r)}},3X:q(){z e=C;1l e.2m<=e.j.1j?(e.1Z.1b("k-N"),2h e.1W.1b("k-N")):(e.1Z.1h("k-3V"),e.1W.1h("k-3V"),0==e.2e&&e.1Z.1b("k-3V"),2h(e.2e==1k.4u((e.H.R-1)/e.j.1j)&&e.1W.1b("k-3V")))},3p:q(){z e,o=C;-1!=o.j.4a&&o.1a.I(".k-3U").F("2f-2y",""),o.H.1h("k-3U").1r(o.K).1b("k-3U"),-1!=o.j.4a&&o.1a.I(".k-3U").F("2f-2y",o.j.4a),e=o.H.1r(o.K).I("1C").1c("1K"),e===i&&(e="3r"),o.1t.1c("1m",o.H.1r(o.K).I("1C").1c("1m")).1c("1K",e),o.4j(),o.6Y(),o.4i(),o.6R()},3T:q(){z o=C;o.1t.5a(!0).2T({3S:.5},5X,q(){e("3D").3a("k-3E")&&o.1M.2T({3S:0},5X,q(){o.3p(),o.3P(),o.1M.2T({3S:1},5O)}),e("3D").3a("k-3E")||o.3p(),o.1t.2T({3S:1},5O,q(){o.3g.1c("1m",o.1t.1c("1m")).1c("1K",o.1t.1c("1K"))})})},3O:q(){z e=C;e.4t=e.K,e.K=e.K==e.H.R-1?0:e.K+1,e.3F("5u",""),e.3T()},3N:q(){z e=C;e.4t=e.K,e.K=0==e.K?e.H.R-1:e.K-1,e.3F("5u",""),e.3T()},3F:q(o,t){z i=C;Q(0!=i.j.2I||"1B"!=i.j.1o&&"B"!=i.j.1o){z s=0;Q("5u"==o?s=1k.4u(i.K/i.j.1j):"70"==t?(s=0,i.2e>0&&(s=i.2e-1)):(s=1k.4u((i.H.R-1)/i.j.1j),i.2e<s&&(s=i.2e+1)),s!=i.2e){i.2e=s;z n;"1B"==i.j.1o||"B"==i.j.1o?(n=i.Y.P()+1d(i.H.F("1i-1w")),i.1A.2T({E:-(s*n)+"3C"},i.j.2g)):(n=i.Y.S()+1d(i.H.F("1i-1B")),i.1A.2T({B:-(s*n)+"3C"},i.j.2g));z a=e.1S(q(){C.8z=!1,C.3X()},i);a.2s()}}},4b:q(e){z o=C;Q(e!==i)Q(1==o.2p){Q(1==e.2R.2S.R){z t=e.2R.2S[0];o.1p.x=t.2V,o.1p.y=t.2K}}1E o.1p.x=e.2V,o.1p.y=e.2K;(-1!=o.1p.x||-1!=o.1p.y)&&(o.4S(o.1p),(0==o.j.3h||1==o.j.3h&&e==i)&&o.3g.F({B:o.1I.B,E:o.1I.E}),(0==o.j.3A||1==o.j.3A&&e==i)&&o.1V.F({B:o.1G.B,E:o.1G.E}))},6F:q(e,o){z t=C;Q(t.3l!==!1){Q(o!==i&&(e=o),e!==i)Q(t.2p===!0){Q(1==e.2R.2S.R){z s=e.2R.2S[0];t.1p.x=s.2V,t.1p.y=s.2K}}1E t.1p.x=e.2V,t.1p.y=e.2K;t.4S(t.1p),t.1D.B=t.1I.B,t.1D.E=t.1I.E,t.1F.B=t.1G.B,t.1F.E=t.1G.E,t.3g.F({B:t.1I.B,E:t.1I.E}),t.1V.F({B:t.1G.B,E:t.1G.E}),0==t.4s&&("1L"==t.j.1P||1==t.2N?t.1u.3L(t.j.2g):(t.1V.3L(t.j.2g),t.1u.3L(t.j.2g))),1==t.j.3h&&(2D(t.4r),t.4M()),1==t.j.3A&&(2D(t.4q),t.5B()),t.4s=!0}},5h:q(e){z o=C;Q(o.1V.5a().N(),o.1u.5a().6r(o.j.2g),e!==i)Q(1==o.2p){Q(1==e.2R.2S.R){z t=e.2R.2S[0];o.1p.x=t.2V,o.1p.y=t.2K}}1E o.1p.x=e.2V,o.1p.y=e.2K;1==o.j.3h&&2D(o.4r),1==o.j.3A&&2D(o.4q),o.4s=!1},6l:q(e){e.3J()},6h:q(e){z o=C;0==o.2p&&(o.2p=!0,o.1e.7b("2Q.Z",e)),o.4b(e),e.3J()},5S:q(e){z o=C;1==o.2p?(o.5h(e),o.2p=!1):o.3f(),e.3J()},4S:q(){z e=C,o=e.1e.8S(),t=e.1p.x-o.E,i=e.1p.y-o.B,s=e.1t.P(),n=e.1t.S(),a=e.1V.P(),c=e.1V.S(),r=i-1k.2C(c/2),g=t-1k.2C(a/2),l=e.X[e.K].J/s,u=-r*l,h=-g*l;0>i-c/2&&(r=0,u=0),i+c/2>0+n&&(r=n-c,u=-(e.X[e.K].M-e.1u.S())),0>t-a/2&&(g=0,h=0),t+a/2>0+s&&(g=s-a,h=-(e.X[e.K].J-e.1u.P())),e.1I.E=h,e.1I.B=u,e.1G.E=g,e.1G.B=r},4M:q(){z e=C,o={E:0,B:0},t={E:0,B:0};o.E=e.1I.E-e.1D.E,o.B=e.1I.B-e.1D.B,t.E=-o.E/(e.j.5K/1q),t.B=-o.B/(e.j.5K/1q),e.1D.E=e.1D.E-t.E,e.1D.B=e.1D.B-t.B,o.E<1&&o.E>-1&&(e.1D.E=e.1I.E),o.B<1&&o.B>-1&&(e.1D.B=e.1I.B),e.3g.F({B:e.1D.B,E:e.1D.E}),e.4r=3d(q(){e.4M()},25)},5B:q(){z e=C,o={E:0,B:0},t={E:0,B:0};o.E=e.1G.E-e.1F.E,o.B=e.1G.B-e.1F.B,t.E=-o.E/(e.j.4F/1q),t.B=-o.B/(e.j.4F/1q),e.1F.E=e.1F.E-t.E,e.1F.B=e.1F.B-t.B,o.E<1&&o.E>-1&&(e.1F.E=e.1G.E),o.B<1&&o.B>-1&&(e.1F.B=e.1G.B),e.1V.F("B",e.1F.B),e.1V.F("E",e.1F.E),e.4q=3d(q(){e.5B()},25)},3P:q(){z e=C,o=e.X[e.K].J<=e.1x.P()&&e.X[e.K].M<=e.1x.S();e.1M.1c("1m",e.1t.1c("1m")).1c("1K",e.1t.1c("1K")),o||1==e.j.4c?(e.2Y.N(),e.2Z.N(),e.5d()):(e.2Y.N(),e.2Z.2z(),e.1x.1h("k-3Q"),e.4E())},5d:q(){z e=C,o=e.2o.S(),t=e.2o.P();e.5A.1h("k-1g-6E"),e.1M.1h("k-1g-1f-3w k-1g-1f-4L k-1g-1f-4N"),e.X[e.K].M<=o&&e.X[e.K].J<=t?e.1M.1b("k-1g-1f-3w"):(e.X[e.K].M<=o&&e.1M.1b("k-1g-1f-4N"),e.X[e.K].J<=t&&e.1M.1b("k-1g-1f-4L"))},4E:q(){z e=C;e.5A.1b("k-1g-6E"),e.1M.1h("k-1g-1f-4L k-1g-1f-4N").1b("k-1g-1f-3w")},3H:q(){z e=C;e.1x.3a("k-3Q")?(e.2Z.2z(),e.2Y.N(),e.1x.1h("k-3Q"),e.4E()):(e.1x.1b("k-3Q"),e.2Z.N(),e.2Y.2z(),e.5d())},3f:q(){z o=C;Q(e("3D").3a("k-3E"))o.4Q();1E{Q(0==o.j.6Z)1l;o.1x.3L(o.j.2g),e("3D").1b("k-3E"),o.3P()}},4Q:q(){z o=C;e("3D").1h("k-3E"),o.1x.6r(o.j.2g)},67:q(){z e=C;e.1a.F({M:"0",J:"0"}),e.5t(),e.1H.3I(q(o){e.5e(e.H.1r(o),o),e.2t(e.H.1r(o)),e.H.1r(o).I(".k-2b-1f-1J").1h("k-N"),e.K==o&&(e.2t(e.U),e.1e.1h("k-N"),e.4j(),e.4i())}),e.3p(),e.j.4c||e.3P()},4m:q(){z e=C;e.2m>1&&(e.2r.2z(),e.2j.2z()),1==e.j.3W&&e.2B.2z()},4v:q(){z e=C;e.2m>1&&(e.2r.N(),e.2j.N()),1==e.j.3W&&e.2B.N()},5F:q(e){z o=C;o.K!=e&&(o.4t=o.K,o.K=e,o.3T())},6J:q(){z i=C;i.j.5I===!0&&(i.3l=!0,i.1e.O("95.Z",e.1S(i.6l,i)).O("6f.Z",e.1S(i.6h,i)).O("97.Z",e.1S(i.5S,i)),i.1e.O("74.Z",e.1S(i.4b,i)).O("2Q.Z",e.1S(i.6F,i)).O("2Q.Z",e.1S(i.j.6s,i)).O("3z.Z",e.1S(i.5h,i)).O("3z.Z",e.1S(i.j.6u,i))),1!=i.j.5i&&i.U.O("2Q.4B",e.1S(i.4m,i)).O("3z.4B",e.1S(i.4v,i)).O("74.4B",q(){i.4m(),2D(i.3m),i.3m=3d(q(){i.4v()},i.j.5r)}).O("6f.4B",q(e){i.4m(),2D(i.3m),i.3m=3d(q(){i.4v()},i.j.5r),e.3J()}),i.1e.O("1y.Z",q(){i.3f()}),i.2B.O("1y.Z",q(){z e=t.9a("5f");e.J=i.X[i.K].J,e.M=i.X[i.K].M;z o=e.9b("2d");o.9c(i.1t[0],0,0);1z 1N;e.3q(q(e){4z(e,i.1t.1c("1m").9d(/^.*[\\\\\\/]/,""))},"3r/6A")}),i.2r.O("1y.Z",q(){i.3N()}),i.2j.O("1y.Z",q(){i.3O()}),i.3o.O("1y.Z",q(){i.3N()}),i.3n.O("1y.Z",q(){i.3O()}),i.6X.O("1y.Z",q(){i.3f()}),i.2o.O("1y.Z",q(){i.3f()}),i.1M.O("2Q.Z",q(){i.2o.9e("1y.Z")}),i.1M.O("3z.Z",q(){i.2o.O("1y.Z",q(){i.3f()})}),i.j.4c||(i.1M.O("9f.Z",q(){i.3H()}),i.2Z.O("1y.Z",q(){i.3H()}),i.2Y.O("1y.Z",q(){i.3H()})),e(t).O("9g",q(e){1==i.j.4I&&(37==e.5J&&i.3N(),39==e.5J&&i.3O()),27==e.5J&&i.4Q()}),e(o).9i(q(){2D(i.5x),i.5x=3d(q(){i.67()},1q)}),i.H.O("1y.Z",q(){z o=e(C).4p();i.5F(o)}),1==i.j.6G&&i.H.O("2Q",q(){z o=e(C).4p();i.5F(o)}),i.1Z.O("1y.Z",q(){i.3F("5W","70")}),i.1W.O("1y.Z",q(){i.3F("5W","2a")})}},e.9k.9l=q(o){C.3I(q(){z t=e.1n(C,"6Q");t||e.1n(C,"6Q",1z s(e(C),o))})}}(9n,2n,5C);', 62, 582, '|||||||||||||||||||config|gc||||||function|||||||||var||top|this||left|css|div|gcThumbsLi|find|width|current||height|hide|on|outerWidth|if|length|outerHeight||gcDisplayArea|icon|class|gcImageData|gcThumbsArea|glasscase|||||||||||element|addClass|attr|parseFloat|gcDisplayContainer|display|overlay|removeClass|margin|nrThumbsPerRow|Math|return|src|data|thumbsPosition|currentMousePos|100|eq|typeof|gcDisplayDisplay|gcZoom|caption|right|gcOverlayArea|click|new|gcThumbsUl|bottom|img|currentZoom|else|currentLens|newLens|gcThumbsImg|newZoom|container|alt|inner|gcOverlayDisplay|Blob|ceil|zoomPosition|gcCaption|undefined|proxy|area|for|gcLens|gcThumbsAreaNext|readyState|widthDisplay|gcThumbsAreaPrevious|||||||||||next|li|thumbsMargin||currentSlide|border|speed|void|push|gcDisplayNext|encoding|prev|gcTotalThumbsImg|window|gcOverlayContainer|isTouchMove|prototype|gcDisplayPrevious|call|removeLoader|gcThumbsLiDiv|zoom|DONE|base64|color|show|self|gcDisplayDownload|round|clearTimeout|download|navigator|firstThumbSelected|isOneThumbShown|isThumbsOneRow|gcZoomContainer|pageY|type|heightDisplay|isAutoInnerZooming|parent|thumbs|mouseenter|originalEvent|touches|animate|_defaults|pageX|URL|capZType|gcOverlayCompress|gcOverlayEnlarge|||||||||||hasClass|zoomWidth|isZoomDiffWH|setTimeout|zoomHeight|toggleOverlay|gcZoomDisplay|isSlowZoom|append|gcThumbsNext|gcThumbsPrevious|isMouseEventsOn|mouseTimer|gcOverlayNext|gcOverlayPrevious|update|toBlob|image|svg|nbsp|size|object|center|capZPos|webkitURL|mouseleave|isSlowLens|null|px|body|noscroll|slide|abort|toggleOverlayImgSize|each|preventDefault|createObjectURL|fadeIn|use|previousImage|nextImage|setupOverlay|natsize|case|opacity|animateImage|active|disabled|isDownloadEnabled|setupSlider|child|nth|||||||||||colorActiveThumb|mousemoveHandler|isOverlayFullImage|remove|capZAlign|strict|iOS|addLoader|setupLens|setupDisplayDisplay|arguments|slice|showDAIcons|prepend|gcLoadingClass|index|slowLensTimer|slowZoomTimer|zooming|old|floor|hideDAIcons|instanceof|appendTo|inbottom|saveAs|intop|glasscaseDA|isZCapEnabled|zoomMargin|overlayFitSizes|speedSlowLens|wrap|padding|isKeypressEnabled|colorIcons|colorLoading|hcenter|zoomSlowDown|vcenter|revokeObjectURL|write|fadeOutOverlay|content|calcMousePos|onerror|defaults|decodeURIComponent|in|URI|fake|substring|||||||||||stop|error|icons|overlayNatSizes|setupThumbImg|canvas|widthDisplayPerc|mouseleaveHandler|isShowAlwaysIcons|font|text|gcLoader|org|parseInt|w3|www|processThumbImage|speedHideIcons|http|setup|true|href|unload|resizeTimer|code|setupThumbsTB|gcOverlayGContainer|lensSlowDown|document|setupThumbsLR|break|changeThumbs|toString|split|isZoomEnabled|keyCode|speedSlowZoom|outbottom|outtop|last|500|xhtml|encodeURIComponent|stream|touchendDC|btoa|extend|_options|false|200|init|setupThumbs|||||setupDisplayArea|supportCanvas|toDataURLHD|resizeGC|create|msSaveOrOpenBlob|400|NOT_READABLE_ERR|test|lens|INIT|touchmove|apply|touchmoveDC|throw|downloadPosition|close|touchstartDC|enlarge|compress|octet|gcontainer|vt|fadeOut|mouseEnterDisplayCB|mozGetAsFile|mouseLeaveDisplayCB|ABORT_ERR|csstransforms|NOT_FOUND_ERR|raw|fill|png|application|resolve|Uint8Array|fit|mouseenterHandler|isHoverShowThumbs|getFile|parents|initEvents|createElementNS|preloadImages|autoInnerZoom|onwriteend|toDataURL|string|gcglasscase|setupZoomPos|out|zoomAlignment|getBlob|writestart|WRITING|gcOverlayClose|setupZoom|isOverlayEnabled|previous|alignment|BlobBuilder|progress|mousemove|writeend|1999|location|textImageNotLoaded|inArray|module|trigger|gcCaptionDisplay|start|trim|ul|hz|switch|default|isNaN|gcOverlayContainerDisplay|String|when|done|isLoaded|Deferred|load|rgba|exec|xmlns|2000|rect|gcLoading|eee|loading|anchor|middle|style|aaa|loading3|weight|bold|8px|family|Arial|Helvetica|sans|serif|dominant|baseline|central|xml|promise|Array|indexOf|toBlobHD|iPod|iPhone|iPad|platform|IMAGE|NO|linear|easing|600|displayImage|empty|WebKitBlobBuilder|MozBlobBuilder|MSBlobBuilder|1200|displayArea|position|Object|clone|match|FileReaderSync|name|SECURITY_ERR|3e3|isAutoScaleHeight|isAutoScaleDisplay|534|ENCODING_ERR|255|Modernizr|NO_MODIFICATION_ALLOWED_ERR|glass|INVALID_STATE_ERR|SYNTAX_ERR|exports|removeEventListener|addEventListener|onabort|onwrite|onprogress|onwritestart|isAnimating|charCodeAt|forEach|toURL|HTMLCanvasElement|createWriter|saved|getDirectory|root|TEMPORARY|webkitSlice|chrome|dispatchEvent|initMouseEvent|MouseEvents|createEvent|exclusive|atob|_blank|offset|open|ArrayBuffer|catch|try|concat|setImmediate|mozRequestFileSystem|requestFileSystem|webkitRequestFileSystem|externalHost|userAgent|MSIE|touchstart|bind|touchend|join|unescape|createElement|getContext|drawImage|replace|off|dblclick|keydown|readAsBinaryString|resize|File|fn|glassCase|fromCharCode|jQuery'.split('|'), 0, {}))
