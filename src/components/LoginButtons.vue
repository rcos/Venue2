<template>
  <div class="container" style="padding:2rem;">
    <button type="button" class="btn button shadow" id="login">Cas Login</button>
    <button type="button" class="btn button shadow" id="signup"
      @click="$emit('show-login-form')">Venue Login</button>
    <div @click="$emit('show-signup-buttons')" style="margin-top:2rem;">
      or <span class="signup">Sign Up</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginButtons',
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.button {
  background-color: white;
  border-radius: 0%;
  font-size: 1.5rem;
  margin-right: 2rem;
  margin-left: 2rem;
  width: 12rem;
  margin-top: 1.5rem;
  border: white solid;
}

#signup:hover {
  border: #e83e8c solid;
  color: #e83e8c;
}

#login:hover {
  border: #007bff solid;
  color: #007bff;
}

.signup {
  cursor: pointer;
  color: #6610f2;
}

.signup:hover {
  color:#4300b0;
}
</style>