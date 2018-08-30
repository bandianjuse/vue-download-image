import Vue from 'vue';
import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';
import { on, setStyle } from './dom';
import Layer from './layer.vue';

const LayerDom = Vue.extend(Layer);

const downHandler = (el, value) => {
  if (el.recessiveEls) {
    el.recessiveEls.forEach((rec) => {
      setStyle(rec, 'display', value);
    });
    if (value === 'block') {
      document.body.appendChild(el.layer.$el);
    } else {
      el.layer.$el.parentNode.removeChild(el.layer.$el);
    }
  }
};
const addDownEvent = (el, downLabelEl) => {
  on(downLabelEl, 'click', () => {
    downHandler(el, 'block');
    html2canvas(el).then((canvas) => {
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      const pageHeight = contentWidth / 592.28 * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      const imgWidth = 595.28;
      const imgHeight = 592.28 / contentWidth * contentHeight;
      const pageData = canvas.toDataURL('image/jpeg');
      const PDF = new JSPDF('', 'pt', 'a4');

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

export default {
  name: 'download-pdf',
  bind(el, binding) {
    const layerDom = new LayerDom({
      el: document.createElement('div'),
    });
    const recessiveEls = [];
    let isDownLabel = false;

    el.layer = layerDom;
    el.name = (binding.value && binding.value.title) || '未命名';
    el.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.getAttribute('download') !== null) {
          addDownEvent(el, node);
          isDownLabel = true;
        } else if (node.getAttribute('recessive') !== null) {
          recessiveEls.push(node);
          setStyle(node, 'display', 'none');
        }
      }
    });
    if (recessiveEls.length) el.recessiveEls = recessiveEls;

    if (!isDownLabel) {
      const aEl = document.createElement('div');
      const text = document.createTextNode('下载PDF');

      aEl.appendChild(text);
      aEl.setAttribute('download', '');
      aEl.setAttribute('class', 'down-label');
      aEl.setAttribute('data-html2canvas-ignore', '');
      el.appendChild(aEl);
      addDownEvent(el, aEl);
    }
  },
};
