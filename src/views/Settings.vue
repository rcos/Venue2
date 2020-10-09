<template>
  <div class="palette">
    <h1 class="palette">Settings</h1>
    <div class="settings-container">
          <div class="name-area">
            <div class="name-div" v-if="editing_name">
              <input v-model="edited_first_name" :placeholder="current_user.first_name"/>
              <input v-model="edited_last_name" :placeholder="current_user.last_name"/>
              <button v-if="waiting" class="btn btn-primary" disabled><SquareLoader/></button>
              <div v-else>
                <button class="btn btn-secondary" @click="editing_name = false">Cancel</button>
              </div>
            </div>
            <div class="name-div" v-else>{{ current_user.first_name }} {{ current_user.last_name }} <button class="btn" title="Edit Course" id="edit-course" @click="editing_name = true"><img class="svg-color" id="edit-course" src="@/assets/icons8-edit.svg" alt="Edit" width="40" aria-label="Edit"/></button></div>
            <div class="logout-div"><div class="logout-button" v-on:click="logoutUser" tabindex="0" role="button">Logout</div></div>
          </div>

          <div v-if="mode == 'setting_options'">

            <div class="setting-option-section">
                <div class="left">
                    <div>Current Email: <span class="value-area">{{ current_user.email }}</span></div>
                    <div class="small-div">The email is used to login to Venue.</div>
                </div>
                <div class="right">
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
                <div v-if="this.edited_dark_mode">
                  <input type="checkbox" v-on:click="toggleDarkMode()" checked>
                  <span class="dark-mode-slider"></span>
                </div>
                <div v-else>
                  <input type="checkbox" v-on:click="toggleDarkMode()">
                  <span class="dark-mode-slider"></span>
                </div>
              </label>
            <!-- PRINTING VARIABLES OUT FOR TESTING
            <div>this.current_user.first_name: {{ this.current_user.first_name }}</div>
            <div>edited_first_name: {{ this.edited_first_name }}</div> -->
          </div>

          <div style="position:relative" class="setting-option-section">
              <div class="left"></div>
              <div style="position:absolute" class="right">
                <button class="btn btn-primary" @click="saveName()">Save Changes</button>
              </div>
          </div>
          <!-- @/assets/icons8-edit.svg 
            <img class="svg-color" width="100px" height="100px" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter2" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter3" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter4" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter5" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter6" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter7" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter8" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter9" src="@/assets/icons8-edit.svg" alt=""/>
            <img class="test-filter10" src="@/assets/icons8-edit.svg" alt=""/> -->
        </div>
          
        <!--<div class="test-div">
          test
        </div> -->

            <div style="position:relative" class="setting-option-section">
                <div class="left" style="position:absolute">
                    <router-link :to="{name: 'teach_new_course'}"><button class="btn btn-primary">Teach New Course</button></router-link>
                </div>
                <div class="right">
                    <!-- <div class="change-button">Change</div> -->
                </div>
            </div>

