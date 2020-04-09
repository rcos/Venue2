<<template>
  <div class="course-list">
    <div v-if="is_instructor">
      <div v-if="courses.length > 0">
        <CourseCard v-for="course in courses" v-bind:course="course" v-bind:box_color="course.box_color"/>
      </div>
      <div v-else>
        <p class="no-container" id="no-courses">No courses</p>
      </div>
    </div>
    <div v-else>
      <div v-if="sections.length > 0">
        <CourseCard v-for="section in sections" v-bind:section="section" v-bind:box_color="section.box_color"/>
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
        let courses = response.data
        this.assignBoxColorsToClassObjects(courses)
        this.courses = courses
      },
      async getSectionsWithCourses() {
        let response = await SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        let sections = response.data
        this.assignBoxColorsToClassObjects(sections)
        this.sections = sections
      },
      assignBoxColorsToClassObjects(class_objects) {
        let box_color_index = 0
         class_objects.forEach( class_object => {
           class_object.box_color = this.box_colors[box_color_index]
          if(box_color_index == this.box_colors.length)
            box_color_index = 0
          else
            box_color_index++
        })
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
    padding-bottom: 10px;
  }
}
</style>