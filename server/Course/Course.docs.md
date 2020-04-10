# Course Documentation
-----
## GET
#### Get Courses
`/courses/get_courses/:offset/:count`

**Description:** Retrieves {count} courses, offset by {offset}.

###### Params
* **offset:** The amount of documents to skip
* **count:** The amount of documents to return

###### Expected response
```
{
  success: true,

  courses: [{
      _id: "a1jrfklajfkljklajfake",
      name: "Course Name",
      dept: "MATH",
      course_number: 1200,
      instructor: 901kfla9e90123kl
    },
    ... ]
}
```
```
{
  success: false,

  error: "<Error message>"
}
```

#### Get Instructor
`/courses/get_instructor/:id`

**Description:** Returns the instructor that teaches the course with the id {id}

###### Params
* **id:** The id of the course that you want to get the instructor of

###### Expected response
```
{
  success: true,

  instructor_data: {
    _id: "jk1fjakjekfgjak",
    first_name: "First Name",
    last_name: "Last Name",
    email: sample_instructor@email.com,
    ta_sections: [ ... ],
    submissions: [ ... ]
  }

}
```
```
  success: false,
  error: "<Error message>"
```

#### Get Instructor Courses
`/courses/get_instructor_courses/:user_id`

**Description:** Get the courses that is taught by the instructor with the id {user_id}

###### Params
* **user_id:** The id of the instructor to search for courses by


###### Expected response
```
{
  success: true,

  courses: [... ,{
      _id: 1941890jfkdas910,
      name: "Course Name",
      dept: "MATH",
      course_number: 4000
    }, ...]
}
```
```
{
  success: false,

  error: "<Error message>"
}
```

#### GetCourse
`/courses/get_course/:id`

**Description:** Get the course that has the id {id}

###### Params
* **id:** The id of the course to retrieve

###### Expected response
```
{
  success: true,
  course: {
    _id: 1909riof904,
    name: "Course Name",
    dept: "MATH",
    course_number: 9040
  }
}
```
```
{
  success: false,
  error: "<Error message>"
}
```

## POST
#### Update Course
`/courses/update_course`

**Description:** Update a course with new information

###### Body Fields
* **{id}:** The id of the course being updated
* **{updated_course}:** The information to update the course with

*updated_course format*:
```
{
  name: String, // The new course name
  dept: String, // The new course dept
  course_number: Number, // The new course number
  instructor: String // The id of the new instructor
}
```

###### Expected response
```
{
  success: true,
  course: {
    name: "Course Name",
    dept: "Course dept",
    course_number: 2000,
    instructor: 9101ifklalka019
  }
}
```
```
{
  success: false,

  error: "<error message>"
}
```
#### Add Course
`/courses/add_course`

**Description:** Add a new course

###### Body Fields
* **{course}:** An object that describes the new course to add

*course format*:
```
{
  // The name of the course
  name: String,

  // The Department the course belongs to
  dept: String,

  // The course number in the department
  course_number: Number,

  // The id of the instructor teaching this course
  instructor: String
}
```

###### Expected response
```
{
  success: true,

  course: {
    name: "Course Name",
    dept: "Course DEPT",
    course_number: 91094,
    instructor: 19409fikal9120
  }
}
```
```
{
  success: false,

  error: "<Error message>"
}
```

## DELETE
#### Delete Course
`/courses/delete/:id`

**Description:** Delete a course with the given course id {id}

###### Params
* **{id}:** The id of the course to delete

###### Expected response
```
{
  success: true
}
```
```
{
  success: false
}
```
