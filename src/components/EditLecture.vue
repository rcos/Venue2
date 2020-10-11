<template>
  <div id="edit-lecture">
    <h1>Edit Lecture</h1>
    <SquareLoader v-if="!lecture"/>
    <div v-else class="row">
      <div id="lect-label-settings" class="col-md-6">
        <h2><strong>Settings:</strong></h2>
        <h3>General</h3>
        <label>title</label>
        <label>section(s)</label>
        <h3>Check-ins</h3>
        <h3>Synchronous Attendance</h3>
        <label>start time</label>
        <label>end time</label>
        <label>meeting link</label>
        <h3>Asynchronous Attendance</h3>
        <label>start time</label>
        <label>end time</label>
      </div>
      <div  class="col-md-6">
      <form id="lect-current-settings" @submit.prevent="updateLecture">
        <h2>Current</h2>
        <input class="gap1" v-model="lecture.title"/>
        <MultiSelectDropdown v-if="all_sections" ref="sectionsSelector" :options="all_sections" :default="lecture.sections" sortBy="name" @update="handleSectionsUpdate"/>
        <input class="gap2" v-model="lecture.start_time"/>
        <input v-model="lecture.end_time"/>
        <input v-model="lecture.meeting_link"/>
        <input class="gap1" v-model="lecture.playback_submission_start_time"/>
        <input v-model="lecture.playback_submission_end_time"/>
        <button v-if="waiting" class="btn btn-primary" disabled><SquareLoader/></button>
        <button v-else class="btn btn-primary">Save</button>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import SectionAPI from "@/services/SectionAPI.js";
import CourseAPI from "@/services/CourseAPI.js";
import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js";
import LectureAPI from '@/services/LectureAPI.js';
import UserAPI from "@/services/UserAPI.js";
import SquareLoader from "@/components/Loaders/SquareLoader.vue";
import MultiSelectDropdown from "@/components/MultiSelectDropdown.vue";
export default {
  name: "EditLecture",
  components: {
    SquareLoader,
    MultiSelectDropdown
  },
  data() {
    return {
      lecture: null,
      updated_lecture: {},
      waiting: false,
      all_sections: null
    }
  },
  created() {
    this.getLecture();

  },
  methods: {
    getLecture() {
      LectureAPI.getLectureWithSectionsAndCourse(this.$route.params.id).then(res => {
        this.lecture = res.data
        this.getAllSections()
      })
    },
    getAllSections() {
      if(this.lecture.sections && this.lecture.sections.length) {
        SectionAPI.getSectionsForCourse(this.lecture.sections[0].course._id).then(res => {
          this.all_sections = res.data;
          this.$nextTick(function() {
            this.$refs['sectionsSelector'].setSelected(this.lecture.sections)
          })
          
        })
      }
    },
    updateLecture() {
      if(confirm("All values in \"Updates\" column will be applied. Are you sure?")) {
        this.waiting = true
        [Object.keys(this.updated_lecture).forEach(property => {
          if(this.updated_lecture[property]) {
            this.lecture[property] = this.updated_lecture[property]
          }
        })]
        LectureAPI.update(this.lecture).then(res => {
          this.updated_lecture = {}
          this.waiting = false
        })
      }
    },
    handleSectionsUpdate(selected,n) {
      console.log(selected.map(a=>a._id))
      this.updated_lecture.sections = selected
    }
  }
};
</script>

<style scoped>
#edit-lecture {
  padding: 2rem;
}

.row {
  margin: 0;
  padding: 0;
}

#lect-label-settings > *,
#lect-current-settings > *,
#lect-updated-settings > * {
  display: block;
  width: 100%;
  min-height: 3rem;
  margin-bottom: 0.5rem;
}

#lect-label-settings > *:not(:first-child) {
  text-align: right;
}

.gap1 {
  margin-top: 3.75rem;
}

.gap2 {
  margin-top: 7.25rem;
}

h3 {
  font-style: italic;
}
</style>