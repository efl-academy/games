import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const shadowHost = document.querySelector('#app');

new Vue({
  render: h => h(App),
}).$mount('#app')
