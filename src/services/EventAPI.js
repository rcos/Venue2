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
  },
  getActiveOrTodaysEventsForUser(user_id, get_active) {
    return API().get('events/active_or_todays_events/' + user_id + '/' + get_active)
  },
  getActiveEventsForCourse(course_id) {
    return API().get('events/active_for_course/' + course_id)
  },
  getActiveEventsForSection(section_id) {
    return API().get('events/active_for_section/' + section_id)
  },
  getEventHistoryForCourse(course_id) {
    return API().get('events/history_for_course/' + course_id)
  },
  getEventHistoryForSection(section_id) {
    return API().get('events/history_for_section/' + section_id)
  },
  getEventWithSectionAndCourse(event_id) {
    return API().get('events/section_and_course/' + event_id)
  }
}
