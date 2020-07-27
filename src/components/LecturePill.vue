<template>

  <div :class="'lecture-pill-min ' + color">
    <div class="left">{{ name }}</div>
    <!-- <div class="middle">{{ middle }}</div> -->
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

<style scoped>
.lecture-pill-min {
  display: inline-flex;
  border-radius: 0.25rem;
}
.left,
.middle,
.right {
  display: inline-block;
  font-size: 0.9rem;
}

.left {
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.middle {
  width: 20%;
}

.right {
  width: 30%;
  text-align: right;
}
</style>
