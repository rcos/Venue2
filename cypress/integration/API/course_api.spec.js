let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

describe('API - Course Accessors',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	it('can getCourses() and getCourse()',function() {
		
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/courses',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			expect(res.body.length).to.equal(5)
			res.body.forEach(course => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/courses/edit/'+course._id,
					form: true,
					headers: {
						authorization: getJwt()
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
		cy.window().then(window=> {
			let inst = JSON.parse(window.localStorage.getItem('user')).current_user
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/courses/get_instructor_courses/'+inst._id,
				form: true,
				headers: {
					authorization: getJwt()
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
						authorization: getJwt()
					}
				}).then(res2 => {
					expect(res2.body._id).to.equal(inst._id)
				})
			})
		})
	})
})

describe('API - Course Modifiers',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	after(() => {
		cy.seed()
	})
	let addedCourse
	it('can addCourse()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/courses/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				course: {
					name: "NewCourse",
					dept: "TEST",
					course_number: 1010,
					instructor: JSON.parse(window.localStorage.getItem('user')).current_user._id
				}
			}
		}).then(res => {
			addedCourse = res.body
			expect(addedCourse.name).to.equal('NewCourse')
			expect(addedCourse.dept).to.equal('TEST')
			expect(addedCourse.course_number).to.equal(1010)
			expect(addedCourse.instructor).to.equal(JSON.parse(window.localStorage.getItem('user')).current_user._id)
		})
	})
	it('can updateCourse()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/courses/update/'+addedCourse._id,
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				updated_course: {
					name: "OldCourse",
					dept: "TEST",
					course_number: 1111,
					instructor: JSON.parse(window.localStorage.getItem('user')).current_user._id
				}
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/courses/edit/'+addedCourse._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let updatedCourse = res.body
				expect(updatedCourse.name).to.equal('OldCourse')
				expect(updatedCourse.dept).to.equal('TEST')
				expect(updatedCourse.course_number).to.equal(1111)
				expect(updatedCourse.instructor).to.equal(JSON.parse(window.localStorage.getItem('user')).current_user._id)
			})
		})
		
	})
	it('can deleteCourse()',function() {
		cy.request({
			method: 'DELETE',
			url: 'http://localhost:4000/courses/delete/'+addedCourse._id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/courses/edit/'+addedCourse._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let removedCourse = res.body
				expect(removedCourse).to.equal(null)
			})
		})
	})
})