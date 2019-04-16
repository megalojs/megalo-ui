import config from '@/config.js';
import { view } from './view';

function genPath(page = '/') {
  let arr = page.split('/');
  let len = arr.length;
  let str = arr[len - 2] || '';
  return `/${str}`;
}

function genName(path) {
  let arr = path.split('/');
  return arr[1];
}

const pages = config.pages || [];

export const routes = pages.map((page) => {
  let path = genPath(page);
  return {
    path,
    name: genName(path),
    component: view(page)
  }
})
