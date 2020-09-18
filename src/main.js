import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import routes from './router'
import './config/rem'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
