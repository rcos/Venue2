<template>
<div class="desktop-active-class-modal">
  <div class="bg"></div>
  <div class="fg">
    <div class="class-info">
      <div class="class-name">{{class_info.name}}</div>
      <div class="class-code">{{class_info.course_code}}</div>
    </div>
    <div class="time-remaining">
      35m
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ActiveClassModal',
  props: {
    class_info: Object
  }
}
</script>

<style>
.desktop-active-class-modal {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  height: 70px;
  position: relative;
}

.desktop-active-class-modal .bg,
.desktop-active-class-modal .fg {
  position: absolute;
}

.desktop-active-class-modal .bg {
  background-color: #FC5D60;
  width: 104%;
  height: 70px;
  left: -2%;
  border-radius: 5px;
}

.desktop-active-class-modal .fg {
  background-color: white;
  width: 100%;
  top: 6px;
  height: 70px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px 20px;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
}

.desktop-active-class-modal .time-remaining,
.desktop-active-class-modal .class-info {
  display: inline-block;
  vertical-align: top;
}

.desktop-active-class-modal .time-remaining {
  width: 12%;
  color: #FF7B7B;
  font-size: 13px;
  text-align: right;
  height: 70px;
  line-height: 70px;
  position: relative;
  top: -5px;
}
.desktop-active-class-modal .class-info {
  width: 85%;
}

.desktop-active-class-modal .class-info .class-name {
  font-size: 15px;
  margin-top: 10px;
}

.desktop-active-class-modal .class-info .class-code {
  font-size: 12px;
  color: #1591C5;
}
</style>
