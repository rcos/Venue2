import API from '@/services/API'

export default {
  getSections() {
    return API().get('sections')
  },
  addSection(section) {
    return API().post('sections/add', {
      section: section // add our data to the request body
    })
  },
  getSection(id) {
    return API().get('sections/edit/' + id)
  },
  updateSection(id, section){
    return API().post('sections/update/' + id, {
      updated_section: section
    })
  },
  deleteSection(id) {
    return API().delete('sections/delete/' + id)
  },
  getInstructor (section_id) {
    return API().get('sections/getInstructor/' + section_id)
  },
  getCourse (section_id) {
    return API().get('sections/getCourse/' + section_id)
  },
  getStudents (section_id) {
    return API().get('sections/getStudents/' + section_id)
  },  
  getSectionsWithCoursesForStudent(user_id) {
    return API().get('sections/get_with_courses_for_student/' + user_id)
  },
  getSectionWithCourse(section_id) {
    return API().get('sections/get_with_course/' + section_id)
  }
}
