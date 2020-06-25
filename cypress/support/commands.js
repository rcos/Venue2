// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('setUser', (user_id,password) => { 
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000/auth/login',
    body: {
      user: {
        user_id: user_id,
        password: password,
      }
    }
  })
  .then(res => {
    cy.window().then((window) => window.localStorage.setItem('user', JSON.stringify(res.body)))
  })
})

Cypress.Commands.add('checkAccessibility', () => { 
  cy.injectAxe()
  cy.checkA11y()
})

Cypress.Commands.add('seed', () => { 
  cy.exec('cd server && npm run seed && cd ../')
})
