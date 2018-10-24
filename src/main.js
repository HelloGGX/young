import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import './registerServiceWorker'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: require('common/images/logo@2x.png')
})

router.beforeEach(function (to, from, next) {
  store.commit('SET_LOADING', { isLoading: true })
  next()
})

router.afterEach(function (to) {
  store.commit('SET_LOADING', { isLoading: false })
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
