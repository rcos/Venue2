<template>
<div class="desktop-section">
  <div class="section-title">{{title}}</div>
  <div class="section-body">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: String
  }
}
</script>

<style>
.desktop-section {
  width: 100%;
  margin: 30px 0px;
  box-sizing: border-box;
  padding: 0px 30px;
}

.desktop-section .section-title {
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  font-size: 18px;
  margin: 10px 0px 20px 0px;
}

.desktop-section .section-body {
  box-sizing: border-box;
  padding-left: 10px;
}
</style>
