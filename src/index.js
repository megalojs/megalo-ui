import App from './App'
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
      'pages/view/countdown/index',
      'pages/view/swiper/index'
    ]
  }
}