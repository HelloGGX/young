import Vue from 'vue'
import App from './App.vue'
import routes from './router/router'
import { routerMode } from './config/env'
import VueRouter from 'vue-router'
import store from './store/index'
import './registerServiceWorker'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/less/index.less'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: require('common/images/logo@2x.png')
})

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('SET_LOADING', true)
  next()
})

router.afterEach(function (to) {
  store.commit('SET_LOADING', false)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
