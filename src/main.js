import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
// 等会要引进全局样式
import '@/styles/index.less'
// 引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
