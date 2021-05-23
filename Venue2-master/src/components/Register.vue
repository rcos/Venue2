<template>
  <div>
    <form
      class="text-center border border-light p-5 login"
      @submit.prevent="login"
    >
      <h1 align="center" class="mb-4">Register Account</h1>
      <div class="form-row mb-4">
        <div class="col">
          <!-- First name -->
          <input
            required
            v-model="firstName"
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control"
            placeholder="First name"
          />
        </div>
        <div class="col">
          <!-- Last name -->
          <input
            required
            v-model="lastName"
            type="text"
            id="defaultRegisterFormLastName"
            class="form-control"
            placeholder="Last name"
          />
        </div>
      </div>

      <!-- E-mail -->
      <input
        required
        v-model="email"
        type="email"
        id="defaultRegisterFormEmail"
        class="form-control mb-4"
        placeholder="E-mail"
      />

      <!-- Password -->
      <input
        required
        v-model="password"
        type="password"
        id="defaultRegisterFormPassword"
        class="form-control"
        placeholder="Password"
        aria-describedby="defaultRegisterFormPasswordHelpBlock"
      />
      <small
        id="defaultRegisterFormPasswordHelpBlock"
        class="form-text text-muted mb-4"
      >
        At least 8 characters and 1 digit
      </small>

      <!-- Require Password -->
      <input
        required
        v-model="confirmPassword"
        type="password"
        id="defaultRegisterFormConfirmPassword"
        class="form-control"
        placeholder="Confirm password"
        aria-describedby="defaultRegisterFormConfirmPasswordHelpBlock"
      />
      <br />
      <!-- Sign up button -->
      <button>
        <router-link to="/Dashboard" class="btn btn-primary"
          >Create Account</router-link
        >
      </button>
      <!-- <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button> -->
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
