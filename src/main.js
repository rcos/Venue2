import Vue from "vue";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import routes from './routes.js'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

const router = new VueRouter({mode: 'history', routes: routes});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
