import downImage from './down-image';
import downPdf from './down-pdf';

const install = (Vue) => {
  Vue.directive(downImage.name, downImage.directive(Vue));
  Vue.directive(downPdf.name, downPdf);
};

export default {
  install,
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

