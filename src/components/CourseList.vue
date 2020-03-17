<<template>
  <div class="course-list">
    <CourseCard v-for="course in courses" />
  </div>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue'
  import CourseAPI from '@/services/CourseAPI.js'

  export default {
    name: 'CourseList',
    components: {
      CourseCard
    },
    data(){
      return {
        courses: []
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.getInstructorCourses()
    },
    methods: {
      async getInstructorCourses() {
        let response = await CourseAPI.getInstructorCourses(this.current_user._id)
        this.courses = response.data
      }
    }
  }
</script>

<style scoped>
/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .course-list {
    margin-top: 1rem;
  }
}
</style>