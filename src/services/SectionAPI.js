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
      section: section
    })
  },
  deleteSection(id) {
    return API().delete('sections/delete/' + id)
  }
}
