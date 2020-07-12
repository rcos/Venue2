let getJwt = function() {
	cy.wait(0.2)
	return 'Bearer '+JSON.parse(window.localStorage.getItem('user')).token
}

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