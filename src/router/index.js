import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由文件
import login from '@/views/login.vue'
import index from '@/views/index.vue'
// 引入子组件的路由文件
import userindex from '@/views/userindex.vue'
import postlist from '@/views/postlist.vue'
import listissue from '@/views/listissue.vue'

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
      path: '/index',
      component: index,
      redirect: { name: 'userindex' },
      children: [
        {
          name: 'userindex',
          path: 'userindex',
          component: userindex
        },
        {
          name: 'postlist',
          path: 'postlist',
          component: postlist
        },
        {
          name: 'listissue',
          path: 'listissue',
          component: listissue
        }
      ]
    }
  ]
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('horse_back_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
