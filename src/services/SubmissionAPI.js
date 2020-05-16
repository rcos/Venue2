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
  getUserSubmissionsForSection(user_id, section_id) {
    return API().get(`submissions/user_submissions_for_section/${user_id}/${section_id}`)
  },
  getSubmissionsForEvent(event_id){
    return API().get('submissions/event_submissions/' + event_id)
  },
  getSubmissionsForSectionByEvent(section_id) {
    // retrieve all submissions for a section, grouped by the event
    // associated with the submission
    return API().get(`submissions/section_submissions/${section_id}`)
  }
}
