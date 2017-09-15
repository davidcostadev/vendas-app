<template>
  <div class="container">

  <md-toolbar>
    <h1 class="md-title" style="flex: 1">Minhas Vendas</h1>
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
  </md-toolbar>

    <md-theme md-name="purple">
      <transition name="md-router" appear>
        <router-view></router-view>
      </transition>
    </md-theme>


  <md-sidenav class="md-left" ref="leftSidenav">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Minhas Vendas</h3>
      </div>
    </md-toolbar>

    <md-list>
      <md-list-item>menu</md-list-item>
      <md-list-item>
        <router-link to="/components/list">Meus Pedidos</router-link>
      </md-list-item>
      <md-list-item>
        <router-link to="/components/list">Clientes</router-link>
      </md-list-item>
      <md-list-item>
        <router-link to="/components/list">Produtos</router-link>
      </md-list-item>
    </md-list>

  </md-sidenav>


  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle()
      },
    },
  }
</script>

<style>

.md-theme-purple.md-list {
  background-color: #fff;
  color: rgba(0, 0, 0, .87);
}
.page {
  padding: 15px 20px;
}
.box-content {
  padding-top: 20px;
  padding-bottom: 40px;
}

</style>
