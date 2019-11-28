import API from '@/services/API'

export default {
  getUsers() {
    return API().get('users')
  },
  addUser(user) {
    return API().post('users/add', {
      user: user // add our data to the request body
    })
  },
  getUser(id) {
    return API().get('users/edit/' + id)
  },
  updateUser(id, user){
    return API().post('users/update/' + id, {
      updated_user: user
    })
  },
  deleteUser (id) {
    return API().delete('users/delete/' + id)
  },
  getInstructors() {
    return API().get('users/instructors')
  },
  getStudents() {
    return API().get('users/students')
  },
  getCourses(id) {
    return API().get('users/getCourses/' + id)
  }
}
