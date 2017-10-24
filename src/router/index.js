import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import OrdersList from '@/pages/Orders/OrdersList'
import OrdersShow from '@/pages/Orders/OrdersShow'
import OrdersNew from '@/pages/Orders/OrdersNew'
import Products from '@/pages/Products'
import Clients from '@/pages/Clients'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Minhas vendas',
      component: Home,
    },
    {
      path: '/orders/',
      name: 'Pedidos',
      component: OrdersList,
    },
    {
      path: '/orders/new',
      name: 'Novo Pedido',
      component: OrdersNew,
    },
    {
      path: '/orders/:order_id',
      name: 'Pedido',
      component: OrdersShow,
    },
    {
      path: '/products/',
      name: 'Produtos',
      component: Products,
    },
    {
      path: '/clients/',
      name: 'Clientes',
      component: Clients,
    },
  ],
})
