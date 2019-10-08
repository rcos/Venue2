import Vue from "vue";
import App from "./App.vue";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.config.productionTip = false;

import Dashboard from './components/Dashboard';

const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: Dashboard
  }

];

const router = new VueRouter({mode: 'history', routes: routes});

//give the routes to the application on boot
new Vue(Vue.util.extend({router}, App)).$mount('#app');
