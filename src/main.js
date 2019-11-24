import Vue from "vue"
import App from "./App.vue"
import Buefy from 'buefy'
import VueRouter from 'vue-router'
import Datetime from 'vue-datetime'
import LoadScript from 'vue-plugin-load-script'
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
