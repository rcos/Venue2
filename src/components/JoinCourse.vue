<script>
import SectionAPI from '@/services/SectionAPI.js';
export default {
  name: 'JoinCourse',
  props: {
  },
  data() {
    return {
      names: [],
      sections: []
    }
  },
  created() {
    this.course_id = this.$route.params.id
    this.current_user = this.$store.state.user.current_user
    this.inCourse()
   
  }, 
  methods : {
    async inCourse()  {
      let in_course = false
      SectionAPI.getSectionsForCourse(this.course_id).then(res=> {
        res.data.forEach(sec => {
          this.sections.push(sec._id)
          this.names.push(sec.name)
        })
        for (let i = 0; i < this.sections.length; i++) {
          if (this.current_user.student_sections.includes(this.sections[i])) {
           in_course = !in_course
            this.$router.push('/course_info/' + this.sections[i])
            break
          }
        }
        if (!in_course) {
          var section_choice = prompt("Join Section")
          for (let i = 0; i < this.names.length; i++) {
              if (this.names[i] == section_choice) {
                const response = SectionAPI.addToSection(this.sections[i], this.current_user._id)
                this.$router.push('/course_info/' + this.sections[i])
                location.reload()
              }
          }
        }
      })
    }


  }
}
</script>
