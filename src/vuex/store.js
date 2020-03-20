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
      console.log("vuex recieved user with fn: " + user.first_name + " ln: " + user.last_name)
      console.log("email: " + user.email + " password: " + user.password)
      return UserAPI.signUp(user)
        .then(({data}) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, user) {
      console.log("In login action! Passing user: " + user + " with email: " + 
        user.email + " and password: " + user.password)
      return UserAPI.login(user)
        .then(({data}) => {
          console.log(data)
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
