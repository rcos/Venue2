import SectionAPI from '@/services/SectionAPI'
import EventAPI from '@/services/EventAPI'
import SubmissionAPI from '@/services/SubmissionAPI'

let StatsAPI = {}

let getEventDateTag = (event_date) => {
  /*
  Input => A date string.
  Output => A string in format 'month/day/year'
  */

  let date_ = new Date(event_date)
  return `${date_.getMonth()}/${date_.getDate()}/${date_.getFullYear()}`
}

// For instructor's statistics
StatsAPI.getTimestamp = (time_string) => {
  let date_ = new Date(time_string)
  return date_.getTime ()
}

StatsAPI.getDataForStudent = async (student_id, section_id) => {
  /*
  Input => student_id: The student to find the data for
           section_id: The section the student is a part of
  */

  return new Promise((resolve, reject) => {
    // (1) Get all the events for this section
    let event_data = {}
    EventAPI.getEventHistoryForSection(section_id)
    .catch(err => {
      console.log (`StatsAPI: problem retrieving events`)
      reject (`StatsAPI: problem retrieving events. ${err}`)
    })
    .then(response => {
      let event_history = response.data
      event_history.forEach(event => {
        if (event_data.hasOwnProperty( getEventDateTag(event.start_time) )) {
          event_data[getEventDateTag(event.start_time)].count += 1
        }
        else {
          event_data[getEventDateTag(event.start_time)] = {count: 1, total: 0, time: event.start_time}
        }
      })

      // find all submissions made by this student
      SubmissionAPI.getUserSubmissionsForSection(student_id, section_id)
      .catch(err => {
        console.log (`StatsAPI: problem retrieving events`)
        reject(`StatsAPI: problem retriving events. ${err}`)
      })
      .then(response => {

        let student_submissions = response.data
        student_submissions.forEach(submission_ => {

          let submission_tag = getEventDateTag(submission_.time)
          if (event_data.hasOwnProperty(submission_tag)) event_data[submission_tag].total += 1

        })

        // now, return it in data format
        let dataset = []
        Object.keys(event_data).forEach(key_tag => {
          dataset.push({
            x: new Date(event_data[key_tag].time),
            y: event_data[key_tag].total/event_data[key_tag].count
          })
        })

        resolve(dataset)

      })
    })
  })
}

StatsAPI.getDataForSection = async (section_id) => {
  /*
  Input => section_id: Section ID for the section to collect data for
           start_time (omitted): The earliest time to show data for
           end_time (omitted): The latest time to show data for
           group_size (omitted): The amount of data points that should be grouped together
 */

 // (1) Find how many students are in the section
 return new Promise((resolve, reject) => {

   let student_count = 0
   let earliest_date = null
   SectionAPI.getSection(section_id)
   .catch(err => {
     console.log(`StatsAPI: problem retrieving section info for section ${section_id}`)
     reject()
   })
   .then(response => {
     student_count = response.data.students.length
   })
   .finally(_ => {

     // (2) get all the events for this section
     let event_data = {}
     EventAPI.getEventHistoryForSection(section_id)
     .catch(err => {
       console.log(`StatsAPI: problem retrieving event history for section ${section_id}`)
       reject()
     })
     .then(response => {

       // (3) for each of the events, we want to find the number of submissions
       let all_events = response.data
       let submissions_for_events = []

       all_events.forEach(event_ => {

         submissions_for_events.push(new Promise((resolveSubmissions, reject) => {

           SubmissionAPI.getSubmissionsForEvent(event_._id)
           .catch(err => {
             resolveSubmissions(null)
           })
           .then(submission_response => {
             resolveSubmissions(submission_response.data)
           })

         }))

       })

       Promise.all(submissions_for_events)
        .then(fulfilled_submissions => {
         // (4) compute the average for each event by calculating the size of each
         // submission array and dividing by student_count

         fulfilled_submissions.forEach((submission_arr, i) => {
           if (submission_arr != null) {
             let attendance_ratio = submission_arr.length / student_count
             // Then, find where to store it in the event_data
             let event_tag = getEventDateTag( all_events[i].start_time )
             if (earliest_date == null || new Date(all_events[i].start_time) < earliest_date) {
               earliest_date = new Date(all_events[i].start_time)
             }
             if (event_data.hasOwnProperty( event_tag )) {
               event_data[event_tag].count += 1
               event_data[event_tag].total += attendance_ratio
             }
             else {
               event_data[event_tag] = {
                 start: all_events[i].start_time,
                 count: 1,
                 total: attendance_ratio
               }
             }
           }
         })

       })
       .finally(_ => {
         if (earliest_date == null) {
           reject()
         }

         else {
           // compute the averages for each event
           let event_averages = []
           Object.keys(event_data).forEach(event_tag => {

             let average_ = event_data[event_tag].total / event_data[event_tag].count
             event_averages.push({
               x: new Date(event_data[event_tag].start),
               y: average_
             })

           })

           event_averages.push({
             x: new Date(),
             y: 0.72
           })

           resolve(event_averages)
         }

       })

      })

   })

 }) // end promise
}

export default StatsAPI
