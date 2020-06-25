describe('Create Lecture', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.setUser('testinst','password')
  })
  it('can reach the Course List by URL',function() {
    cy.visit('/user_courses')
    cy.url().should('eq', 'http://localhost:8080/#/user_courses');
  })
  it('can reach the Course List by Navbar',function() {
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:8080/#/dashboard');
    cy.get('.venue-nav-link').contains('Courses').click()
    cy.url().should('eq', 'http://localhost:8080/#/user_courses');
  })
  it('Course List has a course',function(){
    cy.visit('/user_courses')
    cy.get('.course-name').contains('Testing Course')
  })
  it('can reach Course Info page',function(){
    cy.visit('/user_courses')
    cy.get('.course-name').contains('Testing Course').click()
    cy.get('.title').contains('Course Info')
    cy.get('.course-name').contains('Testing Course')
  })
  
})