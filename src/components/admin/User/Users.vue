<template>
  <div>
    <h2>Users</h2>
      <table class="table table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>is_instructor</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.is_instructor }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.password }}</td>
                <td><router-link :to="{name: 'edit_user', params: { id: user._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteUser(user._id)">Delete</button></td>
              </tr>
          </tbody>
      </table>

      <button @click="logout">Log out</button>
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
      async deleteUser(id){
        const response = await UserAPI.deleteUser(id);
        this.users.splice(this.users.findIndex(i => i._id == id), 1);
      },
      logout () {
        this.$store.dispatch('logout')
          .then(() => this.$router.push({name: 'dashboard'}))
      }
    }
  }
</script>