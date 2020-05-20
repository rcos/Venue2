import API from '@/services/API'

export default {
  getLectureSubmissions() {
    return API().get('lecturesubmissions')
  },
  addPoll(lectureSubmission) {
    return API().post('lecturesubmissions/add', {
      lectureSubmission: lectureSubmission // add our data to the request body
    })
  },
  getOrMake(lecture_id,submitter_id) {
    return API().post('lecturesubmissions/get_or_make', {
      lecture_id: lecture_id,
      submitter_id: submitter_id // add our data to the request body
    })
  },
  update(lectureSubmission) {
    return API().post('lecturesubmissions/update', {
      lectureSubmission: lectureSubmission // add our data to the request body
    })
  },
  getLectureSubmissionsForLecture(lecture_id) {
    return API().get('lecturesubmissions/for_lecture/' + lecture_id)
  },
  getLectureSubmissionForStudent(lecture_id, student_id) {
    return API().get('lecturesubmissions/for_student/' + lecture_id + '/' + student_id)
  }
}
