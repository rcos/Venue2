<template>
  <div>
    <h2>Dashboard</h2>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'Dashboard',
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