<template>
<!--   <div class="container shadow" style="border:#ededed solid thin; width:25rem; margin-top:1rem;">
    <div @click="$emit('show-login-button')" class="back-arrow">←</div>
    <form style=" padding-top:1rem; padding-bottom:1rem;" @submit.prevent="login">
      <div class="form-group">
        <input type="email" v-model="user.email" class="form-control login-form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email">
      </div>
      <div class="form-group">
        <input type="password" v-model="user.password" class="form-control login-form" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn shadow-sm login-btn">Login</button>
    </form>
  </div> -->
  <div>
    <form class="login-form">
      <InputField ref="email_field" v-on:set-input-value="setEmail" label="username" />
      <InputField ref="password_field" v-on:set-input-value="setPassword" label="password" type="password" />
      <div class='forgot-password-container'><a href="#">Forgot password?</a></div>
    </form>
  </div>
</template>

<script>
  import InputField from '@/components/InputField.vue'

  export default {
    name: 'LoginForm',
    components: {
      InputField
    },
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    created() {
    },
    methods: {
      login() {
        console.log("Login function was called.")
        // console.log("Email: " + this.$refs.email_field.input_value + " Password: "
        //   + this.$refs.password_field.input_value)
        this.$refs.email_field.emitInputValue()
        this.$refs.password_field.emitInputValue()
        console.log("Current User: " + this.user + " email: " + this.user.email + 
          " password: " + this.user.password)
        this.$store.dispatch('login', this.user)
          .then(() => this.$router.push({name: 'dashboard'}))
      },
      setEmail(email) {
        console.log("Received email: " + email)
        this.user.email = email
      },
      setPassword(password) {
        console.log("Received password: " + password)
        this.user.password = password
      }
    }
  }
</script>

<style>
/* Login Form */
.login-form {
  /*border: black solid;*/
  padding-top: 30px;
  position: relative;
  margin: auto; 
  width: 28rem;
}


/*  .login-form {
    border: black solid; 
    margin: auto; 
    width: 40rem;
  }*/
/*  .back-arrow {
    text-align: left; 
    cursor: pointer;
    font-size: 1.5rem;
  }

  .login-form {
    border-style: none none solid none;
    border-radius: 0px;
  }

  .login-form:focus {
      outline:none !important;
      outline-width: 0 !important;
      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
      border-bottom:1px solid #00b818;
  }

  .login-btn {
    border-radius: 0px;
    border: white solid;
  }

  .login-btn:hover {
    border: #00b818 solid;
    color: #00b818;
  }*/
</style>