<!--             <div class="setting-option-section">
                <div class="left">
                    <div>Current Password: <span class="value-area">*********</span></div>
                    <div class="small-div">The password is the key to your Venue account.</div>
                </div>
                <div class="right">
                    <div class="change-button" v-on:click="mode = 'change_password'">Change</div>
                </div>
            </div> -->

          </div>

          <!-- Setting Actions -->
          <div v-else>
            <ChangePassword v-if="mode == 'change_password'" :current_user="current_user" :complete="actionComplete" />
          </div>
    </div>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import { authComputed } from '../vuex/helpers.js'
  import {showAt, hideAt} from 'vue-breakpoints'
  import ChangePassword from '@/components/ChangePassword.vue'
  import AuthAPI from '../services/AuthAPI';
  //import PaletteAPI from '../services/PaletteAPI';

  import SquareLoader from '@/components/Loaders/SquareLoader.vue';

  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      hideAt,
      showAt,
      ChangePassword,
      SquareLoader
    },
    data(){
      return {
        current_user: {},
        mode: String,
        editing_name: false,
        edited_first_name: '',
        edited_last_name: '',
        edited_dark_mode: false,
        waiting: false
      }
    },
    created() {
      this.mode = "setting_options"
      this.getCurrentUser()
      //this.setPalette()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
        this.edited_dark_mode = this.$store.state.user.current_user.dark_mode
        this.edited_first_name = this.$store.state.user.current_user.first_name
        this.edited_last_name = this.$store.state.user.current_user.last_name
      },
      actionComplete () {
        this.mode = "setting_options";
      },
      logoutUser() {
        AuthAPI.logoutCAS().then(res => {
          this.$store.dispatch('logout')
        })
      },
      handleUpdateSubmissions() {
        LectureSubmissionAPI.updateAllToNewModel()
        .then(res => {
          location.reload()
        })
      },
      toggleDarkMode() {
        this.edited_dark_mode = !this.edited_dark_mode;
      },
      /*setPalette() {
      let root = document.documentElement;
      PaletteAPI.setPalette(root, this.current_user.dark_mode)
    }, */
    async saveName() {
        this.waiting = true
        this.current_user.first_name = this.edited_first_name
        this.current_user.last_name = this.edited_last_name
        this.current_user.dark_mode = this.edited_dark_mode
        await UserAPI.updateUser(this.current_user._id,this.current_user).then(res => {
          this.$store.dispatch('updateCurrentUser',{token: this.$store.state.user.token, current_user: this.current_user})
          this.edited_dark_mode = this.$store.state.user.current_user.dark_mode
          this.edited_first_name = this.$store.state.user.current_user.first_name
          this.edited_last_name = this.$store.state.user.current_user.last_name
          this.waiting = false
          this.editing_name = false
        })
        location.reload()
      },
      test() {
        // This function will never get called, but I will leave it in in case it needs future debugging
        let root = document.documentElement;
        const style = getComputedStyle(root);
        var testColor = new Color();
        testColor = getComputedStyle(root).getPropertyValue('--course-attendance-percent-bad');
        var bad_attendance = getComputedStyle(root).getPropertyValue('--course-attendance-percent-bad');
        //alert(testColor[0]);

        //var rgb = 'rgb(200, 12, 53)';
        //var rgb = testColor.replace(/[^\d,]/g, '').split(',');
        alert(testColor);
      }
    }
  }
</script>

