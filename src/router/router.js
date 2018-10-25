import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import(/* webpackChunkName: "home" */ 'views/home')
const line = () => import(/* webpackChunkName: "line" */ 'views/line')
const add = () => import(/* webpackChunkName: "add" */ 'views/add')
const like = () => import(/* webpackChunkName: "like" */ 'views/like')
const me = () => import(/* webpackChunkName: "me" */ 'views/me')
export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: home
    },
    {
      path: '/home',
      name: '首页',
      component: home
    },
    {
      path: '/line',
      name: '路线',
      component: line
    },
    {
      path: '/add',
      name: '新增',
      component: add
    },
    {
      path: '/like',
      name: '收藏',
      component: like
    },
    {
      path: '/me',
      name: '个人中心',
      component: me
    }
  ]
})
