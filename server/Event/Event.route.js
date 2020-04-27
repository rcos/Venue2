const express = require('express');
const eventRoutes = express.Router();
const Logger = require('../Utility/Logger')
const ObjectID = require('mongoose').Types.ObjectId

let Event = require('./Event.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Course = require('../Course/Course.model')

/*
=================================================
**********************GET************************
=================================================
*/
eventRoutes.route('/get_events/:offset/:count').get(function (req, res) {

  let offset = parseInt(req.params.offset)
  let count = parseInt(req.params.count)

  if (offset == NaN || count == NaN) {
    Logger.badRequest("Events::getEvents", [{key: "offset", value: offset}, {key: "count", value: count}])
    res.json({
      success: false,
      error: "Invalid parameters"
    })
    return;
  }

  Logger.goodRequest("Events::getEvents", [{key: "offset", value: offset}, {key: "count", value: count}])

  Event.find({}, null, { skip: offset, limit: count }, function (err, events) {
    if (err || events == null) {
      Logger.error(`Could not find events.`, `\t`)
      res.json({
        success: false,
        error: "Problem finding events"
      })
    }
    else {
      Logger.success(`Successfully found ${count} events offset by ${offset}`, '\t')
      res.json({
        success: true,
        events: events
      })
    }
  });
});

eventRoutes.route('/get_event/:id').get(function (req, res) {
  let id = req.params.id;

  Logger.goodRequest(`Events::getEvent`, [{key: "ID", value: req.params.id}])

  if (!ObjectID.isValid(id)) {
    Logger.error(`Id of ${id} is not a valid ObjectID`, `\t`)
    res.json({
      success: false,
      error: "Invalid id provided"
    })
    return;
  }

  Event.findById(id, function (err, event) {
    if (err || event == null) {
      Logger.error(`Problem finding event with id ${id}`, '\t')
      res.json({
        success: false,
        error: err
      })
    } else {
      Logger.success(`Successfully found event with id ${id}`, `\t`)
      res.json({
        success: true,
        event: event
      })
    }
  });
});

eventRoutes.route('/get_section/:id').get(function (req, res) {
  let id = req.params.id;

  Logger.goodRequest('Events::getSection', [{key: "ID", value: id}])

  if (!ObjectID.isValid(id)) {
    Logger.error(`event id provided not an object id`, `\t`)
    res.json({
      success: false,
      error: "Invalid id format"
    })
    return;
  }

  Event.findById(id, function (err, event) {
    if (err || event == null) {
      Logger.error(`Problem finding event with id ${id}`, `\t`)
      res.json({
        success: false,
        error: "Problem finding event"
      })
    }
    else {
      Logger.success(`(1/2) Found event with id ${id}`, `\t`)
      Logger.success(`Looking for section with id ${event.section}`, `\t`)
      // Get the section that this event belongs to
      Section.findById(event.section, (err, section) => {
        if (err || section == null) {
          Logger.error(`Problem finding section associated with this event`, `\t`)
          res.json({
            success: false,
            error: "Problem finding section"
          })
        }
        else {
          Logger.success(`(2/2) Found section of this event`, `\t`)
          res.json({
            success: true,
            section: section
          })
        }
      })
    }
  });
});

eventRoutes.get('/active_or_todays_events/:user_id/:get_active', (req, res) => {
  let user_id = req.params.user_id
  let get_active = ('get_active' in req.params && req.params.get_active == 'true');
  let requested_events = []
  let active_events = []

  Logger.goodRequest('Events::ActiveOrTodaysEvents')

  // check if the user id is valid
  if (!ObjectID.isValid(user_id)) {
    Logger.error('User ID is not a valid ObjectID', `\t`)
    res.json({
      success: false,
      error: 'Invalid User ID'
    })
    return;
  }

  User.findById(user_id, (error, user) => {
    if (error || user == null) {
      Logger.error(`User with id not found.`, `\t`)
      res.json({
        success: false,
        error: "Invalid user"
      })
    }
    else {
      // Find the section that this user is part of
      // Section.find({students: {"$contains": user._id}}, (err, sections_) => {
      Logger.success(`(1/2) Looking for section with students arr that contains ${user._id}`, `\t`)
      Section.find({
        students: {
          '$all': [user._id]
        }
      }, (err, sections_) => {

        if (err || sections_ == null) {
          Logger.error(`Problem finding section that contains user ${user._id}.\n\t${err}`, `\t`)
          res.json({
            success: false,
            error: "Problem searching for section"
          })
        }
        else {

          // find all events that has this section
          let user_events = []
          // start_time
          let start_date = new Date();
          start_date.setHours(0,0,0,0)
          let end_date = new Date();
          end_date.setDate(start_date.getDate() + 1)

          Logger.success(`Start: ${start_date}`, `\t`)
          Logger.success(`End: ${end_date}`, `\t`)

          sections_.forEach(section => {
            user_events.push(new Promise(function(resolve, reject) {
              // find the event that has this section

              Event.find({
                section: section._id,
                // start_time is between the start of today and start of tomorrow
                start_time: {
                  "$gte": start_date,
                  "$lt": end_date
                }
              },
              (err, evt_doc) => {
                if (err || evt_doc == null) {
                  resolve(null)
                }
                else resolve(evt_doc)
              })
            }))
          }) // end of forEach

          // Wait for the promises to complete
          Promise.all(user_events).then(result_events => {
            let true_events = result_events
              .filter(result_ => {
              if (result_ == null) {
                return false
              }
              if (result_.length == 0) {
                return false
              }
              return true
            })

            let unwrapped_events = []
            true_events.forEach(evt_lst => {
              evt_lst.forEach(evt => {
                unwrapped_events.push(evt)
              })
            })

            Logger.success(`(2/2) Successfully retrieved active or today's events`, `\t`)

            res.json({
              success: true,
              events: unwrapped_events
            })
          })
        }

      })
    }
  })

});

eventRoutes.get('/active_for_course/:course_id', async (req, res) => {
  let course_id = req.params.course_id
  // Get the sections for this course

  Logger.goodRequest("Events::activeForCourse", [{key: "Course ID", value: course_id}])

  if (!ObjectID.isValid(course_id)) {
    Logger.error(`Course id is not a valid object ID`, `\t`)
    res.json({
      success: false,
      error: "Invalid course id format"
    })
    return;
  }

  // Find all sections where the course id == course_id
  Section.find({course: course_id}, (err, sections) => {
    if(err || sections == null) {
      Logger.error(`Problem finding section`, `\t`)
      res.json({
        success: false,
        error: err
      })

    } else {

      // For each section in sections, find the events that
      // associate with this secton and that are active
      let sections_active_evts = []
      sections.forEach(section => {
        sections_active_evts.push(new Promise(function(resolve, reject) {
          // find the event that is for this section and is active
          return Event.find({section: section._id, is_active: true}, (err, event_doc) => {
            if (err || event_doc == null) {
              resolve(null)
            }
            else {
              resolve(event_doc)
            }
          })
        }))

      })

      // now, we wait for all the promises to finish
      Promise.all(sections_active_evts)
      .then(active_events => {

        let true_events = active_events.filter(evt => evt != null)

        if (true_events == null) {
          Logger.error(`Events returned 0 non-null entries`, `\t`)
          res.json({
            success: false,
            error: "Problem finding events"
          })
        }
        else {
          res.json({
            success: true,
            events: true_events
          })
        }

      })
    }
  })
});

eventRoutes.get('/active_for_section/:section_id', (req, res) => {
  let section_id = req.params.section_id
  // Get the sections for this course

  Logger.goodRequest("Events::activeForSection", [{key: "Section ID", value: section_id}])

  if (!ObjectID.isValid(section_id)) {
    Logger.error(`Section id is not a valid object id`, `\t`)
    res.json({
      success: false,
      error: "Invalid id format"
    })
    return;
  }

  Event.find({section: section_id, is_active: true}, (err, events) => {
    if(err || events == null) {
      Logger.error(`Problem finding events with section id ${section_id}`, `\t`)
      res.json({
        success: false,
        error: err
      })
    }
    else {
      Logger.success(`Successfully retrieved active events for section ${section_id}`, `\t`)
      res.json({
        success: true,
        events: events
      })
    }
  })
});

eventRoutes.get('/history_for_course/:course_id', (req, res) => {
  let course_id = req.params.course_id

  Logger.goodRequest("Events::historyForCourse", [{key: "Course ID", value: course_id}])
  if (!ObjectID.isValid(course_id)) {
    Logger.error(`Course id is not a valid object id`, `\t`)
    res.json({
      success: false,
      error: "Invalid id format"
    })
    return;
  }

  Section.find({course: course_id}, (err, sections) => {
    if(err || sections == null) {
      Logger.error(`Problem finding sections of course with course id of ${course_id}`, `\t`)
      res.json({
        success: false,
        error: err
      })
    }
    else {
      // for all of the sections, find all the events that
      // are for those sections
      let sections_events = []
      sections.forEach(section => {
        sections_events.push(new Promise(function(resolve, reject) {
          Event.find({section: section.id}, (err, evt_doc) => {

            if (err || evt_doc == null){
              resolve(null)
            }
            else {
              resolve(evt_doc)
            }

          })
        }))
      })

      // wait for all the promises
      Promise.all(sections_events)
      .then(history_ => {
        let full_history = history_.filter(val => val != null)

        Logger.success(`Successfully retrieved event history for course with id ${course_id}`, `\t`)
        res.json({
          success: true,
          events: full_history
        })

      })
    }
  })
});

eventRoutes.get('/history_for_section/:section_id', (req, res) => {
  let section_id = req.params.section_id

  Logger.goodRequest("Events::historyForSection", [{key: "Section ID", value: section_id}])
  if (!ObjectID.isValid(section_id)) {
    Logger.error(`Section ID provided is not a valid Object ID`, `\t`)
    res.json({
      success: false,
      error: "Invalid section ID"
    })
    return;
  }

  Event.find({section: section_id}, (err, section_events) => {
    if(err) {
      Logger.error(`Problem searching for section id`, `\t`)
      res.json({
        successs: false,
        error: err
      })
    }
    else{
      Logger.success(`Successfully found events`, `\t`)
      res.json({
        success: true,
        events: section_events
      })
    }
  })
});

eventRoutes.route('/section_and_course/:event_id').get(function (req, res) {
  let event_id = req.params.event_id;

  Logger.goodRequest(`Event::sectionAndCourse`, [{key: "Event ID", value: event_id}])

  if (!ObjectID.isValid(event_id)) {
    Logger.error("Event id is not a valid Object ID")
    res.json({
      success: false,
      error: "Invalid event id format"
    })
    return;
  }

  Event.findById(event_id, function (err, event){
      if(err || event == null){
        Logger.error(`Problem searching for event. ${err}`, `\t`)
        res.json({
          success: false,
          error: err
        });
      }else{
        Section.findById(event.section, (error, section) => {
          if(error) {
            Logger.error(`Problem searching for section. ${error}`, `\t`)
            res.json({
              success: false,
              error: error
            })
          } else {
            event.section = section
            Course.findById(section.course, (error_, course) => {
              if(error) {
                Logger.error(`Problem searching for course. ${error_}`, `\t`)
                res.json({
                  success: false,
                  error: error_
                })
              } else {
                event.section.course = course
                Logger.success(`Successfully returned Section and course`, `\t`)
                res.json({
                  success: true,
                  event: event
                })
              }
            })
          }
        })
      }
  });
});

/*
=================================================
*********************POST************************
=================================================
*/

eventRoutes.route('/add_event').post(function (req, res) {

  if (!('event' in req.body)) {
    Logger.badRequest('Event::addEvent', [{key: "Event", value: null}])
    res.json({
      success: false,
      error: "Event details not provided"
    })
    return;
  }

  Logger.goodRequest(`Event::addEvent`, [{key: "Event", value: req.body.event}])

  let event = new Event(req.body.event);
  event.save()
    .then(() => {
      Logger.success(`Successfully saved new event!`, `\t`)
      res.status(200).json({
        success: true,
        event: event
      });
    })
    .catch(() => {
      Logger.error(`Problem saving the new event.`, `\t`)
      res.status(400).json({
        success: false,
        error: "unable to save event to database"
      });
    });
});

eventRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_event = req.body.updated_event;
  Event.findByIdAndUpdate(id,
    {
      title: updated_event.title,
      section: updated_event.section,
      code: updated_event.code
    },
    function (err, event) {
      if (!event)
        res.status(404).send("event not found");
      res.json(event);
    }
  );
});

/*
=================================================
*********************DELETE**********************
=================================================
*/

eventRoutes.route('/delete/:id').delete(function (req, res) {
  Event.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

function isActive(event) {
  let current_time = new Date()
  return current_time >= event.start_time &&
    current_time <= event.end_time
}

function isToday(time) {
  let current_time = new Date()
  return current_time.getFullYear() === time.getFullYear() &&
    current_time.getMonth() === time.getMonth() &&
    current_time.getDate() === time.getDate()
}

module.exports = eventRoutes;
