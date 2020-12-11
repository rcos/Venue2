import API from './API'

export default {
  getAllAgreements() {
    return API().get('agreements')
  },
  //gets the most up-to-date agreement
  getRecentAgreement() {
      return API().get('agreements/recent')
  },
  //gets specific version of agreement
  getAgreement(docid) {
    return API().get('agreements/edit/' + docid)
  },
  addAgreement(agreement) {
    return API().post('agreements/add', {
      agreement: agreement // add our data to the request body
    })
  },
  updateAgreement(agreement) {
    return API().post('agreements/update', {
      agreement: agreement // add our data to the request body
    })
  },
  deleteAgreement (docid) {
    return API().delete('agreements/delete/' + docid)
  }
}
