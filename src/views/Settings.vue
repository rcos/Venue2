<template>
  <div>
    
    <div class="settings-container">
        <div class="settings-links">
            <ul>
                <li class="active">General</li>
                <li>Other</li>
            </ul>
        </div>
        <div class="settings-body">
            <div class="name-area">
                <div class="name-div">{{ current_user.first_name }} {{ current_user.last_name }}</div>
                <div class="logout-div"><div class="logout-button" v-on:click="logoutUser">Logout</div></div>
            </div>

            <div class="setting-option-section">
                <div class="left">
                    <div>Current Email: <span class="value-area">{{ current_user.email }}</span></div>
                    <div class="small-div">The email is used to login to Venue.</div>
                </div>
                <div class="right">
                    <div class="change-button">Change</div>
                </div>
            </div>

            <div class="setting-option-section">
                <div class="left">
                    <div>Current Password: <span class="value-area">*********</span></div>
                    <div class="small-div">The password is the key to your Venue account.</div>
                </div>
                <div class="right">
                    <div class="change-button">Change</div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import { authComputed } from '../vuex/helpers.js'
  import {showAt, hideAt} from 'vue-breakpoints'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      hideAt,
      showAt
    },
    data(){
      return {
        current_user: {}
      }
    },
    created() {
      this.getCurrentUser()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
      logoutUser() {
        console.log('logging out')
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
    .settings-container {
        margin-top: 80px;
        width: 80%;
        text-align: left;
        margin-left: 5%;
    }

    .settings-links {
        width: 15%;
    }

    .settings-body {
        width: 65%;
        margin-left: 20px;
    }

    .settings-links, .settings-body {
        display: inline-block;
        vertical-align: top;
    }

    .settings-links ul li {
        list-style: none;
        color: #517B94;
        margin-bottom: 5px;
        width: 80%;
        height: 30px;
        line-height: 30px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
        border-radius: 5px;
        cursor: pointer;
    }

    .settings-links ul li.active {
        background-color: #517B94;
        color: white;
    }

    .name-area {
        font-size: 2rem;
        font-family: "Segoe UI";
        margin-bottom: 40px;
    }

    .name-area .name-div {
        width: 60%;
    }

    .name-area .logout-div {
        float: right;
    }

    .name-area .logout-div .logout-button {
        font-size: 0.9rem;
        width: 150px;
        text-align: center;
        height: 35px;
        line-height: 35px;
        border: 1px solid rgba(0, 0, 0, 0.7);
        border-radius: 4px;
    }

    .name-area .name-div, .name-area .logout-div {
        display: inline-block;
        vertical-align: top;
    }

    .setting-option-section {
        padding: 30px 15px;
        font-family: "Segoe UI";
    }

    .value-area {
        font-weight: italic;
    }

    .setting-option-section .left, .setting-option-section .right {
        display: inline-block;
        vertical-align: top;
    }

    .setting-option-section .left {
        width: 70%;
        min-width: 300px;
    }
    .setting-option-section .right {
        width: 25%;
        text-align: right;
    }

    .small-div {
        font-size: 0.9rem;
        color: rgba(0, 0, 0, 0.64);
        padding-left: 10px;
    }

    .change-button {
        background-color: rgba(0, 0, 0, 0.0);
        border: 1px solid rgba(0, 0, 0, 0.5);
        display: inline-block;
        width: 100px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-radius: 3px;
        cursor: pointer;
        font-family: "Segoe UI";
        transition: background-color 0.25s, color 0.25s, box-shadow 0.25s, border 0.25s;
        box-shadow: none;
    }

    .change-button:hover {
        background-color: #FC6F71;
        color: white;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.8);
    }

    .logout-button {
        background-color: #FC6F71;
        cursor: pointer;
    }

</style>