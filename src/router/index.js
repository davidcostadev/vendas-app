import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import OrdersList from '@/pages/Orders/OrdersList'
import OrdersShow from '@/pages/Orders/OrdersShow'
import OrdersNew from '@/pages/Orders/OrdersNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/orders/',
      name: 'OrdersList',
      component: OrdersList,
    },
    {
      path: '/orders/new',
      name: 'OrdersNew',
      component: OrdersNew,
    },
    {
      path: '/orders/:order_id',
      name: 'OrdersSHow',
      component: OrdersShow,
    },
  ],
})
