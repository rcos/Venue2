<<template>
  <div class="course-list">
    <div v-if="is_instructor">
      <div v-if="courses.length > 0">
        <CourseCard v-for="course in courses" v-bind:course="course" />
      </div>
      <div v-else>
        <p class="no-container" id="no-courses">No courses</p>
      </div>
    </div>
    <div v-else>
      <div v-if="sections.length > 0">
        <CourseCard v-for="section in sections" v-bind:section="section" />
      </div>
      <div v-else>
        <p class="no-container" id="no-courses">No courses</p>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue'
  import CourseAPI from '@/services/CourseAPI.js'
  import SectionAPI from '@/services/SectionAPI.js'

  export default {
    name: 'CourseList',
    components: {
      CourseCard
    },
    data(){
      return {
        courses: [],
        sections: [],
        is_instructor: Boolean
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.is_instructor = this.current_user.is_instructor
      if(this.is_instructor)
        this.getInstructorCourses()
      else
        this.getSectionsWithCourses()
    },
    methods: {
      async getInstructorCourses() {
        let response = await CourseAPI.getInstructorCourses(this.current_user._id)
        this.courses = response.data
      },
      async getSectionsWithCourses() {
        let response = await SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        this.sections = response.data
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