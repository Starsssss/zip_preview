import Vue from 'vue'
import App from './App.vue'
import FilePreview from 'the-file-preview';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.component('FilePreview',FilePreview);
new Vue({
  render: h => h(App),
}).$mount('#app')
