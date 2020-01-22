<template>
  <div class="container" style="padding:2rem;">
    <button type="button" class="btn button">Login</button>
    <button type="button" class="btn button">Sign Up</button>
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
  border: black solid;
  color: black;
  font-size: 1.5rem;
  margin-right: 1rem;
  margin-left: 1rem;
  width: 8rem;
  margin-top: 1rem;
}
</style>