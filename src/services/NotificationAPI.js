import API from '@/services/API'
export default {
  
  addNotification(notification) {
    return API().post('notifications/add', {
      notification: notification 
    })
  },
  
  getByID() {
    return API().get('notifications/get', {
      id: id
    })
  },

  getNotifications() {
    return API().get('notifications/get_notifications')
  },

  sendNotification() {
    return API().post('notifications/send', {
      id: id,
      students: students
    })
  },

  createNotification() {

  }


}