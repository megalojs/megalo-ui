import App from './app.vue'
import Vue from 'vue'
import router from './pages/router/index';
import config from './config';

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

app.$mount()

export default {
  config
};