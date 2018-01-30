import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/farm/Farm'

Vue.use(Router)
/* eslint-disable */
export default new Router({
    routes: [
        {
            path: '/',
            name: 'farm',
            component: Farm
        }
    ]
})
/* eslint-disable */
