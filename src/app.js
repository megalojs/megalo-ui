import App from './app.vue'
import Vue from 'vue'

const app = new Vue( App )

app.$mount()

export default {
  config: {
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Megalo UI',
      navigationBarTextStyle: 'black'
    },
    pages: [
      'pages/index/index',
      'pages/panel/index',
      'pages/view/avatar/index',
      'pages/view/badge/index',
      'pages/view/button/index',
      'pages/view/countdown/index',
      'pages/view/curtain/index',
      'pages/view/divider/index',
      'pages/view/form/index',
      'pages/view/noticebar/index',
      'pages/view/tag/index',
      'pages/view/timeline/index',
      'pages/view/steps/index'
    ]
  }
}