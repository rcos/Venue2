const express = require('express');
const organizationRoutes = express.Router();

let Organization = require('./Organization.model');
let Course = require('../Course/Course.model');
let Section = require('../Section/Section.model');
let User = require('../User/User.model');
let Lecture = require('../Lecture/Lecture.model');

organizationRoutes.get('/', (req, res) => {
    Organization.find(function (err, organizations) {
        if (err || organizations == null) {
            console.log("<ERROR> Getting all organizations")
            res.json(err);
        } else {
            console.log("<SUCCESS> Getting all organizations")
            res.json(organizations);
        }
    });
});
organizationRoutes.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    let updated_org = req.body.updated_organization;
    Organization.findByIdAndUpdate(id, {
        name: updated_org.name,
        admin_accounts: updated_org.admin_accounts,
        courses: updated_org.courses,
        max_courses: updated_org.max_courses,
        max_users: updated_org.max_users
    },
        function (err, user) {
            if (err || user == null) {
                console.log("<ERROR> Updating organization by ID:", id, "with:", updated_org)
                res.status(404).send("organization not found");
            } else {
                console.log("<SUCCESS> Updating organization by ID:", id, "with:", updated_org)
                res.json(user);
            }
        });
});
organizationRoutes.get('/get_courses/:id', (req, res) => {
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (errorg, organization) {
        if (errorg || organization == null) {
            console.log("<ERROR> Getting organization with ID ", organization_id);
            res.json(err);
        } else {
            Courses.find({ organization: organization_id }, function (err, courses) {
                if (err || courses == null) {
                    console.log("<ERROR> Getting courses for organization with ID:", organization_id);
                    res.json(err);
                } else {
                    console.log("<SUCCESS> Getting courses for organization with ID:", organization_id);
                    res.json(courses);
                }
            });
        }
    });
});
organizationRoutes.get('/get_users/:id', (req, res) => {
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (errorg, organization) {
        if (errorg || organization == null) {
            console.log("<ERROR> Getting organization with ID ", organization_id);
            res.json(err);
        } else {
            User.find({ organization: organization_id }, function (err, users) {
                if (err || users == null) {
                    console.log("<ERROR> Getting users for organization with ID:", organization_id);
                    res.json(err);
                } else {
                    console.log("<SUCCESS> Getting users for organization with ID:", organization_id);
                    res.json(users);
                }
            });
        }
    });
});
organizationRoutes.get('/get_admins/:id', (req, res) => {
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (errorg, organization) {
        if (errorg || organization == null) {
            console.log("<ERROR> Getting organization with ID ", organization_id);
            res.json(err);
        } else {
            User.find({ organization: organization_id }, function (err, users) {
                if (err || users == null) {
                    console.log("<ERROR> Getting admins for organizatoin with ID:", organization_id);
                    res.json(err);
                } else {
                    console.log("<SUCCESS> Getting admins for organization with ID:", organization_id);
                    res.json(users);
                }
            });
        }
    });
});
organizationRoutes.post('/add_admins/:id', (req, res) => {
    let admin_emails = req.body.admin_accounts;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        User.find({ organization: organization_id }, function (err, users) {
            User.find({ email: { $in: admin_emails } }, function (err, admins) {
                if (noDupes.length <= organization.max_users) {
                    let admin_ids = admins.map(a => a._id);
                    Promise.all([
                        User.updateMany({ _id: { $in: admin_ids } }, { $push: { organization: organization_id } }),
                        Organization.findByIdAndUpdate(organization_id, { $push: { admin_acounts: { $each: admin_emails } } })
                    ]).then(resolved => {
                        res.json();
                    });
                } else {
                    console.log("<ERROR> Exceeded max_users for organization with ID ", organization_id);
                    res.json();
                }
            });

        });
    });
});
organizationRoutes.post('/add_users/:id', (req, res) => {
    let user_emails = req.body.users;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        User.find({ organization: organization_id }, function (err, users) {
            User.find({ email: { $in: user_emails } }, function (err, users_toAdd) {
                let noDupes = [new Set([users_toAdd, users])];
                if (noDupes.length <= organization.max_users) {
                    let user_ids = users_toAdd.map(a => a._id);
                    Promise.all([
                        User.updateMany({ _id: { $in: user_ids } }, { $push: { organization: organization_id } }),
                    ]).then(resolved => {
                        res.json();
                    });
                } else {
                    console.log("<ERROR> Exceeded max_users for organization with ID ", organization_id);
                    res.json();
                }
            });
        });
    });
});
organizationRoutes.post('/add_courses/:id', (req, res) => {
    let course_ids = req.body.courses;
    let organization_id = req.params.id;
    Organization.findById(organization_id, function (err, organization) {
        if (organization.courses.length + course_ids.length > organization.max_courses) {
            console.log("Users exceeded max users for organization id: ", organization_id);
            res.json();
        } else {
            Promise.all([
                Course.updateMany({ _id: { $in: course_ids } }, { $push: { organization: organization_id } }),
                Organization.findByIdAndUpdate(organization_id, { $push: { courses: { $each: course_ids } } })
            ]).then(resolved => {
                res.json();
            });
        }
    });
});
