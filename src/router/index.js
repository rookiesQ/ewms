import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import main from '@/components/main'
import Login from '@/components/Login'
import publicSetting from '@/components/publicSetting/publicSetting'
import autoResponse from '@/components/autoResponse/autoResponse'
import QRCodePromote from '@/components/QRCodePromote/QRCodePromote'
import QRCodeAdd from '@/components/QRCodePromote/QRCodeAdd'
import QRCodeStatistics from '@/components/QRCodePromote/QRCodeStatistics'
Vue.use(Router)
let redirectRouter = function(routerName) { //重定向
  // let activeRouter = store.state.activeRouter;
  return store.state.routers[routerName].url
}
let router =  new Router({
  routes: [
    {path: '',redirect: '/wechart'},
    {
      path: '/wechart',
      component: main,
      name: 'wechart',
      redirect: function() { //业务地区
          return redirectRouter('wechart')
      },
      children:[{
        path:'/wechart/publicSetting/:id',
        name:'publicSetting',
        component: publicSetting
      },{
        path:'/wechart/autoReponse/:id',
        name:'autoReponse',
        component: autoResponse
      },{
      	path:'/wechart/QRCodePromote/:id',
        name:'QRCodePromote',
        component: QRCodePromote
      },{
      	path:'/wechart/QRCodeAdd/:id',
        name:'QRCodeAdd',
        component: QRCodeAdd
      },{
      	path:'/wechart/QRCodeStatistics/:id',
        name:'QRCodeStatistics',
        component: QRCodeStatistics
      }]
    }
  ]
})
export default router
