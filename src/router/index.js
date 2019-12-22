import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由文件
import login from '@/views/login.vue'
import index from '@/views/index.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/',
      component: index
    }
  ]
})

// 设置导航首位
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (to.path === '/') {
    let token = localStorage.getItem('horse_back_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
