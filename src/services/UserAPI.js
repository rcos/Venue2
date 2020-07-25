import API from './API'

export default {
  signUp(user) {
    return API().post('users/signup', {
      user: user // add our data to the request body
    })
  },
  login(user) {
    return API().post('users/login', {
      user: user // add our data to the request body
    })
  },
  getUsers() {
    return API().get('users')
  },
  changePassword(user_id, old_password, new_password) {
    return API().post('users/change_password', {
      user_id: user_id,
      old_password: old_password,
      new_password: new_password
    })
  },
  addUser(user) {
    return API().post('users/add', {
      user: user // add our data to the request body
    })
  },
  onboardUser(user) {
    return API().post('users/onboard', {
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
  getInstructorCourses(id) {
    return API().get('users/instructor_courses/' + id)
  },
  getStudentSections(id) {
    return API().get('users/student_sections/' + id)
  },
  getStudentsForCourse(course_id) {
    return API().get('users/students_for_course/' + course_id)
  },
  getStudentsForLecture(lecture_id) {
    return API().get('users/students_for_lecture/' + lecture_id)
  }
}
