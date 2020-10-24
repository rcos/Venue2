<script>
import SectionAPI from '@/services/SectionAPI.js';
export default {
  name: 'JoinCourse',
  props: {
  },
  data() {
    return {
      sections: [],
      in_course: false
    }
  },
  created() {
    this.course_id = this.$route.params.id
    this.current_user = this.$store.state.user.current_user
    this.inCourse()
    /*
    if (!this.in_course) {
      this.addStudentToSection()
    } */

  }, 
  methods : {
    inCourse()  {
      SectionAPI.getSectionsForCourse(this.course_id).then(res=> {
        res.data.forEach(sec => {
          this.sections.push(sec._id)
        })
        for (let i = 0; i < this.sections.length; i++) {
          if (this.current_user.student_sections.includes(this.sections[i])) {
            this.in_course = !this.in_course
            this.$router.push('/course_info/' + this.sections[i])
            break
          }
        }
      })
    }
    /*
    addStudentToSection() {
      var section_choice = prompt("Join Section")
      if (this.names.includes(section_choice)) {
        const response = SectionAPI.addToSection(this.sections[i]._id, this.current_user._id)
        this.$router.push('/course_info/' + this.sections[i]._id)
        location.reload()
      }
    } */


  }
}
</script>
