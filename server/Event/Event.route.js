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
    Event.find(function(err, events){
    if(err)
      res.json(err);
    res.json(events);
  });
});

eventRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event){
      if(err){
        console.log(err);
        res.json(err);
      }else{
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
    },
    function(err, event) {
      if (!event)
        res.status(404).send("event not found");
      res.json(event);    
    }
  );
});

eventRoutes.route('/delete/:id').delete(function (req, res) {
    Event.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

eventRoutes.route('/getSection/:id').get(function (req, res) {
  let id = req.params.id;
  Event.findById(id, function (err, event){
      if(err)
        res.json(err);

  });
});

eventRoutes.get('/active_or_todays_events/:user_id/:is_active', (req, res) => {
  let user_id = req.params.user_id
  let is_active = (req.params.is_active == 'true');
  let requested_events = []
  User.findById(user_id, function(error, user) {
    if(error) {
      console.log(error)
      res.json(error)
    } else if(user.is_instructor) {

      let instructor_sections = []
      //Get the sections where this user an instructor
      Section.find(function(err, sections) {
        let counter = 0
        sections.forEach(section => {
          Course.findById(section.course, function(course_err, course) {
            counter++
            if(course_err) {
              console.log(course_err)
              res.json(course_err)
            } else { 
              if(course.instructor == user_id)
                instructor_sections.push(section)
            }
            //Last iteration
            if(counter === sections.length){
              //Get the active events
              Event.find(function(event_err, events) {
                if(event_err) {
                  console.log(event_err)
                  res.json(event_err)
                } else {
                  events.forEach(event => {
                    //check if the current event is in one of the instructor's sections
                    instructor_sections.forEach(instructor_section => {
                      if(instructor_section._id.equals(event.section)) {
                        //Get Active Events or Get today's events
                        if(is_active) {
                          if(isActive(event)) 
                            requested_events.push(event)
                        } else {
                          if(isToday(event.start_time)) 
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
            if(student._id == user_id)
              user_sections.push(section)
          })
        })
        Event.find(function(err, events){
          if(err) {
            console.log(err)
            res.json(err)
          } else {
            events.forEach(event => {
              user_sections.forEach(user_section => {
                if(user_section._id.equals(event.section)) {
                  //Get Active Events or Get today's events
                  if(is_active) {
                    if(isActive(event)) 
                      requested_events.push(event)
                  } else {
                    if(isToday(event.start_time)) 
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