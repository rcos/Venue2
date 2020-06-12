import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  getLecturesForUser(user_id, lecture_type, preference) {
    return API().get('lectures/for_user/' + user_id + '/' + lecture_type + '/' + preference, {
    })
  },
  getLecturesForCourse(course_id, lecture_type) {
    return API().get('lectures/for_course/' + course_id + '/' + lecture_type)
  },
  getLecturesForSection(section_id, lecture_type) {
    return API().get('lectures/for_section/' + section_id + '/' + lecture_type)
  },
  getLectureWithSectionsAndCourse(lecture_id) {
    return API().get('lectures/with_sections_and_course/' + lecture_id)
  },
  addLecture(lecture) {
    return API().post('lectures/add', {
      lecture: lecture
    })
  },
  addLecturePlayback(lecture, video) {
    let formdata = new FormData()
    formdata.append('video', video)
    return API().post('lectures/add_playback/' + lecture._id,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },
  getLecture(id) {
    return API().get('lectures/' + id)
  },
  processEmailsForLectures(lectures,toEmail) {
    return API().post('lectures/process_emails', {
      lectures: lectures,
      toEmail: toEmail
    })
  },
}
