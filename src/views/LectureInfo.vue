<template>
  <div>
    <div class="spinner-border" role="status" v-if="!lecture_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <InstructorLectureInfo v-if="is_instructor" :lecture="lecture" :is_instructor="is_instructor" />
      <StudentLectureInfo v-else :lecture="lecture" :is_instructor="is_instructor" />
    </div>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import InstructorLectureInfo from '@/components/InstructorLectureInfo.vue';
  import StudentLectureInfo from '@/components/StudentLectureInfo.vue';

  export default {
    name: 'LectureInfo',
    components: {
      InstructorLectureInfo,
      StudentLectureInfo
    },
    data(){
      return {
        lecture: {},
        all_students: [],
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        lecture_has_loaded: false,
        show_checkin_qr: -1,
        is_instructor: Boolean
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
          if(current_time < lecture_playback_submission_start_time)
            this.lecture.lecture_status = "is_upcoming_playback"
          else if(current_time >= lecture_playback_submission_start_time && current_time <= lecture_playback_submission_end_time)
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
      },
      setSubmissionWindowStatus() {
        let current_time = Date.now()
        for(let i=0;i<this.lecture.checkins.length;i++) {
          let start = new Date(this.lecture.checkins[i].start_time)
          let end = new Date(this.lecture.checkins[i].end_time)
          console.log(current_time-start,end-current_time)
          let self = this
          if(current_time < end) {
            if(start < current_time) {
              this.show_checkin_qr = i
            } else {
              setTimeout(function() {
                self.show_checkin_qr = i
              }, start-current_time);
            }
            setTimeout(function() {
              self.show_checkin_qr = -1
            }, end-current_time);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>