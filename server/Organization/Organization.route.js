const express = require('express');
const organizationRoutes = express.Router();

let Organization = require('./Organization.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

organizationRoutes.post('/add_courses/:id', (req, res) => {
    let course_ids = req.body.instructors;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        Promise.all([
            Course.updateMany({ _id: { $in: course_ids } }, { $push: { organization: organization_id } }),
            Organization.findByIdAndUpdate(organization_id, { $push: { courses: { $each: course_ids } } })
        ]).then(resolved => {
            res.json();
        });
    });
});
