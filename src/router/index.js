import Vue from 'vue'
import Router from 'vue-router'

import index from 'pages/index'
import item from 'pages/item'

let HASH = location.hash

Vue.use(Router)
let router = new Router({
  mode: HASH === '' ? 'history' : 'hash',
  routes: [{
    path: '/short-link/',
    name: 'index ',
    component: index
  }, {
    path: '/short-link/:id',
    name: 'item ',
    component: item
  }]
})

export default router
