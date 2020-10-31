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
  getInstructors (section_id) {
    return API().get('sections/getInstructors/' + section_id)
  },
  getCourse (section_id) {
    return API().get('sections/getCourse/' + section_id)
  },
  getStudents (section_id) {
    return API().get('sections/getStudents/' + section_id)
  },
  getTeachingAssistants (section_id) {
    return API().get('sections/getTeachingAssistants/' + section_id)
  },
  getSectionsWithCoursesForStudent(user_id) {
    return API().get('sections/get_with_courses_for_student/' + user_id)
  },
  getSectionWithCourse(section_id) {
    return API().get('sections/get_with_course/' + section_id)
  },
  getSectionsForCourse(course_id) {
    return API().get('sections/get_for_course/' + course_id)
  },
  joinPublicSections(sections,email) {
    return API().post('sections/join_public_sections',{
      sections: sections,
      email: email
    })
  },
  getTASections() {
    return API().get('sections/get_ta_sections')
  },
  getStudentSections() {
    return API().get('sections/get_student_sections')
  },
  addStudents(section_id, students) {
    return API().post('sections/add_students/'+section_id, {
      students: students
    })
  },
  addTAs(section_id,tas) {
    return API().post('sections/add_tas/'+section_id, {
      tas: tas
    })
  }
}
