<template>
  <div class="lecture-card">
    <div v-if="lecture_type === 'Live'" class="lecture-card-background" :class="{'live-lecture-open':lecture.checkin_window_status === 'open', 'live-lecture-closed':lecture.checkin_window_status ==='closed'}">
    </div>
    <div v-else class="lecture-card-background" :class="{'playback-lecture':lecture_type === 'Playback', 'recent-lecture':lecture_type === 'Recent', 'upcoming-lecture':lecture_type === 'Upcoming'}">
    </div>
    <div class="lecture-card-foreground">
      <InstructorLectureCard v-if="is_instructor" :lecture_type="lecture_type" :lecture="lecture" />
      <StudentLectureCard v-else :lecture_type="lecture_type" :lecture="lecture" />
    </div>
  </div>
</template>

<script>
  import InstructorLectureCard from '@/components/InstructorLectureCard.vue';
  import StudentLectureCard from '@/components/StudentLectureCard.vue';

  export default {
    name: 'LectureCard',
    props: {
      lecture_type: String,
      lecture: Object
    },
    computed: {
    },
    components: {
      InstructorLectureCard,
      StudentLectureCard
    },
    data(){
      return {
        is_instructor: Boolean
      }
    },
    created() {
      this.is_instructor = this.$store.state.user.current_user.is_instructor
    },
    methods: {

    }
  }
</script>

<style scoped>
  .lecture-card {
    position: relative;
  }

  .lecture-card-background {
    height: 4rem;
    margin-top: 2rem;
    border-radius: 5px;
    /*background-color: #4ECC4B;*/
  }

  .live-lecture-open {
    background-color: #4ECC4B;
  }

  .live-lecture-closed {
    background-color: #F29F33;
  }

  .playback-lecture {
    background-color: #516DED;
  }

  .recent-lecture {
    background-color: #858585;
  }

  .upcoming-lecture {
    background-color: #00B3FF;
  }

  .lecture-card-foreground {
    position: absolute;
    height: 4rem;
    width: 96.5%;
    margin-top: -3.5rem;
    /*margin-left:.5rem;*/
    margin-left: 1.7%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
    z-index: 4;
  }

  /deep/ .lecture-card-section {
    height: 4rem;
    display: inline-block;
    /*border: black solid;*/
    vertical-align: top;
  }

  /deep/ #left-section {
    width: 30%;
  }

  /deep/ #middle-section {
    width: 40%;
  }

  /deep/ #right-section {
    width: 30%;
  }

  /deep/ .course-name {
    font-size: .75rem;
    margin-top: .75rem;
    color: #466D85;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 90%;
  }

  /deep/ .course-title {
    font-size: .75rem;
    color: #1591C5;
    font-weight: bold;
    margin-top: .5rem;
  }

  /deep/ .lecture-name {
    color: #2C3E50;
    font-size: 1.25rem;
    margin-top: 1rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 95%;
  }

  /deep/ .clock {
    display: inline-block;
    vertical-align: middle;
    height: 1rem;
    font-weight: bold;
  }

  /deep/ .right-container {
    margin-top: 1.2rem;
    /*border: black solid;*/
    width: 98%;
    font-size: .9rem;
    /*font-weight: bold;*/
  }

  /deep/ .lecture-time-text {
    display: inline-block;
    font-size: .8rem;
    margin-left: .5rem;
    font-weight: bold;
  }

  /deep/ .playback-percentage-text {
    color: #516DED;
    font-weight: bold;
  }

  /deep/ .recent-percentage-text {
    color: #858585;
    font-weight: bold;
  }

  /deep/ .upcoming-text {
    color: #00B3FF;
  }

</style>
