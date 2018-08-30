import html2canvas from 'html2canvas';
import { once } from './dom';

const addHrefAttr = (el, downLabelEl) => {
  once(downLabelEl, 'mouseover', () => {
    html2canvas(el).then((canvas) => {
      const img = canvas.toDataURL('image/jpeg');

      downLabelEl.setAttribute('href', img);
    });
  });
};

export default {
  name: 'download-image',
  directive(Vue) {
    return {
      bind(el) {
        Vue.nextTick(() => {
          let isDownLabel = false;

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
            aEl.setAttribute('download', '');
            aEl.setAttribute('href', '#');
            aEl.setAttribute('class', 'down-label');
            aEl.setAttribute('data-html2canvas-ignore', '');
            el.appendChild(aEl);
            addHrefAttr(el, aEl);
          }
        });
      },
    };
  },
};
