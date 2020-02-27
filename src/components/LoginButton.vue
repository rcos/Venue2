<template>
  <div class="container" style="padding:2rem;">
    <button type="button" class="btn button shadow" id="login" 
      @click="$emit('show-login-form')">Get Started</button>
<!--     <button type="button" class="btn button shadow" id="signup"
      @click="$emit('show-signup-buttons')">Sign Up</button> -->
  </div>
</template>

<script>
  export default {
    name: 'LoginButton',
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
  font-size: 1.5rem;
  width: 12rem;
  margin-top: 1.5rem;
  border: #007bff solid;
  color: #007bff;
  border-radius: 5px;
}

#login:hover {
  background-color: #007bff;
  color: white;
}

#signup:hover {
  border: #e83e8c solid;
  color: #e83e8c;
}
</style>