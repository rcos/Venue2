const express = require('express');
const courseRoutes = express.Router();
const Logger = require('../Utility/Logger')
const ObjectID = require('mongoose').Types.ObjectId

let Course = require('./Course.model');
let User = require('../User/User.model');


/*
=================================================
**********************GET************************
=================================================
*/
courseRoutes.route('/getCourses/:offset/:count').get(function (req, res) {

  let offset = parseInt(req.params.offset)
  let count = parseInt(req.params.count)

  // offset or count are not numbers
  if (offset == NaN || count == NaN) {
    Logger.badRequest("Courses::getCourses",
      [{key: "Offset", value: offset}, {key: "Count", value: count}])

    Logger.error('Invalid parameteres', '\n\t')

    res.json({
      success: false,
      error: "Invalid parameters"
    })
    return;
  }

  Logger.goodRequest("Courses::getCourses",
    [{key: "Offset", value: offset}, {key: "Count", value: count}])

  // search the database...
  Course.find({}, null, { skip: offset, limit: count }, function (err, courses) {

    // no courses were found
    if (err || courses == null) {
      Logger.error(`Error looking up courses. (${err})` ,'\t')
      res.json({
        success: false,
        error: err
      });
    }

    // courses found.. returning
    else {
      Logger.success(`Successfully found ${count} courses offsetted by ${offset}`, '\t')
      res.json({
        success: true,
        courses: courses
      });
    }
  });
});

//Todo: change the id being passed to just be the instructor id
//and search for the instructor or remove this function entirely and use
//the userapis get user function
courseRoutes.route('/get_instructor/:id').get(function (req, res) {
  let id = 'id' in req.params ? req.params.id : null;

  if (id == null) {
    Logger.badRequest('Courses::getInstructor', [{ key: 'id', value: id }])
    res.json({
      success: false,
      error: "Invalid id recieved"
    })
    return;
  }

  Logger.goodRequest('Courses::getInstructor', [{key: 'id', value: id}])
  if (!ObjectID.isValid(id)) {
    Logger.error('Course id recieved is not a valid object ID', '\t')
    res.json({
      success: false,
      error: "Invalid id format"
    })
    return;
  }

  Course.findById(id, function (err, course) {

    // Course could not be found
    if (err || course == null) {
      Logger.error(`Course with id ${id} could not be found`, '\t')
      Logger.error(`${course}`)
      res.json({
        success: false,
        error: err
      });
    }
    else {

      let instructor_id = course.instructor;
      User.findById(instructor_id, function (error, instructor) {

        // Instructor could not be found
        if (error || instructor == null) {
          Logger.error(`Error searching for instructor with id ${instructor_id}`, '\t')
          res.json({
            success: false,
            error: error
          })
        }

        else {
          Logger.success(`Successfully found instructor with id ${instructor_id}`)
          res.json({
            success: true,
            instructor_data: {
              _id: instructor._id,
              first_name: instructor.first_name,
              last_name: instructor.last_name,
              email: instructor.email,
              ta_sections: instructor.ta_sections,
              submissions: instructor.submissions
            }
          })
        }
      });

    }
  });
});

courseRoutes.route('/get_instructor_courses/:user_id').get(function (req, res) {

  // GetInstructorCourses
  // Get the courses that this user is an instructor of

  let user_id = 'user_id' in req.params ? req.params.user_id : null;

  if (user_id == null) {
    Logger.badRequest("Course::getInstructorCourses", [{key: "User ID", value: user_id}])
    res.json({
      success: false,
      error: "No user id provided"
    })
    return;
  }

  Logger.goodRequest("Course::getInstructorCourses", [{key: "User ID", value: user_id}])

  if (!ObjectID.isValid(user_id)) {
    Logger.error(`User id ${user_id} is not a valid ObjectID`, `\t`)
    res.json({
      success: false,
      error: "User id is not of valid format"
    })
    return;
  }

  Course.find({instructor: user_id}, function(err, instructor_courses) {
    if(err || instructor_courses == null) {
      Logger.error(`Could not find courses with instructor id ${user_id}`, `\t`)
      res.json({
        success: false,
        error: "Problem finding courses"
      })
    } else {
      Logger.success(`Successfully found couses with instructor id ${user_id}`, `\t`)
      res.json({
        success: true,
        courses: instructor_courses
      })
    }
  })
});

courseRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Course.findById(id, function (err, course) {
    if (err) {
      res.json(err);
    }
    res.json(course);
  });
});

/*
=================================================
**********************POST***********************
=================================================
*/

courseRoutes.route('/update_course').post(function (req, res) {
  let id = 'id' in req.body ? req.body.id : null;
  let updated_course = 'updated_course' in req.body ? req.body.updated_course : null;

  if (id == null || updated_course == null) {
    Logger.badRequest("Course::updateCourse", [{key: "id", value: id}, {key: "Updated Course", value: updated_course}])
    res.json({
      success: false,
      error: "Required fields not provided"
    })
    return;
  }

  Logger.goodRequest("Course::updateCourse", [{key: "id", value: id}, {key: "Updated Course", value: updated_course}])
  if (!ObjectID.isValid(id)) {
    Logger.error(`id provided is not a valid object id`, '\t')
    res.json({
      success: false,
      error: "id is invalid format"
    })
    return;
  }

  Course.findByIdAndUpdate(id,
    updated_course,
    {new: true}, // return the updated document, not the old one
    function (err, course) {
      if (err || course == null) {
        // res.status(404).send("section not found");
        Logger.error(`Error updating course with id ${id}`, `\t`)
        res.json({
          success: false,
          error: "Problem updating"
        })
      }
      else {
        Logger.success(`Successfully updated course with id ${id}`, `\t`)
        res.json({
          success: true,
          course: course
        });
      }
    }
  );
});


courseRoutes.route('/add_course').post(function (req, res) {

  let course_info = 'course' in req.body ? req.body.course : null
  if (course_info == null) {
    Logger.badRequest('Course::AddCourse', [{key: "Course Info", value: course_info}])
    res.json({
      success: false,
      error: "Course info not found"
    })
    return;
  }

  Logger.goodRequest('Course::AddCourse', [{key: 'Course Info', value: course_info}])

  // Check if the instructor id is valid
  if ('instructor' in course_info && !ObjectID.isValid(course_info.instructor)) {
    Logger.error(`Instructor id ${course_info.instructor} is not a valid ObjectID`, '\t')
    res.json({
      success: false,
      error: "Invalid instructor id format"
    })
    return;
  }

  // Create new course
  let course = new Course(course_info);
  course.save()
    .then(() => {
      Logger.success(`Successfully created new course.`, '\t')

      res.status(200).json({
        success: true,
        course: course
      });
    })
    .catch(() => {
      Logger.error(`Unable to save course to database`, '\t')

      res.status(400).send({
        success: false,
        error: "unable to save course to database"
      });
    });
});

/*
=================================================
********************DELETE***********************
=================================================
*/
courseRoutes.route('/delete/:id').delete(function (req, res) {

  Logger.goodRequest("Courses::delete", [{ key: "Course ID", value: req.params.id }])

  Course.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      Logger.error(`Problem deleting course with id ${req.params.id}`, '\t');
      res.json({
        success: false,
        error: "Problem deleting course."
      })
    }
    else {
      Logger.success(`Successfully deleted course with id ${req.params.id}`, `\t`);
      res.json({
        success: true
      });
    }
  });
});

module.exports = courseRoutes;
