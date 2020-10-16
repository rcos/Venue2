const express = require('express');
const eventRoutes = express.Router();

let Event = require('./Event.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Course = require('../Course/Course.model')

eventRoutes.route('/add').post(function (req, res) {
  let event = new Event(req.body.event);
  event.save()
    .then(() => {
      res.status(200).json(event);
    })
    .catch(() => {
      res.status(400).send("unable to save event to database");
    });
});

eventRoutes.route('/').get(function (req, res) {
  Event.find(function (err, events) {
    if (err)
      res.json(err);
    res.json(events);
  });
});

eventRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(event);
    }
  });
});

eventRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  let updated_event = req.body.updated_event;
  Event.findByIdAndUpdate(id,
    {
      title: updated_event.title,
      section: updated_event.section,
      code: updated_event.code,
      geofence: updated_event.geofence
    },
    function (err, event) {
      if (!event)
        res.status(404).send("event not found");
      res.json(event);
    }
  );
});

eventRoutes.route('/delete/:id').delete(function (req, res) {
  Event.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

eventRoutes.route('/getSection/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event) {
    if (err)
      res.json(err);

  });
});

eventRoutes.get('/active_or_todays_events/:user_id/:get_active', (req, res) => {
  let user_id = req.params.user_id
  let get_active = (req.params.get_active == 'true');
  let requested_events = []
  let active_events = []
  User.findById(user_id, function (error, user) {
    if (error || user === null) {
      console.log(error)
      res.json(error)
    } else if (user.is_instructor) {

      let instructor_sections = []
      //Get the sections where this user an instructor
      Section.find(function (err, sections) {
        let counter = 0
        sections.forEach(section => {
          Course.findById(section.course, function (course_err, course) {
            counter++;//todo fix?
            if (course_err) {
              console.log(course_err)
              res.json(course_err)
            } else {
              User.findById(user_id, function (error, user) {
                if (course.instructor == user.email)//todo fix? ; not sure course.instructor (should be plural) is accurate anymore
                  instructor_sections.push(section);
              });
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
                        if (get_active) {
                          if (isActive(event))
                            requested_events.push(event)
                        } else {
                          if (isToday(event.start_time) || isToday(event.end_time) || isActive(event))
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
      User.findById(user_id, function (error, user) {
        Section.find((error, sections) => {
          sections.forEach((section) => {
            section.students.forEach((student_email) => {
              if (student_email == user.email)
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
                    if (get_active) {
                      if (isActive(event))
                        requested_events.push(event)
                    } else {
                      if (isToday(event.start_time) || isToday(event.end_time) || isActive(event))
                        requested_events.push(event)
                    }
                  }
                })
              })
              res.json(requested_events)
            }
          })
        })
      });
    }
  })
});

eventRoutes.get('/active_for_course/:course_id', (req, res) => {
  let course_id = req.params.course_id
  // Get the sections for this course
  Section.find((err, sections) => {
    if (err) {
      res.json(err)
    } else {
      let course_sections = []
      sections.forEach(section => {
        if (section.course == course_id)
          course_sections.push(section._id.toString())
      })

      // Get the events for this section and check if they are active
      Event.find((error, events) => {
        if (error) {
          res.json(error)
        } else {
          let active_course_events = []
          events.forEach(event => {
            if (isActive(event) && course_sections.includes(event.section.toString()))
              active_course_events.push(event)
          })
          res.json(active_course_events)
        }
      })
    }
  })
});

eventRoutes.get('/active_for_section/:section_id', (req, res) => {
  let section_id = req.params.section_id
  // Get the sections for this course
  Event.find((err, events) => {
    if (err) {
      res.json(err)
    } else {
      let active_events = []
      events.forEach(event => {
        if (isActive(event) && event.section == section_id)
          active_events.push(event)
      })
      res.json(active_events)
    }
  })
});

eventRoutes.get('/history_for_course/:course_id', (req, res) => {
  let course_id = req.params.course_id
  Section.find((err, sections) => {
    if (err) {
      res.json(err)
    } else {
      let course_sections = []
      sections.forEach(section => {
        if (section.course == course_id)
          course_sections.push(section._id.toString())
      })

      // Get all events for the courses sections
      Event.find((error, events) => {
        if (error) {
          res.json(error)
        } else {
          let course_events = []
          events.forEach(event => {
            if (course_sections.includes(event.section.toString()))
              course_events.push(event)
          })
          res.json(course_events)
        }
      })
    }
  })
});

eventRoutes.get('/history_for_section/:section_id', (req, res) => {
  let section_id = req.params.section_id
  Event.find({ section: section_id }, (err, section_events) => {
    if (err)
      res.json(err)
    else
      res.json(section_events)
  })
});

eventRoutes.route('/section_and_course/:event_id').get(function (req, res) {
  let event_id = req.params.event_id;
  Event.findById(event_id, function (err, event) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      Section.findById(event.section, (error, section) => {
        if (error) {
          res.json(error)
        } else {
          event.section = section
          Course.findById(section.course, (error, course) => {
            if (error) {
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
