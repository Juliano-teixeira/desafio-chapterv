const el = require('./elementos').ELEMENTOS

class ToLogin {
  validadePropriedadesTela () {
    cy.get(el.header)
      .should('be.visible')
    cy.get(el.titulo)
      .should('have.text', 'Sign in')
    cy.get(el.linkCriarConta).eq(1)
      .contains('Need an account?')
    cy.get(el.inputEmail)
      .should('be.visible')
    cy.get(el.inputSenha)
      .should('be.visible')
    cy.get(el.btnLogin)
      .should('have.text', 'Sign in')
  }

  realizarLoginComSucesso () {
    cy.get(el.inputEmail)
      .should('be.visible')
      .type(Cypress.env('email'))
    cy.get(el.inputSenha)
      .should('be.visible')
      .type(Cypress.env('senha'))
    cy.get(el.btnLogin)
      .should('have.text', 'Sign in')
      .click()
  }

  validaTelaFeed () {
    cy.wait('@waitFeed').then(resp => {
      expect(resp.response.statusMessage).eq('OK')
      expect(resp.response.statusCode).eq(200)

      // Assertativa
      cy.get('.feed-toggle')
        .should('be.visible')
      cy.get('[class=\'nav-link ng-binding\']')
        .contains('julianoteixeira')
    })
  }

  submeterLoginSemDadosObrigatorios () {
    cy.get(el.btnLogin)
      .click()
  }

  submeterLoginComEmailInvalido () {
    cy.get(el.inputEmail)
      .type('gwe@gmail.com')
    cy.get(el.inputSenha)
      .should('be.visible')
      .type(Cypress.env('senha'))
    cy.get(el.btnLogin)
      .should('have.text', 'Sign in')
      .click()
  }
} export default new ToLogin()
