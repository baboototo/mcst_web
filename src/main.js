import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from 'vue-plugin-load-script'
import mixin from "../public/js/mixin"
import VueGtag from 'vue-gtag'
import VModal from 'vue-js-modal'

// import {default as VueAxe} from "vue-axe";

// if (process.env.NODE_ENV === 'development') {
//   const VueAxe = require('vue-axe').default
//   Vue.use(VueAxe)
// }

if (process.env.NODE_ENV === 'development') {

} else {
  Vue.use(VueGtag, {
    config: {
      id: 'UA-101864561-1'
    }
  }, router)
}

Vue.use(LoadScript)
Vue.mixin(mixin)
Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

