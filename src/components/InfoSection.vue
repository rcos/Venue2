<template>
  <div id="infosection">
    <h1 v-if="active_section" class="section-title">Active</h1>
    <h1 v-else-if="courses_section" class="section-title">Courses</h1>
    <h1 v-else-if="upcoming_section" class="section-title">Upcoming</h1>
  </div>
</template>

<script>

  export default {
    name: 'InfoSection',
    props: {
      active_section: Boolean,
      courses_section: Boolean,
      upcoming_section: Boolean
    },
    computed: {
    },
    components: {
    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped>
#infosection {
  border: red solid;
  margin-top: 2rem;
  text-align: left;
  padding: 1rem;
  padding-left: 2rem;
}

.section-title {

}
</style>