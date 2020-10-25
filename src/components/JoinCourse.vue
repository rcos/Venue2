<template>
  <div class="form-group">
    <h2>Join Section:</h2>
    <router-link v-for="section in sections" :key="section._id" :to="{name: 'course_info', params: { id: section._id }}">
        <button class="btn btn-secondary" @click="addToSection(section._id)">Section {{section.name}} </button>
    </router-link>
  </div>
</template>

<script>
import SectionAPI from '@/services/SectionAPI.js';
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
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
  },

  methods : {
    inCourse()  {
      SectionAPI.getSectionsForCourse(this.course_id).then(res=> {
        this.sections = res.data
        for (let i = 0; i < this.sections.length; i++) {
          if (this.current_user.student_sections.includes(this.sections[i]._id)) {
            this.$router.push({name: 'course_info', params: {id: this.sections[i]._id}})
            this.in_course = !this.in_course
            break
          }
        }
      })
    }, 
    async addToSection(section) {
      const response = await SectionAPI.addToSection(section, this.current_user._id)
    }
  }
}
</script>
