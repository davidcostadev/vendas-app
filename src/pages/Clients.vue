<template>
  <div class="page-content">
    <md-list>
      <md-list-item v-for="client in clients" :key="client.id">
        <span> {{client.name}}</span>
        <span> {{client.email}}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        clients: [],
      }
    },
    methods: {
      getClients() {
        axios.get('http://vendas-api.davidcosta.com.br/api/clients').then((response) => {
          if (response.data) {
            // this.order = response.data
            // console.log(response)
            this.clients = response.data.data
          }
        })
      },
    },
    created() {
      this.getClients()
    },
  }
</script>

