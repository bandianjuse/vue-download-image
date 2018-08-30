'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _html2canvas = require('html2canvas');

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require('jspdf');

var _jspdf2 = _interopRequireDefault(_jspdf);

var _dom = require('./dom');

var _layer = require('./layer.vue');

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerDom = _vue2.default.extend(_layer2.default);

var downHandler = function downHandler(el, value) {
  if (el.recessiveEls) {
    el.recessiveEls.forEach(function (rec) {
      (0, _dom.setStyle)(rec, 'display', value);
    });
    if (value === 'block') {
      document.body.appendChild(el.layer.$el);
    } else {
      el.layer.$el.parentNode.removeChild(el.layer.$el);
    }
  }
};
var addDownEvent = function addDownEvent(el, downLabelEl) {
  (0, _dom.on)(downLabelEl, 'click', function () {
    downHandler(el, 'block');
    (0, _html2canvas2.default)(el).then(function (canvas) {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;
      var pageHeight = contentWidth / 592.28 * 841.89;
      var leftHeight = contentHeight;
      var position = 0;
      var imgWidth = 595.28;
      var imgHeight = 592.28 / contentWidth * contentHeight;
      var pageData = canvas.toDataURL('image/jpeg');
      var PDF = new _jspdf2.default('', 'pt', 'a4');

      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          if (leftHeight > 0) {
            PDF.addPage();
          }
        }
      }
      PDF.save(el.name);
      downHandler(el, 'none');
    });
  });
};

exports.default = {
  name: 'download-pdf',
  bind: function bind(el, binding) {
    var layerDom = new LayerDom({
      el: document.createElement('div')
    });
    var recessiveEls = [];
    var isDownLabel = false;

    el.layer = layerDom;
    el.name = binding.value && binding.value.title || '未命名';
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 1) {
        if (node.getAttribute('download') !== null) {
          addDownEvent(el, node);
          isDownLabel = true;
        } else if (node.getAttribute('recessive') !== null) {
          recessiveEls.push(node);
          (0, _dom.setStyle)(node, 'display', 'none');
        }
      }
    });
    if (recessiveEls.length) el.recessiveEls = recessiveEls;

    if (!isDownLabel) {
      var aEl = document.createElement('div');
      var text = document.createTextNode('下载PDF');

      aEl.appendChild(text);
      aEl.setAttribute('download', '');
      aEl.setAttribute('class', 'down-label');
      aEl.setAttribute('data-html2canvas-ignore', '');
      el.appendChild(aEl);
      addDownEvent(el, aEl);
    }
  }
};