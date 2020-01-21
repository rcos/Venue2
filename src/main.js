import Vue from "vue";
import App from "./App.vue";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy)

import VueRouter from 'vue-router';
Vue.use(VueRouter);


import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import routes from './routes.js'

import 'bootstrap'
import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(VueRouter);
Vue.use(Datetime);
Vue.use(LoadScript);

Vue.config.productionTip = false;

const router = new VueRouter({mode: 'history', routes: routes});

//give the routes to the application on boot
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
