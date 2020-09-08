import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  getLecturesForUser(user_id, preference) {
    return API().get('lectures/for_user/' + user_id + '/' + preference)
  },
  getLecturesForCourse(course_id) {
    return API().get('lectures/for_course/' + course_id)
  },
  getLecturesForSection(section_id) {
    return API().get('lectures/for_section/' + section_id)
  },
  getLectureWithSectionsAndCourse(lecture_id) {
    return API().get('lectures/with_sections_and_course/' + lecture_id)
  },
  addLecture(lecture) {
    return API().post('lectures/add', {
      lecture: lecture
    })
  },
  addPlaybackVideo(lecture_id, video) {
    let formdata = new FormData()
    formdata.append('video', video)
    return API().post('lectures/add_playback_video/' + lecture_id,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },
  updateToPlayback(lecture) {
    return API().post('lectures/update_to_playback/' + lecture._id,
      {
        lecture: lecture
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
  endEarly(lecture_id) {
    return API().post('lectures/end_early', {
      lecture_id: lecture_id
    })
  }
}
