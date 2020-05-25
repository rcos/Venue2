import API from '@/services/API'

export default {
  signUp(user) {
    return API().post('auth/signup', {
      user: user // add our data to the request body
    })
  },
  login(user) {
    return API().post('auth/login', {
      user: user // add our data to the request body
    })
  },
  checkForTempUser(user_id, temp_password) {
    return API().get('auth/check_for_temp_user/' + user_id + '/' + temp_password)
  }
}
