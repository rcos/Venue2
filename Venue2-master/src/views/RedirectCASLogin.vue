<template>
  <div>
    <h1>Redirecting... please wait...</h1>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('loginCAS')
        .then(() => this.$router.push({name: 'dashboard'}))
    }
  }
</script>

<style scoped>

</style>
