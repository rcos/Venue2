<template>
  <div class="container" style="padding:2rem;">
    <button type="button" class="btn button shadow" id="login">Login</button>
    <button type="button" class="btn button shadow" id="signup">Sign Up</button>
  </div>
</template>

<script>
  export default {
    name: 'LoginSignupButtons',
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
  width: 8rem;
  margin-top: 1.5rem;
}

/*#login {
  border: #007bff solid;
  color: #007bff;
}*/
</style>