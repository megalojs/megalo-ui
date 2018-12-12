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
      'pages/view/swiper/index'
    ]
  }
}