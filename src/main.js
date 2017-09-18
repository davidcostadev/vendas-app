// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './plugins/bootstrap-vue'
import './plugins/vue-material'

// import VueMaterial from 'vue-material'
// // import 'vue-material/dist/vue-material.css'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import BootstrapVue from 'bootstrap-vue'


// import Buefy from 'buefy'
// import 'buefy/lib/buefy.css'

import App from './App'
import router from './router'

// Vue.use(BootstrapVue)

// Vue.use(VueMaterial)

// // Vue.material.setCurrentTheme('default')

// Vue.material.registerTheme('default', {
//   // default: {
//   //   primary: 'de',
//   //   accent: 'light-blue',
//   // },
//   primary: 'purple',
//   // accent: 'light-blue',
//   // warn: 'red',
//   // background: 'grey',
// })

// Vue.use(Buefy)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
