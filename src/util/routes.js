import { view } from './view';

const pages = [
  'pages/index/index',
  'pages/panel/index',
  'pages/view/avatar/index',
  'pages/view/badge/index',
  'pages/view/countdown/index',
  'pages/view/curtain/index',
  'pages/view/divider/index',
  'pages/view/noticebar/index',
  'pages/view/tag/index',
  'pages/view/timeline/index',
  'pages/view/steps/index'
]

function path(page) {
  return '/' + page;
}

function name(page) {
  let arr = page.split('/');
  let len = arr.length;
  return arr[len - 2] || '';
}

export const routes = pages.map((page) => {
  return {
    path: path(page),
    name: name(page),
    component: view(page)
  }
})