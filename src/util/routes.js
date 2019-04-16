import config from '@/config.js';
import { view } from './view';

function path(page) {
  return '/' + page;
}

function name(page) {
  let arr = page.split('/');
  let len = arr.length;
  return arr[len - 2] || '';
}

const pages = config.pages || [];

export const routes = pages.map((page) => {
  return {
    path: path(page),
    name: name(page),
    component: view(page)
  }
})
