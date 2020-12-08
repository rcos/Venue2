import API from '@/services/API'
export default {
  addNotification(type, id, course) {
    return API().post('notifications/add', {
      type: type,
      id: id,
      course: course
    })
  },
  deleteNotification(id) {
    return API().delete('notifications/delete', {
      id: id
    })
  },
  getByID(id) {
    return API().get('notifications/get', {
      id: id
    })
  },
  getNotifications() {
    return API().get('notifications/get_notifications')
  },
  sendNotification(id, emails) {
    return API().post('notifications/send', {
      id: id,
      emails: emails
    })
  }, 
  updateNotification(id) {
    return API().post('notifications/update', {
      id: id
    })
  },
  clearAllNotifications() {
    return API().post('notifications/clear_all')
  }
}