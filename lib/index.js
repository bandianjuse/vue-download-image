'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  Vue.directive(_main2.default.name, _main2.default.directive(Vue));
};

exports.default = {
  install: install
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}