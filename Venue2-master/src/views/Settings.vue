<template>
  <div>
    <h1>Settings</h1>
    <div class="settings-container">
      <div class="name-area">
        <div class="name-div">
          {{ current_user.first_name }} {{ current_user.last_name }}
        </div>
        <div class="logout-div">
          <div
            class="logout-button"
            v-on:click="logoutUser"
            tabindex="0"
            role="button"
          >
            Logout
          </div>
        </div>
        <div class="logout-div">
          <div
            class="logout-button"
            v-on:click="saveChanges"
            tabindex="0"
            role="button"
          >
            Save Changes
          </div>
        </div>
      </div>

      <div v-if="mode == 'setting_options'">
        <div class="setting-option-section">
          <div class="left">
            <div>
              Current Email:
              <span class="value-area">{{ current_user.email }}</span>
            </div>
            <div class="small-div">The email is used to login to Venue.</div>
          </div>
          <div class="right">
            <div class="test-div">This is a test</div>
            <!-- <div class="change-button">Change</div> -->
          </div>
        </div>
        <div class="setting-option-section">
          <div class="left">
            <div>
              Dark mode
            </div>
          </div>
          <div class="right">
            <label class="dark-mode-switch">
              <div v-if="this.switch == 'true' || this.current_user.dark_mode">
                <input type="checkbox" v-on:click="toggleDarkMode()" checked>
                <span class="dark-mode-slider"></span>
              </div>
              <div v-else>
                <input type="checkbox" v-on:click="toggleDarkMode()">
                <span class="dark-mode-slider"></span>
              </div>
            </label>
            <!-- PRINTING VARIABLES OUT FOR TESTING -->
            <div>this.current_user.dark_mode: {{ this.current_user.dark_mode }}</div>
            <div>state.dark_mode: {{ this.$store.state.dark_mode }}</div>
            <div>switch: {{ this.switch }}</div>
          </div>
        </div>
      </div>

      <div class="setting-option-section">
        <div class="left">
          <div>Current Password: <span class="value-area">{{ this.current_user.password }}</span></div>
              <div class="small-div">The password is the key to your Venue account.</div>
                </div>
                <div class="right">
              <div class="change-button" v-on:click="mode = 'change_password'">Change</div>
            </div>
          </div> 
      </div>

      <!-- Setting Actions -->
      <div v-else:>
        <ChangePassword
          v-if="mode == 'change_password'"
          :current_user="current_user"
          :complete="actionComplete"
        />
      </div>
    </div>
</template>

<script>
import UserAPI from "@/services/UserAPI.js";
import { authComputed } from "../vuex/helpers.js";
import { showAt, hideAt } from "vue-breakpoints";
import ChangePassword from "@/components/ChangePassword.vue";
import AuthAPI from "../services/AuthAPI";

import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js";

