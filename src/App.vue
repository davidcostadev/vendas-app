<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-brand href="#">Minhas Vendas</b-navbar-brand>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav is-nav-bar>
            <b-nav-item href="#">Pedidos</b-nav-item>
            <b-nav-item href="#">Produtos</b-nav-item>
            <b-nav-item href="#">Clientes</b-nav-item>
          </b-nav>
        </b-nav>
      </b-collapse>
    </b-navbar>

    <main class="page-content">
      <md-theme md-name="blue">
        <transition name="md-router" appear>
          <router-view></router-view>
        </transition>
      </md-theme>
    </main>

  </div>

</template>


<script>
  export default {
    name: 'app',
    methods: {
    },
  }
</script>

<style>
body, html {
    height: 100%;
    overflow: hidden;
}
body {
  min-height: 100%
}
#app {
  min-height: 100%
}

.page-content {
  padding-top: 15px;
  padding-bottom: 15px;
}
.box-content {
  padding-top: 20px;
  padding-bottom: 40px;
}


.md-speed-dial {
  position: fixed !important;
}
</style>
