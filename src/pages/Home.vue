<template>
  <div class="home">


    <md-list>
      <md-list-item v-for="order in orders" :key="order.id">
        <router-link :to="`/orders/${order.id}`">
          <md-icon>{{getStatus(order.order_histories)}}</md-icon>
          <span> {{order.user.name}} - {{order.product.name}}</span>
          <span>{{getFirstData(order.order_histories)}}</span>
        </router-link>
      </md-list-item>
    </md-list>


    <md-speed-dial md-open="hover" md-direction="top" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>event</md-icon>
        <md-icon>add</md-icon>
      </md-button>

      <router-link to="orders/new">

        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>note_add</md-icon>
        </md-button>
      </router-link>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon>alarm_add</md-icon>
      </md-button>
    </md-speed-dial>


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
          // console.log(response.data)

          this.orders = response.data
        })
      },
      getStatus(array) {
        const status = this.getLastStatus(array)

        if (status === 'aguardando_pagamento') {
          return 'info'
        } else if (status === 'iniciado') {
          return 'play'
        } else if (status === 'concluido') {
          return 'done'
        } else if (status === 'reservado') {
          return 'assignment turned in'
        }

        return 'star'
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
      getFirstData(array) {
        if (array.length) {
          return array[0].date_event
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
<style lang="scss">

.md-speed-dial {
  .md-mini {
    display: none;
  }
  &.md-active {
    .md-mini {
      display: inline-block
    }
  }
}

</style>
