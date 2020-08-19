import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: (process.env.NODE_ENV === 'production' ? 
    	`https://venue-meetings.com/` :
    	`http://localhost:4000/`),
    withCredentials: true
  })
}
