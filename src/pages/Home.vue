<template>
  <div class="home">

    <md-speed-dial md-open="hover" md-direction="top" class="md-fab-bottom-right" md-theme="light-blue">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon>add</md-icon>
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon>add_shopping_cart</md-icon>
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon>person_add</md-icon>
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon>add_to_queue</md-icon>
      </md-button>
    </md-speed-dial>


    <md-toolbar md-theme="white">
      <span class="md-title">Pedidos</span>
    </md-toolbar>

    <md-list>
      <md-list-item v-for="order in orders" :key="order.id">
        <router-link :to="`/orders/${order.id}`">
          <span>{{order.user.name}} - {{order.product.name}}</span>
          <span>{{getLastData(order.order_histories)}}</span>
        </router-link>
      </md-list-item>
    </md-list>

    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>User</md-table-head>
          <md-table-head>Product</md-table-head>
          <md-table-head>Status</md-table-head>
          <md-table-head>Data</md-table-head>
          <md-table-head>Alterar status</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="orders.length">
        <md-table-row v-for="order in orders" :key="order.id" :md-item="order">
          <md-table-cell>{{order.user.name}}</md-table-cell>
          <md-table-cell>{{order.product.name}}</md-table-cell>
          <md-table-cell>{{getLastStatus(order.order_histories)}}</md-table-cell>
          <md-table-cell>{{getLastData(order.order_histories)}}</md-table-cell>
          <md-table-cell>
            <md-menu md-size="4" class="md-theme-default">
              <md-button class="md-icon-button" md-menu-trigger><md-icon>more_vert</md-icon></md-button>

              <md-menu-content>
                <md-menu-item>Reservado</md-menu-item>
                <md-menu-item>Aguardando Pagamento</md-menu-item>
                <md-menu-item>Concluído</md-menu-item>
              </md-menu-content>
            </md-menu>

          </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'home',
    data() {
      return {
        orders: [],
      }
    },
    methods: {
      getOrders() {
        axios.get('http://localhost:8000/api/orders?batch=product,user,order_histories.status').then((response) => {
          console.log(response.data)

          this.orders = response.data
        })
      },
      getLastStatus(array) {
        if (array.length) {
          return array[array.length - 1].status.name
        }

        return 'nenhum histórico'
      },
      getLastData(array) {
        if (array.length) {
          return array[array.length - 1].date_event
        }

        return 'nenhum histórico'
      },
    },
    created() {
      this.getOrders()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
