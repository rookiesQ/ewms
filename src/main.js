// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/http/http.js'
import  VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)
Vue.prototype.$axios = http

//element
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
//使用element
Vue.use(ElementUI);
Vue.use(VueRouter);

/* eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
*/
new Vue({
  el: '#app',
  template: '<App/>',
  component: App,
  router,
  render: h => h(App)
})
