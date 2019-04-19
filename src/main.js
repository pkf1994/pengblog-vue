import Vue from 'vue'
import App from './App.vue'
import 'lazysizes'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import './assets/iconfont/iconfont.css'
import './registerServiceWorker'
import './style.css'
import '@/assets/style'
import {MUTATION_APPOINT_WINDOW_SIZE,
        MUTATION_TRIGGER_SHOW_NOTICE} from "./store/modules/mutation_types";



Vue.config.productionTip = false

Vue.prototype.notify = (payload) => {store.commit(MUTATION_TRIGGER_SHOW_NOTICE,payload)}

window.addEventListener('resize', () => {
    store.commit(MUTATION_APPOINT_WINDOW_SIZE,{widthOfWindow: window.innerWidth,heightOfWindow: window.innerHeight})
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

