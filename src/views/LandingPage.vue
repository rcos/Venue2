<template>
  <div class="universal-centered-view">

    <div class="logo-area">

      <img id="logo" src="@/assets/venue-logo.svg" class="venue-logo" style="width:15rem;" />


      <transition name="animate"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="500"
      >
        <div v-if="!hide_landing_page" class="logo-text" style="font-size:8rem;">venue</div>
      </transition>
      <transition name="animate"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        :duration="500">
        <div v-if="!hide_landing_page" class="sub-logo" style="font-size:1.5rem;">
          <span style="color:#e83e8c">secure </span>
          <span style="color:#007bff">attendance</span>
        </div>
      </transition>
    </div>

    <div>
      <!-- Login Form -->
      <div id="login-form-container">
          <LoginForm ref="LoginForm" />
      </div>

      <!-- FOOTER -->
      <div class="footer-btn">
        <div class="universal-centered-view">

          <transition name="animate"
            enter-active-class="animated fadeInDown"
            leave-active-class="animated fadeOutDown"
            :duration="500">
            <VenueButton
              v-if="!hide_landing_page"
              btn_str="Get Started" v-on:button-clicked="showLoginForm" />
          </transition>


          <VenueButton
            id="login-btn"
            btn_str="Log In" v-on:button-clicked="login" />

        </div>
      </div>
    </div>

    <!-- <div v-if="!show_login_form">
      <Logo v-bind:show_large_logo="true" />
      <Button v-bind:btn_str="'Get Started'" v-on:button-clicked="showLoginForm"/>
    </div>
    <div v-else>
      <Logo v-bind:show_large_logo="false" />
      <LoginForm ref="LoginForm" />
      <Button v-bind:btn_str="'Login'" v-on:button-clicked="login"/>
    </div> -->
  </div>
</template>

<script>
  import Logo from '@/components/Logo.vue'
  // import Button from '@/components/Button.vue'
  import LoginForm from '@/Forms/LoginForm.vue'
  import VenueButton from '@/components/VenueButton.vue'

  export default {
    components: {
      Logo,
      // Button,
      LoginForm,
      VenueButton
    },
    data() {
      return {
        hide_landing_page: false,
        show_login_form: false
      }
    },
    created() {
    },
    methods: {
      showLoginForm() {
        // scale down the logo
        setTimeout(() => {

          document.getElementById('logo').style.transform = 'scale(0.5)';
          document.getElementById('logo').animate([
            { transform: 'scale(1)' },
            { transform: 'scale(0.5)' }
          ], {
            duration: 500
          })

          // document.getElementById('logo').style.height = '50px';
          // document.getElementById('logo').animate([
          //   { transform: 'scale(1)' },
          //   { transform: 'scale(0.3)' }
          // ], {
          //   duration: 350
          // })

          this.show_login_form = true


          // console.log (document.getElementById('logo').offsetTop)
          document.getElementById('login-form-container').style.opacity = 1;
          document.getElementById('login-form-container').style.display = 'block';
          document.getElementById('login-form-container').animate([
            { opacity: 0 },
            { opacity: 1 }
          ], {
            duration: 500
          })

          setTimeout(() => {
            document.getElementById('login-btn').style.display = 'block';
            document.getElementById('login-btn').style.opacity = 1;
            document.getElementById('login-btn').style.top = '0px';
            document.getElementById('login-btn').animate([
              { opacity: 0, top: '30px' },
              { opacity: 1, top: '0px' }
            ], {
              duration: 500
            })
          }, 200)

        }, 500)

        // now show the login form
        this.hide_landing_page = true
      },
      login() {
        console.log("Login was called")
        this.$refs.LoginForm.login()
      }
    }
  }
</script>

<style>
.footer-btn {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
}

.logoscale-enter-active {
  animation: scale-logo 0.5s;
}

.logoscale-leave-active {
  animation: scale-logo 0.5s reverse;
}

.logo-area {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

#login-form-container {
  position: absolute;
  display: none;
  /* top: 50%; */
  height: 200px;
  margin-top: -100px;
  top: 50%;
  opacity: 0;
}

#login-btn {
  display: none;
  top: 30px;
  opacity: 0;
  position: relative;
}

.login-form-holder {
  position: absolute;
}
</style>
