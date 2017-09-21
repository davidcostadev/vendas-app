<template>
  <div class="page-content">


  <span class="md-body-1">Pedidos Concluídos</span>
  <div class="box-content">
    <md-progress :md-progress="progress"></md-progress>


    <md-table>
      <md-table-body>
        <md-table-row>
          <md-table-head>Todos: </md-table-head>
          <md-table-cell>{{todos}}</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-head>Pagos: </md-table-head>
          <md-table-cell>R$ {{valorPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}} ({{pagos}})</md-table-cell>
        </md-table-row>
        <md-table-row>
          <md-table-head>Não Pagos: </md-table-head>
          <md-table-cell>R$ {{valorNaoPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}} ({{naopagos}})</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

  </div>


  <div class="box-content">
  <span class="md-body-1">Últimos Pedidos</span>
      <md-list>
        <md-list-item v-for="order in orders" :key="order.id">
          <router-link :to="`/orders/${order.id}`">
            <md-icon>{{getStatus(order.order_histories)}}</md-icon>
            <span> {{order.user.name}} - {{order.product.name}}</span>
            <span>{{getFirstData(order.order_histories)}}</span>
          </router-link>
        </md-list-item>
      </md-list>

      <p class="text-center">
        <router-link to="/orders">Ver todos os pedidos</router-link>
      </p>
    </div>
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
        progress: 0,
        pagos: 0,
        todos: 0,
        naopagos: 0,
        valorPago: 0,
        valorNaoPago: 0,
      }
    },
    methods: {
      getOrders() {
        axios.get('http://localhost:8000/api/orders?batch=product,user,order_histories.status&limit=10&direction=desc').then((response) => {
          // console.log(response.data)

          this.orders = response.data.data
        })
      },
      getProgress() {
        axios.get('http://localhost:8000/api/orders?batch=order_histories.status,product&limit=1000').then((response) => {
          const orders = response.data.data

          orders.forEach((order) => {
            let pago = false
            let naopago = true
            this.todos += 1

            order.order_histories.forEach((orderHistory) => {
              if (orderHistory.status.name === 'concluido' || orderHistory.status.name === 'reservado') {
                pago = true
                naopago = false
              }
            })

            if (pago) {
              this.pagos += 1
              this.valorPago += order.quant * parseFloat(order.product.amount)
            }
            if (naopago) {
              this.naopagos += 1
              this.valorNaoPago += order.quant * parseFloat(order.product.amount)
            }
          })


          this.progress = (this.pagos * 100) / this.todos
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
      this.getProgress()
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
