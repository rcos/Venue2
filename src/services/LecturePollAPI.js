import API from '@/services/API'

export default {
  getPolls() {
    return API().get('polls')
  },
  addPoll(poll) {
    console.log(poll)
    return API().post('polls/add', {
      poll: poll // add our data to the request body
    })
  },
}
