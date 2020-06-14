<template>
  <div class="lecture-card">
    <div class="lecture-card-background">
    </div>
    <div class="lecture-card-foreground">
      <InstructorLectureCard v-if="is_instructor" />
      <StudentLectureCard v-else />
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
    height: 5rem;
    margin-top: 2rem;
    border-radius: 5px;
    background-color: #4ECC4B;
  }

  .lecture-card-foreground {
    position: absolute;
    height: 5rem;
    width: 96.5%;
    margin-top: -4.5rem;
    /*margin-left:.5rem;*/
    margin-left: 1.7%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
    z-index: 4;
  }

</style>
