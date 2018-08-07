import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Child from '@/components/Child'
import Parent from '@/components/Parent'
import HighstockDemo1 from '@/components/highstock/demo1'

Vue.use(Router)

export default new Router({
  mode: 'history', // #号的hash模式
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/child',
      component: Child
    },
    {
      path: '/parent',
      component: Parent
    },
    {
      path: '/highstock_demo_1',
      component: HighstockDemo1
    }
  ]
})
