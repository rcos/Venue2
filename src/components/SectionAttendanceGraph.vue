<template>
  <div>
    <div :style="{fontWeight: 'bold'}">Section Attendance By Day</div>
    <AttendanceStatisticsLineGraph
      class="line-graph"
      v-if="section_data != null"
      :chartdata='{datasets: [{ data: section_data }]}'
      :options='getChartOptions ()'
    />
  </div>
</template>

<script>

  import StatsAPI from '@/services/StatsAPI'
  import AttendanceStatisticsLineGraph from '@/components/AttendanceStatisticsLineGraph.vue'

  export default {
    name: 'SectionAttendanceGraph',
    components: {
      AttendanceStatisticsLineGraph
    },
    props: {
      section_id: String
    },
    data () {
      return {
        section_data: Object
      }
    },
    created () {
      this.section_data = null
      this.getSectionData ()
    },
    methods: {
      getChartOptions () {
        return {
                scales: { xAxes: [{ type: 'time', time: { min: 1586799984000, max: 1591033584000 } }] },
                legend: false,
                maintainAspectRatio: false
              }
      },
      getSectionData () {
        StatsAPI.getDataForSection(this.section_id)
        .then(response => {
          console.log(`fulfilled`)
          console.log(response)
          this.section_data = response
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }

</script>
