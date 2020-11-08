<template>
  <div class="form-group">
    <h2>Joinable Sections:</h2>
    <MultiSelectDropdown v-if="sections.length" :options="sections" sortBy="name" @update="handleSectionChange" :n="0"/>
    <SquareLoader v-else/>
    <button class="btn btn-primary" @click="joinSections">Join Selected Sections</button>
  </div>
</template>

<script>
import SectionAPI from '@/services/SectionAPI.js';
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import SquareLoader from "@/components/Loaders/SquareLoader";

export default {
  name: 'JoinCourse',
  components: {
    MultiSelectDropdown,
    SquareLoader
  },
  data() {
    return {
      sections: [],
      selected: [],
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
        this.sections = res.data.filter(a => a.is_public)
      })
    }, 
    async joinSections() {
      const response = await SectionAPI.joinPublicSections(this.selected, this.current_user.email)
      location.reload()
    },
    handleSectionChange(selected) {
      this.selected = selected
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 1rem;
}
</style>
