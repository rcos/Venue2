<<template>
  <div class="course-list">
    <div v-if="is_instructor">
      <div v-if="courses.length > 0">
        <CourseCard v-for="course in courses" v-bind:course="course" v-bind:box_color="getBoxColor()" />
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
        is_instructor: Boolean,
        box_color_index: Number,
        box_colors: [
          "blue",
          "orange",
          "green",
          "red",
          "purple"
        ]
      }
    },
    computed: {
    },
    created() {
      this.box_color_index = 0
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
      },
      // Get the box color for the course card
      // that will be passed as a prop
      getBoxColor() {
        let color_index = this.$store.state.course_card_color_index
        let box_color = this.box_colors[color_index]
        this.$store.dispatch('updateColorIndex', this.box_colors)
        // Update box_color_index
        // if(this.box_color_index == this.courses.length)
        //   this.box_color_index = 0
        // else
        //   this.box_color_index++
        return box_color
      }
    }
  }
</script>

<style scoped>
.course-list {
  height: 12.5rem;
  overflow-y: auto;
  width: 90%;
}

.course-list::-webkit-scrollbar {
  width: 12px;
}

.course-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5; 
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .course-list {
    margin-top: 1rem;
    height: auto;
    width: auto;
  }
}
</style>