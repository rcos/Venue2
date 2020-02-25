<template>
  <div>
    <div v-if="hasActive(determineActive(classes))">
      <div class="section-title">Active</div>
      <ActiveClassModal :active_info='getActive(determineActive(classes))' />
    </div>
    <div v-else>
      <div :style="{textAlign: 'center', opacity: 0.8, marginBottom: '20px'}">~ No Active classes ~</div>
    </div>


    <div class="section-title">Today's</div>

    <div>
      <DailyClassLog :logInfo="determineActive(classes)" />
    </div>
  </div>
</template>

<script>
import DailyClassLog from './DailyClassLog.vue'
import ActiveClassModal from './ActiveClassModal.vue'

export default {
  name: 'ClassEvents',
  components: {
    DailyClassLog,
    ActiveClassModal
  },
  props: {},
  methods: {
    getActive: (classes_) => {
      for (let i in classes_) {
        if ('active' in classes_[i] && classes_[i].active == true) {
          return classes_[i];
        }
      }

      return undefined
    },
    hasActive: (classes_) => {
      for (let i in classes_) {
        if ('active' in classes_[i] && classes_[i].active == true)
          return true;
      }

      return false
    },
    determineActive: (classes_) => {

      // get current time information
      let datetime_info = new Date ();
      let hours_ = datetime_info.getHours ();
      let minutes_ = datetime_info.getMinutes ();

      // convert time to minutes
      let time_in_mins = (hours_ * 60) + minutes_;

      for (let i in classes_) {
        let class_ = classes_[i];

        if (time_in_mins >= class_.time &&
            time_in_mins <= class_.time + class_.duration)
        {
          classes_[i].active = true;
        }
      }

      return classes_
    }
  },
  data() {
    return {
      classes: [
        {
          name: "Data Structures 3",
          courseCode: "CSCI 5000",
          time: 600,
          duration: 120
        },{
          name: "Intro to AI",
          courseCode: "CSCI 4020",
          time: 780,
          duration: 120
        },{
          name: "Gender Studies",
          courseCode: "HASS 3050",
          time: 960,
          duration: 120
        },{
          name: "Technological Sentience",
          courseCode: "STSS 4100",
          time: 1200,
          duration: 120
        }
      ]
    }
  },
}
</script>

<style>
  .section-title {
    text-align: left;
    font-size: 20px;
    opacity: 0.7;
    margin-bottom: 15px;
  }
</style>