<style>
   :root {
      --settings-logout-button: rgb(207,39,41);
      --settings-logout-button-shadow: rgba(144, 62, 80, 1);

      --settings-text: #517B94;
      --settings-small-div: rgba(0, 0, 0, 0.64);

      --settings-switch-on: #42f593;
      --settings-switch-off: #f55442;
      --swttings-switch-ball: white;

      --test-var: #d1ec32;
      --course-attendance-percent-bad: #d13e34; 
      --course-attendance-percent-medium: #b753e4;
    }

    .pencil {
      color: var(--main-text-color);
      fill: currentColor;
      width: 64px;
      height: 64px;
    }

    .svg-color {
      filter: var(--widgets-color);
    }
    .test-filter2 {
      filter: invert(32%) sepia(25%) saturate(3284%) hue-rotate(332deg) brightness(98%) contrast(97%);
      width: 50px;
      height: 50px;
    }
    .test-filter3 {
      filter: invert(61%) sepia(37%) saturate(4670%) hue-rotate(1deg) brightness(103%) contrast(107%);
      width: 50px;
      height: 50px;
    }
    .test-filter4 {
      filter: invert(69%) sepia(76%) saturate(554%) hue-rotate(2deg) brightness(107%) contrast(103%);
      width: 50px;
      height: 50px;
    }
    .test-filter5 {
      filter: invert(82%) sepia(21%) saturate(6600%) hue-rotate(91deg) brightness(108%) contrast(102%);
      width: 50px;
      height: 50px;
    }
    .test-filter6 {
      filter: invert(58%) sepia(11%) saturate(2694%) hue-rotate(128deg) brightness(98%) contrast(90%);
      width: 50px;
      height: 50px;
    }
    .test-filter7 {
      filter: invert(44%) sepia(25%) saturate(2782%) hue-rotate(184deg) brightness(103%) contrast(106%);
      width: 50px;
      height: 50px;
    }
    .test-filter8 {
      filter: invert(10%) sepia(93%) saturate(7351%) hue-rotate(248deg) brightness(73%) contrast(134%);
      width: 50px;
      height: 50px;
    }
    .test-filter9 {
      filter: invert(10%) sepia(58%) saturate(4182%) hue-rotate(235deg) brightness(306%) contrast(100%);
      width: 50px;
      height: 50px;
    }
    .test-filter10 {
      filter: invert(8%) sepia(48%) saturate(7011%) hue-rotate(280deg) brightness(502%) contrast(110%);
      width: 50px;
      height: 50px;
    }

    #masked {
      width: 100px;
      height: 100px;
      background-color: #8cffa0;
      -webkit-mask-image: url(https://mdn.mozillademos.org/files/12676/star.svg);
      mask-image: url(https://mdn.mozillademos.org/files/12676/star.svg);
    }

    #test {
      background: linear-gradient(90deg, rgba(62,73,202,1) 0%, rgba(143,62,202,1) 20%, rgba(209,62,52,1) 40%, rgba(176,95,22,1) 70%, rgba(4,133,47,1) 100%);
      color: var(--course-attendance-percent-bad);
    }
    #attendance_bad {
      color: var(--course-attendance-percent-bad);
  }

    .palette {
      background-color: var(--main-background-color);
      color: var(--settings-text);
      position: relative;
      font-weight: bold;
    }

    .settings-container {
      background-color: var(--main-background-color);
      margin: 80px 6rem 0px 6rem;
      text-align: left;
      background: var(--main-background-color);
    }

    .settings-links {
        width: 15%;
    }

    .settings-links, .settings-body {
        display: inline-block;
        vertical-align: top;
    }

    .settings-links ul li {
        list-style: none;
        color: var(--settings-text);
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
        background-color: var(--settings-text);
        color: var(--main-text-color);
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
        border: 3px solid var(--settings-logout-button); 
        border-radius: 4px;
        box-shadow: 0px 3px 5px var(--settings-logout-button-shadow);
        background-color: var(--main-background-color);
        transition: background 0.25s, color 0.25s;
        font-weight: bold;
        color: var(--settings-logout-button);
        /* background-color: #FC6F71; */
        cursor: pointer;
    }

    .name-area .logout-div .logout-button:hover,
    .name-area .logout-div .logout-button:focus {
      background-color: var(--settings-logout-button);
      color: white;
      outline: none;
    }

    .name-area .name-div, .name-area .logout-div {
        display: inline-block;
        vertical-align: top;
    }

    .setting-option-section {
        padding: 30px 15px;
        background-color: var(--main-background-color);
        color: var(--main-text-color);
        background: var(--main-background-color);
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
        color: var(--settings-small-div);
        padding-left: 10px;
    }

    .change-button {
        background-color: var(--main-background-color);
        border: 3px solid var(--settings-logout-button-shadow);
        color: var(--settings-logout-button-shadow);
        font-weight: bold;
        display: inline-block;
        width: 100px;
        text-align: center;
        height: 40px;
        line-height: 37px;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.25s, color 0.25s, box-shadow 0.25s, border 0.25s;
        box-shadow: 0px 2px 5px var(--settings-logout-button-shadow);
    }

    .change-button:hover {
        background-color: var(--settings-logout-button);
        color: var(--main-text-color);
        box-shadow: 0px 0px 10px 5px var(--settings-logout-button-shadow);
        border: 3px solid var(--settings-logout-button);
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
      background-color: var(--settings-switch-off); 
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 34px;
    }

    .dark-mode-slider:before {
      content: "";
      position: absolute;
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: var(--settings-switch-ball);
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
      content: "off";
      font-size: 12px;
      text-align: center;
      color: var(--settings-switch-off);
      font-weight: bold;
      line-height: 26px;
    }


    input:checked + .dark-mode-slider {
      background-color: var(--settings-switch-on);
    }

    input:focus + .dark-mode-slider {
      box-shadow: 0 0 1px var(--settings-switch-on);
    }

    input:checked + .dark-mode-slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
      content: "on";
      color: var(--settings-switch-on);
    }

</style>
