<template>
  <div class="input-field-container">
    <div class="input-field">
      <div class="input-label"><label class="input-field-label" :id="label+'-label'">{{label}}</label></div>
      <input v-on:keyup="change" v-on:change="change" v-model="input_value" :type="type" :aria-labelledby="label+'-label'">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputField',
    props: {
      change: {
        type: Function,
        default: () => {}
      },
      type: {
        type: String,
        default: "text"
      },
      label: {
        type: String,
        default: "<empty>"
      },
    },
    data() {
      return {
        input_value: ""
      }
    },
    methods: {
      emitInputValue() {
        this.$emit('set-input-value', this.input_value)
      }
    }
  }
</script>

<style scoped>
.input-field-label {
  margin: 0;
}
</style>
