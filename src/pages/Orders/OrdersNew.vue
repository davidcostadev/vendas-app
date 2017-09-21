<template>
  <div class="page-content">

    <span class="md-title">Novo Pedido</span>


    <div class="box-content">

      <div class="field-group">
        <md-input-container>
          <label for="movie">Cliente</label>
          <md-select v-model="input_client">
            <md-option v-for="client in clients" :key="client.id" :value="client.id">{{client.name}}</md-option>
          </md-select>
        </md-input-container>

        <md-input-container>
          <label for="movie">Produto</label>
          <md-select v-model="input_product">
            <md-option v-for="product in products" :key="product.id" :value="product.id">{{product.name}}</md-option>
          </md-select>
        </md-input-container>
      </div>
    </div>


    <div class="box-content">

      <span class="md-body-2">Data do Evento</span>

      <div class="field-group">
        <md-input-container>
          <label for="movie">Dia</label>
          <md-select v-model="input_dia">
            <md-option v-for="dia in dias" :key="dia" :value="dia">{{dia}}</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label for="movie">Mes</label>
          <md-select v-model="input_mes">
            <md-option v-for="mes in meses" :key="mes" :value="mes">{{mes}}</md-option>
          </md-select>
        </md-input-container>
        <md-input-container>
          <label for="movie">Ano</label>
          <md-select v-model="input_ano">
            <md-option v-for="ano in anos" :key="ano" :value="ano">{{ano}}</md-option>
          </md-select>
        </md-input-container>
      </div>
    </div>

    <span class="md-body-2">Setar Status</span>
    <div class="box-content">
      <md-input-container>
        <label for="movie">Status</label>
        <md-select v-model="input_status">
          <md-option v-if="status.name !== 'iniciado'" v-for="status in statuses" :key="status.id" :value="status.id">{{status.name}}</md-option>
        </md-select>
      </md-input-container>
    </div>

    <md-button @click="setOrder()" class="md-raised md-primary">Adicionar Pedido</md-button>

  </div>
</template>

<script>
import axios from 'axios'
// import { addZero } from '../../common'

const addZero = (i) => {
  let num = i
  if (i < 10) {
    num = `0${i}`
  }
  return `${num}`
}

export default {
  data() {
    return {
      dias: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      meses: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      anos: ['2017'],
      input_dia: addZero(new Date().getDate()),
      input_mes: addZero(new Date().getMonth() + 1),
      input_ano: addZero(new Date().getFullYear()),
      input_status: 'aguardando_pagamento',
      input_client: '',
      input_product: '',
      statuses: [],
      clients: [],
      products: [],
      order: null,
    }
  },
  computed: {
    date_event() {
      return `${this.input_ano}-${this.input_mes}-${this.input_dia}`
    },
  },
  created() {
    this.getClients()
    this.getProducts()
    this.getStatuses()
  },
  methods: {
    getProducts() {
      axios.get('http://localhost:8000/api/products').then((response) => {
        if (response.data) {
          this.products = response.data.data
        }
      })
    },
    getClients() {
      axios.get('http://localhost:8000/api/clients').then((response) => {
        if (response.data) {
          this.clients = response.data.data
        }
      })
    },
    getStatuses() {
      axios.get('http://localhost:8000/api/statuses').then((response) => {
        if (response.data) {
          this.statuses = response.data
        }
      })
    },
    setOrder() {
      const data = {
        product_id: this.input_product,
        user_id: this.input_client,
        quant: 1,
      }

      window.console.log(data)
      axios.post('http://localhost:8000/api/orders/', data).then((response) => {
        if (response.data) {
          this.setStatus(response.data.id)
        }
      })
    },
    setStatus(orderId) {
      const data = {
        order_id: orderId,
        status_id: this.input_status,
        date_event: this.date_event,
      }
      axios.post('http://localhost:8000/api/order-histories/', data).then((response) => {
        if (response.data) {
          this.$router.push('/')
        }
      })
    },
  },
}
</script>
