<template>
  <div id="lecture-info-container-root">
    <SquareLoader role="status" v-if="!lecture_has_loaded || !polls_loaded"/>
    <div v-else>
      <InstructorLectureInfo v-if="is_instructor" :lecture="lecture" :is_instructor="is_instructor" :polls="polls" />
      <StudentLectureInfo v-else :lecture="lecture" :is_instructor="is_instructor" :polls="polls" />
    </div>
  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import PlaybackPollAPI from '@/services/PlaybackPollAPI.js'

  import InstructorLectureInfo from '@/components/InstructorLectureInfo.vue';
  import StudentLectureInfo from '@/components/StudentLectureInfo.vue';
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

  export default {
    name: 'LectureInfo',
    components: {
      InstructorLectureInfo,
      StudentLectureInfo,
      SquareLoader
    },
    data(){
      return {
        lecture: {},
        lecture_has_loaded: false,
        polls_loaded: false,
        is_instructor: Boolean,
        polls: []
      }
    },
    async created() {
      this.lecture_id = this.$route.params.lecture_id
      this.is_instructor = this.$store.state.user.current_user.is_instructor
      await this.getLecture()
      this.setLectureAndCheckinWindowStatus()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        PlaybackPollAPI.getByLecture(this.lecture_id)
        .then(res => {
          this.polls = res.data
          this.polls_loaded = true
        })
      },
      setLectureAndCheckinWindowStatus() {
        let current_time = Date.now()
        let lecture_start_time = new Date(this.lecture.start_time)
        let lecture_end_time = new Date(this.lecture.end_time)
        let playback_submission_start_time = new Date(this.lecture.playback_submission_start_time)
        let playback_submission_end_time = new Date(this.lecture.playback_submission_end_time)

        // Set whether the lecture is upcoming, live, or over for both active and playback lectures
        if(this.lecture.allow_live_submissions) {
          if(current_time < lecture_start_time)
            this.lecture.lecture_status = "is_upcoming"
          else if(current_time >= lecture_start_time && current_time <= lecture_end_time)
            this.lecture.lecture_status = "is_live"
          else
            this.lecture.lecture_status = "is_over"
        } else if(this.lecture.allow_playback_submissions) {
          if(current_time < playback_submission_start_time)
            this.lecture.lecture_status = "is_upcoming_playback"
          else if(current_time >= playback_submission_start_time && current_time <= playback_submission_end_time)
            this.lecture.lecture_status = "is_active_playback"
          else
            this.lecture.lecture_status = "is_over_playback"
        } else {
          console.log("ERROR: Lecture not allowing live or playback submissions")
        }
        this.setCheckinWindowStatus()
      },
      setCheckinWindowStatus() {
        if(this.lecture.lecture_status === "is_live") {
          let current_time = new Date()
          let found_open_checkin_window = false
          for(let i = 0; i < this.lecture.checkins.length; i++) {
            let current_checkin = this.lecture.checkins[i]
            let current_checkin_start_time = new Date(current_checkin.start_time)
            let current_checkin_end_time = new Date(current_checkin.end_time)
            if(current_time >= current_checkin_start_time && current_time <= current_checkin_end_time){
              this.lecture.checkin_window_status = "open"
              this.lecture.checkin_index = i
              this.lecture.current_checkin = current_checkin
              found_open_checkin_window = true
              break
            } else {
            }
          }
          if(!found_open_checkin_window)
            this.lecture.checkin_window_status = "closed"
        } else {
          this.lecture.checkin_window_status = "closed"
        }
        this.lecture_has_loaded = true
      }
    }
  }
</script>

<style scoped>
  #lecture-info-container-root {
    padding: 0 2rem;
  }
</style>