import App from './app.vue'
import Vue from 'vue'
import router from './pages/router/index';

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

app.$mount()