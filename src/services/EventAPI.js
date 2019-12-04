import API from '@/services/API'

export default {
  getEvents() {
    return API().get('events')
  },
  addEvent(event) {
    return API().post('events/add', {
      event: event 
    })
  },
  getEvent(id) {
    return API().get('events/edit/' + id)
  },
  updateEvent(id, event){
    return API().post('events/update/' + id, {
      updated_event: event
    })
  },
  deleteEvent(id) {
    return API().delete('events/delete/' + id)
  }
}
