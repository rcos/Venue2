import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `http://localhost:4000/`,  // the url of our server
    withCredentials: true
  })
}
