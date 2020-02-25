<template>
  <div :style="{marginBottom: '30px'}">
    <div v-if="active_info != undefined" class="active-class-modal-container">
      <div class="active-class-identiifer"></div>
      <div class="active-class-modal">
        <div class="row">
          <div class='col-4 class-code'>{{active_info.courseCode}}</div>
          <div class='col-6 class-name'>{{active_info.name}}</div>
          <div class='col-2 time-left'>{{getTimeLeft(active_info)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // clr: #FC5D60

  export default {
    name: 'ActiveClassModal',
    props: {
      active_info: {
        type: Object,
        required: true
      }
    },
    methods: {
      getTimeLeft: (class_info) => {

        let datetime_info = new Date ();
        let mins_ = datetime_info.getMinutes ();
        let hrs_ = datetime_info.getHours ();

        let time_in_mins = (60 * hrs_) + mins_;

        let difference = (class_info.time + class_info.duration) - time_in_mins;

        return difference + 'm';

      }
    }
  }
</script>

<style>
.active-class-modal-container {
  position: relative;
}

.active-class-modal-container .active-class-identiifer {
   width: 40px;
   height: 35px;
   background-color: #FC5D60;
   border-radius: 5px;
   position: absolute;
   top: 7.5px;
   z-index: 1;
}

.active-class-modal {
  background-color: white;
  font-weight: 11px;
  margin-left: 25px;
  height: 50px;
  position: relative;
  z-index: 2;
  padding: 0px 10px;
  line-height: 50px;
  box-shadow: 0px 1px 8px 5px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
}

.active-class-modal .class-code {
  color: #1591C5;
  font-size: 11px;
  text-align: center;
}

.active-class-modal .class-code {
  text-align: center;
  opacity: 0.7;
}

.active-class-modal .time-left {
  color: #FF7B7B;
  font-size: 10px;
  text-align: right;
}
</style>
