<template>
  <div>
    <h2>Dashboard</h2>
    <Users />
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import Users from './User/Users'

  export default {
    name: 'Dashboard',
    components: {
      Users
    },
    data(){
      return {
        user: {}
      }
    },
    created() {
    },
    methods: {
      async signUp(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        const response = await UserAPI.addUser(this.user);
        this.$router.push({name: 'users'});
      },
    }
  }
</script>