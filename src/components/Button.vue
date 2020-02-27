<template>
  <div class="container" style="padding:2rem;">
    <button type="button" class="btn button shadow" id="venue-btn" 
      @click="$emit('button-clicked')">{{ btn_str }}</button>
  </div>
</template>

<script>
  export default {
    name: 'Button',
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