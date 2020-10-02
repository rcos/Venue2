<template>
  <div>
    <h2 id="set-permanent-header">Set Password for {{ user.user_id }}</h2>
    <form @submit.prevent="setPermanentPassword">
      <InputField ref="password_field" label="password" v-on:set-input-value="setPassword" />
      <button class="btn btn-primary">Set Password</button>
    </form>
  </div>
</template>

<script>
  import InputField from '@/components/InputField.vue'

  export default {
    name: 'OnboardUser',
    components: {
      InputField
    },
    data(){
      return {
        user: {}
      }
    },
    created() {
      this.user_id = this.$route.params.user_id
      this.user = this.$route.query.user
      // prevents page refreshes and hardcoding of user ids
      // if(!this.user.user_id)
      //   this.$router.push({name: 'landing_page'})
    },
    methods: {
      async setPermanentPassword() {
        this.$refs.password_field.emitInputValue()
        this.$store.dispatch('setPermanentPassword', this.user)
          .then((res) => {this.$router.push({name: 'dashboard'})})
          .catch((err) => console.log("error setting password for user",err))
      },
      setPassword(password) {
        this.user.password = password
      }
    }
  }
</script>

<style scoped>
  #set-permanent-header {
    margin-top: 2rem;
  }
  #password-container {
    margin: auto;
  }
  .set-permanent-password-container {
    margin-top: 2rem;
  }
</style>