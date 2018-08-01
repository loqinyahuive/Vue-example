import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Child from '@/components/Child'
import Parent from '@/components/Parent'

Vue.use(Router)

export default new Router({
  mode: 'history', // #号的hash模式
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/child',
      name: 'child',
      component: Child
    },
    {
      path: '/parent',
      name: 'parent',
      component: Parent
    }
  ]
})
