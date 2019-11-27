<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="user.first_name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input class="form-control" v-model="user.last_name" rows="5">
            </div>
          </div>
        </div><br />
        is_instructor: <input type="checkbox" v-model="user.is_instructor">
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.getCurrentUser();
    },
    methods: {
      async getCurrentUser() {
        let user_id = this.$route.params.id;
        const response = await UserAPI.getUser(user_id);
        this.user = response.data;
      },
      async updateUser() {
        let user_id = this.$route.params.id;
        const response = await UserAPI.updateUser(user_id, this.user);
        this.$router.push({name: 'user'});
      }
    }
  }
</script>