/* eslint-disable no-undef */
describe('Search and buy a product before login', () => {
  it('Home search input works', () => {
    cy.visit('http://localhost:5173/')
    cy.get('.FormSearchText')
    .type('Pizza')
    cy.get('.FormSearchBtn > img')
    .should('exist').click()

    cy.url().should('include', '/searchpage/Pizza')
  })

  it('Search page show correct content', () => {
    cy.visit('http://localhost:5173/searchpage/a')
    cy.get('.searchPage-title')
    .should('exist')
    cy.get('.searchPage-title > span')
    .should('have.text', 'a')
    cy.get('.searchPage-restaurantInformationResult > :nth-child(1)')
    .should('exist')
  })

  it('Search page show correct content by no existent product', () => {
    cy.visit('http://localhost:5173/searchpage/noExistentProduct')
    cy.get('.searchPage-title')
    .should('exist')
    cy.get('.searchPage-title').
    should('contain', 'No encontramos resultados')
  })

  it('Add product to cart and checkout', () => {
    cy.visit('http://localhost:5173/searchpage/a')
    cy.get('.searchPage-title')
    .should('exist')
    cy.get('.searchPage-title > span')
    .should('have.text', 'a')
    cy.get('.searchPage-restaurantInformationResult > :nth-child(1)')
    .should('exist')
    cy.get(':nth-child(1) > .restaurantInformation-item-products')
    .should('exist')
    cy.get(':nth-child(1) > .restaurantInformation-item-products > :nth-child(1) > .restaurantInformation-item-products-product-buttonContainer')
    .should('exist').click()
    cy.get('.ProductModal-btnContainer-btn')
    .should('exist').click()
    cy.get('.header-li-link > .header-li-img')
    .should('exist').click()
    cy.get('.ModalCart-content-item')
    .should('exist')
    cy.get('.ModalCart-content-total-btn')
    .should('exist').click()
    cy.get('.ReactModal__Content > h1')
    .should('exist').should('have.text', '¡Sólo falta un paso!')
    cy.get('.ReactModal__Content > div > :nth-child(2)')
    .should('exist').click()
    cy.get('.panels-content')
    .should('exist')

    cy.get('.loginPage-form-input.user-mode > input')
    .type('danielestebanmarquez12@gmail.com')
    cy.get('.loginPage-form > :nth-child(3) > input')
    .type('123')
    cy.get('.loginPage-form-button')
    .should('exist').click()
    cy.get('.ReactModal__Content > div > :nth-child(2)')
    .should('exist').click()

    cy.get('.header-li-link > .header-li-img')
    .should('exist').click()

    cy.wait(3000)

    cy.get('.ModalCart-content-total-btn')
    .should('exist').click()
    cy.url().should('include', '/checkout')

    cy.wait(1000)

    cy.get(':nth-child(1) > .CheckoutPage-content-item-content > .CheckoutPage-Select > .css-13cymwt-control > .css-4xgw5l-IndicatorsContainer2 > .css-1xc3v61-indicatorContainer')
    .should('exist').click()
    cy.get('#react-select-3-option-0')
    .should('exist').click()

    cy.get(':nth-child(2) > .CheckoutPage-content-item-content > .CheckoutPage-Select > .css-13cymwt-control > .css-4xgw5l-IndicatorsContainer2 > .css-1xc3v61-indicatorContainer')
    .should('exist').click()
    cy.get('#react-select-5-option-0')
    .should('exist').click()
    
    cy.get('.CheckoutPage-content-item-content-button')
    .should('exist').click()

    cy.wait(1500)

    cy.url().should('include', '/profile/orders')


  })

})