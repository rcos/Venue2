import API from '@/services/API'

export default {
  getLectureSubmissions() {
    return API().get('lecturesubmissions')
  },
  addLectureSubmission(lecture_submission) {
    return API().post('lecturesubmissions/add', {
      lecture_submission: lecture_submission // add our data to the request body
    })
  },
  addLiveSubmissionByRCS(rcs,lecture_id) {
    return API().post('lecturesubmissions/add_live_by_rcs', {
      rcs: rcs,
      lecture_id: lecture_id // add our data to the request body
    })
  },
  addPlaybackSubmissionByRCS(rcs,lecture_id) {
    return API().post('lecturesubmissions/add_playback_by_rcs', {
      rcs: rcs,
      lecture_id: lecture_id // add our data to the request body
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
  getLectureSubmissionsForLectures(lecture_ids) {
    return API().post('lecturesubmissions/for_lectures', {
      lecture_ids: lecture_ids
    })
  },
  getLectureSubmissionsForStudent(lecture_id, student_id) {
    return API().get('lecturesubmissions/for_student/' + lecture_id + '/' + student_id)
  },

  updateAllToNewModel() {
    return API().post('lecturesubmissions/update_all_to_new_model')
  }
}
