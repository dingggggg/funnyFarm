import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/farm/Farm'
import Unclockplant from '@/farm/Unclockplant'

Vue.use(Router)
/* eslint-disable */
export default new Router({
    routes: [
        {
            path: '/',
            name: 'farm',
            component: Farm
        },
        {
          path: '/unclockplant',
          name : 'unclockplant',
          component : Unclockplant
        }
    ]
})
/* eslint-disable */
