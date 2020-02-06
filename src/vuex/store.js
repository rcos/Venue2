import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import UserAPI from '@/services/UserAPI.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    // Store the user in our vuex state, add their token to 
    // local storage, and add their token to the axios header
    // for any asynchronous requests that will be made
    SET_USER_DATA(state, userData){
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  },
  actions: {
    signup({ commit }, user) {
      return UserAPI.signUp(user)
        .then(({data}) => {
          commit('SET_USER_DATA', data)
        })
      // return axios
      //   .post('//localhost:3000/register', credentials)
      //   .then(({ data }) => {
      //     commit('SET_USER_DATA', data)
      //   })
    },
    login({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    }
  },
  getters: {
    loggedIn(state) {
      //returns true if there is state in state.user, false otherwise
      return !!state.user
    }
  }
})
