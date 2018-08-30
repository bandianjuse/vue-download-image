"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* istanbul ignore next */
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
      element.attachEvent("on" + event, handler);
    }
  };
}();

/* istanbul ignore next */
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
      element.detachEvent("on" + event, handler);
    }
  };
}();

/* istanbul ignore next */
var once = exports.once = function once(el, event, fn) {
  var listener = function listener() {
    if (fn) {
      fn.apply(this);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};