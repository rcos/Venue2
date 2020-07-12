let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

describe('API - Section Accessors',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	let sections
	it('can getSections() and getSection()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/sections',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			sections = res.body
			expect(sections.length).to.equal(5)
			sections.forEach(section => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/sections/edit/'+section._id,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res2 => {
					expect(section.course).to.equal(res2.body.course)
					expect(section.number).to.equal(res2.body.number)
					section.students.forEach((stud,index) => {
						expect(stud).to.deep.equal(res2.body.students[index])
					})
					section.teaching_assistants.forEach((ta,index) => {
						expect(ta).to.deep.equal(res2.body.teaching_assistants[index])
					})
				})
			})
		})
	})
	it('can getCourse(), getInstructor(), getSectionsWithCourse(), and getSectionsForCourse()',function() {
		sections.forEach(section => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/sections/getCourse/'+section._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/sections/getInstructor/'+section._id,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res2 => {
					expect(res.body.instructor).to.equal(res2.body._id)
				})
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/sections/get_with_course/'+section._id,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res2 => {
					expect(res.body).to.deep.equal(res2.body.course)
					cy.request({
						method: 'GET',
						url: 'http://localhost:4000/sections/get_for_course/'+res2.body.course._id,
						form: true,
						headers: {
							authorization: getJwt()
						}
					}).then(res3 => {
						let count = 0
						res3.body.forEach(sect => {
							if(sect._id == section._id) {
								count++
							}
						})
						expect(count).to.equal(1)
					})
				})
			})
		})
	})
	it('can getStudents() and getSectionsWithCoursesForStudent()',function() {
		sections.forEach(section => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/sections/getStudents/'+section._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				res.body.forEach(student => {
					cy.request({
						method: 'GET',
						url: 'http://localhost:4000/sections/get_with_courses_for_student/'+student._id,
						form: true,
						headers: {
							authorization: getJwt()
						}
					}).then(res => {
						let count = 0
						res.body.forEach(sectionWithCourse => {
							if(sectionWithCourse._id == section._id) {
								count++
							}
							expect(sectionWithCourse.students).to.contain(student._id)
							expect(sectionWithCourse.course.dept).to.exist
						})
						expect(count).to.equal(1)
					})
				})
			})
		})
	})
})

describe('API - Section Modifiers',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	after(() => {
		cy.seed()
	})
	let addedSection
	it('can addSection()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/sections/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				section: {
					number: 999,
					students: [],
					teaching_assistants: []
				}
			}
		}).then(res => {
			addedSection = res.body
			expect(addedSection.number).to.equal(999)
			expect(addedSection.students.length).to.equal(0)
			expect(addedSection.teaching_assistants.length).to.equal(0)
		})
	})
	it('can updateSection()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/sections/update/'+addedSection._id,
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				updated_section: {
					number: 998,
					students: [],
					teaching_assistants: []
				}
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/sections/edit/'+addedSection._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let updatedSection = res.body
				expect(updatedSection.number).to.equal(998)
				expect(updatedSection.students).to.equal(null)
				expect(updatedSection.teaching_assistants).to.equal(null)
			})
		})
		
	})
	it('can deleteSection()',function() {
		cy.request({
			method: 'DELETE',
			url: 'http://localhost:4000/sections/delete/'+addedSection._id,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/sections/edit/'+addedSection._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let removedSection = res.body
				expect(removedSection).to.equal(null)
			})
		})
	})
})