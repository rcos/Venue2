import API from '@/services/API'

export default {
  signUp(user) {
    return API().post('auth/signup', {
      user: user
    })
  },
  login(user) {
    return API().post('auth/login', {
      user: user
    })
  },
  checkForTempUser(user_id, temp_password) {
    return API().get('auth/check_for_temp_user/' + user_id + '/' + temp_password)
  },
  setPermanentPassword(user) {
    return API().post('auth/set_permanent_pasword', {
      user: user
    })
  },
}
