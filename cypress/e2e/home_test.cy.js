/* eslint-disable no-undef */
describe('home test without login', () => {

  it('nav works correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.mainContent-headerPrincipalPage').should('exist')
    cy.get('.headerPrincipalPage-ul').should('exist')
    cy.get('.cartIcon')
    .should('exist').click()
    cy.get('.ModalCart-header > h2')
    .should('exist')
    cy.get('.ReactModal__Overlay').click(100, 100)
    cy.get('.userlink').should('exist')
  })

  it('important titles are shown correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.searchFormTitle')
    .should('have.text', '¿Qué te apetece comer hoy?')
    cy.get('.Categories-header > h2')
    .should('have.text', '¿Aún no te decides?')
    cy.get('.bestNearRestaurant-title')
    .should('have.text', 'Los mejores restaurantes cerca de ti')
    cy.get('.mostSearched-title')
    .should('have.text', 'Lo más pedido hoy')
    cy.get('.businessSection-title')
    .should('exist')
  })

  it('Plan section is being shown', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.businessSection-plans-content > :nth-child(1)')
    .should('exist')
    cy.get('.businessSection-plans-content > :nth-child(2)')
    .should('exist')
    cy.get('.businessSection-plans-content > :nth-child(3)')
    .should('exist')
  })

  it('Team section is being shown', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.teamSection-content > :nth-child(1)')
    .should('exist')
    cy.get('.teamSection-content > :nth-child(2)')
    .should('exist')
  })

  it('footer works correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.footer-basic')
    .should('exist')
    cy.get('.information-buttonArrow')
    .should('exist').click()
    cy.get('.footer-information > :nth-child(1)')
    .should('exist')
    cy.get('.footer-information > :nth-child(2)')
    .should('exist')
    cy.get('.footer-information > :nth-child(3)')
    .should('exist')
  })
})