export default {
  name: "Dashboard",
  computed: {
    ...authComputed
  },
  components: {
    hideAt,
    showAt,
    ChangePassword
  },
  data() {
    return {
      current_user: {},
      mode: String,
      switch: Boolean
    };
  },
  created() {
    this.mode = "setting_options";
    this.getCurrentUser();
    this.switchPosition();
    this.syncUpBooleans();
    this.dark_mode_style();
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.$store.state.user.current_user;
    },
    switchPosition() {
      this.switch = this.$store.state.dark_mode;
      return this.switch;
    },
    syncUpBooleans() {
      if (this.switch == 'true') {
        this.current_user.dark_mode = true;
      } else if (this.switch == 'false') {
        this.current_user.dark_mode = false;
      } else {
        this.current_user.dark_mode = this.current_user.dark_mode;
      }
    },
    dark_mode_style() {
      let root = document.documentElement;
      if (this.switch == 'true' || this.current_user.dark_mode) {
        root.style.setProperty('--white', '#00ff00');
      } else {
        root.style.setProperty('--white', '#ff00ff');
      }
    },
    actionComplete() {
      this.mode = "setting_options";
    },
    logoutUser() {
      AuthAPI.logoutCAS().then(res => {
        this.$store.dispatch("logout");
      });
    },
    handleUpdateSubmissions() {
      LectureSubmissionAPI.updateAllToNewModel().then(res => {
        location.reload();
      });
    },
    toggleDarkMode() {
      /*if (this.current_user.dark_mode == false && switch_pos == 'off') {
        this.current_user.dark_mode = !this.current_user.dark_mode;
      } else if (this.current_user.dark_mode == false && switch_pos == 'on' && this.sync == 0) {
        this.current_user.dark_mode = false;
        this.sync = 1;
      } else if (this.current_user.dark_mode == true && switch_pos == 'on') {
        this.current_user.dark_mode = !this.current_user.dark_mode;
      } else if (this.current_user.dark_mode == true && switch_pos == 'off' && this.sync == 0) {
        this.current_user.dark_mode = true;
        this.sync = 1;
      } else {
        this.current_user.dark_mode = !this.current_user.dark_mode;
      } */
      this.current_user.dark_mode = !this.current_user.dark_mode;
    },
    saveChanges() {
      UserAPI.updateSettings(this.current_user);
      this.$store.commit('UPDATE_SETTINGS', this.current_user.dark_mode);

    }
  }
};
</script>

<style>
:root {
  --white: #ffffff;
}

.test-div {
  color: var(--white);
  background-color:green;
  text-align: left;
  padding: 15px;
  display: inline-block;
}

.settings-container {
  margin: 80px 6rem 0px 6rem;
  text-align: left;
}

.settings-links {
  width: 15%;
}

.settings-links,
.settings-body {
  display: inline-block;
  vertical-align: top;
}

.settings-links ul li {
  list-style: none;
  color: #517b94;
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
  background-color: #517b94;
  color: white;
}

.name-area {
  font-size: 2rem;
  /* margin-bottom: 40px; */
}

.name-area .name-div {
  width: 75%;
  min-width: 300px;
}

.name-area .logout-div {
  text-align: right;
  width: 24%;
}

.name-area .logout-div .logout-button {
  font-size: 0.9rem;
  width: 150px;
  text-align: center;
  height: 35px;
  line-height: 30px;
  border: 3px solid rgb(207, 39, 41);
  border-radius: 4px;
  box-shadow: 0px 3px 5px rgba(252, 111, 113, 0.3);
  background-color: white;
  transition: background 0.25s, color 0.25s;
  font-weight: bold;
  color: rgb(207, 39, 41);
  /* background-color: #FC6F71; */
  cursor: pointer;
}

.name-area .logout-div .logout-button:hover,
.name-area .logout-div .logout-button:focus {
  background-color: rgb(207, 39, 41);
  color: white;
}

.name-area .name-div,
.name-area .logout-div {
  display: inline-block;
  vertical-align: top;
}

.setting-option-section {
  padding: 30px 15px;
}

.value-area {
  font-weight: italic;
}

.setting-option-section .left,
.setting-option-section .right {
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
  background-color: white;
  border: 3px solid rgba(44, 62, 80, 1);
  color: rgb(44, 62, 80);
  font-weight: bold;
  display: inline-block;
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 37px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s, box-shadow 0.25s,
    border 0.25s;
  box-shadow: 0px 2px 5px rgba(44, 62, 80, 0.1);
}

.change-button:hover {
  background-color: rgb(207, 39, 41);
  color: white;
  box-shadow: 0px 0px 10px 5px rgba(252, 111, 113, 0.2);
  border: 3px solid rgb(207, 39, 41);
}

.dark-mode-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.dark-mode-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.dark-mode-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc; 
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.dark-mode-slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .dark-mode-slider {
  background-color: #2196F3;
}

input:focus + .dark-mode-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .dark-mode-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

</style>
