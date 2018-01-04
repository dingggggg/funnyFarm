import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/farm/Farm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'farm',
      component: Farm
    }
  ]
})
