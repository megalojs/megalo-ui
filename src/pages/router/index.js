import Vue from 'vue';
import Router from 'vue-router';
import { view, routes } from '../../util';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/pages/index/index'
    },
    ...routes
  ]
});

router.beforeEach((to, from, next) => {
  console.log('you are going to', to);
  next();
});

export default router;