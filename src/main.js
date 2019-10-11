import Vue from "vue";
import App from "./App.vue";

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './routes.js'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

const router = new VueRouter({mode: 'history', routes: routes});

//give the routes to the application on boot
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
