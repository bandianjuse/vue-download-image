'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html2canvas = require('html2canvas');

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _dom = require('./dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addHrefAttr = function addHrefAttr(el, downLabelEl) {
  (0, _dom.once)(downLabelEl, 'mouseover', function () {
    (0, _html2canvas2.default)(el).then(function (canvas) {
      var img = canvas.toDataURL('image/jpeg');

      downLabelEl.setAttribute('href', img);
      downLabelEl.setAttribute('download', el.name);
    });
  });
};
var handleDownload = function handleDownload(el, binding) {
  var isDownLabel = false;

  el.name = binding.value && binding.value.title || '未命名';
  el.childNodes.forEach(function (node) {
    if (node.nodeType === 1 && node.getAttribute('download') !== null) {
      addHrefAttr(el, node);
      isDownLabel = true;
    }
  });

  if (!isDownLabel) {
    var aEl = document.createElement('a');
    var text = document.createTextNode('下载图片');

    aEl.appendChild(text);
    aEl.setAttribute('download', el.name);
    aEl.setAttribute('href', '#');
    aEl.setAttribute('class', 'down-label');
    aEl.setAttribute('data-html2canvas-ignore', '');
    el.appendChild(aEl);
    addHrefAttr(el, aEl);
  }
};
exports.default = {
  name: 'download-image',
  directive: function directive(Vue) {
    return {
      bind: function bind(el, binding) {
        Vue.nextTick(function () {
          return handleDownload(el, binding);
        });
      },
      update: function update(el, binding) {
        Vue.nextTick(function () {
          return handleDownload(el, binding);
        });
      }
    };
  }
};