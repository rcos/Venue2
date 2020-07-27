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
        is_instructor: Boolean,
        lecture: {},
        lecture_has_loaded: false,
        polls_loaded: false,
        polls: []
      }
    },
    async created() {
      this.lecture_id = this.$route.params.lecture_id
      this.is_instructor = this.$store.state.user.current_user.is_instructor
      await this.getLecture()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
        PlaybackPollAPI.getByLecture(this.lecture_id)
        .then(res => {
          this.polls = res.data
          this.polls_loaded = true
        })
      }
    }
  }
</script>

<style scoped>
  #lecture-info-container-root {
    padding: 0 2rem;
  }
</style>