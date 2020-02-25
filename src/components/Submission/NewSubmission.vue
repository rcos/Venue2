<template>
  <div>
    <h2>Create A Submission</h2>
    <form @submit.prevent="addSubmission">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>event:</label>
            <input type="text" class="form-control" v-model="event.title" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>submitter:</label>
            <input class="form-control" v-model="submitter.first_name" readonly>
            <input class="form-control" v-model="submitter.last_name" readonly>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

    <Events v-on:select-event="selectEvent" />
    <Students v-on:select-student="selectSubmitter" />

  </div>
</template>

<script>
  import SubmissionAPI from '@/services/SubmissionAPI.js';
  import Events from '../Event/Events'
  import Students from '../User/Students'

  export default {
    name: 'Submission',
    components: {
      Events,
      Students
    },
    data(){
      return {
        submission: {},
        event: {},
        submitter: {}
      }
    },
    created() {
    },
    methods: {
      async addSubmission(evt){
        evt.preventDefault() // prevents the form's default action from redirecting the page
        this.submission.event = this.event
        this.submission.submitter = this.submitter
        // const response = await SubmissionAPI.addSubmission(this.submission)
        this.$router.push({name: 'submissions'})
      },
      selectEvent(event){
        this.event = event
      },
      selectSubmitter(submitter){
        this.submitter = submitter
      }
    }
  }
</script>
