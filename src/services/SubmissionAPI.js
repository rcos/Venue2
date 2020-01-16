import API from '@/services/API'

export default {
  getSubmissions() {
    return API().get('submissions')
  },
  addSubmission(submission) {
    return API().post('submissions/add', {
      submission: submission 
    })
  },
  getSubmission(id) {
    return API().get('submissions/edit/' + id)
  },
  updateSubmission(id, submission){
    return API().post('submissions/update/' + id, {
      updated_submission: submission
    })
  },
  deleteSubmission(id) {
    return API().delete('submissions/delete/' + id)
  },
  getSubmissionsForEvent(event_id){
    return API().get('submissions/event_submissions/' + event_id)
  }
}
