<template>
  <div class="page-content">
    <md-list>
      <md-list-item v-for="product in products" :key="product.id">
        <span> {{product.name}}</span>
        <span> {{product.amount | currency_real}}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        products: [],
      }
    },
    filters: {
      currency_real(val) {
        val = parseFloat(val, 10)
        const amount = val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        return `R$ ${amount}`
      },
    },
    methods: {
      getProducts() {
        axios.get('http://vendas-api.davidcosta.com.br/api/products').then((response) => {
          if (response.data) {
            // this.order = response.data
            // console.log(response)
            this.products = response.data.data
          }
        })
      },
    },
    created() {
      this.getProducts()
    },
  }
</script>

