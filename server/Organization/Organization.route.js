const express = require('express');
const organizationRoutes = express.Router();

let Organization = require('./Organization.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

organizationRoutes.post('/add_admins/:id', (req, res) => {
    let admin_ids = req.body.admin_accounts;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        Promise.all([
            Course.updateMany({ _id: { $in: admin_ids } }, { $push: { organization: organization_id } }),
            Organization.findByIdAndUpdate(organization_id, { $push: { admin_acounts: { $each: admin_ids } } })
        ]).then(resolved => {
            res.json();
        });
    });
});
organizationRoutes.post('/add_users/:id', (req, res) => {
    let user_ids = req.body.users;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        Promise.all([
            Course.updateMany({ _id: { $in: user_ids } }, { $push: { organization: organization_id } }),
            Organization.findByIdAndUpdate(organization_id, { $push: { users: { $each: user_ids } } })
        ]).then(resolved => {
            res.json();
        });
    });
});
organizationRoutes.post('/add_courses/:id', (req, res) => {
    let course_ids = req.body.courses;
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
