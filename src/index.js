import downImage from './main';

const install = (Vue) => {
  Vue.directive(downImage.name, downImage.directive(Vue));
};

export default {
  install,
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

