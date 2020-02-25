<template>
  <div class="input-field-container">
    <div class="input-field">
      <div class="input-label">{{label}}</div><input :type="type">
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
      }
    }
  }
</script>
