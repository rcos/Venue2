<template>
  <div>
    <div class="today-schedule-mobile-tablet" v-for="event of events_info">
      <div class="time">3a</div>
      <div class="color-identifier"></div>
      <div class="content-tablet">
        <div class="course-name">{{event.name}}</div>
        <div class="course-code">{{event.course_code}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodayEventScheduleMobile',
  props: {
    events_info: Array
  }
}
</script>

<style>
.today-schedule-mobile-tablet {
  height: 85px;
  position: relative;
}

.today-schedule-mobile-tablet .time,
.today-schedule-mobile-tablet .color-identifier,
.today-schedule-mobile-tablet .content-tablet {
  display: inline-block;
}

.today-schedule-mobile-tablet .time {
  position: relative;
  top: 20px;
  color: rgba(0, 0,0, 0.5);
  font-size: 11px;
}

.today-schedule-mobile-tablet .color-identifier {
  width: 200px;
  height: 55px;
  background-color: #FC895D;
  position: absolute;
  top: 15px;
  left: 25px;
  border-radius: 5px;
}

.today-schedule-mobile-tablet .content-tablet {
  position: absolute;
  background-color: white;
  left: 70px;
  width: 79%;
  height: 65px;
  top: 10px;
  border-radius: 5px;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 0 0 0 20px;
}

.today-schedule-mobile-tablet .content-tablet .course-name {
  margin-top: 12px;
  color: rgba(0, 0, 0, 0.7);
}

.today-schedule-mobile-tablet .content-tablet .course-code {
  color: #1591C5;
}
</style>
