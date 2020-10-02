<template>
  <div>
    <h2>Submissions</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>event</th>
          <th>submitter</th>
        </tr>
        </thead>
        <div class="spinner-border" role="status" v-if="!events_and_users_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <tbody v-else>
            <tr v-for="submission in submissions" :key="submission._id">
              <td>{{ submission.event.title }}</td>
              <td>{{ submission.submitter.first_name }}  {{ submission.submitter.last_name }}</td>
              <td><router-link :to="{name: 'edit_submission', params: { id: submission._id }}" class="btn btn-primary">Edit</router-link></td>
              <td><button class="btn btn-danger" @click.prevent="deleteSubmission(submission._id)">Delete</button></td>
              <!-- <td v-else><button class="btn btn-secondary" @click.prevent="$emit('select-', course)">Select</button></td> -->
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import SubmissionAPI from '@/services/SubmissionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'Courses',
    data(){
      return {
        submissions: [],
        events_and_users_have_loaded: false
        // is_course_view: Boolean
      }
    },
    created() {
      this.loadSubmissions()
      // this.setIsCourseView()
    },
    methods: {
      async loadSubmissions () {
        const response = await SubmissionAPI.getSubmissions()
        this.submissions = response.data
        this.getEventsAndUsersForSubmissions()
      },
      getEventsAndUsersForSubmissions(){
        let counter = 0
        this.submissions.forEach(async submission => {
          let response = await EventAPI.getEvent(submission.event)
          submission.event = response.data
          response = await UserAPI.getUser(submission.submitter)
          submission.submitter = response.data
          counter++
          if(counter == this.submissions.length)
            this.events_and_users_have_loaded = true
        })
      },
      async deleteSubmission(id){
        const response = await SubmissionAPI.deleteSubmission(id);
        this.submissions.splice(this.submissions.findIndex(i => i._id == id), 1)
      }
      // setIsCourseView() {
      //   this.is_course_view = this.$router.currentRoute.name === "courses"
      // }
    }
  }
</script>