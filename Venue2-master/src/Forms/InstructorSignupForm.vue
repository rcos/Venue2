<template>
  <div
    class="container shadow"
    style="border:#ededed solid thin; width:25rem; margin-top:1rem;"
  >
    <div @click="$emit('show-signup-buttons')" class="back-arrow">←</div>
    <form style=" padding-top:1rem; padding-bottom:1rem;">
      <div class="form-group">
        <input
          type="text"
          class="form-control login-form"
          placeholder="First Name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control login-form"
          placeholder="Last Name"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control login-form"
          placeholder="Email"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control login-form"
          placeholder="Password"
        />
      </div>
      <button type="submit" class="btn shadow-sm login-btn">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "InstructorSignupForm",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
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
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  border-bottom: 1px solid #00b818;
}

.login-btn {
  border-radius: 0px;
  border: white solid;
}

.login-btn:hover {
  border: #00b818 solid;
  color: #00b818;
}

/*Disable arrows on number fields*/
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
