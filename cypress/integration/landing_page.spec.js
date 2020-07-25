describe('The Landing Page', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('is reachable when not logged in', function () {
    cy.visit('/')
    cy.checkAccessibility()
  })
  it('has a CAS "Login" button', function () {
    cy.get(".venue-btn").contains("CAS Login")
  })
  it('has a "Get Started" button', function () {
    cy.get(".venue-btn").contains("Get Started").click()
  })
  it('has a "username" field', function () {
    cy.get("#username")
  })
  it('has a "password" field', function () {
    cy.get("#password")
  })
  it('shows error on bad username', function () {
    cy.get("#username > .input-field > input").type("baduser")
    cy.get("#password > .input-field > input").type("password")
    cy.get(".venue-btn").contains("Login").click()
    cy.get("#invalid-login")
  })
  it('shows error on bad password', function () {
    cy.get("#username > .input-field > input").clear().type("testinst")
    cy.get("#password > .input-field > input").clear().type("badpass")
    cy.get(".venue-btn").contains("Login").click()
    cy.get("#invalid-login")
  })
  it('is not reachable when logged in', function () {
    cy.get("#username > .input-field > input").clear().type("testinst")
    cy.get("#password > .input-field > input").clear().type("password")
    cy.get(".venue-btn").contains("Login").click()
    cy.url().should('eq', 'http://localhost:8080/#/dashboard');
    cy.visit('/')
    cy.url().should('eq', 'http://localhost:8080/#/dashboard');
  })
})