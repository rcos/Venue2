import API from '@/services/API'

export default {
  getLectures() {
    return API().get('lectures')
  },
  addLecture(course) {
    return API().post('lectures/add', {
      course: course // add our data to the request body
    })
  }
}
