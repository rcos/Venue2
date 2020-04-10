# Event Documentation
-----
## GET
#### Get Events
`/events/get_events/:offset/:count`

**Description:** Get all events offset by {offset}, limited to {count} documents

###### Params
* **offset:** The amount of documents to skip
* **count:** The limit of how many documents to return

###### Expected Response
```
{
  success: true,
  events: [ ..., {
      title: "Event title",
      section: 29304jskf298093,
      _id: 95kdlfsdk90293,
      code: 9301239,
      location: "Location, name",
      start_time: "2020-04-10T-4:00:00.000Z",
      end_time: "2020-04-10T-4:00:00.000Z",
      submission_start_time: "2020-04-10T-4:00:00.000Z",
      submission_end_time: "2020-04-10T-4:00:00.000Z"
    }, ... ]
}
```
```
{
  success: false,
  error: "<error message>"
}
```

#### Get Event
`/events/get_event/:id`

**Description:** Get the event with that id of {id}

###### Params
* **id:** The id of the event to return

###### Expected Response
```
{
  success: true,
  event: {
      title: "Event title",
      section: 29304jskf298093,
      _id: 95kdlfsdk90293,
      code: 9301239,
      location: "Location, name",
      start_time: "2020-04-10T-4:00:00.000Z",
      end_time: "2020-04-10T-4:00:00.000Z",
      submission_start_time: "2020-04-10T-4:00:00.000Z",
      submission_end_time: "2020-04-10T-4:00:00.000Z"
    }
}
```
```
{
  success: false,
  error: "<Error message>"
}
```

#### Get Active Events For Course
`/events/active_for_course/:course_id`

**Description:** Get the active events for a given course with is {course_id}

###### Params
* **course_id:** The id of the course to find the active events of

###### Expected Response
```
{
  success: true,
  events: [ ..., {
      title: "Event title",
      section: 29304jskf298093,
      _id: 95kdlfsdk90293,
      code: 9301239,
      location: "Location, name",
      start_time: "2020-04-10T-4:00:00.000Z",
      end_time: "2020-04-10T-4:00:00.000Z",
      submission_start_time: "2020-04-10T-4:00:00.000Z",
      submission_end_time: "2020-04-10T-4:00:00.000Z"
    }, ...]
}
```
```
{
  success: false,
  error: '<Error Message>'
}
```

#### Get Active Events For Section
`/events/active_for_section/:section_id`

**Desctiption:** Get the active events for a given section with an id of {section_id}

###### Params
* **section_id:** The id of the section to get the active events of

###### Expected Response
```
{
  success: true,
  events: [ ..., {
      title: "Event title",
      section: 29304jskf298093,
      _id: 95kdlfsdk90293,
      code: 9301239,
      location: "Location, name",
      start_time: "2020-04-10T-4:00:00.000Z",
      end_time: "2020-04-10T-4:00:00.000Z",
      submission_start_time: "2020-04-10T-4:00:00.000Z",
      submission_end_time: "2020-04-10T-4:00:00.000Z"
    }, ...]
}
```
```
{
  success: false,
  error: '<Error Message>'
}
```

#### Get Event History For Course
`/events/history_for_course/:course_id`

**Description:** Get all the events associated with the course with an id of {course_id}

###### Params
* **course_id**: The id of the course to search for

###### Expected Response
```
{
  success: true,
  events: [ ..., {
      title: "Event title",
      section: 29304jskf298093,
      _id: 95kdlfsdk90293,
      code: 9301239,
      location: "Location, name",
      start_time: "2020-04-10T-4:00:00.000Z",
      end_time: "2020-04-10T-4:00:00.000Z",
      submission_start_time: "2020-04-10T-4:00:00.000Z",
      submission_end_time: "2020-04-10T-4:00:00.000Z"
    }, ...]
}
```
```
{
  success: false,
  error: '<Error Message>'
}
```

#### Get History For Section
`/events/history_for_section/:section_id`

**Description:** Get all of the events for a given section

###### Params
* **section_id:** The id of the section to search for

###### Expected Response
```
{
  success: true,
  events: { ... }
}
```
```
{
  success: false,
  error: '<Error Message>'
}
```

#### Get Section And Course
`/events/section_and_course/:event_id`

**Description:** Get the section and course for a given event

###### Params
* **event_id:** The id of the event to search for


## POST
#### Add Event
`/events/add_event`

**Description:** Add a new event.

###### Body Fields
* **{event}:** The details of the new event

###### Expected Response
```
{
  success: true,

  event: { ... }
}
```
```
{
  success: false,
  error: "<Error message>"
}
```
