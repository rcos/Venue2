<template>
  <div>
    <form class="text-center border border-light p-5 login" @submit.prevent="login">
        <h1 align="center" class="mb-4">Login</h1>

        <!-- Email -->
        <input require v-model="user.email" type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">

        <!-- Password -->
        <input require v-model="user.password" type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password">

        <div class="d-flex justify-content-around">
            <div>
                <!-- Remember me -->
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                    <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                </div>
            </div>
        </div>

        <!-- Sign in button -->

        <button>
          <router-link to="/Dashboard" class="btn btn-primary">Sign in</router-link>
        </button>
        <!-- <button class="btn btn-info btn-block my-4" type="submit">Sign in</button> -->

        <!-- Register -->
        <div class="d-flex justify-content-around">
          <p>Don't have an account?
            <a href="./Register">Register</a>
          </p>
        </div>

    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      console.log("Login function was called")
      this.$store.dispatch('login', this.user)
        .then(() => this.$router.push({name: 'dashboard'}))
    }
  }
};
</script>
