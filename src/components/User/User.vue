<template>
  <!-- ADDING USER -->
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
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>

  <!-- SHOWING USERS -->
    <h2>Users</h2>
      <table class="table table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>is_instructor</th>
            <th>is_ta</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.is_instructor }}</td>
                <td>{{ user.is_ta }}</td>
                <td><router-link :to="{name: 'editUser', params: { id: user._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteUser(user._id)">Delete</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    data(){
      return {
        user:{},
        users: []
      }
    },
    created() {
      this.loadUsers();
    },
    methods: {
      async loadUsers () {
        const response = await UserAPI.getUsers();
        this.users = response.data;
      },
      async addUser(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        const response = await UserAPI.addUser(this.user);
        this.users.push(response.data);
        this.user = {}; // clear the input field
      },
      async deleteUser(id){
        const response = await UserAPI.deleteUser(id);
        this.users.splice(this.users.findIndex(i => i._id == id), 1);
      }
    }
  }
</script>