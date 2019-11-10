<template>
  <div>
    <h1>Edit User</h1>
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
              <textarea class="form-control" v-model="user.last_name" rows="5"></textarea>
            </div>
          </div>
        </div><br />
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
      // let uri = `http://localhost:4000/users/edit/${this.$route.params.id}`;
      // this.axios.get(uri).then((response) => {
      //     this.user = response.data;
      // });
      this.getCurrentUser();
    },
    methods: {
      // async addUser(evt){
      //   evt.preventDefault(); // prevents the form's default action from redirecting the page
      //   const response = await UserAPI.addUser(this.user);
      //   this.users.push(response.data);
      //   this.user = {}; // clear the input field

      //   // let uri = 'http://localhost:4000/users/add';
      //   // this.axios.post(uri, this.user).then(() => {
      //   //    this.$router.go();
      //   // });
      //   // console.log(this.user);
      // },
      async getCurrentUser() {
        let user_id = this.$route.params.id;
        const response = await UserAPI.getUser(user_id);
        this.user = response.data;
      },
      // updateUser() {
      //   let uri = `http://localhost:4000/users/update/${this.$route.params.id}`;
      //   this.axios.post(uri, this.user).then(() => {
      //     this.$router.push({name: 'user'});
      //   });
      // }
      async updateUser() {
        let user_id = this.$route.params.id;
        const response = await UserAPI.updateUser(user_id, this.user);
        this.$router.push({name: 'user'});
      }
    }
  }
</script>