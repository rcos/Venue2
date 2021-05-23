<template>
  <div>
    <!-- SHOWING SECTIONS -->
    <h2>Sections</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>course</th>
          <th>instructors</th>
          <th>section name</th>
        </tr>
      </thead>
      <div
        class="spinner-border"
        role="status"
        v-if="!instructors_have_loaded && !courses_loaded"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <tbody v-else>
        <tr v-for="section in sections" :key="section._id">
          <td>{{ section.course.name }}</td>
          <td>
            <div v-for="(instructor, i) in section.instructors" :key="i">
              {{ instructor.first_name }} {{ instructor.last_name }}
            </div>
          </td>
          <td>{{ section.name }}</td>
          <div v-if="is_section_view">
            <td>
              <router-link
                :to="{
                  name: 'admin_edit_section',
                  params: { id: section._id }
                }"
                class="btn btn-primary"
                >Edit</router-link
              >
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click.prevent="deleteSection(section._id)"
              >
                Delete
              </button>
            </td>
          </div>
          <td v-else>
            <button
              class="btn btn-secondary"
              @click.prevent="$emit('select-section', section)"
            >
              Select
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SectionAPI from "@/services/SectionAPI.js";

export default {
  name: "AdminSections",
  data() {
    return {
      sections: [],
      instructors_have_loaded: false,
      courses_loaded: false,
      is_section_view: Boolean
    };
  },
  created() {
    this.loadSections(), this.setIsSectionView();
  },
  methods: {
    async loadSections() {
      const response = await SectionAPI.getSections();
      this.sections = response.data;
      this.getInstructorForSections();
      this.getCourseForSections();
    },
    async getInstructorForSections() {
      let promises = [];
      this.sections.forEach(section => {
        promises.push(
          new Promise((resolve, reject) => {
            SectionAPI.getInstructors(section._id).then(res => {
              section.instructors = res.data;
              resolve(res.data);
            });
          })
        );
      });
      Promise.all(promises).then(resolved => {
        this.instructors_have_loaded = true;
      });
    },
    async getCourseForSections() {
      let promises = [];
      this.sections.forEach(section => {
        promises.push(
          new Promise((resolve, reject) => {
            SectionAPI.getCourse(section._id).then(res => {
              section.course = res.data;
              resolve(res.data);
            });
          })
        );
      });
      Promise.all(promises).then(resolved => {
        this.courses_loaded = true;
      });
    },
    async deleteSection(id) {
      const response = await SectionAPI.deleteSection(id);
      this.sections.splice(
        this.sections.findIndex(i => i._id == id),
        1
      );
    },
    setIsSectionView() {
      this.is_section_view =
        this.$router.currentRoute.name === "admin_sections";
    }
  }
};
</script>
