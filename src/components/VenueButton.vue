<template>
  <div
    class="venue-button-two"
    @click="$emit('button-clicked')">

    <div class="venue-button-two-fg">{{ btn_str }}</div>
    <div class="venue-button-two-bg"></div>
  </div>
</template>

<script>
  export default {
    name: 'VenueButton',
    props: {
      btn_str: String
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.button {
  background-color: white;
  font-size: 1.5rem;
  width: 12rem;
  margin-top: 1.5rem;
  border: #007bff solid;
  color: #007bff;
  border-radius: 5px;
}

#venue-btn:hover {
  background-color: #007bff;
  color: white;
}
</style>
