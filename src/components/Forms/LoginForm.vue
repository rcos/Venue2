<template>
  <div class="container shadow" style="border:#ededed solid thin; width:25rem; margin-top:1rem;">
    <div class="back-arrow">←</div>
    <form style=" padding-top:1rem; padding-bottom:1rem;">
      <div class="form-group">
        <input type="email" class="form-control login-form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control login-form" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn shadow-sm login-btn">Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'LoginForm',
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
  .back-arrow {
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
  }
</style>