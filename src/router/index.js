import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由文件
import login from '@/views/login.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    }
  ]
})

export default router
