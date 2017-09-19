<template>
  <div id="app">


    <md-toolbar>
      <md-button v-if="$route.path !== '/'" class="md-icon-button" @click="$router.back()">
        <md-icon>keyboard_backspace</md-icon>
      </md-button>
      <h1 class="md-title">{{$route.name}}</h1>
       <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
    </md-toolbar>

    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Menu</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item @click.native="closeLeftSidenav()">
          <router-link to="/">Início</router-link>
        </md-list-item>
        <md-list-item @click.native="closeLeftSidenav()">
          <router-link to="/orders">Pedidos</router-link>
        </md-list-item>
        <md-list-item @click.native="closeLeftSidenav()">
          <router-link to="/products">Produtos</router-link>
        </md-list-item>
        <md-list-item @click.native="closeLeftSidenav()">
          <router-link to="/clients">Clientes</router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <main class="main-content">
      <transition name="md-router" appear>
        <router-view></router-view>
      </transition>
    </main>

  </div>

</template>


<script>
  export default {
    name: 'app',
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle()
      },
      closeLeftSidenav() {
        this.$refs.leftSidenav.toggle()
      },
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle()
      },
      closeRightSidenav() {
        this.$refs.rightSidenav.close()
      },
      open(ref) {
        window.console.log(`Opened: ${ref}`)
      },
      close(ref) {
        window.console.log(`Closed: ${ref}`)
      },
    },
  }
</script>

<style lang="scss">

  @import './assets/base';



  body {
    min-height: 100%
  }
  #app {
    min-height: 100%
  }
  .main-content {
    padding-bottom: 90px;
  }
  .page-content {
    padding: 15px;
  }
  .box-content {
    padding-top: 20px;
    padding-bottom: 40px;
  }


  .md-speed-dial {
    position: fixed !important;
  }
  .md-toolbar {
    & > .md-title {
      flex: 1
    }
  }

</style>
