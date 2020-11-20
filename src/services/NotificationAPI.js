import API from '@/services/API'
export default {
  
  addNotification(notification) {
    return API().post('notifications/add', {
      notification: notification 
    })
  },
  getNotifications() {
    return API().get('notifications/get_notifications')
  },

  createNotification() {

  }


}