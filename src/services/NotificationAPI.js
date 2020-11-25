import API from '@/services/API'
export default {
  
  addNotification(notification) {
    return API().post('notifications/add', {
      notification: notification 
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
  sendNotification(id, students) {
    return API().post('notifications/send', {
      id: id,
      students: students
    })
  }, 
  updateNotification(id, email) {
    return API().post('notifications/update', {
      id: id
    })
  },
  clearAllNotifications(email) {
    return API().post('notifications/clear_all')
  }
  
}