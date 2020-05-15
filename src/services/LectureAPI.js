import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  getLiveLecturesForUser(user_id) {
    return API().get('lectures/live_for_user/' + user_id, {
    })
  },
  getAllLecturesForCourse(course_id) {
    return API().get('lectures/all_for_course/' + course_id, {
    })
  },
  addLecture(lecture) {
    return API().post('lectures/add', {
      lecture: lecture 
    })
  },
  addLecturePlayback(lecture, video) {
    console.log(video)
    let formdata = new FormData()
    formdata.append('video', video);
    formdata.append("event", lecture.event);
    formdata.append("video_ref", lecture.video_ref);
    return API().post('lectures/add_playback',
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}
