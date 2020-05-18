<<template>
  <div>
    <show-at breakpoint="mediumAndAbove">
      <div class="course-list">
        <div v-if="is_instructor">
          <div v-if="!data_loaded"><SquareLoader /></div>
          <div v-else-if="courses.length > 0">
            <CourseCard v-for="course in courses" :key="course._id" v-bind:course="course" v-bind:box_color="course.box_color"/>
          </div>
          <div v-else>
            <p class="no-container" id="no-courses">No courses</p>
          </div>
        </div>
        <div v-else>
          <div v-if="!data_loaded"><SquareLoader /></div>
          <div v-else-if="sections.length > 0">
            <CourseCard v-for="section in sections" :key="section._id" v-bind:section="section" v-bind:box_color="section.box_color"/>
          </div>
          <div v-else>
            <p class="no-container" id="no-courses">No courses</p>
          </div>
        </div>
      </div>
    </show-at>
    <show-at breakpoint="small">
      <div class="mobile-course-list">

        <div v-if="is_instructor">
          <div v-if="!data_loaded"><SquareLoader /></div>
          <div class="mobile-justify-div" v-else-if="courses.length > 0">
            <CourseCard v-for="course in courses"
              :key="course._id" v-bind:course="course"
              v-bind:box_color="course.box_color"
              mobile
            />
          </div>
          <div v-else>
            <p class="no-container" id="no-courses">No courses</p>
          </div>
        </div>
        <div v-else>
          <div v-if="!data_loaded"><SquareLoader /></div>
          <div v-else-if="sections.length > 0">
            <CourseCard v-for="section in sections"
              :key="section._id"
              v-bind:section="section"
              v-bind:box_color="section.box_color"
              mobile
            />
          </div>
          <div v-else>
            <p class="no-container" id="no-courses">No courses</p>
          </div>
        </div>

      </div>
    </show-at>
  </div>
</template>

<script>
  import CourseCard from '@/components/CourseCard.vue'
  import CourseAPI from '@/services/CourseAPI.js'
  import SectionAPI from '@/services/SectionAPI.js'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import {showAt, hideAt} from 'vue-breakpoints'

  export default {
    name: 'CourseList',
    props: {
      sizeCallback: Function
    },
    components: {
      CourseCard,
      SquareLoader,
      showAt,
      hideAt
    },
    data(){
      return {
        courses: [],
        data_loaded: false,
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
        // let response = await CourseAPI.getInstructorCourses(this.current_user._id)
        // this.data_loaded = true
        // let courses = response.data
        // this.assignBoxColorsToClassObjects(courses)
        // this.courses = courses
        // if (this.sizeCallback) this.sizeCallback(this.courses.length)

        CourseAPI.getInstructorCourses(this.current_user._id)
        .then(response => {
          this.data_loaded = true

          let courses = response.data
          this.assignBoxColorsToClassObjects(courses)
          this.courses = courses

          if (this.sizeCallback) this.sizeCallback(this.courses.length)
        })
        .catch(err => {
          this.data_loaded = true
        })
      },
      async getSectionsWithCourses() {
        // let response = await SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        // let sections = response.data
        // this.assignBoxColorsToClassObjects(sections)
        // this.sections = sections

        console.log(`Getting sections data (${this.current_user._id})`)
        SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        .then(response => {

          console.log(`getSectionsWithCourses () Response:`)
          console.log(response)

          this.data_loaded = true
          let sections = response.data
          this.assignBoxColorsToClassObjects(sections)
          this.sections = sections

          if (this.sizeCallback) this.sizeCallback(this.sections.length)
        })
        .catch(err => {
          data_loaded = true
        })
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
