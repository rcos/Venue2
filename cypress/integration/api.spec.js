let getJwt = function() {
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

describe('User API Accessors',function() {
	before(() => {
		cy.seed()
	})
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	it('can getUsers()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			expect(res.body.length).to.equal(28)
		})
	})
	it('can getInstructors()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users/instructors',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let instructors = res.body
			expect(instructors.length).to.equal(2)
		})
	})
	it('can getStudents()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users/students',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let students = res.body
			expect(students.length).to.equal(26)
		})
	})
	it('can getInstructorCourses()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users/instructor_courses/'+id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let courses = res.body
			expect(courses.length).to.equal(1)
		})
	})
	it('can getInstructorCourses()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users/instructor_courses/'+id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let courses = res.body
			expect(courses.length).to.equal(1)
		})
	})
	it('can getStudentSections()',function() {
		cy.setUser('studenta','password')
		cy.window().then((window)=> {
			let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
			console.log(id)
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/users/student_sections/'+id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let sections = res.body
				expect(sections.length).to.equal(5)
				sections.forEach(section => {
					expect(section.students).to.include(id)
				})
			})
		})
	})
	it('can getStudentsForCourse()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/users/instructor_courses/'+id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let courses = res.body
			
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/users/students_for_course/'+courses[0]._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let students = res.body
				expect(students.length).to.equal(24)
			})
		})
	})
	//TODO getStudentsForLecture test
	// it('can getStudentsForLecture()',function() {
	// })
})

describe('User API Modifiers',function() {
	beforeEach(() => {
		cy.seed()
		cy.setUser('testinst','password')
	})
	it('can addUser()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/users/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				user: {
					first_name: "New",
					last_name: "User",
					email: "newuser@rpi.edu",
					user_id: "newuser",
					password: "password"
				}
			}
		}).then(res => {
			let addedUser = res.body
			console.log(addedUser)
			expect(addedUser.first_name).to.equal('New')
			expect(addedUser.last_name).to.equal('User')
			expect(addedUser.is_admin).to.equal(false)
			expect(addedUser.is_instructor).to.equal(false)
			expect(addedUser.ta_sections.length).to.equal(0)
			expect(addedUser.password).to.not.equal("password")
		})
	})
	it('can updateUser()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/users/update/'+id,
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				updated_user: {
					first_name: "John",
					last_name: "Smith",
					email: "testinst@rpi.edu",
					user_id: "testinst",
					password: "password",
					is_instructor: true,
					ta_sections: [],
					submissions: []
				}
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/users/edit/'+id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let updatedUser = res.body
				expect(updatedUser.first_name).to.equal('John')
				expect(updatedUser.last_name).to.equal('Smith')
				expect(updatedUser.is_admin).to.equal(false)
				expect(updatedUser.is_instructor).to.equal(true)
				expect(updatedUser.password).to.equal("password")
			})
		})
		
	})
	it('can deleteUser()',function() {
		let id = JSON.parse(window.localStorage.getItem('user')).current_user._id
		cy.request({
			method: 'DELETE',
			url: 'http://localhost:4000/users/delete/'+id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/users/edit/'+id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let removedUser = res.body
				expect(removedUser).to.equal(null)
				cy.exec('cd server && npm run seed && cd ../')
			})
		})
	})
})

describe('Course API Accessors',function() {
	before(() => {
		cy.seed()
	})
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	it('can getCourses() and getCourse()',function() {
		let jwt = getJwt()
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/courses',
			form: true,
			headers: {
				authorization: jwt
			}
		}).then(res => {
			expect(res.body.length).to.equal(5)
			res.body.forEach(course => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/courses/edit/'+course._id,
					form: true,
					headers: {
						authorization: jwt
					}
				}).then(res2 => {
					expect(course.name).to.equal(res2.body.name)
					expect(course.dept).to.equal(res2.body.dept)
					expect(course.course_number).to.equal(res2.body.course_number)
					expect(course.instructor).to.equal(res2.body.instructor)
				})
			})
		})
	})
	it('can getInstructorCourses() and getInstructor()',function() {
		let jwt = getJwt()
		cy.window().then(window=> {
			let inst = JSON.parse(window.localStorage.getItem('user')).current_user
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/courses/get_instructor_courses/'+inst._id,
				form: true,
				headers: {
					authorization: jwt
				}
			}).then(res => {
				expect(res.body.length).to.equal(1)
				let course = res.body[0]
				expect(course.name).to.equal("Testing Course")
				expect(course.dept).to.equal("TEST")
				expect(course.course_number).to.equal(1000)
				expect(course.instructor).to.equal(inst._id)
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/courses/getInstructor/'+course._id,
					form: true,
					headers: {
						authorization: jwt
					}
				}).then(res2 => {
					expect(res2.body._id).to.equal(inst._id)
				})
			})
		})
	})
})

describe('Section API',function() {
	beforeEach(() => {
		cy.seed()
		cy.setUser('testinst','password')
	})
})

describe('Lecture API',function() {
	beforeEach(() => {
		cy.seed()
		cy.setUser('testinst','password')
	})
})

describe('PlaybackPoll API',function() {
	beforeEach(() => {
		cy.seed()
		cy.setUser('testinst','password')
	})
})

describe('LectureSubmission API',function() {
	beforeEach(() => {
		cy.seed()
		cy.setUser('testinst','password')
	})
})