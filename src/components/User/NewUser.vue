<template>
  <div>
    <h2>Create A User</h2>
    <form @submit.prevent="addUser">
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
            <label>email:</label>
            <input class="form-control" v-model="user.email">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>password:</label>
            <input class="form-control" v-model="user.password">
          </div>
        </div>
      </div>
      <div>
        is_instructor: <input type="checkbox" v-model="user.is_instructor">
      </div><br/>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NewUser',
    data(){
      return {
        user: {}
      }
    },
    created() {
    },
    methods: {
      async addUser(evt){
        if(this.user.is_instructor){
          console.log("Should add an instructor")
        }
        else{
          console.log("Should add a student")
        }
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        const response = await UserAPI.addUser(this.user);
        this.$router.push({name: 'user'});
      },
    }
  }
</script>