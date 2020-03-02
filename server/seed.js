const seeder = require("mongoose-seed");

const db = "mongodb://localhost:27017/Venue2";

seeder.connect(db, function () {
	seeder.loadModels([
		"./Course/Course.model",
		"./User/User.model",
		"./Section/Section.model",
		"./Event/Event.model",
		"./Submission/Submission.model"
	]);
	seeder.clearModels(['Course', 'User', 'Section', 'Event', 'Submission']);
	seeder.populateModels(data, function (err, done) {
		if (err) {
			return console.log("seed err", err)
		}
		if (done) {
			return console.log("seed finished", done)
		}
		seeder.disconnect()
	})
});

const data = [{
	'model': 'Course',
	'documents': [{
			"name": "RCOS",
			"dept": "Computer Science",
			"course_number": 0
		},
		{
			"name": "Data Structures",
			"dept": "Computer Science",
			"course_number": 1
		},
		{
			"name": "Multivariable Calculus",
			"dept": "Mathematics",
			"course_number": 2
		},
		{
			"name": "Physics I",
			"dept": "Science",
			"course_number": 3
		}
	]
}, {
	'model': 'User',
	'documents': [{
		"_id": "5e5ca470deaa662f1ce87bc5",
		"first_name": "Admin",
		"last_name": "Admin",
		"email": "admin@gmail.com",
		"password": "nimda",
		"is_instructor": true
	}]
}];