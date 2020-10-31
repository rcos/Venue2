let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

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