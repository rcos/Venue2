<template>
  <div class="weekly-attendance-bar">

    <!-- Attendance Title -->
    <div class="title">Weekly Attendance Average</div>

    <div v-for="(data_avg, i) in weekly_averages" class="graph-container">
      <div class="label inline-block">{{ i == weekly_averages.length -1 ? 'This Week' : `${weekly_averages.length - i - 1} Week Ago` }}</div>
      <div class="bar-area inline-block">
        <div :class="'bar ' + (i == weekly_averages.length - 1 ? 'primary' : '')" :style="{width: `${100 * data_avg}%`}"></div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'AverageWeeklyAttendanceBar',
    components: {},
    props: {},
    data () {
      return {
        weekly_averages: []
      }
    },
    created () {
      this.weekly_averages = [0.7, 0.5, 0.8]
    },
    methods: {}
  }

</script>
