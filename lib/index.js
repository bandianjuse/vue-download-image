'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _downImage = require('./down-image');

var _downImage2 = _interopRequireDefault(_downImage);

var _downPdf = require('./down-pdf');

var _downPdf2 = _interopRequireDefault(_downPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  Vue.directive(_downImage2.default.name, _downImage2.default.directive(Vue));
  Vue.directive(_downPdf2.default.name, _downPdf2.default);
};

exports.default = {
  install: install
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}