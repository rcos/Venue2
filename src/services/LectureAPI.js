import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  addLecture(lecture, video) {
    console.log(video)
    let formdata = new FormData()
    formdata.append('video', video);
    formdata.append("event", lecture.event);
    formdata.append("video_ref", lecture.video_ref);
    return API().post('lectures/add',
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
  }
}
