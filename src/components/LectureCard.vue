<template>
  <div class="lecture-card">
    <div class="lecture-card-background">
    </div>
    <div class="lecture-card-foreground">
      <InstructorLectureCard v-if="is_instructor" :lecture_type="lecture_type" />
      <StudentLectureCard v-else :lecture_type="lecture_type" />
    </div>
  </div>
</template>

<script>
  import InstructorLectureCard from '@/components/InstructorLectureCard.vue';
  import StudentLectureCard from '@/components/StudentLectureCard.vue';

  export default {
    name: 'LectureCard',
    props: {
      lecture_type: String
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
    background-color: #4ECC4B;
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
  }

</style>
