<template>
  <div class="page-content">

    <span class="md-title">Pedido #{{$route.params.order_id}}</span>

    <div v-if="order" class="box-content">
      <md-table>
        <md-table-body>
          <md-table-row>
            <md-table-head>Cliente: </md-table-head>
            <md-table-cell>{{order.user.name}}</md-table-cell>
          </md-table-row>
          <md-table-row>
            <md-table-head>Produto: </md-table-head>
            <md-table-cell>{{order.product.name}}</md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>

    <span class="md-body-1">Histórico</span>
    <div v-if="order" class="box-content">
      <md-table >
        <md-table-body>
          <md-table-row>
            <md-table-head>Status</md-table-head>
            <md-table-head>Data</md-table-head>
          </md-table-row>
          <template v-if="order.order_histories.length">
            <md-table-row v-for="order_history in order.order_histories" :key="order_history.id">
              <md-table-cell>{{order_history.status.name}}</md-table-cell>
              <md-table-cell>{{order_history.date_event}}</md-table-cell>
            </md-table-row>
          </template>
          <md-table-row v-else>
              <md-table-cell colspan="2">Nenhum histórico neste pedido</md-table-cell>
            </md-table-row>
        </md-table-body>
      </md-table>
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
          <md-option v-for="status in statuses" :key="status.id" :value="status.id">{{status.name}}</md-option>
        </md-select>
      </md-input-container>
    </div>


  <md-button @click="setStatus()" class="md-raised md-primary">Adicionar Status</md-button>


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
        input_status: '',
        statuses: [],
        order: null,
      }
    },
    computed: {
      date_event() {
        return `${this.input_ano}-${this.input_mes}-${this.input_dia}`
      },
    },
    created() {
      this.getStatuses()
      this.getOrder()
    },
    methods: {
      getStatuses() {
        axios.get('http://localhost:8000/api/statuses').then((response) => {
          if (response.data) {
            this.statuses = response.data
          }
        })
      },
      getOrder() {
        axios.get(`http://localhost:8000/api/orders/${this.$route.params.order_id}?batch=user,product,order_histories.status`).then((response) => {
          if (response.data) {
            this.order = response.data
          }
        })
      },
      getLastStatus(array) {
        if (array.length) {
          return array[array.length - 1].status.name
        }

        return 'nenhum histórico'
      },
      setStatus() {
        // const now = new Date()

        const data = {
          order_id: parseInt(this.$route.params.order_id, 10),
          status_id: this.input_status,
          date_event: this.date_event,
        }
        console.log(data)

        axios.post('http://localhost:8000/api/order-histories/', data).then((response) => {
          if (response.data) {
            this.order = response.data
            this.getOrder()
          }
        })
      },
    },
  }
</script>
