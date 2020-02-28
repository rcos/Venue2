<template>
  <div class="input-field-container">
    <div class="input-field">
      <div class="input-label">{{label}}</div>
      <input v-model="input_value" :type="type">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InputField',
    props: {
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
        input_value: {
          type: String,
          default: ""
        }
      }
    },
    methods: {
      emitInputValue() {
        this.$emit('set-input-value', this.input_value)
      }
    }
  }
</script>