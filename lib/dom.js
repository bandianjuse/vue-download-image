'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.setStyle = setStyle;
var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;

var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    if (offset) {
      return letter.toUpperCase();
    }
    return letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

var on = exports.on = function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler);
    }
  };
}();

var off = exports.off = function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  }
  return function (element, event, handler) {
    if (element && event) {
      element.detachEvent('on' + event, handler);
    }
  };
}();

var once = exports.once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity') {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
}