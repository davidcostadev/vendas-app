<template>
  <div class="page-content">

    <md-layout md-gutter>
      <md-layout>
        <md-input-container>
          <label for="client">Filtar por Cliente</label>
          <md-select name="client" @change="changeFilter()" v-model="input_client">
            <md-option>Limpar Filtro</md-option>
            <md-option v-for="client in clients" :key="client.id" :value="client.id">{{client.name}}</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label for="product">Filtar por Produto</label>
          <md-select name="product" @change="changeFilter()" v-model="input_product">
            <md-option>Limpar Filtro</md-option>
            <md-option v-for="product in products" :key="product.id" :value="product.id">{{product.name}}</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <!-- <md-layout>
        <md-input-container>
          <label for="status">Filtar por Status</label>
          <md-select name="status" @change="changeFilter()" v-model="input_status">
            <md-option>Limpar Status</md-option>
            <md-option v-for="statusItem in statuses" :key="statusItem.name" :value="statusItem.name">{{statusItem.name}}</md-option>
          </md-select>
        </md-input-container>
      </md-layout> -->
    </md-layout>


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
        <md-icon md-icon-morph>reorder</md-icon>
        <md-icon>add</md-icon>
      </md-button>

      <router-link to="orders/new">
        <md-button class="md-fab md-primary md-mini md-clean">
          <md-icon>note_add</md-icon>
        </md-button>
      </router-link>
    </md-speed-dial>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pedidos',
  data() {
    return {
      orders: [],
      clients: [],
      products: [],
      statuses: [],
      input_product: this.verify(this.$route.query.product_id),
      input_client: this.verify(this.$route.query.client_id),
      input_status: this.$route.query.status,
    }
  },
  computed: {
    product_id() {
      return this.verify(this.$route.query.product_id)
    },
    client_id() {
      return this.verify(this.$route.query.client_id)
    },
    status() {
      return this.verifyStr(this.$route.query.status)
    },
  },
  watch: {
    product_id(valor) {
      this.input_product = this.verify(valor)
      this.getOrders()
    },
    client_id(valor) {
      this.input_client = this.verify(valor)
      this.getOrders()
    },
    status(valor) {
      this.input_status = this.verifyStr(valor)
      this.getOrders()
    },
  },
  methods: {
    verify(variable) {
      variable = (variable !== '' ? variable : 0)
      return typeof variable !== 'undefined' ? parseInt(variable, 10) : 0
    },
    verifyStr(variable) {
      return typeof variable !== 'undefined' ? variable : ''
    },
    changeFilter() {
      const productId = this.input_product > 0 ? this.input_product : ''
      const clientId = this.input_client > 0 ? this.input_client : ''
      // const status = this.input_status.length > 0 ? this.input_status : ''

      this.$router.push(`/orders/?client_id=${clientId}&product_id=${productId}&status=${status}`)
    },
    closeMenu() {
      this.$refs.menu.close()
      this.getOrders()
    },
    getClients() {
      axios.get('http://vendas-api.davidcosta.com.br/api/clients?limit=1000').then((response) => {
        this.clients = response.data.data
      })
    },
    getStatuses() {
      axios.get('http://vendas-api.davidcosta.com.br/api/statuses').then((response) => {
        this.statuses = response.data
      })
    },
    getProducts() {
      axios.get('http://vendas-api.davidcosta.com.br/api/products?limit=1000').then((response) => {
        this.products = response.data.data
      })
    },
    getOrders() {
      const filters = []

      if (this.client_id > 0) {
        filters.push(`user_id=${this.client_id}`)
      }
      if (this.product_id > 0) {
        filters.push(`product_id=${this.product_id}`)
      }
      if (this.status.length > 0) {
        filters.push(`status=${this.status}`)
      }


      const filter = filters.length ? `&${filters.join('&')}` : ''

      axios.get(`http://vendas-api.davidcosta.com.br/api/orders?batch=product,user,order_histories.status&direction=desc${filter}`).then((response) => {
        // console.log(response.data)

        this.orders = response.data.data
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
    // console.log('created')
    this.getOrders()
    this.getClients()
    this.getProducts()
    this.getStatuses()
  },
  mounted() {
    // console.log('mounted')
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
