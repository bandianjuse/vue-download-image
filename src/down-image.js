import html2canvas from 'html2canvas';
import { once } from './dom';

const addHrefAttr = (el, downLabelEl) => {
  once(downLabelEl, 'mouseover', () => {
    html2canvas(el).then((canvas) => {
      const img = canvas.toDataURL('image/jpeg');

      downLabelEl.setAttribute('href', img);
      downLabelEl.setAttribute('download', el.name);
    });
  });
};
const handleDownload = (el, binding) => {
  let isDownLabel = false;

  el.name = (binding.value && binding.value.title) || '未命名';
  el.childNodes.forEach((node) => {
    if (node.nodeType === 1 && node.getAttribute('download') !== null) {
      addHrefAttr(el, node);
      isDownLabel = true;
    }
  });

  if (!isDownLabel) {
    const aEl = document.createElement('a');
    const text = document.createTextNode('下载图片');

    aEl.appendChild(text);
    aEl.setAttribute('download', el.name);
    aEl.setAttribute('href', '#');
    aEl.setAttribute('class', 'down-label');
    aEl.setAttribute('data-html2canvas-ignore', '');
    el.appendChild(aEl);
    addHrefAttr(el, aEl);
  }
})
export default {
  name: 'download-image',
  directive(Vue) {
    return {
      bind(el, binding) {
        Vue.nextTick(() => handleDownload(el, binding));
      },
      update(el, binding) {
        Vue.nextTick(() => handleDownload(el, binding));
      }
    };
  },
};
