import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import(/* webpackChunkName: "home" */ 'views/home')
const line = () => import(/* webpackChunkName: "line" */ 'views/line')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/line',
      name: 'line',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: line
    }
  ]
})
