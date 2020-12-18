import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
