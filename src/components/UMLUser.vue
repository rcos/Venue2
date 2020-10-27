<template>
  <div class="uml-user-view">
    <div class="uml-user">
      <div class="uml-user-bg"></div>
      <div class="uml-user-fg">
        <div class="uml-user-info">
          <span class="uml-user-name">
            <span class="uml-first-name">{{ user.first_name }}&nbsp;</span>
            <span class="uml-last-name">{{ user.last_name }}</span>
          </span>
          <span class="uml-email">Email: {{ user.email }}</span>
          <span class="uml-is-admin">User Status: {{ getAdminString() }}</span>
        </div>
        <div class="uml-select-list">
          <div v-if="is_instructor" class="uml-instructor-courses">
            <div v-if="active_select !== 'uml-instructor'" class="uml-instructor-courses-inline"
              v-on:click="select('uml-instructor')">
              Show Courses as Instructor
            </div>
            <div v-if="active_select === 'uml-instructor'" class="uml-instructor-courses-expanded">
              <div>Instructor Courses:</div>
              <div class="uml-instructor-courses-list">
                <div class="course-select" v-for="course in instructor_courses" :key="course._id"
                    v-on:click="selectCourse(course._id)">
                  {{ course.name }}&nbsp;</div>
              </div>
            </div>
          </div>
          <div v-if="is_ta" class="uml-ta-sessions">
            <div v-if="active_select !== 'uml-ta'" class="uml-ta-sessions-inline"
                 v-on:click="select('uml-ta')">
              Show Courses as TA
            </div>
            <div v-if="active_select === 'uml-ta'" class="uml-ta-sessions-expanded">
              <div>TA Sessions:</div>
              <div class="uml-student-sessions-list">
                <div class="section-select" v-for="(course, index) in ta_courses" :key="course._id"
                      v-on:click="selectSection(ta_sections[index]._id, course._id)">
                  <span class="course-prefix">{{ course.prefix }}&nbsp;</span>
                  <span class="course-suffix">{{ course.suffix }}&nbsp;</span>
                  <span class="course-name">{{ course.name }}&nbsp;</span>
                  <span class="section-name">{{ ta_sections[index].name }}&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="is_student" class="uml-student-sessions">
            <div v-if="active_select !== 'uml-student'" class="uml-student-sessions-inline"
                 v-on:click="select('uml-student')">
              Show Courses as Student
            </div>
            <div v-if="active_select === 'uml-student'" class="uml-student-sessions-expanded">
              <div>Student Sessions:</div>
              <div class="uml-student-sessions-list">
                <div class="section-select" v-for="(course, index) in student_courses" :key="index"
                     v-on:click="selectSection(student_sections[index]._id, course._id)">
                  <span class="course-prefix">{{ course.prefix }}&nbsp;</span>
                  <span class="course-suffix">{{ course.suffix }}&nbsp;</span>
                  <span class="course-name">{{ course.name }}&nbsp;</span>
                  <span class="section-name">{{ student_sections[index].name }}&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="uml-padding"></div>
    <div class="uml-section" v-if="selected_section !== null && !is_child">
      <UMLSection :section="selected_section" :course="selected_course"/>
    </div>
    <div class="uml-course"  v-if="selected_course !== null && selected_section === null && !is_child">
      <UMLcourse :course="selected_course" :child="true"/>
    </div>
  </div>

</template>

<script>
  import CourseAPI from "@/services/CourseAPI.js";
  import SectionAPI from "@/services/SectionAPI";
  import UMLSection from "./UMLSection";
  import UMLcourse from "./UMLCourse";
  import UserAPI from "../services/UserAPI";
  export default {
  name: "UMLUser",
  props: {
    user: Object,
    active_select: String,
    is_child: Boolean, //if activated, forbid spawning sections/courses
    selected_section: Object,
    selected_course: Object,
  },
  computed: {},
  components: {UMLcourse, UMLSection},
  data() {},
  created() {
    this.instructor_courses = [];
    this.ta_courses = [];
    this.student_courses = [];
    this.ta_sections = [];
    this.student_sections = [];
    this.is_instructor = this.user.instructor_courses.length !== 0;
    this.is_ta = this.user.ta_sections.length !== 0;
    this.is_student = this.user.student_sections.length !== 0;
    this.getInstructorCourses();
    this.getTACourses();
    this.getStudentCourses();
    this.selected_section = null;
    this.selected_course = null;
  },
  methods: {
    getAdminString() {
      if (this.user.is_admin) {
        return "Admin";
      } else {
        return "User";
      }
    },
    select(str) {
      this.active_select = str;
    },
    async getInstructorCourses() {
      for (const v of this.user.instructor_courses) {
        let course = await CourseAPI.getCourse(v);
        if (course.data != null) {
          this.instructor_courses.push(course.data);
        }
      }
    },
    async getTACourses() {
      for (const v of this.user.ta_sections) {
        let course = await SectionAPI.getCourse(v);
        let section = await SectionAPI.getSection(v);
        if (course.data != null) {
          this.ta_courses.push(course.data);
          this.ta_sections.push(section.data);
        }
      }
    },
    async getStudentCourses() {
      for (const v of this.user.student_sections) {
        let course = await SectionAPI.getCourse(v);
        let section = await SectionAPI.getSection(v);
        if (course.data != null) {
          this.student_courses.push(course.data);
          this.student_sections.push(section.data);
        }
      }
    },
    async selectSection(id, course_id){
      let course = await CourseAPI.getCourse(course_id);
      let section = await SectionAPI.getSection(id);
      this.selected_section = section.data;
      this.selected_course = course.data;
    },
    async selectCourse(id){
      let course = await CourseAPI.getCourse(id);
      this.selected_section = null;
      this.selected_course = course.data;
    }
  }
};
</script>

<style scoped>
.uml-user-bg {
  width: 55%;
  margin-left: 0;
  border-radius: 5px;
  -webkit-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
  -ms-transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 250ms cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
}
.uml-user-fg {
  position: absolute;
  width: 50%;
  margin-top: -3.5rem;
  margin-left: 1.7%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 1px rgba(109, 109, 109, 0.644);
  z-index: 4;
}
.uml-user-name {
  margin-right: 2em;
}
.uml-first-name {
  margin-right: 0;
}
.uml-last-name {
}
.uml-email {
  margin-right: 2em;
}
.uml-is-admin {
}
.uml-select-list {
}
.uml-instructor-courses-inline{
  cursor: pointer;
}
.uml-student-sessions-inline {
  cursor: pointer;
}
.uml-ta-sessions-inline {
  cursor: pointer;
}
.section-select {
  cursor: pointer;
}
.course-select {
  cursor: pointer;
}
.uml-padding{
  height: 200px;
}
</style>
