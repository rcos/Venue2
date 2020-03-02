<template>
  <div>
    <div class="today-event-modal" v-for="event of events_info">
      <div class="bg">
      </div>
      <div class="fg">
        <div class='time-code'>10a</div>
        <div class='info'>
          <div class="class-name">{{event.name}}</div>
          <div class="class-code">{{event.course_code}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodayEventSchedule',
  props: {
    events_info: Array
  }
}
</script>

<style>
.today-event-modal {
  width: 220px;
  display: inline-block;
  position: relative;
  height: 70px;
  margin: 0 10px;
}

.today-event-modal .bg {
  background-color: #FC895D;
  left: -5px;
  top: -5px;
  width: 100%;
  position: absolute;
  height: 55px;
  border-radius: 5px;
}
.today-event-modal .fg {
  background-color: pink;
  width: 100%;
  position: absolute;
  height: 55px;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
}

.today-event-modal .fg .class-name {
  font-size: 14px;
  margin-top: 7px;
  color: rgba(0, 0, 0, 0.7);
}

.today-event-modal .fg .class-code {
  font-size: 12px;
  color: #1591C5;
  position: relative;
  top: -2px;
}

.today-event-modal .fg .time-code,
.today-event-modal .fg .info {
  display: inline-block;
  vertical-align: top;
}

.today-event-modal .fg .time-code {
  width: 25%;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
}

.today-event-modal .fg .info {
  width: 75%;
}
</style>
