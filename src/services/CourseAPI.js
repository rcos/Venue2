import API from '@/services/API'

export default {
  getCourses(offset, limit) {
    return API().get(`/get_courses/${offset}/${limit}`)
  },
  addCourse(course) {
    return API().post('courses/add_course', {
      course: course // add our data to the request body
    })
  },
  getCourse(id) {
    return API().get('courses/get_course/' + id)
  },
  updateCourse(id, course){
    return API().post('courses/update_course/' + id, {
      updated_course: course
    })
  },
  deleteCourse (id) {
    return API().delete('courses/delete_course/' + id)
  },
  getInstructor (course_id) {
    return API().get('courses/get_instructor/' + course_id)
  },
  getInstructorCourses (user_id) {
    return API().get('courses/get_instructor_courses/' + user_id)
  },
}
