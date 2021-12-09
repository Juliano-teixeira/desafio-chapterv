/// <reference types="cypress" />
import Login from '../support/pages/login/index'

describe('Validando rotina de login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Validando elementos em tela: Esperado que a tela tenha campos de input e botão de submite ', () => {
    Login.validadePropriedadesTela()
  })
})
