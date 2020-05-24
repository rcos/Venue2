<template>

  <div :class="'lecture-pill-min ' + color">
    <div class="left">{{ name }}</div>
    <div class="middle">{{ middle }}</div>
    <div class="right">{{ right }}</div>
  </div>

</template>
<script>

export default {
  name: 'LecturePill',
  props: {
    name: String,
    middle: String,
    right: String,
    color: String
  }
}

</script>
