<template>
  <div>
    <div :style="{fontWeight: 'bold'}">Student Attendance By Day</div>
    <AttendanceStatisticsLineGraph
      :chartdata='{datasets: [{ data: this.student_dataset }]}'
      :options='getChartOptions ()'
    />
  </div>
</template>
<script>
  import AttendanceStatisticsLineGraph from '@/components/AttendanceStatisticsLineGraph.vue'
  import StatsAPI from '@/services/StatsAPI'

  export default {
    name: 'StudentAttendanceGraph',
    components: {
      AttendanceStatisticsLineGraph
    },
    props: {
      section_id: String,
      student_id: String
    },
    data () {
      return {
        student_dataset: []
      }
    },
    created () {
      this.student_dataset =[]
      this.getStudentStats ()
    },
    methods: {
      getStudentStats () {
        StatsAPI.getDataForStudent(this.student_id, this.section_id)
        .catch(err => { console.log(err) })
        .then(response => {
          this.student_dataset = response
        })
      },
      getChartOptions () {
        return {
                scales: { xAxes: [{ type: 'time', time: { min: 1586799984000, max: 1591033584000 } }] },
                legend: false,
                maintainAspectRatio: false
              }
      }
    }
  }

</script>
