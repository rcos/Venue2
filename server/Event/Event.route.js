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
    Logger.error(`Id of ${id} is not a valid ObjectID`)
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

  Logger.goodRequest('ActiveOrTodaysEvents')

  // check if the user id is valid
  if (!ObjectID.isValid(user_id)) {
    Logger.error('User ID is not a valid ObjectID', `\t`)
    res.json({
      success: false,
      error: 'Invalid User ID'
    })
    return;
  }

  User.findById(user_id, function (error, user) {
    if (error) {
      Logger.error(error)
      res.json({
        success: false,
        error: error
      })
    } else if (user.is_instructor) {

      let instructor_sections = []
      //Get the sections where this user an instructor
      Section.find(function (err, sections) {
        let counter = 0
        sections.forEach(section => {
          Course.findById(section.course, function (course_err, course) {
            counter++
            if (course_err) {
              Logger.error(course_err)
              res.json({
                success: false,
                error: course_err
              })
            } else {
              if (course.instructor == user_id)
                instructor_sections.push(section)
            }
            //Last iteration
            if (counter === sections.length) {
              //Get the active events
              Event.find(function (event_err, events) {
                if (event_err) {
                  console.log(event_err)
                  res.json(event_err)
                } else {
                  events.forEach(event => {
                    //check if the current event is in one of the instructor's sections
                    instructor_sections.forEach(instructor_section => {
                      if (instructor_section._id.equals(event.section)) {
                        //Get Active Events or Get today's events
                        if(get_active) {
                          if(isActive(event))
                            requested_events.push(event)
                        } else {
                          if(isToday(event.start_time) || isToday(event.end_time) || isActive(event))
                            requested_events.push(event)
                        }
                      }
                    })
                  })
                  res.json(requested_events)
                }
              })
            }
          })
        })
      })

    } else {

      let user_sections = []
      let current_time = new Date()
      Section.find((error, sections) => {
        sections.forEach((section) => {
          section.students.forEach((student) => {
            if (student._id == user_id)
              user_sections.push(section)
          })
        })
        Event.find(function (err, events) {
          if (err) {
            console.log(err)
            res.json(err)
          } else {
            events.forEach(event => {
              user_sections.forEach(user_section => {
                if (user_section._id.equals(event.section)) {
                  //Get Active Events or Get today's events
                  if(get_active) {
                    if(isActive(event))
                      requested_events.push(event)
                  } else {
                    if(isToday(event.start_time) || isToday(event.end_time) || isActive(event))
                      requested_events.push(event)
                  }
                }
              })
            })
            res.json(requested_events)
          }
        })
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
  if (!ObjectId.isValid(course_id)) {
    Logger.error(`Course id is not a valid object id`, `\t`)
    res.json({
      success: false,
      error: "Invalid id format"
    })
    return;
  }

  Section.find({course: course_id}, (err, sections) => {
    if(err || sections == null) {
      Logger.error(`Problem finding sections of course with course id of ${course_id}`)
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
        return new Promise(function(resolve, reject) {
          Event.find({section: section.id}, (err, evt_doc) => {

            if (err || evt_doc == null){
              resolve(null)
            }
            else {
              resolve(evt_doc)
            }

          })
        });
      })

      // wait for all the promises
      Promise.all(sections_events)
      .then(history_ => {
        let full_history = history_.filter(val => val != null)

        Logger.success(`Successfully retrieved event history for course with id ${course_id}`)
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
  Event.find({section: section_id}, (err, section_events) => {
    if(err)
      res.json(err)
    else
      res.json(section_events)
  })
});

eventRoutes.route('/section_and_course/:event_id').get(function (req, res) {
  let event_id = req.params.event_id;
  Event.findById(event_id, function (err, event){
      if(err){
        console.log(err);
        res.json(err);
      }else{
        Section.findById(event.section, (error, section) => {
          if(error) {
            res.json(error)
          } else {
            event.section = section
            Course.findById(section.course, (error, course) => {
              if(error) {
                res.json(error)
              } else {
                event.section.course = course
                res.json(event)
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
