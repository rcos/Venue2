import Vue from "vue";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import router from './routes.js'
import store from './vuex/store'

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    created(){
    	// Automatic Login
    	const userString = localStorage.getItem('user')
    	if(userString) {
    		const userData = JSON.parse(userString)
    		this.$store.commit('SET_USER_DATA', userData)
    	}
    	//Prevents user from inputting fake credentials
    	axios.interceptors.response.use(
    		response => response,
    		error => {
    			if (error.response.status === 401) {
    				this.$store.dispatch('logout')
    			}
    			return Promise.reject(error)
    		}
    	)
    },
    render: h => h(App)
}).$mount('#app');
