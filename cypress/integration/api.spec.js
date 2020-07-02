let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

describe('API - User Accessors',function() {
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

describe('API - User Modifiers',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	after(() => {
		cy.seed()
	})
	let addedUser
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
			addedUser = res.body
			expect(addedUser.first_name).to.equal('New')
			expect(addedUser.last_name).to.equal('User')
			expect(addedUser.is_admin).to.equal(false)
			expect(addedUser.is_instructor).to.equal(false)
			expect(addedUser.ta_sections.length).to.equal(0)
			expect(addedUser.password).to.not.equal("password")
		})
	})
	it('can updateUser()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/users/update/'+addedUser._id,
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				updated_user: {
					first_name: "Old",
					last_name: "User",
					email: "olduser@rpi.edu",
					user_id: "olduser",
					password: "password",
					is_instructor: true,
					ta_sections: [],
					submissions: []
				}
			}
		}).then(res => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/users/edit/'+addedUser._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let updatedUser = res.body
				expect(updatedUser.first_name).to.equal('Old')
				expect(updatedUser.last_name).to.equal('User')
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
			})
		})
	})
})

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

describe('API - Lecture Accessors',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	let lectures
	it('can getLectures() and getLecture()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/lectures',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			lectures = res.body
			expect(lectures.length).to.equal(4)
			lectures.forEach(lecture => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/lectures/'+lecture._id,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res2 => {
					expect(lecture.title).to.equal(res2.body.title)
					expect(lecture.sections).to.deep.equal(res2.body.sections)
					expect(lecture.allow_live_submissions).to.equal(res2.body.allow_live_submissions)
					expect(lecture.allow_playback_submissions).to.equal(res2.body.allow_playback_submissions)
					expect(lecture.start_time).to.equal(res2.body.start_time)
					expect(lecture.end_time).to.equal(res2.body.end_time)
					expect(lecture.checkins).to.deep.equal(res2.body.checkins)
					expect(lecture.playback_submission_start_time).to.equal(res2.body.playback_submission_start_time)
					expect(lecture.playback_submission_end_time).to.equal(res2.body.playback_submission_end_time)
					expect(lecture.video_ref).to.equal(res2.body.video_ref)
					expect(lecture.num_playback_polls).to.equal(res2.body.num_playback_polls)
				})
			})
		})
	})
	it('can getLecturesForUser()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/lectures/for_user/'+JSON.parse(window.localStorage.getItem('user')).current_user._id+'/none',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			lectures = res.body
			expect(lectures.length).to.equal(0)
		})
		cy.setUser('studenta','password')
		cy.window().then(window => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/lectures/for_user/'+JSON.parse(window.localStorage.getItem('user')).current_user._id+'/none',
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				lectures = res.body
				expect(lectures.length).to.equal(4)
			})
		})
	})
	let courses = {}
	it('',function() {
		let n = 0
		lectures.forEach(lecture => {
			n++
			let m = 0
			lecture.sections.forEach(section => {
				m++
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/sections/getCourse/'+section,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res => {
					let course = res.body
					if(undefined == courses[''+course._id]) {
						courses[''+course._id] = course
						courses[''+course._id].sections = {}
					}
					if(undefined == courses[''+course._id].sections[''+section]) {
						courses[''+course._id].sections[''+section] = {lectures: {}}
					}
					if(undefined == courses[''+course._id].sections[''+section].lectures[''+lecture._id]) {
						courses[''+course._id].sections[''+section].lectures[''+lecture._id] = lecture
					}
				})
			})
		})
	})
	it('can getLecturesForCourse() and getLecturesForSection()',function() {
		let courseIDS = Object.keys(courses)
		courseIDS.forEach(courseID => {
			let sectionIDS = Object.keys(courses[''+courseID].sections)
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/lectures/for_course/'+courseID,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let courselectures = res.body
				courselectures.forEach(lect => {
					let coursecount = 0
					sectionIDS.forEach(sectID => {
						let lectureIDS = Object.keys(courses[''+courseID].sections[''+sectID].lectures)
						lectureIDS.forEach(lectID => {
							if(lectID == lect._id) {
								coursecount++
							}
						})
					})
					expect(coursecount).to.be.at.least(1)
				})
			})
			sectionIDS.forEach(sectID => {
				cy.request({
					method: 'GET',
					url: 'http://localhost:4000/lectures/for_section/'+sectID,
					form: true,
					headers: {
						authorization: getJwt()
					}
				}).then(res => {
					let sectionlectures = res.body
					sectionlectures.forEach(lect => {
						let sectioncount = 0
						let lectureIDS = Object.keys(courses[''+courseID].sections[''+sectID].lectures)
						lectureIDS.forEach(lectID => {
							if(lectID == lect._id) {
								sectioncount++
							}
						})
						expect(sectioncount).to.be.at.least(1)
					})
				})
			})
		})
	})
	it('can getLectureWithSectionsAndCourse()',function() {
		lectures.forEach(lecture => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/lectures/with_sections_and_course/'+lecture._id,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let lect = res.body
				lect.sections.forEach(sect => {
					let pathLect = courses[''+sect.course._id].sections[''+sect._id].lectures[''+lect._id]
					expect(pathLect).to.deep.equal(lecture)
				})
			})
		})
	})
})

