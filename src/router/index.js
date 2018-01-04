import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/farm/Farm'
import Haha from '@/farm/Haha'

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
            path: '/haha',
            name: 'haha',
            component: Haha
        }
    ]
})
/* eslint-disable */
