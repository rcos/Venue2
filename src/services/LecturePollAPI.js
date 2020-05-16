import API from '@/services/API'

export default {
  getPolls() {
    return API().get('polls')
  },
  addPoll(poll) {
    return API().post('polls/add', {
      poll: poll // add our data to the request body
    })
  },
  getByLecture(lecture_id) {
    return API().get('polls/by_lecture/' + lecture_id)
  }
}
