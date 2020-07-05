<template>

  <div v-if="data_loaded">
    <div v-if="lecture_data.length == 0" :style="{textAlign: 'center'}">No upcoming lectures.</div>
    <div v-else :style="{margin: '0 40px'}">

      <!-- Loop through each lecture_data -->
      <router-link v-for="lecture in lecture_data" :key="lecture._id" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}">
        <div class="course-info-upcoming-lecture-pill">
          <div class="background-pill"></div>
          <div class="foreground-pill">
            <div class="lecture-title">{{ lecture.title }}</div>
            <div class="lecture-date">{{ getDate( lecture.start_time ) }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else :style="{textAlign: 'center'}"><SquareLoader /></div>

</template>
<script>

  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureAPI from '@/services/LectureAPI.js'
  import moment from 'moment'

  export default {
    name: 'UpcomingLecturesList',
    components: {
      SquareLoader
    },
    props: {
      mobileMode: Boolean,
      section_id: String,
      selected_section: String,
      lecture_data: Array
    },
    data () {
      return {
        data_loaded: Boolean
      }
    },
    created () {
      this.lecture_data.sort((a,b) => a.start_time - b.start_time)
    },
    methods: {
      getDate (date_string) {
        return moment(date_string).fromNow()
      }
    }
  }

</script>
