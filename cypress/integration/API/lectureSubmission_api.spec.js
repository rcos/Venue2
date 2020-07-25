let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

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