describe('API - Lecture Modifiers',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	after(() => {
		cy.seed()
	})
	it('can addLecture()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/lectures/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				lecture: {
					title: "testtest",
				}
			}
		}).then(res => {
			let addedLecture = res.body
			expect(addedLecture.title).to.equal("testtest")
		})
	})
})

describe('API - PlaybackPoll Accessors',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	let lectures = []
	it('can getPolls()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/polls',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let polls = res.body
			polls.forEach(poll => {
				lectures.push(poll.lecture)
			})
			expect(polls.length).to.equal(5)
		})
	})
	it('can getByLecture()',function() {
		lectures.forEach(lecture => {
			cy.request({
				method: 'GET',
				url: 'http://localhost:4000/polls/by_lecture/'+lecture,
				form: true,
				headers: {
					authorization: getJwt()
				}
			}).then(res => {
				let polls = res.body
				expect(polls.length).to.be.at.least(1)
			})
		})
	})
})

describe('API - PlaybackPoll Modifiers',function() {
	beforeEach(() => {
		cy.setUser('testinst','password')
	})
	after(() => {
		cy.seed()
	})
	it('can addPoll()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/polls/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				poll: {
					question: "What are...?",
					possible_answers: ["this","that","those"],
					correct_answers: ["those"],
					timestamp: 5
				}
			}
		}).then(res => {
			let addedPoll = res.body
			expect(addedPoll.question).to.equal("What are...?")
			expect(addedPoll.possible_answers).to.deep.equal(["this","that","those"])
			expect(addedPoll.correct_answers).to.deep.equal(["those"])
			expect(addedPoll.timestamp).to.equal(5)
		})
	})
})

describe('API - LectureSubmission Accessors and Modifiers',function() {
	beforeEach(() => {
		cy.setUser('studenta','password')
	})
	after(() => {
		cy.seed()
	})
	let submission
	it('can getLectureSubmissions() and getOrMake()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/lecturesubmissions',
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let subs = res.body
			submission = subs[0]
			expect(subs.length).to.equal(1)
			expect(subs[0].is_live_submission).to.equal(true)
			cy.request({
				method: 'POST',
				url: 'http://localhost:4000/lecturesubmissions/get_or_make',
				form: true,
				headers: {
					authorization: getJwt()
				},
				body: {
					lecture_id: subs[0].lecture,
					submitter_id: subs[0].submitter
				}
			}).then(res2 => {
				let sub = res2.body
				expect(sub._id).to.not.equal(subs[0]._id)
				expect(sub.is_live_submission).to.equal(false)
				cy.request({
					method: 'POST',
					url: 'http://localhost:4000/lecturesubmissions/get_or_make',
					form: true,
					headers: {
						authorization: getJwt()
					},
					body: {
						lecture_id: subs[0].lecture,
						submitter_id: subs[0].submitter
					}
				}).then(res3 => {
					let sub2 = res3.body
					expect(sub._id).to.equal(sub2._id)
					expect(sub2.is_live_submission).to.equal(false)
					cy.request({
						method: 'GET',
						url: 'http://localhost:4000/lecturesubmissions',
						form: true,
						headers: {
							authorization: getJwt()
						}
					}).then(res4 => {
						let subs2 = res4.body
						expect(subs2.length).to.equal(2)
					})
				})
			})
		})
	})
	it('can getLectureSubmissionsForLecture()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/lecturesubmissions/for_lecture/'+submission.lecture,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let subs = res.body
			expect(subs.length).to.equal(2)
		})
	})
	it('can getLectureSubmissionsForStudent()',function() {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/lecturesubmissions/for_student/'+submission.lecture+'/'+submission.submitter,
			form: true,
			headers: {
				authorization: getJwt()
			}
		}).then(res => {
			let subs = res.body
			expect(subs.length).to.equal(2)
		})
	})
	it('can addLiveSubmissionByRCS()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/lecturesubmissions/add_by_rcs',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				rcs: ["studenta","badrcs"],
				lecture_id: submission.lecture
			}
		}).then(res => {
			let badrcs = res.body
			expect(badrcs.length).to.equal(1)
			expect(badrcs[0]).to.equal("badrcs")
		})
	})
	it('can update()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/lecturesubmissions/update',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				lectureSubmission: {
					_id: submission._id,
					video_progress: 3,
					video_percent: 0.2,
					student_poll_answers: []
				}
			}
		}).then(res => {
			let sub = res.body
			expect(parseInt(sub.video_progress)).to.equal(3)
			expect(parseFloat(sub.video_percent)).to.equal(0.2)
		})
	})
	it('can addLectureSubmission()',function() {
		cy.request({
			method: 'POST',
			url: 'http://localhost:4000/lecturesubmissions/add',
			form: true,
			headers: {
				authorization: getJwt()
			},
			body: {
				lecture_submission: {
					lecture: submission.lecture,
					submitter: submission.submitter,
					code: "abc",
					video_progress: 5,
					video_percent: 0.35,
					is_live_submission: false,
					playback_submission_time: new Date(),
				}
			}
		}).then(res => {
			let sub = res.body
			expect(sub.video_progress).to.equal(5)
			expect(sub.video_percent).to.equal(0.35)
		})
	})
})