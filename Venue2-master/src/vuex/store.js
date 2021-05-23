import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthAPI from "@/services/AuthAPI.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    dark_mode: false,
    agreedToPrivacy: false
  },
  mutations: {
    // Store the user in our vuex state, add their token to
    // local storage, and add their token to the axios header
    // for any asynchronous requests that will be made
    SET_USER_DATA(state, userData) {
      if (userData != null) {
        state.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
        axios.defaults.headers.common["User"] = JSON.stringify(
          userData.current_user
        );
      }
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    // test
    agreePrivacyPolicy(state, data) {
      localStorage.setItem('agreedToPrivacy', data);
      state.agreedToPrivacy = data;
    },
    initialiseStore(state) {
      if (localStorage.getItem('agreedToPrivacy')) {
        state.agreedToPrivacy = localStorage.getItem('agreedToPrivacy');
      }
    },
    UPDATE_SETTINGS(state, userData) {
      localStorage.setItem('dark_mode', userData);
      state.dark_mode = userData;
      location.reload();
    },
    LIVE_SETTINGS(state) {
      // If some value exists within localStorage, set dark_mode to it.
      if (localStorage.getItem('dark_mode')) {
        state.dark_mode = localStorage.getItem('dark_mode');
      } else {
        state.dark_mode = false;
      }
    }
  },
  actions: {
    login({ commit }, user) {
      return AuthAPI.login(user).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    loginCAS({ commit }) {
      return AuthAPI.loginStatus().then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    setPermanentPassword({ commit }, user) {
      return AuthAPI.setPermanentPassword(user).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    }
  },
  getters: {
    loggedIn(state) {
      //returns true if there is state in state.user, false otherwise
      return !!state.user;
    }
  }
});
