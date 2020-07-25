describe('Accessibility for Landing',function(){
	beforeEach(() => {
		cy.clearCookies()
		cy.clearLocalStorage()
	})
	it('on the landing page',function(){
		cy.visit('/')
		cy.checkAccessibility()
	})
	it('in the login form',function(){
		cy.get('.venue-btn').contains('Get Started').click()
		cy.wait(500)
		cy.checkAccessibility()
	})
})
describe('Accessibility for Instructors',function(){
	beforeEach(() => {
		cy.clearCookies()
		cy.clearLocalStorage()
		cy.setUser('testinst','password')
	})
	it('on the dashboard page',function(){
		cy.visit('/dashboard')
		cy.checkAccessibility()
	})
	it('on the course list page',function(){
		cy.visit('/user_courses')
		cy.checkAccessibility()
	})
	it('on the user settings page',function(){
		cy.visit('/settings')
		cy.checkAccessibility()
	})
})