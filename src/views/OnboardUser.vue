<template>
  <div>
    <h2>Onboard User</h2>
    <form @submit.prevent="onboardUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>first_name:</label>
            <input type="text" class="form-control" v-model="user.first_name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>last_name:</label>
            <input class="form-control" v-model="user.last_name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>user_id:</label>
            <input class="form-control" v-model="user.user_id">
          </div>
        </div>
      </div>
      <div>
        is_instructor: <input type="checkbox" v-model="user.is_instructor">
      </div><br/>
      <div class="form-group">
        <button class="btn btn-primary">Onboard</button>
      </div>
    </form>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'OnboardUser',
    data(){
      return {
        user: {}
      }
    },
    created() {
    },
    methods: {
      async onboardUser(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        this.setEmail()
        this.setTempPassword()
        const response = await UserAPI.onboardUser(this.user);
        this.$router.push({name: 'users'});
      },
      setEmail() {
        this.user.email = this.user.user_id + "@rpi.edu"
      },
      setTempPassword() {
        this.user.temp_password = this.generateRandomPassword()
      },
      generateRandomPassword() {
        let length = 12,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n))
        }
        return password
      }
    }
  }
</script>