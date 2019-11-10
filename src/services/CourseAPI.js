import API from '@/services/API'

export default {
  getCourses() {
    return API().get('courses')
  },
  addCourse(course) {
    return API().post('courses/add', {
      course: course // add our data to the request body
    })
  },
  getCourse(id) {
    return API().get('courses/edit/' + id)
  },
  updateCourse(id, course){
    return API().post('courses/update/' + id, {
      name: course.name,
      dept: course.dept,
      course_number: course.course_number,
      instructor: course.instructor
    })
  },
  deleteCourse (id) {
    return API().delete('courses/delete/' + id)
  }
}
