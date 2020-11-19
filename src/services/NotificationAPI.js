import API from '@/services/API'
export default {
  getNotifications() {
    return API().get('notifications/get_notifications')
  }
}