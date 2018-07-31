import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import CommonHTML from '@/components/CommonHTML'
import Layout from '@/view/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children:[{
        path:'/',
        name:'test',
        component: CommonHTML
      }]
    }
  ]
})
