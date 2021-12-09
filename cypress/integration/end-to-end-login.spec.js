/// <reference types="cypress" />

import Login from '../support/pages/login/index'
describe('Validar rotina de login', () => {
  beforeEach(() => {
    cy.visit('login')
    cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('waitFeed')
  })
  it('Login com sucesso: Ao informar email/senha válidos, então o feed deve ser exibido', () => {
    Login.realizarLoginComSucesso()
    Login.validaTelaFeed()
  })

  it('Submeter login sem informar os dados obrigatórios: Deve ser exibida mensagem solicitando os dados obrigatórios', () => {
    Login.submeterLoginSemDadosObrigatorios()
    cy.wait('@waitFeed').then(resp => {
      expect(resp.response.body).eq('Cannot read property \'email\' of undefined')
      expect(resp.response.statusCode).eq(500)
    })
  })

  it('Submter login com email invalido e senha valida: Deve ser exibida mensagem de alerta', () => {
    Login.submeterLoginComEmailInvalido()
    cy.contains('email or password is invalid')
  })
})
