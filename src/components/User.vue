<template>
  <!-- ADDING USER -->
  <div>
    <h1>Create A User</h1>
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
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>

  <!-- SHOWING USERS -->
    <h1>Users</h1>
      <table class="table table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td><router-link :to="{name: 'editUser', params: { id: user._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteUser(user._id)">Delete</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
    export default {
      data(){
        return {
          user:{},
          users: []
        }
    },
    created() {
      let uri = 'http://localhost:4000/users';
      this.axios.get(uri).then(response => {
        this.users = response.data;
      });
    },
    methods: {
      addUser(){
        let uri = 'http://localhost:4000/users/add';
        this.axios.post(uri, this.user).then(() => {
           this.$router.go();
        });
        console.log(this.user);
      },
      deleteUser(id)
      {
        let uri = `http://localhost:4000/users/delete/${id}`;
        this.axios.delete(uri).then(response => {
          this.users.splice(this.users.findIndex(i => i._id == id), 1);
        });
      }
    }
  }
</script>