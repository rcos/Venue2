import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  addLecture(lecture) {
    return API().post('lectures/add', {
      lecture: lecture // add our data to the request body
    })
  }
}
