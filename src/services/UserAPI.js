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
      first_name: user.first_name,
      last_name: user.last_name
    })
  }
  // deleteTodo (todoID) {
  //   return API().post('deleteTodo', {
  //     todoID: todoID // add our data to the request body
  //   })
  // }
}
