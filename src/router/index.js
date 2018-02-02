import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/farm/Farm'
import bgBody from '@/farm/bgBody'

Vue.use(Router)
/* eslint-disable */
export default new Router({
    routes: [
        {
            path: '/',
            name: 'farm',
            component: Farm
        },{
            path: '/bgBody',
            component: bgBody
        }
    ]
})
/* eslint-disable */
