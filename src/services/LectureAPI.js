import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  getLecturesForUser(user_id, lecture_type) {
    return API().get('lectures/for_user/' + user_id + '/' + lecture_type, {
    })
  },
  getLecturesForCourse(course_id, lecture_type) {
    return API().get('lectures/for_course/' + course_id + '/' + lecture_type)
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
    console.log(video)
    let formdata = new FormData()
    formdata.append('video', video)
    formdata.append("video_ref", lecture.video_ref)
    formdata.append("playback_submission_start_time", lecture.playback_submission_start_time)
    formdata.append("playback_submission_end_time", lecture.playback_submission_end_time)
    return API().post('lectures/add_playback/' + lecture._id,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
